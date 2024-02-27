import { express, checkRequiredFields, hashData } from "../../config/common.js";
import { createSessionHandler } from "../../controllers/session.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/", (req, res) => {
    const data = req.body;
    try {
        let requiredFields = checkRequiredFields(data, ["email", "password"], res)
        if (requiredFields.length > 0) {
            return
        }
        createSessionHandler(req, res)

    } catch (err) {
        console.log(err)
    }
});

export default router