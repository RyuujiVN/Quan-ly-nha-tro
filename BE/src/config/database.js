import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connect database successfull!');
    } catch (error) {
        console.log(error);
    }
}

export default connectDatabase;