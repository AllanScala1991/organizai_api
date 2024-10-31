export interface GenerateTokenModel {
    id: string
    name: string
}

export interface ValidateTokenModel {
    token: string
}

export interface TokenModel {
    generate(data: GenerateTokenModel): string
    validate(data: ValidateTokenModel): string
}