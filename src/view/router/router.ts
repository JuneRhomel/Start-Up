import express from 'express';
import loginRouter from '../auth/login.js';
import logoutRouter from '../auth/logout.js'
import registerRouter from '../register/register.js'
import { createProduct, getProduct, listProduct, updateProduct, deleteProduct } from '../product/product.js'
import { createProfile, listProfile, myProfile } from '../profile/profile.js';
import { createUser } from '../users/user.js';
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


router.use("/register", registerRouter);
router.use('/auth/login', loginRouter);
router.use('/auth/logout', logoutRouter);

router.use('/product', createProduct);
router.use('/product', updateProduct);
router.use('/product', listProduct);
router.use('/product', getProduct);
router.use('/product', deleteProduct);

router.use('/profile', createProfile);
router.use('/profile', listProfile);
router.use('/myprofile', myProfile);

router.use('/createuser', createUser);
export default router;
