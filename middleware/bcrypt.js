const bcr = require("bcryptjs");
let hashedPassword = await bcr.hash();
bcr.hash("password", 10).then((data) => console.log(data));
