import { requireUser } from "../../middleware/requireUser.js";
import { express } from "../../config/common.js";
import { deleteProductHandler } from "../../controllers/product/deleteproduct.controler.js";
import { handelErrorResponse } from "../../controllers/response.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.delete("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }) => {
        try {
            const productId = req.body.id;
            if (!productId) {
                handelErrorResponse(res, "Product Id is required");
            }
            else {
                await deleteProductHandler(productId, id, dbCode, res);
            }
        }
        catch (err) {
            await handelErrorResponse(res, "Something went wrong");
        }
    });
});
export default router;
//# sourceMappingURL=delete.product.js.map