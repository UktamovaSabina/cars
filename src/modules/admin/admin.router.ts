import { Router } from "express";
import AdminController from "./admin.controller";

class adminRouter {
    public router = Router();
    private adminController = new AdminController();

    constructor() {
        this.Routers();
    }

    public Routers() {
        this.router.post('/admins?', this.adminController.loginAdmin);
    }
}
export default adminRouter;