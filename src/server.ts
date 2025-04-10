import { Server } from "http";
import app from "./app";
const port = 5000;

const main = () => {
  const server: Server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();
