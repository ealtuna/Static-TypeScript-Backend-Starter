import "reflect-metadata"; // this shim is required for annotations
import { createExpressServer } from "routing-controllers";

import { Application } from "express";
import compression from "compression";  // compresses requests
import session, { MemoryStore } from "express-session";
import { SESSION_SECRET } from "./util/secrets";

// Controllers (route handlers)
import { ParseControllerV1 } from "./controllers/parse/parse-controller-v1";
import { ParseControllerV2 } from "./controllers/parse/parse-controller-v2";

// Create Express server
const app: Application = createExpressServer({
    controllers: [ParseControllerV1, ParseControllerV2],
    classTransformer: true
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MemoryStore()
}));

export default app;
