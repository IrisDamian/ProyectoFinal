const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWT_SECRET = 'clave'; 

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new JWTStrategy(jwtOptions, (jwtPayload, done) => {
  // Aquí puedes verificar el token JWT y cargar los datos del usuario si es válido
  
  return done(null, jwtPayload);
}));

module.exports = passport;

