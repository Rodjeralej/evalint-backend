const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const axios = require("axios");
const user = require("../routes/user");

const usersSIGENU = {
  data: JSON.parse(localStorage.getItem("SIGENU.json")),
};
const usersAD = {
  data: JSON.parse(localStorage.getItem("AD.json")),
};

const MatchWithAD = async () => {
  /* const usersSIGENU = await axios.get(
    "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
  );
  const usersAD = await axios.get(
    "http://directoriounico.umcc.cu/api/getData.php?f=json&t=AD"
  );*/

  let total = 0;
  let registeredId = 0;
  let registeredCounter = {};
  usersSIGENU.data.map((userSIGENU) => {
    let normalizedUserSIGENU = (userSIGENU.nombre + userSIGENU.apellidos)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("")
      .toLowerCase();

    usersAD.data.find((userAD) => {
      let normalizedUserAD = userAD.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
        .toLowerCase();
      if (
        normalizedUserSIGENU === normalizedUserAD ||
        userSIGENU.identidad === userAD.identidad
      ) {
        total++;

        if (!registeredCounter[userSIGENU.facultad_filial]) {
          registeredCounter[userSIGENU.facultad_filial] = {
            counter: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial].counter += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ]
        ) {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ] = {
            counter: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ].counter += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera]
        ) {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera] = {
            counter: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera].counter += 1;
        }
        if (
          !registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera][userSIGENU.ano_de_estudio]
        ) {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera][userSIGENU.ano_de_estudio] = {
            counter: 1,
          };
        } else {
          registeredCounter[userSIGENU.facultad_filial][
            userSIGENU.tipo_de_curso
          ][userSIGENU.carrera][userSIGENU.ano_de_estudio].counter += 1;
        }
      }

      return normalizedUserSIGENU === normalizedUserAD;
    });
  });
  const matchInformation = {
    total,
    registeredCounter,
  };
  localStorage.setItem(
    "matchInformation.json",
    JSON.stringify(matchInformation)
  );
};

module.exports = MatchWithAD;
