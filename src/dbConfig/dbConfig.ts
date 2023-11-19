import mongoose from 'mongoose';

export async function connect() {
    try {
        //mongoose.connect(process.env.MONGO_URI!);mongodb+srv://root:root@atlascluster.enxwogb.mongodb.net/?
        mongoose.connect("mongodb+srv://a01742534:AihxmAeuAM6Z0fyo@clusteriot.prdo5q7.mongodb.net/IOT?retryWrites=true&w=majority");
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}