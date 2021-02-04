<template>
    <div id="app">
        <NavBar />
        <Generator />
        <About />
        <Footer />
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Generator from './components/Generator.vue'
import About from './components/About.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    components: {
        NavBar,
        Generator,
        About,
        Footer
    }
}

</script>

<style lang="scss">
    @import "assets/scss/main.scss";
</style>