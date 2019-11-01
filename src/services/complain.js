const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllComplain() {
    return knex('sms_complain')
        .select(
            ['sms_complain.*',
                'sms_model.model_number',
                'sms_machine.fup_number',
                'sms_machine.machine_serial_number',
                'sms_machine.engine_serial_number',
                'sms_machine.warranty_year',
                'sms_machine.working_hour',
                'sms_machine.warranty_description',
                'sms_department.name'

            ])
        .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')
        .leftJoin('sms_department', 'sms_complain.department_id', 'sms_department.id')
}

async function getcomplainById(id) {
    const model = await knex('sms_complain')
        .select(
            ['sms_complain.*',
                'sms_model.model_number',
                'sms_machine.fup_number',
                'sms_machine.machine_serial_number',
                'sms_machine.engine_serial_number',
                'sms_machine.warranty_year',
                'sms_machine.working_hour',
                'sms_machine.warranty_description',
                'sms_department.name'

            ])
        .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')
        .leftJoin('sms_department', 'sms_complain.department_id', 'sms_department.id')
        .where({ 'sms_complain.id': parseInt(id) });
    return model[0]
}

async function addcomplain(complain) {

    return knex.transaction((trx) => {
        return knex('sms_complain')
            .insert(complain)
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
                return getcomplainById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updatecomplain(id, complain) {
    return knex.transaction(async (trx) => {
        return knex('sms_complain')
            .transacting(trx)
            .update(complain)
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
                return getcomplainById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deletecomplain(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_complain')
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
    getAllComplain,
    getcomplainById,
    addcomplain,
    updatecomplain,
    deletecomplain
};