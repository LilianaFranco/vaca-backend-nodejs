import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Model } from "../model/usersModel.js";

const userModel = Model();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, async function (jwt_payload, done) {
    try {
      const user = await userModel.getById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);
