const fs = require("fs");

module.exports = {
  method: "get",
  path: "/getCourseTypesInfo",
  handler: async (ctx) => {
    const courseData = fs.readFileSync(
      "./scratch/courseCounters.json",
      "utf-8"
    );
    const data = JSON.parse(courseData);

    ctx.body = data;
    ctx.status = 200;
  },
};
