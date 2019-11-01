const Router = require('koa-router');
const userQueries = require('../services/users');
const messageConfig = require('../config/msgConfig');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('../middlewares/jwt');
const nodemailer = require('nodemailer')
const { resetPass } = require("../services/mail/resetpass_template");
const router = new Router();
const BASE = '/users';
const secret = process.env.JWT_SECRET || 'jwt_secret';

router.get(BASE, jwt, async (ctx) => {
    try {
        //console.log('I am here....');
        const users = await userQueries.getAllUsers();
        //console.log('Testing:' . JSON.stringify(users));

        ctx.body = {
            status: messageConfig.status.success,
            data: users
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/:id`, jwt, async (ctx) => {
    try {
        console.log(ctx.params.id);

        const user = await userQueries.getCurrentUser(ctx.params.id);
        console.log(user);

        if (user) {
            ctx.body = {
                status: messageConfig.status.success,
                data: user
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
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

router.post(`${BASE}`, jwt, async (ctx) => {
    try {
        const user = await userQueries.addUser(ctx.request.body);
        // console.log('Date received from router class: ' + JSON.stringify(user));           
        if (user && user != 'error') {
            ctx.status = 201;
            ctx.body = {
                status: messageConfig.status.success,
                data: user
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
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

router.put(`${BASE}/:id`, jwt, async (ctx) => {
    try {
        const user = await userQueries.updateUser(ctx.params.id, ctx.request.body);
        if (user && user != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user
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

router.delete(`${BASE}/:id`, jwt, async (ctx) => {
    try {
        const user = await userQueries.deleteUser(ctx.params.id);
        if (user && user != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user
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

router.get(`${BASE}/getPermission/:id` ,async (ctx) => {
    try {
        const user = await userQueries.getPermissionByRole(ctx.params.id);
        ctx.body = {
            status: messageConfig.status.success,
            data: user
        };
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.post(`${BASE}/resetuser`, async (ctx) => {
    try {
        console.log("hELLO", ctx.request.body);

        let user = await userQueries.getUserByName(ctx.request.body.email);
        if (!user) {
            console.log('User is not found!');
            ctx.status = 401;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.invalidUser,
                data: user
            };
        } else if (user) {


            const token = jsonwebtoken.sign({
                data: { id: user.id },
                exp: Math.floor(Date.now() / 1000) + (60 * 60)
            }, secret);


            const userUpdate = userQueries.updateToken(user.id, token);
            userUpdate.then(res => {

                if (res) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'testirrahubintern2019@gmail.com',
                            pass: '',
                        },
                    });

                    const mailOptions = {
                        from: 'testing@gmail.com',
                        to: `${res.email}`,
                        subject: 'Link To Reset Password',
                        html: resetPass(res.token)
                    };

                    console.log('sending mail');

                    transporter.sendMail(mailOptions, (err, response) => {
                        if (err) {
                            console.error('there was an error: ', err);
                        } else {
                            console.log('here is the res: ', response);
                            ctx.body = {
                                status: messageConfig.status.success,

                            };
                        }
                    });

                }


            }).catch(err => {
                console.log(err);

            });

            ctx.body = {
                status: messageConfig.status.success,
            };



        }

    } catch (err) {
        console.log(err.message);
        ctx.status = 400;
        ctx.body = {
            status: messageConfig.status.error,
            message: err.message || messageConfig.message.error.internalError
        };
    }
});

router.get(`${BASE}/reset/:token`, async (ctx) => {
    try {
        console.log("Hello", ctx.params.token);

        const user = await userQueries.getCurrentUserWithToken(ctx.params.token);
        console.log(user);

        if (user) {
            ctx.body = {
                status: messageConfig.status.success,
                data: user
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: messageConfig.status.error,
                message: messageConfig.message.error.fileNotFound
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

router.put(`${BASE}/updatePasswordWithEmail/:id`, async (ctx) => {
    try {
        console.log("Hello",ctx.request.body);
        
        const user = await userQueries.updateUserPassword(ctx.params.id, ctx.request.body);
        if (user && user != 'error') {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user
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
