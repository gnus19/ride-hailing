const { Router } = require('express');
const { createCarValidation, patchCarValidator } = require('../utils/ridesValidations');
const { findCarsByOwner, createNewCar, findCarById, updateCarDocument, deleteCarDocument } = require('../repositories/rides');

const router = Router();

router.get('/healhty', (req, res) => {
    return res.sendStatus(200).send("Healhty");
});

router.get('/', async (req, res) => {
    const userEmail = req.email;
    try {
        const cars = await findCarsByOwner(userEmail)
        return res.status(200).json({ cars });   
    } catch (error) {
        console.log("[ERROR]: ", error)
        return res.status(500).json({ message: "Something went wrong, please try again later" });  
    }
});

router.post('/', ...createCarValidation, async (req, res) => {
    const {
        brand,
        model,
        plate,
        color,
        status,
    } = req.body;

    const userEmail = req.email;
    try {
        const value = await createNewCar({
            brand,
            model,
            plate,
            color,
            status,
            owner: userEmail
        })
        return res.status(201).json({ message: "Car saved successfully", car: value });   
    } catch (error) {
        return res.status(500).json({ message: "Something wrong happened, try again later" });
    }
})

router.patch('/:id', ...patchCarValidator, async (req, res) => {
    const {
        brand,
        model,
        plate,
        color,
        status,
    } = req.body;
    const userEmail = req.email;
    const carId = req.params.id;
    let car;
    try {
        car = await findCarById(userEmail, carId)
        if (!car) {
            return res.status(404).json({ message: "Car does not exists or is not associated to the user" });
        }
    } catch (error) {
        return res.status(404).json({ message: "Car does not exists or is not associated to the user" });
    }

    try {
        await updateCarDocument(car, {
            brand,
            model,
            plate,
            color,
            status,
        })
        return res.sendStatus(204);
    } catch (error) {
        console.log(error)
        return res.status(304).json({ message: "Something wrong happened, try again later" });
    }
});

router.get('/:id', async (req, res) => {
    const userEmail = req.email;
    const carId = req.params.id;
    let car;
    try {
        car = await findCarById(userEmail, carId);
        if (!car) {
            return res.status(401).json({ message: "Car does not exists or is not associated to the user" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Car does not exists or is not associated to the user" });
    }

    return res.status(200).json({ car });
});

router.delete('/:id', async (req, res) => {
    const userEmail = req.email;
    const carId = req.params.id;
    let car;
    try {
        car = await findCarById(userEmail, carId)
        if (!car) {
            return res.status(404).json({ message: "Car does not exists or is not associated to the user" });
        }
    } catch (error) {
        return res.status(404).json({ message: "Car does not exists or is not associated to the user" });
    }

    try {
        const result = await deleteCarDocument(car)
        console.log("[result]: ", result);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(304).json({ message: "Something wrong happened, try again later" });
    }
    
});

module.exports = router;