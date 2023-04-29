const { app, dialog} = require("electron");
const fs = require("fs");
const isDev = require("electron-is-dev");
const path = require("path");
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const { join} = require("path");

const salt = "@Yh7>hX}ew3hy3";
const userAccountsFile = isDev ?
    path.join(app.getAppPath(), "userAccounts.json") :
    path.join(app.getAppPath(), "../../userAccounts.json");

function hashMasterPassword(password) {
  return Base64.stringify(SHA256(salt + password));
}

function encryptUserPasswords(userAccounts, AESKey) {
  for (let userAccount of userAccounts) {
      userAccount.password = CryptoJS.AES.encrypt(userAccount.password, AESKey).toString();
  }
  userAccounts.unshift({masterPassword: hashMasterPassword(AESKey)});
  return userAccounts;
}

function decryptUserPasswords(AESKey) {
  let userAccounts = JSON.parse(fs.readFileSync(userAccountsFile, "utf-8"));
  for (let userAccount of userAccounts) {
    if (!('masterPassword' in userAccount)) {
      userAccount.password = CryptoJS.AES.decrypt(userAccount.password, AESKey).toString(CryptoJS.enc.Utf8);
    }
  }
  return userAccounts;
}

module.exports.hash = (password) => {
  return hashMasterPassword(password);
}

module.exports.updateAccounts = (accounts, AESKey) => {
  fs.writeFileSync(userAccountsFile, JSON.stringify(encryptUserPasswords(accounts, AESKey)));
};

module.exports.getAccounts = (key) => {
  return decryptUserPasswords(key);
};

module.exports.firstRun = () => {
  try {
    return JSON.parse(fs.readFileSync(userAccountsFile, "utf-8"));
  } catch (e) {
    return null;
  }
}

module.exports.createFile = (masterPassword) => {
  fs.writeFileSync(userAccountsFile, JSON.stringify([{masterPassword: hashMasterPassword(masterPassword)}]));
}

module.exports.getIconPath = () => {
  const iconPath = dialog.showOpenDialogSync({
    title: 'Select Account Icon',
    defaultPath: isDev ? join(app.getAppPath() + "/public/icons") : join(app.getAppPath() + "../../../icons"),
    filters: [{ name: 'Icons', extensions: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'icns', 'gif']}],
    properties: [
      'openFile',
    ]
  }).join("").split("TuffPass\\")[1];
  return isDev ? join("../" + iconPath) : join("../../../" + iconPath);
}