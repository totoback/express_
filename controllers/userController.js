const connection = require("./dbConnect");
const userDB = {
  getUsers: (cb) => {
    connection.query("SELECT * FROM mydb.user;", (err, data) => {
      if (err) throw err;
      console.log(data);
      cb(data);
    });
  },
};

module.exports = userDB;
