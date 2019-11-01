const Router = require('koa-router');
const complainQueries = require('../services/complain');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/complains';

router.get(BASE, async (ctx) => {
    try {

        const complains = await complainQueries.getAllComplain();

        ctx.body = {
            status: messageConfig.status.success,
            data: complains
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
        const complain = await complainQueries.getcomplainById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: complain
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
        console.log("Body",ctx.request.body);
        

        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        ctx.request.body.complain_status = "Accept";
        const complain = await complainQueries.addcomplain(ctx.request.body);
        console.log(ctx.request.body)
        if (complain && complain != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: complain
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
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const complain = await complainQueries.updatecomplain(ctx.params.id, ctx.request.body);
        if (complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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

router.put(`${BASE}/reject/:id`, async (ctx) => {
    try {
        console.log(ctx.request.body);
        
        const complain = await complainQueries.rejectComplain(ctx.params.id, ctx.request.body);
        if (complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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
        const complain = await complainQueries.deletecomplain(ctx.params.id);
        console.log(ctx.params.id);

        console.log(complain)
        if (complain && complain != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: complain
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