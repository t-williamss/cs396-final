"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    tags: [{
        type: Schema.Types.String,
        required: true
    }],
    age_group: {
        type: Schema.Types.String
    }
});

ModuleSchema.statics.create = function(obj) {
    const Module = mongoose.model("Module", ModuleSchema);
    const modules = new Module();
    modules.title = obj.title;
    modules.description = obj.description;
    modules.tags = obj.tags;
    modules.age_group = obj.age_group;
    return modules;
}

module.exports = mongoose.model("Module", ModuleSchema);
