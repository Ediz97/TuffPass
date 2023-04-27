const { app } = require("electron");
const fs = require("fs");
const path = require("path");
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

const salt = "@Yh7>hX}ew3hy3";
const userAccountsFile = path.join(
  app.getPath("appData"),
  "../Local/Programs/TuffPass/userAccounts.json"
);

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