const mongoose = require("mongoose");

const Parcel = require("../models/parcel");
const Sender = require("../models/sender");

module.exports = {
    getParcelsFromSender: function (req, res) {
        let senderId = req.params.senderId;

        Parcel.find({ sender: senderId })
            .populate("sender")
            .exec(function (err, actors) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.json(actors);
                }
            });
    },
    createOne: function (req, res) {
        let newParcelDetails = req.body;
        newParcelDetails._id = new mongoose.Types.ObjectId();
        let parcel = new Parcel(newParcelDetails);
        parcel.save(function (err) {
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(parcel);
            }
        });
    },
    deleteOne: function (req, res) {
        Parcel.findOneAndRemove({ _id: req.body.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    updateOne: function (req, res) {
        Parcel.findOneAndUpdate(
            {
                _id: req.body.id,
            },
            {
                address: req.body.address
            },
            function (err, parcel) {
                if (err) return res.status(400).json(err);
                if (!parcel) return res.status(404).json();
                res.json(parcel);
            }
        );
    },

    getParcelsByAddress: function (req, res) {
        let address = req.query.address;

        Parcel.find({ address: address }, function (err, parcels) {
            if (err) return res.status(400).json(err);

            res.json(parcels);
        });
    },
};
