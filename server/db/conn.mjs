import {MongoClient} from "mongodb";

const connectionString = process.env.DATABASE || "";
console.log(connectionString)
const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
    console.log("Connected to database successfully")
} catch (e) {
    console.error(e);
}

let db = conn.db("f1");


export default db; 


