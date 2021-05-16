<script>
  import Button from './Button.svelte'
  import FilterSelection from './FilterSelection.svelte'
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  import InvoiceList from './InvoiceList.svelte'
  import Invoice from './Invoice.svelte'
  import testInvoice from '../invoices/singleInvoice.js'

  //Filter, invoice quantity,
  let filter = ''
  let invoiceQuantity
  $: singleInvoice = invoiceQuantity === 1
  $: totalInvoices = filter !== '' ? filter : 'total'
  $: title = `InnVoice: ${invoiceQuantity}`

  const size = getContext('size')

  $: buttonContent = $size === 'mobile' ? 'New' : 'New Invoice'

  //Update filter & invoice quantity
  const updateFilter = (event) => {
    let val = event.detail
    filter = val
  }
  const updateInvoiceQuant = (event) => {
    let val = event.detail
    invoiceQuantity = val
  }

  //Open invoice after click

  let invoiceShown = true
  let invoiceData = testInvoice

  const openInvoice = (event) => {
    let invoice = {invoice: event.detail}
    console.log(invoice)
    for(const key in invoice) {
      invoiceData = {
        ...invoice[key],
      }
    } 
    console.log(invoiceData)
    invoiceShown = true
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
    margin-bottom: 3.2rem;

    &.tablet {
      margin-bottom: 5.6rem;
    }
    &.desktop {
      margin-bottom: 6.5rem;
    }
  }

  .top .left {
    width: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    h1 {
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
      padding: 0;
    }
  }

  .top .right {
    width: auto;
    display: flex;
    align-items: center;
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="invoices-container" transition:fly={{ x: 20, duration: 200 }}>
  {#if !invoiceShown}
    <div class="top {$size}">
      <div class="left">
        <h1>Invoices</h1>
        {#if invoiceQuantity === 0}
          <p class="normal">No invoices.</p>
        {:else if $size === 'mobile'}
          <p class="normal">
            {invoiceQuantity} {singleInvoice ? 'invoice' : 'invoices'}
          </p>
        {:else}
          <p class="normal">
            There {singleInvoice ? 'is' : 'are'} {invoiceQuantity} {totalInvoices}
            {singleInvoice ? 'invoice' : 'invoices'}
          </p>
        {/if}

      </div>
      <div class="right">
        <FilterSelection on:filter={updateFilter} />
        <Button
          type="button"
          content={buttonContent}
          btnClass="addition"
          on:click />
      </div>
    </div>

    <InvoiceList
      {filter}
      on:invoiceQuantity={updateInvoiceQuant}
      on:openInvoice={openInvoice} />
  {:else}
    <Invoice {...invoiceData}/>
  {/if}
</div>

<!-- if else  -->
