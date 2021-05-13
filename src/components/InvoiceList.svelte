<script>
  import InvoicesArray from '../invoices/testing.js'
  import { getContext } from 'svelte'

  const size = getContext('size')

  const invoiceValueFormat = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
</script>

<style lang="scss">
  .invoice-list {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 1.6rem;
    align-items: center;
  }
  .invoice {
    width: 100%;
    max-width: 67.2rem;
    height: 13.4rem;
    padding: 2.4rem;
    display: grid;
    background: v(invoices-invoice-bg);
    border-radius: 0.8rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3.9rem 2.3rem 2.4rem;
    grid-template-areas:
      'id customer'
      'dueDate status'
      'value status';

    &.tablet,
    &.desktop {
      padding: 1.6rem 2.4rem;
      height: 7.2rem;
      grid-template-columns: 8.7rem 14.3rem minmax(13.6rem, 1fr) max-content 4rem 10.4rem 2.5rem;
      grid-template-rows: 1fr;
      grid-template-areas: 'id dueDate customer value . status arrow';
      justify-items: start;
      align-items: center;
    }
    &.desktop {
      max-width: unset;
    }
  }

  .id {
    font-weight: v(font-bold);
    color: v(main-text-color);
    flex: 0 0 2.4rem;
    grid-area: id;

    &::before {
      content: '#';
      color: v(invoices-hash);
    }
  }

  .dueDate {
    font-weight: v(font-medium);
    color: v(invoices-date);
    grid-area: dueDate;
  }

  .customer {
    font-weight: v(font-medium);
    color: v(invoices-customer);
    grid-area: customer;
    justify-self: end;
  }

  .invoiceValue {
    font-weight: v(font-bold);
    color: v(main-text-color);
    font-size: 1.6rem;
    letter-spacing: -0.08rem;
    line-height: 2.4rem;
    grid-area: value;
    align-self: end;

    &::before {
      content: '£';
    }
  }

  .status {
    width: 10.4rem;
    height: 4rem;
    grid-area: status;
    justify-self: end;
    align-self: end;
    font-weight: v(font-bold);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

    div {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.8rem;
    }

    p {
      font-weight: v(font-bold);
      text-transform: capitalize;
    }
  }

  .invoice.tablet,
  .invoice.desktop {
    .status,
    .customer {
      align-self: unset;
      justify-self: unset;
    }
    .invoiceValue {
      align-self: unset;
      justify-self: end;
    }
  }

  .status.paid {
    color: v(invoices-paid-status-text);
    background: v(invoices-paid-status-bg);
    div {
      background: v(invoices-paid-status-text);
    }
  }
  .status.draft {
    color: v(invoices-draft-status-text);
    background: v(invoices-draft-status-bg);
    div {
      background: v(invoices-draft-status-text);
    }
  }
  .status.pending {
    color: v(invoices-pending-status-text);
    background: v(invoices-pending-status-bg);
    div {
      background: v(invoices-pending-status-text);
    }
  }


  .arrow-container.mobile {
      display: none;
  }

  .arrow-container {
      transform: rotate(180deg);
      grid-area: arrow;
      justify-self: end;
  }
</style>

<div class="invoice-list">
  {#each InvoicesArray as invoice, i}
    <div class="invoice {$size}" id={i}>
      <p class="id normal">{invoice.id}</p>
      <p class="dueDate normal">Due {invoice.paymentDue}</p>
      <p class="customer normal">{invoice.clientName}</p>
      <p class="invoiceValue">{invoiceValueFormat(invoice.total)}</p>
      <div class="status {invoice.status}">
        <div />
        <p class="normal">{invoice.status}</p>
      </div>
      <div class="arrow-container {$size}">
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            stroke-width="2"
            fill="none"
            fill-rule="evenodd" />
        </svg>
      </div>
    </div>
  {/each}
</div>
