const { Router } = require('express')
const router = Router()
const { create, get, list, update } = require('../controllers/employees')
const { createEmployees } = require('../validators/employees')




/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                     firstName:
 *                       type: string
 *                       description: The employee's first name.
 *                       example: Sylvester
 *                     lastName:
 *                       type: string
 *                       description: The employee's last name.
 *                       example: Stallone
 *                     photo: 
 *                       type: string
 *                       description: Path to the employee's photo 
 *                       example: /avatar/4el2kvl34d8a
 *                     position:
 *                       type: string
 *                       description: The employee's position.
 *                       example: JavaScript Developer
 *                     from:
 *                       type: string
 *                       description: The employee's working from date.
 *                       example: 02.09.2020
 *                     to:
 *                       type: string
 *                       description: If employee's working now.
 *                       example: 15.02.2022
 *     responses:
 *       201:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message about creating employee.
 *                   example: Employees Jahongil Eshonov successfully created
*/
router.post('/create', createEmployees, create)

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee's ID.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 621cc5d3499f564b93075cc5
 *                     firstName:
 *                       type: string
 *                       description: The employee's first name.
 *                       example: Sylvester
 *                     lastName:
 *                       type: string
 *                       description: The employee's last name.
 *                       example: Stallone
 *                     photo: 
 *                       type: string
 *                       description: Path to the employee's photo 
 *                       example: /avatar/4el2kvl34d8a
 *                     position:
 *                       type: string
 *                       description: The employee's position.
 *                       example: JavaScript Developer
 *                     from:
 *                       type: string
 *                       description: The employee's working from date.
 *                       example: 02.09.2020
 *                     to:
 *                       type: string
 *                       description: If employee's working now.
 *                       example: Current
 *                     createdAt:
 *                       type: string
 *                       description: Schema created date .
 *                       example: 2022-02-28T12:53:39.544Z
 *                     updatedAt:
 *                       type: string
 *                       description: Schema last updated date .
 *                       example: 2022-02-28T12:53:39.544Z
*/
router.get('/:id', get)



/**
 * @swagger
 * /api/employees/list:
 *   post:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A List employee..
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 621cc5d3499f564b93075cc5
 *                     firstName:
 *                       type: string
 *                       description: The employee's first name.
 *                       example: Sylvester
 *                     lastName:
 *                       type: string
 *                       description: The employee's last name.
 *                       example: Stallone
 *                     photo: 
 *                       type: string
 *                       description: Path to the employee's photo 
 *                       example: /avatar/4el2kvl34d8a
 *                     position:
 *                       type: string
 *                       description: The employee's position.
 *                       example: JavaScript Developer
 *                     from:
 *                       type: string
 *                       description: The employee's working from date.
 *                       example: 02.09.2020
 *                     to:
 *                       type: string
 *                       description: If employee's working now.
 *                       example: Current
 *                     createdAt:
 *                       type: string
 *                       description: Schema created date .
 *                       example: 2022-02-28T12:53:39.544Z
 *                     updatedAt:
 *                       type: string
 *                       description: Schema last updated date .
 *                       example: 2022-02-28T12:53:39.544Z
*/
router.post('/list', list)


router.put('/update/:id', update)


 
module.exports = router

