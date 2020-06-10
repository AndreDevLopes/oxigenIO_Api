const express = require("express");
const Router = express.Router();
const passport = require("passport");

//Declarações dos controladores relacionados a usuário
const UserController = require("../src/controllers/UserController");


//rotas para usuarios

    //-------------------------------------------------------------------------------------//
        //rota para criar usuario
        Router.route("/store").post(UserController.store);

    //-----------------------------------------------------------------------------------//

    //rota para login de usuario com atenticação local do banco de dados da SigMed
        //rota para autenticação do login usando o passport com estrategia local

      
        Router
        .route("/login")
        .post( 
          passport.authenticate("local", { session: false }),UserController.secret
        ); 

    //----------------------------------------------------------------------------------------------//
        //rota para logout 
        Router.get("/logout", (req, res) => {
            req.logout();
            res.redirect("/");
        }); 
    //--------------------------------------------------------------------------------------------//    

module.exports = Router;