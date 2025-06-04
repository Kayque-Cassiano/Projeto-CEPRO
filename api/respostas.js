const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbynF6HlS7e39WSGq_iFQbpV8JZ4pyrsXe6E2opF6ghkNaHpG3JELZtevmcpqYhkDJfJ/exec';
    console.log('Buscando dados de:', url);

    const response = await fetch(url);
    console.log('Status da resposta:', response.status);

    const text = await response.text();
    console.log('Resposta bruta:', text);

    if (!response.ok) {
      console.error('Erro HTTP:', response.status, text);
      return res.status(500).json({ error: 'Erro ao buscar dados', detalhes: text });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error('Erro ao parsear JSON:', jsonErr, text);
      return res.status(500).json({ error: 'Erro ao parsear JSON', detalhes: text });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    console.error('Erro inesperado:', err);
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
