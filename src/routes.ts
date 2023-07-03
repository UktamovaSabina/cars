import { Router } from "express";
import AdminRouter from './modules/admin/admin.router';
import CompanyRouter from './modules/company/company.router';
import CarRouter from './modules/car/car.router';

const router = Router();

const adminRouter = new AdminRouter()
const companyRouter = new CompanyRouter()
const carRouter = new CarRouter()

router.use('/', adminRouter.router)
router.use('/', companyRouter.router)
router.use('/', carRouter.router)

export default router;