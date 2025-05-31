// src/routes/auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// --- IMPORTAÇÕES COM DEBUG ---
// Garanta que o caminho para authControllers está correto
const authController = require('../controller/authControllers');
console.log('DEBUG: authController importado em auth.js:', authController);
if (authController) {
    console.log('DEBUG: authController.getLogin em auth.js:', authController.getLogin);
    console.log('DEBUG: typeof authController.getLogin:', typeof authController.getLogin);
    console.log('DEBUG: authController.login em auth.js:', authController.login);
    console.log('DEBUG: typeof authController.login:', typeof authController.login);
    console.log('DEBUG: authController.getRegister em auth.js:', authController.getRegister);
    console.log('DEBUG: typeof authController.getRegister:', typeof authController.getRegister);
    // Adicione logs para todas as funções do authController usadas aqui...
} else {
    console.error('ERRO FATAL: authController não foi importado corretamente em auth.js!');
}

// Garanta que o caminho para authe (middleware de autenticação) está correto
let ensureAuthenticated, ensureNotAuthenticated;
try {
    const autheMiddleware = require('../middleware/authe');
    console.log('DEBUG: autheMiddleware importado em auth.js:', autheMiddleware);
    if (autheMiddleware) {
        ensureAuthenticated = autheMiddleware.ensureAuthenticated;
        ensureNotAuthenticated = autheMiddleware.ensureNotAuthenticated;
        console.log('DEBUG: ensureAuthenticated em auth.js:', ensureAuthenticated);
        console.log('DEBUG: typeof ensureAuthenticated:', typeof ensureAuthenticated);
        console.log('DEBUG: ensureNotAuthenticated em auth.js:', ensureNotAuthenticated);
        console.log('DEBUG: typeof ensureNotAuthenticated:', typeof ensureNotAuthenticated);
    } else {
        console.error('ERRO FATAL: autheMiddleware não foi importado corretamente ou está vazio em auth.js!');
    }
} catch (e) {
    console.error('ERRO FATAL: Falha ao importar ../middleware/authe.js:', e);
}

// Garanta que o caminho para authValidators está correto
let loginValidationRules = () => (req, res, next) => { console.warn('AVISO: loginValidationRules placeholder usado'); next(); };
let registerValidationRules = () => (req, res, next) => { console.warn('AVISO: registerValidationRules placeholder usado'); next(); };
let validate = (req, res, next) => { console.warn('AVISO: validate placeholder usado'); next(); };
try {
    const validators = require('../middleware/validators/authValidators');
    console.log('DEBUG: validators importados em auth.js:', validators);
    if (validators) {
        loginValidationRules = validators.loginValidationRules || loginValidationRules;
        registerValidationRules = validators.registerValidationRules || registerValidationRules;
        validate = validators.validate || validate;
        console.log('DEBUG: Validadores loginValidationRules:', typeof loginValidationRules);
        console.log('DEBUG: Validadores registerValidationRules:', typeof registerValidationRules);
        console.log('DEBUG: Validadores validate:', typeof validate);
    } else {
        console.warn('AVISO: authValidators não exportou um objeto esperado ou falhou ao carregar.');
    }
} catch (e) {
    console.error('ERRO FATAL: Falha ao importar ../middleware/validators/authValidators.js:', e);
}
// --- FIM DAS IMPORTAÇÕES COM DEBUG ---


// --- ROTAS DE AUTENTICAÇÃO ---

// GET Página de Login
if (ensureNotAuthenticated && typeof ensureNotAuthenticated === 'function' && authController && typeof authController.getLogin === 'function') {
    router.get('/login', ensureNotAuthenticated, authController.getLogin);
} else {
    console.error('ERRO CRÍTICO: Funções de callback para GET /login estão indefinidas! Verifique os logs de importação.');
    router.get('/login', (req, res) => res.status(500).send('Erro na configuração da rota GET /login. Verifique o console do servidor.'));
}

