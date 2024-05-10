import mongoose from "mongoose"
const url = "mongodb://localhost:27017";
export const connectDB = () => {

    mongoose.connect(url, {
        dbName: "ecomdb"
    }).then(c => console.log(`DB connected to ${c.connection.host}`))
        .catch((e) => console.log(e));

}
