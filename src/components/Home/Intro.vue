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

<script setup>
import { ref } from 'vue';
import AutoType from '@/services/AutoType';

defineOptions({
    name: 'IntroSection'
});

const isFinish = ref(false);
const typeArray = [
    "<h2 style='color: red'>Sebastian Ko</h2>",
    "",
    "<p style='color: #dbdbdb'>Manager, AppSec & DevSecOps | HTB CWEE | OSCE3 | CISSP</p>",
    "",
    "> AI & LLM Security Operations",
    "> Enterprise Red Teaming & EDR Evasion",
    "> Security Engineering & DevSecOps"
];

const typeFinish = () => {
    isFinish.value = false;
};
</script>

<style scoped>

.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 2.5s }
.v-enter-to { opacity: 1; }


</style>
