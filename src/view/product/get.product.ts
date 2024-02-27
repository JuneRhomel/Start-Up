import { requireUser } from "../../middleware/requireUser.js";
import { decrypt, express } from "../../config/common.js";
import { getProductHandlerById } from "../../controllers/product/getproduct.controller.js";
import { handelDataResponse } from "../../controllers/response.controller.js";

const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/:id", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        const productId = decrypt(req.params.id)
        const recvedData = await getProductHandlerById(dbCode, productId, res)
        await handelDataResponse(res, recvedData)
    })
})



export default router