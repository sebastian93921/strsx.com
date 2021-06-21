<template>
    <div id="app" :class="this.$route.meta.bodyClass">
        <BgBody />

        <Header :routeName="this.$route.name"
                :viewport="viewport" />


        <router-view :viewport="viewport" />

    </div>
</template>

<script>
    // styles
    import '@/styles/app.scss';
    import '@/styles/nprogress.scss';
    // GSAP + ScrollMagic
    import * as ScrollMagic from "scrollmagic";
    import { TweenMax, TimelineMax } from "gsap";
    import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
    ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);
    // Components
    import Header from '@/components/Header.vue';
    import BgBody from '@/components/BgBody.vue';

    export default {
        name: 'App',
        data() {
            return {
                viewport: {
                    w: window.innerWidth,
                    h: window.innerHeight,
                    is568: window.innerWidth <= 568,
                    is768: window.innerWidth <= 768,
                    is1024: window.innerWidth <= 1024,
                },
                introTimeline: new TimelineMax(),
                leaveTimeline: new TimelineMax(),
            };
        },
        created() {
            // update viewport
            this.updateViewport();
            // add resize listener
            window.addEventListener('resize', this.updateViewport);
            // add beforeunload listener, in case of refresh
            window.addEventListener("beforeunload", () => window.scroll(0,0));
        },
        methods: {
            updateViewport() {
                // update
                this.viewport = {
                    w: window.innerWidth,
                    h: window.innerHeight,
                    is568: window.innerWidth <= 568,
                    is768: window.innerWidth <= 768,
                    is1024: window.innerWidth <= 1024,
                }
            },
        },
        components: {
            Header,
            BgBody,
        },
    };
</script>
