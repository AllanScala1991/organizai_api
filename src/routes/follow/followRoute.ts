import { Request, Response, Router } from "express";
import { FollowController } from "../../controllers/follow/followController";
import auth from "../../middlewares/auth/authentication";


const app = Router();
const followController = new FollowController();

app.put("/follow/:userId/:followerId", auth, async (req: Request, res: Response): Promise<any> => {
    await followController.followNewUser(req, res)
})

app.put("/unfollow/:userId/:followerId", auth, async (req: Request, res: Response): Promise<any> => {
    await followController.unfollowUser(req, res)
})

app.get("/followers/:userId", auth, async (req: Request, res: Response): Promise<any> => {
    await followController.getAllFollowers(req, res)
})

app.get("/followings/:userId", auth, async (req: Request, res: Response): Promise<any> => {
    await followController.getAllFollowings(req, res)
})

app.get("/follow/total/:userId", auth, async (req: Request, res: Response): Promise<any> => {
    await followController.getTotalFollowersAndFollowings(req, res)
})

module.exports = app;