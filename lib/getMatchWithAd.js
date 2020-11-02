const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
const axios = require("axios");

const MatchWithAD = async () => {
  try {
    const usersSIGENU = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );
    const usersAD = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=AD"
    );
    let total = 0;
    let registeredId = 0;
    usersSIGENU.data.map((userSIGENU) => {
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
          total++;
          if (userAD.identidad) registeredId++;
        }
      });
    });

    localStorage.setItem("matchInformationTotal", total);
    localStorage.setItem("matchInformationRegistered", registeredId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = MatchWithAD;
