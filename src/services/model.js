const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllModel() {
    return knex('sms_model')
        .select('*');
}

async function getmodelById(id) {
    const model = await knex('sms_model')
        .select('*')
        .where({ id: parseInt(id) });
    return model[0]
}

async function addmodel(model) {

    return knex.transaction((trx) => {
        return knex('sms_model')
            .insert(model)
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
                return getmodelById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updatemodel(id, model) {
    return knex.transaction(async (trx) => {
        return knex('sms_model')
            .transacting(trx)
            .update(model)
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
                return getmodelById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function deletemodel(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_model')
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
    getAllModel,
    getmodelById,
    addmodel,
    updatemodel,
    deletemodel
};