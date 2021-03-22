const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const fs = require("fs");

const BuildTreeView = () => {
  const dataSIGENU = JSON.parse(localStorage.getItem("SIGENU.json"));

  const matchInformation = JSON.parse(
    localStorage.getItem("matchInformation.json")
  );

  let faculties = {
    id: "root",
    name: "UM",
    matchInformation: {
      total: matchInformation.total,
    },
    children: [],
  };
  //Adding the faculties to the Tree Object
  dataSIGENU.map((user, index) => {
    const findedFaculty = faculties.children.find(
      (obj) => obj.name === user.facultad_filial
    );

    if (!findedFaculty)
      faculties.children.push({
        id: `faculty${index}`,
        name: user.facultad_filial,
        children: [],
        matchInformation: matchInformation.registeredCounter[
          user.facultad_filial
        ]
          ? matchInformation.registeredCounter[user.facultad_filial].counter
          : 0,
        total: matchInformation.registeredCounter[user.facultad_filial]
          ? matchInformation.registeredCounter[user.facultad_filial].total
          : 0,
      });
  });
  //Adding the majors to the Tree Object
  faculties.children.map((obj) => {
    dataSIGENU.map((user, index) => {
      if (user.facultad_filial === obj.name) {
        let filteredMajor = obj.children.find(
          (courseTypeObj) => courseTypeObj.name === user.carrera
        );
        if (!filteredMajor)
          obj.children.push({
            id: `major${index}`,
            name: user.carrera,
            faculty: user.facultad_filial,
            facultyParent: obj.id,
            children: [],
            matchInformation:
              matchInformation.registeredCounter[user.facultad_filial] &&
              matchInformation.registeredCounter[user.facultad_filial][
                user.carrera
              ]
                ? matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ].counter
                : 0,
            total:
              matchInformation.registeredCounter[user.facultad_filial] &&
              matchInformation.registeredCounter[user.facultad_filial][
                user.carrera
              ]
                ? matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ].total
                : 0,
          });
      }
    });
  });
  //Adding the course types to the Tree Object
  faculties.children.map((obj) => {
    obj.children.map((majorsObj) => {
      dataSIGENU.map((user, index) => {
        if (user.facultad_filial === obj.name) {
          if (majorsObj.name === user.carrera) {
            let filteredCourseType = majorsObj.children.find(
              (majorObj) => majorObj.name === user.tipo_de_curso
            );
            if (!filteredCourseType) {
              majorsObj.children.push({
                id: `course-type${index}`,
                name: user.tipo_de_curso,
                children: [],
                matchInformation:
                  matchInformation.registeredCounter[user.facultad_filial] &&
                  matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ] &&
                  matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ][user.tipo_de_curso]
                    ? matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso].counter
                    : 0,
                total:
                  matchInformation.registeredCounter[user.facultad_filial] &&
                  matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ] &&
                  matchInformation.registeredCounter[user.facultad_filial][
                    user.carrera
                  ][user.tipo_de_curso]
                    ? matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso].total
                    : 0,
              });
            }
          }
        }
      });
    });
  });
  //Adding the years to the Tree Object
  faculties.children.map((obj) => {
    obj.children.map((courseTypeObj) => {
      courseTypeObj.children.map((majorObj) => {
        dataSIGENU.map((user, index) => {
          if (user.facultad_filial === obj.name) {
            if (user.carrera === courseTypeObj.name) {
              if (user.tipo_de_curso === majorObj.name) {
                let filteredYear = majorObj.children.find(
                  (yearObj) => user.ano_de_estudio === yearObj.name
                );
                if (!filteredYear)
                  majorObj.children.push({
                    id: `year${index}`,
                    name: user.ano_de_estudio,
                    children: [],
                    routeParams: [
                      user.facultad_filial,
                      user.tipo_de_curso,
                      user.carrera,
                      user.ano_de_estudio,
                    ],
                    matchInformation:
                      matchInformation.registeredCounter[
                        user.facultad_filial
                      ] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso][user.ano_de_estudio]
                        ? matchInformation.registeredCounter[
                            user.facultad_filial
                          ][user.carrera][user.tipo_de_curso][
                            user.ano_de_estudio
                          ].counter
                        : 0,
                    total:
                      matchInformation.registeredCounter[
                        user.facultad_filial
                      ] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso] &&
                      matchInformation.registeredCounter[user.facultad_filial][
                        user.carrera
                      ][user.tipo_de_curso][user.ano_de_estudio]
                        ? matchInformation.registeredCounter[
                            user.facultad_filial
                          ][user.carrera][user.tipo_de_curso][
                            user.ano_de_estudio
                          ].total
                        : 0,
                  });
              }
            }
          }
        });
      });
    });
  });

  const treeViewData = JSON.stringify(faculties, null, 4);

  fs.writeFile("./scratch/treeViewData.json", treeViewData, (err) => {
    if (err) throw err;
    console.log("data was saved");
  });
};

module.exports = BuildTreeView;
