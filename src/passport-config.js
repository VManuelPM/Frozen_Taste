const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail){
    const authenticateUser = async (email,password, done) =>{
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: "No hay un usuario con ese email" });
        }

        try {
            if(await bcrypt.compare(password, user.password)){
                    return done(null,user)
            }else{
                return done(null,false,{message: "Contraseña incorrecta" });
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done)=>{});
    passport.deserializeUser((id, done)=>{});
}

module.exports = initialize;