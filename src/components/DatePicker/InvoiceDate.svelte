<script>
  import DatePicker from './NewDatePicker.svelte'
  import visualiseDate from '../../helpers/realDateToInvoiceVisual.js'
  import pickedDate from '../../stores/pickedDate.js'

  export let inputClass = '',
    placeholder,
    flex,
    invoiceDateFromExistingInvoice

  $: console.log(invoiceDateFromExistingInvoice)

  $: invoicePresetDateArray = invoiceDateFromExistingInvoice ? invoiceDateFromExistingInvoice.split('-') : undefined
  $: invoicePresetDate = invoiceDateFromExistingInvoice ? new Date(invoicePresetDateArray[0],invoicePresetDateArray[1] - 1,invoicePresetDateArray[2]) : new Date()


  let showDatepicker = false

  const toggleDatepicker = () => {
    console.log('worked')
    showDatepicker = !showDatepicker
  }
  $: date = $pickedDate ? pickedDate.visualiseDate($pickedDate) : visualiseDate(new Date())

  $: invoiceDateFromExistingInvoice ? date = pickedDate.visualiseDate(invoicePresetDate) : null

</script>

<style lang="scss">
  .form-item {
    margin: 0 0rem 2.4rem 0rem;
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
  }
  label {
    color: v(label-text);
    font-size: 1.2rem;
    letter-spacing: -0.025rem;
    line-height: 1.5rem;
    transition: color 250ms ease-in-out;
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
    transition: color 250ms ease-in-out, background 250ms ease-in-out;
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

    @include mq(tablet) {
      flex: 1 0 50%;
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
      on:click={toggleDatepicker}
      {placeholder}
      id="invoiceDate">
      {date}
    </button>
    <img src="./assets/icon-calendar.svg" alt="calendar icon" />
  </div>
  {#if showDatepicker}
     <DatePicker {date} {invoicePresetDate}/>
  {/if}
</div>
