<script setup lang="ts">
import ColorSegmentationOklch from './components/ColorSegmentationOklch.vue';

const list = [
  '#FF0000',
  '#000080',
  '#90EE90',
  '#808080',
  '#FF00FF',
  '#8B4513',
  '#FFD700',
  '#00CED1',
  '#FF6347',
  '#4B0082',
  '#F0E68C',
  '#242424',
  '#E4F22B',
  '#892ABC',
  '#BC8AAC',
  '#C4E2FF',
  '#22DDAB',
  '#FFA500',
  '#F9C3A0',
  '#FFB6C1',
  '#FFD1DC',
  '#E0BBE4',
  '#D4A5A5',
  '#FFDAB9',
  '#FFEFD5',
  '#FFE4B5',
  '#FFFACD',
  '#E6E6FA',
  '#D8BFD8',
  '#DDA0DD',
  '#EEE8AA',
  '#81612E',
  '#74BBAA',
  '#9CF5E1',
  '#B8E6B8',
  '#0000FF',
  '#FFFF00',
];
</script>

<template>
  <div class="container mx-auto py-10 gap-20">
    <ColorSegmentationOklch :list />
  </div>
</template>

<style scoped></style>
