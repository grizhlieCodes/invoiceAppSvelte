<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import {fly} from 'svelte/transition'
  const dispatch = createEventDispatcher()

  export let inputClass = '',
    placeholder,
    flex

  export let paymentTerms

  let showPaymentTerms = false
  let currentOption = paymentTerms ? paymentTerms : null

  $: selectedOption = !currentOption ? 30 : currentOption
  

  const paymentTermDays = [1, 7, 14, 30]

  const showTermOptions = () => {
    showPaymentTerms = !showPaymentTerms
  }

  const selectPaymentOption = (option) => {
    currentOption = option
    dispatch('updateDateDue', currentOption)
    showPaymentTerms = !showPaymentTerms
  }

  onMount(async () => {
    dispatch('updateDateDue', selectedOption)
  })
</script>

<style lang="scss">
  .form-item {
    margin: 0 0rem 2.4rem 0rem;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
  }
  label {
    color: v(label-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    transition: color 250ms ease-in-out;
    margin-bottom: 1rem;
  }
  button {
    margin: 1rem 0rem 0 0rem;
    background: v(input-background);
    border: 1px solid v(input-border);
    color: v(input-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    outline: none;
    width: 100%;
    height: 4.8rem;
    border-radius: 0.4rem;
    padding: 0 2rem;
    transition: color 250ms ease-in-out, background 250ms ease-in-out;
    cursor: pointer;
    text-align: left;

    &:focus-within {
      box-shadow: 0 0 1pt 1pt v(input-outline);
    }
  }

  .f-full {
    flex: 1 0 100%;
  }
  .f-half {
    flex: 1 0 100%;

    @media screen and (min-width: 560px) {
      flex: 1 0 20rem;
    }
  }

  .input-container {
    position: relative;

    img {
      position: absolute;
      right: 1.6rem;
      top: 50%;
      transform: translate(0, 9%);
    }
  }

  .paymentTerms {
    height: 19.1rem;
    width: 24rem;
    border-radius: 0.8rem;
    overflow: hidden;

    button {
      margin: 0;
      border: none;
      border-radius: 0;
      font-weight: v(font-bold);
      &:not(:nth-last-child(1)) {
        border-bottom: 1px solid v(paymentTerms-dividing-line);
      }
      &:hover {
        color: v(paymentTerms-accent);
      }

      &.currentlySelected {
        color: v(paymentTerms-accent);
      }

      &:focus-within {
        box-shadow: none;
      }
    }
  }
</style>

<!-- Rewrite this to be a custom input? Or just text? text. -->

<div class="form-item {flex}">
  <label for="invoiceDate">Payment Terms</label>
  <div class="input-container">
    <button
      type="button"
      class={inputClass}
      on:click={() => {
        showTermOptions()
        dispatch('updatePaymentTerms')
      }}
      {placeholder}
      id="paymentTerms"
      data-payment-term={selectedOption}>
      Net {selectedOption} {selectedOption === 1 ? 'Day' : 'Days'}
    </button>
    <img src="./assets/icon-arrow-down.svg" alt="down arrow icon" />
  </div>
  {#if showPaymentTerms}
    <div class="paymentTerms" transition:fly={{y:-50, duration: 200}}>
      {#each paymentTermDays as option}
        <button
          type="button"
          on:click={() => selectPaymentOption(option)}
          class:currentlySelected={option === selectedOption}>
          Net {option} {option === 1 ? 'Day' : 'Days'}
        </button>
      {/each}
    </div>
  {/if}
</div>
