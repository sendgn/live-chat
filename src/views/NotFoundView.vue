<template>
  <div>
    <h2>{{ $t('not_found_view.heading') }}</h2>
    <router-link :to="Tr.i18nRoute({ name: 'welcome' })">
      {{ $t('not_found_view.link') }}
    </router-link>
  </div>
</template>

<script>
import Tr from '../i18n/translation';

export default {
  setup() {
    return { Tr };
  }
}
</script>

<style scoped>
div {
  text-align: center;
  margin: 20px auto;
}
a {
  display: block;
  margin-top: 10px;
  color: #444;
}
a:hover {
  text-decoration: none;
}
</style>
