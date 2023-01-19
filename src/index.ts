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
                msg: `You are calling api from Latitude ${lat} and Longitude ${lon}!`
            })
        } else {
            res.send({
                success: true,
                msg: "Your location is empty on GeoIP!"
            })
        }
    } else {
        res.send({
            success: false,
            msg: `Your location was not found on GeoIP ${ip}!`
        })
    }
})

weatherApp.use("/city", cityWeatherRouter)