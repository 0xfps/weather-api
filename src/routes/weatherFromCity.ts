import { Router } from "express"
import { empty } from "../utils/empty"
import request from "request"
import dotenv from "dotenv"

dotenv.config()
const APIKEY = process.env.API_KEY

const cityWeatherRouter: Router = Router()

cityWeatherRouter.get("/:city", async (req, res) => {
    const { city } = req.params
    const cityData: Array<object> = []

    if (empty(city)) {
        res.send({
            success: false,
            msg: "City empty"
        })
    }

    await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
        method: 'GET',
        // @ts-ignore
        headers: {
            'X-Api-Key': APIKEY
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    cityData.push({
                        name: data[i].name,
                        latitude: data[i].latitude,
                        longitude: data[i].longitude,
                        country: data[i].country
                    })
                }
            } else {
                res.send({
                    success: false,
                    msg: "City not found."
                })
            }
        })

    res.send({
        success: true,
        msg: "" // Nothing yet.
    })
})

export default cityWeatherRouter