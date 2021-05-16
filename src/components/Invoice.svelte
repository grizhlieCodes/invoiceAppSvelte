<script>
  import { getContext } from 'svelte'
  import Status from './StatusCard.svelte'
  import Button from './Button.svelte'
  let size = getContext('size')
  //how can i easily give this all properties with svelte?
  //https://svelte.dev/tutorial/spread-props

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
</script>

<style lang="scss">

    @mixin txt($fontSize, $fontWeight, $col){
        font-size: #{$fontSize}rem;
        font-weight: v(#{$fontWeight});
        color: v(#{$col});
    }

  .invoice-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid:
      'top' 9.1rem
      'body' 69.5rem
      'buttons' 9.1rem / 1fr;
    row-gap: 1.6rem;
  }
  .top-tile {
    grid-area: top;
  }
  .invoice-body {
    grid-area: body;
  }
  .invoice-buttons {
    grid-area: buttons;
  }

  .invoice-tile {
    background: v(invoice-tile-bg);
    border-radius: 0.8rem;
  }

  .top-tile {
      .status-container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        padding: 0 2.4rem;

        p {
            @include txt(1.2, font-medium, invoice-status-text-col);
        }
      }
  }

 .invoice-body {
     height: 100%;
     width: 100%;
     padding: 2.4rem;
     display: grid;
     grid: 
     "topLeft topLeft" 3.4rem
     "senderAddress senderAddress" 7.5rem
     "dates clientAddress" 13rem
     "clientEmail clientEmail" 4.7rem
     "itemsTotalContainer itemsTotalContainer" 22.8rem
     / 1rem 1rem;
 }

 .top-left-info {
     grid-area: topLeft;
     width: 100%;
 }
 .senderAddress {
     grid-area: senderAddress;
     width: 100%;
 }
 .dates {
     grid-area: dates;
     width: 100%;
 }
 .clientAddress {
     grid-area: clientAddress;
     width: 100%;
 }
 .clientEmail {
     grid-area: clientEmail;
     width: 100%;
 }
 .itemsTotalContainer {
     grid-area: itemsTotalContainer;
     width: 100%;
 }




</style>

<div class="invoice-container {$size} paymentTerm{paymentTerms}" {id}>

  <div class="top-tile invoice-tile">
    <div class="status-container">
        <p class="statusText">Status</p>
        <Status {status} />
    </div>
    {#if $size !== 'mobile'}
        <div class="invoice-buttons">
            <!-- We need to pass the invoice ID to each of the below when we call
                their functions. -->
            <Button content="Edit" btnClass="light" on:click />
            <Button content="Delete" btnClass="red" on:click />
            <Button content="Mark as Paid" btnClass="primary" on:click />
        </div>
    {/if}
  </div>

  <div class="invoice-body invoice-tile">
    <div class="top-left-info">
      <p class="invoice-id">{id}</p>
      <p class="description">{description}</p>
    </div>
    <div class="senderAddress">
      <p class="address-line">{senderAddress.street}</p>
      <p class="address-line">{senderAddress.city}</p>
      <p class="address-line">{senderAddress.postCode}</p>
      <p class="address-line">{senderAddress.country}</p>
    </div>
    <div class="dates">
      <div class="invoiceDate">
        <p class="label">Invoice Date</p>
        <p>{createdAt}</p>
      </div>
      <div class="payementDue">
        <p class="label">Payment Due</p>
        <p>{paymentDue}</p>
      </div>
    </div>
    <div class="clientAddress">
      <p class="label">Bill To</p>
      <h2 class="clientName">{clientName}</h2>
      <p class="address-line">{clientAddress.street}</p>
      <p class="address-line">{clientAddress.city}</p>
      <p class="address-line">{clientAddress.postCode}</p>
      <p class="address-line">{clientAddress.country}</p>
    </div>
    <div class="clientEmail">
      <p class="label">Sent to</p>
      {clientEmail}
    </div>
    <div class="itemsTotalContainer">
        <div class="items">
          <p class="itemName label">ItemName</p>
          <p class="itemQuantity label">QTY.</p>
          <p class="itemPrice label">Price</p>
          <p class="itemNTotal label">Total</p>
          {#each items as item}
            <div class="item">
              <p class="itemName label">{item.name}</p>
              <p class="itemQuantity label">{item.quantity}</p>
              <p class="itemPrice label">{item.price}</p>
              <p class="itemNTotal label">{item.total}</p>
            </div>
          {/each}
        </div>
        <div class="grandTotal">
          <div class="label">Grand Total</div>
          <h2>{total}</h2>
        </div>
    </div>
  </div>

  {#if $size === 'mobile'}
       <div class="invoice-buttons invoice-tile">
         <!-- We need to pass the invoice ID to each of the below when we call
             their functions. -->
         <Button content="Edit" btnClass="light" on:click />
         <Button content="Delete" btnClass="red" on:click />
         <Button content="Mark as Paid" btnClass="primary" on:click />
       </div>
  {/if}
</div>
