"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
(() => __awaiter(this, void 0, void 0, function* () {
    // Init the Express application
    const app = express_1.default();
    let images = [];
    // Set the network port
    const port = process.env.PORT || 8082;
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/filteredimage", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { image_url } = req.query;
        // validating the image_url present in request's query
        if (!image_url) {
            return res.status(400).send({ message: 'image not found' });
        }
        util_1.deleteLocalFiles(images);
        // calling filterImageFromURL(image_url) to filter the image
        const filteredpath = yield util_1.filterImageFromURL(image_url);
        images.push(filteredpath);
        if (!filteredpath) {
            return res.status(422).send({ message: 'unable to process image for filtering due to internal errors' });
        }
        res.status(200).sendFile(filteredpath);
    }));
    // Root URI call
    app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send("Try /filteredimage?image_url={{PUBLIC URL}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map