import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { MyContext } from "@/context/context";
import { useRouter } from "next/router";
import { getRepoInfos } from "@/services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RepoDetails() {
  const router = useRouter();
  const user: string = router.query.user as string;
  const repo: string = router.query.repo as string;

  const [repoInfos, setRepoInfos] = useState<any>({});
  const [showToast, setShowToast] = useState(false);
  const { loading, setLoading } = useContext(MyContext);

  const fetchGetRepoInfos = async () => {
    setLoading(true);
    try {
      const resp = await getRepoInfos(user, repo);
      setRepoInfos(resp.data);
    } catch (error) {
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && repo) {
      fetchGetRepoInfos();
    }
  }, [user, repo]);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        {showToast && (
          <Snackbar
            open={showToast}
            autoHideDuration={6000}
            message="Ocorreu um erro ao consultar os dados, por favor, tente novamente mais tarde"
          />
        )}
        <Card>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Nome: {repoInfos?.name}</Typography>
            {repoInfos?.description ? (
              <Typography variant="h6">
                Descrição: {repoInfos?.description}
              </Typography>
            ) : (
              <Typography variant="h6">Sem Descrição 😭</Typography>
            )}
            <Typography variant="h6">
              Número de estrelas: {repoInfos?.stargazers_count}
            </Typography>
            <Typography variant="h6">
              Linguagem: {repoInfos?.language}
            </Typography>
            <Typography variant="h6">
              <Link href={repoInfos?.html_url} underline="none" target="_blank">
                Link Repositório
              </Link>
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => (location.href = "/")}
            >
              Voltar
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }
}
