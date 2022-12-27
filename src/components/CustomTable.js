import React, { useEffect, useState } from "react";
import "./CustomTable.css";
import { Icon } from "@iconify/react";
import Pagination from "./Pagination";

const CustomTable = ({ header, data }) => {
  const noOfDataToDisplay = 12;
  const [allData, setAllData] = useState(data);
  const [dataToDispaly, setDataToDisplay] = useState([]);
  const [sort, setSort] = useState({ col: null, order: null });
  const [selectedRow, setSelectedRow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hoverLocation, setHoverLocation] = useState({ row: null, col: null });
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (sort.col) {
      const sortedData = [...dataToDispaly].sort((a, b) => {
        if (a[header[sort.col].indexTitle] < b[header[sort.col].indexTitle]) {
          return sort.order === "asc" ? -1 : 1;
        }
        if (a[header[sort.col].indexTitle] > b[header[sort.col].indexTitle]) {
          return sort.order === "asc" ? 1 : -1;
        }
        return 0;
      });
      setDataToDisplay(sortedData);
    } else {
      setDataToDisplay(
        allData.slice(
          noOfDataToDisplay * (pageNumber - 1),
          noOfDataToDisplay * pageNumber
        )
      );
    }
    // eslint-disable-next-line
  }, [sort]);

  useEffect(() => {
    setDataToDisplay(
      allData.slice(
        noOfDataToDisplay * (pageNumber - 1),
        noOfDataToDisplay * pageNumber
      )
    );
    // eslint-disable-next-line
  }, [pageNumber]);

  const sortColumn = (col) => {
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

  const handleDelete = (id) => {
    const newData = allData.filter((item) => item.id !== id);
    setAllData(newData);
    setDataToDisplay(
      newData.slice(
        noOfDataToDisplay * (pageNumber - 1),
        noOfDataToDisplay * pageNumber
      )
    );
  };

  const handleMouseOver = (row, col) => {
    setHoverLocation({ row: row, col: col });
  };

  return (
    <div className="container">
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
                        id={
                          sort.col && sort.col === item.id
                            ? "sort-icon-active"
                            : "sort-icon"
                        }
                        icon={
                          sort.col === item.id
                            ? sort.order === "asc"
                              ? "mdi:sort-descending"
                              : "mdi:sort-ascending"
                            : "mdi:sort"
                        }
                        width={20}
                        onClick={() => {
                          sortColumn(item.id);
                        }}
                      />
                    </div>
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {dataToDispaly.map((item) => (
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
                      {"  "}
                      {item.id}.
                    </td>
                  );
                } else if (col.indexTitle === "delete") {
                  return (
                    <td key={col.id}>
                      <Icon
                        icon="ic:outline-delete-outline"
                        width="28"
                        id="delete-icon"
                        onClick={() => handleDelete(item.id)}
                      />
                    </td>
                  );
                } else {
                  return (
                    <td
                      key={col.id}
                      onMouseOver={() => handleMouseOver(item.id, col.id)}
                      onMouseOut={() => handleMouseOver(null, null)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        {item[col.indexTitle]}
                        {hoverLocation.row === item.id &&
                          hoverLocation.col === col.id && (
                            <Icon
                              icon="material-symbols:file-copy"
                              width="24"
                              id={
                                isMouseDown ? "copy-icon-active" : "copy-icon"
                              }
                              onMouseDown={() => {
                                setIsMouseDown(true);
                                setTimeout(() => {
                                  setIsMouseDown(false);
                                }, 200);
                              }}
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  item[col.indexTitle]
                                );
                              }}
                            />
                          )}
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        data={data}
      />
    </div>
  );
};

export default CustomTable;
