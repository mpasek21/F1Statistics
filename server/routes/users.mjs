import express from "express"
import {User, validate} from "../models/user.mjs"
import db from "../db/conn.mjs"
import {ObjectId} from "mongodb"
import bcrypt from "bcrypt"


const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let collection = await db.collection("users");
        const {error} = validate(req.body)
        if (error) return res.status(400).send({message: error.details[0].message})
        const user = await collection.findOne({email: req.body.email})
        if (user) return res
            .status(409)
            .send({message: "User with given email already Exist!"})
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        await collection.insertOne({...req.body, password: hashPassword})
        res.status(201).send({message: "User created successfully"})
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})
router.get("/", async (req, res) => {
    //pobranie wszystkich użytkowników z bd:
    User.find().exec()
        .then(async () => {
            const users = await User.find();
            //konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
            res.status(200).send({data: users, message: "Lista użytkowników: "});
        })
        .catch(error => {
            res.status(500).send({message: error.message});
        });
})

router.post("/delete", async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user._id)
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

router.get("/user", async (req, res) => {
    User.findById(req.user._id).exec()
        .then(async () => {
            const user = await User.findById(req.user._id);
            res.status(200).send({data: user, message: "Użytkownik:"});
        })
        .catch(error => {
            res.status(500).send({message: error.message});
        });
})

router.get("/list", async (req, res) => {
    let collection = await db.collection("circuits");
    // let collection = await db().collection("circuits");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("circuits");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/create", async (req, res) => {
    let newDocument = {
        circuidId: req.body.circuidId,
        name: req.body.name,
        location: req.body.location,
        country: req.body.country,
    };
    let collection = await db.collection("circuits");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204)
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            circuidId: req.body.circuidId,
            name: req.body.name,
            location: req.body.location,
            country: req.body.country,
        }
    };

    let collection = await db.collection("circuits");
    //let collection = await db().collection("circuits");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
    const query = {_id: new ObjectId(req.params.id)};

    const collection = db.collection("circuits");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

export default router;