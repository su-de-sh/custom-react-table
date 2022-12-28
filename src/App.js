import React, { useMemo } from "react";
import CustomTable from "./components/custom-table/CustomTable";
import { COLUMNS } from "./columns";
import INFO_DATA from "./INFO_DATA.json";
import "./App.css";

const App = () => {
  const column = useMemo(() => COLUMNS, []);
  const data = useMemo(() => INFO_DATA, []);

  return (
    <div className="app-container">
      <CustomTable header={column} data={data} />
    </div>
  );
};

export default App;
