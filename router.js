const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

//Session false is to tell not to use cookie based authentication
const requireAuth = passport.authenticate("jwt", {session: false});
const requireSingIn = passport.authenticate("local", {session: false});

module.exports = function (app) {
    app.get("/", requireAuth, function (req, res) {
        res.send({
           hi: "there"
        });
    });
    app.post("/signin", requireSingIn, Authentication.signin);
    app.post("/signup", Authentication.signup);
};