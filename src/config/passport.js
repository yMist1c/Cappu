// src/config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); // Certifique-se que o modelo está correto e atualizado

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'senha' }, async (email, senha, done) => {
      try {
        // Procura o usuário pelo email.
        // O modelo Usuario.js deve estar configurado para mapear 'email' para a coluna EMAIL do BD.
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
          return done(null, false, { message: 'Este email não está registrado.' });
        }

        // Compara a senha.
        // O modelo Usuario.js deve mapear 'senha' para a coluna SENHA do BD.
        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (isMatch) {
          return done(null, usuario); // Retorna o objeto usuário completo do Sequelize
        } else {
          return done(null, false, { message: 'Senha incorreta.' });
        }
      } catch (err) {
        console.error('Erro na estratégia local do Passport:', err);
        return done(err);
      }
    })
  );

  passport.serializeUser((usuario, done) => {
    // 'usuario' é o objeto Sequelize retornado pela LocalStrategy.
    // 'idUsuario' é o nome do atributo da chave primária no modelo Sequelize.
    if (usuario && typeof usuario.idUsuario !== 'undefined') {
      done(null, usuario.idUsuario);
    } else {
      console.error('Erro ao serializar usuário: idUsuario não definido no objeto usuário.', usuario);
      // Passa um erro se o idUsuario não estiver presente, para evitar problemas.
      done(new Error('idUsuario não encontrado no objeto usuário para serialização.'));
    }
  });

  passport.deserializeUser(async (id, done) => {
    // 'id' é o idUsuario que foi serializado.
    try {
      const usuario = await Usuario.findByPk(id); // Busca o usuário pela chave primária
      if (usuario) {
        done(null, usuario); // Anexa o objeto usuário completo do Sequelize a req.user
      } else {
        // Se o usuário não for encontrado (ex: deletado do BD enquanto a sessão estava ativa)
        done(new Error(`Usuário com id ${id} não encontrado para desserialização.`), null);
      }
    } catch (err) {
      console.error('Erro ao desserializar usuário:', err);
      done(err, null);
    }
  });
};