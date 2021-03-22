const checkStudentVerification = (student, usersAD) => {
  let normalizedUserSIGENU = (student.nombre + student.apellidos)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("")
    .toLowerCase();

  const verifiedUser = usersAD.find((userAD) => {
    let normalizedUserAD = userAD.nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("")
      .toLowerCase();

    return (
      normalizedUserSIGENU === normalizedUserAD ||
      student.identidad === userAD.identidad
    );
  });
  return verifiedUser;
};

module.exports = checkStudentVerification;
