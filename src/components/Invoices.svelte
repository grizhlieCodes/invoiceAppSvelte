<script>
  import { getContext } from 'svelte'
  import Button from './Button.svelte'
  import FilterSelection from './FilterSelection.svelte'

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
      <p class="normal">There are x total invoices</p>
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
