"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const weatherFromCity_1 = __importDefault(require("./routes/weatherFromCity"));
const empty_1 = require("./utils/empty");
const PORT = 3000;
const weatherApp = (0, express_1.default)();
weatherApp.use(express_1.default.json());
weatherApp.listen(PORT, () => {
    console.log(`Live!`);
});
weatherApp.get("/", (req, res) => {
    const ip = req.ip.split(":")[req.ip.split(":").length - 1];
    const geo = geoip_lite_1.default.lookup(ip);
    if (geo) {
        if (!(0, empty_1.emptyObject)(geo)) {
            const lat = geo.ll[0];
            const lon = geo.ll[1];
            res.send({
                success: true,
                msg: `You are calling api from Latitude ${lat} and Longitude ${lon}!`
            });
        }
        else {
            res.send({
                success: true,
                msg: "Your location is empty on GeoIP!"
            });
        }
    }
    else {
        res.send({
            success: false,
            msg: `The location you're calling from, ${ip}, was not found on GeoIP`
        });
    }
});
weatherApp.use("/city", weatherFromCity_1.default);
