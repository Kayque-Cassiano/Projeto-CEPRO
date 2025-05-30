const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbw8poh-GcRLNHBncQldglDtReKet8bTnNxsYSti_OiJ4iYGNYU-kJJJnfMFccYg-4SW/exec');

    if (!response.ok) {
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
};
