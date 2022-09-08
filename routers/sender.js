const mongoose = require("mongoose");

const Parcel = require("../models/parcel");
const Sender = require("../models/sender");

module.exports = {
    createOne: function (req, res) {
        let newSenderDetails = req.body;
        newSenderDetails._id = new mongoose.Types.ObjectId();
        let sender = new Sender(newSenderDetails);
        sender.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(sender);
            }
        });
    },

    addParcelToSender: function (req, res) {
        Sender.findOne({ _id: req.body.senderId }, function (err, sender) {
            if (err) return res.status(400).json(err);
            if (!sender) return res.status(404).json();

            Parcel.findOne({ _id: req.body.parcelId }, function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();

                sender.parcels.push(parcel._id);
                sender.save(function (err) {
                    if (err) return res.status(400).json(err);
                    res.json(sender);
                });
            });
        });
    },

    deleteOne: function (req, res) {
        Sender.findOneAndDelete(
            {
                _id: req.body.id,
            },
            function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            }
        );
    },

    updateSenderNameById: function (req, res) {
        Sender.findOneAndUpdate(
            {
                _id: req.body.id,
            },
            {
                name: req.body.name,
            },
            function (err, sender) {
                if (err) return res.status(400).json(err);
                if (!sender) return res.status(404).json();
                res.json(sender);
            }
        );
    },
};