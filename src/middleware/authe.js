// src/middleware/authe.js
module.exports = {
  ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      }
      req.flash('error_msg', 'Por favor, faça login para visualizar este recurso.');
      res.redirect('/login');
  },
  ensureNotAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
          const userType = req.user ? req.user.tipo : null;
          let redirectPath = '/'; // Rota padrão se logado e tipo desconhecido

          if (userType === 'aluno') {
              redirectPath = '/aluno/perfil';
          } else if (userType === 'professor') {
              redirectPath = '/professor/perfil';
          } else if (userType === 'adm') {
              redirectPath = '/adm/home';
          }
          return res.redirect(redirectPath);
      }
      return next();
  },
  isProfessor: function(req, res, next) {
      if (req.isAuthenticated() && req.user && req.user.tipo === 'professor') {
          return next();
      }
      req.flash('error_msg', 'Acesso negado. Você precisa ser um professor.');
      res.redirect(req.isAuthenticated() ? '/' : '/login'); // Redireciona para home se logado, senão para login
  },
  isAluno: function(req, res, next) {
      if (req.isAuthenticated() && req.user && req.user.tipo === 'aluno') {
          return next();
      }
      req.flash('error_msg', 'Acesso negado. Você precisa ser um aluno.');
      res.redirect(req.isAuthenticated() ? '/' : '/login');
  },
  isAdm: function(req, res, next) {
      if (req.isAuthenticated() && req.user && req.user.tipo === 'adm') {
          return next();
      }
      req.flash('error_msg', 'Acesso negado. Você precisa ser um administrador.');
      res.redirect(req.isAuthenticated() ? '/' : '/login');
  }
};