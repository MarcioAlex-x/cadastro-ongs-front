const url = import.meta.env.VITE_API_URL;

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './listaCadastros.module.css';
import spinner from '../../../assets/spinner.gif';

import { FaRegEye } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Swal from 'sweetalert2';

export const ListaCadastros = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [cadastros, setCadastros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const isCadastroCompleto = (pessoa) => {
    return (
      pessoa?.nome &&
      pessoa?.endereco &&
      pessoa?.domicilio &&
      pessoa?.acesso
    );
  };

  const handleDeleteCadastro = async (id) => {
    try {
      const response = await fetch(`${url}/cadastro/${id}`, {
        credentials: 'include',
        method: 'DELETE',
      });

      if (response.ok) {
        setCadastros((prev) => prev.filter((cadastro) => cadastro.id !== id));
        console.log(`Cadastro ${id} removido por estar incompleto.`);
      }
    } catch (err) {
      console.error(`Erro ao remover cadastro ${id}:`, err.message);
    }
  };

  useEffect(() => {
    const listarCadastros = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/cadastro`, {
          credentials: 'include',
        });

        const data = await response.json();

        const completos = [];
        const incompletos = [];

        for (const cadastro of data) {
          const pessoas = cadastro.pessoas || [];
          const todasCompletas = pessoas.length > 0 && pessoas.every(isCadastroCompleto);

          if (todasCompletas) completos.push(cadastro);
          else incompletos.push(cadastro);
        }

        setCadastros(completos);

        for (const inc of incompletos) {
          await handleDeleteCadastro(inc.id);
        }

      } catch (err) {
        console.error('Erro ao carregar cadastros:', err);
      } finally {
        setLoading(false);
      }
    };

    listarCadastros();
  }, []);

  const termo = (searchTerm || '').replace(/[^\d]/g, "");

const filteredCadastros = cadastros.filter((cadastro) =>
  cadastro.pessoas.some((pessoa) => {
    const cpfSemMascara = (pessoa.cpf || '').replace(/[^\d]/g, "");
    return termo ? cpfSemMascara.includes(termo) : true;
  })
);

  return (
    <div className={styles['scroll']}>
      <h2 className={styles['title-cadastro']}>Cadastros Realizados</h2>

      <div className="mb-3 w-50 mb-3 m-auto" style={{position:'relative'}}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar pelo CPF..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch style={{position:'absolute', top:'10px', right:'16px'}}/>
      </div>


      {location.state?.message && (
        <div className="alert alert-success">{location.state.message}</div>
      )}

      {loading ? (
        <div className="d-flex align-items-center justify-content-center ">
          <img src={spinner} className="mt-5" />
        </div>
      ) : (
        <div className='bg-light px-2 py-5 rounded-3'>
          {filteredCadastros.length > 0 ? (
            <ul>
              {filteredCadastros.map((data) => (
                <li key={data.id} className={`${styles['link']} mb-3 d-flex`}>
                  <Link className={styles['link']} to={`/dashboard/cadastro/${data.id}`}>
                    <button
                      className={`btn btn-primary btn-sm me-2 d-flex align-items-center justify-content-center ${styles['button-width']}`}
                    >
                      <FaRegEye className={styles['button-link']} />
                      <span className={`${styles['text-link']} ms-1`}>Ver Cadastro</span>
                    </button>
                  </Link>

                  <ul>
                    {data.pessoas.map((pessoa) => (
                      <li key={pessoa.id} className={styles['link']}>
                        {pessoa.nome} - CPF: {pessoa.cpf}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum cadastro encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};
