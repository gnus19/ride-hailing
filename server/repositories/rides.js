const { Document } = require('mongoose');
const Car = require('../models/car');

/**
 * Gets the cars own by `owner`
 * @param {string} owner email of the user
 * @returns list of cars own by the `owner`
 */
const findCarsByOwner = async (owner) => {
    const userCars = Car.find({ owner});
    return await userCars.exec();
}

/**
 * Creates a new Car with owner `owner` and saves it in DB
 * @param {{ brand: string, model: string, plate: string, color: string, status: string, owner: string }} car car's info
 * @returns car's info plus the id
 */
const createNewCar = async (car) => {
    const newCar = new Car(car);
    const addedCar = await newCar.save();
    return addedCar.toObject({
        transform: (doc, ret, options) => {
            delete ret.__v
            delete ret.owner
            return ret
        }
    })
}

/**
 * Search car by id
 * @param {string} email owner's email
 * @param {*} id car's id
 * @returns car's info
 */
const findCarById = async (email, id) => {
    return await Car.findOne({ owner: email, _id: id }).exec();
}

/**
 * Updates the car document values
 * @param {Document} car car's MongoDB Document
 * @param {{ brand: string, model: string, plate: string, color: string, status: string, owner: string }} updatedCar car's updated info
 */
const updateCarDocument = async (car, {brand, model, plate, color, status}) => {
    car.brand = brand || car.brand,
    car.model = model || car.model,
    car.plate = plate || car.plate,
    car.color = color || car.color,
    car.status = status || car.status
    await car.save();
}

/**
 * Deletes `car` document
 * @param {Document} car Car's MongoDB document
 */
const deleteCarDocument = async (car) => {
    return await car.deleteOne().exec();
}

module.exports = {
    findCarsByOwner,
    createNewCar,
    findCarById,
    updateCarDocument,
    deleteCarDocument,
}