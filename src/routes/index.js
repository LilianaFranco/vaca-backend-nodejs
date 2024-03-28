import express from "express";
import groupsService from "../services/groups.service.js";

const router = express.Router();

router.get("/groups", groupsService.get);

router.get("/groups/:id", groupsService.getById);

router.post("/groups", groupsService.create);

export default router;
