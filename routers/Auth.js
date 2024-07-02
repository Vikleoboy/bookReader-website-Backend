import { Router } from "express";
import { isUserValid } from "../middleware/Auth.js";
import catchAsync from "../utils/catchAsync.js";
import auth from "../controller/Auth.js"

const router = Router()

router
    .route("/login")
    .post(catchAsync(auth.login))

router
    .route("/signup")
    .post(isUserValid, catchAsync(auth.signup))

export default router