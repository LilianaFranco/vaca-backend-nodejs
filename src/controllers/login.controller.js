import loginService from "../services/login.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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
