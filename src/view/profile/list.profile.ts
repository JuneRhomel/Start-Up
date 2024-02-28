import { requireUser } from "../../middleware/requireUser.js";
import { decrypt, express, multer, dotenv } from "../../config/common.js";
import { getProductHandlerById } from "../../controllers/product/getproduct.controller.js";
import { handelDataResponse } from "../../controllers/response.controller.js";
import { profileTable } from "../../db/index.js";
import { createProfileHandler } from "../../controllers/profile/createproduct.controller.js";
import { getProfileHandler } from "../../controllers/profile/getprofile.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        const result = await getProfileHandler(id, dbCode, res)
        await handelDataResponse(res, result)
    })
})



export default router