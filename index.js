require("dotenv").config();
const app = require("./server"); // server.js exports the express app

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));