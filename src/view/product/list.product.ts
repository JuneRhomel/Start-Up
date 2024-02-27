import { requireUser } from "../../middleware/requireUser.js";
import { decrypt, express } from "../../config/common.js";
import { getProductHandler, getProductHandlerById } from "../../controllers/product/getproduct.controller.js";
import { handelDataResponse } from "../../controllers/response.controller.js";
import { Product } from "../../model/product.model.js";

const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode }: { id: number, dbCode: string }) => {
        const recvedData: Product = await getProductHandler(dbCode, res)
        await handelDataResponse(res, recvedData)
    })
})


export default router