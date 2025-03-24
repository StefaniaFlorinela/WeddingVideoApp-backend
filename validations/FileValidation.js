const Joi = require('joi');

const FileSchema = Joi.object({
  fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required()
});

const validateFile = (file) => {
  return FileSchema.validate(file, { abortEarly: false })
};

module.exports = { validateFile };