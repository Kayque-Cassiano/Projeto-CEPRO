const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwOi8JnLWXAe4oWCDLRYiGeSBEDJWEj2uG1XY8qbNQlFoZ3bsTQe5vUn-yn4knX5ZjY/exec');

    console.log('Status:', response.status);

    const text = await response.text();
    console.log('Resposta bruta:', text);

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script', detalhes: text });
    }

    const data = JSON.parse(text);  // Usando parse para debugar

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    console.error('Erro backend:', err);
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
