'use strict'
const Employees = require('../models/employees')
const { deletePhoto } = require('../utils/photo')
const { verifyToken } = require('../service/token')

module.exports.create = async (req, res) => {
  try {
    let author
    verifyToken(req.token, (err, decoded) => {
      author = decoded.id
    })
    const newEmployees = new Employees({...req.body, author})
    await newEmployees.save()
    res.status(201).json({message: `Employees: ${newEmployees.firstName} ${newEmployees.lastName} successfully created`})
  } catch (error) {
    res.status(500).json({ 
      message: `Some think wrong Employees: ${req.body.firstName} ${req.body.lastName} can't create`
    })
  }
}

module.exports.employee = async(req, res) => {
  try {
    const id = req.params.id
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
  try {
    const id = req.params.id
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
  try {
    const _id = req.params.id
    const data = req.body
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
  try {
    const _id = req.params.id
    const result = await Employees.findOneAndDelete({_id})
    if (result) {
      deletePhoto(result)
      res.status(200).json({message: `Employee ${_id} successfully deleted`})
    } else {
      res.status(404).json({message: `Somethink wrong, Employee can't delete`})
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
