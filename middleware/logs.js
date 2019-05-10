const fs = require('fs');

const today = new Date();
const dateStamp = `${today.getDate()}-${today.getMonth() + 1}-${today.getUTCFullYear()}`;
const timeStamp = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;

function logTraces(req, res, next) {
    const { payload, url, method } = req;
    if (payload) {
        const { login } = payload;
        const trace = `${login} [${new Date(Date.now()).toJSON()}] ${method} ${url} \n`;
        fs.appendFile(`./logs/activate-logs-[${dateStamp}-${timeStamp}].log`, trace, (err) => {
            if (err) {
                console.log('login fs error', err);
            }
        });
    }
    next();
}

module.exports = {
    logTraces,
};