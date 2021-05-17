<script>
  export let id,
    description,
    senderAddress,
    createdAt,
    paymentDue,
    clientName,
    clientAddress,
    clientEmail

  import dateFormat from '../../helpers/dateFormat.js'
</script>

<style lang="scss">
  @mixin txt($fontSize, $fontWeight, $col, $lineHeight, $letterSpacing) {
    @if ($letterSpacing == 0) {
      font-size: #{$fontSize}rem;
      font-weight: v(#{$fontWeight});
      color: v(#{$col});
      line-height: #{$lineHeight}rem;
      letter-spacing: -0.25px;
    } @else {
      font-size: #{$fontSize}rem;
      font-weight: v(#{$fontWeight});
      color: v(#{$col});
      line-height: #{$lineHeight}rem;
      letter-spacing: #{$letterSpacing}px;
    }
  }

  .invoice-body {
    background: v(invoice-tile-bg);
    width: 100%;
    height: 100%;
    border-radius: 0.8rem;
    padding: 2.4rem;
    grid-area: invoiceBody;
    display: grid;
    grid:
      'topLeft topLeft' max-content
      'senderAddress senderAddress' max-content
      'dates clientAddress' max-content
      'email email' max-content
      / 1fr 1fr;
    row-gap: 3rem;

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
  }

  //Layout to push max-content of grid to correct sizing.
  //We have a row-gap seperating main content. 
  //Any additional spacing is purely margin, as per below.

  .dateLabel,
  .label {
    margin-bottom: 1.2rem;
  }

  .topLeft {
    .id {
      margin-bottom: 0.4rem;
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

</div>
