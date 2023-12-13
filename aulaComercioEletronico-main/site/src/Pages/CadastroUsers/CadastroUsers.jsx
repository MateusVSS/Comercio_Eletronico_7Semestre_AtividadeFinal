import React, { useState, useEffect } from 'react';
import './CadastroUsers.css';
import Formulario from '../../components/Formulario';
import api from '../../services/api';
import Tabela from '../../Components/Tabela';

const CadastroUser = () => {
  const [mensagem, setMensagem] = useState('');
  const [users, setUsers] = useState([]);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  /*CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user` varchar(255) NOT NULL,
    `senha` varchar(30) NOT NULL,
    `nome` varchar(255) NOT NULL,
    `email` varchar(50) NOT NULL,
    `nasc` date NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
  */
  
  const listaForm = [
    { nome: 'user', label: 'Usuário', tipo: 'text' },
    { nome: 'senha', label: 'Senha', tipo: 'text' },
    { nome: 'confirmar', label: 'confirmarSenha', tipo: 'text' },
    { nome: 'nome', label: 'Nome', tipo: 'text' },
    { nome: 'email', label: 'Email', tipo: 'text' },
    { nome: 'nasc', label: 'Nascimento', tipo: 'datetime' },
  ];

  const colunasUsers = ['id', 'user','senha', 'nome', 'email', 'nasc'];
  
  const enviarFormulario = async (dadosDoFormulario) => {
    try {
      await api.gravarUser(dadosDoFormulario)
      setMensagem('Usuário salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar o usuário:', error.message);
      setMensagem('Erro ao salvar o usuário');
    }
  };

  const editarFormulario = async (dadosDoFormulario) => {
    try {
      await api.atualizarUser(dadosDoFormulario)

      setMensagem('Usuário editado com sucesso');
    } catch (error) {
      console.error('Erro ao editar o usuário:', error.message);
      setMensagem('Erro ao editar o usuário');
    }
  };


  useEffect(() => {
    const carregarUsers = async () => {
      try {
        const dados = await api.getUsers();
        setUsers(dados);
      } catch (error) {
        console.error('Erro ao carregar os usuários:', error.message);
      }
    };

    carregarUsers();
  }, []);

  const excluirUser = async (id) => {
    try {
      await api.excluirUser(id);
      const novaLista = users.filter((user) => user.id !== id);
      setUsers(novaLista);
    } catch (error) {
      console.error('Erro ao excluir o usuário:', error.message);
    }
  };

  const editarUser = async (id) => {
    try {
      const userSelecionado = await api.buscarUserPorId(id);
      setItemSelecionado(userSelecionado);
      console.log(itemSelecionado)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário para edição:', error.message);
    }
  };  

  return (
    <div className="classeCSS">
      <h1>Cadastro de Usuário</h1>
      <Formulario 
        campos={listaForm} 
        onSubmit={enviarFormulario}
        itemSelecionado={itemSelecionado}
        onUpdate={editarFormulario}/>
      {mensagem && <p>{mensagem}</p>}
   
    <h2>usuários Cadastrados</h2>
      <Tabela
        dados={users}
        onExcluirItem={excluirUser}
        onEditarItem={editarUser}
        colunas={colunasUsers}
      />
    </div>
  );
};

export default CadastroUser;
