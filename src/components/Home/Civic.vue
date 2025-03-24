<template>
    <div>
        <section class="scene" id="activities">
            <div class="static-container">
                <div class="std">
                    <div id="amb-car">
                        <span class="amb-light"></span>
                        <img v-bind:src="require('@/images/ambulance.png')" />
                    </div>
                </div>
            </div>
        </section>
        <Titles :viewport="viewport" scene="stjohn">
            <h1 class="title">
                Civic activities
            </h1>
            <div class="std">
                <p>I also attent some of the civic activities.</p>
                <p>As a Member of Hong Kong St. John Ambulance, I saved people in an emergency situation.</p>
            </div>
            <img class="fa-bg" v-bind:src="require('@/images/first-aid.jpg')" />
        </Titles>
    </div>
</template>

<script setup>
import Titles from "./Titles.vue";

defineProps({
    viewport: Object
});

defineOptions({
    name: 'Civic'
});
</script>

<style lang="scss" scoped>
#amb-car {
    img {
        height: 150px;
        width: 150px;
        transform: rotate(-20deg);
    }

    .amb-light {
        position: fixed;
        margin-left: 52px;
        margin-top: 56px;
        width: 50px;
        height: 40px;
        background: white;
        transform-origin: center;
        transform: rotate(-20deg);
        animation: ambBlink 0.5s linear infinite;
        &:before {
            animation: ambBlink 0.5s linear infinite;
        }
    }
}

@keyframes ambBlink {
    0% { 
    background-color: #fff; box-shadow: 0 0 40vh #004A7F;
    }
    50% {
    background-color: #fff; box-shadow: 0px 0px 00px #fff
    }
    100% { background-color: #fff; box-shadow: 0 0 40vh #004A7F; }
}

.fa-bg{
    position: fixed;
    bottom: 0;
    right: 0;
    opacity: 0.2;
    height: 120vh;
}

@media screen and (max-width: 1024px) {
    .fa-bg{
        right: -12rem;
        height: 100vh;
        bottom: 4rem;
    }
}
</style>