import passport from "passport";

const routesWithoutAuth = [
  { url: "/login", method: "POST" },
  { url: "/users", method: "POST" },
];

const authenticate = passport.authenticate("jwt", { session: false });

const authMiddleware = (req, res, next) => {
  const shouldApplyAuth = routesWithoutAuth.some((route) => {
    return route.url !== req.path && route.method !== req.method;
  });
  console.log(shouldApplyAuth);
  if (shouldApplyAuth) {
    authenticate(req, res, next);
  } else {
    next();
  }
};

export default authMiddleware;
