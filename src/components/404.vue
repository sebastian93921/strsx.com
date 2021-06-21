<template>
    <div id="err404" class="wrapper">

        <div class="static-container">
            <h1 class="title">
                Oooops!
            </h1>

            <div class="std">
                <h2 style='color: red'>$ 404 Page not found</h2>
                <br>
                <p>The page you requested could not be found.</p>
                <ul>
                    <li>
                        <router-link to="/" title="Back to index">
                            Back to index
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/resume-console" title="Take my resume">
                            Resume console
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: '404'
    };
</script>
