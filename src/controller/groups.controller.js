import groupService from "../services/groups.service";

export const getGroups = (req, res) => {
  console.log(req.query);
  return res.json(groupService.map((group) => ({})));
};
