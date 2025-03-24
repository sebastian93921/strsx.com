<template>
    <section class="scene" :id="scene">
        <div class="title-container">
            <slot></slot>
        </div>
    </section>
</template>

<script setup>
defineProps({
    scene: String,
    viewport: Object
});

defineOptions({
    name: 'TitlesSection'
});
</script>