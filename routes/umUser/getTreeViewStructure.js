const fs = require("fs");

module.exports = {
  method: "get",
  path: "/getTreeStructure",
  handler: async (ctx) => {
    const treeData = fs.readFileSync("./scratch/TreeViewData.json", "utf-8");
    const treeViewData = JSON.parse(treeData);

    ctx.body = treeViewData;
    ctx.status = 200;
  },
};
