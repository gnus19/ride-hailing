const { checkSchema } = require("express-validator");
const { checkBodyValidation } = require("./checkBodyValidation");
const { IS_EMPTY, INVALID_CAR_STATUS } = require("./validationErrors");

const createCarValidation = [
    checkSchema({
        brand: { notEmpty: { errorMessage: IS_EMPTY } },
        model: { notEmpty: { errorMessage: IS_EMPTY } },
        plate: { notEmpty: { errorMessage: IS_EMPTY } },
        color: { notEmpty: { errorMessage: IS_EMPTY } },
        status: { notEmpty: { errorMessage: IS_EMPTY }, isIn: { errorMessage: INVALID_CAR_STATUS, options: [["ACTIVE", "MAINTENANCE", "ON_SERVICE"]] } },
    }),
    checkBodyValidation,
];

const patchCarValidator = [
    checkSchema({
        brand: { optional: true },
        model: { optional: true },
        plate: { optional: true },
        color: { optional: true },
        status: { optional: true, isIn: { errorMessage: INVALID_CAR_STATUS, options: [["ACTIVE", "MAINTENANCE", "ON_SERVICE"]] } },
    }),
    checkBodyValidation,
]

module.exports = {
    createCarValidation,
    patchCarValidator
};