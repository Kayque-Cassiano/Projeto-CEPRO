const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxyZkvJMeJTGyTxMVORjuvQZ1j9MifRJP0_ynFl3dOFx8h5U0Zj-D9Ms4XyJSk16Ktq/exec');

    const text = await response.text();
    console.log('Resposta do GAS:', text);  // Veja exatamente o que está vindo

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script', detalhes: text });
    }

    // Se chegou aqui, tenta converter para JSON
    const data = JSON.parse(text);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}

