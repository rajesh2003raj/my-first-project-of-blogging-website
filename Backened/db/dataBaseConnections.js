import mongoose from "mongoose";


const dataBaseConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO}`);
        console.log('Mongodb is connected Successfully!');
    } catch (err) {
        console.log('Error in mongodb !', err);
    }
}

export default dataBaseConnection;