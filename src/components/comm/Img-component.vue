<template>
  <v-img
    v-bind="$attrs"
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
      const noImage = '/photo_1280.png';
      try {
        const image = this.path ? '/images' + this.path : noImage
        return image && require('@/assets' + image);
      } catch (err) {
        return require('@/assets' + noImage);
      }
    }
  }
}
</script>