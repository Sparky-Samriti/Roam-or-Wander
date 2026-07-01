const mongoose = require("mongoose");
let initData = require("./data");
const Listing = require("../modals/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main().then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});
    initData = initData.data.map((obj) => ({...obj , owner : "6a2e765ad358e800dc2b8ef8" }));
    await Listing.insertMany(initData);
    console.log("Data was initialized");
}

initDB();