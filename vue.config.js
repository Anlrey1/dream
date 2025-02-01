const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    allowedHosts: "all", // ✅ Разрешаем любые хосты
    client: {
      webSocketURL: "ws://localhost:8080/ws", // ✅ Явно указываем WebSocket URL
    },
  },

  configureWebpack: (config) => {
    config.plugins.push(
      new (require("webpack").DefinePlugin)({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    );
  },
});
