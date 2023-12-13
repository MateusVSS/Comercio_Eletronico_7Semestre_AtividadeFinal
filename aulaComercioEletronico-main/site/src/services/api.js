// src/services/api.js
const API_URL = 'http://localhost:3000/api';

const api = {

    async gravarUser(dadosDoFormulario) {
        const resposta = await fetch(`${API_URL}/users/salvar-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o user');
        }
    },
    

    async getUsers() {
        const resposta = await fetch(`${API_URL}/users/listar-users`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os users');
        }
        return resposta.json();
    },

    async buscarUserPorId(id) {
        const resposta = await fetch(`${API_URL}/users/listar-users/${id}`);
        if (!resposta.ok) {
            throw new Error('Erro ao carregar os users');
        }
        return resposta.json();
    },


    async excluirUser(id) {
        const resposta = await fetch(`${API_URL}/users/excluir-user/${id}`, {
            method: 'DELETE',
        });
        if (!resposta.ok) {
            throw new Error('Erro ao excluir o user');
        }
    },

    // Adicione aqui outras chamadas de API conforme necessário

    
    async atualizarUser(dadosDoFormulario) {
        const resposta = await fetch(`${API_URL}/users/atualizar-user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosDoFormulario),
        });
        if (!resposta.ok) {
            throw new Error('Erro ao gravar o user');
        }
    },

};

export default api;
