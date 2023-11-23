import Joi from 'joi'

const fullNameSchema = Joi.object({
  firstName: Joi.string().required().messages({ 'any.required': 'First name is required' }),
  lastName: Joi.string().required().messages({ 'any.required': 'Last name is required' }),
});

const addressSchema = Joi.object({
  street: Joi.string().required().messages({ 'any.required': 'Street is required' }),
  city: Joi.string().required().messages({ 'any.required': 'City is required' }),
  country: Joi.string().required().messages({ 'any.required': 'Country is required' }),
});

const ordersSchema = Joi.object({
  productName: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
});

const userValidateSchema = Joi.object({
  userId: Joi.number().required().messages({ 'any.required': 'User ID is required' }),
  username: Joi.string().required().messages({
        'any.required':'Username is required',
        'string.unique':'Username must be unique',
      }),
  password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
  fullName: fullNameSchema,
  age: Joi.number().required().messages({ 'any.required': 'Age is required' }),
  email: Joi.string().required().email().lowercase().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  isActive: Joi.boolean().required().messages({ 'any.required': 'Active status is required' }),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema,
  orders: Joi.array().items(ordersSchema),
});

export default userValidateSchema;