const health = {
  uptime: 8.679843834,
  message: "OK",
  timestamp: 1669392622416,
};
const getHealth = {
  summary: "Get API health",
  tags: ["Health"],
  description: "Provides an indication about the health of the API",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            example: {
              health,
            },
          },
        },
      },
    },
    503: {
      description: "Internal Server Error",
    },
  },
};

const healthRouteDoc = {
  "/healthcheck": {
    get: getHealth,
  },
};

module.exports = healthRouteDoc;
