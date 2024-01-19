import { Box, Typography } from "@mui/material";

const Header = (): JSX.Element => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Typography variant="h4">GIT</Typography>
        <Typography variant="h5">Consulte um usuário do GitHub</Typography>
      </Box>
    </>
  );
}

export default Header