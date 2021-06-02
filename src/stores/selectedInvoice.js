import {writable} from 'svelte/store'
import customInvoices from './invoicesStore'

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