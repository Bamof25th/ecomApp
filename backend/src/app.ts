import express from 'express';


const port = 4000;

const app = express();


app.listen(port, () => {
    console.log(`Express is running on port http://localhost:${port}`);
});