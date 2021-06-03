<script>
  import { fly, fade } from 'svelte/transition'
  import GoBack from '../Invoice/GoBack.svelte'
  import { createEventDispatcher, getContext, onMount } from 'svelte'
  import Input from '../Input.svelte'
  import InvoicesArray from '../../invoices/testing' //Data source, will be replaced
  import InvoiceDate from '../DatePicker/InvoiceDate.svelte'
  import PaymentTerms from './PaymentTerms.svelte'
  import Button from '../Button.svelte'
  import ListItem from './ListItem.svelte'
  import visualiseDate from '../../helpers/realDateToInvoiceVisual.js'
  import formatValue from '../../helpers/invoiceValueFormat.js'
  import { createPublicKey } from 'crypto'
  import createInvoiceID from '../../helpers/createInvoiceID.js'
  import Invoices from '../../stores/invoicesStore.js'
  import {
    isNotEmpty,
    itemsNotEmpty,
  } from '../../helpers/validateInputLength.js'
  import LocalUser from '../../stores/userStore.js'

  let userID = $LocalUser.uid

  const size = getContext('size')
  const dispatch = createEventDispatcher()

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
  }

  function grabIDsFromInvoices() {
    let invoices = [...$Invoices] //Needs to be updated once i create invoices of my own
    let idList = []
    invoices.forEach((invoice) => {
      idList = [...idList, invoice.id]
    })
    return idList
  }

  export let invoiceId = undefined

  let invoiceIDList = grabIDsFromInvoices()


  let senderStreet = ''
  let senderCity = ''
  let senderPostCode = ''
  let senderCountry = ''
  let clientName = ''
  let clientEmail = ''
  let clientStreet = ''
  let clientCity = ''
  let clientPostCode = ''
  let clientCountry = ''
  let createdAt = '' //ignore during validation
  let paymentTerms = 30 //ignore during validation
  let paymentDue = '' //ignore during validation
  let description = ''
  let items = ''
  let status = 0
  let total = []
  let id = invoiceId ? invoiceId : ''
  let invoiceUid = ''
  
  // VALIDATION VARIABLES

  let saveAndSendClicked = false

  $: senderStreetValid = isNotEmpty(senderStreet)
  $: senderCityValid = isNotEmpty(senderCity)
  $: senderPostCodeValid = isNotEmpty(senderPostCode)
  $: senderCountryValid = isNotEmpty(senderCountry)
  $: clientNameValid = isNotEmpty(clientName)
  $: clientEmailValid = isNotEmpty(clientEmail)
  $: clientStreetValid = isNotEmpty(clientStreet)
  $: clientCityValid = isNotEmpty(clientCity)
  $: clientPostCodeValid = isNotEmpty(clientPostCode)
  $: clientCountryValid = isNotEmpty(clientCountry)
  $: descriptionValid = isNotEmpty(description)
  $: itemsValid = itemsNotEmpty(items)
  $: formValid =
    senderStreetValid &&
    senderCityValid &&
    senderPostCodeValid &&
    senderCountryValid &&
    clientNameValid &&
    clientEmailValid &&
    clientStreetValid &&
    clientCityValid &&
    clientPostCodeValid &&
    clientCountryValid &&
    descriptionValid &&
    itemsValid

  let data = {}

  const updateSenderStreet = (e) => {
    const val = e.target.value
    senderStreet = val
    data = { ...data, senderStreet }
  }
  const updateSenderPostCode = (e) => {
    const val = e.target.value
    senderPostCode = val
  }
  const updateSenderCity = (e) => {
    const val = e.target.value
    senderCity = val
  }
  const updateSenderCountry = (e) => {
    const val = e.target.value
    senderCountry = val
  }
  const updateClientName = (e) => {
    const val = e.target.value
    clientName = val
  }
  const updateClientEmail = (e) => {
    const val = e.target.value
    clientEmail = val
  }
  const updateClientStreet = (e) => {
    const val = e.target.value
    clientStreet = val
  }
  const updateClientCity = (e) => {
    const val = e.target.value
    clientCity = val
  }
  const updateClientPostCode = (e) => {
    const val = e.target.value
    clientPostCode = val
  }
  const updateClientCountry = (e) => {
    const val = e.target.value
    clientCountry = val
  }
  const updateDescription = (e) => {
    const val = e.target.value
    description = val
  }

  const updateInvoiceDateAndDateDue = (e) => {
    const date = e.detail.date
    let dueDate = new Date(date).addDays(paymentTerms)
    createdAt = `${date}`
    paymentDue = `${dueDate}`
  }

  const setCreatedAtAsToday = () => {
    createdAt = new Date()
  }

  if (invoiceId) {
    let invoice = $Invoices.find((invoice) => invoice.id === invoiceId)
    senderStreet = invoice.senderAddress.senderStreet
    senderCity = invoice.senderAddress.senderCity
    senderPostCode = invoice.senderAddress.senderPostCode
    senderCountry = invoice.senderAddress.senderCountry
    clientName = invoice.clientName
    clientEmail = invoice.clientEmail
    clientStreet = invoice.clientAddress.clientStreet
    clientCity = invoice.clientAddress.clientCity
    clientPostCode = invoice.clientAddress.clientPostCode
    clientCountry = invoice.clientAddress.clientCountry
    createdAt = invoice.createdAt
    paymentTerms = invoice.paymentTerms
    paymentDue = invoice.paymentDue
    description = invoice.description
    items = invoice.items
    status = invoice.status
    total = invoice.total
    invoiceUid = invoice.invoiceUid
  }

  const updateDateDue = (e) => {
    paymentTerms = e.detail
    if (createdAt != '') {
      paymentDue = new Date(createdAt).addDays(paymentTerms)
    } 
  }

  const addNewItem = () => {
    items = [
      ...items,
      {
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      },
    ]
  }
  const updateItemName = (index) => {
    let itemName = event.target.value
    items[index].name = itemName
  }
  const updateItemQuantity = (index) => {
    let itemQuantity = parseInt(event.target.value, 10)
    items[index].quantity = itemQuantity
    items[index].total = items[index].price * items[index].quantity
  }
  const updateItemPrice = (index) => {
    let itemPrice = parseInt(event.target.value, 10)
    items[index].price = itemPrice
    items[index].total = items[index].price * items[index].quantity
  }
  const deleteItem = (i) => {
    items = items.filter((item, index) => index !== i)
  }

  const updateDataWithAllVariables = (saveInvoiceAs) => {
    let updatedTotal = 0
    if (items.length >= 1) {
      items.forEach((item) => {
        updatedTotal = updatedTotal + item.total
      })
    }
    data = {
      clientAddress: {
        clientStreet,
        clientCity,
        clientPostCode,
        clientCountry,
      },
      clientEmail,
      clientName,
      createdAt,
      description,
      paymentDue,
      paymentTerms,
      senderAddress: {
        senderStreet,
        senderCity,
        senderPostCode,
        senderCountry,
      },
      items,
      total: updatedTotal,
      invoiceUid: invoiceUid,
    }
    if (saveInvoiceAs === 'saveAsNew') {
      data = {
        ...data,
        status: 'pending',
        id: createInvoiceID(invoiceIDList),
      }
    } else if (saveInvoiceAs === 'saveAsEdit') {
      data = {
        ...data,
        status,
        id,
      }
    } else if (saveInvoiceAs === 'saveAsDraft') {
      data = {
        ...data,
        status: 'draft',
        id: createInvoiceID(invoiceIDList),
      }
    } else if (saveInvoiceAs === 'submitDraftToSend') {
      data = {
        ...data,
        status: 'pending',
        id: invoiceId,
      }
    }
  }

  const saveNewInvoice = () => {
    saveAndSendClicked = true
    if (formValid) {
      updateDataWithAllVariables('saveAsNew')
      let invoice = data
      Invoices.addInvoice(invoice, userID)
      closeModalAndClearData()
    }
  }

  const saveEditedInvoice = () => {
    updateDataWithAllVariables('saveAsEdit')
    let invoice = data
    Invoices.editInvoice(invoice, invoiceUid)
    closeModalAndClearData()
  }

  const saveInvoiceAsDraft = () => {
    updateDataWithAllVariables('saveAsDraft')
    let invoice = data
    Invoices.addInvoice(invoice)
    closeModalAndClearData()
  }

  const saveDraftToSend = () => {
    saveAndSendClicked = true
    if (formValid) {
      updateDataWithAllVariables('submitDraftToSend')
      let invoice = data
      Invoices.editInvoice(invoice, invoiceUid)
      closeModalAndClearData()
    }
  }

  const updateDraftInvoiceDontSend = () => {
    updateDataWithAllVariables('saveAsEdit')
    let invoice = data
    Invoices.editInvoice(invoice, invoice.invoiceUid)
    closeModalAndClearData()
  }

  const closeModalAndClearData = () => {
    invoiceId = undefined
    dispatch('closeInvoiceAndClearId')
  }
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
    transition: background 200ms ease;
    padding: 3.2rem 0.8rem 3.2rem 0.8rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: 10rem;
      left: 0;
      right: 0;
      height: 30rem;
      pointer-events: none;
      background: rgb(255, 255, 255);
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.31976540616246496) 100%
      );
    }

    @include mq(tablet) {
      padding: 5.6rem 3.2rem 12rem 3.2rem;
    }

    @include mq(desktop) {
      width: 61.6rem;
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

  .clientInfoContainer {
    margin-bottom: 3rem;
  }

  section:nth-last-child(1) {
    margin-bottom: 20rem;
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
      transition: color 200ms ease;
    }

    h3 {
      font-size: 1.2rem;
      line-height: 1.5rem;
      letter-spacing: -0.25px;
      font-weight: v(font-bold);
      color: v(edit-invoice-accent);
      margin-bottom: 2.4rem;
      transition: color 200ms ease;
    }

    @include mq(tablet) {
      padding-left: 2.4rem;
      padding-right: 1.6rem;
    }
  }

  .items {
    width: 100%;

    .heading-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .error-message {
        color: v(red-500);
        font-size: 1.2rem;
        letter-spacing: -0.25px;
        line-height: 1.5rem;
      }
    }

    h2 {
      font-size: 1.8rem;
      font-weight: v(font-bold);
      line-height: 3.2rem;
      letter-spacing: -0.38px;
      color: v(h2-item-list-col);
      transition: color 200ms ease;
    }
  }

  .buttons-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    padding: 3.2rem 5.7rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: v(edit-invoice-bg);
    transition: background 200ms ease;
    border-radius: 0 0.8rem 0 0;
    column-gap: 0.8rem;

    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);

    .discard-button {
      flex: 1 0 auto;
    }
    .draft-button {
      margin-right: 0.8rem;
    }
  }

  :global(body.dark) {
    .buttons-container {
      box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
    }
  }

  section.error-messages {
    p {
      color: v(red-500);
      font-size: 1rem;
      font-weight: v(font-semi-bold);
      line-height: 1.5rem;
      letter-spacing: -0.21px;
    }
  }
