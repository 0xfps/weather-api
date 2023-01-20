import { Router } from "express"
import { empty } from "../utils/empty"
import request from "request"
import dotenv from "dotenv"

dotenv.config()
const APIKEY = process.env.API_KEY

const cityWeatherRouter: Router = Router()

cityWeatherRouter.get("/:city", async (req, res) => {
    const { city } = req.params

    if (empty(city)) {
        res.send({
            success: false,
            msg: "City empty."
        })
    }

    await fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
        method: 'GET',
        // @ts-ignore
        headers: {
            'X-Api-Key': APIKEY
        }
    })
        .then(response => response.json())
        .then(data => {
            res.send({
                success: true,
                msg: data // Nothing yet.
            })
        })
})

export default cityWeatherRouter