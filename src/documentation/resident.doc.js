const resident = {
  name: "Floor",
  phone: "43456432",
  age: "24",
};

const listOfResident = [
  {
    name: "Floor",
    phone: "43456432",
    age: "24",
  },
];
const listResident = {
  summary: "Get all residents",
  tags: ["Resident"],
  description: "list all the residents",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            example: {
              listOfResident,
            },
          },
        },
      },
    },
    500: {
      description: "unexpected condition",
    },
  },
};

const postResident = {
  tags: ["Resident"],
  summary: "add a new resident",
  description: "Post a new resident",
  requestBody: {
    description: "post a resident in the DB",
    content: {
      "application/json": {
        schema: {
          example: {
            resident,
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            example: {
              resident,
            },
          },
        },
      },
    },
    400: {
      description: "Content cannot be empty!",
    },
    500: {
      description: "unexpected condition",
    },
  },
};

const residentRouteDoc = {
  "/resident": {
    get: listResident,
    post: postResident,
  },
};

module.exports = residentRouteDoc;
