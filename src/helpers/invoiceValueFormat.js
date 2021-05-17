const invoiceValueFormat = (value) => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

export default invoiceValueFormat