fetch('/api/dados')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('tabela-container');
    container.innerHTML = '';

    const tabela = document.createElement('table');
    const tbody = document.createElement('tbody');

    const totalDados = data.length;
    const colunas = 10;
    const linhas = Math.ceil(totalDados / colunas);

    for (let i = 0; i < linhas; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < colunas; j++) {
        const td = document.createElement('td');
        const index = i * colunas + j;

        if (index < totalDados) {
          const item = data[index];
          td.textContent = `${item.numero} ${item.status}`;

          if (item.status.toLowerCase() === 'indisponível') {
            td.classList.add('indisponivel');
          }
        } else {
          td.textContent = '-';
        }

        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }

    tabela.appendChild(tbody);
    container.appendChild(tabela);
  })
  .catch(error => {
    console.error('Erro ao carregar os dados:', error);
    const container = document.getElementById('tabela-container');
    container.innerHTML = '<p style="color:red;">Erro ao carregar os dados.</p>';
  });
