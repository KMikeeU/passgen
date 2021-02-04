<template>
    <div class="navbar">
        <div class="navbar-group">
            <a class="navbar-item" href="/">
                <img class="navbar-image" src="/assets/img/logo.svg">
            </a>
            <a class="navbar-item" href="/">
                <div class="navbar-title navbar-link text-link">PassGen</div>
            </a>
        </div>
        <div class="navbar-group">
            <a class="navbar-item text-link navbar-link" href="#about">About</a>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../assets/scss/main.scss";
</style>

<script>
export default {
    name: 'NavBar'
}
</script>
