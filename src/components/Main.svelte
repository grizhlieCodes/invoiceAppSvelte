<script>
  import showLoginModal from '../stores/showLoginModal.js'
  import LoginModal from './Login.svelte'
  import User from '../stores/userStore.js'
  import Invoices from './Invoices.svelte'
  let showInvoices = true

    $: if($showLoginModal && $User){
        // showInvoices = false
    } else {
      showInvoices = true
    }

</script>

<style lang="scss">
  main {
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: main;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    place-items: center;
  }
</style>

<main>
  {#if !$User}
    <LoginModal />
  {/if}

  {#if showInvoices && $User}
     <Invoices/>
  {/if}

</main>
