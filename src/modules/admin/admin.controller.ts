import { Request, Response } from 'express';
import adminService from "./admin.service";
import jwt from '../../utils/jwt';

class AdminController {

    async loginAdmin(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const admin = await adminService.login(username, password);

            if (!admin) {
                throw new Error('Username or password is wrong')
            }
            res.status(200).json({
                status: 200,
                message: 'success',
                access_token: jwt.sign({ adminId: admin.admin_id }),
            })
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }
}

export default AdminController