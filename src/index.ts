import express from "express";
import {setupApp} from "./app-setup.js";

const PORT = process.env.PORT || 3006;

const app = express();
setupApp(app);

app.listen(PORT, () => {
    console.log(`Blog platform app listening on port ${PORT}`);
});
