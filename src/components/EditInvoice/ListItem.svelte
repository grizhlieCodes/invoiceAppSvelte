<script>
  import Input from '../Input.svelte'
  import invoiceValue from '../../helpers/invoiceValueFormat.js'
  import { createEventDispatcher, onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  const dispatch = createEventDispatcher()

  export let name = '',
    quantity = '',
    price = 0, //always a string
    total = '',
    id

  let priceFocused = false
  $: transformedPrice = invoiceValue(price) //number: 5000 -> "5,000.00"
  $: priceForInput = priceFocused ? price : transformedPrice //priceFocused ? 5000 : "5,000.00"
  $: priceType = priceFocused ? 'number' : 'text'
</script>

<style lang="scss">
  .listItemContainer {
    position: relative;
    overflow-x: scroll;
    align-items: center;
    column-gap: 1.6rem;
    display: grid;
    grid:
      'name name name name' min-content
      'quantity price total delete' min-content
      / minmax(6.4rem, 0.5fr) minmax(10rem, 1fr) minmax(10rem, 1fr) min-content;

    @include mq(tablet) {
      grid:
        'name name name name' min-content
        'quantity price total delete' min-content
        / minmax(13rem, 0.5fr) minmax(13rem, 1fr) minmax(13rem, 1fr) min-content;
    }

    .name-container {
      grid-area: name;
    }

    .quantity-container {
      grid-area: quantity;
    }

    .price-container {
      grid-area: price;
    }

    .total-container {
      grid-area: total;
    }

    .button-container {
      grid-area: delete;

      // flex: 0 0 1rem;
      // transform: translateY(-33%);
      &:hover {
        .delete-icon {
          transition: fill 200ms ease;
          fill: v(red-500);
        }
      }
      button {
        background: none;
        outline: none;
        border: none;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .listItemContainer {
    &:not(:nth-last-child(2)) {
      margin-bottom: 1rem;

      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        background: v(invoiceItem-divider-line-bg);
        transition: background 200ms ease;
        bottom: 0;
        left: 0;
      }
    }
  }
</style>

<div class="listItemContainer" transition:fly={{ y: -20, duration: 200 }}>
  <div class="name-container input-container">

    <Input
      listItem="true"
      label="Name"
      type="text"
      on:input={() => dispatch('updateItemName')}
      placeholder=""
      id="name"
      value={name} />

  </div>

  <div class="quantity-container input-container">
    <Input
      listItem="true"
      label="Quantity"
      type="number"
      on:input={() => dispatch('updateItemQuantity')}
      placeholder=""
      id="quantity"
      value={quantity} />
  </div>

  <div class="price-container input-container">

    <Input
      listItem="true"
      label="Price"
      type={priceType}
      on:input={() => dispatch('updateItemPrice')}
      on:focus={() => (priceFocused = true)}
      on:blur={() => (priceFocused = false)}
      placeholder=""
      id="price-{id}"
      value={priceForInput} />

  </div>

  <div class="total-container input-container">
    <Input
      listItem="true"
      label="Total"
      type="text"
      on:input={() => dispatch('updateItemTotal')}
      placeholder=""
      id="total"
      value={total} />
  </div>

  <div class="button-container input-container">
    <button on:click={() => dispatch('deleteItem')}>
      <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          class="delete-icon"
          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777
          1.777 0 01-1.777-1.778V3.556h10.666zM8.473
          0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
          fill="#888EB0"
          fill-rule="nonzero" />
      </svg>
    </button>
  </div>

</div>
