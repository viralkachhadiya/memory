import Joi from 'joi';

export const validate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        logoUrl: Joi.string().required(),
        eventDate: Joi.date().format('YYYY-MM-DD').required(),
        tagId: Joi.number().required(),
        userId: Joi.number().required()
    });

    return schema.validate(data, { abortEarly: false, allowUnknown: true });
};