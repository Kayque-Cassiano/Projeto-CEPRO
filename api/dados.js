const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyB_6YhGFGWImn7N7AkNZcngYxHfOJ3BmxhIDisUXhf5CPUEAvS-Fg7-WhF9Vq-j8WG/exec');

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script', detalhes: errorText });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
