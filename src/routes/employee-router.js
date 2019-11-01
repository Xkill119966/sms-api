const Router = require('koa-router');
const employeeQueries = require('../services/employee');
const messageConfig = require('../config/msgConfig');
const base64ToImage = require('base64-to-image');
const router = new Router();
const BASE = '/employees';

function saveImageByBase64(base64imgurl) {
    var base64Str = base64imgurl;
    var filepath = './uploads/';
    var fileName = "emp" + new Date().getTime();
    var optionalObj = { 'fileName': fileName, 'type': 'png' };
    base64ToImage(base64Str, filepath, optionalObj);
    var imageInfo = base64ToImage(base64Str, filepath, optionalObj);
    console.log(imageInfo);

    return imageInfo.fileName;
}

router.get(BASE, async (ctx) => {
    try {
        const employees = await employeeQueries.getAllEmployee();

        ctx.body = {
            status: messageConfig.status.success,
            data: employees
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
        const employee = await employeeQueries.getemployeeById(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: employee
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}/ByEmail`, async (ctx) => {
    try {
        console.log("Request from Profile Page", ctx.request.body.email);
        const employee = await employeeQueries.getemployeeByEmail(ctx.request.body.email);
        ctx.body = {
            status: messageConfig.status.success,
            data: employee
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
    if (ctx.request.body.image != null) {
        ctx.request.body.image = saveImageByBase64(ctx.request.body.image);
    }
    try {
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        const model = await employeeQueries.addEmployee(ctx.request.body);
        if (model && model != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: model
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
    if (ctx.request.body.image != null) {
        ctx.request.body.image = saveImageByBase64(ctx.request.body.image);
    }
    try {
        ctx.request.body.created_by = "Admin";
        ctx.request.body.updated_by = "Admin";
        console.log(ctx.request.body);

        const model = await employeeQueries.updateEmployee(ctx.params.id, ctx.request.body);
        if (model && model != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: model
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
        const employee = await employeeQueries.deleteEmployee(ctx.params.id);

        if (employee && employee != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: employee
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
