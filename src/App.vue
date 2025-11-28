<script setup lang="ts">
import ColorSegmentationOklch from './components/ColorSegmentationOklch.vue';

const list = [
  '#FCD4D4',
  '#E54141',
  '#721919',

  '#FF9A4C',
  '#F59314',
  '#553710',

  '#FBF3C0',
  '#BEA81D',
  '#4B4204',

  '#DDEAD2',
  '#5FAA23',
  '#294B0C',

  '#D2F3E9',
  '#1FCA96',
  '#105440',

  '#D8E2F3',
  '#196AEB',
  '#173565',

  '#C49FFF',
  '#721DFA',
  '#35136C',

  '#FBBFEE',
  '#EC3BC5',
  '#6D1159',

  '#F9F9F9',
  '#242424',
];
</script>

<template>
  <div class="container mx-auto py-10 gap-20">
    <ColorSegmentationOklch :list />
  </div>
</template>

<style scoped></style>
