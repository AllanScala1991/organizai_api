import { JsonWebToken } from "./jsonwebtoken"


describe('Json Web Token Tests', () => {
    const jsonwebtoken = new JsonWebToken();

    test("Generate new token", () => {
        const token = jsonwebtoken.generate({
            id: '123',
            name: 'test'
        })

        expect(token).not.toBeNull;
        expect(typeof token).toBe('string');
    })

    test("Validate token", () => {
        const token = jsonwebtoken.generate({
            id: '123',
            name: 'test'
        })

        const validate = jsonwebtoken.validate({ token: token })

        expect(validate).not.toBeNull;
        expect(typeof validate).toEqual("string");
    })
})