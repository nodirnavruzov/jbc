const Vacancy = require('../models/vacancy')

// need add validator for all controllers
module.exports.create = async(req, res) => {
  const body = req.body
  try {
    const newVac = new Vacancy(body)
    await newVac.save()
    res.status(201).json({message: `Vacancy: ${newVac.title} successfully created`})
  } catch (error) {
    console.log('Error Create Vacancy', error.message)
    res.status(500).json({message: `Some think wrong Vacancy: ${body.title} can't create`})
  }
}


module.exports.vacancy = async(req, res) => {
  const id = req.params.id
  try {
    const foundVacancy = await Vacancy.findById({_id: id})
    console.log(foundVacancy)
    res.status(200).json(foundVacancy.toJSON())
  } catch (error) {
    res.status(404).json({ message: 'Vacancy not found!' })
  }
}


module.exports.listActive = async(req, res) => {
  try {
   
    let foundVacancy = await Vacancy.find({ "isActive": { "$in": [true] } })
    res.json(foundVacancy) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.list = async(req, res) => {
  try {
    let foundVacancy = await Vacancy.find()
    res.json(foundVacancy) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.update = async (req, res) => {
  const _id = req.params.id
  const data = req.body
  try {
    Vacancy.updateOne({ _id }, { ...data }, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json({ id: _id, message: 'Vacancy successfully updated!' })
      }
    }) 
  } catch (error) {
    res.status(500).json(error)

  }
}
