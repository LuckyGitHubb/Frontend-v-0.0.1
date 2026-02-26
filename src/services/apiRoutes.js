const domain = 'http://localhost:5000';

    export const Transaction_API = {
        ADD: `${domain}/transaction/add`, // both add and update
        DELETE: `${domain}/transaction/delete`,
        GET_ONE: `${domain}/transaction/single`,
        GET_ALL: `${domain}/transaction/all`,
    }
    export const Branch_API = {
        ADD: `${domain}/branch/add`, // both add and update
        DELETE: `${domain}/branch/delete/:id`,
        GET_ONE: `${domain}/branch/single/:id`,
        GET_ALL: `${domain}/branch/all`,
    }
    export const Product_API = {
        ADD: `${domain}/product/add`, // both add and update
        DELETE: `${domain}/product/delete/:id`,
        GET_ONE: `${domain}/product/single/:id`,
        GET_ALL: `${domain}/product/all`,
    }
    export const Stock_API = {
        ADD: `${domain}/stock/add`, // both add and update
        DELETE: `${domain}/stock/delete/:id`,
        GET_ONE: `${domain}/stock/single/:id`,
        GET_ALL: `${domain}/stock/all`,
    }
    export const Purchase_API = {
        ADD: `${domain}/purchase/add`, // both add and update
        DELETE: `${domain}/purchase/delete/:id`,
        GET_ONE: `${domain}/purchase/single/:id`,
        GET_ALL: `${domain}/purchase/all`,
    }
    export const Sale_API = {
        ADD: `${domain}/sale/add`, // both add and update
        DELETE: `${domain}/sale/delete/:id`,
        GET_ONE: `${domain}/sale/single/:id`,
        GET_ALL: `${domain}/sale/all`,
    }
    export const Invoice_API = {
        ADD:(saleId)=> `${domain}/invoice/add/${saleId}`, // both add and update
        DELETE: `${domain}/invoice/delete/:id`,
        GET_ONE: `${domain}/invoice/single/:id`,
        GET_ALL: `${domain}/invoice/all`,
    }   