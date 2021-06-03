<script>
  import DatePicker from './NewDatePicker.svelte'
  import visualiseDate from '../../helpers/realDateToInvoiceVisual.js'
  import pickedDate from '../../stores/pickedDate.js'
  import {  onDestroy, createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  //Basic Variables
  let showDatepicker = false

  let allowWindowListener = false

  $: if(showDatepicker){
    setTimeout(() => {
      allowWindowListener = true
    }, 100)
  } else {
    allowWindowListener = false
  }

  export let inputClass = '',
    placeholder = '',
    flex = '',
    dateFromInvoice = ''
  
  let date =  dateFromInvoice ? new Date(dateFromInvoice) : new Date()
  $: dateVisualised = pickedDate.visualiseDate(date)

  const toggleDatepicker = () => {
    showDatepicker = !showDatepicker
  }

  onDestroy(() => {
    pickedDate.nullify()
  })

  console.log($pickedDate)

  document.addEventListener('click', (e) => {
    let datepicker = document.querySelector('.calendar-container')
    let closestDatePicker = e.target.closest('.calendar-container')
    let clickedOutsideDatepicker = datepicker != closestDatePicker
    
    if (clickedOutsideDatepicker && allowWindowListener) {
      console.log('Closing Datepicker')
      setTimeout(() => {
        showDatepicker = false
      }, 100)
    }
  })

  const updateInvoiceDate = (e) => {
    let newDate = new Date(e.detail.date)
    date = new Date(newDate)
    dispatch('updateInvoiceDate', {date: newDate})
  }
</script>

<style lang="scss">
  .form-item {
    margin: 0 0rem 2.4rem 0rem;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    position: relative;
  }
  label {
    color: v(label-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    transition: color 200ms ease;
    margin-bottom: 1rem;
  }
  button {
    margin: 1rem 0rem 0 0rem;
    background: v(input-background);
    border: 1px solid v(input-border);
    color: v(input-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    outline: none;
    width: 100%;
    height: 4.8rem;
    border-radius: 0.4rem;
    padding: 0 2rem;
    transition: color 200ms ease, background 200ms ease;
    cursor: pointer;
    text-align: left;

    &:focus-within {
      box-shadow: 0 0 1pt 1pt v(input-outline);
    }
  }

  .f-full {
    flex: 1 0 100%;
  }

  .f-half {
    flex: 1 0 100%;

    @media screen and (min-width: 560px) {
      flex: 1 0 20rem;
    }
  }

  .input-container {
    position: relative;

    img {
      position: absolute;
      right: 1.6rem;
      top: 50%;
      transform: translate(0, -26%);
    }
  }

  input::-webkit-calendar-picker-indicator {
    display: none;
  }

  input[type='date']::-webkit-input-placeholder {
    visibility: hidden !important;
  }
</style>

<!-- Rewrite this to be a custom input? Or just text? text. -->

<div class="form-item {flex}">
  <label for="invoiceDate">Invoice Date</label>
  <div class="input-container">
    <button
      type="button"
      class={inputClass}
      on:click={() => {
        toggleDatepicker()
      }}
      {placeholder}
      id="invoiceDate"
      data-date={date}>
      {dateVisualised}
    </button>
    <img src="./assets/icon-calendar.svg" alt="calendar icon" />
  </div>
  {#if showDatepicker}
    <DatePicker
      {dateVisualised}
      existingDate={date}
      on:updateInvoiceDate={updateInvoiceDate}
      on:closeDatepicker={() => {
        setTimeout(() => {
          showDatepicker = !showDatepicker
        }, 250)
      }} />
  {/if}
</div>
