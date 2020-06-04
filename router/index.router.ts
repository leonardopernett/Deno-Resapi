import { Router } from "https://deno.land/x/oak/mod.ts";
import * as indexController from "../controller/index.controller.ts";
const router = new Router();

router.get("/", ({ request, response }) => {
  response.body = "welcome to my api ";
});

router.get("/users", indexController.getUsers);
router.post("/users", indexController.createUser);
router.get("/users/:id", indexController.getOneUsers);
router.delete("/users/:id", indexController.deleteUser);
router.put("/users/:id", indexController.updateUser);

export default router;
