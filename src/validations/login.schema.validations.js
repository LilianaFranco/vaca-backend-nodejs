const loginSchemaValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$"))
    .required(),
});

export default loginSchemaValidation;
