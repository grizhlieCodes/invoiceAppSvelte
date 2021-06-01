import {writable} from 'svelte/store'
import customInvoices from './InvoicesStore'

const invoice = writable()

const customInvoice = {
    subscribe: invoice.subscribe,
    setInvoice: (selectedInvoice) => {
        invoice.set(selectedInvoice)
    },
    clearInvoice: () => {
        invoice.set()
    },
}

export default customInvoice