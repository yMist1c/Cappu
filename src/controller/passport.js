
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { query } = require("../utils/db");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result = await query('SELECT * FROM USUARIO WHERE EMAIL = ?', [email]);
        const user = result[0];

        if (!user) {
          return done(null, false, { message: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.SENHA);

        if (!isMatch) {
          return done(null, false, { message: "Senha incorreta" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.ID_USUARIO);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await query('SELECT * FROM USUARIO WHERE ID_USUARIO = ?', [id]);
    const user = result[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});
