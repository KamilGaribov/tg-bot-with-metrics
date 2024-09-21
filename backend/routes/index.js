import { Router } from "express";

const router = Router()

const auth = (req, res, next) => {
    console.log("hello from authentication")
    next()
}

const getRequest = (req, res) => {
    return res.status(200).json({
        message: "Hello from index page"
    })
}

router.get("", auth, getRequest)


export default router