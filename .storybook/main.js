module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  use: [
    {
      loader: require.resolve("react-docgen-typescript-loader"),
      options: {
        shouldExtractLiteralValuesFromEnum: true,
        propFilter: (prop) => {
          if (prop.declarations !== undefined && prop.declarations.length > 0) {
            const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
              return !declaration.fileName.includes("node_modules");
            });

            return Boolean(hasPropAdditionalDescription);
          }

          return true;
        },
      }
    },
  ],
}