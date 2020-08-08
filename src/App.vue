<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "App",

        title: ()  => 'Home',

        methods: {

            updateDetailsOfThemeParts(theme) {
                // Set class html tag with theme to change style of scrollbars in webkit engines browsers by restyle themes
                document.getElementsByTagName('html')[0].setAttribute('class', `theme--${theme}`)
            },

        },

        mounted() {
            this.updateDetailsOfThemeParts(this.$store.state.theme)
        },

        watch: {

            theme(newTheme) {
                this.updateDetailsOfThemeParts(newTheme)
            },

        },
    }
</script>
