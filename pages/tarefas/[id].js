import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Container, Button, Stack, Placeholder } from "react-bootstrap";
import http from "../../services/http";

export default function DetalheTarefa() {
  const router = useRouter();
  const [tarefa, setTarefa] = useState(undefined);

  useEffect(() => {
    const { id } = router.query;
    http.obterTarefa(id).then((r) => {
      setTarefa(r);
    });
  }, []);

  return (
    <Container>
      <h1>Detalhes da Tarefa</h1>
      {tarefa !== undefined ? (
        <Stack gap={3}>
          <Card>
            <Card.Body>
              <Card.Title>{tarefa.title}</Card.Title>
              <Card.Text>
                <strong>Realizada: </strong>
                {tarefa.completed ? "SIM" : "NÃO"}
                <br />
                <strong>ID: </strong>
                {tarefa.id}
              </Card.Text>
            </Card.Body>
          </Card>
          <Link href="/">
            <Button>Voltar</Button>
          </Link>
        </Stack>
      ) : (
        <>Sem dados</>
      )}
    </Container>
  );
}
