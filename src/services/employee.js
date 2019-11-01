const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllEmployee() {

    return knex('sms_employee')
        .select(['sms_employee.*', 'sms_position.name as posname', 'sms_department.name as depname'])
        .leftJoin('sms_position', 'sms_employee.position_id', 'sms_position.id')
        .leftJoin('sms_department', 'sms_employee.department_id', 'sms_department.id')
}

async function getemployeeById(id) {
    const model = await knex('sms_employee')
        .select(['sms_employee.*', 'sms_position.name as posname', 'sms_department.name as depname'])
        .leftJoin('sms_position', 'sms_employee.position_id', 'sms_position.id')
        .leftJoin('sms_department', 'sms_employee.department_id', 'sms_department.id')
        .where({'sms_employee.id': parseInt(id) });
    return model[0]
}


//Search Employee By Name

async function getemployeeByEmail(email) {
    const model = await knex('sms_employee')
        .select(['sms_employee.*', 'sms_position.name as posname', 'sms_department.name as depname'])
        .leftJoin('sms_position', 'sms_employee.position_id', 'sms_position.id')
        .leftJoin('sms_department', 'sms_employee.department_id', 'sms_department.id')
        .where({'sms_employee.email': email });
    return model[0]
}


async function addEmployee(employee) {

    return knex.transaction((trx) => {
        return knex('sms_employee')
            .insert(employee)
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
                return getemployeeById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateEmployee(id, employee) {
    return knex.transaction(async (trx) => {
        return knex('sms_employee')
            .transacting(trx)
            .update(employee)
            .where({ id: parseInt(id) })
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
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
                return getemployeeById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deleteEmployee(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_employee')
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
    getAllEmployee,
    getemployeeByEmail,
    getemployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};