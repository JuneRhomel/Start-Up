import { express, checkRequiredFields } from "../../config/common.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", (req, res) => {
    const data = req.body;
    try {
        let requiredFields = checkRequiredFields(data, ["email", "password"], res);
        console.log(requiredFields);
    }
    catch (err) {
        console.log(err);
    }
    res.send(data);
});
router.delete("/", (req, res) => {
    const data = req.body;
    res.send(data);
});
export default router;
//# sourceMappingURL=session.js.map