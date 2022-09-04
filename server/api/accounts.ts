import express from "express";
import rateLimit from "express-rate-limit";
import ms from "ms";
import passport from "passport";
import bcrypt from "bcrypt";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";

import db from "../config/databases";

const router: express.Router = express.Router();

router.post(
    "/register",
    rateLimit({
        windowMs: ms("1 hour"),
        max: 1,
        message: "rate-limit-exceeded",
    }),
    (req, res, next) => {
        // Check that values are there and that they're the right type
        if (!req.body.email || !req.body.password || !req.body.username)
            return res.send({ status: 400, message: "missing-parameters" });
        if (
            typeof req.body.email !== "string" ||
            typeof req.body.password !== "string" ||
            typeof req.body.username !== "string"
        )
            return res.send({ status: 400, message: "invalid-parameters" });

        try {
            let { email, password, username } = req.body;

            // Validate that all fields meet the criteria
            if (!validator.isEmail(email)) return res.status(400).send("invalid-email");
            if (password.length < 8 || password.length > 64) return res.status(400).send("invalid-password");
            if (
                username.length < 3 ||
                username.length > 32 ||
                !validator.isAlphanumeric(username, "en-US", { ignore: "." })
            )
                return res.status(400).send("invalid-username");

            // Get values from database and parse them
            db.get("users", async (err: any, users: any) => {
                if (err) {
                    if (err.type == "NotFoundError") {
                        db.put("users", JSON.stringify([]), (err: any) => {
                            console.log(err);
                            if (err) return res.status(500).send("server-error");
                        });
                    }

                    return res.status(500).send("server-error");
                }

                users = JSON.parse(users);

                // Checks if values are in user
                if (users.find((user: any) => user.email.value == email))
                    return res.status(200).send("email-already-in-use");
                if (users.find((user: any) => user.username == username))
                    return res.status(200).send("username-already-in-use");

                // Create and push the user to the db
                const user = {
                    username: username.toLowerCase(),
                    email: {
                        value: email,
                        verified: false,
                    },
                    password: bcrypt.hashSync(password, 10),
                    userID: uuidv4(),
                };

                users.push(user);
                db.put("users", JSON.stringify(users), (err: any) => {
                    if (err) return res.status(500).send("server-error");
                });

                // Login the user
                req.login(user, (err: any) => {
                    if (err) return res.status(500).send("server-error");
                    return res.status(200).send("success");
                });
            });
        } catch (err) {
            res.status(500).send("server-error");
        }
    }
);

router.post(
    "/login",
    rateLimit({
        windowMs: ms("1 hour"),
        max: 10,
        message: "rate-limit-exceeded",
    }),
    (req, res, next) => {
        // Check that values are there and that they're the right type
        if (!req.body.email || !req.body.password) return res.status(400).send("missing-parameters");
        if (typeof req.body.email !== "string" || typeof req.body.password !== "string")
            return res.status(400).send("invalid-parameters");

        try {
            // Auth using passport, see config/auth.ts for more reference on this
            passport.authenticate("local", (err: Error | null, user: any) => {
                if (!user) return res.status(200).send("invalid-credentials");

                // Login the user
                req.logIn(user, (err) => {
                    if (err) return res.status(500).send("server-error");
                    return res.status(200).send("success");
                });
            })(req, res, next);
        } catch (err) {
            return res.status(500).send("server-error");
        }
    }
);

router.get("/logout", (req, res) => {
    // Logout
    if (!req.user) return res.redirect("/");
    req.logout((err: any) => {
        if (err) return res.redirect("/error?code=400");
        res.redirect("/");
    });
});

router.post("/test-fields", (req, res) => {
    // Check that values are there and that they're the right type
    if (!req.body.email || !req.body.username) return res.status(400).send("missing-params");
    if (typeof req.body.email !== "string" || typeof req.body.username !== "string")
        return res.status(400).send("invalid-params");

    let { email, username } = req.body;

    try {
        // Get from db and parse
        db.get("users", async (err: any, users: any) => {
            if (err) {
                if (err.type == "NotFoundError") {
                    db.put("users", JSON.stringify([]), (err: any) => {
                        console.log(err);
                        if (err) return res.status(500).send("server-error");
                    });
                }

                return res.status(500).send("server-error");
            }

            users = JSON.parse(users);

            // Test
            if (users.find((user: any) => user.email.value == email))
                return res.status(200).send("email-already-in-use");
            if (users.find((user: any) => user.username == username))
                return res.status(200).send("username-already-in-use");

            res.status(200).send("success");
        });
    } catch (err) {
        return res.status(500).send("server-error");
    }
});

router.get("/test", (req, res) => {
    db.clear();
    db.put("users", JSON.stringify([]), (err: any) => {
        if (err) return res.status(500).send("server-error");
    });
    return res.send("ok");
});

module.exports = router;
