const mongoose = require("mongoose");
const connect = async () => {
  mongoose
    .connect(
      `mongodb+srv://luongminhtien:Aa123456@cluster0.pc9zh5i.mongodb.net/SpendingApp`
    )
    .then(() => {
      console.log("Ket noi database thanh cong");
    })
    .catch((error) => {
      console.log("Ket noi database that bai " + error);
    });
};

module.exports = {connect}
