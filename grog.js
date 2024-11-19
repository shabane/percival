#!/usr/bin/env node
// This file should be run as a service to remove data that exceeded from settings.js `expire` variables.
const settings = require("./settings");
const { File, Text, Link, User_Data, User_Link, User_File } = require('./models');
const fs = require("fs");


function list_expire_entries(entrie) {
    return entrie.findAll({}).then(entries => {
        let __expired_files = []
        for (let row of entries) {
            if (Date.now() >= Date.parse(row.createdAt) + settings.file_expire_days) {
                __expired_files.push(row);
            }
        }
        return __expired_files;
    })
}


function delete_expire_entries(entries, is_file = false) {
    let filePromises = [];
    for (let entrie of entries) {
        if (is_file) {
            fs.rmdir(entrie.path, (err) => {
                settings.debug(err.message)
            });
        }

        filePromises.push(new Promise((res, rej) => {
            entrie.destroy({
                where: {
                    id: entrie.id,
                }
            }).then(data => settings.debug(data)).catch(err => settings.debug(err.message));
        }));
    }
    return filePromises
}
