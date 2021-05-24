<script>
  import { fly, fade } from 'svelte/transition'
  import GoBack from '../Invoice/GoBack.svelte'
  import { createEventDispatcher, getContext } from 'svelte'
  import Input from '../Input.svelte'
  import InvoicesArray from '../../invoices/testing' //Data source, will be replaced
  import InvoiceDate from '../DatePicker/InvoiceDate.svelte'
  const size = getContext('size')
  const dispatch = createEventDispatcher()

  export let invoiceId = undefined

  let senderStreet = '', senderCity = '', senderPostCode = '', senderCountry = ''

  let clientName,
    clientEmail,
    clientStreet,
    clientCity,
    clientPostCode,
    clientCountry,
    invoiceDate

  let data = {}

  const updateVariable = (e) => {
    const id = e.target.id
    const val = e.target.value
    if (id === 'senderStreet') senderStreet = val
    else if (id === 'senderCity') senderCity = val
    else if (id === 'senderPostCode') senderPostCode = val
    else if (id === 'senderCountry') senderCountry = val
    else if (id === 'clientName') clientName = val
    else if (id === 'clientEmail') clientEmail = val
    else if (id === 'clientStreet') clientStreet = val
    else if (id === 'clientCity') clientCity = val
    else if (id === 'clientPostCode') clientPostCode = val
    else if (id === 'clientCountry') clientCountry = val

    data = {
      senderAddress: {
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
      },
      clientAddress: {
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
      },
      clientName,
      clientEmail,
      invoiceDate
    }
    console.log(data)
  }

  //Load invoice information if we have an ID. 
  //We can only have an ID if we arrive from a specific invoice.
  if(invoiceId){
    let invoice = InvoicesArray.find(invoice => invoice.id === invoiceId)
    console.log(invoice)
    senderStreet = invoice.senderAddress.street
    senderCity = invoice.senderAddress.city
    senderPostCode = invoice.senderAddress.postCode
    senderCountry = invoice.senderAddress.country
    clientName = invoice.clientName
    clientEmail = invoice.clientEmail
    clientStreet = invoice.clientAddress.street
    clientCity = invoice.clientAddress.city
    clientPostCode = invoice.clientAddress.postCode
    clientCountry = invoice.clientAddress.country
    invoiceDate = invoice.createdAt
  }

  const submitForm = () => {}
</script>

<style lang="scss">
  .overlay,
  .editInvoice {
    grid-column: 1/4;
    grid-row: 2/4;
  }

  .overlay {
    @include mq(desktop) {
      grid-column: 2/5;
      grid-row: 1/3;
    }
  }
  .editInvoice {
    @include mq(desktop) {
      grid-column: 2/5;
      grid-row: 1/3;
    }
  }

  .overlay {
    background: black;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 50%;
  }

  .editInvoice {
    z-index: 200;
    height: 100%;
    width: clamp(37.5rem, 100%, 61.6rem);
    background: v(edit-invoice-bg);
    padding: 3.2rem 0.8rem 3.2rem 0.8rem;

    @include mq(tablet) {
      padding: 5.6rem 3.2rem 5.6rem 3.2rem;
    }

    @include mq(desktop) {
      width: 71.9rem;
    }
  }

  .flexContainer {
    display: flex;
    flex-flow: row wrap;
    column-gap: 2.3rem;
  }

  .section {
    margin-bottom: 1.6rem;
  }

  form {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-left: 2.4rem;
    padding-right: 0.8rem;

    .goBackContainer {
      margin-bottom: 1.4rem;
    }

    h1 {
      font-size: 2.4rem;
      line-height: 3.2rem;
      letter-spacing: -0.5px;
      font-weight: v(font-bold);
      color: v(main-text-color);
      margin-bottom: 2.4rem;
      transition: color 400ms ease;
    }

    h3 {
      font-size: 1.2rem;
      line-height: 1.5rem;
      letter-spacing: -0.25px;
      font-weight: v(font-bold);
      color: v(edit-invoice-accent);
      margin-bottom: 2.4rem;
      transition: color 400ms ease;
    }

    @include mq(tablet) {
      padding-left: 2.4rem;
      padding-right: 1.6rem;
    }
  }
</style>

<div
  class="overlay"
  on:click={() => dispatch('openModal')}
  transition:fade={{ duration: 200 }} />

<div class="editInvoice" transition:fly={{ x: -200, duration: 400 }}>
  {#if $size === 'mobile'}
    <div class="goBackContainer">
      <GoBack on:click />
    </div>
  {/if}
  <form on:submit|preventDefault={submitForm}>
    <h1>{!invoiceId ? 'New Invoice' : `Edit #${invoiceId}`}</h1>
    <section class="senderInfoContainer flexContainer section">
      <h3>Bill From</h3>
      <Input
        type="text"
        placeholder="
        "
        id="senderStreet"
        label="Street Address"
        flex="f-full"
        value={senderStreet}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="senderCity"
        label="City"
        flex="f-share"
        value={senderCity}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="senderPostCode"
        label="Post Code"
        flex="f-share"
        value={senderPostCode}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="senderCountry"
        label="Country"
        flex="f-share"
        value={senderCountry}
        on:input={updateVariable} />
    </section>
    <section class="clientInfoContainer flexContainer section">
      <h3>Bill To</h3>
      <Input
        type="text"
        placeholder="
        "
        id="clientName"
        label="Client's Name"
        flex="f-full"
        value={clientName}
        on:input={updateVariable} />
      <Input
        type="email"
        placeholder="
        "
        id="clientEmail"
        label="Client's Email"
        flex="f-full"
        value={clientEmail}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="clientStreet"
        label="Street Address"
        flex="f-full"
        value={clientStreet}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="clientCity"
        label="City"
        flex="f-share"
        value={clientCity}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="clientPostCode"
        label="Post Code"
        flex="f-share"
        value={clientPostCode}
        on:input={updateVariable} />
      <Input
        type="text"
        placeholder="
        "
        id="clientCountry"
        label="Country"
        flex="f-share"
        value={clientCountry}
        on:input={updateVariable} />
      <InvoiceDate 
        flex='f-share'
      />


    </section>
  </form>
</div>
