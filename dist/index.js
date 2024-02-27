import fs from 'fs';
fs;
import deserializeUser from './middleware/deserializeUser.js';
import { express } from "./config/common.js";
import mainRouter from "./view/router/router.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(deserializeUser);
app.use('/', mainRouter);
app.listen(3000, () => console.log('Server is running on port 3000'));
//# sourceMappingURL=index.js.map