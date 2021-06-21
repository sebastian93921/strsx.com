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

<script>
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

    export default {
        name: 'home',
        props: {
            viewport: Object,
        },
        data() {
            return {
                intro: new TimelineMax(),
                scroller: new ScrollMagic.Controller(),
                scenes: [],
                timeLines: [],
                tweeners: [],
            }
        },
        created() {
            // before leaving the page, in case of refresh
            window.addEventListener("beforeunload", () => window.scroll(0, 0));
        },
        mounted() {
            this.playIntro();
            this.setupScenes();
            this.sceneskillsVitae();
            this.sceneJobHistory();
            this.ambulanceCar();
        },
        beforeDestroy() {
            // kill time lines
            this.timeLines.map(tl => tl.kill());
            // destroy ScrollMagic controller
            this.scroller.destroy();

        },
        methods: {
            setupScenes() {
                const scenesElements = document.querySelectorAll(".scene");
                for (let [i, scenesElement] of Array.from(scenesElements).entries()) {
                    console.log(scenesElement)
                    // tweeners, to animate the time lines' progress, to add momentum
                    this.tweeners[i] = new TimelineMax();
                    // time lines
                    this.timeLines[i] = new TimelineMax({paused: true});
                    // create scenes on ScrollMagic
                    this.scenes[i] = new ScrollMagic.Scene({
                        triggerElement: scenesElement,
                        offset: 0,
                        duration: scenesElement.offsetHeight
                    })
                        .setTween(this.tweeners[i])
                        .addTo(this.scroller)
                        .reverse(true)
                        .setClassToggle(scenesElement, "active");
                    // animate the progress in the time lines
                    this.tweeners[i]
                        .to(scenesElement, 1, {autoAlpha: 1}) // fake, just to have some progress
                        .eventCallback('onUpdate', event => {
                            TweenLite.to(this.timeLines[i], .5, {
                                progress: this.tweeners[i].progress(),
                                ease: Power0.easeNone
                            });
                        });
                }
            },
            playIntro() {
                /**
                 * @desc
                 * intro scene
                 */
                this.intro
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
                    .setTween(this.intro)
                    .addTo(this.scroller)
                    .reverse(true)
                    .setClassToggle(introScene, "active");
            },
            sceneskillsVitae(){
                this.timeLines[0]
                    .set('#skills .title-container', {autoAlpha: 1})
                    .addLabel('start', 0)
                    .from('#skills .title', 2, {
                        yPercent: -50,
                        autoAlpha: 0,
                        rotationX: 90,
                        transformOrigin: '50% 50% -100px',
                        ease: Power3.easeOut,
                    }, 'start')
                    .from('#skills .std', 2, {
                        yPercent: 50,
                        autoAlpha: 0,
                        rotationX: -90,
                        transformOrigin: '50% 50% -100px',
                        ease: Power3.easeOut,
                    }, 'start')
                    .staggerFrom(".box", 4, {
                        scale: 0,
                        cycle: {
                            y: [-50, 50]
                        },
                        ease: Elastic.easeOut,
                        stagger: {
                            from: "center",
                            amount: 0.25
                        }
                    })
                    .to('#skills .title, #skills .std', 2, {
                        autoAlpha: 0,
                        yPercent: -100
                    });
            },
            sceneJobHistory(){
                this.timeLines[1]
                .set('#experience .title-container', {autoAlpha: 1})
                .addLabel('start', 0)
                .from('#experience .title', 2, {
                    xPercent: 100,
                    autoAlpha: 0,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
                }, 'start')
                .from('#experience .std', 2, {
                    xPercent: 100,
                    autoAlpha: 0,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
                }, 'start')
                .from('#experience .burprequest', 2, {
                    yPercent: -50,
                    autoAlpha: 0,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
                }, 'start')
                .staggerFrom('#experience .std .experience .job', 4, {
                    xPercent: -50,
                    autoAlpha: 0,
                    rotationX: 90,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
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
            },
            ambulanceCar(){
                this.timeLines[2]
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

                this.timeLines[3]
                .set('#stjohn .title-container', {autoAlpha: 1})
                .addLabel('start', 0)
                .from('#stjohn .title', 2, {
                    xPercent: 100,
                    autoAlpha: 0,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
                }, 'start')
                .from('#stjohn .std', 2, {
                    xPercent: 100,
                    autoAlpha: 0,
                    transformOrigin: '50% 50% -100px',
                    ease: Power3.easeOut,
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
            }
        },
        components: {
            Intro,
            Skills,
            Experience,
            Civic,
            Thanks,
            Spine,
        }
    };
</script>
