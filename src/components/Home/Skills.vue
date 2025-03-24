<template>
    <div>
        <Titles :viewport="viewport" scene="skills">
            <h1 class="title" v-if="viewport.is768">
                <p>Tools &</p>
                <p>Framework</p>
            </h1>
            <h1 class="title" v-else>
                Tools & Framework
            </h1>
            <div class="std">
                <p class="-gray">// Technologies I've been working with recently</p>
            </div>
            
            <div class="std boxstage" v-if="viewport.is768">
                <div class="boxarea">
                    <div class="box box1">
                        <a href="https://www.kali.org/" title="" class=""><img src="@/images/strengths/kali-linux.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box2">
                        <a href="https://www.offensive-security.com/" title="" class=""><img src="@/images/strengths/penetration-test.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box3">
                        <a href="https://www.java.com/" title="" class=""><img src="@/images/strengths/java.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box4">
                        <a href="https://spring.io/" title="" class=""><img src="@/images/strengths/spring.png" width="60px" height="60px"/></a>
                    </div>
                </div>
                <div class="boxarea">
                    <div class="box box5">
                        <a href="https://www.python.org/" title="" class=""><img src="@/images/strengths/python.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box6">
                        <a href="https://golang.org/" title="" class=""><img src="@/images/strengths/golang.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box7">
                        <a href="https://vuejs.org/" title="" class=""><img src="@/images/strengths/vuejs.png" width="60px" height="60px"/></a>
                    </div>
                     <div class="box box8">
                        <a href="https://nodejs.org/" title="" class=""><img src="@/images/strengths/nodejs.png" width="60px" height="60px"/></a>
                    </div>
                </div>
                <div class="boxarea">
                    <div class="box box9">
                        <a href="https://www.docker.com/" title="" class=""><img src="@/images/strengths/docker.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box10">
                        <a href="https://kubernetes.io/" title="" class=""><img src="@/images/strengths/kubernates.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box11">
                        <a href="https://www.mysql.com/" title="" class=""><img src="@/images/strengths/mysql.png" width="60px" height="60px"/></a>
                    </div>
                     <div class="box box12">
                        <a href="https://www.influxdata.com/" title="" class=""><img src="@/images/strengths/influxdb.png" width="60px" height="60px"/></a>
                    </div>
                </div>
            </div>
            <div class="std boxstage" v-else>
                <div class="boxarea">
                    <div class="box box1">
                        <a href="https://www.kali.org/" title="" class=""><img src="@/images/strengths/kali-linux.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box2">
                        <a href="https://www.offensive-security.com/" title="" class=""><img src="@/images/strengths/penetration-test.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box3">
                        <a href="https://www.java.com/" title="" class=""><img src="@/images/strengths/java.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box4">
                        <a href="https://spring.io/" title="" class=""><img src="@/images/strengths/spring.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box5">
                        <a href="https://www.python.org/" title="" class=""><img src="@/images/strengths/python.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box6">
                        <a href="https://golang.org/" title="" class=""><img src="@/images/strengths/golang.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box7">
                        <a href="https://vuejs.org/" title="" class=""><img src="@/images/strengths/vuejs.png" width="60px" height="60px"/></a>
                    </div>
                     <div class="box box8">
                        <a href="https://nodejs.org/" title="" class=""><img src="@/images/strengths/nodejs.png" width="60px" height="60px"/></a>
                    </div>
                </div>
                <div class="boxarea">
                    <div class="box box9">
                        <a href="https://www.docker.com/" title="" class=""><img src="@/images/strengths/docker.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box10">
                        <a href="https://kubernetes.io/" title="" class=""><img src="@/images/strengths/kubernates.png" width="60px" height="60px"/></a>
                    </div>
                    <div class="box box11">
                        <a href="https://www.mysql.com/" title="" class=""><img src="@/images/strengths/mysql.png" width="60px" height="60px"/></a>
                    </div>
                     <div class="box box12">
                        <a href="https://www.influxdata.com/" title="" class=""><img src="@/images/strengths/influxdb.png" width="60px" height="60px"/></a>
                    </div>
                </div>
            </div>
        </Titles>
    </div>
</template>

<script setup>
import Titles from './Titles.vue';

defineProps({
    viewport: Object
});

defineOptions({
    name: 'SkillsSection'
});
</script>

<style scoped>
.boxstage{
    height:40vh;
    width: 100%;
}
.boxarea{
    display: flex;
    justify-content: center;
    align-items: center;
}
.box {
    height: 60px;
    width: 60px;
    align-items: center;
    margin: 10px;
    font-size: 1.2em;
    font-weight: 700;
    color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>