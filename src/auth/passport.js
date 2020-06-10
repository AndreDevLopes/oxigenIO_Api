const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const Bluebird = require("bluebird");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      }, // parametros passado na requisição que serao uasado na validação
      (email, password, done) => {
        //console.log("esse e o email:" + email);
        User.findOne({
          where: { email: email },
        }).then((usuario) => {
          //console.log(usuario);
          if (!usuario) {
            return done(null, false, {
              message: "essa conta não existe!",
            });
          } // se o usuario nao exitir
          bcrypt.compare(password, usuario.password, (erro, batem) => {
            if (batem) {
              // se as senha forem iguais retorna o usuario
              return done(null, usuario);
            } else {
              //retorna que nao existe usuario
              return done(null, false, {
                message: "senha incorreta",
              });
            }
          }); //função para compara as senha criptografadas com o bcrypt
        }); //busca no banco de dados o usuario aparti dos dados de requição email e senha
      }
    )
  ); //estrategia local capara o login

  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  }); //o serializeUser determina quais dados do objeto de usuário devem ser armazenados na sessão

  passport.deserializeUser((id, done) =>
    Bluebird.resolve()
      .then(async () => {
        const user = await User.findOne({
          where: { id: id },
        });

        done(null, user);
      })
      .catch(done)
  ); //deserializeUser corresponde à chave do objeto de usuário que foi dada à done
};