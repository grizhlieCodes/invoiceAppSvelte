<script>
  export let id,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail,
    items,
    total

  import dateFormat from '../../helpers/dateFormat.js'
  import priceFormat from '../../helpers/invoiceValueFormat.js'
  import { getContext } from 'svelte'

  const size = getContext('size')
</script>

<style lang="scss">
  @mixin txt($fontSize, $fontWeight, $col, $lineHeight, $letterSpacing) {
    @if ($letterSpacing == 0) {
      font-size: #{$fontSize}rem;
      font-weight: v(#{$fontWeight});
      color: v(#{$col});
      line-height: #{$lineHeight}rem;
      letter-spacing: -0.25px;
      transition: color 200ms ease;

    } @else {
      font-size: #{$fontSize}rem;
      font-weight: v(#{$fontWeight});
      color: v(#{$col});
      line-height: #{$lineHeight}rem;
      letter-spacing: #{$letterSpacing}px;
      transition: color 200ms ease;

    }
  }

  //Main grid for the component

  .invoice-body {
    background: v(invoice-tile-bg);
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    padding: 2.4rem;
    grid-area: invoiceBody;
    display: grid;
    row-gap: 3rem;
    grid:
      'topLeft topLeft' max-content
      'senderAddress senderAddress' max-content
      'dates clientAddress' max-content
      'email email' max-content
      'body-bottom body-bottom' max-content
      / 1fr 1fr;
    .topLeft {
      grid-area: topLeft;
    }
    .senderAddress {
      grid-area: senderAddress;
    }
    .dates {
      grid-area: dates;
    }
    .clientAddress {
      grid-area: clientAddress;
    }
    .email {
      grid-area: email;
    }
    .body-bottom {
      grid-area: body-bottom;
    }
  }

  .invoice-body {
    @include mq(tablet) {
      padding: 3.2rem;
      grid:
        'topLeft topLeft senderAddress senderAddress' max-content
        'dates clientAddress email ....' max-content
        'body-bottom body-bottom body-bottom body-bottom' max-content
        / 1fr 1fr 1fr 6.5rem;
    }
  }

  .invoice-body {
    @include mq(desktop) {
      padding: 4.8rem;
    }
  }

  //Layout to push max-content of grid to correct sizing/positioning.
  //We have a row-gap seperating main content.
  //Any additional spacing is purely margin, as per below.

  .topLeft {
    .id {
      margin-bottom: 0.4rem;
    }
  }

  .senderAddress {
    @include mq(tablet) {
      justify-self: end;
    }
  }

  .dates {
    .date:not(:nth-last-child(1)) {
      margin-bottom: 3.2rem;
    }
  }

  .clientAddress {
    .clientName {
      margin-bottom: 0.8rem;
    }
  }

  .dateLabel,
  .label {
    margin-bottom: 1.2rem;
  }

  .email {
    margin-bottom: 1rem;

    @include mq(tablet) {
      margin-bottom: 0;
    }
  }

  //Body-Bottom-Default+Mobile
  .body-bottom {
    border-radius: 0.8rem;
    overflow: hidden;

    .items {
      background: v(invoice-items-bg);
      transition: background 200ms ease;
      padding: 2.4rem;
    }

    .headers {
      display: none;
    }

    .item {
      &:not(:nth-last-child(1)) {
        margin-bottom: 2.4rem;
      }

      //Item grid-styling for mobile only.
      display: grid;
      row-gap: 0.8rem;
      grid:
        'itemName itemName total' max-content
        'quantity price total' max-content
        / max-content 1fr 1fr;

      .itemName {
        grid-area: itemName;
      }
      .quantity {
        grid-area: quantity;
      }
      .price {
        grid-area: price;
      }
      .total {
        grid-area: total;
        justify-self: end;
        align-self: center;
      }
    }

    .grandTotal {
      background: v(invoice-total-bg);
      transition: background 200ms ease;
      padding: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        margin: 0;
        padding: 0;
      }
    }
  }

  //Body bottom tablet ++
  .body-bottom {
    @include mq(tablet) {
      .headers {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 3.2rem;

        .itemName {
          flex: 1 0 27.6rem;
        }
        .quantity {
          flex: 0 0 3rem;
          text-align: center;
        }
        .price {
          flex: 1 0 11.7rem;
          text-align: right;
        }
        .total {
          flex: 1 0 13.8rem;
          text-align: right;
        }
      }

      .item {
        &:not(:nth-last-child(1)) {
          margin-bottom: 4rem;
        }
        
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        .itemName {
          flex: 1 0 27.6rem;
        }
        .quantity {
          flex: 0 0 3rem;
          text-align: center;
        }
        .price {
          flex: 1 0 11.7rem;
          text-align: right;
        }
        .total {
          flex: 1 0 13.8rem;
          text-align: right;
        }
      }
    }
  }

  //Basic Text Styling Only (no spacing/layout)
  .topLeft {

    .id {
      @include txt(1.2, font-bold, invoice-plain-text-col, 1.5, 0);
      &::before {
        content: '#';
        color: v(invoice-id-hash-col);
      }
    }

    .description {
      @include txt(1.2, font-med, invoice-accent-text-col, 1.5, 0);
    }

  }

  .senderAddress,
  .clientAddress {
    @include txt(1.1, font-med, invoice-accent-text-col, 1.8, 0);
  }

  .dateLabel,
  .label {
    @include txt(1.2, font-med, invoice-accent-text-col, 1.5, 0);
  }
  
  .date,
  .clientName,
  .clientEmail {
    @include txt(1.5, font-med, invoice-plain-text-col, 2, -0.31);
  }

  .body-bottom {
    .items {
      .headers {
        @include txt(1.1, font-med, invoice-accent-text-col, 1.8, -0.23);
      }

      .item {
        .itemName {
          @include txt(1.2, font-bold, invoice-plain-text-col, 1.5, -0.25);
        }
        .quantity {
          @include txt(1.2, font-bold, invoice-quantity-col, 1.5, -0.25);
          &::after {
            content: ' x ';
            white-space: pre;
          }
        }
        .price {
          @include txt(1.2, font-bold, invoice-quantity-col, 1.5, -0.25);
          &::before {
            content: '£ ';
            white-space: pre;
          }
        }
        .total {
          @include txt(1.2, font-bold, invoice-plain-text-col, 1.5, -0.25);
          &::before {
            content: '£ ';
            white-space: pre;
          }
        }
      }
    }

    .grandTotal {
      .total {
        @include txt(2, font-bold, invoice-total-col, 3.2, -0.42);
        &::before {
          content: '£ ';
          white-space: pre;
        }
      }
    }
  }
</style>

<div class="invoice-body">

  <div class="topLeft">
    <p class="id">{id}</p>
    <p class="description">{description}</p>
  </div>

  <div class="senderAddress">
    <p class="address">{senderAddress.street}</p>
    <p class="address">{senderAddress.city}</p>
    <p class="address">{senderAddress.postCode}</p>
    <p class="address">{senderAddress.country}</p>
  </div>

  <div class="dates">
    <p class="dateLabel">Invoice Date</p>
    <p class="date">{dateFormat(createdAt)}</p>
    <p class="dateLabel">Payment Due</p>
    <p class="date">{dateFormat(paymentDue)}</p>
  </div>

  <div class="clientAddress">
    <p class="label">Bill To</p>
    <p class="clientName">{clientName}</p>
    <p class="address">{clientAddress.street}</p>
    <p class="address">{clientAddress.city}</p>
    <p class="address">{clientAddress.postCode}</p>
    <p class="address">{clientAddress.country}</p>
  </div>

  <div class="email">
    <p class="label">Sent to</p>
    <p class="clientEmail">{clientEmail}</p>
  </div>

  <div class="body-bottom">
    <div class="items">

      <div class="headers">
        <p class="itemName">Item Name</p>
        <p class="quantity">QTY.</p>
        <p class="price">Price</p>
        <p class="total">Total</p>
      </div>

      {#each items as item}
        <div class="item">
          <p class="itemName">{item.name}</p>
          <p class="quantity">{item.quantity}</p>
          <p class="price">{priceFormat(item.price)}</p>
          <p class="total">{priceFormat(item.total)}</p>
        </div>
      {/each}
    </div>

    <div class="grandTotal">
      <p class="label grandTotal">Amount Due</p>
      <p class="total">{priceFormat(total)}</p>
    </div>
  </div>

</div>
