const Router = require('koa-router');
const ModuleQueries = require('../services/module');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/modules';

router.get(BASE, async (ctx) => {
    try {

        const Modules = await ModuleQueries.getAllModule();

        ctx.body = {
            status: messageConfig.status.success,
            data: Modules
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, async (ctx) => {
    try {
        const Module = await ModuleQueries.getModuleById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: Module
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});



router.post(`${BASE}`, async (ctx) => {
    try {
        console.log(ctx.request.body);
        
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const Module = await ModuleQueries.addModule(ctx.request.body);
        console.log("Module",Module);
        
        if (Module && Module != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: Module
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.internalError
            };
        }
    } catch (err) {
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
        const Module = await ModuleQueries.updateModule(ctx.params.id, ctx.request.body);
        console.log(Module);

        if (Module && Module != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: Module
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
        const Module = await ModuleQueries.deleteModule(ctx.params.id);
        console.log(ctx.params.id);

        console.log(Module)
        if (Module && Module != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: Module
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