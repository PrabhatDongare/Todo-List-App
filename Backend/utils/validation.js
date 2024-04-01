const { body } = require('express-validator')

exports.createValidator = [
    body('name', 'Invalid name length').isLength({min:3, max:20}),
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 4 characters').isLength({ min: 4 }),
]

exports.loginValidator = [
    body('email', 'Invalid entry, Enter email').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 2 }),
]

