import { CreateActivitiesModel } from "../../models/activities/activitiesModel";
import { ResponseModel } from "../../models/response/responseModel";
import { ActivitieRepository } from "../../repositories/activities/activitieRepository";


export class ActivitieService {
    constructor(
        private activitieRepository: ActivitieRepository
    ){}

    async createActivitie(activitie: CreateActivitiesModel): Promise<ResponseModel> {
        if(!activitie.userId) return { status: 400, message: 'ID de usuário inválido.' }

        await this.activitieRepository.createActivitie(activitie)

        return { status: 201 }
    }

    async findUserActivitie(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de usuário inválido.' }

        const activitie = await this.activitieRepository.findActivitieByUserId(userId);

        if(!activitie) return { status: 404, message: 'Nenhum dado de conquista localizado.' }

        return { status: 200, data: activitie }
    }

    async updateActivitieCompleted(userId: string): Promise<ResponseModel> {
        if(!userId) return { status: 400, message: 'ID de usuário é obrigatório.' }

        const activitieExists = await this.activitieRepository.findActivitieByUserId(userId);

        if(!activitieExists) return { status: 404, message: 'Dados de conquistas não localizado.' }

        activitieExists.activitiesCompleted += 1;

        const activitieUpdated = await this.activitieRepository.updatedActivitieCompleted(userId, activitieExists.activitiesCompleted);

        return{ status: 200, data: activitieUpdated }
    }
}