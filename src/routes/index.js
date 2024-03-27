import express from "express";
import { getGroups } from "../controller/groups.controller";

const router = express.Router();

router.get("/groups", getGroups);

export default router;
