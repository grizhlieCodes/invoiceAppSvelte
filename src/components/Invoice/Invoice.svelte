<script>
  import GoBack from './GoBack.svelte'
  import InvoiceTop from './InvoiceTop.svelte'
  import InvoiceBody from './InvoiceBody.svelte'
  import InvoiceBottom from './InvoiceBottom.svelte'
  import { getContext } from 'svelte'
  import { fly } from 'svelte/transition'
  let size = getContext('size')
  // import invoiceValueFormat from '../helpers/invoiceValueFormat.js'
  // import dateFormat from '../helpers/dateFormat.js'

  export let id,
    status,
    description,
    clientAddress,
    createdAt,
    paymentDue,
    clientEmail,
    items,
    total,
    senderAddress,
    clientName,
    paymentTerms

    const invoiceData = {
      id,
      description,
      senderAddress,
      createdAt,
      paymentDue,
      clientName,
      clientAddress,
      clientEmail,
      items,
      total
    }

</script>

<svelte:head>
  <title>InnVoice: {id}</title>
</svelte:head>

<style lang="scss">

  .invoice {
    width: 100%;
    grid-row: 1/2;
    grid-column: 1/2;
    align-self: start;
    justify-self: center;
    display: grid;
    row-gap: 1.6rem;
    grid:
    "goBack" max-content
    "invoiceTop" 9.1rem
    "invoiceBody" max-content
    "invoiceBottom" max-content / 1fr;

    @include mq(tablet) {
      grid:
      "goBack" max-content
      "invoiceTop" 8.8rem
      "invoiceBody" max-content
      "invoiceBottom" max-content / 1fnr;
    }
  }
</style>

<div class="invoice" transition:fly={{x: 50, duration: 350}}>
  <GoBack on:closeInvoice/>
  <InvoiceTop {status} />
  <InvoiceBody {...invoiceData} />
  {#if $size === 'mobile'}
     <InvoiceBottom />
  {/if}
</div>

