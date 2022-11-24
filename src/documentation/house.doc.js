const resident = {
  name: "Floor",
  phone: "43456432",
  age: "24",
};

const house = [
  {
    address: "Florence",
    roomsCounter: 4,
    owner: resident,
    residents: [resident],
  },
];

const listHouse = {
  tags: ["House"],
  description: "list all the houses",
  responses: {
    200: {
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
  },
};

const houseRouteDoc = {
  "/house": {
    get: listHouse,
  },
};

module.exports = houseRouteDoc;
