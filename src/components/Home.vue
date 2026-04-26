<template>
    <main id="home" class="wrapper">
        <!--intro-->
        <Intro />

        <!--Skills-->
        <Skills :viewport="viewport" />
        <div class="gap"></div>

        <!--early days scenes-->
        <Experience :viewport="viewport" />
        <div class="gap"></div>

        <!--certs and achievements-->
        <Certifications :viewport="viewport" />
        <div class="gap"></div>

        <!--thanks-->
        <Thanks :viewport="viewport" />

        <div class="mail-wrapper">
            <a href="mailto:sebastian.ko.dv@gmail.com"><h4>sebastian.ko.dv@gmail.com</h4></a>
        </div>
        <Spine />
    </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
// style
import '@/styles/page-common.scss';
// components
import Intro from "@/components/Home/Intro.vue";
import Skills from "@/components/Home/Skills.vue";
import Experience from "@/components/Home/Experience.vue";
import Certifications from "@/components/Home/Certifications.vue";
import Thanks from "@/components/Home/Thanks.vue";
import Spine from '@/components/Spine.vue';

defineProps({
    viewport: Object,
});

defineOptions({
    name: 'HomePage'
});

const observer = ref(null);

onMounted(() => {
    // before leaving the page, in case of refresh
    window.addEventListener("beforeunload", () => window.scroll(0, 0));
    
    // Inject transition delays for staggered elements
    document.querySelectorAll('.skill-pill').forEach((el, i) => {
        el.style.transitionDelay = `${0.4 + (i % 15) * 0.05}s`;
    });
    document.querySelectorAll('.cert-card').forEach((el, i) => {
        el.style.transitionDelay = `${0.4 + (i * 0.1)}s`;
    });
    document.querySelectorAll('.job').forEach((el, i) => {
        el.style.transitionDelay = `${0.4 + (i * 0.2)}s`;
    });

    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.scene, #intro').forEach(scene => {
        observer.value.observe(scene);
    });
});

onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect();
    }
    window.removeEventListener("beforeunload", () => window.scroll(0, 0));
});
</script>

<style>
/* Modern Native Scroll Animations */
.scene .title, .scene .std, .scene .cert-card, .scene .skill-pill, .scene .job,
#intro .title, #intro .std {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.scene.is-visible .title, .scene.is-visible .std, .scene.is-visible .cert-card, .scene.is-visible .skill-pill, .scene.is-visible .job,
#intro.is-visible .title, #intro.is-visible .std {
    opacity: 1;
    transform: translateY(0);
}

.scene.is-visible .title, #intro.is-visible .title { transition-delay: 0.1s; }
.scene.is-visible .std, #intro.is-visible .std { transition-delay: 0.3s; }
</style>
