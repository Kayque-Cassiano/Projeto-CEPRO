fetch('/api/dados')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados recebidos:', data);

    const container = document.getElementById('tabela-container');
    container.innerHTML = '';  // Limpa conteúdo anterior

    const tabela = document.createElement('table');
    tabela.style.borderCollapse = 'collapse';
    tabela.style.width = '80%';

    const tbody = document.createElement('tbody');

    const totalDados = data.length;
    const colunas = 10;
    const linhas = Math.ceil(totalDados / colunas);

    for (let i = 0; i < linhas; i++) {
      const tr = document.createElement('tr');

      for (let j = 0; j < colunas; j++) {
        const td = document.createElement('td');
        td.style.border = '1px solid #000';
        td.style.padding = '4px';
        td.style.textAlign = 'center';

        const index = i * colunas + j;

        if (index < totalDados) {
          const item = data[index];
          td.textContent = `${item.numero} - ${item.status}`;

          // Se status for "Indisponivel" pinta o fundo de vermelho
          if (item.status.toLowerCase() === 'indisponivel') {
            td.style.backgroundColor = '#f44336'; // vermelho forte
            td.style.color = 'white'; // texto branco para contraste
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
