const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    allowedHosts: "all", // ✅ Разрешаем любые хосты
    hot: false, // 🔥 Отключаем горячую замену модулей (HMR)
    liveReload: false, // 🔄 Отключаем автоматическое обновление

    client: {
      webSocketURL:
        process.env.NODE_ENV === "production"
          ? undefined
          : "ws://localhost:8080", // 🛠️ WebSocket только в dev-режиме
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
