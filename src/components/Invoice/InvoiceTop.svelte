<script>
  import Button from '../Button.svelte'
  import { getContext } from 'svelte'
  import StatusCard from '../StatusCard.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  const size = getContext('size')

  export let status, id
</script>

<style lang="scss">
  .invoice-top {
    grid-area: invoiceTop;
    background: v(invoice-tile-bg);
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
      <Button content="Delete" btnClass="red" on:click />
      <Button content="Mark as Paid" btnClass="primary" on:click />
    </div>
  {/if}
</div>
