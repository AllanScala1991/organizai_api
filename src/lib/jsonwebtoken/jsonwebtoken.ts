import { sign, verify } from "jsonwebtoken";
import { GenerateTokenModel, TokenModel, ValidateTokenModel } from "../../models/token/tokenModel";

export class JsonWebToken implements TokenModel {
    generate(data: GenerateTokenModel): string {
        return sign({
            id: data.id,
            name: data.name
        }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d'
        });
    }

    validate(data: ValidateTokenModel): string {
        return verify(data.token, `${process.env.SECRET_KEY}`).toString();
    }
    
}