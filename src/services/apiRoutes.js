const domain = 'http://localhost:5000';

    export const Transaction_API = {
        ADD: `${domain}/transaction/add`, // both add and update
        DELETE: `${domain}/transaction/delete`,
        GET_ONE: `${domain}/transaction/single`,
        GET_ALL: `${domain}/transaction/all`,
    }