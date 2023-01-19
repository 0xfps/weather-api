"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empty_1 = require("../utils/empty");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const APIKEY = process.env.API_KEY;
const cityWeatherRouter = (0, express_1.Router)();
cityWeatherRouter.get("/:city", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.params;
    const mst = [];
    if ((0, empty_1.empty)(city)) {
        res.send({
            success: false,
            msg: "City empty."
        });
    }
    yield fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
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
        });
    });
}));
exports.default = cityWeatherRouter;
