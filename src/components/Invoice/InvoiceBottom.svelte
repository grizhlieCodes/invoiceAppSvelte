<script>
      import Button from '../Button.svelte'
</script>

<style lang="scss">
    .invoice-bottom{
        grid-area: invoiceBottom;
        background: v(invoice-tile-bg);
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
        <Button content="Edit" btnClass="light" on:click />
        <Button content="Delete" btnClass="red" on:click />
        <Button content="Mark as Paid" btnClass="primary" on:click />
      </div>
  </div>