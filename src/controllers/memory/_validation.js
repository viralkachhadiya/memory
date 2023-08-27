import Joi from 'joi';

export const validate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        logoUrl: Joi.string().required(),
        eventDate: Joi.string().pattern(/^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/).required(),
        userId: Joi.number().required(),
        tag: Joi.array().items(Joi.number().required()).min(1).required(),
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};