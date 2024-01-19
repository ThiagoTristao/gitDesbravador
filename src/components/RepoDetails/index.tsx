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
import { ReposInterface } from "@/interfaces";

const RepoDetails = (): JSX.Element => {
  const router = useRouter();
  const user: string = router.query.user as string;
  const repo: string = router.query.repo as string;

  const [repoInfos, setRepoInfos] = useState<ReposInterface>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const { loading, setLoading } = useContext(MyContext);

  const fetchGetRepoInfos = async () => {
    setLoading(true);
    await getRepoInfos(user, repo).then((resp) => {
      setRepoInfos(resp.data);
    })
    .catch(() => {
      setShowToast(true);
    })
    .finally(() => {
      setLoading(false);
    });
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
        {repoInfos && (
          <Card>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Nome: {repoInfos.name}</Typography>
              {repoInfos.description ? (
                <Typography variant="h6">
                  Descrição: {repoInfos.description}
                </Typography>
              ) : (
                <Typography variant="h6">Sem Descrição 😭</Typography>
              )}
              <Typography variant="h6">
                Número de estrelas: {repoInfos.stargazers_count}
              </Typography>
              <Typography variant="h6">
                Linguagem: {repoInfos.language}
              </Typography>
              <Typography variant="h6">
                <Link
                  href={repoInfos.html_url}
                  underline="none"
                  target="_blank"
                >
                  Link Repositório
                </Link>
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push("/")}
              >
                Voltar
              </Button>
            </CardContent>
          </Card>
        )}
      </>
    );
  }
};

export default RepoDetails;
