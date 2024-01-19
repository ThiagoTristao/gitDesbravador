import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  CardActions,
  FormControl,
  CircularProgress,
  Box,
  FormHelperText,
  Snackbar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { MyContext } from "@/context/context";
import { getUserInfos, getUserRepos } from "@/services/api";
import { Controller } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

const Search = (): JSX.Element => {
  const { gitForm, loading, setLoading } = useContext(MyContext);
  const {
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    formState: { errors },
  } = gitForm;
  const [showToast, setShowToast] = useState<boolean>(false);
  const [messageToast, setMessageToast] = useState<string>(
    "Ocorreu um erro ao consultar os dados, por favor, tente novamente mais tarde."
  );

  const handleSetUser = async (event: any) => {
    const value = event.target.value;
    setValue("user", value);
    clearErrors("user");
  };

  const fetchGetUserInfos = async () => {
    setLoading(true);

    await getUserInfos(getValues("user"))
      .then((resp) => {
        setValue("userInfos", resp.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setMessageToast("Usuário não encontrado.");
        } else {
          setMessageToast(
            "Ocorreu um erro ao consultar os dados, por favor, tente novamente mais tarde."
          );
        }
        setShowToast(true);
        setValue("userInfos", "");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchGetUserRepos = async () => {
    setLoading(true);
    await getUserRepos(getValues("user")).then((resp) => {
      setValue("userRepos", resp.data);
    })
    .catch((err) => {
      if (err.response.status === 404) {
        setMessageToast("Usuário não encontrado.");
      } else {
        setMessageToast(
          "Ocorreu um erro ao consultar os dados, por favor, tente novamente mais tarde."
        );
      }
      setShowToast(true);
      setValue("userRepos", "");
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const onSubmit = async () => {
    await fetchGetUserInfos();
    await fetchGetUserRepos();
    setValue("user", "");
  };

  useEffect(() => {
    setValue("user", "");
  }, []);

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        {showToast && (
          <Snackbar
            open={showToast}
            autoHideDuration={6000}
            message={messageToast}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <FormControl
              fullWidth
              margin="dense"
              error={errors.user ? true : false}
            >
              <Controller
                name="user"
                control={control}
                defaultValue=""
                render={() => (
                  <TextField
                    variant="outlined"
                    onChange={handleSetUser}
                    label="Usuário"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                rules={{ required: true }}
              />
              {errors.user && (
                <FormHelperText>Informe o usuário!</FormHelperText>
              )}
            </FormControl>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                color="primary"
                type="submit"
                id="submitButton"
              >
                Consultar
              </Button>
            </CardActions>
          </Box>
        </form>
      </>
    );
  }
};

export default Search;
