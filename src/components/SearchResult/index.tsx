import React, { useContext } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { MyContext } from "@/context/context";
import DataTable from "@/components/DataTable";

export default function SearchResult() {
  const { gitForm, loading } = useContext(MyContext);

  const { userInfos } = gitForm.getValues();

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <Card sx = {{marginTop:"1%", marginBottom:"1%"}}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={userInfos.avatar_url}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h6">
              seguidores: {userInfos.followers}
            </Typography>
            <Typography variant="h6">
              seguindo: {userInfos.following}
            </Typography>
            {userInfos.bio ? (
              <Typography variant="h6">Bio: {userInfos.bio}</Typography>
            ): (
              <Typography variant="h6">Sem bio 😭</Typography>
            )}
          </CardContent>
        </Card>
        <DataTable />
      </>
    );
  }
}
