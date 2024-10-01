import { languageContents as en } from "./languages/en/index.js";
import { languageContents as th } from "./languages/th/index.js";

const languageContents = {
  en,
  th,
};

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  messages: languageContents,
}));