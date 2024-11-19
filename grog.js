#!/usr/bin/env node
// This file should be run as a service to remove data that exceeded from settings.js `expire` variables.
const settings = require("./settings");
const { File, Text, Link, User_Data, User_Link, User_File } = require('./models');


function list_expire_entries(entrie) {
    return entrie.findAll({}).then(entries => {
        let __expired_files = []
        for (let row of entries) {
            console.log(Date.now() + " - " + (Date.parse(row.createdAt) + settings.file_expire_days))
            if (Date.now() >= Date.parse(row.createdAt) + settings.file_expire_days) {
                __expired_files.push(row);
            }
        }
        return __expired_files;
    })
}
