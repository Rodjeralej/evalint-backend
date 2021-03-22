const axios = require("axios");

module.exports = {
  method: "get",
  path: "/getGroupStats",
  handler: async (ctx) => {
    /* const first = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Primero'"
      )
    );
    const second = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Segundo'"
      )
    );
    const third = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Tercero'"
      )
    );
    const fourth = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Cuarto'"
      )
    );
    const fiveth = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Quinto'"
      )
    );
    const sixth = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Sexto'"
      )
    );
    const entryLevel = await axios.get(
      encodeURI(
        "http://directoriounico.umcc.cu/api/getData.php?&f=json&t=SIGENU&opt=count&c=grupo&w=ano_de_estudio='Preparatoria'"
      )
    );

    ctx.body = [
      {
        name: "Primero",
        value: parseInt(first.data[0].count),
      },
      {
        name: "Segundo",
        value: parseInt(second.data[0].count),
      },
      {
        name: "Tercero",
        value: parseInt(third.data[0].count),
      },
      {
        name: "Cuarto",
        value: parseInt(fourth.data[0].count),
      },
      {
        name: "Quinto",
        value: parseInt(fiveth.data[0].count),
      },
      {
        name: "Preparatoria",
        value: parseInt(entryLevel.data[0].count),
      },
      {
        total:
          parseInt(first.data[0].count) +
          parseInt(second.data[0].count) +
          parseInt(third.data[0].count) +
          parseInt(fourth.data[0].count) +
          parseInt(fiveth.data[0].count) +
          parseInt(sixth.data[0].count) +
          parseInt(entryLevel.data[0].count),
      },
    ];
    */
    ctx.body = [
      {
        name: "Primero",
        value: 10,
      },
      {
        name: "Segundo",
        value: 20,
      },
      {
        name: "Tercero",
        value: 15,
      },
      {
        name: "Cuarto",
        value: 40,
      },
      {
        name: "Quinto",
        value: 30,
      },
      {
        name: "Sexto",
        value: 30,
      },
      {
        name: "Preparatoria",
        value: 25,
      },
    ];

    ctx.status = 200;
  },
};
