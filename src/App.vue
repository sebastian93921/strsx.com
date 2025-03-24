<template>
    <div id="app" :class="$route.meta.bodyClass">
        <BgBody />

        <AppHeader :routeName="$route.name"
                :viewport="viewport" />

        <router-view :viewport="viewport" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
// styles
import '@/styles/app.scss';
import '@/styles/nprogress.scss';
// GSAP + ScrollMagic
import * as ScrollMagic from "scrollmagic";
import { gsap } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, gsap);
// Components
import AppHeader from '@/components/Header.vue';
import BgBody from '@/components/BgBody.vue';

defineOptions({
    name: 'App'
});

const route = useRoute();
const viewport = ref({
    w: window.innerWidth,
    h: window.innerHeight,
    is568: window.innerWidth <= 568,
    is768: window.innerWidth <= 768,
    is1024: window.innerWidth <= 1024,
});

const introTimeline = gsap.timeline();
const leaveTimeline = gsap.timeline();

const updateViewport = () => {
    viewport.value = {
        w: window.innerWidth,
        h: window.innerHeight,
        is568: window.innerWidth <= 568,
        is768: window.innerWidth <= 768,
        is1024: window.innerWidth <= 1024,
    };
};

onMounted(() => {
    // update viewport
    updateViewport();
    // add resize listener
    window.addEventListener('resize', updateViewport);
    // add beforeunload listener, in case of refresh
    window.addEventListener("beforeunload", () => window.scroll(0,0));
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateViewport);
    window.removeEventListener("beforeunload", () => window.scroll(0,0));
});
</script>
