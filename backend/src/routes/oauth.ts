import {json, Request, Response, Router} from "express";
import {z} from "zod";
import {Data, ErrorType, ErrorTypes} from "./_interface.js";
import {type APIUser} from "discord-api-types/v10";
import config from "../../config.json" assert { type: "json" };

const validTokens: Set<string> = new Set();

const schema = z.object({
    access_token: z.string(),
    token_type: z.string()
})

type RequestBody = z.infer<typeof schema>;

interface SuccessResponseBody {
    authorized: boolean;
}

type ResponseBody = SuccessResponseBody | ErrorType<RequestBody>

async function oauth(req: Request<{}, ResponseBody, RequestBody>, res: Response) {
    const errors = schema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    const response = await fetch("https://discord.com/api/v10/users/@me", {
        headers: {
            "Authorization": `${req.body.token_type} ${req.body.access_token}`
        }
    })
    if (response.status !== 200){
        return res.status(400).json({message: "Invalid token"});
    }
    const data: APIUser = await response.json();
    if (config.owner_user_id !== data.id){
        return res.status(200).json({authorized: false});
    } else {
        validTokens.add(req.body.access_token);
        return res.status(200).json({authorized: true});
    }
}

const logoutSchema = z.object({
    access_token: z.string()
})

type LogoutRequestBody = z.infer<typeof logoutSchema>;

interface LogoutSuccessResponseBody {
    success: boolean;
}

type LogoutResponseBody = LogoutSuccessResponseBody | ErrorType<LogoutRequestBody>

async function logout(req: Request<{}, LogoutResponseBody, LogoutRequestBody>, res: Response<LogoutResponseBody>){
    const errors = logoutSchema.safeParse(req.body);
    if (!errors.success){
        return res.status(400).json({type: ErrorTypes.Validation, errors: errors.error.flatten()});
    }
    if (validTokens.has(req.body.access_token)){
        validTokens.delete(req.body.access_token);
        return res.status(200).json({success: true});
    } else {
        return res.status(200).json({success: false});
    }
}

const router = Router();
router.route("/").post([json(), oauth]);
router.route("/logout").post([json(), logout]);

const data: Data = {
    router,
    prefix: '/oauth'
}

export default data;
