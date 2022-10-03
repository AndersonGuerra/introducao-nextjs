import { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  ListGroup,
  ListGroupItem,
  Stack,
} from "react-bootstrap";

export default function Home() {
  const [lista, setLista] = useState([]);
  const [tarefa, setTarefa] = useState("");

  function adicionarNaLista() {
    if (lista.includes(tarefa)) {
      alert("Tarefa repetida");
    } else if (tarefa !== "") {
      const listaAuxiliar = lista;
      listaAuxiliar.push(tarefa);
      setLista(listaAuxiliar);
      setTarefa("");
    } else {
      alert("Tarefa vazia");
    }
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
            <ListGroupItem key={tarefa} action>
              {tarefa}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Stack>
    </Container>
  );
}
