import { useEffect, useState } from "react";
import axios from "axios";
import "./UserForm.css";

const API_URL = "http://localhost:3000";

function UserForm() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    nascimento: ""
  });

  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // =====================
  // GET USERS
  // =====================
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    };

    loadUsers();
  }, []);

  // =====================
  // HANDLE INPUT
  // =====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =====================
  // CREATE / UPDATE
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        alert("Usuário atualizado com sucesso!");
      } else {
        await axios.post(API_URL, formData);
        alert("Usuário cadastrado com sucesso!");
      }

      setFormData({
        nome: "",
        email: "",
        telefone: "",
        nascimento: ""
      });

      setEditId(null);

      const response = await axios.get(API_URL);
      setUsers(response.data);

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar usuário");
    }
  };

  // =====================
  // EDIT
  // =====================
  const handleEdit = (user) => {
    setEditId(user.id);
    setFormData({
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      nascimento: user.nascimento?.split("T")[0]
    });
  };

  // =====================
  // DELETE
  // =====================
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    await axios.delete(`${API_URL}/${id}`);

    const response = await axios.get(API_URL);
    setUsers(response.data);
  };

  return (
    <div className="user-container">
      {/* FORM */}
      <form className="user-form" onSubmit={handleSubmit}>
        <h2 className="form-title">USUÁRIOS</h2>

        <div className="form-group">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
          />

          <input
            type="date"
            name="nascimento"
            value={formData.nascimento}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            {editId ? "ATUALIZAR" : "SALVAR"}
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Fone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(user)}
                  >
                    ✏️
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserForm;
