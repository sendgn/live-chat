<template>
  <div>

  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import Tr from '../i18n/translate';

export default {
  setup() {
    const { t, locale } = useI18n();

    const supportedLocales = Tr.supportedLocales;

    const switchLanguage = async (event) => {
      
    }

    return { supportedLocales };
  }
}
</script>