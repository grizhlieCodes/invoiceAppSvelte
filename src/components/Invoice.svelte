<script>
    import {getContext} from 'svelte'
    import Status from './StatusCard.svelte'
    import Button from './Button.svelte'
    let size = getContext('size')
    //how can i easily give this all properties with svelte?
    //https://svelte.dev/tutorial/spread-props

    export let id, status, description, clientAddress,createdAt,paymentDue,clientEmail,items,total,senderAddress,clientName,paymentTerms
</script>

<style lang="scss">

</style>

<div class="invoice-container {$size} paymentTerm{paymentTerms}" {id}>
    <div class="invoice-header">
        <div class="status-container">
            <p>Status</p>
            <Status {status}/>
        </div>
    </div>
    <div class="invoice-body">
        <div class="top-left-info">
            <p class="invoice-id">
                {id}
            </p>
            <p class="description">
                {description}
            </p>
        </div>
        <div class="ourAddress">
            <p class="address-line">{senderAddress.street}</p>
            <p class="address-line">{senderAddress.city}</p>
            <p class="address-line">{senderAddress.postCode}</p>
            <p class="address-line">{senderAddress.country}</p>
        </div>
        <div class="dates">
            <div class="invoiceDate">
                <p class="label">
                    Invoice Date
                </p>
                <p>{createdAt}</p>
            </div>
            <div class="payementDue">
                <p class="label">
                    Payment Due
                </p>
                <p>{paymentDue}</p>
            </div>
        </div>
        <div class="clientAddress">
            <p class="label">Bill To</p>
            <h2 class="clientName">{clientName}</h2>
            <p class="address-line">{clientAddress.street}</p>
            <p class="address-line">{clientAddress.city}</p>
            <p class="address-line">{clientAddress.postCode}</p>
            <p class="address-line">{clientAddress.country}</p>
        </div>
        <div class="clientEmail">
            <p class="label">Sent to</p>
            {clientEmail}
        </div>
        <div class="items">
            <p class="itemName label">
                ItemName
            </p>
            <p class="itemQuantity label">
                QTY.
            </p>
            <p class="itemPrice label">
                Price
            </p>
            <p class="itemNTotal label">
                Total
            </p>
            {#each items as item}
                <div class="item">
                    <p class="itemName label">
                        {item.name}
                    </p>
                    <p class="itemQuantity label">
                        {item.quantity}
                    </p>
                    <p class="itemPrice label">
                        {item.price}
                    </p>
                    <p class="itemNTotal label">
                        {item.total}
                    </p>
                </div>
            {/each}
        </div>
        <div class="grandTotal">
            <div class="label">
                Grand Total
            </div>
            <h2>
                {total}
            </h2>
        </div>
    </div>
    <div class="invoice-buttons">
        <!-- We need to pass the invoice ID to each of the below when we call
        their functions. -->
        <Button content="Edit" btnClass="light" on:click />
        <Button content="Delete" btnClass="red" on:click />
        <Button content="Mark as Paid" btnClass="primary" on:click />
    </div>
</div>

