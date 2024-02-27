import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { createProductHandler } from "../../controllers/product/createproduct.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }) => {
        const data = req.body;
        data.created_by = id;
        data.created_at = new Date().getTime();
        const products = await createProductHandler(data, id, dbCode, res);
    });
});
export default router;
//# sourceMappingURL=create.product.js.map