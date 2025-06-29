// API simulada (JSON-Server)
//const APIURL = "http://localhost:3000/alunos";

// API local (Node.js)
const APIURL = "http://localhost:3001/api/alunos";

// API hospedada (Render.com)
//const APIURL = "https://apis-a0du.onrender.com/api/alunos"; // URL do backend

async function mostraNomes() {
  const tabela = document.getElementById("mytable");
  tabela.innerHTML = ""; // limpa "Loading..."

  try {
    const resultadoApi = await fetch(APIURL);
    const nomesapi = await resultadoApi.json();

    nomesapi.forEach((aluno, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${aluno.nome || ""}</td>
        <td>${aluno.apelido || ""}</td>
        <td>${aluno.curso || ""}</td>
        <td>${aluno.anoCurricular || ""}</td>
        <td>
            <button class="btn btn-sm btn-primary" onclick="showUserEditBox('${aluno._id}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteAluno('${aluno._id}')">Excluir</button>
</td>

      `;
      tabela.appendChild(row);
    });
  } catch (error) {
    tabela.innerHTML = `<tr><td colspan="6">Erro ao carregar dados</td></tr>`;
    console.error("Erro ao buscar nomes:", error);
  }
}

/* Para usar com mongoose
            <button class="btn btn-sm btn-primary" onclick="showUserEditBox('${aluno._id}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteAluno('${aluno._id}')">Excluir</button>

            <button class="btn btn-sm btn-primary" onclick="showUserEditBox('${aluno.id}')">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="deleteAluno('${aluno.id}')">Excluir</button>
*/
function showUserCreateBox() {
  Swal.fire({
    title: "Adicionar Aluno",
    html:
      '<input id="swal-input1" class="swal2-input" placeholder="Nome">' +
      '<input id="swal-input2" class="swal2-input" placeholder="Apelido">' +
      '<input id="swal-input3" class="swal2-input" placeholder="Curso">' +
      '<input id="swal-input4" class="swal2-input" placeholder="Ano Curricular">',
    focusConfirm: false,
    preConfirm: () => {
      const nome = document.getElementById("swal-input1").value;
      const apelido = document.getElementById("swal-input2").value;
      const curso = document.getElementById("swal-input3").value;
      const anoCurricular = document.getElementById("swal-input4").value;

      if (!nome || !apelido || !curso || !anoCurricular) {
        Swal.showValidationMessage("Por favor preencha todos os campos");
        return false;
      }

      // Chamar função para enviar os dados
      return addAluno({ nome, apelido, curso, anoCurricular });
    },
  });
}

async function addAluno(novoAluno) {
  try {
    const resposta = await fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoAluno),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao adicionar aluno");
    }

    Swal.fire("Sucesso!", "Aluno adicionado com sucesso.", "success");
    mostraNomes(); // Atualiza a tabela
  } catch (error) {
    console.error(error);
    Swal.fire("Erro", "Não foi possível adicionar o aluno.", "error");
  }
}


async function deleteAluno(id) {
  const confirmacao = await Swal.fire({
    title: "Tens certeza?",
    text: "Essa ação não poderá ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, apagar!",
    cancelButtonText: "Cancelar"
  });

  if (confirmacao.isConfirmed) {
    try {
      const resposta = await fetch(`${APIURL}/${id}`, {
        method: "DELETE"
      });

      if (!resposta.ok) {
        throw new Error("Erro ao apagar aluno");
      }

      Swal.fire("Apagado!", "O aluno foi removido com sucesso.", "success");
      mostraNomes(); // Atualiza a tabela
    } catch (error) {
      console.error(error);
      Swal.fire("Erro", "Não foi possível apagar o aluno.", "error");
    }
  }
}

async function showUserEditBox(id) {
  try {
    // Busca os dados do aluno pelo id
    const response = await fetch(`${APIURL}/${id}`);
    if (!response.ok) throw new Error("Aluno não encontrado");
    const aluno = await response.json();

    // Mostra o modal com os dados preenchidos
    const result = await Swal.fire({
      title: "Editar Aluno",
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nome" value="${aluno.nome || ''}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Apelido" value="${aluno.apelido || ''}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Curso" value="${aluno.curso || ''}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Ano Curricular" value="${aluno.anoCurricular || ''}">`,
      focusConfirm: false,
      preConfirm: () => {
        const nome = document.getElementById("swal-input1").value.trim();
        const apelido = document.getElementById("swal-input2").value.trim();
        const curso = document.getElementById("swal-input3").value.trim();
        const anoCurricular = document.getElementById("swal-input4").value.trim();

        if (!nome || !apelido || !curso || !anoCurricular) {
          Swal.showValidationMessage("Por favor preencha todos os campos");
          return false;
        }

        // Retorna os dados para a função que atualiza
        return { id, nome, apelido, curso, anoCurricular };
      },
    });

    if (result.isConfirmed) {
      // Atualiza os dados no servidor
      await updateAluno(result.value);
      // Atualiza a tabela na tela
      mostraNomes();
    }
  } catch (error) {
    console.error("Erro ao buscar ou editar aluno:", error);
    Swal.fire("Erro", "Não foi possível carregar ou editar os dados do aluno.", "error");
  }
}

async function updateAluno(alunoAtualizado) {
  try {
    const resposta = await fetch(`${APIURL}/${alunoAtualizado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alunoAtualizado),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao atualizar aluno");
    }

    Swal.fire("Sucesso!", "Aluno atualizado com sucesso.", "success");
  } catch (error) {
    console.error(error);
    Swal.fire("Erro", "Não foi possível atualizar o aluno.", "error");
  }
}


// Chamada inicial para preencher a tabela
mostraNomes();
