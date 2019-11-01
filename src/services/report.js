const knex = require('../db/connection');
const messageConfig = require('../config/msgConfig');

function getAllReport() {
    return knex('sms_report')
    .select(['sms_report.*','sms_machine.fup_number','sms_schedule.job_code'])
    .leftJoin('sms_schedule', 'sms_report.schedule_id', 'sms_schedule.id')
    .leftJoin('sms_complain', 'sms_schedule.complain_id', 'sms_complain.id')
    .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id');
}

async function getReportById(id) {
    const model = await knex('sms_report')
    .select('*')
    .where({ 'sms_report.schedule_id': parseInt(id) });
    return model[0]
}
async function getReportByD(date) {
     const model = await knex('sms_report')
     .select(['sms_report.*','sms_machine.fup_number','sms_schedule.job_code'])
     .leftJoin('sms_schedule', 'sms_report.schedule_id', 'sms_schedule.id')
     .leftJoin('sms_complain', 'sms_schedule.complain_id', 'sms_complain.id')
     .leftJoin('sms_machine', 'sms_complain.machine_id', 'sms_machine.id')
     .where({ 'sms_report.date': date });
     return model[0]
 }
async function addReport(report) {

    return knex.transaction((trx) => {
        return knex('sms_report')
        .insert(report)
        .transacting(trx)
        .then((response) => {
            console.log('Response is ' + JSON.stringify(response));
            if(response[0] > 0) {
                return response[0];
            } else {
                throw('error');
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
        if(response && response == 'error') {
            return 'error';
        } else {
            return getReportById(response);
        }
    })  
    .catch((err) => {
        console.error(err);
    });    
}

async function updateReport(id, report) {
    return knex.transaction(async (trx) => {
        return knex('sms_report')
        .transacting(trx)
        .update(report)
        .where({ id: parseInt(id) })  
        .then((response) => {
            // console.log('Response is ' + JSON.stringify(response)); 
            if(response > 0) {
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
        if(response && response == 'success') {
            return getReportById(id);
        } else {
            return 'error';
        }
    })   
    .catch((err) => {
        // console.error(err);
    });
}

async function deleteReport(id) {
    return knex.transaction(async (trx) => {
        return knex('sms_report')
        .transacting(trx)
        .del()
        .where({ id: parseInt(id) })
        .then((response) => {
            if(response) {
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
        if(response && response == 'success') {
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
    getAllReport,
    getReportById,
    addReport,
    updateReport,
    deleteReport,
    getReportByD
};