import { requireUser } from "../../middleware/requireUser.js";
import { express, hashData } from "../../config/common.js";
import { handelErrorResponse, handelSuccessResponse, handleMissingFieldResponse } from "../../controllers/response.controller.js";
import { checkRequiredFields, emailChecker } from "../../helper/function.helper.js";
import { insertIntoAccounts, insertUser } from "../../controllers/createuser.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", (req, res) => {
    requireUser(req, res, async ({ id, dbCode, accountCode }) => {
        try {
            const data = req.body;
            const requiredFields = await checkRequiredFields(req.body, ["email", "first_name", "contact_number", "address", "last_name", "password", "confirm_password"], res);
            if (requiredFields.length > 0) {
                return handleMissingFieldResponse(res, requiredFields);
            }
            const { email, password, confirm_password } = req.body;
            if (hashData(password) !== hashData(confirm_password)) {
                return handelErrorResponse(res, "Passwords do not match");
            }
            if (emailChecker(email) === false) {
                return handelErrorResponse(res, "Invalid email address");
            }
            const user = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: await hashData(data.password),
                confirm_password: await hashData(data.confirm_password),
                account_code: accountCode,
                created_by: id,
                created_at: new Date().getTime(),
                contact_number: data.contact_number,
                address: data.address,
                permission_id: 0,
                deleted_at: 0
            };
            const accountTabedata = {
                email: data.email,
                password: user.password,
                first_name: data.first_name,
                last_name: data.last_name,
                account_code: accountCode,
                permission_id: 1,
                is_active: 1
            };
            const userData = {
                first_name: data.first_name,
                last_name: data.last_name,
                contact_number: data.contact_number,
                address: data.address,
                email: data.email
            };
            const accounts = await insertIntoAccounts(accountTabedata);
            userData.account_id = accounts.insertId;
            await insertUser(userData, dbCode);
            await handelSuccessResponse(res, "Account created successfully");
        }
        catch (err) {
            console.log(err);
            handelErrorResponse(res, "Failed to perform operation");
        }
    });
});
export default router;
//# sourceMappingURL=create.user.js.map