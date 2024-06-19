import {celebrate, Joi, Segments} from 'celebrate';

const show = celebrate(
    {
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }),
    },
    {abortEarly: false},
);

const store = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().trim().min(1).required(),
            type: Joi.string().trim().required(),
            price: Joi.number().precision(2).greater(0).required(),
        }),
    },
    {abortEarly: false}
);

const update = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().trim().min(1).required(),
            type: Joi.string().trim().required(),
            price: Joi.number().precision(2).greater(0).required(),
        }),
        [Segments.PARAMS]: {
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }
    },
    {abortEarly: false}
);

const destroy = celebrate(
    {
        [Segments.PARAMS]: {
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }
    },
    {abortEarly: false}
);

const stockMovement = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            movementType: Joi.string().trim().lowercase().required(),
            quantity: Joi.number().greater(0).required(),
            entryDatetime: Joi.string().isoDate(),
            comments: Joi.string().trim(),
        }),
        [Segments.PARAMS]: {
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }
    },
    {abortEarly: false}
)

export default {
    show,
    store,
    update,
    destroy,
    stockMovement,
};
