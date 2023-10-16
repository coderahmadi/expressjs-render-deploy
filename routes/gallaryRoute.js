import { uploadFile, getRecentUploads, getFileFromDataBaseByID } from "../controllers/gallaryController.js";
import multer from "multer";
import express from "express";
import bytes from "bytes";
const router = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storages");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const originalFileName = file.originalname.split('.')[0];
        cb(null, `${originalFileName}-${Date.now()}.${ext}`);
    }
});

const upload = multer({
    storage: storage, limits: { fileSize: bytes("1MB") }
});

router.post('/uploadImage', upload.single('pic'), uploadFile)
router.get('/recentUploads', getRecentUploads);
router.get('/getImgById/:imgId', getFileFromDataBaseByID);
export default router;