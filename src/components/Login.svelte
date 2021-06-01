<script>
  import authStore from '../stores/userStore.js'
  import User from '../stores/userStore.js'
  import Button from './Button.svelte'
  import Input from './Input.svelte'
  import { fade, fly } from 'svelte/transition'
  import SmallModal from './SmallModal.svelte'
  import {onMount} from 'svelte'

  let showLogin = true

  //==================================================
  //Update for default user for printscreen then remove

  let email = "", password = "" , name
  //==================================================
  const updatePassword = (event) => {
    let val = event.target.value
    password = val
  }

  const updateEmail = (event) => {
    let val = event.target.value
    email = val
  }

  const loginOption = (option) => {
    if (option === 'signin') {
      showLogin = true
    }
    if (option === 'signup') {
      showLogin = false
    }
  }

  const updateName = (event) => {
    let val = event.target.value
    name = val
  }

  const signInUser = () => authStore.signInUser(email, password)
  const signUpUser = () => authStore.signUpUser(email, password, name)

  //==================================================
  //UPDATE FOR DEFAULT USER
  // onMount(() => {
  //   const clickMoi = document.querySelector('.clickMoi')
  //   clickMoi.click()
  // })
  //==================================================
</script>

<style lang="scss">
  .login-options {
    display: flex;
    flex-flow: row nowrap;
    margin: 5rem auto 5rem;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 300px;

    p {
      color: v(login-or-text);
      transition: color 200ms ease;
    }
  }

  .forms-container {
    display: grid;
    grid: "form" 1fr / 1fr;
    form {
      grid-area: form;
    }
  }
</style>

<SmallModal>
  <div class="login-options">

    <Button
      on:click={() => {
        loginOption('signin')
      }}
      content="Sign In"
      type="button"
      btnClass={showLogin ? 'primary' : 'light'} />

    <p>OR</p>

    <Button
      on:click={() => {
        loginOption('signup')
      }}
      content="Sign Up"
      type="button"
      btnClass={!showLogin ? 'primary' : 'light'} />

  </div>

  <div class="forms-container">
    {#if showLogin}
      <form
        action=""
        on:submit|preventDefault={signInUser}
        in:fly={{ x: 25, duration: 350, delay: 200 }}
        out:fly={{ x: 25, duration: 350 }}>
        <Input
          type="email"
          on:input={updateEmail}
          id="email"
          label="Email"/>
        <Input
          type="password"
          on:input={updatePassword}
          id="password"
          label="Password"/>
        <Button content="Sign In" type="submit" btnClass="primary clickMoi" />
      </form>
    {:else}
      <form
        action=""
        on:submit|preventDefault={signUpUser}
        in:fly={{ x: 25, duration: 350, delay: 200  }}
        out:fly={{ x: 25, duration: 350 }}>
        <Input
          type="text"
          on:input={updateName}
          id="name"
          label="Name" />
        <Input
          type="email"
          on:input={updateEmail}
          placeholder="
          "
          id="email"
          label="Email" />
        <Input
          type="password"
          on:input={updatePassword}
          placeholder="
          "
          id="password"
          label="Password" />
        <Button content="Sign Up" type="submit" btnClass="light" />
      </form>
    {/if}

  </div>
</SmallModal>
