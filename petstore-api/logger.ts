import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "petstore-api" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: "/usr/api/data/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "/usr/api/data/combined.log",
    }),
  ],
});

//
// Log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);
