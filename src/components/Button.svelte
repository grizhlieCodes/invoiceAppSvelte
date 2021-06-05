<script>
  export let type = 'button',
    content,
    btnClass,
    autofocus = false
</script>

<style lang="scss">
  button {
    width: auto;
    height: 4.8rem;
    padding: 0 2.6rem;
    font-family: v(spartan);
    font-weight: v(font-bold);
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 2.4rem;
    transition: all 250ms ease-in-out;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
  }

  button.primary,
  button.addition {
    color: v(white);
    background: v(btn-primary-bg);
    transition: background 200ms ease;

    &:hover, &:focus {
      background: v(btn-primary-hover-bg);
      transition: background 200ms ease;
    }
  }

  button.addition {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 1.5rem 0 0.8rem;
    div.plus-container {
      $div-size: 3.2rem;
      height: $div-size;
      width: $div-size;
      background: v(white);
      border-radius: 50%;
      position: relative;
      margin-right: 1.6rem;
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 0.24rem;
        height: 1rem;
        background: v(btn-addition-span-bg);
        transition: background 200ms ease;

        &:nth-child(2) {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
    &:hover, &:focus {
      span {
        background: v(btn-addition-span-hover-bg);
        transition: background 200ms ease;
      }
    }
  }

  button.red {
    color: v(white);
    background: v(btn-red-bg);
    transition: color 200ms ease, background 200ms ease;

    &:hover, &:focus {
      background: v(btn-red-hover-bg);
    }
  }

  button.light {
    color: v(btn-light-text);
    background: v(btn-light-bg);
    transition: color 200ms ease, background 200ms ease;


    &:hover, &:focus {
      background: v(btn-light-hover-bg);
      color: v(btn-light-hover-text);
    }
  }

  button.dark {
    color: v(btn-dark-text);
    background: v(btn-dark-bg);
    transition: color 200ms ease, background 200ms ease;


    &:hover, &:focus {
      background: v(btn-dark-hover-bg);
      color: v(btn-dark-hover-text);
    }
  }

  button.large {
    color: v(btn-large-text);
    background: v(btn-large-bg);
    width: 100%;
    transition: color 200ms ease, background 200ms ease;

    &:hover, &:focus {
      background: v(btn-large-hover-bg);
      color: v(btn-large-hover-text);
    }
  }
</style>

{#if btnClass === 'addition'}
  <button {type} on:click class={btnClass} autofocus>
    <div class="plus-container">
      <span />
      <span />
    </div>
    <p>{content}</p>
  </button>
{:else}
  <button {type} on:click class={btnClass} autofocus>{content}</button>
{/if}
