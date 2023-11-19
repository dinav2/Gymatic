import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    nombre: String,
    valor: Number,
})

const Sensor = mongoose.models.sensores || mongoose.model("sensores", sensorSchema);

export default Sensor;