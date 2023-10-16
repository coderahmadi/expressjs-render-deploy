import Gallary from "../models/Gallary.js";
import { StatusCodes } from "http-status-codes"

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadFile = async (req, res) => {
    const { filename, path } = req.file;
    try {
        const gallary = await Gallary.create({
            filename,
            path,
            tags: [req.body.title],
            uploadDate: Date.now(),
            user: {
                ip: req.ip
            }
        });
        return res.status(StatusCodes.CREATED).json({ data: gallary })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Errors..!" })
    }
}

export const getRecentUploads = async (req, res) => {
    try {
        const latest = await Gallary.find({}).sort({ uploadDate: -1 }).limit(5);
        return res.status(StatusCodes.OK).send(latest)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Errors..!" })
    }
}

export const getFileFromDataBaseByID = async (req, res) => {
    try {
        const image = await Gallary.findById(req.params.imgId);
        // console.log('Data Path: ', path.join(__dirname, `../${image.path}`));
        return res.sendFile(path.join(__dirname, `../${image.path}`))
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' })
    }

}