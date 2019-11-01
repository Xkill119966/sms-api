const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllModule() {
    return knex('sms_module')
        .select('*');
}

async function getModuleById(id) {
    const model = await knex('sms_module')
        .select('*')
        .where({ id: parseInt(id) });
    return model[0]
}



async function addModule(usermodule) {

    return knex.transaction((trx) => {
        return knex('sms_module')
            .insert(usermodule)
            .transacting(trx)
            .then((response) => {

                return knex('sms_permission')
                    .transacting(trx)
                    .insert({ role_id: usermodule.role_id, module_id: response })
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
            console.log('Transaction object return object: ', response );
            if (response && response == 'error') {
                return 'error';
            } else {
                return getModuleById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}


async function updateModule(id, module) {
    return knex.transaction(async (trx) => {
        return knex('sms_module')
            .transacting(trx)
            .update(module)
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
                return getmoduleById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deleteModule(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_module')
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
    getAllModule,
    getModuleById,
    addModule,
    updateModule,
    deleteModule,
    
};