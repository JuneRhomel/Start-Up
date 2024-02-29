import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { handelDataResponse, handelErrorResponse } from "../../controllers/response.controller.js";
import { getMyProfileHandler } from "../../controllers/profile/getprofile.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        try {
            const result = await getMyProfileHandler(id, dbCode, res)
            await handelDataResponse(res, result)

        } catch (err) {
            console.log(err)
            await handelErrorResponse(res, "Something went wrong")
        }
    })
})



export default router