const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const userAccounts = path.join(app.getPath("appData"), "../Local/Programs/TuffPass/userAccounts.json");

module.exports.updateAccounts = (accounts) => {
    fs.writeFileSync(userAccounts, JSON.stringify(accounts));
}

module.exports.getAccounts = (err) => {
    if (err) throw err;
    return JSON.parse(fs.readFileSync(userAccounts, 'utf-8'));
}
