import mongoose from "mongoose"
const url = "mongodb://127.0.0.1:27017";
export const connectDB = () => {

    mongoose.connect(url, {
        dbName: "Ecomdb_24"
    }).then(c => console.log(`DB connected to ${c.connection.host}`))
        .catch((e) => console.log(e));

}
