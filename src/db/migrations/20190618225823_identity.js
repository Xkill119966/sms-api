
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('sms_position', (t) => {
            t.increments();
            t.string('name').notNullable().unique();
            t.text('description');

            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
        knex.schema.createTable('sms_department', (t) => {
            t.increments();
            t.string('name').notNullable().unique();
            t.text('description');
            t.string('code').notNullable().unique();
            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
        knex.schema.createTable('sms_employee', (t) => {
            t.increments();
            t.integer('position_id').unsigned().notNullable();
            t.integer('department_id').unsigned().notNullable();
            // t.integer('schedule_id').unsigned();
            t.string('image').notNullable();
            t.string('name').notNullable().unique();
            t.string('nric').notNullable().unique();
            t.date('dob').notNullable();
            t.string('code').notNullable().unique();
            t.foreign('position_id').references('id').inTable('sms_position');
            t.foreign('department_id').references('id').inTable('sms_department');
            // t.foreign('schedule_id').references('id').inTable('sms_schedule').onDelete('CASCADE');

            t.timestamp('start_date').defaultTo(knex.fn.now());
            t.string('email').notNullable().unique();
            t.string('phone');
            t.string('prefixphone');
            t.string('parmanent_address').notNullable();
            t.string('temporary_address').notNullable();
            t.string('father_name').notNullable();
            t.string('mother_name').notNullable();
            t.string('education').notNullable();
            t.string('social_media_link').notNullable();
            t.integer('schedule_id').defaultTo(null);

            // Table Default Fields
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),

        knex.schema.createTable('sms_model', (t) => {
            t.increments();
            t.string('model_number').notNullable().unique();
            t.string('description').notNullable();
            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
        knex.schema.createTable('sms_machine', (t) => {
            t.increments();
            t.integer('model_id').unsigned().notNullable();
            t.string('fup_number').notNullable();
            t.string('machine_serial_number').notNullable();
            t.string('engine_serial_number').notNullable();
            t.integer('warranty_year').notNullable();
            t.foreign('model_id').references('id').inTable('sms_model');
            t.integer('working_hour').notNullable();
            t.string('warranty_description').notNullable();


            // Table Default Fields
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.string('created_by').notNullable();
            t.timestamp('updated_at').defaultTo(knex.fn.now());
            t.string('updated_by').notNullable();
            t.integer('version_no').defaultTo(1);
            t.boolean('status').defaultTo(true);
            t.decimal('sort_order_no').defaultTo(0);
        }),
    ])

};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('sms_position'),
        knex.schema.dropTable('sms_department'),
        knex.schema.dropTable('sms_employee'),
        knex.schema.dropTable('sms_model'),
        knex.schema.dropTable('sms_machine')


    ])
};
