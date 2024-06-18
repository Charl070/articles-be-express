import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

export class Logger {
    private logger: WinstonLogger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.splat(),
                format.json()
            ),
            defaultMeta: { service: 'user-service' },
            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.simple()
                    )
                }),
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'combined.log' })
            ],
        });
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }

    debug(message: string) {
        this.logger.debug(message);
    }
}