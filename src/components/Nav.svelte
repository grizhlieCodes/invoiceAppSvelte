<script>
    import {getContext} from 'svelte';
    import darkMode from '../stores/darkModeStore.js'

    const toggleDarkMode = () => {
        darkMode.toggleDarkMode()
    }

    let size = getContext('size');
</script>

<div class="navigation {$size}">
    <div class="logo">
        <img src="/assets/logo.svg" alt="invoice app logo">
        <span class="bottom-deco"></span>
    </div>
    <div class="options-container">
        <!-- replace the button with login navigation? Yes. -->
        <button on:click={toggleDarkMode}>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 
                01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 
                1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 
                9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 
                0 003.579-5.597.62.62 0 00-.46-.793z" fill="#7E88C3" fill-rule="nonzero" class="moon-path"/>
            </svg>
        </button>
        <span class="divider"></span>
        <div class="user-image-container">
            <img src="./assets/image-avatar.jpg" alt="">
        </div>
    </div>
</div>

<style lang="scss">
    .navigation, .navigation.mobile {
        grid-area: sidebar;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        background: var(--invoices-sidebar-bg);


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
    
            &:hover .moon-path {
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
        height: 100%;
        width: 10.3rem;
        border-radius: 0 20px 20px 0;

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
            }
        }
    }



</style>