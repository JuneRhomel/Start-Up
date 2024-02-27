import { requireUser } from "../../middleware/requireUser.js";
import { decrypt, express } from "../../config/common.js";

import { updateProductHandler } from "../../controllers/product/updateproduct.controller.js";

const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.put("/:id", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        const productId = decrypt(req.params.id)
        const productData = req.body
        await updateProductHandler(productData, productId, dbCode, res, id)
    })
})



export default router