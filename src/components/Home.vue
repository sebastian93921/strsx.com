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

        <!--Civic info-->
        <Civic :viewport="viewport" />

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
// ScrollMagic
import * as ScrollMagic from "scrollmagic";
// components
import Intro from "@/components/Home/Intro.vue";
import Skills from "@/components/Home/Skills.vue";
import Experience from "@/components/Home/Experience.vue";
import Civic from "@/components/Home/Civic.vue";
import Thanks from "@/components/Home/Thanks.vue";
import Spine from '@/components/Spine.vue';
import { gsap } from "gsap";

defineProps({
    viewport: Object,
});

defineOptions({
    name: 'HomePage'
});

const intro = gsap.timeline();
const scroller = new ScrollMagic.Controller();
const scenes = ref([]);
const timeLines = ref([]);
const tweeners = ref([]);

const setupScenes = () => {
    const scenesElements = document.querySelectorAll(".scene");
    for (let [i, scenesElement] of Array.from(scenesElements).entries()) {
        // tweeners, to animate the time lines' progress, to add momentum
        tweeners.value[i] = gsap.timeline();
        // time lines
        timeLines.value[i] = gsap.timeline({paused: true});
        // create scenes on ScrollMagic
        scenes.value[i] = new ScrollMagic.Scene({
            triggerElement: scenesElement,
            offset: 0,
            duration: scenesElement.offsetHeight
        })
            .setTween(tweeners.value[i])
            .addTo(scroller)
            .reverse(true)
            .setClassToggle(scenesElement, "active");
        // animate the progress in the time lines
        tweeners.value[i]
            .to(scenesElement, 1, {autoAlpha: 1}) // fake, just to have some progress
            .eventCallback('onUpdate', event => {
                gsap.to(timeLines.value[i], .5, {
                    progress: tweeners.value[i].progress(),
                    ease: "none"
                });
            });
    }
};

const playIntro = () => {
    /**
     * @desc
     * intro scene
     */
    intro
        .set("#intro .intro-bg",{autoAlpha:1})
        .addLabel('enter', 1)
        .to('#intro .intro-bg', 3 ,{
            autoAlpha: 0,
        });

    //Intro specific scene
    const introScene = document.querySelector("#intro");
    new ScrollMagic.Scene({
        triggerElement: introScene,
        offset: 0,
        duration: introScene.offsetHeight
    })
        .setTween(intro)
        .addTo(scroller)
        .reverse(true)
        .setClassToggle(introScene, "active");
};

const sceneskillsVitae = () => {
    timeLines.value[0]
        .set('#skills .title-container', {autoAlpha: 1})
        .addLabel('start', 0)
        .from('#skills .title', 2, {
            yPercent: -50,
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .from('#skills .std', 2, {
            yPercent: 50,
            autoAlpha: 0,
            rotationX: -90,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .staggerFrom(".box", 4, {
            scale: 0,
            cycle: {
                y: [-50, 50]
            },
            ease: "elastic.out",
            stagger: {
                from: "center",
                amount: 0.25
            }
        })
        .to('#skills .title, #skills .std', 2, {
            autoAlpha: 0,
            yPercent: -100
        });
};

const sceneJobHistory = () => {
    timeLines.value[1]
        .set('#experience .title-container', {autoAlpha: 1})
        .addLabel('start', 0)
        .from('#experience .title', 2, {
            xPercent: 100,
            autoAlpha: 0,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .from('#experience .std', 2, {
            xPercent: 100,
            autoAlpha: 0,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .from('#experience .burprequest', 2, {
            yPercent: -50,
            autoAlpha: 0,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .staggerFrom('#experience .std .experience .job', 4, {
            xPercent: -50,
            autoAlpha: 0,
            rotationX: 90,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
            stagger: 1
        })
        .to('#experience .std .experience .job', 3, {
            xPercent: -100,
            autoAlpha: 0,
        })
        .to('#experience .title, #experience .std, #experience .burprequest', 2, {
            autoAlpha: 0,
            xPercent: -100
        });
};

const ambulanceCar = () => {
    timeLines.value[2]
        .set('#amb-car', {autoAlpha: 1})
        .addLabel('start', 0)
        .from('#amb-car', 4, {
            x:'120vw',
            y: '-70vh',
        })
        .to('#amb-car', 4, {
            x:'-120vw',
            y: '70vh',
        });

    timeLines.value[3]
        .set('#stjohn .title-container', {autoAlpha: 1})
        .addLabel('start', 0)
        .from('#stjohn .title', 2, {
            xPercent: 100,
            autoAlpha: 0,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .from('#stjohn .std', 2, {
            xPercent: 100,
            autoAlpha: 0,
            transformOrigin: '50% 50% -100px',
            ease: "power3.out",
        }, 'start')
        .from('#stjohn .fa-bg', 3 ,{
            autoAlpha: 0,
        })
        .to('#stjohn .title-container, #stjohn .std', 3, {
            xPercent: 100,
            autoAlpha: 0,
        })
        .to('#stjohn .fa-bg', 3 ,{
            autoAlpha: 0,
        });
};

onMounted(() => {
    // before leaving the page, in case of refresh
    window.addEventListener("beforeunload", () => window.scroll(0, 0));
    
    playIntro();
    setupScenes();
    sceneskillsVitae();
    sceneJobHistory();
    ambulanceCar();
});

onBeforeUnmount(() => {
    // kill time lines
    timeLines.value.forEach(tl => tl.kill());
    // destroy ScrollMagic controller
    scroller.destroy();
    window.removeEventListener("beforeunload", () => window.scroll(0, 0));
});
</script>
