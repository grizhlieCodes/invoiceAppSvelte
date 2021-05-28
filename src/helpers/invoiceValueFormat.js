const invoiceValueFormat = (number) => {
    return number.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

export default invoiceValueFormat