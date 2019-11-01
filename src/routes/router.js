const Router = require('koa-router');

// import router files
const indexRoutes = require('./index');
const userRoutes = require('./user-router');
const authRoutes = require('./auth-router');
const positonRoutes = require('./position-router');
const employeeRoutes = require('./employee-router');
const departmentRouter = require('./department-router');
const modelRouter = require('./model-router');
const machineRouter = require('./machine-router');
const complainRouter = require('./complain-router');
const scheduleRouter = require('./schedule-router');
const jobRouter = require ('./job-router');
const reportRouter = require('./report-router');
const roleRouter = require('./role-router');
const moduleRouter = require('./module-router')
const router = new Router({ prefix: '/api/v1'});

// use router files
router.use(indexRoutes.routes(), router.allowedMethods());
router.use(userRoutes.routes(), router.allowedMethods());
router.use(authRoutes.routes(), router.allowedMethods());
router.use(positonRoutes.routes(), router.allowedMethods());
router.use(employeeRoutes.routes(), router.allowedMethods());
router.use(departmentRouter.routes(), router.allowedMethods())
router.use(modelRouter.routes(), router.allowedMethods())
router.use(machineRouter.routes(), router.allowedMethods())
router.use(complainRouter.routes(), router.allowedMethods())
router.use(scheduleRouter.routes(), router.allowedMethods())
router.use(jobRouter.routes(), router.allowedMethods())
router.use(reportRouter.routes(), router.allowedMethods())
router.use(roleRouter.routes(), router.allowedMethods())
router.use(moduleRouter.routes(), router.allowedMethods())

module.exports = router;