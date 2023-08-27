import multer from "multer";
import config from 'config';
import * as fs from 'fs';

const acceptedImageExtensions = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (acceptedImageExtensions.some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        } return cb(new Error('Only ' + acceptedImageExtensions.join(", ") + ' files are allowed!'));
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.get('file.path'));
        },
        filename: function (req, file, cb) {
            let i = file.originalname.lastIndexOf('.');
            let ext = (i < 0) ? '.jpg' : file.originalname.substring(i);
            cb(null, new Date().getTime().toString() + ext);
        }
    })
});

export const photoUpload = async (req, res, next) => {
    let folderName = req.body.folderName;
    const uploadFile = upload.single("file");
    await uploadFile(req, res, async (error) => {
        if (error) { return next(error); }
        if (!req.file) return res.status(400).json({ message: 'File uploading failed.' });

        let body = {
            file: req.file,
            filename: req.file.filename,
            folder: folderName
        };
        const { uploadFile } = await import('./firebase.js');
        let result = await uploadFile(body);
        if (result == null) return res.status(400).json({ message: 'File uploading failed.' });
        if (result != null) {
            fs.unlinkSync(req.file.path);
            req.body.logoUrl = result;
            next();
        }
    });
};