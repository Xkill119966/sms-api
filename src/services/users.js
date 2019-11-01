const knex = require('../db/connection');
var bcrypt = require('bcryptjs');
const messageConfig = require('../config/msgConfig');

async function getAllUsers() {
    return knex('sms_usr')
        .select(['user.*', 'sms_role.name', 'sms_role.description'])
        .from('sms_usr AS user')
        .leftJoin('sms_role', 'user.role_id', 'sms_role.id')

}

async function getUserById(id) {
    const model = await knex('sms_usr')
        .select('*')
        .from('sms_usr AS user')
        .leftJoin('sms_role', 'user.role_id', 'sms_role.id')
        .where({ 'user.id': parseInt(id) });
    return model[0]
}

async function getCurrentUser(id) {
    const model = await knex('sms_usr')
        .select(['user.*', 'sms_role.name', 'sms_role.description'])
        .from('sms_usr AS user')
        .leftJoin('sms_role', 'user.role_id', 'sms_role.id')
        .where({ 'user.id': parseInt(id) });
    return model[0]
}

async function getCurrentUserWithToken(token) {
    const model = await knex('sms_usr')
        .select(['user.*', 'sms_role.name', 'sms_role.description'])
        .from('sms_usr AS user')
        .leftJoin('sms_role', 'user.role_id', 'sms_role.id')
        .where({ 'user.token': token });
    return model[0]
}

async function getUserByName(name) {
    const model = await knex('sms_usr')
        .select(['user.*', 'sms_role.name', 'sms_role.description'])
        .from('sms_usr AS user')
        .leftJoin('sms_role', 'user.role_id', 'sms_role.id')
        .where({ 'email': name })
    return model[0];
}

function addUser(user) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password_hash, salt);
    const hash1 = bcrypt.hashSync(user.password_cofirm, salt);

    user.password_hash = hash;
    user.password_cofirm = hash1;
    user.created_by = "Admin";
    user.updated_by = "Admin";
    console.log("Before Adding", user);

    return knex.transaction((trx) => {
        return knex('sms_usr')
            .insert(user)
            .transacting(trx)
            .then((response) => {
                console.log('Response is ' + JSON.stringify(response));
                if (response[0] > 0) {
                    return response[0];
                } else {
                    return 'error';
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
            console.log('Transaction object return object: ', response);
            if (response && response == 'error') {
                return 'error';
            } else {
                console.log('getUserById ', response)
                return getUserById(response);
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

async function updateUser(id, user) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password_hash, salt);
    const hash1 = bcrypt.hashSync(user.password_cofirm, salt);

    user.password_hash = hash;
    user.password_cofirm = hash1;
    user.created_by = "Admin";
    user.updated_by = "Admin";

    return knex.transaction(async (trx) => {
        return knex('sms_usr')
            .transacting(trx)
            .update(user)
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
                return getUserById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}

async function updateUserPassword(id, user) {
    const email = user.email;
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password_hash, salt);
    const hash1 = bcrypt.hashSync(user.password_cofirm, salt);

    user.password_hash = hash;
    user.password_cofirm = hash1;
    user.token = null
    return knex.transaction(async (trx) => {
        return knex('sms_usr')
            .transacting(trx)
            .update(user)
            .where({
                id: parseInt(id),
                email: email
            })
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
                return getUserById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}



async function updateToken(id, token) {

    return knex.transaction(async (trx) => {
        return knex('sms_usr')
            .transacting(trx)
            .update('sms_usr.token', token)
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
                console.log('GetUserById', response);

                return getUserById(id);
            } else {
                return 'error';
            }
        })
        .catch((err) => {
            // console.error(err);
        });
}


async function deleteUser(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_usr')
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

async function getPermissionByRole(id) {

    const module = await knex('sms_permission as sp')
        .join('sms_module as sm', 'sm.id', 'sp.module_id')
        .select(knex.raw('CONCAT(sm.controller,sm.action) as perform '))

        .where({
            'sp.role_id': parseInt(id)
        });

    return module;
}

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserByName,
    getCurrentUser,
    updateToken,
    getCurrentUserWithToken,
    updateUserPassword,
    getPermissionByRole
};