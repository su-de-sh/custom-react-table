import React from "react";
import "./CustomTable.css";

const CustomTable = ({ column, data }) => {
  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            {column.map((item) => {
              if (item.indexTitle === "select") {
                return (
                  <th key={item.id}>
                    <input type="checkbox" />
                  </th>
                );
              } else if (item.indexTitle === "delete") {
                return <th key={item.id}>...</th>;
              } else {
                return (
                  <th key={item.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {item.title}
                      <iconify-icon
                        icon="mdi:sort-ascending"
                        width="20"
                      ></iconify-icon>
                    </div>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {column.map((col) => {
                if (col.indexTitle === "select") {
                  return (
                    <td key={col.id}>
                      {" "}
                      <input type="checkbox" />
                    </td>
                  );
                } else if (col.indexTitle === "delete") {
                  return (
                    <td key={col.id}>
                      <iconify-icon
                        icon="ic:outline-delete-outline"
                        width="28"
                      ></iconify-icon>
                    </td>
                  );
                } else {
                  return <td key={col.id}>{item[col.indexTitle]}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
