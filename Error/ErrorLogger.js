import winston from 'winston'

export const logger = winston.createLogger({
    transports:[
        new winston.transports.File({
            filename:"error.log",
            level:"error"
        }),
        new winston.transports.File({
            filename:"information.log",
            level:"info"
        })
    ]
})