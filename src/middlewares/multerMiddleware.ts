import { Request } from 'express';
import path from 'path';
import multer from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
        cb(null, path.resolve('uploads'));
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);

        cb(null, file.fieldname + '-' + uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;