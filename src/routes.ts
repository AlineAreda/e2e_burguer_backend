import { Router } from "express";
import { upload } from "./config/multer"; 

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController'; 
import { DetailUserController } from './controllers/user/DetailUserController';
import { DetailAnyUserController } from "./controllers/user/DetailAnyUserController";
import { ListAllUsersController } from './controllers/user/ListAllUsersController';
import { RemoveUserController } from './controllers/user/RemoveUserController';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { ListAllProductsController } from './controllers/product/ListAllProductsController';
import { DeleteProductController } from './controllers/product/DeleteProductController';
import { UpdateProductController } from "./controllers/product/UpdateProductController";  
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { isGestaoAuthenticated } from "./middlewares/isGestaoAuthenticated";

const router = Router();

// -- ROTAS USER --
router.post('/user', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/user/detail', isAuthenticated, isGestaoAuthenticated, new DetailUserController().handle);
router.get("/users/:id", isAuthenticated,isGestaoAuthenticated, new DetailAnyUserController().handle);
router.get("/users", isAuthenticated, isGestaoAuthenticated, new ListAllUsersController().handle);
router.delete('/user/delete', isAuthenticated, isGestaoAuthenticated, new RemoveUserController().handle);
router.put('/user/:user_id', isAuthenticated, isGestaoAuthenticated, new UpdateUserController().handle);

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, isGestaoAuthenticated, new CreateCategoryController().handle);
router.get('/category/list', isAuthenticated, new ListCategoryController().handle);
router.delete('/category/remove', isAuthenticated, isGestaoAuthenticated, new RemoveCategoryController().handle);

// -- ROTAS PRODUCT --
router.post('/product', upload.single('file'), isAuthenticated, isGestaoAuthenticated, new CreateProductController().handle);
router.delete('/product/remove/:id', isAuthenticated, isGestaoAuthenticated, new DeleteProductController().handle);
router.get('/category/product/:category_id', isAuthenticated, new ListByCategoryController().handle);
router.get("/products", isAuthenticated, new ListAllProductsController().handle);
router.patch('/product/:id', isAuthenticated, isGestaoAuthenticated, upload.single('file'), new UpdateProductController().handle);

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order/remove/:order_id', isAuthenticated, new RemoveOrderController().handle);
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/orders', isAuthenticated, new ListOrdersController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);

export { router };
