import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";
import job from "./cron.js";

dotenv.config();
configurePassport();
// console.log(process.env.SESSION_SECRET);

job.start();

const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

// The MongoDB session is a way to store session data on the server side using MongoDB as the storage mechanism.
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
store.on("error", (err) => console.log(err));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);

// Passport.js is an authentication middleware for Node.js. The passport.session middleware is used to handle authentication sessions.
app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(process.env.MONGO_URI);
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

// 1. import the necessary packages and modules.
// 2. configure passport authentication.
// 3. start cron job to send a GET request to the URL every 14 minutes to keep the server awake.
// 4. create an express app.
// 5. create an http server using the express app.
// 6. create a MongoDBStore instance. This is used to store the session data in the database.
// 7. configure the session. We use the MongoDBStore instance to store the session data.
// 8. use passport middleware. This is used to initialize passport and session.
// 9. create an ApolloServer instance.
// 10. start the ApolloServer.
// 11. use the ApolloServer instance as middleware.
// 12. serve the frontend files.
// 13. listen to the http server.
// 14. connect to the database.
// 15. log the server ready message.

// Serializing a user: When a user logs in, Passport.js saves the user's ID into the session.
// Deserializing a user: On subsequent requests, Passport.js reads the user's ID from the session and fetches the full user details from the database.
