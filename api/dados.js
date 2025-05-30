const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz0TxWwPfyrwJ_l6GnSK3jspRKhN2vv_CCCi3OqAFaSX0kbd0qf8e46kT96cKTTMJKi/exec');

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Erro ao buscar dados do Google Apps Script', detalhes: errorText });
    }

    // Pega o JSON direto
    const data = await response.json();

    // Libera CORS pro seu frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
