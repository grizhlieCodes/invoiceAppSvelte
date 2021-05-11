<script>
    import showLoginModal from '../stores/showLoginModal.js'
    import LoginModal from './Login.svelte'

</script>

<main>
    {#if $showLoginModal}
         <LoginModal />
    {/if}
</main>

<style lang="scss">
    main {
        position: relative;
        width: 100%;
        height: 100%;
        grid-area: main;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
</style>