module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui", "@react-three/postprocessing", "postprocessing", "cosmic-platform"],

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g|ttf|hdr|glb|gltf)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: "url-loader",
          options: {
            // limit: config.inlineImageLimit,
            // publicPath: `${config.assetPrefix}/_next/static/images/`,
            // outputPath: `${isServer ? "../" : ""}static/images/`,
            fallback: "file-loader",
            name: "[name]-[hash].[ext]",
            esModule: config.esModule || false,
          },
        },
      ],
    });

    console.log(config.exclude);

    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    // override next-image-loader
    config.module.rules = config.module.rules.filter((rule) => rule.loader !== "next-image-loader");
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i,
      loader: "url-loader",
      options: {
        resourceQuery: [/url/],
        fallback: "file-loader",
        name: "[name]-[hash].[ext]",
        esModule: config.esModule || false,
      },
    });

    // catch vite url-loader overrides, and use file-loader
    // to remove the added suffix then feed it to url-loader
    // config.module.rules.push({
    //   test: /\?url$/i,
    //   use: [
    //     {
    //       loader: "file-loader",
    //       options: {
    //         name: (resourcePath, resourceQuery) => {
    //           const name = resourcePath.replace(/\?url$/i, "");

    //           return name;
    //         },
    //       },
    //     },
    //     { loader: "url-loader" },
    //   ],
    // });

    return config;
  },
};
