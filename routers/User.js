import { Router } from "express";
import catchAsync from "../utils/catchAsync.js"
import user from "../controller/User.js"
import { isUserAuthenticated } from "../middleware/Auth.js";

const router = Router()

router
    .route("/")
    .get(isUserAuthenticated, catchAsync(user.get))
    .delete(isUserAuthenticated, catchAsync(user.remove))

export default router;