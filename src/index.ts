import express from "express"
import geoip from "geoip-lite"
import cityWeatherRouter from "./routes/weatherFromCity"
import { emptyObject } from "./utils/empty"

const PORT: 3000 = 3000
const weatherApp = express()

weatherApp.use(express.json())

weatherApp.listen(PORT, () => {
    console.log(`Live!`)
})

weatherApp.get("/", (req, res) => {
    const ip: string = req.ip.split(":")[req.ip.split(":").length - 1]

    const geo = geoip.lookup(ip)

    if (geo) {
        if (!emptyObject(geo)) {
            const lat: number = geo.ll[0]
            const lon: number = geo.ll[1]

            res.send({
                success: true,
                msg: `Calling api from Latitude ${lat} and Longitude ${lon}!`
            })
        } else {
            res.send({
                success: true,
                msg: "Location empty!"
            })
        }
    } else {
        res.send({
            success: false,
            msg: "Location not found!"
        })
    }
})

weatherApp.use("/v1/city", cityWeatherRouter)