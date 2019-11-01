const Router = require('koa-router');
const jobQueries = require('../services/job');
const messageConfig = require('../config/msgConfig');

const router = new Router();
const BASE = '/job';

router.get(BASE, async (ctx) => {
    try {

        const positions = await jobQueries.getAllJob();

        ctx.body = {
            status: messageConfig.status.success,
            data: positions
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
        const position = await jobQueries.getJobById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: position
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

// router.post(`${BASE}`, async (ctx) => {
//     try {

//         ctx.request.body.created_by = "Admin";
//         ctx.request.body.updated_by = "Admin";
//         ctx.request.body.position_status = "Assign";
//         const position = await positionQueries.addposition(ctx.request.body);
//         console.log(ctx.request.body)
//         if (position && position != 'error') {
//             ctx.status = 201;
//             ctx.body = {
//                 status: messageConfig.status.success,
//                 data: position
//             };
//         } else {
//             ctx.status = 404;
//             ctx.body = {
//                 status: messageConfig.status.error,
//                 message: messageConfig.message.error.internalError
//             };
//         }
//     } catch (err) {
//         ctx.status = 400;
//         ctx.body = {
//             status: messageConfig.status.error,
//             message: err.message || messageConfig.message.error.internalError
//         };
//     }
// });

router.put(`${BASE}/jobstart`, async (ctx) => {
    try {
        console.log(ctx.params.id);
        const position = await jobQueries.updateJob(ctx.params.id, ctx.request.body);
        console.log(position);

        if (position && position != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: position
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

// router.delete(`${BASE}/:id`, async (ctx) => {

//     try {
//         const position = await positionQueries.deleteposition(ctx.params.id);
//         console.log(ctx.params.id);

//         console.log(position)
//         if (position && position != 'error') {
//             ctx.status = 200;
//             ctx.body = {
//                 status: 'success',
//                 data: position
//             };
//         } else {
//             ctx.status = 404;
//             ctx.body = {
//                 status: messageConfig.status.error,
//                 message: messageConfig.message.error.fileNotFound
//             };
//         }
//     } catch (err) {
//         // console.log('Router Exception Error .... : ' + err);        
//         ctx.status = 400;
//         ctx.body = {
//             status: messageConfig.status.error,
//             message: err.message || messageConfig.message.error.internalError
//         };
//     }
// });

module.exports = router;