<script>
  import Button from './Button.svelte'
  import User from '../stores/userStore.js'
  import SmallModal from './SmallModal.svelte'
  export let timer
  let userId
  let localUserInfo = []

  if ($User) {
    userId = $User.uid
    console.log(userId)
    fetch(
      `https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`,
    )
      .then((data) => data.json())
      .then((userInfo) => {
        console.log(userInfo)
        for (const key in userInfo) {
          localUserInfo = {
            ...userInfo[key],
          }
        }
        console.log(localUserInfo.name)
      })
      .catch((err) => console.log(err))
  }

  const signOutUser = () => {
      User.signOutUser()
  }
</script>

<style lang="scss">
    .user-info-container {
        width: 100%;
        max-width: 400px;
        height: 500px;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        grid-row: 1/2;
        grid-column: 1/2;
    }

    h1 {
        color: v(small-modal-h1-text);
        text-align: center;
        font-size: 3rem;
    }
    p {
        color: v(main-text-color);
        font-size: 1.6rem;
        margin-bottom: 4rem;
        max-width: 300px;
        font-weight: v(font-semi-bold);
        text-align: center;
        line-height: 2rem;
    }
</style>

<SmallModal>

  {#if $User}
    <div class="user-info-container">
      <h1>Welcome {localUserInfo.name}.</h1>
      <p>You have 5 unfinished tasks. <br>Get to work boyo.</p>
      <p>Closing this modal in {timer} seconds.</p>
      <Button type="button" on:click={signOutUser} btnClass="dark" content="Sign Out"/>
    </div>
  {/if}


</SmallModal>
