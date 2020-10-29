const axios = require("axios").default;
const { checkIfUserExists } = require("../../service/ldap-auth");

module.exports = {
  method: "get",
  path: "/:field",
  handler: async (ctx) => {
    const { field } = ctx.request.params;
    const {
      data: { data },
    } = await axios.get(
      "http://directoriounico.umcc.cu/api/getData.php?f=json&t=SIGENU"
    );

    const ldapUser = await checkIfUserExists("gretell.umpierrez");
    console.log(ldapUser);
    const counter = {};
    const filter = data.map((user) => {
      if (!(user[field] in counter) && user.estado === "Activo") {
        counter[user[field]] = 0;
      } else counter[user[field]] += 1;
    });
    counterArray = [];
    Object.keys(counter).map((key) => {
      counterArray.push(counter[key]);
    });

    ctx.body = {
      counter,
      counterArray,
    };
    ctx.status = 200;
  },
};
