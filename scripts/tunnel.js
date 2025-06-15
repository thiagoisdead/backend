const ngrok = require('ngrok');

(async function() {
  try {
    const url = await ngrok.connect(3001); 
  } catch (err) {
    console.error('Erro ao abrir o túnel:', err);
  }
})();
