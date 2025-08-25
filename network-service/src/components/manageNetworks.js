const { exec } = require('child_process');

const scanWifiNetworks = () => {
  return new Promise((resolve, reject) => {
    exec('nmcli -t -f IN-USE,BSSID,SSID,MODE,CHAN,RATE,SIGNAL,BARS,SECURITY device wifi list', (error, stdout, stderr) => {
      if (error) {
        reject(`Erro: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
        return;
      }
      
      const networks = parseNetworks(stdout);
      resolve(networks);
    });
  });
};

const parseNetworks = (stdout) => {
  const lines = stdout.trim().split('\n');
  const networks = [];
  
  lines.forEach(line => {
    if (!line.trim()) return;
    
    const columns = line.split(':');
    
    if (columns.length >= 14) {
      const network = {
        inUse: columns[0] === '*',
        bssid: `${columns[1]}:${columns[2]}:${columns[3]}:${columns[4]}:${columns[5]}:${columns[6]}`,
        ssid: columns[7],
        mode: columns[8],
        channel: columns[9],
        rate: columns[10],
        signal: columns[11],
        bars: columns[12],
        security: columns[13] || ''
      };

      if (network.ssid && network.ssid.trim() !== '' && network.ssid !== '--') {
        networks.push(network);
      }
    }
  });
  
  return networks;
};

(async () => {
  try {
    const networks = await scanWifiNetworks();
    console.log(networks);
  } catch (error) {
    console.error(error);
  }
})();