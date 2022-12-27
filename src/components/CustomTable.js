import React, { useEffect, useState } from "react";
import "./CustomTable.css";
import { Icon } from "@iconify/react";

const CustomTable = ({ header, data }) => {
  const [myData, setMyData] = useState(data);
  const [sort, setSort] = useState({ col: null, order: null });
  const [selectedRow, setSelectedRow] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    if (sort.col) {
      const sortedData = [...data].sort((a, b) => {
        if (a[header[sort.col].indexTitle] < b[header[sort.col].indexTitle]) {
          return sort.order === "asc" ? -1 : 1;
        }
        if (a[header[sort.col].indexTitle] > b[header[sort.col].indexTitle]) {
          return sort.order === "asc" ? 1 : -1;
        }
        return 0;
      });
      setMyData(sortedData);
    } else {
      setMyData(data);
    }
    // eslint-disable-next-line
  }, [sort]);

  const sortheader = (col) => {
    if (sort.col === col && sort.order === "asc") {
      setSort({ col: col, order: "desc" });
    } else if (sort.col === col && sort.order === "desc") {
      setSort({ col: null, order: null });
    } else {
      setSort({ col: col, order: "asc" });
    }
  };

  const selectARow = (id) => {
    if (selectedRow.includes(id)) {
      setSelectedRow(selectedRow.filter((item) => item !== id));
    } else {
      setSelectedRow([...selectedRow, id]);
    }
  };

  const selectAllRow = () => {
    if (selectedRow.length === data.length) {
      setSelectedRow([]);
    } else {
      setSelectedRow(data.map((item) => item.id));
    }
  };

  return (
    <div>
      <table id="table">
        <thead style={{ position: "sticky", top: -1 }}>
          <tr>
            {header.map((item) => {
              if (item.indexTitle === "select") {
                return (
                  <th key={item.id}>
                    <input type="checkbox" onChange={selectAllRow} />
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
                        onClick={() => sortheader(item.id)}
                      />
                    </div>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {myData.map((item) => (
            <tr key={item.id}>
              {header.map((col) => {
                if (col.indexTitle === "select") {
                  return (
                    <td key={col.id}>
                      {" "}
                      <input
                        type="checkbox"
                        checked={selectedRow.includes(item.id) ? true : false}
                        onChange={() => {
                          selectARow(item.id);
                        }}
                      />
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
