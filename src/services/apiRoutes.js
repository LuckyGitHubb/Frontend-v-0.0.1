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