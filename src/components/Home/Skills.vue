<template>
    <div>
        <Titles :viewport="viewport" scene="skills">
            <h1 class="title">
                Core Competencies
            </h1>
            <div class="std">
                <p class="-gray">// Technologies & methodologies I excel at</p>
            </div>
            
            <div class="skills-container">
                <div class="skill-category" v-for="category in skillCategories" :key="category.name">
                    <h3 class="category-name">{{ category.name }}</h3>
                    <div class="skill-tags">
                        <div class="skill-pill" v-for="skill in category.skills" :key="skill.name">
                            <span class="skill-icon">{{ skill.icon }}</span> {{ skill.name }}
                        </div>
                    </div>
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
    name: 'SkillsSection'
});

const skillCategories = ref([
    {
        name: "Cybersecurity",
        skills: [
            { name: "AI/LLM Security Testing", icon: "🤖" },
            { name: "Red Teaming & EDR Evasion", icon: "🎯" },
            { name: "Web & Mobile Pentesting", icon: "📱" },
            { name: "Cloud Security (AWS/Azure)", icon: "☁️" },
            { name: "Architecture Code Review", icon: "🔍" },
            { name: "Burp Suite", icon: "🕷️" },
            { name: "Nuclei", icon: "🚀" }
        ]
    },
    {
        name: "Development & Architecture",
        skills: [
            { name: "AI/LLM Programming", icon: "🧠" },
            { name: "LangChain & n8n", icon: "🔗" },
            { name: "Python", icon: "🐍" },
            { name: "Go", icon: "🐹" },
            { name: "Java", icon: "☕" },
            { name: "Docker & Kubernetes", icon: "🐳" },
            { name: "Spring Boot", icon: "🍃" },
            { name: ".NET", icon: "🌐" },
            { name: "Kafka", icon: "📨" },
            { name: "Linux/Windows AD", icon: "🐧" }
        ]
    },
    {
        name: "DevSecOps & Data",
        skills: [
            { name: "GitHub Actions", icon: "⚡" },
            { name: "ArgoCD", icon: "🐙" },
            { name: "SonarQube & Checkmarx", icon: "🛡️" },
            { name: "Semgrep", icon: "🔎" },
            { name: "PostgreSQL", icon: "🐘" },
            { name: "InfluxDB", icon: "📈" },
            { name: "Vector DB", icon: "📐" }
        ]
    }
]);
</script>

<style scoped>
.skills-container {
    width: 100%;
    margin-top: 2rem;
    padding-bottom: 4rem;
}

.skill-category {
    margin-bottom: 2rem;
}

.category-name {
    color: #dbdbdb;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.skill-pill {
    background: rgba(104, 42, 233, 0.1);
    border: 1px solid rgba(104, 42, 233, 0.3);
    color: #e0d4fc;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    cursor: default;
}

.skill-pill:hover {
    background: rgba(104, 42, 233, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(104, 42, 233, 0.2);
}

@media screen and (max-width: 568px) {
    .skills-container {
        margin-top: 1rem;
        padding-bottom: 1rem;
    }
    .category-name {
        font-size: 1.1rem;
    }
    .skill-tags {
        gap: 8px;
    }
    .skill-pill {
        padding: 6px 12px;
        font-size: 0.75rem;
    }
}
</style>