const User = require("../model/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");

signToken = (user) => {
    return JWT.sign(
      {
        iss: "CodeWorkr",
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      JWT_SECRET
    );
  };

 module.exports = {

//-----------------------------------------------------------------------------------//
            async store(req, res) {

                const user_email = await User.findOne({
                where: {
                    email: req.body.email,
                },
                });


                if (user_email) {
                return res.status(400).json({
                    erro: true,
                    messege: "already exists user with this email",
                });
                }


                var valores = req.body;
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(valores.password, salt);
                valores.password = hash;
                console.log(valores);
                const { name, email, password, img , telephone , type_user } = valores;

                const user = await User.create({
                name,
                email,
                password,
                img,
                telephone,
                type_user,
                });

                return res.json(user);
            }, //metodo usado para criar usuarios
  //----------------------------------------------------------------------//
        secret: async (req, res, next) => {
          const token = signToken(req.user);
        
          res.status(200).json({ token ,
            messege: "successful authentication",
            email: req.user.dataValues.email,
          });
        },
  //-----------------------------------------------------------------------//

  }