export default async function handler(req, res) {
  try {
    const url = 'https://script.google.com/macros/s/AKfycbynF6HlS7e39WSGq_iFQbpV8JZ4pyrsXe6E2opF6ghkNaHpG3JELZtevmcpqYhkDJfJ/exec';
    const response = await fetch(url);
    
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Erro ao buscar dados', detalhes: text });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Erro interno', details: err.message });
  }
}
