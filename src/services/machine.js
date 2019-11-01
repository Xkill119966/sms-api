const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllMachine() {
    return knex('sms_machine')
        .select(['sms_machine.*', 'sms_model.model_number as modelnumber'])
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')

}

async function getmachineById(id) {
    const model = await knex('sms_machine')
    .select(['sms_machine.*', 'sms_model.model_number as modelnumber'])
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')
        .where({ 'sms_machine.id': parseInt(id) });
    return model[0]
}

async function addmachine(machine) {

    return knex.transaction((trx) => {
        return knex('sms_machine')
            .insert(machine)
            .transacting(trx)
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
                if (response[0] > 0) {
                    return response[0];
                } else {
                    throw ('error');
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
            if (response && response == 'error') {
                return 'error';
            } else {
                return getmachineById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updatemachine(id, machine) {
    return knex.transaction(async (trx) => {
        return knex('sms_machine')
            .transacting(trx)
            .update(machine)
            .where({ id: parseInt(id) })
            .then((response) => {
                // console.log('Response is ' + JSON.stringify(response)); 
                if (response > 0) {
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
            if (response && response == 'success') {
                return getmachineById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deletemachine(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_machine')
            .transacting(trx)
            .del()
            .where({ id: parseInt(id) })
            .then((response) => {
                if (response) {
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
            if (response && response == 'success') {
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
    getAllMachine,
    getmachineById,
    addmachine,
    updatemachine,
    deletemachine
};