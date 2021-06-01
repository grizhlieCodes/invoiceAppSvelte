const data = [
    {
        iterators: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        iterateAmount: 2
    },
    {
        iterators: "1234567890",
        iterateAmount: 4
    }
];

let localId = createID()

function createID() {
    let result = [];
    data.forEach((iterator) => {
        const iteratorLength = iterator.iterators.length;
        for (var i = 0; i < iterator.iterateAmount; i++) {
            result.push(
                iterator.iterators.charAt(Math.floor(Math.random() * iteratorLength))
            );
        }
    });
    return result.join("");
}

let savedInvoiceIdList

function isIdUnique(invoiceIDList){
    if(invoiceIDList != null || invoiceIDList != undefined){
        savedInvoiceIdList = invoiceIDList
    }
    savedInvoiceIdList.forEach(invoiceID => {
        if(invoiceID === localId){
            localId = createID()
            isIdUnique(undefined)
        }
    })
    //while loop ^w
    return localId
}

export default isIdUnique