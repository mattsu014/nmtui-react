const { exec } = require('child_process');

const CreateNewConnection = (SSI, password, type) => {
    if(type == "Wifi") {
        return new Promise((resolve, reject) => {
            exec(`nmcli device wifi connect ${SSI} password ${password}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Erro: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                    return;
                }
                
                resolve("Wifi Connected");
            });
        });
    } else if(type == "Ethernet") {
        return new Promise((resolve, reject) => {
            exec(`nmcli connection add type ethernet ifname eth0 con-name ${SSI}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Erro: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`stderr: ${stderr}`);
                    return;
                }
                
                resolve("Ethernet Connected");
            });
        });
    }
};