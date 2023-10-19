<template>
  <div class="lang-switcher">
    <span class="material-symbols-outlined">translate</span>
    <select @change="switchLanguage">
      <option
        v-for="sLocale in supportedLocales"
        :key="`locale-${sLocale}`"
        :value="sLocale"
        :selected="locale === sLocale"
      >
        {{ t(`locale.${sLocale}`) }}
      </option>
    </select>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Tr from '../i18n/translation';

export default {
  setup() {
    const { t, locale } = useI18n();
    const supportedLocales = Tr.supportedLocales;

    const switchLanguage = async (e) => {
      const newLocale = e.target.value;

      await Tr.switchLanguage(newLocale);
    }

    return { t, locale, supportedLocales, switchLanguage };
  }
}
</script>

<style>
.lang-switcher {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  width: 90%;
  max-width: 960px;
  margin: 15px auto 0 auto;
  font-size: 14px;
}
</style>