import { Router } from "express";
import CompanyController from "./company.controller";
import CheckTokenMiddleware from "../../middlewares/checkTokenMiddleware";
import upload from '../../middlewares/multerMiddleware';

const checkToken = new CheckTokenMiddleware();


class CompanyRouter {
    public router = Router();
    private companyController = new CompanyController();

    constructor(){
        this.Routers()
    }

    Routers(){
        this.router.get('/company', this.companyController.getAllCompany);
        this.router.get('/company/:companyId', this.companyController.getSingleCompany);
        this.router.post('/company', checkToken.checkToken, upload.single('company_img'), this.companyController.createCompany);
        this.router.put('/company/:companyId', checkToken.checkToken, upload.single('company_img'), this.companyController.updateCompany);
        this.router.delete('/company/:companyId', checkToken.checkToken, this.companyController.deleteCompany);
    }
}

export default CompanyRouter;