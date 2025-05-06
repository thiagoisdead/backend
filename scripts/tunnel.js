const ngrok = require('ngrok');

(async function() {
  try {
    const url = await ngrok.connect(3001); 
    console.log(`Tunnel aberto em: ${url}`);
  } catch (err) {
    console.error('Erro ao abrir o túnel:', err);
  }
})();
