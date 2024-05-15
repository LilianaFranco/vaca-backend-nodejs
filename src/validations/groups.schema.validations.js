import Joi from "joi";

const colorPalette = [
  "#A65293",
  "#66B04C",
  "#995036",
  "#4E80A5",
  "#CCCCCC",
  "#FFA72F",
  "#FF2530",
  "#FFFFFF",
];

const newGroupSchemaValidation = Joi.object({
  name: Joi.string().trim().min(1).max(30).required(),

  color: Joi.string().valid(...colorPalette),
});

const groupIdSchemaValidation = Joi.object({
  id: Joi.number().min(1),
});

export { newGroupSchemaValidation, groupIdSchemaValidation };
