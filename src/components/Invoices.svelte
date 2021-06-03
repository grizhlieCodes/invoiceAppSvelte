<script>
  import Button from './Button.svelte'
  import FilterSelection from './FilterSelection.svelte'
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  import InvoiceList from './InvoiceList.svelte'
  import Invoice from './Invoice/Invoice.svelte'
  import testInvoice from '../invoices/singleInvoice.js'
  import EditInvoice from './EditInvoice/EditInvoice.svelte'

  //Filter, invoice quantity,
  let filter = ''
  let invoiceQuantity
  $: singleInvoice = invoiceQuantity === 1
  $: totalInvoices = filter !== '' ? filter : 'total'
  $: title = `InnVoice: ${invoiceQuantity}`

  //Size
  const size = getContext('size')

  //Button mobile vs tab/des
  $: buttonContent = $size === 'mobile' ? 'New' : 'New Invoice'

  //Update filter & invoice quantity
  const updateFilter = (event) => {
    let val = event.detail
    filter = val
  }
  const updateInvoiceQuant = (event) => {
    let val = event.detail
    invoiceQuantity = val

    let docTitle = document.querySelector('title')
    docTitle.textContent = title
  }

  //Open invoice after click

  let invoiceShown = false //-->this
  let invoiceData //-->this

  const openInvoice = (event) => {
    filter = ''
    invoiceShown = true
  }

  //dispatched from Invoice.
  const closeInvoice = () => {
    invoiceShown = !invoiceShown
  }
</script>

<style lang="scss">
  .invoices-container {
    grid-area: mainCenter;
    width: 100%;
    align-self: start;
    grid-row: 1/2;
    grid-column: 1/2;
    margin-top: 3.4rem;
    height: 100%;
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
      margin: 0 0 0.8rem 0;
      padding: 0;
      color: v(main-text-color);
      transition: color 200ms ease;
      font-weight: v(font-bold);
    }
    p {
      color: v(invoices-light-accent-text);
      transition: color 200ms ease;
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
    flex: 1 0 0;
    justify-content: flex-end;
    padding-left: 1rem;

    .button-container {
      margin-left: clamp(0.5rem, 3vw, 4rem);
    }
  }

  .empty-container {
    height: 100%;
    display: grid;
    justify-items: center;
    padding-top: 20%;

    .inner-container {
      width: clamp(21.7rem, 50%, 24rem);
      text-align: center;

      img {
        margin-bottom: 4rem;
      }

      h2 {
        color: v(main-text-color);
        font-weight: v(font-bold);
        font-size: 2rem;
        letter-spacing: -0.63px;
        line-height: 2rem;
        margin: 0 auto 2.4rem auto;
      }
      p {
        color: v(invoice-delete-modal-par-col);
        width: clamp(21rem, 30%, 22.5rem);
        font-size: 1.2rem;
        line-height: 1.5rem;
        margin: auto;
      }
    }
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>

{#if !invoiceShown}
  <div
    class="invoices-container"
    in:fly={{ x: -200, duration: 300 }}
    out:fly={{ x: -200, duration: 300 }}>
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
        <FilterSelection on:filter={updateFilter} {invoiceShown} />
        <div class="button-container">
          <Button
            type="button"
            content={buttonContent}
            btnClass="addition"
            on:click />
        </div>
      </div>
    </div>

    <InvoiceList
      {filter}
      on:invoiceQuantity={updateInvoiceQuant}
      on:openInvoice={openInvoice} />

    {#if invoiceQuantity === 0}
      <div class="empty-container">
        <div class="inner-container">
          <img src="./assets/illustration-empty.svg" alt="" />
          <h2>There is nothing here</h2>
          <p>
            Create an invocie by clicking the {$size === 'mobile' ? 'New' : 'New Invoice'}
            button and get started
          </p>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <Invoice
    {...invoiceData}
    on:closeInvoice={closeInvoice}
    on:editInvoice
    on:editInvoiceBottom />
{/if}
