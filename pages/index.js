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
    if (tarefa !== "" && !lista.includes(tarefa)) {
      const listaAuxiliar = lista;
      listaAuxiliar.push(tarefa);
      setLista(listaAuxiliar);
      setTarefa("");
    }
  }

  function removerDaLista(tarefa) {
    const listaAuxiliar = lista.filter(
      (e) => e !== tarefa
    );
    setLista(listaAuxiliar);
  }

  return (
    <Container>
      <h1>Tarefas</h1>
      <Stack gap={3}>
        <FormControl
          placeholder="Insira sua tarefa"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        ></FormControl>
        <Button onClick={adicionarNaLista}>Adicionar</Button>
        <ListGroup>
          {lista.map((tarefa) => (
            <ListGroupItem
              action
              key={tarefa}
              onClick={() => removerDaLista(tarefa)}
            >
              {tarefa}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Stack>
    </Container>
  );
}
