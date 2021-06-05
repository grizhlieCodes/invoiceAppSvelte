<script>
  import GoBack from './GoBack.svelte'
  import InvoiceTop from './InvoiceTop.svelte'
  import InvoiceBody from './InvoiceBody.svelte'
  import InvoiceBottom from './InvoiceBottom.svelte'
  import { getContext } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  let size = getContext('size')
  import SelectedInvoice from '../../stores/selectedInvoice.js'
  import Button from '../Button.svelte'
  import invoicesStore from '../../stores/invoicesStore.js'

  import { createEventDispatcher, onMount, onDestroy } from 'svelte'
  const dispatch = createEventDispatcher()

  $: invoice = $SelectedInvoice


  $: id = invoice.id
  $: description = invoice.description
  $: senderAddress = invoice.senderAddress
  $: createdAt = invoice.createdAt
  $: paymentDue = invoice.paymentDue
  $: clientName = invoice.clientName
  $: clientAddress = invoice.clientAddress
  $: clientEmail = invoice.clientEmail
  $: items = invoice.items
  $: total = invoice.total
  $: invoiceUid = invoice.invoiceUid

  $: status = $SelectedInvoice.status

  $: invoiceData = {
    id,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total,
  }
  let showDeletionConfirmation = false

  const showDeleteModal = () => {
    showDeletionConfirmation = !showDeletionConfirmation
  }

  const cancelDeletion = () => {
    showDeletionConfirmation = !showDeletionConfirmation
  }
  let closeModalEvent
  onMount(() => {
    closeModalEvent = window.addEventListener('keydown', (e) => {
      //Esc for IE/Edgee and Escape for all other browsers
      //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
      if(e.key === "Esc" || e.key === "Escape") {
        cancelDeletion()
      }
    })
  });
  onDestroy(() => {
    window.removeEventListener("keydown", closeModalEvent)
    SelectedInvoice.clearInvoice()
  })
  const deleteInvoice = () => {
    invoicesStore.deleteInvoice(invoiceUid)
    showDeletionConfirmation = !showDeletionConfirmation
    dispatch('closeInvoice')
  }

  const updateInvoiceStatus = (e) => {
    status = e.detail
  }


</script>

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
      'goBack' max-content
      'invoiceTop' 9.1rem
      'invoiceBody' max-content
      'invoiceBottom' max-content / 1fr;

    @include mq(tablet) {
      grid:
        'goBack' max-content
        'invoiceTop' 8.8rem
        'invoiceBody' max-content
        'invoiceBottom' max-content / 1fnr;
    }
  }

  .delete-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.6;
    left: 0;
    top: 0;
    z-index: v(invoice-delete-overlay);
  }

  .delete-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    left: 0;
    top: 0;
    z-index: v(invoice-delete-modal);

    .inner-container {
      width: clamp(32.7rem, 50%, 48rem);
      background: v(invoices-invoice-bg);
      transition: background 200ms ease;
      height: 22rem;
      padding: 3.2rem;
      border-radius: 0.8rem;
      margin-top: -40rem;
    }
  }

  .delete-modal .inner-container {
    h2 {
      color: v(main-text-color);
      font-size: 2rem;
      line-height: 3.2rem;
      letter-spacing: -0.42px;
      font-weight: v(font-bold);
      margin-bottom: 0.8rem;
      transition: color 200ms ease;
    }

    p {
      color: v(invoice-delete-modal-par-col);
      font-weight: v(font-medium);
      transition: color 200ms ease;
      font-size: 1.2rem;
      letter-spacing: -0.25px;
      line-height: 2.2rem;
      margin-bottom: 2.4rem;
    }

    .buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      column-gap: 0.8rem;
    }
  }
</style>

<svelte:head>
  <title>InnVoice: {id}</title>
</svelte:head>
<div class="invoice" in:fly={{ x: -200, duration: 300 }} out:fly={{ x: -200, duration: 300 }}>
  <GoBack on:click={() => dispatch('closeInvoice')} />
  <InvoiceTop
    {status}
    on:editInvoice
    {id}
    on:closeInvoice
    on:deleteInvoice={showDeleteModal} 
    {invoiceUid} />
  <InvoiceBody {...invoiceData} />
  {#if $size === 'mobile'}
    <InvoiceBottom
      on:editInvoiceBottom
      {id}
      {status}
      on:deleteInvoice={showDeleteModal} 
      on:updateInvoiceStatus={updateInvoiceStatus} 
      {invoiceUid} />
  {/if}
</div>
{#if showDeletionConfirmation}
  <div class="delete-overlay" transition:fade={{ duration: 200 }} />
  <div class="delete-modal">
    <div class="inner-container" transition:fly={{ duration: 200, x: -50 }}>
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete invoice #{id}? This action cannot be
        undone.
      </p>
      <div class="buttons">
        <Button content="Cancel" btnClass="light" on:click={cancelDeletion} />
        <Button content="Delete" btnClass="red" on:click={deleteInvoice} />
      </div>
    </div>
  </div>
{/if}
