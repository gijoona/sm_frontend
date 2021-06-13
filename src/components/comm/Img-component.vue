<template>
  <v-img
    :src="imgPath"
  ></v-img>
</template>
<script>
export default {
  props: ['path'],
  name: 'ImageComponent',
  data() {
    return {}
  },
  computed: {
    imgPath() {
      const image = this.path ? '/images' + this.path : '/photo_1280.png'
      return image && require('@/assets' + image);
    }
  }
}
</script>