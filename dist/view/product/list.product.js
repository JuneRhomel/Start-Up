import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { getProductHandler } from "../../controllers/product/getproduct.controller.js";
import { handelDataResponse } from "../../controllers/response.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.get("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }) => {
        const recvedData = await getProductHandler(dbCode, res);
        await handelDataResponse(res, recvedData);
    });
});
export default router;
//# sourceMappingURL=list.product.js.map