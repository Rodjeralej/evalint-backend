const axios = require("axios");
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

module.exports = {
  method: "get",
  path: "/active-directory-match/:faculty/:courseType/:major/:year",
  handler: async (ctx) => {
    const { faculty, courseType, major, year } = ctx.request.params;
    /* const { data } = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );
    const usersAD = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=AD"
    );
    */

    const data = JSON.parse(localStorage.getItem("SIGENU.json"));
    const usersAD = {
      data: JSON.parse(localStorage.getItem("AD.json")),
    };

    let filteredUsers = data.filter((user) => user.facultad_filial === faculty);
    filteredUsers = filteredUsers.filter(
      (user) => user.tipo_de_curso === courseType
    );
    filteredUsers = filteredUsers.filter((user) => user.carrera === major);
    filteredUsers = filteredUsers.filter(
      (user) => user.ano_de_estudio === year
    );

    let verified = 0;
    let notVerified = 0;

    filteredUsers.map((userSIGENU) => {
      let normalizedUserSIGENU = (userSIGENU.nombre + userSIGENU.apellidos)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
        .toLowerCase();
      usersAD.data.map((userAD) => {
        let normalizedUserAD = userAD.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .split(" ")
          .join("")
          .toLowerCase();
        if (normalizedUserSIGENU === normalizedUserAD) {
          if (userAD.identidad) verified++;
          else notVerified++;
        }
      });
    });

    ctx.body = {
      verified,
      notVerified,
    };
    ctx.status = 200;
  },
};
