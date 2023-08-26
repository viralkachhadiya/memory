import Joi from 'joi';

export const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email().label('Email')
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};