const axios = require("axios").default;
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/centers-information",
  handler: async (ctx) => {
    const { field } = ctx.request.params;
    /*const { data } = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );*/
    const pieCHartData = JSON.parse(localStorage.getItem("pieChartData.json"));
    const { faculties, cum, sum } = pieCHartData;

    ctx.body = [
      {
        name: "Facultades",
        value: faculties,
      },
      {
        name: "CUM",
        value: cum,
      },
      {
        name: "SUM",
        value: sum,
      },
    ];
    ctx.status = 200;
  },
};
