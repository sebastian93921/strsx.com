<template>
    <div class="shark-backdrop" aria-hidden="true">
        <canvas ref="canvasEl" class="ascii-sharks"></canvas>
        <div class="shark-tint"></div>
    </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { OceanEngine } from '@/services/ascii-sharks';

defineOptions({
    name: 'SharkBackdrop'
});

const canvasEl = ref(null);

let engine = null;

onMounted(() => {
    if (!canvasEl.value) return;
    engine = new OceanEngine(canvasEl.value);
});

onBeforeUnmount(() => {
    if (engine) {
        engine.destroy();
        engine = null;
    }
});
</script>

<style scoped>
/* fixed full-page layer; the page wrapper sits above it at z-index 1 */
.shark-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    isolation: isolate;
    overflow: hidden;
    pointer-events: none;
}

.ascii-sharks {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    font-family: ui-monospace, Menlo, monospace;
    filter: brightness(0.2); /* much darker; opacity can't dim a pure-black canvas */
}

.shark-tint {
    position: absolute;
    inset: 0;
    background: rgba(230, 0, 0, 1);
    mix-blend-mode: color;
    opacity: 0.5;
    pointer-events: none;
}
</style>
