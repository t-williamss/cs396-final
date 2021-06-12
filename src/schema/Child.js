"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    module_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    ordering: {
        type: Schema.Types.Number,
        required: true
    },
    step_title: {
        type: Schema.Types.String,
        required: true
    },
    text: [{
        type: Schema.Types.String,
        required: true
    }],
    image_url: {
        type: Schema.Types.String
    }
});

ChildSchema.statics.create = function(obj) {
    const Child = mongoose.model("Child", ChildSchema);
    const child = new Child();
    child.module_id = obj.module_id;
    child.ordering = obj.ordering;
    child.step_title = obj.step_title;
    child.text = obj.text;
    child.image_url = obj.image_url;
    return child;
}

module.exports = mongoose.model("Child", ChildSchema);

// {
//     "module_id": "6091ca4ef214628d6b9c24c2",
//     "ordering": 1, 
//     "step-title": "Facial Recognition",
//     "text": "Facial recognition is the method of determining the identity of a person using their face. This technology can be used to unlock your phone, automatically tag you in photos, or verify your identity at airports. These systems can introduce new convenience in our lives, but as with much of the convenience technology brings, it comes with a cost. As these technologies become more and more advanced, they put personal privacy at risk. The first step in understanding the risk of facial recognition systems is understanding what they do and how they work. In this learning module, you will learn:",
//     "image_url": "https://pbs.twimg.com/media/D_s5kdTXsAE97Hm?format=jpg&name=medium"
// }