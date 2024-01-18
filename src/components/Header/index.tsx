import { Box, Typography } from "@mui/material";

export default function Header() {
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