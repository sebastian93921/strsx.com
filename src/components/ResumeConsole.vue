<template comments>
    <main id="resume-console" class="wrapper">
        <section id="enter-pin" class="scene-intro" >
            <div class="static-container">
                <h1 class="title">
                    <span class="iuri">strsx</span>
                </h1>
                
                <div class="home-content">

                    <div class="row home-content__main">

                        <h4>Resume Console</h4>
                        <form action="/resume-console" class="form__group field">
                            <br>
                            <p>Due to privacy issue, please enter pin to open the resume:</p>
                            <input type="text" id="pin" name="pin" class="form__field" placeholder="Enter here">
                            <!-- <script> YXRvYigiVkdobElISmxZV3dnY0dGMGFDQnBjeUF2Y21WaGJDMXlaWE4xYldVPSIp </script> -->
                            <br>
                            <br>
                            <p>Please don't brute force the website.</p>
                            <p>If you can't find the pin, please email me for any assistance.</p>
                        </form>
                    </div>

                </div>
            </div>
        </section>

        <div class="mail-wrapper">
            <a href="mailto:sebastian.ko.dv@gmail.com"><h4>sebastian.ko.dv@gmail.com</h4></a>
        </div>
        <Spine />
    </main>
</template>

<script>
    // style
    import '@/styles/page-common.scss';
    import Spine from '@/components/Spine.vue';

    export default {
        name: 'resume-console',
        props: {
            viewport: Object,
        },
        data() {
            return {
            }
        },
        created() {
            // before leaving the page, in case of refresh
            window.addEventListener("beforeunload", () => window.scroll(0, 0));
        },
        components: {
            Spine,
        }
    };
</script>

<style lang="scss">
.form__field {
  font-family: inherit;
  width: 60%;
  border: 0;
  border-bottom: 2px solid var(--light);
  outline: 0;
  font-size: 1.3rem;
  color: #fff;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s
}

.form__field:focus {
  padding-bottom: 6px;  
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #222222,#222222);
  border-image-slice: 1;
}
</style>