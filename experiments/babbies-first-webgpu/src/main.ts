import "./style.css";

const GRID_SIZE = 50;
const WORKGROUP_SIZE = 8;

async function main() {
  if (!navigator.gpu) {
    console.error("WebGPU is not supported in your browser");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    console.error("Failed to get adapter");
    return;
  }

  const device = await adapter.requestDevice();
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("webgpu");
  if (!ctx) {
    console.error("Failed to get context");
    return;
  }

  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({
    device,
    format: canvasFormat,
  });

  const vertexBufferLayout: GPUVertexBufferLayout = {
    arrayStride: 8,
    attributes: [
      {
        format: "float32x2",
        offset: 0,
        shaderLocation: 0,
      },
    ],
  };

  const cellShaderModule = device.createShaderModule({
    label: "Cell shader",
    code: `
      struct VertexInput {
        @location(0) pos: vec2<f32>,
        @builtin(instance_index) instance: u32,
      }

      struct VertexOutput {
        @builtin(position) pos: vec4<f32>,
        @location(0) cell: vec2<f32>,
      }

      @group(0) @binding(0) var<uniform> grid: vec2<f32>;
      @group(0) @binding(1) var<storage> cellState: array<u32, ${GRID_SIZE * GRID_SIZE}>;

      @vertex
      fn vertexMain(input: VertexInput) -> VertexOutput {
        let i = f32(input.instance);
        let cell = vec2f(i % grid.x, floor(i / grid.x));
        let state = f32(cellState[input.instance]);

        let cellOffset = cell / grid * 2;
        let gridPos = (input.pos * state + 1) / grid - 1 + cellOffset;

        var output = VertexOutput();
        output.pos = vec4(gridPos, 0.0, 1.0);
        output.cell = cell;
        return output;
      }

      @fragment
      fn fragmentMain(input: VertexOutput) -> @location(0) vec4f {
        return vec4(input.cell / grid, 0.0, 1.0);
      }
    `,
  });

  const simulationShaderModule = device.createShaderModule({
    label: "Simulation shader",
    code: `
      @group(0) @binding(0) var<uniform> grid: vec2<f32>;

      @group(0) @binding(1) var<storage> cellStateIn: array<u32, ${GRID_SIZE * GRID_SIZE}>;
      @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32, ${
        GRID_SIZE * GRID_SIZE
      }>;

      fn cellIndex(cell: vec2u) -> u32 {
        return (cell.y % u32(grid.y)) * u32(grid.x) +
               (cell.x % u32(grid.x));
      }

      fn cellActive(x: u32, y: u32) -> u32 {
        return cellStateIn[cellIndex(vec2(x, y))];
      }

      @compute
      @workgroup_size(${WORKGROUP_SIZE}, ${WORKGROUP_SIZE})
      fn computeMain(@builtin(global_invocation_id) cell: vec3<u32>) {
        var activeNeighbors = 0u;

        for (var y: u32 = 0u; y < 3u; y = y + 1u) {
          for (var x: u32 = 0u; x < 3u; x = x + 1u) {
            if (x == 1u && y == 1u) {
              continue;
            }

            activeNeighbors = activeNeighbors + cellActive(cell.x + x - 1u, cell.y + y - 1u);
          }
        }

        let i = cellIndex(cell.xy);

        switch activeNeighbors {
          case 2: { // Active cells with 2 neighbors stay active.
            cellStateOut[i] = cellStateIn[i];
          }
          case 3: { // Cells with 3 neighbors become or stay active.
            cellStateOut[i] = 1;
          }
          default: { // Cells with < 2 or > 3 neighbors become inactive.
            cellStateOut[i] = 0;
          }
        }
      }
    `,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    label: "Cell Bind Group Layout",
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
        buffer: {}, // Grid uniform buffer
      },
      {
        binding: 1,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
        buffer: { type: "read-only-storage" }, // Cell state input buffer
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" }, // Cell state output buffer
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    label: "Cell pipeline layout",
    bindGroupLayouts: [bindGroupLayout],
  });

  const cellPipeline = device.createRenderPipeline({
    label: "Cell pipeline",
    layout: pipelineLayout,
    vertex: {
      module: cellShaderModule,
      entryPoint: "vertexMain",
      buffers: [vertexBufferLayout],
    },
    fragment: {
      module: cellShaderModule,
      entryPoint: "fragmentMain",
      targets: [
        {
          format: canvasFormat,
        },
      ],
    },
  });

  const simulationPipeline = device.createComputePipeline({
    label: "Simulation pipeline",
    layout: pipelineLayout,
    compute: {
      module: simulationShaderModule,
      entryPoint: "computeMain",
    },
  });

  const vertices = new Float32Array([
    -0.8, -0.8, 0.8, -0.8, 0.8, 0.8,

    -0.8, -0.8, 0.8, 0.8, -0.8, 0.8,
  ]);

  const vertexBuffer = device.createBuffer({
    label: "Cell vertices",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(vertexBuffer, 0, vertices.buffer);

  const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE]);
  const uniformBuffer = device.createBuffer({
    label: "Grid uniforms",
    size: uniformArray.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  device.queue.writeBuffer(uniformBuffer, 0, uniformArray);

  const cellStateArray = new Uint32Array(GRID_SIZE * GRID_SIZE);
  const cellStateStorage = [
    device.createBuffer({
      label: "Cell state A",
      size: cellStateArray.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }),
    device.createBuffer({
      label: "Cell state B",
      size: cellStateArray.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    }),
  ] as const;

  for (let i = 0; i < cellStateArray.length; i++) {
    cellStateArray[i] = Math.random() > 0.75 ? 1 : 0;
  }

  device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);

  const bindGroups = [
    device.createBindGroup({
      label: "Cell renderer bind group A",
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
          },
        },
        {
          binding: 1,
          resource: {
            buffer: cellStateStorage[0],
          },
        },
        {
          binding: 2,
          resource: { buffer: cellStateStorage[1] },
        },
      ],
    }),
    device.createBindGroup({
      label: "Cell renderer bind group B",
      layout: bindGroupLayout,
      entries: [
        {
          binding: 0,
          resource: {
            buffer: uniformBuffer,
          },
        },
        {
          binding: 1,
          resource: {
            buffer: cellStateStorage[1],
          },
        },
        {
          binding: 2,
          resource: { buffer: cellStateStorage[0] },
        },
      ],
    }),
  ];

  let step = 0;

  function tick() {
    if (!ctx) return;

    const encoder = device.createCommandEncoder();
    const computePass = encoder.beginComputePass();

    computePass.setPipeline(simulationPipeline);
    computePass.setBindGroup(0, bindGroups[step % 2]);
    const workgroupCount = Math.ceil(GRID_SIZE / WORKGROUP_SIZE);
    computePass.dispatchWorkgroups(workgroupCount, workgroupCount);

    computePass.end();
    step += 1;

    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: ctx.getCurrentTexture().createView(),
          loadOp: "clear",
          clearValue: { r: 0.0, g: 0.0, b: 0.4, a: 1.0 },
          storeOp: "store",
        },
      ],
    });

    pass.setPipeline(cellPipeline);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.setBindGroup(0, bindGroups[step % 2]);
    pass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE);

    pass.end();
    device.queue.submit([encoder.finish()]);
    requestAnimationFrame(tick);
  }

  // setInterval(tick, 1000);
  tick();
}

main();
