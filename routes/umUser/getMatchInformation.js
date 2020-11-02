const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/active-directory-match",
  handler: async (ctx) => {
    const total = localStorage.getItem("matchInformationTotal");
    const registeredId = localStorage.getItem("matchInformationRegistered");
    const matchInformation = {
      total,
      registeredId,
    };

    ctx.body = matchInformation;
    ctx.status = 200;
  },
};
