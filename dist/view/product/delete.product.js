import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { deleteProductHandler } from "../../controllers/product/deleteproduct.controler.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.delete("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }) => {
        const productId = req.body.id;
        await deleteProductHandler(productId, id, dbCode, res);
    });
});
export default router;
//# sourceMappingURL=delete.product.js.map