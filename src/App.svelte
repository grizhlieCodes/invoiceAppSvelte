<script>
  import Main from './components/Main.svelte'
  import { writable } from 'svelte/store'
  import { setContext } from 'svelte'
  import Nav from './components/Nav.svelte'
  import EditInvoice from './components/EditInvoice/EditInvoice.svelte'
  import darkMode from './stores/darkModeStore.js'
  import initialiseFirebaseAuth from './stores/initialiseFirebase.js'
  initialiseFirebaseAuth()

  let body = document.body

  $: if ($darkMode === true) {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')
  }

  let innerWidth
  let size = writable('mobile')
  setContext('size', size)

  $: if (innerWidth >= 1110) {
    $size = 'desktop'
  } else if (innerWidth >= 768) {
    $size = 'tablet'
  } else {
    $size = 'mobile'
  }

  let editInvoice = true //THIS
  let invoiceId
  const editActualInvoice = (e) => {
    let id = e.detail
    invoiceId = id
    editInvoice = !editInvoice
  }
</script>

<style lang="scss">
  :global(body.dark) {
    //Main
    --main-text-color: var(--white);

    //Nav/Sidebar
    --invoices-sidebar-bg: var(--purple-750);

    //pageBackground
    --page-bg: var(--purple-800);

    //Scrollbar
    --scrollbar-bg: var(--purple-700);

    //Buttons
    //-light
    --btn-light-bg: var(--purple-700);
    --btn-light-hover-bg: var(--white);
    --btn-light-text: var(--purple-100);
    --btn-light-hover-text: var(--purple-400);

    //dark
    --btn-dark-bg: var(--purple-600);
    --btn-dark-hover-bg: var(--purple-750);
    --btn-dark-text: var(--purple-100);
    --btn-dark-hover-text: var(--purple-100);

    //large button
    --btn-large-bg: var(--purple-700);
    --btn-large-hover-bg: var(--purple-650);
    --btn-large-text: var(--purple-100);
    --btn-large-hover-text: var(--white);

    //Input
    --label-text: var(--purple-100);
    --input-background: var(--purple-750);
    --input-border: var(--purple-700);
    --input-text: var(--white);
    --input-icon: var(--purple-350);

    //Login Container
    --modal-container-bg: var(--purple-850);
    --login-or-text: var(--purple-100);

    //Edit Invoice
    --edit-invoice-bg: var(--purple-800);

    //paymentTerms
    --paymentTerms-dividing-line: var(--purple-700);
    --paymentTerms-accent: var(--purple-400);

    //Invoices
    --invoices-invoice-bg: var(--purple-750);
    --main-text-color: var(--white);
    --invoices-accent: var(--purple-500);
    --invoices-highlight-text: var(--white);
    --invoices-hash: var(--purple-350);
    --invoices-date: var(--purple-100);
    --invoices-customer: var(--white);
    --invoices-paid-status-text: var(--green-500);
    --invoices-paid-status-bg: var(--green-800);
    --invoices-pending-status-text: var(--orange-500);
    --invoices-pending-status-bg: var(--orange-800);
    --invoices-draft-status-text: var(--purple-100);
    --invoices-draft-status-bg: var(--purple-650);
    --invoices-arrow: var(--purple-500);

    //filterSelection
    --invoices-selection-bg: var(--purple-700);
    --invoices-checkbox-bg: var(--purple-750);
    --invoices-checkbox-checked-bg: var(--purple-500);
    --invoices-checkbox-tick: var(--white);
    --invoices-checkbox-border: var(--purple-500);

    // Popup

    --popup-bg: var(--purple-850);

    /* Invoice */
    --invoice-tile-bg: var(--purple-750);
    --invoice-status-text-col: var(--purple-100);
    --invoice-plain-text-col: var(--white);
    --invoice-accent-text-col: var(--purple-100);
    --invoice-items-bg: var(--purple-700);
    --invoice-total-bg: var(--dark);
    --invoice-quantity-col: var(--purple-250);
    --invoice-tab-quantity-col: var(--purple-100);

    // DatePicker
    --datePicker-bg: var(--purple-700);
    --datePicker-grey-text-col: #343853;
    --datePicker-normal-text-col: var(--purple-100);

    // Edit Invoice
    --h2-item-list-col: var(--purple-350);
  }

  :global(body) {
    transition: background 250ms ease;
    background: var(--page-bg);
  }
</style>

<svelte:window bind:innerWidth />

<Nav />

<Main
  on:click={() => (editInvoice = !editInvoice)}
  on:editInvoice={editActualInvoice}
  on:editInvoiceBottom={editActualInvoice} />

{#if editInvoice}
  <EditInvoice
    on:openModal={() => {
      invoiceId = undefined
      editInvoice = !editInvoice
    }}
    on:click={() => (editInvoice = !editInvoice)}
    {invoiceId} />
{/if}
