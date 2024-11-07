import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = parseInt(`${process.env.PORT}`) || 8080;
const whiteList = [process.env.FRONTEND]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        }else {
            callback(new Error("Erro de CORS"))
        }
    },
    credentials: true
}

//APP USE section
app.use(cors(corsOptions));
app.use(express.json());

//ROUTES
app.use(require('./routes/user/userRoute'));
app.use(require('./routes/login/loginRoute'));
app.use(require('./routes/level/userLevelRoute'));
app.use(require('./routes/follow/followRoute'));

//Server init
app.listen(port, () => {
    console.log(`Server is running in PORT: ${port}`)
})