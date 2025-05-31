// src/controller/authControllers.js
const passport = require('passport');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
// const crypto = require('crypto'); // Para tokens de senha, se necessário
// const nodemailer = require('nodemailer'); // Para envio de emails, se necessário

// GET Página de Login
exports.getLogin = (req, res) => {
    console.log('DEBUG: authController.getLogin foi chamado.'); // Log para confirmar chamada
    res.render('login', {
        message: req.flash('error'),
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg')
    });
};

// POST Processar Login (esta função é chamada APÓS passport.authenticate e req.logIn em auth.js)
exports.login = (req, res, next) => {
    console.log('authController.login - req.user:', req.user);
    console.log('authController.login - req.user.tipo:', req.user && req.user.tipo ? req.user.tipo : 'Tipo não definido');

    if (!req.user || typeof req.user.tipo === 'undefined') {
        console.error('authController.login: req.user ou req.user.tipo está indefinido.');
        req.flash('error_msg', 'Erro ao processar login. Tipo de usuário não reconhecido.');
        return res.redirect('/login');
    }

    if (req.user.tipo === 'adm') {
        return res.redirect('/adm/home');
    } else if (req.user.tipo === 'professor') {
        return res.redirect('/professor/perfil');
    } else if (req.user.tipo === 'aluno') {
        return res.redirect('/aluno/perfil');
    } else {
        console.warn(`authController.login: Tipo de usuário desconhecido encontrado: ${req.user.tipo}`);
        req.flash('error_msg', 'Tipo de usuário inválido.');
        return res.redirect('/login');
    }
};

// GET Página de Cadastro
exports.getRegister = (req, res) => {
    console.log('DEBUG: authController.getRegister foi chamado.');
    res.render('cadastro', {
        error_msg: req.flash('error_msg'),
    });
};

// POST Processar Cadastro
exports.register = async (req, res, next) => {
    const { nome, email, senha, confirmar_senha, tipo } = req.body;

    try {
        // A validação já deve ter sido feita pelo middleware 'validate' em auth.js
        // Se chegou aqui, os dados são considerados válidos em termos de formato.

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            req.flash('error_msg', 'Este email já está cadastrado.');
            return res.redirect('/cadastro');
        }

        // Validação de senha (se não feita pelo validator)
        if (senha !== confirmar_senha) {
             req.flash('error_msg', 'As senhas não coincidem.');
             return res.redirect('/cadastro');
        }
        if (!senha || senha.length < 6) {
            req.flash('error_msg', 'A senha deve ter pelo menos 6 caracteres.');
            return res.redirect('/cadastro');
        }


        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
            nomeUsu: nome,
            email: email,
            senha: hashedPassword,
            tipo: tipo,
            dataCadastro: new Date(),
            idStatus: true, // Exemplo: definir usuário como ativo por padrão
        });

        req.logIn(novoUsuario, (err) => {
            if (err) {
                console.error('Erro ao fazer login automático após registro:', err);
                req.flash('error_msg', 'Erro ao tentar fazer login após o registro.');
                return res.redirect('/login');
            }
            // Reutiliza a lógica de redirecionamento de exports.login
            return exports.login(req, res, next);
        });

    } catch (error) {
        console.error('Erro durante o processo de registro:', error);
        let errorMessage = 'Ocorreu um erro durante o registro. Tente novamente.';
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            errorMessage = error.errors.map(e => e.message).join(', ');
        } else if (error.message) {
            errorMessage = error.message;
        }
        req.flash('error_msg', errorMessage);
        res.redirect('/cadastro');
    }
};

// GET Logout
exports.logout = (req, res, next) => {
    console.log('DEBUG: authController.logout foi chamado.');
    req.logout((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
            return next(err);
        }
        req.flash('success_msg', 'Você saiu com sucesso!');
        res.redirect('/login');
    });
};

// GET Formulário Esqueci Senha
exports.getForgotPassword = (req, res) => {
    console.log('DEBUG: authController.getForgotPassword foi chamado.');
    res.render('esq_senha', {
        message: req.flash('error'),
        error_msg: req.flash('error_msg'),
        success_msg: req.flash('success_msg')
    });
};

// POST Processar Solicitação de Esqueci Senha
exports.postForgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        console.log(`(Simulação) Solicitação de redefinição de senha para: ${email}. Usuário encontrado: ${!!usuario}`);
        // Mesmo se não encontrar, envie uma mensagem genérica por segurança
        // if (usuario) {
        //   Implementar lógica de token e envio de email aqui...
        //   Ex: const token = crypto.randomBytes(20).toString('hex');
        //   usuario.resetPasswordToken = token;
        //   usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        //   await usuario.save();
        //   ...enviar email...
        // }
        req.flash('success_msg', 'Se este email estiver cadastrado, um link para redefinir sua senha será enviado em breve.');
        res.redirect('/esqueci-senha');
    } catch (error) {
        console.error("Erro em postForgotPassword:", error);
        req.flash('error_msg', 'Erro ao processar sua solicitação de redefinição de senha.');
        res.redirect('/esqueci-senha');
    }
};

// GET Formulário para Redefinir Senha (com token)
exports.getResetPassword = async (req, res, next) => {
    const { token } = req.params;
    // Normalmente você validaria o token aqui antes de renderizar
    // try {
    //     const usuario = await Usuario.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() } } });
    //     if (!usuario) {
    //         req.flash('error_msg', 'Token de redefinição de senha inválido ou expirado.');
    //         return res.redirect('/esqueci-senha');
    //     }
        res.render('redefinir-senha', {
            token,
            error_msg: req.flash('error_msg'),
            success_msg: req.flash('success_msg')
        });
    // } catch (error) {
    //     console.error("Erro em getResetPassword:", error);
    //     req.flash('error_msg', 'Token inválido ou erro ao carregar página.');
    //     res.redirect('/login');
    // }
};

// POST Processar Nova Senha
exports.postResetPassword = async (req, res, next) => {
    const { token } = req.params;
    const { senha, confirmarSenha } = req.body;

    if (senha !== confirmarSenha) {
        req.flash('error_msg', 'As senhas não coincidem.');
        return res.redirect(`/redefinir-senha/${token}`);
    }
    if (!senha || senha.length < 6) {
        req.flash('error_msg', 'A senha deve ter pelo menos 6 caracteres.');
        return res.redirect(`/redefinir-senha/${token}`);
    }

    try {
        // Implemente a lógica de encontrar usuário pelo token, verificar expiração e atualizar senha
        // const usuario = await Usuario.findOne({ where: { resetPasswordToken: token, resetPasswordExpires: { [Sequelize.Op.gt]: Date.now() } } });
        // if (!usuario) {
        //     req.flash('error_msg', 'Token de redefinição de senha inválido ou expirado.');
        //     return res.redirect('/esqueci-senha');
        // }
        // usuario.senha = await bcrypt.hash(senha, 10);
        // usuario.resetPasswordToken = null;
        // usuario.resetPasswordExpires = null;
        // await usuario.save();

        console.log(`(Simulação) Senha para token ${token} seria redefinida.`);
        req.flash('success_msg', 'Sua senha foi redefinida com sucesso! Você já pode fazer o login.');
        res.redirect('/login');
    } catch (error) {
        console.error("Erro em postResetPassword:", error);
        req.flash('error_msg', 'Erro ao tentar redefinir sua senha.');
        res.redirect(`/redefinir-senha/${token}`);
    }
};