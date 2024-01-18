import React, { useContext } from "react";
import { MyContext } from "@/context/context";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Button } from "@mui/material";

const options = {
  selectableRowsHideCheckboxes: true,
};

export default function DataTable() {
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
              onClick={() => location.href=`/repoDetails?user=${userInfos.login}&repo=${dataIndex.rowData[0]}`}>
              Link
            </Button>
          );
        },
      },
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <MUIDataTable
        title={"Repositórios"}
        data={userRepos}
        columns={columns}
        options={options}
      />
    </div>
  );
}
