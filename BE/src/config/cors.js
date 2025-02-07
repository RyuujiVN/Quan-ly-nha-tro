import { WHITELIST_DOMAIN } from '../utils/constant.js'

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true)

        if (WHITELIST_DOMAIN.includes(origin))
            return callback(null, true)

        return callback(new Error('Not allowed by CORS'))
    },
    optionsSuccessStatus: 200,
    credentials: true
}

export default corsOptions