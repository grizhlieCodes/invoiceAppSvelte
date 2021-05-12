<script>
  import Button from './Button.svelte'
  import FilterSelection from './FilterSelection.svelte'
  import { getContext } from 'svelte'

  const size = getContext('size')
  let buttonContent
  $: if ($size === 'mobile') {
    buttonContent = 'New'
  } else {
    buttonContent = 'New Invoice'
  }
</script>

<style lang="scss">

    .invoices-container {
        width: 100%;
        align-self: start;
        grid-row: 1/2;
        grid-column: 1/2;
        margin-top: 3.4rem;
    }

    .top {
        width: 100%;
        height: 4.4rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    }

    .top .left {
        width: auto;
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;

        h1{
            flex: 0;
            height: 2.2rem;
            margin: 0;
            padding: 0;
            color: v(main-text-color);
        }   
        p {
            color: v(invoices-light-accent-text);
            flex: 0;
            height: 1.5rem;
            margin: 0;
            padding: 0
        }
    }

    .top .right {
        width: auto;
        display:flex; 
        align-items: center;
    }

    
</style>

<div class="invoices-container">
  <div class="top">
    <div class="left">
      <h1>Invoices</h1>
      {#if $size === 'mobile'}
        <p class="normal">X invoices</p>
      {:else}
         <p class="normal">There are x total invoices</p>
      {/if}
    </div>
    <div class="right">
      <FilterSelection />
      <Button
        type="button"
        content={buttonContent}
        btnClass="addition"
        on:click />
    </div>
  </div>
</div>
