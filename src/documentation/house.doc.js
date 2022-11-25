const resident = {
  name: "Floor",
  phone: "43456432",
  age: "24",
};

const house = {
  address: "Florence",
  roomsCounter: 4,
  owner: resident,
  residents: [resident],
};

const listOfHouses = [
  {
    address: "Florence",
    roomsCounter: 4,
    owner: resident,
    residents: [resident],
  },
];

const postHouseExample = [
  {
    address: "Florence",
    roomsCounter: 4,
    ownerId: "637e3fdf43232b79d5b12c54",
  },
];

const listHouse = {
  summary: "Get all houses",
  tags: ["House"],
  description: "list all the houses",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            example: {
              listOfHouses,
            },
          },
        },
      },
    },
    500: {
      description: "Unexpected condition",
    },
  },
};

const postHouse = {
  tags: ["House"],
  summary: "add a new house",
  description: "Post a new house",
  requestBody: {
    description: "post a house in the DB",
    content: {
      "application/json": {
        schema: {
          example: {
            postHouseExample,
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
              house,
            },
          },
        },
      },
    },
    400: {
      description: "Content cannot be empty!!",
    },
    404: {
      description: "ownerId should be in the content!",
    },
    500: {
      description: "Unexpected condition",
    },
  },
};

const addResident = {
  tags: ["House"],
  summary: "Adding a resident to an existing house",
  description: "Post a new house",
  parameters: [
    {
      name: "Id",
      in: "path",
      description: "ID of the house",
      required: "true",
    },
  ],
  requestBody: {
    description: "post a house in the DB",
    content: {
      "application/json": {
        schema: {
          example: {
            residentId: "637e3fdf43232b79d5b12c54",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: {
            example: {
              house,
            },
          },
        },
      },
    },
    400: {
      description: "resident id is needed!",
    },
    404: {
      description: "There is no room available!",
    },
    405: {
      description: "cannot find house",
    },
    500: {
      description: "Unexpected condition",
    },
  },
};

const deleteHouse = {
  tags: ["House"],
  summary: "Deleting a house",
  description: "remove a house from the system",
  parameters: [
    {
      name: "Id",
      in: "path",
      description: "House Id to be deleted",
      required: "true",
    },
  ],
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: {
            example: {
              house,
            },
          },
        },
      },
    },
    400: {
      description: "resident id is needed!",
    },
    500: {
      description: "Unexpected condition",
    },
  },
};

const removeResident = {
  tags: ["House"],
  summary: "Removing a resident from a house",
  description: "Deleting the resident from the house",
  parameters: [
    {
      name: "Id",
      in: "path",
      description: "ID of the house",
      required: "true",
    },
  ],
  requestBody: {
    description: "remove the resident from the house in the DB",
    content: {
      "application/json": {
        schema: {
          example: {
            residentId: "637e3fdf43232b79d5b12c54",
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "successful operation",
      content: {
        "application/json": {
          schema: {
            example: {
              house,
            },
          },
        },
      },
    },
    400: {
      description: "resident id is needed!",
    },
    405: {
      description: "cannot find house",
    },
    500: {
      description: "unexpected condition",
    },
  },
};

const houseRouteDoc = {
  "/house": {
    get: listHouse,
    post: postHouse,
  },
  "/house/{Id}": {
    delete: deleteHouse,
  },
  "/house/addResident/{Id}": {
    patch: addResident,
  },
  "/house/removeResident/{id}": {
    patch: removeResident,
  },
};

module.exports = houseRouteDoc;
