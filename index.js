const express = require("express"); // import thư viện express đã cài ở trên
const app = express(); // app ở đây đại diện cho cái dự án nodejs mà mình sẽ làm việc xuyên suốt

const database = require('./src/config/database')
database.connect()

app.use("/", require("./src/route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // Cho app lắng nghe địa chỉ localhost (127.0.0.1) trên port 3000
  console.log(`Example app listening on port ${PORT}`);
});
