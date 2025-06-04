fetch('/api/respostas')
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) {
      console.error('Dados não são um array:', data);
      return;
    }

    const porVendedor = {};
    const comprovante = { Sim: 0, Não: 0 };
    const porData = {};

    data.forEach(item => {
      const vendedor = item['quem vendeu'] || 'Desconhecido';
      const comp = (item['tem comprovante?'] || '').toLowerCase();
      const dataHoraRaw = item['data e hora'] || '';
      let dataHora;

      try {
        dataHora = new Date(dataHoraRaw).toLocaleDateString();
      } catch (e) {
        console.warn('Data inválida:', dataHoraRaw);
        dataHora = 'Data inválida';
      }

      // Vendas por vendedor
      porVendedor[vendedor] = (porVendedor[vendedor] || 0) + 1;

      // Comprovante Sim/Não
      if (comp.includes('sim')) comprovante.Sim++;
      else comprovante.Não++;

      // Vendas por data
      porData[dataHora] = (porData[dataHora] || 0) + 1;
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

    // Gráfico 2: Comprovante Sim/Não
    new Chart(document.getElementById('comprovanteSimNao'), {
      type: 'pie',
      data: {
        labels: ['Sim', 'Não'],
        datasets: [{
          data: [comprovante.Sim, comprovante.Não],
          backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)']
        }]
      },
      options: {
        responsive: true
      }
    });

    // Gráfico 3: Vendas por data
    new Chart(document.getElementById('vendasPorData'), {
      type: 'line',
      data: {
        labels: Object.keys(porData),
        datasets: [{
          label: 'Vendas',
          data: Object.values(porData),
          fill: false,
          borderColor: 'rgba(153, 102, 255, 0.7)'
        }]
      },
      options: {
        responsive: true
      }
    });
  })
  .catch(err => console.error('Erro ao carregar dados:', err));
