const Router = require('koa-router');
const machineQueries = require('../services/machine');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/machines';

router.get(BASE, async (ctx) => {
    try {

        const machines = await machineQueries.getAllMachine();

        ctx.body = {
            status: messageConfig.status.success,
            data: machines
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
        const machine = await machineQueries.getmachineById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: machine
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
        const machine = await machineQueries.addmachine(ctx.request.body);
        console.log(ctx.request.body)
        if (machine && machine != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: machine
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
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const machine = await machineQueries.updatemachine(ctx.params.id, ctx.request.body);
        console.log(machine);

        if (machine && machine != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: machine
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
        const machine = await machineQueries.deletemachine(ctx.params.id);
        console.log(ctx.params.id);

        console.log(machine)
        if (machine && machine != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: machine
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