import { writable } from 'svelte/store'
import SelectedInvoice from './selectedInvoice.js'
import User from './userStore'
const invoices = writable([])

let loadedInvoices = []
let userID

// if (localStorage.getItem('invoices')) {
//     let localInvoices = JSON.parse(localStorage.getItem('invoices'))
//     invoices.set(localInvoices)
// }

const customInvoices = {
    subscribe: invoices.subscribe,
    addInvoice: (invoice, userID) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items, invoice]
            return allInvoices
        })
        localStorage.setItem('invoices', JSON.stringify(allInvoices))
        console.log(JSON.stringify({ ...invoice }))
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...invoice})
        }
        console.log(invoice, userID)
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}.json`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Couldn't save new invoice`)
                }
            }).catch(err => console.log(err))
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
    updateLocalUser: (user) => {
        userID = user.uid
        customInvoices.fetchFirebaseInvoicesForUser()
    },
    fetchFirebaseInvoicesForUser: () => {
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}.json`)
        .then(data => data.json())
        .then(invoiceData => {
            for(const invoice in invoiceData){
                loadedInvoices = [
                    ...loadedInvoices,
                    invoiceData[invoice]
                ]
            }
            invoices.set(loadedInvoices)
        })
    }
}

export default customInvoices