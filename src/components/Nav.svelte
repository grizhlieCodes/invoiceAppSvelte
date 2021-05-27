<script>
  import darkMode from '../stores/darkModeStore.js'
  import Button from './Button.svelte'
  import { fade } from 'svelte/transition'
  import { getContext } from 'svelte'
  import User from '../stores/userStore.js'
  let userId
  let localUserInfo = []

  console.log(localUserInfo)

  const signOutUser = () => {
    User.signOutUser()
  }

  const toggleDarkMode = () => {
    darkMode.toggleDarkMode()
  }

  let size = getContext('size')

  let showPopup = false

  async function fetchUserInfo(userID) {
    let response = await fetch(
      `https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/users/${userID}.json`,
    )
    return await response.json()
  }

  const togglePopup = async () => {
    showPopup = !showPopup
      let fetchedUserData = await fetchUserInfo($User.uid)
      console.log(fetchedUserData)
      for (const key in fetchedUserData) {
        localUserInfo = {
          ...fetchedUserData[key],
        }
      }
  }

</script>

<style lang="scss">
  .navigation,
  .navigation.mobile {
    grid-area: sidebar;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background: var(--invoices-sidebar-bg);
    transition: background 250ms ease;
    z-index: 500;

    .options-container {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      width: auto;
    }

    .logo {
      width: 7.2rem;
      height: 7.2rem;
      background: var(--invoices-sidebar-logo-bg);
      transition: color 200ms ease, background 200ms ease;
      display: grid;
      place-items: center;
      position: relative;
      border-radius: 0 20px 20px 0;

      span {
        width: 100%;
        height: 50%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: var(--invoices-sidebar-logo-span-bg);
        transition: color 200ms ease, background 200ms ease;
        border-radius: 20px 0 20px 0;
      }

      img {
        z-index: 5;
      }
    }

    button {
      width: 2rem;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      place-items: center;

      .svg-container {
        grid-column: 1/2;
        grid-row: 1/2;
      }

      &:hover .moon-path,
      &:hover .sun-path {
        transition: fill 250ms;
        fill: var(--purple-100);
      }
    }

    .user-image-container {
      width: 8.1rem;
      height: 7.2rem;
      display: grid;
      place-items: center;
      justify-self: end;
      border-left: 1px solid var(--purple-550);
      margin-left: 2.4rem;

      img {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  .navigation.tablet {
    height: 8rem;

    .logo {
      width: 8rem;
      height: 8rem;
    }

    .user-image-container {
      margin-left: 3.2rem;
    }
  }

  .navigation.desktop {
    flex-flow: column nowrap;
    height: 100vh;
    width: 10.3rem;
    border-radius: 0 20px 20px 0;
    position: fixed;

    .logo {
      width: 100%;
      height: 10.3rem;
    }

    .options-container {
      width: 100%;
      flex-flow: column nowrap;
      align-items: center;

      button {
        width: 100%;
      }

      .user-image-container {
        margin-left: 0;
        margin-top: 3.2rem;
        width: 100%;
        height: 8.9rem;
        border-left: none;
        border-top: 1px solid var(--purple-550);
        position: relative;
      }
    }
  }


  .popup {
    z-index: 500;
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    right: 0;
    top: 7.2rem;
    background: v(popup-bg);
    height: 20rem;
    width: 35rem;
    padding: 4rem;
    opacity: 0;
    transition: transform 250ms ease, opacity 250ms ease, background 250ms ease;
    transform-origin: 100% 0%;
    transform: scale(0.2, 0.2);
    border-radius: 0 0 15px 15px;
    box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);

    &.tablet {
      top: 8rem;
      height: 25rem;

      h1 {
        font-size: 2rem;
      }
    }

    &.desktop {
      transform-origin: 0% 100%;
      top: unset;
      right: unset;
      bottom: 2rem;
      left: 12rem;
      width: 50rem;
      border-radius: 15px;

      
      h1 {
        font-size: 2rem;
      }
    }

    &.show {
      opacity: 1;
      transform: scale(1, 1);
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      line-height: 3rem;
      color: v(main-text-color);
      transition: color 250ms ease;
    }

  }

  :global(body.dark){
    .popup {
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
    }
  }

</style>

<div class="navigation {$size}">
  <div class="logo">
    <img src="/assets/logo.svg" alt="invoice app logo" />
    <span class="bottom-deco" />
  </div>
  <div class="options-container">

    <button on:click={toggleDarkMode}>
      {#if $darkMode}
        <div
          class="svg-container"
          in:fade={{ delay: 200, duration: 200 }}
          out:fade={{ duration: 199 }}>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0
              01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08
              1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09
              1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0
              11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817
              4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924
              4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96
              0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0
              01.112 1.912l-.112.007H.96a.96.96 0
              01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010
              1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0
              011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05
              5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0
              .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
              fill="#858BB2"
              fill-rule="nonzero"
              class="sun-path svg" />
          </svg>
        </div>
      {:else}
        <div
          class="svg-container"
          in:fade={{ delay: 200, duration: 200 }}
          out:fade={{ duration: 199 }}>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275
              1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516
              7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559
              1.226-2.197a.652.652 0 00-.102-.92.703.703 0
              00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000
              9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156
              2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0
              003.579-5.597.62.62 0 00-.46-.793z"
              fill="#7E88C3"
              fill-rule="nonzero"
              class="moon-path svg" />
          </svg>

        </div>
      {/if}
    </button>
    <span class="divider" />
    <!-- replace the user-image-container with login navigation? Yes. -->
    <div class="user-image-container" on:click={togglePopup}>
      <img src="./assets/image-avatar.jpg" alt="" />
      {#if $User}
         <div class="popup {showPopup ? 'show' : ''} {$size}">
           <h1>Hello {localUserInfo.name}. Would you like to sign out?</h1>
           <Button
             type="button"
             on:click={signOutUser}
             btnClass="dark"
             content="Sign Out" />
         </div>
      {/if}
    </div>
  </div>
</div>
