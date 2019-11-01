const Router = require('koa-router');
const reportQueries = require('../services/report');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/reports';

router.get(BASE, async(ctx) => {
    try{
        
        const reports = await reportQueries.getAllReport();

        ctx.body = {
            status: messageConfig.status.success,
            data: reports
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, async (ctx) => {
    try {        
        const report = await reportQueries.getReportById(ctx.params.id);        
        ctx.body = {
            status: messageConfig.status.success,
            data: report
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});
 router.get(`${BASE}/:date`, async (ctx) => {
     try {        
         const report = await reportQueries.getReportByD(ctx.params.date);        
         ctx.body = {
             status: messageConfig.status.success,
             data: report
        };
     } catch(err) {
         ctx.status = 400;
         ctx.body = {
            
         };
     }
 });

router.post(`${BASE}`,async (ctx) => {
    try { 
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";      
        const report = await reportQueries.addReport(ctx.request.body);    
        console.log(ctx.request.body)
        if(report && report != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: report
            };
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch(err) {        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.put(`${BASE}/:id`, async (ctx) => {
    try {
        console.log(ctx.params.id);
        
        console.log(ctx.request.body);
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";    
        const report = await reportQueries.updateReport(ctx.params.id, ctx.request.body);
        console.log(report);
                        
        if(report && report != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: report
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch (err) {
        // console.log('Router Exception Error .... : ' + err);        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.delete(`${BASE}/:id`, async (ctx) => {
   
    try {        
        const report = await reportQueries.deleteReport(ctx.params.id);
        console.log(ctx.params.id);
         
        console.log(report)
        if(report && report != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: report
            };            
        } else {            
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
            };
        }
    } catch (err) {
        // console.log('Router Exception Error .... : ' + err);        
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

module.exports = router;