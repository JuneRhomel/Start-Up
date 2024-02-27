import { requireUser } from "../../middleware/requireUser.js";
import { express, checkRequiredFields, connection } from "../../config/common.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", (req, res) => {
    requireUser(req, res, ({ id, dbCode }) => {
        try {
            const data = req.body;
            const required = ["province", 'district', 'city', 'barangay', 'branch_name', "status"];
            checkRequiredFields(data, required, res);
            data.created_by = id;
            data.created_at = new Date().getTime();
            connection.query(`INSERT INTO ${dbCode}.branch_locations SET ?`, data, (err, result) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.send(err);
            console.log(err);
        }
    });
});
export default router;
//# sourceMappingURL=branch.js.map