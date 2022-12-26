import React, { useState } from "react";
import "./CustomTable.css";
import { Icon } from "@iconify/react";

const CustomTable = ({ column, data }) => {
  const [sort, setSort] = useState({ col: null, order: null });

  const sortColumn = (col) => {
    if (sort.col === col && sort.order === "asc") {
      setSort({ col: col, order: "desc" });
    } else if (sort.col === col && sort.order === "desc") {
      setSort({ col: null, order: null });
    } else {
      setSort({ col: col, order: "asc" });
    }
  };

  if (sort.col) {
    data = data.sort((a, b) => {
      if (a[column[sort.col].indexTitle] < b[column[sort.col].indexTitle]) {
        return sort.order === "asc" ? -1 : 1;
      }
      if (a[column[sort.col].indexTitle] > b[column[sort.col].indexTitle]) {
        return sort.order === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

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

                      <Icon
                        icon={
                          sort.col === item.id
                            ? sort.order === "asc"
                              ? "mdi:sort-ascending"
                              : "mdi:sort-descending"
                            : "mdi:sort"
                        }
                        width={20}
                        onClick={() => sortColumn(item.id)}
                      />
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
                      <Icon icon="ic:outline-delete-outline" width="28" />
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
