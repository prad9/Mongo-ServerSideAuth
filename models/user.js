const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = new Schema({
   email: { type: String, unique: true, lowercase: true },
   password: String
});

//On save hook, encrypt password
//before saving a model, run this fn
userSchema.pre("save", function(next) {
    //get access to the user model
    const user = this;

    //generate salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        //hash our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }

            //overwrite plain text pass with encrypted pass
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
     if (err) {
         return callback(err);
     }

     callback(null, isMatch);
  });
};

const ModelClass = mongoose.model("user", userSchema);

module.exports = ModelClass;