// POST Processar Login
if (loginValidationRules && typeof loginValidationRules === 'function' &&
    validate && typeof validate === 'function' &&
    authController && typeof authController.login === 'function' &&
    passport) {
    router.post('/login', loginValidationRules(), validate, (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Erro durante passport.authenticate:', err);
                return next(err);
            }
            if (!user) {
                req.flash('error_msg', info ? info.message : 'Falha na autenticação. Verifique seu email e senha.');
                return res.redirect('/login');
            }
            req.logIn(user, (loginErr) => {
                if (loginErr) {
                    console.error('Erro durante req.logIn:', loginErr);
                    req.flash('error_msg', 'Erro ao tentar estabelecer a sessão.');
                    return next(loginErr);
                }
                return authController.login(req, res, next); // authController.login lida com o redirecionamento
            });
        })(req, res, next);
    });
} else {
    console.error('ERRO CRÍTICO: Funções de callback/middleware para POST /login estão indefinidas!');
    router.post('/login', (req, res) => res.status(500).send('Erro na configuração da rota POST /login. Verifique o console do servidor.'));
}

// GET Página de Cadastro
if (ensureNotAuthenticated && typeof ensureNotAuthenticated === 'function' && authController && typeof authController.getRegister === 'function') {
    router.get('/cadastro', ensureNotAuthenticated, authController.getRegister);
} else {
    console.error('ERRO CRÍTICO: Funções de callback para GET /cadastro estão indefinidas!');
    router.get('/cadastro', (req, res) => res.status(500).send('Erro na configuração da rota GET /cadastro. Verifique o console do servidor.'));
}

// POST Processar Cadastro
if (registerValidationRules && typeof registerValidationRules === 'function' &&
    validate && typeof validate === 'function' &&
    authController && typeof authController.register === 'function') {
    router.post('/cadastro', registerValidationRules(), validate, authController.register);
} else {
    console.error('ERRO CRÍTICO: Funções de callback/middleware para POST /cadastro estão indefinidas!');
    router.post('/cadastro', (req, res) => res.status(500).send('Erro na configuração da rota POST /cadastro. Verifique o console do servidor.'));
}

// GET Logout
if (ensureAuthenticated && typeof ensureAuthenticated === 'function' && authController && typeof authController.logout === 'function') {
    router.get('/logout', ensureAuthenticated, authController.logout);
} else {
    console.error('ERRO CRÍTICO: Funções de callback para GET /logout estão indefinidas!');
    router.get('/logout', (req, res) => res.status(500).send('Erro na configuração da rota GET /logout. Verifique o console do servidor.'));
}

// --- ROTAS DE REDEFINIÇÃO DE SENHA ---
// (verificações de `typeof` omitidas por brevidade, mas idealmente seriam adicionadas como acima)
if (ensureNotAuthenticated && authController) {
    router.get('/esqueci-senha', ensureNotAuthenticated, authController.getForgotPassword);
    router.post('/esqueci-senha', ensureNotAuthenticated, authController.postForgotPassword);
    router.get('/redefinir-senha/:token', ensureNotAuthenticated, authController.getResetPassword);
    router.post('/redefinir-senha/:token', ensureNotAuthenticated, authController.postResetPassword);
} else {
    console.error('ERRO CRÍTICO: Funções/Middlewares para redefinição de senha estão indefinidas!');
}


// ***** NOVA ROTA ADICIONADA PARA /auth/cl-login *****
// Se /auth/cl-login é uma rota que você realmente precisa:
router.get('/auth/cl-login', (req, res) => {
    // Verifique se o usuário está autenticado e qual o seu tipo
    // Esta é apenas uma lógica de exemplo. Você precisará adaptá-la.
    if (req.isAuthenticated() && req.user) {
        console.log('DEBUG: Acesso a /auth/cl-login por usuário autenticado:', req.user.tipo);
        // Exemplo: redirecionar para o perfil ou renderizar uma view específica
        // Dependendo do propósito desta rota 'cl-login'
        if (req.user.tipo === 'aluno') {
            // return res.render('aluno/pagina-cl-login', { user: req.user });
            return res.send(`Página CL Login para Aluno: ${req.user.nomeUsu}`);
        } else if (req.user.tipo === 'professor') {
            // return res.render('professor/pagina-cl-login', { user: req.user });
            return res.send(`Página CL Login para Professor: ${req.user.nomeUsu}`);
        } else {
            return res.send('Página CL Login para usuário autenticado (tipo desconhecido)');
        }
    } else {
        // Se não estiver autenticado, talvez redirecionar para o login normal?
        console.log('DEBUG: Acesso a /auth/cl-login por usuário NÃO autenticado.');
        req.flash('error_msg', 'Você precisa estar logado para acessar esta página.');
        res.redirect('/login');
    }
});
// ***** FIM DA NOVA ROTA *****


module.exports = router;