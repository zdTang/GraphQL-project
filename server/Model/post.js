const mongoose = require("mongoose");
const MSchema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);

const PostSchema = MSchema({
    comment: String,
    userId:String
});


module.exports = mongoose.model("Post",PostSchema);