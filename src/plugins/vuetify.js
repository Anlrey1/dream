// Подключаем стили Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";

// Импортируем все компоненты и директивы Vuetify
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Подключаем Material Design Icons (иконки Vuetify)
import "@mdi/font/css/materialdesignicons.css";

// Создаём инстанс Vuetify
const vuetify = createVuetify({
  components, // ✅ Добавили все компоненты
  directives, // ✅ Добавили все директивы
});

export default vuetify;
