var mongoose = require("mongoose");

var parcelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "Sender"
    },
    address: {
        type: String,
        required: true,
        validate: {
            validator: function (senderValue) {
                return senderValue.length > 3;
            },
        },
    },
    weight: {
        type: Number,
        required: true,
        min: 0,
    },
    fragile: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Parcel", parcelSchema);