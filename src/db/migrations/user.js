
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sms_usr', (t) => {
      t.increments();
      t.integer('role_id').unsigned().notNullable();
      t.string('user_name').notNullable();
      t.string('email').notNullable().unique();
      t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
      t.longtext('password_hash').notNullable();
      t.longtext('password_cofirm').notNullable();
      t.string('phone_no').notNullable().unique();
      t.string('nric').notNullable().unique();
      t.string('token').defaultTo(null);
      t.string('emp_code');
      t.boolean('email_confirmed').defaultTo(false);
      t.boolean('phone_no_confirmed').defaultTo(false);
      t.boolean('two_factor_enabled').defaultTo(false);
      t.datetime('lock_out_end');
      t.boolean('lock_out_enabled').defaultTo(false);
      t.integer('access_failed_count').defaultTo(0);
      // Table Default Fields
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.string('created_by').notNullable();
      t.timestamp('updated_at').defaultTo(knex.fn.now());
      t.string('updated_by').notNullable();
      t.integer('version_no').defaultTo(1);
      t.string('status');
      t.decimal('sort_order_no').defaultTo(0);
    }),
    knex.schema.createTable('sms_role', (t) => {
      t.increments();
      t.string('name').notNullable().unique();
      t.string('description');

      // Table Default Fields
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.string('created_by').notNullable();
      t.timestamp('updated_at').defaultTo(knex.fn.now());
      t.string('updated_by').notNullable();
      t.integer('version_no').defaultTo(1);
      t.boolean('status').defaultTo(true);
      t.decimal('sort_order_no').defaultTo(0);
    }),
    knex.schema.createTable('sms_module', (t) => {
      t.increments();
      t.integer('role_id').unsigned().notNullable();
      t.string('controller').notNullable()
      t.string('action').notNullable()
      t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;

      // Table Default Fields
      t.timestamp('created_at').defaultTo(knex.fn.now());
      t.string('created_by').notNullable();
      t.timestamp('updated_at').defaultTo(knex.fn.now());
      t.string('updated_by').notNullable();
      t.integer('version_no').defaultTo(1);
      t.boolean('status').defaultTo(true);
      t.decimal('sort_order_no').defaultTo(0);
    }),
    // knex.schema.createTable('sms_prm', (t) => {
    //   t.increments();
    //   t.string('name').notNullable().unique();          
    //   t.text('description');

    //   // Table Default Fields
    //   t.timestamp('created_at').defaultTo(knex.fn.now());      
    //   t.string('created_by').notNullable();
    //   t.timestamp('updated_at').defaultTo(knex.fn.now());
    //   t.string('updated_by').notNullable();
    //   t.integer('version_no').defaultTo(1);
    //   t.boolean('status').defaultTo(true);
    //   t.decimal('sort_order_no').defaultTo(0);      
    // }),
    // knex.schema.createTable('sms_usr_role', (t) => {
    //   t.increments();
    //   t.integer('user_id').unsigned().notNullable();
    //   t.integer('role_id').unsigned().notNullable();

    //   t.foreign('user_id').references('id').inTable('sms_usr').onDelete('CASCADE');;
    //   t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
    // }),
   
    knex.schema.createTable('sms_permission', (t) => {
      t.increments();
      t.integer('module_id').unsigned().notNullable();
      t.integer('role_id').unsigned().notNullable();

      t.foreign('module_id').references('id').inTable('sms_module').onDelete('CASCADE');;
      t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
    }),


    // knex.schema.createTable('sms_role_prm', (t) => {
    //   t.increments();
    //   t.integer('permission_id').unsigned().notNullable();
    //   t.integer('role_id').unsigned().notNullable();

    //   t.foreign('permission_id').references('id').inTable('sms_prm').onDelete('CASCADE');;
    //   t.foreign('role_id').references('id').inTable('sms_role').onDelete('CASCADE');;
    // }),
    // knex.schema.createTable('sms_prm_mdul', (t) => {
    //   t.increments();
    //   t.integer('permission_id').unsigned().notNullable();
    //   t.integer('module_id').unsigned().notNullable();

    //   t.foreign('permission_id').references('id').inTable('sms_prm').onDelete('CASCADE');;
    //   t.foreign('module_id').references('id').inTable('sms_mdul').onDelete('CASCADE');;
    // })

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    // knex.schema.dropTable('sms_role_prm'),
    // knex.schema.dropTable('sms_prm_mdul'),
    knex.schema.dropTable('sms_usr'),
    knex.schema.dropTable('sms_role'),
    knex.schema.dropTable('sms_module'),
    knex.schema.dropTable('sms_permission'),

  ]);
};
