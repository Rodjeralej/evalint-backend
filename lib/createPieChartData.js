const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const fs = require("fs");

const checkStudentVerification = require("./checkStudentVerification");

const buildPieChartOrganizationData = () => {
  const dataSIGENU = JSON.parse(localStorage.getItem("SIGENU.json"));
  const dataAD = JSON.parse(localStorage.getItem("AD.json"));

  let faculties = 0;
  let cum = 0;
  let sum = 0;

  dataSIGENU.forEach((student) => {
    if (student.facultad_filial[0] === "F") {
      if (checkStudentVerification(student, dataAD)) faculties++;
    } else if (student.facultad_filial[0] === "C") {
      if (checkStudentVerification(student, dataAD)) cum++;
    } else {
      if (checkStudentVerification(student, dataAD)) sum++;
    }
  });
  const pieChartData = { faculties, cum, sum };

  fs.writeFile(
    "./scratch/pieChartData.json",
    JSON.stringify(pieChartData, null, 4),
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = buildPieChartOrganizationData;
