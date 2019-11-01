
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_complain', (t) => {
            t.increments();
            t.integer('machine_id').unsigned().notNullable();
            t.integer('department_id').unsigned().notNullable();
            t.string('complain_number').notNullable().unique();
            t.string('job_title').notNullable().unique();
            t.string('complain_job_title').notNullable().unique();
            t.foreign('machine_id').references('id').inTable('sms_machine');
            t.foreign('department_id').references('id').inTable('sms_department');
            t.integer('amount');
            t.string('customer_name').notNullable()
            t.string('customer_phone').notNullable().unique();
            t.string('prefix');
            t.string('distance');
            t.string('location')
            t.date('date');
            t.string('complain_status');
            t.text('complain_description');

            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),

        knex.schema.createTable('sms_schedule', (t) => {
            t.increments();
            t.integer('complain_id').unsigned().notNullable();
            t.string('employee_name');
            t.string('job_code').notNullable();
            t.foreign('complain_id').references('id').inTable('sms_complain').onDelete('CASCADE');
            t.string('job_status').notNullable();
            t.string('job_title').notNullable();
            t.text('job_description').notNullable();
            t.integer('s_amount');
            t.integer('service_charge');
            t.string('inspection');
            t.string('watching_list');
            t.string('schedule_status');
            t.date('sdate');
            t.date('edate');


            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
        knex.schema.createTable('sms_report', (t) => {
            t.increments();
            t.integer('schedule_id').unsigned().notNullable();
            t.foreign('schedule_id').references('id').inTable('sms_schedule').onDelete('CASCADE');
            t.date('date');
            t.string('remark').notNullable();
            t.text('description').notNullable();
            t.integer('working_hour').notNullable();

            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sms_complain'),
        knex.schema.dropTable('sms_schedule'),
    ])
};
