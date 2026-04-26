<template>
    <div>
        <Titles :viewport="viewport" scene="certifications">
            <h1 class="title">
                Achievements
            </h1>
            <div class="std">
                <p class="-gray">// Major certifications & accomplishments</p>
            </div>
            
            <div class="certs-container">
                <div class="cert-card" v-for="(cert, index) in certs" :key="cert.name" :class="{ 'full-width': index === 0 }">
                    <div class="cert-year">{{ cert.year }}</div>
                    <h3 class="cert-name">{{ cert.name }}</h3>
                    <p class="cert-desc">{{ cert.desc }}</p>
                </div>
            </div>
        </Titles>
    </div>
</template>

<script setup>
import Titles from './Titles.vue';
import { ref } from 'vue';

defineProps({
    viewport: Object
});

defineOptions({
    name: 'CertificationsSection'
});

const certs = ref([
    {
        name: "Black Hat MEA 2025 Finalist",
        year: "2025",
        desc: "Recognized for high-level technical skills and competitive performance in a prestigious global security competition."
    },
    {
        name: "HTB CWEE",
        year: "Hack The Box",
        desc: "Hack The Box Certified Web Exploitation Expert"
    },
    {
        name: "OSCE3",
        year: "OffSec",
        desc: "Offensive Security Certified Expert 3 (OSEP, OSED, OSWE)"
    },
    {
        name: "CISSP",
        year: "ISC2",
        desc: "Certified Information Systems Security Professional"
    }
]);
</script>

<style scoped>
.certs-container {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 4rem;
}

.cert-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    width: calc(33.333% - 14px); /* 3 columns for certs */
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.cert-card.full-width {
    width: 100%; /* First item takes full width */
}

.cert-card:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-5px);
    border-color: rgba(104, 42, 233, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.cert-year {
    color: #3cb878;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 1px;
}

.cert-name {
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 12px;
    font-weight: 600;
}

.cert-desc {
    color: #808080;
    font-size: 0.9rem;
    line-height: 1.5;
}

@media screen and (max-width: 1024px) {
    .cert-card {
        width: calc(50% - 10px);
    }
    .cert-card.full-width {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .cert-card {
        width: 100%;
    }
}

@media screen and (max-width: 568px) {
    .certs-container {
        margin-top: 1rem;
        gap: 12px;
    }
    .cert-card {
        padding: 16px;
    }
    .cert-name {
        font-size: 1.1rem;
        margin-bottom: 8px;
    }
    .cert-desc {
        font-size: 0.85rem;
    }
}
</style>
