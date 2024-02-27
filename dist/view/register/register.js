import { express, checkRequiredFields, hashData } from "../../config/common.js";
import { emailChecker, accountCodeGenerator } from "../../helper/function.helper.js";
import { createDatabase, productTable, statusProductTable, userTable } from "../../db/index.js";
import { handleQueryError, insertDbAccount, insertIntoAccounts, insertUser } from "../../controllers/createuser.controller.js";
import { handelSuccessResponse } from "../../controllers/response.controller.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.post("/", async (req, res) => {
    try {
        checkRequiredFields(req.body, ["email", "first_name", "last_name", "password", "confirm_password"], res);
        const { email, password, confirm_password } = req.body;
        if (hashData(password) !== hashData(confirm_password)) {
            return res.status(400).send("Password not match");
        }
        if (emailChecker(email) === false) {
            return res.status(400).send("Invalid email");
        }
        delete req.body.confirm_password;
        req.body.password = hashData(req.body.password);
        req.body.account_code = accountCodeGenerator(req.body.email);
        req.body.permission_id = 1;
        req.body.is_active = 1;
        const accountTabedata = {
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            account_code: req.body.account_code,
            permission_id: req.body.permission_id,
            is_active: req.body.is_active
        };
        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            contact_number: req.body.contact_number,
            address: req.body.address,
            email: req.body.email
        };
        const accounts = await insertIntoAccounts(accountTabedata);
        const dbAccounts = await insertDbAccount(accounts.insertId, accountTabedata.account_code);
        const DB_NAME = "store_" + dbAccounts.insertId;
        await createDatabase(DB_NAME);
        await userTable(DB_NAME);
        await insertUser(userData, DB_NAME);
        await productTable(DB_NAME);
        await statusProductTable(DB_NAME);
        await handelSuccessResponse(res, "Account created successfully");
    }
    catch (err) {
        handleQueryError(res, "Failed to perform operation", err);
    }
});
export default router;
//# sourceMappingURL=register.js.map