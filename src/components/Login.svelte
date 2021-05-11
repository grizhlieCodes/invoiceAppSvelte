<script>
    import authStore from '../stores/userStore.js'

    let showLogin = false

    let email, password

    const updatePassword = (event) => {
        let val = event.target.value
        password = val
    }

    const updateEmail = (event) => {
        let val = event.target.value
        email = val
    }

    const loginOption = (option) => {
        if(option === 'signin'){
            showLogin = true
        }
        if(option === 'signup'){
            showLogin = false
        }
    }
    const signInUser = (email, password) => authStore.signInUser(email, password)
    const signUpUser = (email, password) => authStore.signUpUser(email, password)


</script>

<div class="login-container">

    <div class="login-options">
        <button on:click={() => {loginOption('signin')}}>Sign In</button>
        <button on:click={() => {loginOption('signup')}}>Sign Up</button>
    </div>

    {#if showLogin}
        <form action="" on:submit|preventDefault={signInUser}>
            <input type="text" on:input={updateEmail} placeholder="Email" id="email">
            <input type="password" on:input={updatePassword} placeholder="Password">
            <button type="submit">
                Sign In
            </button>
        </form>

    {:else}

        <form action="" on:submit|preventDefault={signUpUser}>
            <input type="email" on:input={updateEmail} placeholder="Email" id="email">
            <input type="password" on:input={updatePassword} placeholder="Password">
            <button type="submit">
                Sign Up
            </button>
        </form>
        
    {/if}


</div>

<style lang="scss">
    .login-container {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: v(white);
        height: 500px;
    }
</style>

