import { requireUser } from "../../middleware/requireUser.js";
import { express, multer, dotenv } from "../../config/common.js";
import { profileTable } from "../../db/index.js";
import { createProfileHandler } from "../../controllers/profile/createproduct.controller.js";
import { ProfileUploadModel } from "../../model/profile.model.js";
import { handelErrorResponse } from "../../controllers/response.controller.js";
import path from "path";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/profile'); // Destination directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
});

router.post("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        try {
            await profileTable(dbCode)
            if (!req.file) {
                await handelErrorResponse(res, "No file uploaded")
            } else {
                upload.single('url_image')(req, res, async (err) => {
                    if (err) {
                        await handelErrorResponse(res, "No file uploaded")
                    }
                    console.log(req.file);
                    const profileUrl = `${process.env.BASE_URL}/public/uploads/profile/${req.file.filename}`;
                    const profile: ProfileUploadModel = {
                        user_id: id,
                        url_image: profileUrl,
                        path: req.file.path,
                        file_name: req.file.filename,
                        original_name: req.file.originalname,
                        size: req.file.size
                    };
                    await createProfileHandler(profile, id, dbCode, res);
                });
            }

        } catch (err) {
            console.log(err)
            await handelErrorResponse(res, "Something went wrong")
        }
    })
})



export default router