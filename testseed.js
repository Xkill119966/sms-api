var position = [
  {
    name: 'Service Man',
    description: "To Serve  Customer",
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    name: 'Account',
    description: "To Manage Organization",
    created_by: 'Admin',
    updated_by: 'Admin'
  },

];
var department = [
  {
    name: 'Tech',
    description: "To Audit",
    code: 'TEC0123',
    created_by: 'Admin',
    updated_by: 'Admin'
  },

  {
    name: 'Finance',
    description: "To Audit",
    code: 'SM0123',
    created_by: 'Admin',
    updated_by: 'Admin'
  }
];

var employee = [
  {

    image: "emp1560844541620.png",
    name: "Aung Aung",
    nric: "12/SaKaKha(V)098433",
    dob: '1997-05-29',
    code: 'EMP10934',
    position_id: 1,
    department_id: 1,
    email: "emp1@gmail.com",
    phone: "09951211111",
    prefixphone: "+09",
    parmanent_address: 'Hello',
    temporary_address: 'Heee',
    father_name: 'Mg Mg',
    mother_name: 'Aye Aye',
    education: 'Grade 11',
    social_media_link: 'www.google.com',
    created_by: 'Admin',
    updated_by: 'Admin'
  },

  {

    image: "emp1560971590599.png",
    name: "Kyaw Kyaw",
    nric: "12/DaKaNa(N)24855",
    dob: '1988-05-29',
    code: 'EMP38585',
    position_id: 1,
    department_id: 1,
    email: "emp2@gmail.com",
    phone: "0995124444",
    prefixphone: "+09",
    parmanent_address: 'Hello',
    temporary_address: 'HelloTesting',
    father_name: 'Mg Mg',
    mother_name: 'Aye Aye',
    education: 'Grade 9',
    social_media_link: 'www.google.com',
    created_by: 'Admin',
    updated_by: 'Admin'
  },

  {

    image: "emp1561043292843.png",
    name: "Mg Mg",
    nric: "12/LaKaNa(V)42224",
    dob: '1989-05-29',
    code: 'EMP24444',
    position_id: 1,
    department_id: 1,
    email: "emp3@gmail.com",
    phone: "95122222",
    prefixphone: "+09",
    parmanent_address: 'Hello',
    temporary_address: 'Heee',
    father_name: 'Mg Mg',
    mother_name: 'Aye Aye',
    education: 'Grade 5',
    social_media_link: 'www.google.com',
    created_by: 'Admin',
    updated_by: 'Admin'
  },

];

const model = [
  {
    model_number: 'MN1234',
    description: 'This is testing',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    model_number: 'MN5678',
    description: 'tes',
    created_by: 'Admin',
    updated_by: 'Admin'

  }
]

const machine = [
  {
    model_id: 1,
    fup_number: 'FUP4554',
    machine_serial_number: 34794,
    engine_serial_number: 26297,
    warranty_year: 2,
    working_hour: 40,
    warranty_description: 'testing',
    created_by: 'Admin',
    updated_by: 'Admin'
  },
  {
    model_id: 2,
    fup_number: 'FUP5678',
    machine_serial_number: 34343,
    engine_serial_number: 13414,
    warranty_description: 'testing',
    warranty_year: 2,
    working_hour: 40,
    created_by: 'Admin',
    updated_by: 'Admin'
  }
]

const complain = [
  {
    complain_number: 'CMP1234',
    job_title: 'tesing',
    complain_job_title: 'testing',
    complain_description: 'testing',
    department_id: 1,
    machine_id: 1,
    customer_name: 'Thurein',
    customer_phone: 951214444,
    prefix: '+95',
    distance: '12Miles',
    location: 'Yangon',
    date: '2019-08-29',
    complain_status: 'Accepted',
    amount: 1200,
    created_by: 'Admin',
    updated_by: 'Admin',
  },

  {
    complain_number: 'CMP1235',
    job_title: 'Testing1',
    complain_job_title: 'jasfa',
    complain_description: 'tesadfasfsting',
    department_id: 1,
    machine_id: 2,
    customer_name: 'Sandy',
    customer_phone: 975323503,
    prefix: '+95',
    distance: '12Miles',
    location: 'Mandalay',
    date: '2019-08-29',
    complain_status: 'Accepted',
    amount: 1200,
    created_by: 'Admin',
    updated_by: 'Admin',
  }
]

var schedule = [
  {
    complain_id: 1,
    employee_name: "Thurein,Hello",
    job_code: 'JD132',
    job_status: 'accept',
    job_title: 'service',
    job_description: 'Blah',
    s_amount: 1300,
    service_charge: 2400,
    inspection: 'yes',
    watching_list: 'no',
    schedule_status: 'Assign',
    sdate: '2019-08-29',
    edate: '2019-08-29',
    created_by: 'Admin',
    updated_by: 'Admin'
  }
];


exports.seed = function (knex, Promise) {
  return knex('sms_position').del()
    .then(() => {
      return knex('sms_department').del();
    })
    .then(() => {
      return knex('sms_employee').del();
    })
    .then(() => {
      return knex('sms_model').del();
    })
    .then(() => {
      return knex('sms_machine').del();
    })
    .then(() => {
      return knex('sms_complain').del();
    })

    .then(() => {
      return knex('sms_schedule').del();
    })

    .then(() => {
      return knex('sms_position').insert(position);
    })
    .then(() => {
      return knex('sms_department').insert(department);
    })
    .then(() => {
      return knex('sms_employee').insert(employee);
    })
    .then(() => {
      return knex('sms_model').insert(model);
    })
    .then(() => {
      return knex('sms_machine').insert(machine);
    })
    .then(() => {
      return knex('sms_complain').insert(complain);
    })

    .then(() => {
      return knex('sms_schedule').insert(schedule);
    })
};

