<template>
    <section class="scene" id="thanks">
        <div class="static-container">
            <h1 class="title">
                Thanks for coming
            </h1>
            // More about this page
            <div class="code-border-line"></div>
            <div class="code-viewer">
                <table class="" cellspacing="0" cellpadding="0">
                    <colgroup>
                        <col class="code-line-column">
                        <col class="code-content-column">
                    </colgroup>
                    <tbody>
                        <tr v-for="codeArray in codeArrays" :key="codeArray.line" >
                            <td class="code-line">{{codeArray.line}}</td>
                            <td class="code-content"><span v-html="codeArray.code" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="code-border-line"></div>
            <pre class="console">
<span class="compile-done">DONE</span>  <span class="compile-sen">Compiled successfully in 243ms</span> <span v-if="!viewport.is768" class="compile-time">{{getNow()}}</span><span v-else></span>

App running at:
- Local:   http://localhost/
- Network: https://strsx.com/
            </pre>
            <pre>
                <span v-if="viewport.is568" class="compile-time">{{getNow()}}</span><span v-else></span>
            </pre>
        </div>
    </section>
</template>

<script>




export default {
    props: {
        viewport: Object
    },
    name: 'Thanks',
    data: () => {
        return {
            codeArrays: [
                {line: 21, code:"<span style='color: var(--red);'>public void</span> <span style='color: var(--yellow);'>futureDirection()</span> {"},
                {line: 22, code:"&nbspfrom(\"Future.Direction\")"},
                {line: 23, code:"&nbsp&nbsp.body(\"<span style='color: var(--yellow);'>In the future, I would fight for more chances in development to master up my skills</span>\")"},
                {line: 24, code:"&nbsp&nbsp.and(\"<span style='color: var(--yellow);'>Helping each others problem also is my goal of success</span>\")"},
                {line: 25, code:"&nbsp&nbsp.and(\"<span style='color: var(--yellow);'>I hope I can improve these my life style.</span>\");"},
                {line: 26, code:"}"},
                {line: 27, code:""},
                {line: 28, code:"<span style='color: var(--red);'>public void</span> <span style='color: var(--yellow);'>howItsMade()</span> {"},
                {line: 29, code:"&nbspfrom(\"Visual.Studio.Code\")"},
                {line: 30, code:"&nbsp&nbsp.to(\"<span style='color: var(--yellow);'>Vue.js</span>\")"},
                {line: 31, code:"&nbsp&nbsp.with(\"<span style='color: var(--yellow);'>GSAP</span>\")"},
                {line: 32, code:"&nbsp&nbsp.and(\"<span style='color: var(--yellow);'>ScrollMagic</span>\")"},
                {line: 33, code:"}"},
                {line: 34, code:""},
                {line: 35, code:"<span style='color: var(--red);'>public void</span> <span style='color: var(--yellow);'>contact()</span> {"},
                {line: 36, code:"&nbspfrom(\"My.Contact\")"},
                {line: 37, code:"&nbsp&nbsp.to(\"<span style='color: var(--yellow);'>sebastian.ko.dv@gmail.com</span>\");"},
                {line: 38, code:"}"},
                {line: 49, code:""},
                {line: 40, code:"// If you want to know more about me, please check my resume"},
            ]
        }
    },
    methods: {
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds());
            const dateTime = date +' '+ time;
            return dateTime;
        }
    }
}
</script>

<style lang="scss" scoped>
.code-viewer{
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    font-size: 1rem;
    color: var(--light);

    .code-line{
        min-width: 22px;
        border-right: 1px solid #3a3a3a; 
    }

    .code-content{
        padding-left: 4px;
    }
}

.code-border-line{
    width: auto;
    height: 1px;
    margin-left: -20px;
    margin-right: -20px;
    background: #3a3a3a;
}

.console{
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    margin-top:20px;

    .compile-done{
        color:black;
        background-color: yellowgreen;
    }

    .compile-sen{
        color: yellowgreen;
    }

}

.compile-time{
    font-family: Consolas, Monaco, 'Andale Mono', monospace;
    position: absolute;
    right: 0px;
}
</style>