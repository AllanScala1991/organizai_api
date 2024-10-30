export interface HashModel {
    value: string
    salt: number
}

export interface CompareModel {
    current: string
    hash: string
}

export interface EncrypterModel{
    encrypt(data: HashModel): Promise<string>
    compare(data: CompareModel): Promise<boolean>
}