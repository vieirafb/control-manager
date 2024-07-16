import { celebrate, Joi, Segments } from 'celebrate';

const list = celebrate(
    {
        [Segments.QUERY]: Joi.object({
            fields: Joi.array().items(
                Joi.object({
                    data: Joi.string().trim().required(),
                    sortable: Joi.boolean().falsy(0, 'false').truthy(1, 'true').default(true),
                    searchable: Joi.boolean().falsy('0').truthy('1').default(true),
                }),
            ).min(1).required(),
            sort: Joi.array().items(
                Joi.object({
                    column: Joi.number().integer().min(0).required(),
                    direction: Joi.string().pattern(/^asc|desc$/, 'directions').default('asc'),
                }),
            ),
            search: Joi.object({
                value: Joi.string().trim().required(),
                regex: Joi.boolean().default(false),
            }),
            length: Joi.number().integer().positive().min(1).default(50),
            offset: Joi.number().integer().min(0).default(0),
        }),
    },
    { abortEarly: false },
);

const show = celebrate(
    {
        [Segments.PARAMS]: Joi.object({
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }),
    },
    { abortEarly: false },
);

const store = celebrate(
    {
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().trim().min(1).required(),
            type: Joi.string().trim().required(),
            price: Joi.number().precision(2).greater(0).required(),
        }),
    },
    { abortEarly: false }
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
    { abortEarly: false }
);

const destroy = celebrate(
    {
        [Segments.PARAMS]: {
            id: Joi.string().length(24).regex(/[0-9a-f]/).required(),
        }
    },
    { abortEarly: false }
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
    { abortEarly: false }
)

export default {
    list,
    show,
    store,
    update,
    destroy,
    stockMovement,
};
