const express = require("express");
const mongoose = require("mongoose");

const parcels = require("./routers/parcel");
const senders = require("./routers/sender");

const app = express();
app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/POMS", function (err) {
    if (err) {
        return console.log("Mongoose connection error:", err);
    }
    console.log("Connect Successfully");
});

// Parcel
app.get("/parcels", parcels.getParcelsByAddress);
app.post("/parcels", parcels.createOne);
app.delete("/parcels", parcels.deleteOne);
app.put("/parcels", parcels.updateOne);

// Sender 
app.post("/sender", senders.createOne);
app.put("/sender/addParcelToSender", senders.addParcelToSender);
app.put("/sender/updateSenderNameById", senders.updateSenderNameById);
app.get("/sender/:senderId", parcels.getParcelsFromSender);
app.delete("/sender", senders.deleteOne);
