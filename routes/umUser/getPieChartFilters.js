const axios = require("axios");

module.exports = {
  method: "get",
  path: "/pie-chart-information",
  handler: async (ctx) => {
    const { data } = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );

    let faculties = [];
    let courseTypes = [];
    let majors = [];
    let years = [];

    data.map((user) => {
      if (!faculties.includes(user.facultad_filial))
        faculties.push(user.facultad_filial);
      if (!courseTypes.includes(user.tipo_de_curso))
        courseTypes.push(user.tipo_de_curso);
      if (!majors.includes(user.carrera)) majors.push(user.carrera);
      if (!years.includes(user.ano_de_estudio)) years.push(user.ano_de_estudio);
    });

    ctx.body = {
      faculties,
      courseTypes,
      majors,
      years,
    };
    ctx.status = 200;
  },
};
