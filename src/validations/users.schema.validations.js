import Joi from "joi";

const newUserSchemaValidation = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"))
    .required(),
});

const userIdSchemaValidation = Joi.object({
  id: Joi.number().min(1),
});

export { newUserSchemaValidation, userIdSchemaValidation };
