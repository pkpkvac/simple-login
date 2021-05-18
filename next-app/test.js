const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://admin:Pa$$word123@cluster0.d168r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("running");
client.connect(async (err) => {
  console.log("connect");
  const collection = client.db("myFirstDatabase").collection("user");
  console.log(await collection.countDocuments());
  // perform actions on the collection object
  client.close();
});
