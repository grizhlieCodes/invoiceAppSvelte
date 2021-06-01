import { writable } from 'svelte/store'
import SelectedInvoice from './selectedInvoice.js'
const invoices = writable([])

if (localStorage.getItem('invoices')) {
    let localInvoices = JSON.parse(localStorage.getItem('invoices'))
    invoices.set(localInvoices)
}

const customInvoices = {
    subscribe: invoices.subscribe,
    addInvoice: (invoice) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items, invoice]
            return allInvoices
        })
        localStorage.setItem('invoices', JSON.stringify(allInvoices))
    },
    editInvoice: (invoice, invoiceID) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            let editedInvoiceIndex = allInvoices.findIndex(invoice => invoice.id === invoiceID)
            allInvoices[editedInvoiceIndex] = { ...invoice }
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            SelectedInvoice.setInvoice(invoice)
            return allInvoices
        })
    },
    deleteInvoice: (invoiceID) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            allInvoices = allInvoices.filter(invoice => invoice.id !== invoiceID)
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            return allInvoices
        })
    },
    markInvoiceAsPaid: (invoiceID) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            let selectedInvoiceIndex = allInvoices.findIndex(invoice => invoice.id === invoiceID)
            allInvoices[selectedInvoiceIndex].status = 'paid'
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            return allInvoices
        })
    },
    markInvoiceAsUnpaid: (invoiceID) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            let selectedInvoiceIndex = allInvoices.findIndex(invoice => invoice.id === invoiceID)
            allInvoices[selectedInvoiceIndex].status = 'pending'
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            return allInvoices
        })
    },
}

export default customInvoices