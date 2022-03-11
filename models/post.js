'use strict'
const {model, Schema} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

postSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.__v
  return obj
}



const Post = module.exports = model("Post", postSchema)
