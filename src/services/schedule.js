const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllSchedule() {
    return knex('sms_schedule')
        .select(
            ['sms_schedule.*',
                'sms_complain.complain_number',
                'sms_complain.job_title',
                'sms_complain.complain_job_title',
                'sms_complain.amount',
                'sms_complain.customer_name',
                'sms_complain.customer_phone',
                'sms_complain.distance',
                'sms_complain.location',
                'sms_complain.date',
                'sms_complain.complain_description',
                'sms_model.model_number',
                'sms_machine.fup_number',
                'sms_machine.machine_serial_number',
                'sms_machine.engine_serial_number',
                'sms_machine.warranty_year',
                'sms_machine.working_hour',
                'sms_machine.warranty_description',
                'sms_department.name'

            ])
        .leftJoin('sms_complain', 'sms_schedule.complain_id', 'sms_complain.id')
        .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')
        .leftJoin('sms_department', 'sms_complain.department_id', 'sms_department.id')
}

async function getscheduleById(id) {
    const model = await knex('sms_schedule')
        .select(
            ['sms_schedule.*',
                'sms_complain.complain_number',
                'sms_complain.job_title',
                'sms_complain.complain_job_title',
                'sms_complain.amount',
                'sms_complain.customer_name',
                'sms_complain.customer_phone',
                'sms_complain.distance',
                'sms_complain.location',
                'sms_complain.date',
                'sms_complain.complain_description',
                'sms_model.model_number',
                'sms_machine.fup_number',
                'sms_machine.machine_serial_number',
                'sms_machine.engine_serial_number',
                'sms_machine.warranty_year',
                'sms_machine.working_hour',
                'sms_machine.warranty_description',
                'sms_department.name'

            ])
        .leftJoin('sms_complain', 'sms_schedule.complain_id', 'sms_complain.id')
        .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id')
        .leftJoin('sms_model', 'sms_machine.model_id', 'sms_model.id')
        .leftJoin('sms_department', 'sms_complain.department_id', 'sms_department.id')
        .where({ 'sms_schedule.id': parseInt(id) });
    return model[0]
}

async function addschedule(schedule) {

    return knex.transaction((trx) => {
        return knex('sms_schedule')
            .insert(schedule)
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
                return getscheduleById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateschedule(id, schedule) {
    return knex.transaction(async (trx) => {
        return knex('sms_schedule')
            .transacting(trx)
            .update(schedule)
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
                return getscheduleById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deleteschedule(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_schedule')
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

async function jobStart(id, data) {
    console.log("Job Start Service",id);
    
    return knex.transaction(async (trx) => {
        return knex('sms_schedule')
            .transacting(trx)
            .update({'sms_schedule.job_status': 'Ongoing'})
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

module.exports = {
    getAllSchedule,
    getscheduleById,
    addschedule,
    updateschedule,
    deleteschedule,
    jobStart
};