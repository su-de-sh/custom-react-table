import React, { useMemo } from "react";
import CustomTable from "./components/CustomTable";
import { COLUMNS } from "./columns";
import INFO_DATA from "./INFO_DATA.json";
import "./App.css";

const App = () => {
  const column = useMemo(() => COLUMNS, []);
  const data = useMemo(() => INFO_DATA, []);

  return (
    <div>
      My users
      <hr />
      <CustomTable column={column} data={data} />
    </div>
  );
};

export default App;
