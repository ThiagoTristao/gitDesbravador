import React, { useContext } from "react";
import { MyContext } from "@/context/context";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

const options = {
  selectableRowsHideCheckboxes: true,
};

const DataTable = (): JSX.Element => {
  const router = useRouter();
  const { gitForm } = useContext(MyContext);

  const { userInfos, userRepos } = gitForm.getValues();

  const columns: MUIDataTableColumnDef[] = [
    {
      name: "name",
      label: "Nome",
      options: {
        sort: true,
      },
    },
    {
      name: "stargazers_count",
      label: "Estrelas",
      options: {
        sort: true,
        sortDirection: 'asc'
      },
    },
    {
      name: "details",
      label: "Detalhes",
      options: {
        sort: false,
        customBodyRender: (_, dataIndex) => {
          return (
            <Button variant="outlined" startIcon={<ArrowOutwardIcon />} 
              onClick={() => router.push(`/repoDetails?user=${userInfos.login}&repo=${dataIndex.rowData[0]}`)}>
              {/* onClick={() => location.href=`/repoDetails?user=${userInfos.login}&repo=${dataIndex.rowData[0]}`}> */}
              Link
            </Button>
          );
        },
      },
    },
  ];
  return (
    <Box sx={{height: "100%", width: "100%"}}>
      <MUIDataTable
        title={"Repositórios"}
        data={userRepos}
        columns={columns}
        options={options}
      />
    </Box>
  );
}

export default DataTable;
