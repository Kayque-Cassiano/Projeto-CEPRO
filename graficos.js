fetch('/api/respostas')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) {
      console.error('Dados não são um array:', data);
      return;
    }

    const porVendedor = {};
    const comprovante = { Sim: 0, Não: 0 };
    const porComprador = {};

    data.forEach(item => {
      const vendedor = item['quem vendeu'] || 'Desconhecido';
      const comp = (item['tem comprovante?'] || '').toLowerCase();
      const comprador = item['quem comprou'] || 'Não informado';

      // Vendas por vendedor
      porVendedor[vendedor] = (porVendedor[vendedor] || 0) + 1;

      // Comprovante Sim/Não
      if (comp.includes('sim')) comprovante.Sim++;
      else comprovante.Não++;

      // Vendas por comprador
      porComprador[comprador] = (porComprador[comprador] || 0) + 1;
    });

    // Gráfico 1: Vendas por vendedor
    new Chart(document.getElementById('vendasPorVendedor'), {
      type: 'bar',
      data: {
        labels: Object.keys(porVendedor),
        datasets: [{
          label: 'Vendas',
          data: Object.values(porVendedor),
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        }]
      },
      options: {
        responsive: true
      }
    });

    // Gráfico 3: Compradores
    new Chart(document.getElementById('compradores'), {
      type: 'pie',
      data: {
        labels: Object.keys(porComprador),
        datasets: [{
          label: 'Quantidade de Compras',
          data: Object.values(porComprador),
          backgroundColor: 'rgba(255, 159, 64, 0.7)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });

  })
  .catch(err => console.error('Erro ao carregar dados:', err));