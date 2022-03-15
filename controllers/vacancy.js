'use strict'
const Vacancy = require('../models/vacancy')
const Candidate = require('../models/candidate')
const { sendCv } =  require('../service/email')


module.exports.create = async(req, res) => {
  try {
    const body = req.body
    const newVac = new Vacancy(body)
    await newVac.save()
    res.status(201).json({message: `Vacancy: ${newVac.title} successfully created`})
  } catch (error) {
    res.status(500).json({message: `Some think wrong Vacancy: ${body.title} can't create`})
  }
}

module.exports.vacancy = async(req, res) => {
  try {
    const id = req.params.id
    const foundVacancy = await Vacancy.findById({_id: id})
    res.status(200).json(foundVacancy.toJSON())
  } catch (error) {
    res.status(404).json({ message: 'Vacancy not found!' })
  }
}

module.exports.listActive = async(req, res) => {
  try {
    let foundVacancy = await Vacancy.find({ "isActive": { "$in": [true] } })
    res.status(200).json(foundVacancy) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.list = async(req, res) => {
  try {
    let foundVacancy = await Vacancy.find()
    res.status(200).json(foundVacancy) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.update = async (req, res) => {
  try {
    const _id = req.params.id
    const data = req.body
    Vacancy.findOneAndUpdate({ _id }, { ...data },{
      rawResult: true
    }, (err, result) => {
      if (!err && result.value) {
        res.status(200).json({ id: _id, message: 'Vacancy successfully updated!' })
      } else {
        res.status(404).json({message: 'Somethink wrong plase check your params'})
      }
    }) 
  } catch (error) {
    res.status(500).json(error)
  }
}


module.exports.deleteVacancy = async (req, res) => {
  try {
    const _id = req.params.id
    const result = await Vacancy.deleteOne({_id})
    if (result.deletedCount) {
      res.status(200).json({message: `Vacancy ${_id} successfully deleted`})
    } else {
      res.status(404).json({message: `Somethink wrong, Vacancy can't delete`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.respond = async (req, res) => {
  try {
    const reqBody = req.body
    const foundVac = await Vacancy.findById({ _id: reqBody.id })
    if (foundVac) {
      const newCandidate = new Candidate(reqBody)
      newCandidate.save(async (err, _) => {
        if (!err) {
          sendCv({title: foundVac.title, ...reqBody}, (err, result) => {
            if(!err) {
              res.status(200).json({message: 'Success'})
            } else {
              res.status(500).json({message: 'Somethink wrong, please try again'})
            }
          })
        }else {
          throw new Error(err)
        }
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
