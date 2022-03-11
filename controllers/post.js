'use strict'
const Post = require('../models/post')

module.exports.create = async (req, res) => {
  try {
    const body = req.body
    const newPost = new Post(body)
    await newPost.save()
    res.status(201).json({message: `Post: ${newPost.firstName} ${newPost.lastName} successfully created`})
  } catch (error) {
    res.status(500).json({ 
      message: `Some think wrong Post: ${body.title} can't create`
    })
  }
}

module.exports.post = async(req, res) => {
  try {
    const id = req.params.id
    const foundPost = await Post.findById({_id: id})
    res.status(200).json(foundPost.toJSON())
  } catch (error) {
    res.status(404).json({ message: 'Post not found!' })
  }
}

module.exports.list = async(req, res) => {
  try {
    let foundPostes = await Post.find({})
    res.status(200).json(foundPostes) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.update = async (req, res) => {
  try {
    const _id = req.params.id
    const data = req.body
    Post.updateOne({ _id }, { ...data }, (err, result) => {
      if (err) {
        throw new Error(err)
      } else {
        res.status(200).json({ id: _id, message: 'Post successfully updated!' })
      }
    }) 
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.deletePost = async (req, res) => {
  try {
    const _id = req.params.id
    const result = await Post.deleteOne({_id})
    if (result.deletedCount) {
      res.status(200).json({message: `Post ${_id} successfully deleted`})
    } else {
      res.status(404).json({message: `Somethink wrong, Post can't delete`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
