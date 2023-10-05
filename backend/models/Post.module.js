import mongoose from 'mongoose';
const {Schema} = mongoose;

const postSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
    description: String
}, {
    timestamps: true
})

const Post = mongoose.model('Posts', postSchema);

export default  Post;