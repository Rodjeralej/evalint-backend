const fetch = require("node-fetch");
const args = require("yargs").argv;

/*
respose:
{
    "code": 200,
    "dn": "CN=Alejandro Yanes De la Cruz,
    OU=INF-32,
    OU=FCEI - Facultad de Ciencias Económicas e Informáticas,
    OU=Estudiantes,
    OU=Usuarios,
    DC=umcc,
    DC=cu"
}
 */
function checkUserCredentials(login, password) {
  const body = { user_name: login, password };
  return fetch("http://10.34.8.190:3301/ldap/login", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "x-umcc-apikey": "5c40d63c2c1b5f0021cc6c60",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

function checkIfUserExists(login) {
  const body = { user_name: login };
  return fetch("http://10.34.8.190:3301/ldap/user", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "x-umcc-apikey": "5c40d63c2c1b5f0021cc6c60",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

function parseResponse(dn) {
  const props = dn.split(",");
  return props.map((element) => {
    const aux = element.split("=");
    return aux[1];
  });
}

function createUserFromLDAP(ldapResponse, login) {
  const data = parseResponse(ldapResponse.dn);
  const name = data[0];
  const isEstudent =
    data.findIndex((element) => element.toLowerCase() === "estudiantes") !== -1;
  const emailSuffix = isEstudent ? "est.umcc.cu" : "umcc.cu";
  const email = `${login}@${emailSuffix}`;
  return {
    login,
    name,
    email,
    authorities: {
      admin: false,
    },
  };
}

const mockFuntions = {
  checkUserCredentials: () => {
    // return Promise.resolve({
    //     code: 200,
    //     "dn": "CN=Alejandro Yanes De la Cruz, OU=INF-32, OU=FCEI - Facultad de Ciencias Económicas e Informáticas,OU=Estudiantes,OU=Usuarios, DC=umcc,DC=cu"
    // });
    return Promise.resolve({ code: 400 });
  },
  checkIfUserExists: () => {
    return Promise.resolve({
      code: 200,
      dn:
        "CN=Alejandro Yanes De la Cruz, OU=INF-32, OU=FCEI - Facultad de Ciencias Económicas e Informáticas,OU=Estudiantes,OU=Usuarios, DC=umcc,DC=cu",
    });
  },
};

module.exports = {
  checkUserCredentials:
    args.env === "prod"
      ? checkUserCredentials
      : mockFuntions.checkUserCredentials,
  checkIfUserExists,
  createUserFromLDAP,
};
