const Router = require('koa-router');
const departmentQueries = require('../services/department');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/departments';

router.get(BASE, async(ctx) => {
    try{
        
        const departments = await departmentQueries.getAllDepartment();

        ctx.body = {
            status: messageConfig.status.success,
            data: departments
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
        const department = await departmentQueries.getdepartmentById(ctx.params.id);        
        ctx.body = {
            status: messageConfig.status.success,
            data: department
        };
    } catch(err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}`,async (ctx) => {
    try { 
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";      
        const department = await departmentQueries.adddepartment(ctx.request.body);    
        console.log(ctx.request.body)
        if(department && department != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: department
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
        const department = await departmentQueries.updatedepartment(ctx.params.id, ctx.request.body);
        console.log(department);
                        
        if(department && department != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: department
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
        const department = await departmentQueries.deletedepartment(ctx.params.id);
        console.log(ctx.params.id);
         
        console.log(department)
        if(department && department != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: department
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