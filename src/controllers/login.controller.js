import loginService from "../services/login.service.js";
import loginSchemaValidation from "../validations/login.schema.validations.js";

const login = async (req, res) => {
  const { error, value } = loginSchemaValidation.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: error.details.map((detail) => detail.message),
    });
  }

  try {
    const { email, password } = value;
    const token = await loginService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};

export default {
  login,
};
