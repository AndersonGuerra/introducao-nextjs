import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  ListGroup,
  ListGroupItem,
  Stack,
  Row,
  Col,
} from "react-bootstrap";
import { CheckSquare, Eye, Trash } from "react-bootstrap-icons";
import http from "../services/http";

export default function Home() {
  const [lista, setLista] = useState([]);
  const [tarefa, setTarefa] = useState("");

  useEffect(() => {
    http.listarTodasAsTarefas().then((r) => {
      setLista(r);
    });
  }, []);

  async function adicionarNaLista() {
    if (lista.includes(tarefa)) {
      alert("Tarefa repetida");
    } else if (tarefa !== "") {
      const tarefaCriada = await http.criarTarefa(tarefa);
      const listaAuxiliar = lista;
      listaAuxiliar.push(tarefaCriada);
      setLista(listaAuxiliar);
      setTarefa("");
    } else {
      alert("Tarefa vazia");
    }
  }

  async function removerDaLista(tarefa) {
    const result = await http.deletarTarefa(tarefa.id);
    if (result.id === undefined) {
      http.listarTodasAsTarefas().then((r) => {
        setLista(r);
      });
    } else {
      alert("Falha ao remover tarefa");
    }
  }

  async function alternarRealizado(tarefa) {
    await http.alternarRealizado(tarefa.id);
    http.listarTodasAsTarefas().then((r) => {
      console.log(r)
      setLista(r);
    });
  }

  return (
    <Container>
      <h1>Tarefas</h1>
      <Stack gap={3}>
        <FormControl
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Insira sua tarefa"
        ></FormControl>
        <Button onClick={adicionarNaLista}>Adicionar</Button>
        <ListGroup>
          {lista.map((tarefa) => (
            <ListGroupItem key={tarefa.id}>
              <Row className="d-flex justify-content-between">
                <Col>
                  <div>{tarefa.title}</div>
                </Col>
                <Col className="text-end">
                  <Link href={`/tarefas/${tarefa.id}`}>
                    <Eye size={24} style={{ cursor: "pointer" }} />
                  </Link>
                  <CheckSquare
                    className="m-2"
                    onClick={() => alternarRealizado(tarefa)}
                    size={24}
                    style={{ cursor: "pointer" }}
                    color={tarefa.completed ? "green" : "gray"}
                  />
                  <Trash
                    size={24}
                    onClick={() => removerDaLista(tarefa)}
                    style={{ cursor: "pointer" }}
                    color="red"
                  />
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Stack>
    </Container>
  );
}
