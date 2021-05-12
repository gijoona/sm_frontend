<template>
  <div class="home primary">
    <Contents />
  </div>
</template>

<script>
// @ is an alias to /src
import Contents from '@/components/Contents.vue'

export default {
  name: 'Home',
  components: {
    Contents
  }
}
</script>
