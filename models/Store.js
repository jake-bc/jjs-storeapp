const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  client_id: {
    type: String
  },
  secret: {
    type: String
  },
  access_token: {
    type: String
    },
  scope: {
    type: String
  },
  user_id: {
      type: String
    },
    user_email: {
      type: String
  },
  context: {
    type: String
  }
});

module.exports = Store = mongoose.model("Stores", StoreSchema);