<script>
  import Input from '../Input.svelte'
  import invoiceValue from '../../helpers/invoiceValueFormat.js'
  import {createEventDispatcher} from 'svelte'
  import {fly} from 'svelte/transition'
  const dispatch= createEventDispatcher()

  export let name = '', quantity = '', price = '', total = ''
</script>

<style lang="scss">
  .listItemContainer {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    column-gap: 1.6rem;
    max-width: 50.4rem;
    overflow-x: scroll;



    @include mq(tablet) {
        flex-flow: row nowrap;
    }

    .name-container {
      flex: 1 1 100%;

      @include mq(tablet){
          flex: 1 0 auto;
        //   max-width: 21rem;
      }
    }

    .quantity-container {
      flex: 0 0 6.4rem;
      
      @include mq(tablet){
        flex: 0 0 auto;
        // max-width: 6rem;
      }
    }

    .price-container {
      flex: 1 0 auto;
            
      @include mq(tablet){
        flex: 1 0 auto;
        // max-width: 10rem;
      }
    }

    .total-container {
      flex: 1 0 8rem;
      @include mq(tablet){
        flex: 1 1 auto;
      }
    }
             
    .button-container {
      flex: 0 0 1rem;

      button {
        background: none;
        outline: none;
        border: none;
        &:hover {
          cursor: pointer;
        }

        .delete-icon {
            &:hover {
                fill: v(red-500);
            }
        }
      }
    }
  }
</style>

<div class="listItemContainer" transition:fly={{y: -20, duration: 200}}>
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
      type="number"
      on:input={() => dispatch('updateItemPrice')}
      placeholder=""
      id="price"
      value={price} />
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
        <path class="delete-icon"
          d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777
          1.777 0 01-1.777-1.778V3.556h10.666zM8.473
          0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
          fill="#888EB0"
          fill-rule="nonzero" />
      </svg>
    </button>
  </div>
</div>
