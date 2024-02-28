import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { handelDataResponse } from "../../controllers/response.controller.js";
import { getProfileHandler } from "../../controllers/profile/getprofile.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }) => {
        const result = await getProfileHandler(id, dbCode, res);
        await handelDataResponse(res, result);
    });
});
export default router;
//# sourceMappingURL=list.profile.js.map