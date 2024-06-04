const { checkSchema } = require("express-validator");
const { checkBodyValidation } = require("./checkBodyValidation");
const { IS_EMPTY, INVALID_EMAIL, MIN_LENGTH } = require("./validationErrors");

const validateRegisterBody = [checkSchema({
    name: { notEmpty: { errorMessage: IS_EMPTY } },
    surname: { notEmpty: { errorMessage: IS_EMPTY } },
    email: { notEmpty: { errorMessage: IS_EMPTY }, isEmail: { errorMessage: INVALID_EMAIL } },
    password: {
        notEmpty: { errorMessage: IS_EMPTY }, isLength: {
            options: { min: 8 },
            errorMessage: { code: MIN_LENGTH, length: 8 }
        }
    }
}, ['body']), checkBodyValidation];

const validateLoginBody = [checkSchema({
    email: { notEmpty: { errorMessage: IS_EMPTY }, isEmail: { errorMessage: INVALID_EMAIL } },
    password: {
        notEmpty: { errorMessage: IS_EMPTY }, isLength: {
            options: { min: 8 },
            errorMessage: { code: MIN_LENGTH, length: 8 }
        }
    }
}, ['body']), checkBodyValidation];

module.exports = {
    validateRegisterBody,
    validateLoginBody,
};