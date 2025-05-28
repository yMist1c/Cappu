
const bcrypt = require("bcryptjs");
const { query } = require("../utils/db");

module.exports = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if ([name, email, password, role].some(field => !field?.trim())) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        throw new Error("Email já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await query('INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)', 
        [name, email, hashedPassword, role, 'active']);

      res.redirect("/auth/cl-login");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/auth/register");
    }
  },

  login(req, res) {
    const redirectTo = req.session.returnTo || `/${req.user.role}`;
    delete req.session.returnTo;
    res.redirect(redirectTo);
  },

  logout(req, res) {
    req.logout(err => {
      if (err) console.error(err);
      res.redirect("/");
    });
  }
};
