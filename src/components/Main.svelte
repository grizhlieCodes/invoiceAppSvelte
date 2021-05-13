<script>
  import showLoginModal from '../stores/showLoginModal.js'
  import LoginModal from './Login.svelte'
  import User from '../stores/userStore.js'
  import UserInfo from './UserInfo.svelte'
  import Invoices from './Invoices.svelte'
  let showInvoices = true
  let timer = 4

    $: if($showLoginModal && $User){
        showInvoices = false
        timer = 4
        timerOne()
        setTimeout(() => {
            showLoginModal.set(false)
            showInvoices = true
        },4000)
    }

    function timerOne(){
        if(timer >= 1 && $User){
            timer--
            setTimeout(() => {
                timerOne()
            },1000)
        } else {
            return
        }
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
  {:else if  $showLoginModal && $User}
    <UserInfo {timer}/>
  {/if}

  {#if showInvoices && $User}
     <Invoices/>
  {/if}

</main>
