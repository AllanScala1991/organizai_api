import { Request, Response } from "express";
import { ActivitieRepository } from "../../repositories/activities/activitieRepository";
import { ActivitieService } from "../../services/activities/activitieService";


export class ActivitieController {
    private activieRepository: ActivitieRepository;
    private activitieService: ActivitieService;

    constructor() {
        this.activieRepository = new ActivitieRepository();
        this.activitieService = new ActivitieService(this.activieRepository);
    }

    async findUserActivitie(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const response = await this.activitieService.findUserActivitie(userId);
            return res.status(response.status).json(response)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async updateActivitieCompleted(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const response = await this.activitieService.updateActivitieCompleted(userId);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}