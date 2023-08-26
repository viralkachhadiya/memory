import Joi from 'joi';

export const validate = (data) => {
    const schema = Joi.object({
        tag: Joi.string().required()
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};