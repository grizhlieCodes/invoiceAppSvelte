<script>
  import { createEventDispatcher } from 'svelte'
  import InvoicesStore from '../../stores/InvoicesStore.js'
  const dispatch = createEventDispatcher()
  import Button from '../Button.svelte'
  export let status, id

  const deleteInvoice = () => {
    dispatch('deleteInvoice')
  }

  const markInvoiceAsPaid = () => {
    InvoicesStore.markInvoiceAsPaid(id)
    status = 'paid'
    dispatch('markInvoiceAsPaid', status)
  }

  const markInvoiceAsUnpaid = () => {
    InvoicesStore.markInvoiceAsUnpaid(id)
    status = 'pending'
    dispatch('markInvoiceAsUnpaid', status)
  }
</script>

<style lang="scss">
  .invoice-bottom {
    grid-area: invoiceBottom;
    background: v(invoice-tile-bg);
    transition: background 200ms ease;
    width: calc(2.4rem + 2.4rem + 100%);
    height: 9.1rem;
    transform: translate(-2.4rem, 0);
    display: grid;
    place-items: center;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 0.8rem;
    flex: 1 0 50%;
  }
</style>

<div class="invoice-bottom">
  <div class="buttons">
    <Button
      content="Edit"
      btnClass="light"
      on:click={() => dispatch('editInvoiceBottom', id)} />
    <Button content="Delete" btnClass="red" on:click={deleteInvoice} />
    {#if status === 'pending'}
      <Button
        content="Mark as Paid"
        btnClass="primary"
        on:click={markInvoiceAsPaid} />
    {:else if status === 'paid'}
      <Button
        content="Mark as Unpaid"
        btnClass="primary"
        on:click={markInvoiceAsUnpaid} />
    {/if}
  </div>
</div>
