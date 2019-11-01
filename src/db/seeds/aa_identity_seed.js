const bcrypt = require('bcryptjs');

var users = [
  {
    id: 1,
    user_name: 'default-super-admin',
    email: 'dev.thureinhtun@ucsy.edu.mm',
    email_confirmed: false,
    password_hash: bcrypt.hashSync('test'),
    password_cofirm: bcrypt.hashSync('test'),
    phone_no: '09788885091',
    nric: '12/LAKA(N)1234',
    emp_code: 'EMP1',
    role_id: 1,
    phone_no_confirmed: false,
    two_factor_enabled: false,
    created_by: 'default-super-admin',
    updated_by: 'default-super-admin'
  },

];

var roles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Super Admin Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
  {
    id: 2,
    name: 'Service Man',
    description: 'Admin Role',
    created_by: 'super-admin',
    updated_by: 'super-admin'
  },
];



exports.seed = function (knex, Promise) {

  return knex('sms_usr').del()
    .then(() => {
      return knex('sms_role').del();
    })
    .then(() => {
      return knex('sms_role').insert(roles);
    })
    .then(() => {
      return knex('sms_usr').insert(users);
    })
};
