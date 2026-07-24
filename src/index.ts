import express from 'express';
import { setupApp } from './app-setup.js';
import { SETTINGS } from './settings/config.js';

const app = express();
setupApp(app);

app.listen(SETTINGS.PORT, () => {
    console.log(`Blog platform app listening on port ${SETTINGS.PORT}`);
});