</style>

<div
  class="overlay"
  on:click={() => dispatch('toggleModal')}
  transition:fade={{ duration: 200 }} />

<div class="editInvoice" transition:fly={{ x: -200, duration: 400 }}>
  {#if $size === 'mobile'}
    <div class="goBackContainer">
      <GoBack on:click={closeModalAndClearData} />
    </div>
  {/if}
  <form on:submit|preventDefault autocomplete="off">
    <h1>{!invoiceId ? 'New Invoice' : `Edit #${invoiceId}`}</h1>
    <section class="senderInfoContainer flexContainer section">
      <h3>Bill From</h3>
      <Input
        id="senderStreet"
        label="Street Address"
        flex="f-full"
        value={senderStreet}
        valid={senderStreetValid}
        {saveAndSendClicked}
        on:input={updateSenderStreet} />
      <Input
        id="senderCity"
        label="City"
        flex="f-share"
        value={senderCity}
        valid={senderCityValid}
        {saveAndSendClicked}
        on:input={updateSenderCity} />
      <Input
        id="senderPostCode"
        label="Post Code"
        flex="f-share"
        value={senderPostCode}
        valid={senderPostCodeValid}
        {saveAndSendClicked}
        on:input={updateSenderPostCode} />
      <Input
        id="senderCountry"
        label="Country"
        flex="f-share"
        value={senderCountry}
        valid={senderCountryValid}
        {saveAndSendClicked}
        on:input={updateSenderCountry} />
    </section>
    <section class="clientInfoContainer flexContainer section">
      <h3>Bill To</h3>
      <Input
        id="clientName"
        label="Client's Name"
        flex="f-full"
        value={clientName}
        valid={clientNameValid}
        {saveAndSendClicked}
        on:input={updateClientName} />
      <Input
        type="email"
        id="clientEmail"
        label="Client's Email"
        flex="f-full"
        value={clientEmail}
        valid={clientEmailValid}
        {saveAndSendClicked}
        on:input={updateClientEmail} />
      <Input
        id="clientStreet"
        label="Street Address"
        flex="f-full"
        value={clientStreet}
        valid={clientStreetValid}
        {saveAndSendClicked}
        on:input={updateClientStreet} />
      <Input
        id="clientCity"
        label="City"
        flex="f-share"
        value={clientCity}
        valid={clientCityValid}
        {saveAndSendClicked}
        on:input={updateClientCity} />
      <Input
        id="clientPostCode"
        label="Post Code"
        flex="f-share"
        value={clientPostCode}
        valid={clientPostCodeValid}
        {saveAndSendClicked}
        on:input={updateClientPostCode} />
      <Input
        id="clientCountry"
        label="Country"
        flex="f-share"
        value={clientCountry}
        valid={clientCountryValid}
        {saveAndSendClicked}
        on:input={updateClientCountry} />
      <InvoiceDate
        flex="f-half"
        dateFromInvoice={createdAt}
        on:updateInvoiceDate={updateInvoiceDateAndDateDue} 
        on:setCreatedAtAsToday={setCreatedAtAsToday}/>
      <PaymentTerms
        flex="f-half"
        on:updateDateDue={updateDateDue}
        paymentTermsFromInvoice={paymentTerms} />

      <Input
        id="description"
        label="Project Description"
        flex="f-full"
        value={description}
        valid={descriptionValid}
        {saveAndSendClicked}
        on:input={updateDescription} />
      <div class="items">
        <div class="heading-container">
          <h2 class="item-list">Item List</h2>
          {#if !itemsValid && saveAndSendClicked}
            <p class="error-message">* Add an item</p>
          {/if}
        </div>
        {#each items as item, i}
          <ListItem
            on:updateItemName={updateItemName.bind(this, i)}
            on:updateItemQuantity={updateItemQuantity.bind(this, i)}
            on:updateItemPrice={updateItemPrice.bind(this, i)}
            on:updateItemTotal
            on:deleteItem={deleteItem.bind(this, i)}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            total={formatValue(item.total)}
            id="price-{i}" />
        {/each}

        <Button
          type="button"
          on:click={addNewItem}
          btnClass="large"
          content="+ Add New Item" />
      </div>
    </section>
    {#if !formValid && saveAndSendClicked}
      <section class="error-messages">
        {#if !formValid}
          <p>- All fields must be added</p>
        {/if}
        {#if !itemsValid}
          <p>- An item must be added</p>
        {/if}
      </section>
    {/if}

  </form>

  {#if !invoiceId}
    <!-- content here -->
    <div class="buttons-container">
      <div class="discard-button">
        <Button
          content="Discard"
          on:click={closeModalAndClearData}
          btnClass="dark" />
      </div>
      <div class="draft-button">
        <Button
          content="Save as Draft"
          on:click={saveInvoiceAsDraft}
          btnClass="dark" />
      </div>
      <div class="save-button">
        <Button
          content="Save and Send"
          on:click={saveNewInvoice}
          btnClass="primary" />
      </div>
    </div>
  {:else if invoiceId}
    <div class="buttons-container">

      <div class="discard-button">
        <Button
          content="Cancel"
          on:click={closeModalAndClearData}
          btnClass="dark" />
      </div>

      {#if status === 'draft'}
        <div class="update-draft-button">
          <Button
            content="Update Draft"
            on:click={updateDraftInvoiceDontSend}
            btnClass="dark" />
        </div>
        <div class="save-final-button">
          <Button
            content="Save and Send"
            on:click={saveDraftToSend}
            btnClass="primary" />
        </div>
      {/if}

      {#if status !== 'draft'}
        <div class="save-button">
          <Button
            content="Save And Resend"
            on:click={saveEditedInvoice}
            btnClass="primary" />
        </div>

      {/if}
    </div>
  {/if}

</div>