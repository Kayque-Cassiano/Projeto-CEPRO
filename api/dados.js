const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbwOi8JnLWXAe4oWCDLRYiGeSBEDJWEj2uG1XY8qbNQlFoZ3bsTQe5vUn-yn4knX5ZjY/exec';
    console.log('Buscando dados em:', url);

    const response = await fetch(url);
    console.log('Status do Google Apps Script:', response.status);

    const text = await response.text();
    console.log('Resposta bruta do GAS:', text);

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script', detalhes: text });
    }

    const data = JSON.parse(text); // Vai lançar erro se não for JSON válido
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    console.error('Erro no backend:', err);
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
