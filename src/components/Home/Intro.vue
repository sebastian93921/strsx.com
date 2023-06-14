<template>
<!-- ==================================================
home
================================================== -->
<section id="intro" class="scene-intro" >
    <div class="static-container">
        <h1 class="title">
            <span class="iuri">strsx</span>
        </h1>
        
        <div class="home-content">

            <div class="row home-content__main">

                <h4>
                    <AutoType :typeArray="typeArray" @FinishEvent="typeFinish" />
                    <div class="typed-text">
                        <span v-if="isFinish" class="cursor">&nbsp;</span>
                    </div>
                </h4>
            </div>

        </div> <!-- end home-content -->
    </div>
    <img class="intro-bg" v-bind:src="require('@/images/offsec.png')" />
</section> <!-- end s-home -->
</template>

<script>
import AutoType from '@/services/AutoType'

export default {
    name: 'Intro',
    data: () => {
        return {
            isFinish: false,
            typeArray: [
                    "<h2 style='color: red'>Sebastian Ko</h2>",
                    "",
                    "<p style='color: #dbdbdb'>Developer, Reviewer & Pentester, Hong Kong</p>",
                    "",
                    "> Research and Development",
                    "> Backend system review & pentesting",
                    "> Test automation"
                    ],
        }
    },
    components:{
        AutoType
    },
    methods: {
        typeFinish(){
            this.isFinish = false;
        }
    },
    created() {
    }
}

</script>

<style scoped>

.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 2.5s }
.v-enter-to { opacity: 1; }


</style>
