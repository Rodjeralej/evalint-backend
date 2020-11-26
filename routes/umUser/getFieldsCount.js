const axios = require("axios").default;
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/fieldsCount/:field",
  handler: async (ctx) => {
    const { field } = ctx.request.params;
    /*const { data } = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );*/
    const data = JSON.parse(localStorage.getItem("SIGENU.json"));

    ctx.assert(data, 404, "User information can not be fetched");
    const counter = {};
    data.map((user) => {
      if (!(user[field] in counter) && user.estado === "Activo") {
        counter[user[field]] = 0;
      } else counter[user[field]] += 1;
    });

    ctx.body = {
      counter,
    };

    ctx.status = 200;
  },
};
