const Employees = require('../models/employees')

module.exports.create = async (req, res) => {
  const body = req.body
  try {
    const newEmployees = new Employees(body)
    await newEmployees.save()
    res.status(201).json({message: `Employees: ${newEmployees.firstName} ${newEmployees.lastName} successfully created`})
  } catch (error) {
    res.status(500).json({ 
      message: `Some think wrong Employees: ${body.firstName} ${body.lastName} can't create`
    })
  }
}

module.exports.employee = async(req, res) => {
  const id = req.params.id
  try {
    const foundEmployee = await Employees.findById({_id: id})
    if (foundEmployee) {
      res.status(200).json(foundEmployee.toJSON())
    } else {
      res.status(404).json({message: `Employee with id ${id}not found `})
    }
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.get = async(req, res) => {
  const id = req.params.id
  try {
    const foundEmployee = await Employees.findById({_id: id})
    if (foundEmployee) {
      res.status(200).json(foundEmployee.toJSON())
    } else {
      res.status(404).json({message: `Employee with id ${id} not found `})
    }
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.list = async(req, res) => {
  try {
    let foundEmployees = await Employees.find({})
    res.status(200).json(foundEmployees) 
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

module.exports.update = async (req, res) => {
  const _id = req.params.id
  const data = req.body
  try {
    Employees.findOneAndUpdate({ _id }, { ...data },{
      rawResult: true
    }, (err, result) => {
      if (!err && result.value) {
        res.status(200).json({ id: _id, message: 'Employee successfully updated!' })
      } else {
        res.status(404).json({message: `Employee can't update, check your params `})
      }
    }) 
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.deleteEmployee = async (req, res) => {
  const _id = req.params.id
  try {
    const result = await Employees.deleteOne({_id})
    if (result.deletedCount) {
      res.status(200).json({message: `Employee ${_id} successfully deleted`})
    } else {
      res.status(404).json({message: `Somethink wrong, Employee can't delete`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
