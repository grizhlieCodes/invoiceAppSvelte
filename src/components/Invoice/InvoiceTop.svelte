<script>
  import Button from '../Button.svelte'
  import { getContext } from 'svelte'
  import StatusCard from '../StatusCard.svelte'
  import { createEventDispatcher } from 'svelte'
import invoicesStore from '../../stores/invoicesStore.js'
  const dispatch = createEventDispatcher()

  const size = getContext('size')

  export let status, id, invoiceUid

  const deleteInvoice = () => {
    dispatch('deleteInvoice')
  }

  const updateInvoiceStatus = (newStatus) => {
    status = newStatus
    console.log(status)
    invoicesStore.updateInvoiceStatusLocal(id, status)
    invoicesStore.updateInvoiceStatusFirebase(status, invoiceUid)
    dispatch('updateInvoiceStatus', status)
  }
</script>

<style lang="scss">
  .invoice-top {
    grid-area: invoiceTop;
    background: v(invoice-tile-bg);
    transition: background 200ms ease;
    width: 100%;
    height: 100%;
    padding: 2.4rem;
    border-radius: 0.8rem;
    display: flex;

    .status {
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      flex: 1 0 50%;

      p {
        font-weight: v(font-medium);
        font-size: 1.2rem;
        line-height: 1.5rem;
        letter-spacing: -0.25px;
        color: v(invoice-status-text-col);
        transition: color 200ms ease;
      }
    }

    .buttons {
        display: flex;
        align-items: center; 
        justify-content: flex-end;
        column-gap: 0.8rem;
        flex: 1 0 50%;
    }

    @include mq(tablet) {
        .status {
            flex: 0 0 15.9rem;
        }
    }
  }
</style>

<div class="invoice-top">
  <div class="status">
    <p>Status</p>
    <StatusCard {status} />
  </div>
  {#if $size !== 'mobile'}
    <div class="buttons">
      <Button content="Edit" btnClass="light" on:click={() => dispatch('editInvoice', id)} />
      <Button content="Delete" btnClass="red" on:click={deleteInvoice} />
      {#if status === 'pending'}
         <Button content="Mark as Paid" btnClass="primary" on:click={() => updateInvoiceStatus('paid')} />
      {:else if status === 'paid'}
      <Button content="Mark as Unpaid" btnClass="primary" on:click={() => updateInvoiceStatus('pending')} />
      {/if}
    </div>
  {/if}
</div>
