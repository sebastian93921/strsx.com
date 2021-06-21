import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import ResumeConsole from './components/ResumeConsole.vue';
import RealResume from './components/RealResume.vue';
import NotFound from './components/404.vue';
import NProgress from 'nprogress';

// use
Vue.use(Router);

// create
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'strsx',
            component: Home,
            meta: {
                title: 'strsx.com',
                bodyClass: 'page-home',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Im Sebastian Ko, I am a developer, code reviewer and penetration tester and this is my eportfolio'
                    },
                    // facebook
                    {
                        name: 'og:title',
                        content: 'strsx.com'
                    },
                    {
                        name: 'og:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'og:description',
                        content: 'Im Sebastian Ko, I am a developer, code reviewer and penetration tester and this is my eportfolio'
                    },
                    // twitter
                    {
                        name: 'twitter:title',
                        content: 'strsx.com'
                    },
                    {
                        name: 'twitter:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'twitter:description',
                        content: 'Im Sebastian Ko, I am a frontend creative developer, designer and illustrator and this is my portfolio'
                    },
                ]
            }
        },
        {
            path: '/resume-console',
            name: 'strsx',
            component: ResumeConsole,
            meta: {
                title: 'strsx.com',
                bodyClass: 'body-resume-console',
                metaTags: [
                    {
                        name: 'description',
                        content: 'This is the resume console of Sebastian Ko'
                    },
                    // facebook
                    {
                        name: 'og:title',
                        content: 'strsx.com'
                    },
                    {
                        name: 'og:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'og:description',
                        content: 'This is the resume console of Sebastian Ko'
                    },
                    // twitter
                    {
                        name: 'twitter:title',
                        content: 'strsx.com'
                    },
                    {
                        name: 'twitter:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'twitter:description',
                        content: 'This is the resume console of Sebastian Ko'
                    },
                ]
            }
        },
        {
            path: '/real-resume',
            name: 'strsx',
            component: RealResume,
            meta: {
                title: 'strsx.com',
                bodyClass: 'resume'
            }
        },
        {
            path: '*',
            name: '404',
            component: NotFound,
            meta: {
                title: `Ops! Page not found`,
                bodyClass: 'page-err404',
                metaTags: [
                    {
                        name: 'description',
                        content: 'Ops! Page not found'
                    },
                    // facebook
                    {
                        name: 'og:title',
                        content: `Ops! Page not found`
                    },
                    {
                        name: 'og:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'og:description',
                        content: 'Ops! Page not found'
                    },
                    // twitter
                    {
                        name: 'twitter:title',
                        content: `Ops! Page not found`
                    },
                    {
                        name: 'twitter:url',
                        content: 'https://strsx.com/'
                    },
                    {
                        name: 'twitter:description',
                        content: 'Ops! Page not found'
                    },
                ]
            },
        },
    ]
});

// NProgress
NProgress.configure({
    easing: 'ease-out',
    speed: 500,
    trickleSpeed: 100,
    showSpinner: false,
});

// beforeEach
router.beforeEach((to, from, next) => {

    // 01. lock scroll
    document.body.classList.add('locked');
    // 02. start loader
    NProgress.start();
    // 03. remove classes to avoid styles conflicts
    document.body.classList.remove(
        '-mario-lock',
        '-mario-easter-egg',
        '-bit16',
        '-mario-played',
        '-open-nav',
    );

    // 04. Update meta tags
    /*
    This goes through the matched routes from last to first, finding the closest route with a title.
    eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    */
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta');
            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key]);
            });
            // We use this to track which meta tags we create, so we don't interfere with other ones.
            tag.setAttribute('data-vue-router-controlled', '');
            return tag;
        })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));

    // 05. continue
    next();
});

// afterEach
router.afterEach((to, from) => {
    // wait to complete intro transitions
    setTimeout(() => {
        // scroll to top
        // doing it here because the scrollBehavior() was triggered before the animations
        window.scroll(0,0);
        // 01. stop loader
        NProgress.done();
        // 02. release scroll
        document.body.classList.remove('locked');
    }, 1000)
});

export default router;