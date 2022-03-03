const Post = require('../models/post')

// need add validator for all controllers
module.exports.create = async (req, res) => {
  const body = req.body
  try {
    const newPost = new Post(body)
    await newPost.save()
    res.status(201).json({message: `Post: ${newPost.firstName} ${newPost.lastName} successfully created`})
  } catch (error) {
    console.log('Error Create Post', error.message)
    res.status(500).json({ 
      message: `Some think wrong Post: ${body.title} can't create`
    })
  }
}


module.exports.post = async(req, res) => {
  const id = req.params.id
  try {
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
  const _id = req.params.id
  const data = req.body
  try {
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
