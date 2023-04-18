import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Input, Button, Table } from 'reactstrap';
import './index.css';

const API_URL = 'https://dev.labtime.ufg.br/selecao-2023/usuarios';

function App() {
  const [listaUsuarios, defListaUsuarios] = useState([]);
  const [textoPesquisa, defTextoPesquisa] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const resposta = await axios.get(API_URL);
        defListaUsuarios(resposta.data);
      } catch (erro) {
        console.error(erro);
      }
    })();
  }, []);

  function handlePesquisa(evento) {
    defTextoPesquisa(evento.target.value);
  }

  const listaFiltrada = listaUsuarios.filter((usuario) => {
    const valor = Object.values(usuario).join(' ').toLowerCase();
    return valor.includes(textoPesquisa.toLowerCase());
  });

  return (
      <Container>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 className="titulo" style={{ marginTop: '50px', marginBottom: '200px' }}>Lista de usuários</h1>
            <div className="barraPesquisa">
              <Input className="pesquisaEntrada" placeholder="Pesquisar" value={textoPesquisa} onChange={handlePesquisa} />
              <Button className="botaoPesquisa" color="secondary">Buscar</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: '200px' }}>
            <Table striped>
              <thead>
              <tr>
                <th>Nome completo</th>
                <th>Nome social</th>
                <th>Data de nascimento</th>
                <th>Código</th>
                <th>Sexo</th>
                <th>E-mail</th>
                <th>Estado</th>
                <th>Município</th>
                <th>Número de acessos</th>
                <th>Situação do curso</th>
                <th>Data de vínculo</th>
              </tr>
              </thead>
              <tbody>
              {listaFiltrada.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nomeCompleto}</td>
                    <td>{usuario.nomeSocial}</td>
                    <td>{usuario.dataDeNascimento}</td>
                    <td>{usuario.codigo}</td>
                    <td>{usuario.sexo}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.estado}</td>
                    <td>{usuario.municipio}</td>
                    <td>{usuario.numeroDeAcessos}</td>
                    <td>{usuario.situacao}</td>
                    <td>{usuario.dataDeVinculo}</td>
                  </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  );
}

export default App;
