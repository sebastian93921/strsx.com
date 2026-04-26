<template>
    <div>
        <Titles :viewport="viewport" scene="experience">
            <h1 class="title">
                Job history
            </h1>
            <div class="std">
                <p class="-gray">// Post and experience</p>
                <div class="experience">
                    <div class="job" v-for="job in jobs" :key="job.id">
                        <div class="jobIcon">
                            <img height="32" width="32" v-bind:src="require('@/images/jobs/' + job.icon)" />
                        </div>
                        <div class="jobBlock">
                            <span class="company">{{ job.company }}</span>
                            <span class="role">{{ job.role }}</span>
                        </div>
                        <div class="yearBlock">
                            <div class="year">{{ job.year }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="burprequest">
                <AutoType :typeArray="typeArray" />
            </div>
        </Titles>
    </div>
</template>

<script setup>
import Titles from "./Titles.vue";
import AutoType from '@/services/AutoType';
import { ref } from 'vue';

defineProps({
    viewport: Object
});

defineOptions({
    name: 'ExperienceSection'
});

const isFinish = ref(false);
const typeArray = ref([
    "GET / HTTP/1.1",
    "Host: strsx.com",
    "Cache-Control: max-age=0",
    "Sec-Ch-Ua: \" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
    "Sec-Ch-Ua-Mobile: ?0",
    "Dnt: 1",
    "Upgrade-Insecure-Requests: 1",
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Sec-Fetch-Site: none",
    "Sec-Fetch-Mode: navigate",
    "Sec-Fetch-User: ?1",
    "Sec-Fetch-Dest: document",
    "Accept-Encoding: gzip, deflate",
    "Accept-Language: en,zh-TW;q=0.9,zh;q=0.8,ja;q=0.7,zh-CN;q=0.6",
    "If-Modified-Since: Tue, 25 May 2021 15:47:31 GMT",
    "Connection: close",
    "",
    "",
    "",
]);

const jobs = ref([
    {
        "id":5,
        "company":"Crypto.com",
        "role":"Manager, AppSec and DevSecOps",
        "year":"21 ~",
        "icon":"crypto.png"
    },
    {
        "id":4,
        "company":"Worldline Ltd",
        "role":"Solution Consultant",
        "year":"20 - 21",
        "icon":"wordline.png"
    },
    {
        "id":3,
        "company":"Octopus Cards Ltd",
        "role":"Senior System Engineer",
        "year":"16 - 20",
        "icon":"octopus.png"
    },
    {
        "id":2,
        "company":"PCCW Solution",
        "role":"Solution Developer",
        "year":"15 - 16",
        "icon":"pccw.png"
    },
    {
        "id":1,
        "company":"Prime Creation",
        "role":"Analysis Programmer",
        "year":"14 - 15",
        "icon":"primecreation.png"
    }
]);


</script>

<style scoped>
.burprequest{
    font-size: 1.5vh;
    bottom: 10vh;
    color: darkslategrey;
    margin-left: -3.6rem;
    z-index: -1;
    position: absolute;
}

.experience {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.job{
    background: #222!important;
    border-radius: 15px;
    display: flex;
    align-items: center;
    height: 60px;
    width: 300px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
}
.jobIcon{
    margin-left:10px;
    margin-top: 10px;
}
.jobBlock{
    width: 80%;
}
.jobBlock span{
    display: block;
    margin-left:15px;
}
.company {
    font-size: 1rem;
    color: #dbdbdb;
    font-weight: bold;
}
.role {
    font-size: 0.65rem;
    color: #3cb878;
}
.yearBlock{
    width: 20%;
    margin-right: 15px;
}
.year{
    font-size: 0.7rem;
    color: #808080;
}

@media screen and (max-width: 568px) {
    .job {
        width: 260px;
        height: 55px;
    }
    .company {
        font-size: 0.85rem;
    }
    .role {
        font-size: 0.55rem;
    }
    .burprequest {
        display: none; /* Hide the long text background on mobile to reduce clutter */
    }
}
</style>