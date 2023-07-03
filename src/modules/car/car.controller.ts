import { Request, Response } from 'express';
import carService from './car.service';
import fs from 'fs';
import path from 'path';

class CarController {

    async getAllCars(req: Request, res: Response): Promise<void> {

        try {
            const cars = await carService.getAllCars();
            let { car_name, page = 1, limit = 10 } = req.query;

            interface carQuery {
                car_id: number,
                car_name: string,
                car_color: string,
                car_img: string,
                car_desc: string,
                car_year: Date,
                car_cost: number,
                company_id: number
            }
            const filteredCars = await cars.filter((c: carQuery) => {
                const byCarName = car_name ? c.car_name.toLowerCase().includes((car_name as string).toLowerCase()) : true;
                return byCarName
            }).slice(((page as number) - 1) * (limit as number), (page as number) * (limit as number))
            if (filteredCars.length > 0) {
                res.send(filteredCars)
            } else {
                res.send('car does not exist')
            }
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async getSingleCar(req: Request, res: Response): Promise<void> {
        try {
            const { carId } = req.params;
            const car = await carService.getSingleCar(+carId);
            if (car.length <= 0) {
                throw new Error('car does not exist')
            }
            res.send(car)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async createCar(req: Request, res: Response): Promise<void> {
        try {
            const { car_name, car_color, car_desc, car_year, car_cost, company_id } = req.body;
            const car_img = req.file?.filename;
            const car = await carService.createCar(car_name, car_color, car_img as string, car_desc, car_year, +car_cost, +company_id);
            if (!car) {
                throw new Error('car is not valid')
            }
            res.send(car)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async updateCar(req: Request, res: Response): Promise<void> {
        try {
            const { carId } = req.params;
            const { car_name, car_color, car_desc, car_year, car_cost, company_id } = req.body;
            const car_img = req.file?.filename;
            const cars = await carService.getAllCars();
            interface carQuery {
                car_id: 2,
                car_name: string,
                car_color: string,
                car_img: string,
                car_desc: string,
                car_year: Date,
                car_cost: number,
                company_id: number
            }
            const foundCar = cars.find((c: carQuery) => c.car_id == +carId)

            const car = await carService.updateCar(+carId, car_name, car_color, car_img as string, car_desc, car_year, car_cost, company_id);
            if (car.length <= 0) {
                throw new Error('car does not exist')
            }
            fs.unlinkSync(path.resolve('uploads', foundCar.car_img))

            res.send(car)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }

    async deleteCar(req: Request, res: Response): Promise<void> {
        try {
            const { carId } = req.params;
            const cars = await carService.getAllCars();
            interface carQuery {
                car_id: 2,
                car_name: string,
                car_color: string,
                car_img: string,
                car_desc: string,
                car_year: Date,
                car_cost: number,
                company_id: number
            }
            const foundCar = cars.find((c: carQuery) => c.car_id == +carId)

            const car = await carService.deleteCar(+carId);
            if (car.length <= 0) {
                throw new Error('car does not exist')
            }
            fs.unlinkSync(path.resolve('uploads', foundCar.car_img))
            res.send(car)
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    }
}

export default CarController;