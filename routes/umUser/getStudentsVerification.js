const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const axios = require("axios");

module.exports = {
  method: "get",
  path: "/students-match/:faculty/:courseType/:major/:year",
  handler: async (ctx) => {
    const usersAD = JSON.parse(localStorage.getItem("AD.json"));
    const { faculty, courseType, major, year } = ctx.request.params;

    /*const usersSigenu = await axios.get(
      encodeURI(
        `http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&c=nombre,apellidos,provincia,municipio,usuario&w=facultad_filial="${faculty}" AND carrera="${major}" AND ano_de_estudio="${year}" AND tipo_de_curso="${courseType}"`
      )
    );
    let tempUser = [];
    usersSigenu.data.map((userSIGENU) => {
      let normalizedUserSIGENU = (userSIGENU.nombre + userSIGENU.apellidos)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
        .toLowerCase();
      let userFounded = usersAD.find((userAD) => {
        let normalizedUserAD = userAD.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .split(" ")
          .join("")
          .toLowerCase();

        return (
          normalizedUserSIGENU === normalizedUserAD ||
          userSIGENU.identidad === userAD.identidad
        );
      });
      if (userFounded)
        tempUser.push({
          name: userSIGENU.nombre,
          lastName: userSIGENU.apellidos,
          province: userSIGENU.provincia,
          zone: userSIGENU.municipio,
          registered: true,
        });
      else
        tempUser.push({
          name: userSIGENU.nombre,
          lastName: userSIGENU.apellidos,
          province: userSIGENU.provincia,
          zone: userSIGENU.municipio,
          registered: false,
        });
    });
    */
    const tempUser = [
      {
        name: "Norberto",
        lastName: "Gonzales Gonzales",
        province: "Matanzas",
        zone: "Perico",
        registered: true,
      },
      {
        name: "Norberto",
        lastName: "Gonzales Gonzales",
        province: "Matanzas",
        zone: "Perico",
        registered: false,
      },
    ];

    ctx.body = tempUser;
    ctx.status = 200;
  },
};
