import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(
      new RegExp('^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$')
    )
    .messages({
      'string.pattern.base':
        'Username must be alphanumeric and can only contain . and _',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be at most 30 characters long',
      'string.empty': 'Username cannot be empty',
      'any.required': 'Username is required',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).+$')
    )
    .messages({
      'string.pattern.base':
        'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
      'string.min': 'Password must be at least 8 characters long',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.ref('password'),
});

export default signupSchema;
