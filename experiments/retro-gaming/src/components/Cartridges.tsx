import { useRef } from "react";
import { Group } from "three";
import { Cartridge } from "./Cartridge";
import rom1 from "experiment-assets/retro-gaming/roms/2021ME_DEMO.gb?url";
import art1 from "experiment-assets/retro-gaming/boxart/2021ME.jpg?url";
import rom2 from "experiment-assets/retro-gaming/roms/Machine DEMO v1_1.gb?url";
import art2 from "experiment-assets/retro-gaming/boxart/the_machine.jpg?url";
import rom3 from "experiment-assets/retro-gaming/roms/FarAfter-Demo.gb?url";
import art3 from "experiment-assets/retro-gaming/boxart/far_after.jpg?url";
import art4 from "experiment-assets/retro-gaming/boxart/upload.jpg?url";

export function Cartridges(props: JSX.IntrinsicElements["group"]) {
  const cartridgesRef = useRef<Group>(null);

  return (
    <group {...props}>
      <group ref={cartridgesRef}>
        <Cartridge
          position={[-0.75, -0.025, 0]}
          game={{ rom: rom1, stickerImage: art1, cartNum: 0 }}
        />

        <Cartridge
          position={[0.75, -0.025, 0]}
          game={{ rom: rom2, stickerImage: art2, cartNum: 1 }}
        />

        <Cartridge
          position={[0, -0.075, 0.75]}
          game={{ rom: rom3, stickerImage: art3, cartNum: 2 }}
        />

        <Cartridge position={[0, 0.025, -0.75]} game={{ stickerImage: art4, cartNum: 3 }} />
      </group>
    </group>
  );
}
