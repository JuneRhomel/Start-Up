import { express } from "../../config/common.js";
import { deleteSessionHandler } from "../../controllers/session.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", (req, res) => {
    try {
        deleteSessionHandler(req, res);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});
export default router;
//# sourceMappingURL=logout.js.map