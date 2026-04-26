<template>
<!-- ==================================================
home
================================================== -->
<section id="intro" class="scene-intro" >
    <canvas id="matrix-canvas"></canvas>
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
import { ref, onMounted } from 'vue';
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
    "> AI/LLM Security Research & Ops",
    "> AI-Driven Security Orchestration",
    "> Red Teaming & EDR Evasion",
    "> Security Automation & SIEM"
];

const typeFinish = () => {
    isFinish.value = false;
};

onMounted(() => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    function draw() {
        ctx.fillStyle = "rgba(19, 18, 29, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#2a7a50";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = charArr[Math.floor(Math.random() * charArr.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 33);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    return () => clearInterval(interval);
});
</script>

<style scoped>
#matrix-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.1;
}

.static-container {
    position: relative;
    z-index: 1;
}

.v-enter { opacity: 0; }
.v-enter-active  { transition: opacity 2.5s }
.v-enter-to { opacity: 1; }
</style>
