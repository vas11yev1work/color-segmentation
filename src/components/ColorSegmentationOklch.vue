<template>
  <div>
    <div class="mb-4 flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-bold">Color Segmentation Oklch</h1>
        <p class="text-sm text-slate-500 font-medium">L - Lightness</p>
        <p class="text-sm text-slate-500 font-medium">C - Chroma</p>
        <p class="text-sm text-slate-500 font-medium">H - Hue</p>
      </div>
      <Button variant="destructive" size="sm" @click="resetFilters">Reset</Button>
    </div>
    <hr />
    <div class="py-6 flex gap-10">
      <div>
        <span class="font-medium">Hues:</span>
        <div class="flex flex-col gap-2 mt-2">
          <div v-for="color in Object.keys(colorNames)" :key="color" class="flex items-center gap-2">
            <Checkbox :model-value="selectedColors.includes(color)" @update:model-value="updateSelectedColors(color)" />
            <Label>{{ colorNames[color as keyof typeof colorNames].label }}</Label>
          </div>
        </div>
      </div>
      <div>
        <span class="font-medium">Temperature:</span>
        <div class="flex flex-col gap-2 mt-2">
          <div v-for="flag in Object.keys(flagNames)" :key="flag" class="flex items-center gap-2">
            <Checkbox :model-value="selectedFlags.includes(flag)" @update:model-value="updateSelectedFlags(flag)" />
            <Label>{{ flagNames[flag as keyof typeof flagNames].label }}</Label>
          </div>
        </div>
      </div>
      <div>
        <span class="font-medium">Brightness:</span>
        <div class="flex flex-col gap-2 mt-2">
          <div v-for="brightness in Object.keys(brightnessNames)" :key="brightness" class="flex items-center gap-2">
            <Checkbox
              :model-value="selectedBrightness.includes(brightness)"
              @update:model-value="updateSelectedBrightness(brightness)"
            />
            <Label>{{ brightnessNames[brightness as keyof typeof brightnessNames].label }}</Label>
          </div>
        </div>
      </div>
      <div>
        <span class="font-medium">Types:</span>
        <div class="flex flex-col gap-2 mt-2">
          <div v-for="type in Object.keys(typeNames)" :key="type" class="flex items-center gap-2">
            <Checkbox :model-value="selectedTypes.includes(type)" @update:model-value="updateSelectedTypes(type)" />
            <Label>{{ typeNames[type as keyof typeof typeNames].label }}</Label>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="bg-slate-100 px-4 py-2 rounded-xl flex flex-col gap-1 my-6">
      <p class="font-medium">Filters:</p>
      <div class="flex items-center gap-1" v-for="filter in selectedColors" :key="filter">
        <span class="text-slate-500 text-sm font-medium">
          {{ colorNames[filter as keyof typeof colorNames].label }}:
        </span>
        <code class="block text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          {{ colorNames[filter as keyof typeof colorNames].info }}
        </code>
      </div>
      <div class="flex items-center gap-1" v-for="filter in selectedFlags" :key="filter">
        <span class="text-slate-500 text-sm font-medium">
          {{ flagNames[filter as keyof typeof flagNames].label }}:
        </span>
        <code class="block text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          {{ flagNames[filter as keyof typeof flagNames].info }}
        </code>
      </div>
      <div class="flex items-center gap-1" v-for="filter in selectedTypes" :key="filter">
        <span class="text-slate-500 text-sm font-medium">
          {{ typeNames[filter as keyof typeof typeNames].label }}:
        </span>
        <code class="block text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          {{ typeNames[filter as keyof typeof typeNames].info }}
        </code>
      </div>
      <div class="flex items-center gap-1" v-for="filter in selectedBrightness" :key="filter">
        <span class="text-slate-500 text-sm font-medium">
          {{ brightnessNames[filter as keyof typeof brightnessNames].label }}:
        </span>
        <code class="block text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          {{ brightnessNames[filter as keyof typeof brightnessNames].info }}
        </code>
      </div>
    </div>
    <hr />
    <div class="grid grid-cols-6 gap-2 mt-6">
      <div
        v-for="color in filteredColors"
        :key="color.hex"
        class="rounded-md flex flex-col justify-start items-start gap-1 p-2 shadow-sm"
        :style="{ backgroundColor: color.hex }"
      >
        <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">{{ color.hex }}</span>
        <div class="flex items-start flex-col gap-1 py-2">
          <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
            L: {{ isNaN(color.info.info.oklch.l) ? 0 : color.info.info.oklch.l.toFixed(2) }}
          </span>
          <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
            C: {{ isNaN(color.info.info.oklch.c) ? 0 : color.info.info.oklch.c.toFixed(2) }}
          </span>
          <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
            H: {{ isNaN(color.info.info.oklch.h) ? 0 : color.info.info.oklch.h.toFixed(2) }}
          </span>
        </div>
        <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          H: {{ isNaN(color.info.info.hsl.h) ? 0 : color.info.info.hsl.h.toFixed(2) }}
        </span>
        <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          S: {{ isNaN(color.info.info.hsl.s) ? 0 : color.info.info.hsl.s.toFixed(2) }}
        </span>
        <span class="text-sm font-semibold bg-white rounded-sm px-1 shadow-sm">
          L: {{ isNaN(color.info.info.hsl.l) ? 0 : color.info.info.hsl.l.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ColorInfo } from '../color-info/color-info-oklch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const { list } = defineProps<{
  list: string[];
}>();

