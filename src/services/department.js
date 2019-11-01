const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllDepartment() {
    return knex('sms_department')
    .select('*');
}

async function getdepartmentById(id) {
    const model = await knex('sms_department')
    .select('*')
    .where({ id: parseInt(id) });
    return model[0]
}

async function adddepartment(department) {

    return knex.transaction((trx) => {
        return knex('sms_department')
        .insert(department)
        .transacting(trx)
        .then((response) => {
            console.log('Response is ' + JSON.stringify(response));
            if(response[0] > 0) {
                return response[0];
            } else {
                throw('error');
            }
        }) 
        .then(trx.commit)
        .catch((err) => {
            trx.rollback;
            console.error('Exception error....', err);
            return 'error'
        });
    })
    .then((response) => { 
        console.log(response)
        console.log('Transaction object return object: ', response);
        if(response && response == 'error') {
            return 'error';
        } else {
            return getdepartmentById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updatedepartment(id, department) {
    return knex.transaction(async (trx) => {
        return knex('sms_department')
        .transacting(trx)
        .update(department)
        .where({ id: parseInt(id) })  
        .then((response) => {
            // console.log('Response is ' + JSON.stringify(response)); 
            if(response > 0) {
                return 'success';
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)                       
        .catch((err) => {
            trx.rollback;
            // console.error('Exception error....' + err);
            return 'error'
        });
    })
    .then((response) => { 
        // console.log('Transaction object return object: ' + response);
        if(response && response == 'success') {
            return getdepartmentById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deletedepartment(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_department')
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })
        .then((response) => {
            if(response) {
                return 'success';
            } else {
                return 'error';
            }
        }) 
        .then(trx.commit)                       
        .catch((err) => {
            trx.rollback;
            return 'error'
        });
    })
    .then((response) => { 
        if(response && response == 'success') {
            return 'success';
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        console.error(err);
    });
}

module.exports = {
    getAllDepartment,
    getdepartmentById,
    adddepartment,
    updatedepartment,
    deletedepartment
};