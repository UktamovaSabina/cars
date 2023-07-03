import { Router } from "express";
import CarController from "./car.controller";
import CheckTokenMiddleware from "../../middlewares/checkTokenMiddleware";
import upload from "../../middlewares/multerMiddleware";

const checkToken = new CheckTokenMiddleware()

class CarRouter {
    public router = Router();
    private carController = new CarController();
    constructor(){
        this.Routers()
    }
    Routers(){
        this.router.get('/cars', this.carController.getAllCars);
        this.router.get('/cars/:carId', this.carController.getSingleCar);
        this.router.post('/cars', checkToken.checkToken, upload.single('car_img'), this.carController.createCar)
        this.router.put('/cars/:carId', checkToken.checkToken,upload.single('car_img'), this.carController.updateCar);
        this.router.delete('/cars/:carId', checkToken.checkToken, this.carController.deleteCar);
    }
}

export default CarRouter;