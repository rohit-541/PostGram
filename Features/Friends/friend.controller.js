import { friendReposity } from "./friend.reposity.js";

export class FriendController{
    static sendFriendRequest = async (req,res,next)=>{
        const userId = req.userId;
        const targetId = req.params.id;

        try {
            //userid -> targetid (friend request);
            const createRequest = await friendReposity.sendRequest(userId,targetId);
            res.status(200).send("Sent Friend Request");
        } catch (error) {
            next(error);
        }
    }

    static acceptRequest = async (req,res)=>{
        const id = req.params.id;
        await friendReposity.acceptRequest(id);
        return res.status(200).json({
            success:true,
            msg:"Friend Request Accepted"
        });
    }
}