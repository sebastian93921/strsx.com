<template>
    <header id="header">
        <GitHubCorner />

        <div class="header-bg">
            <div class="-default"></div>
        </div>

        <div class="header-container">
            <div class="header-breadcrumb">
                <a class="site-logo">
                    <img src="@/images/logo.png" alt="Homepage" height="60px" style="margin-top: 50px;">
                </a>
            </div>

            <router-link to="/resume-console" title="Resume" class="home-resume">$Resume</router-link>
        </div>
    </header>
</template>

<script>
    import GitHubCorner from '@/components/GitHubCorner.vue';

    export default {
        name: 'Header',
        props: {
            routeName: String,
            viewport: Object,
        },
        methods: {
            openMenu(){
                document.body.classList.add('-open-nav');
            },
            closeMenu(){
                document.body.classList.remove('-open-nav');
            },
        },
        components: {
            GitHubCorner
        }
    };
</script>

<style lang="scss">
.home-resume{
    color: var(--light);
    transition: color 400ms ease-out;

    &:hover{
        color: var(--red);
    }
}

@media screen and (max-width: 1450px) {
    .home-resume{
        transform: rotate(44deg);
        margin-top: 44px;
    }
}

@media print {
    #header{
        display: none !important;
    }
}

#header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 8rem;
    padding: 0 1rem 5rem;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3rem;
    max-width: 80rem;
    margin: 0 auto;
}

.header-breadcrumb {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--purple)
}

</style>
