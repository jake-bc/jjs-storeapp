const Store = require("../models/Store");

Store.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User Not Found";
      return res.status(404).json(errors);
    }})

    