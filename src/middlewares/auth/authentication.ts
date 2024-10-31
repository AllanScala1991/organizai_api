import { NextFunction, Request, Response, Router } from "express";
import { TokenModel } from "../../models/token/tokenModel";
import { JsonWebToken } from "../../lib/jsonwebtoken/jsonwebtoken";

const app: Router = Router();
const tokenService: TokenModel = new JsonWebToken();

app.use((req: Request, res: Response, next: NextFunction): any  => {
    const auth = req.headers.authorization;

    if(!auth) return res.status(403).send("Acesso não autorizado.");

    const token = auth.split(" ");
    
    try {
        tokenService.validate({token: token[1]})
        return next()
    } catch (error) {
        return res.status(403).json("Acesso não autorizado.");
    }
})

export default app;