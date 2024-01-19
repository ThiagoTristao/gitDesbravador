import Head from "next/head";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { Box } from "@mui/material";
import { MyContext } from "@/context/context";
import React, { useContext } from "react";
import SearchResult from "@/components/SearchResult";

const GitPage = (): JSX.Element => {
  const { gitForm } = useContext(MyContext);
  const { getValues } = gitForm;
  return (
    <>
      <Head>
        <title>GIT</title>
      </Head>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Header />
        <Search />
        {getValues("userRepos") && getValues("userInfos") && (
            <SearchResult />
        )}
      </Box>
    </>
  );
}

export default GitPage
