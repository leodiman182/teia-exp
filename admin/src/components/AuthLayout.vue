
<template>
    <div class="page-login min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.page-login {
    height: 100vh;
    background: url(../assets/IMGS/BGIMAGEDARK.jpg);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
}
</style>