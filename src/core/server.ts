import dotenv, { DotenvConfigOptions } from "dotenv";
import express from "express";
import path from "path";

export class Server {

    private env: boolean;
    readonly express: express.Express;

    constructor () {
        this.express = express();
        dotenv.config({ path: path.join(__dirname, ".env") });
      }

      private static () {
        const publicPath = path.join(__dirname, "../../../public");

        this.express.use(express.static(publicPath));
        this.express.get("*", (_req: express.Request, res: express.Response) => res.sendFile(path.join(publicPath, "index.html")));
      }

    environment (config: DotenvConfigOptions) {
      dotenv.config(config);
      this.env = true;
    }

    async start () {

      if (!this.env) dotenv.config();
        this.static();
        this.express.listen(process.env.APP_PORT, () =>
          console.log(`Aplicação está rodando na porta ${process.env.APP_PORT}`)
        );

      }

}

export default new Server();
