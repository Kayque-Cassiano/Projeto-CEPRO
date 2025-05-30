fetch('https://script.google.com/macros/s/AKfycbwOi8JnLWXAe4oWCDLRYiGeSBEDJWEj2uG1XY8qbNQlFoZ3bsTQe5vUn-yn4knX5ZjY/exec')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const container = document.getElementById('tabela-container');
    container.innerHTML = '';

    const tabela = document.createElement('table');
    tabela.style.borderCollapse = 'collapse';
    tabela.style.width = '100%';

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
  .catch(error => console.error('Erro ao carregar os dados:', error));
