import mongoose from "mongoose";

export default async function() {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.error(error);
    }
}