const colors = computed(() => {
  return list.map(color => ({
    hex: color,
    info: new ColorInfo(color),
  }));
});

const filteredColors = computed(() => {
  return colors.value.filter(color => {
    const matchesColor = selectedColors.value.length === 0 || selectedColors.value.includes(color.info.info.hue);

    const matchesFlags =
      selectedFlags.value.length === 0 ||
      selectedFlags.value.every(flag => color.info.info.flags[flag as keyof typeof color.info.info.flags]);

    const matchesTypes =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.every(type => color.info.info.flags[type as keyof typeof color.info.info.flags]);

    const matchesBrightness =
      selectedBrightness.value.length === 0 ||
      selectedBrightness.value.every(brightness => color.info.info.brightness === brightness);

    return matchesColor && matchesFlags && matchesTypes && matchesBrightness;
  });
});

function resetFilters() {
  selectedColors.value = [];
  selectedTypes.value = [];
  selectedBrightness.value = [];
  selectedFlags.value = [];
}

const selectedColors = ref<string[]>([]);

function updateSelectedColors(color: string) {
  if (selectedColors.value.includes(color)) {
    selectedColors.value = selectedColors.value.filter(c => c !== color);
  } else {
    selectedColors.value.push(color);
  }
}

const colorNames = {
  red: {
    label: 'Red',
    info: 'H >= 15 && H < 30',
  },
  orange: {
    label: 'Orange',
    info: 'H >= 30 && H < 70',
  },
  yellow: {
    label: 'Yellow',
    info: 'H >= 70 && H < 120',
  },
  green: {
    label: 'Green',
    info: 'H >= 120 && H < 165',
  },
  cyan: {
    label: 'Cyan',
    info: 'H >= 165 && H < 230',
  },
  blue: {
    label: 'Blue',
    info: 'H >= 230 && H < 285',
  },
  purple: {
    label: 'Purple',
    info: 'H >= 285 && H < 330',
  },
  pink: {
    label: 'Pink',
    info: '(H >= 330 && H < 360) || (H >= 0 && H < 15)',
  },
  achromatic: {
    label: 'Achromatic',
    info: 'C < 0.02',
  },
};

const selectedFlags = ref<string[]>([]);

function updateSelectedFlags(flag: string) {
  if (selectedFlags.value.includes(flag)) {
    selectedFlags.value = selectedFlags.value.filter(f => f !== flag);
  } else {
    selectedFlags.value.push(flag);
  }
}

const flagNames = {
  isNeutral: {
    label: 'Neutral',
    info: 'C < 0.02',
  },
  isWarm: {
    label: 'Warm',
    info: '(H >= 0 && H < 140) || H >= 340',
  },
  isCool: {
    label: 'Cool',
    info: 'H >= 140 && H < 330',
  },
};

const selectedTypes = ref<string[]>([]);

function updateSelectedTypes(type: string) {
  if (selectedTypes.value.includes(type)) {
    selectedTypes.value = selectedTypes.value.filter(t => t !== type);
  } else {
    selectedTypes.value.push(type);
  }
}

const typeNames = {
  isPastel: {
    label: 'Pastel',
    info: 'L > 0.8 && L < 0.95 && C > 0.02 && C < 0.12',
  },
};

const selectedBrightness = ref<string[]>([]);

function updateSelectedBrightness(brightness: string) {
  if (selectedBrightness.value.includes(brightness)) {
    selectedBrightness.value = selectedBrightness.value.filter(b => b !== brightness);
  } else {
    selectedBrightness.value.push(brightness);
  }
}

const brightnessNames = {
  light: {
    label: 'Light',
    info: 'L > 0.75',
  },
  medium: {
    label: 'Medium',
    info: 'L >= 0.4 && L <= 0.75',
  },
  dark: {
    label: 'Dark',
    info: 'L < 0.4',
  },
};
</script>
