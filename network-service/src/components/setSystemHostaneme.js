const { exec } = require('child_process');

const CurrentHostname = () => {
    return new Promise((resolve, reject) => {
        exec("hostnamectl --static", (error, stdout, stderr) => {
            if (error) {
                reject(`Erro: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout);
        });
    }); 
};

const NewHostname = (hostname) => {
    return new Promise((resolve, reject) => {
        exec(`sudo nmcli general hostname ${hostname}`, (error, stdout, stderr) => {
            if (error) {
                reject(`Erro: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`stderr: ${stderr}`);
                return;
            }
            resolve("Hostname Updated");
        });
    }); 
};

module.exports = {
    CurrentHostname,
    NewHostname
};