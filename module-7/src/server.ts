import "dotenv/config";

import app from "./app";
import appConfig from "./config";
import connectDB from "./database/db";

const port = appConfig.port;

const main = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main();
