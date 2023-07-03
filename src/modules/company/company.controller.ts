import { Request, Response } from 'express';
import companyService from './company.service';
import fs from 'fs';
import path from 'path'

class CompanyController {

    async getAllCompany(req: Request, res: Response): Promise<void> {

        try {
            const companies = await companyService.getAllCompany();
            let { company_name, page = 1, limit = 10 } = req.query;

            interface companyQuery {
                company_id: number,
                company_name: string,
                company_img: string
            }
            const filteredCompany = await companies.filter((c: companyQuery) => {
                const byCompanyName = company_name ? c.company_name.toLowerCase().includes((company_name as string).toLowerCase()) : true;
                return byCompanyName
            }).slice(((page as number) - 1) * (limit as number), (page as number) * (limit as number))
            if (filteredCompany.length > 0) {
                res.send(filteredCompany)
            } else {
                throw new Error('company does not exist')
            }
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async getSingleCompany(req: Request, res: Response): Promise<void> {
        try {
            const { companyId } = req.params;
            const company = await companyService.getSingleCompany(+companyId);
            if (company.length <= 0) {
                throw new Error('company does not exist')
            }
            res.send(company)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async createCompany(req: Request, res: Response): Promise<void> {
        try {
            const { company_name } = req.body;
            const company_img = req.file?.filename;
            const company = await companyService.createCompany(company_name, company_img as string);
            if (!company) {
                throw new Error('company is not valid')
            }

            res.send(company)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async updateCompany(req: Request, res: Response): Promise<void> {
        try {
            const { companyId } = req.params;
            const { company_name } = req.body;
            const company_img = req.file?.filename;
            const companies = await companyService.getAllCompany();
            interface companyQuery {
                company_id: number,
                company_name: string,
                company_img: string
            }
            const foundCompany = companies.find((c: companyQuery) => c.company_id == +companyId)
            const company = await companyService.updateCompany(+companyId, company_name, company_img as string);
            if (company.length <= 0) {
                throw new Error('company does not exist')
            }
            fs.unlinkSync(path.resolve('uploads', foundCompany.company_img))
            res.send(company)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async deleteCompany(req: Request, res: Response): Promise<void> {
        try {
            const { companyId } = req.params;
            const companies = await companyService.getAllCompany();
            interface companyQuery {
                company_id: number,
                company_name: string,
                company_img: string
            }
            const foundCompany = companies.find((c: companyQuery) => c.company_id == +companyId)

            const company = await companyService.deleteCompany(+companyId);
            if (company.length <= 0) {
                throw new Error('company does not exist')
            }
            fs.unlinkSync(path.resolve('uploads', foundCompany.company_img))
            res.send(company)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }
}

export default CompanyController;