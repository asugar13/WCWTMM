var mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
var Schema = mongoose.Schema;

/**
 * Note that the database was loaded with data from a JSON file into a
 * collection called gillers.
 */
var UserSchema = new Schema(
    {
        username: {
            type: String, required: true
        },
        password: {
            type: String, required: true
        },
        email: {
            type: String, required: true
        },
        amount: {
            type: Number, default: 0
        },
        country: {
          type: String, required: false
        },
        memo: {
          type: String, default: " "
        },
        reset_password_token: {
          type: String
        },
        reset_password_expires: {
          type: Date
        }
    },
    {
        collection: 'users'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/usersdb', {useNewUrlParser: true});

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
User = mongoose.model('User', UserSchema);


module.exports = {
    User: User,
  };
