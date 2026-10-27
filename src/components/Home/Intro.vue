<template>
<!-- ==================================================
home
================================================== -->
<section id="intro" class="scene-intro" >
    <div class="static-container">
        <h1 class="title">
            <span class="iuri">Sebastian Ko</span>
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
    "<h2 style='color: red'>strsx</h2>",
    "",
    "<p style='color: #dbdbdb'>Manager, AppSec & DevSecOps | HTB COAE | OSCE3 | CISSP</p>",
    "",
    "> AI/LLM Security Research & Ops",
    "> AI-Driven Security Orchestration",
    "> Red Teaming & EDR Evasion",
    "> Security Automation & SIEM"
];

const typeFinish = () => {
    isFinish.value = false;
};
</script>

<style scoped>
#intro {
    position: relative;
}

.static-container {
    position: relative;
    z-index: 1;
}

.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 2.5s }
.v-enter-to { opacity: 1; }
</style>
