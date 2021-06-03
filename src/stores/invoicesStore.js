import { writable } from 'svelte/store'
import SelectedInvoice from './selectedInvoice.js'
import User from './userStore'
const invoices = writable([])

let loadedInvoices = []
let userID

const customInvoices = {
    subscribe: invoices.subscribe,
    addInvoice: (invoice) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items, invoice]
            return allInvoices
        })
        localStorage.setItem('invoices', JSON.stringify(allInvoices))
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...invoice })
        }
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}.json`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Couldn't save new invoice`)
                } else {
                    customInvoices.fetchFirebaseInvoicesForUser()
                }
            }).catch(err => console.log(err))
    },
    editInvoice: (invoice, invoiceUid) => {
        let allInvoices
        let editedInvoice
        invoices.update(items => {
            editedInvoice = { ...invoice }
            allInvoices = [...items]
            let editedInvoiceIndex = allInvoices.findIndex(inv => inv.invoiceUid === invoiceUid)
            allInvoices[editedInvoiceIndex] = editedInvoice
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            SelectedInvoice.setInvoice(editedInvoice)
            return allInvoices
        })
        const options = {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ ...editedInvoice })
        }
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}/${invoiceUid}.json`, options)
            .then(res => {
                if (!res.ok) {
                    console.log(`didn't upload for some reas`)
                } else {
                    console.log('worked correctly')
                }
            }).catch(err => console.log(err))
    },
    deleteInvoice: (invoiceUid) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            allInvoices = allInvoices.filter(invoice => invoice.invoiceUid !== invoiceUid)
            localStorage.setItem('invoices', JSON.stringify(allInvoices))
            return allInvoices
        })
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}/${invoiceUid}.json`, {
            method: 'DELETE'
        }).then(res => {if(!res.ok) { 
            console.log(`Didn't delete properly.`) 
        }}).catch(err => console.log(err))
    },
    updateInvoiceStatusLocal: (invoiceID, newStatus) => {
        let allInvoices
        invoices.update(items => {
            allInvoices = [...items]
            let selectedInvoiceIndex = allInvoices.findIndex(invoice => invoice.id === invoiceID)
            allInvoices[selectedInvoiceIndex].status = newStatus
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
                loadedInvoices = []
                for (const invoice in invoiceData) {
                    loadedInvoices = [
                        ...loadedInvoices,
                        {
                            ...invoiceData[invoice],
                            invoiceUid: invoice,
                        }
                    ]
                }
                invoices.set(loadedInvoices)

            })
    },
    updateInvoiceStatusFirebase: (newStatus, invoiceUid) => {
        let allInvoices
        const unsubscribe = invoices.subscribe(inv => allInvoices = inv)
        const updatedInvoice = allInvoices.find(invoice => invoice.invoiceUid === invoiceUid)
        updatedInvoice.status = newStatus
        const options = {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ ...updatedInvoice })
        }
        fetch(`https://invoiceappfementor-default-rtdb.europe-west1.firebasedatabase.app/invoices/${userID}/${invoiceUid}.json`, options)
            .then(res => {
                if (!res.ok) {
                    console.log(`didn't upload for some reas`)
                }
            }).catch(err => console.log(err))
    }
}

export default customInvoices
