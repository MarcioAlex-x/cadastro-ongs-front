import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  formatarData,
  formatarDataCriacaoAtualizacao,
} from "../../../utils/fomatters";
import styles from "./pessoaId.module.css";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const PessoaId = ({ pessoa }) => {

  // useEffect(() => {
  // const fetchImagens = async () => {
  //   const campos = ["rg_frente", "rg_verso", "comprovante_residencia"];

  //   const promises = campos.map(async (campo) => {
  //     const publicId = pessoa[campo + "_public_id"];
  //     if (!publicId) return [campo, null];

  //     try {
  //       const res = await fetch(
  //         `/api/dados-pessoais/imagem/${encodeURIComponent(publicId)}`,
  //         { credentials: "include" }
  //       );
  //       if (!res.ok) throw new Error("Erro ao buscar imagem");
  //       const data = await res.json();
  //       return [campo, data.url];
  //     } catch (err) {
  //       console.error(`Erro ao buscar ${campo}:`, err);
  //       return [campo, null];
  //     }
  //   });
  // 
  //   const results = await Promise.all(promises);

  //   const novasImagens = Object.fromEntries(results);
  //   setImagens(novasImagens);
  // };

  //   fetchImagens();
  // }, [pessoa]);


  return (
    <div>
      <h3 className={styles["title-cadastro"]}>Dados Pessoais</h3>
      <div className={styles["text-cadastro"]}>
        <div className="row">
          <p className="col-12 col-md-6"><b>Nome:</b> {pessoa.nome}</p>
          <p className="col-12 col-md-6"><b>Data de Nascimento:</b> {formatarData(pessoa.data_nascimento)}</p>
        </div>

        <div className={styles["text-cadastro"]}>
          <div className="row">
            <p className="col-12 col-md-3"><b>Telefone:</b> {pessoa.telefone}</p>
            <p className="col-12 col-md-3"><b>RG:</b> {pessoa.rg}</p>
            <p className="col-12 col-md-3"><b>CPF:</b> {pessoa.cpf}</p>
            <p className="col-12 col-md-3"><b>Nis:</b> {pessoa.nis}</p>
          </div>
        </div>

        <div className={styles["text-cadastro"]}>
          <div className="row">
            {pessoa.nome_pai && (
              <p className="col-12 col-md-6"><b>Pai:</b> {pessoa.nome_pai}</p>
            )}
            <p className="col-12 col-md-6"><b>Mãe:</b> {pessoa.nome_mae}</p>
          </div>
        </div>

        <div className={styles["text-cadastro"]}>
          <div className="row">
            <p className="col-3"><b>Orientação Sexual: </b>{pessoa?.orientacao_sexual}</p>
            <p className="col-3"><b>Estado civil: </b>{pessoa?.estado_civil}</p>
            <p className="col-3"><b>Naturalidade: </b>{pessoa?.naturalidade}</p>
            <p className="col-3"><b>Nacionalidade:</b> {pessoa?.nacionalidade}</p>
          </div>
        </div>

        <div className={styles["text-cadastro"]}>
          <div className="row">
            <p className="col-3"><b>Etnia:</b> {pessoa?.etnia}</p>
            <p className="col-3"><b>PCD: </b>{pessoa?.deficiencia}</p>
            {pessoa?.deficiencia !== 'Não' && <p className="col-6"><b>Deficiência:</b> {pessoa?.tipo_deficiencia}</p>}
          </div>
        </div>


        <div className={styles["text-cadastro"]}>
          <div className="row">
            {pessoa?.curso && <p className="col-3"><b>Curso:</b> {pessoa?.curso}</p>}
            {pessoa?.periodo && <p className="col-3"><b>Período: </b>{pessoa?.periodo}</p>}
            {pessoa?.instituicao && <p className="col-3"><b>Instituição:</b> {pessoa?.instituicao}</p>}
            <p className="col-3"><b>Renda:</b> R${pessoa?.renda}</p>
          </div>
        </div>

        <div className={styles["text-cadastro"]}>
          <div className="row">
            <p className="col-3"><b>Benefício:</b> {pessoa?.beneficio_seguro_social}</p>
            {pessoa?.valor_beneficio_seguro_social && <p className="col-3"><b>Valor do Benefício:</b> R${pessoa?.valor_beneficio_seguro_social}</p>}
            <p className="col-3"><b>Apoio a Renda Primária:</b> {pessoa?.apoio_renda_primaria}</p>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-4">
            {pessoa?.rg_frente ? (
              <img src={pessoa?.rg_frente} alt="RG Frente" width="200" />
            ) : (
              <p className="text-danger fw-bold">Sem RG frente</p>
            )}
          </div>
          <div className="col-4">
            {pessoa?.rg_verso ? (
              <img src={pessoa?.rg_verso} alt="RG Verso" width="200" />
            ) : (
              <p className="text-danger fw-bold">Sem RG verso</p>
            )}
          </div>
          <div className="col-4">
            {pessoa?.comprovante_residencia ? (
              <img src={pessoa?.comprovante_residencia} alt="Comprovante de residência" width="200" />
            ) : (
              <p className="text-danger fw-bold">Sem comprovante de residência</p>
            )}
          </div>

        </div>

        <div className="d-flex justify-content-between mt-3">
          <Link to={`/dashboard/update-dados-pessoal/${pessoa.id}`}>
            <button className="btn btn-primary btn-sm">
              <HiOutlinePencilAlt /> Editar
            </button>
          </Link>
          <p className={`${styles["title-cadastro"]} ${styles["data"]} text-secondary`}>
            Última atualização: {formatarDataCriacaoAtualizacao(pessoa.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};
