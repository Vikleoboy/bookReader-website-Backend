import { Router } from "express";
import mail from "../controller/Mail.js";
import catchAsync from "../utils/catchAsync.js"
import { isMailValid, isMailExist } from "../middleware/Mail.js";

const router = Router()

// /mail route
router
    .route("/")
    .get(catchAsync(mail.get))
    .post(isMailValid, catchAsync(mail.post))

// /mail/:userEmail route
router
    .route("/:email")
    .delete(isMailExist, catchAsync(mail.remove))
    .patch(isMailExist, catchAsync(mail.edit))

export default router