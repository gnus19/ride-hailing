const { Schema, model } = require("mongoose");

const carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["ACTIVE", "MAINTENANCE", "ON_SERVICE"],
        default: "ACTIVE"
    },
    owner: {
        type: String,
        required: true
    }
});

const Car = model("Car", carSchema);

module.exports = Car;