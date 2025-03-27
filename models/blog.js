const { Schema , model } = require("mongoose")

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    coverImageURL:{
        type: String,
        default: "/images/defaultCoverImage.jpg"
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},{
    timestamps: true
})

const Blog = model("Blog", blogSchema);

module.exports = Blog