<script>
  import InvoicesArray from '../invoices/testing.js'
  import { getContext } from 'svelte'
  import { flip } from 'svelte/animate'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import StatusCard from './StatusCard.svelte'
  import { createEventDispatcher, onMount } from 'svelte'
  const dispatch = createEventDispatcher()
  const size = getContext('size')
  import invoiceValueFormat from '../helpers/invoiceValueFormat.js'
  import dateFormat from '../helpers/realDateToInvoiceVisual.js'
  import Invoices from '../stores/invoicesStore.js'
  import SelectedInvoice from '../stores/selectedInvoice.js'

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 400),
    fallback(node, params) {
      const style = getComputedStyle(node)
      const transform = style.transform === 'none' ? '' : style.transform
      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      }
    },
  })

  let invoices

  export let filter = ''

  //Create store for data.
  //onMount -> save [...InvoicesArray] and store in localstorage. Then create the data flow.

  $: dispatch('invoiceQuantity', invoices.length)

  $: if (filter !== '') {
    invoices = $Invoices.filter((item) => item.status === filter)
  } else if (filter === '') {
    invoices = $Invoices
  }

  onMount(() => {
    dispatch('invoiceQuantity', invoices.length)
  })

  const viewInvoice = (invoiceId) => {
    let invoice = invoices.find((invoice) => invoice.id === invoiceId)
    SelectedInvoice.setInvoice(invoice)
    dispatch('openInvoice')
  }
</script>

<style lang="scss">
  .invoice-list {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    .invoice {
      margin-bottom: 1.6rem;
    }

    @supports (row-gap: 1.6rem) {
      row-gap: 1.6rem;
      .invoice {
        margin-bottom: 0;
      }
    }
  }

  .invoice {
    width: 100%;
    max-width: 67.2rem;
    height: 13.4rem;
    padding: 2.4rem;
    display: grid;
    background: v(invoices-invoice-bg);
    transition: background 200ms ease;
    border-radius: 0.8rem;
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 3.9rem 2.3rem 2.4rem;
    grid-template-areas:
      'id customer'
      'dueDate status'
      'value status';

    &:hover {
      box-shadow: 0 0 1pt 1pt v(purple-500);
    }

    &.tablet,
    &.desktop {
      padding: 1.6rem 2.4rem;
      height: 7.2rem;
      grid-template-columns: 8.7rem 14.3rem    minmax(13.6rem, 1fr) max-content 4rem 10.4rem 2.5rem;
      grid-template-rows: 1fr;
      grid-template-areas: 'id      dueDate    customer                value      .   status arrow';
      justify-items: start;
      align-items: center;
    }
    &.desktop {
      max-width: unset;
    }
  }

  :global(body.dark) {
    .invoice {
      box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);

      &:hover {
        box-shadow: 0 0 1pt 1pt v(purple-500);
      }
    }
  }

  .id {
    font-weight: v(font-bold);
    color: v(main-text-color);
    transition: color 200ms ease;
    flex: 0 0 2.4rem;
    grid-area: id;

    &::before {
      content: '#';
      color: v(invoices-hash);
      transition: color 200ms ease;
    }
  }

  .dueDate {
    font-weight: v(font-medium);
    color: v(invoices-date);
    transition: color 200ms ease;
    grid-area: dueDate;
  }

  .customer {
    font-weight: v(font-medium);
    color: v(invoices-customer);
    transition: color 200ms ease;
    grid-area: customer;
    justify-self: end;
  }

  .invoiceValue {
    font-weight: v(font-bold);
    color: v(main-text-color);
    transition: color 200ms ease;
    font-size: 1.4rem;
    letter-spacing: -0.08rem;
    line-height: 2.4rem;
    grid-area: value;
    align-self: end;

    &::before {
      content: '£';
    }
  }

  .status-container {
    grid-area: status;
    justify-self: end;
    align-self: end;
  }

  .invoice.tablet,
  .invoice.desktop {
    .customer,
    .status-container {
      align-self: unset;
      justify-self: unset;
    }
    .invoiceValue {
      align-self: unset;
      justify-self: end;
    }
  }

  .arrow-container.mobile {
    display: none;
  }

  .arrow-container {
    transform: rotate(180deg);
    grid-area: arrow;
    justify-self: end;

    svg {
      transition: transform 250ms ease;
    }
  }

  .invoice:hover {
    cursor: pointer;
    .arrow-container {
      svg {
        transform: translate(-4px, 0px) rotate(180deg);
      }
    }
  }
</style>

<div class="invoice-list">
  {#each invoices as invoice (invoice.id)}
    <div
      class="invoice {$size}"
      animate:flip={{ duration: 200 }}
      in:receive={{ key: invoice.id }}
      out:send={{ key: invoice.id }}
      on:click={() => viewInvoice(invoice.id)}>
      <p class="id normal">{invoice.id}</p>
      <p class="dueDate normal">Due {dateFormat(invoice.paymentDue)}</p>
      <p class="customer normal">{invoice.clientName}</p>
      <p class="invoiceValue">{invoiceValueFormat(invoice.total)}</p>

      <div class="status-container">
        <StatusCard status={invoice.status} />
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
