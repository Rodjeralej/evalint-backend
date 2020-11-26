const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const fs = require("fs");

const verifyUsersWithAD = () => {
  const usersAD = JSON.parse(localStorage.getItem("AD.json"));
  const usersSIGENU = JSON.parse(localStorage.getItem("SIGENU.json"));

  let counter = {};
  const courseTypes = [
    "Curso por Encuentros",
    "Enseñanza a Distancia",
    "Curso Regular Diurno",
    "Curso Diurno",
  ];

  courseTypes.map((course) => {
    let filteredUser = usersSIGENU.filter(
      (user) => user.tipo_de_curso === course
    );
    let count = 0;
    let total = filteredUser.length;
    console.log(total);
    filteredUser.map((user) => {
      let normalizedUserSIGENU = (user.nombre + user.apellidos)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
        .toLowerCase();

      usersAD.find((userAD) => {
        let normalizedUserAD = userAD.nombre
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .split(" ")
          .join("")
          .toLowerCase();
        if (
          normalizedUserSIGENU === normalizedUserAD ||
          user.identidad === userAD.identidad
        ) {
          count++;
        }
      });
    });
    console.log(count);
    counter[course] = {
      count,
      total,
    };
  });
  const courseCounters = JSON.stringify(counter);

  fs.writeFile("./scratch/courseCounters.json", courseCounters, (err) => {
    if (err) throw err;
  });
};

module.exports = verifyUsersWithAD;
