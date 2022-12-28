import React, { useEffect, useState } from "react";
import "./CustomTable.css";
import { Icon } from "@iconify/react";
import Pagination from "./pagination/Pagination";
import SnackBar from "./snackbar/SnackBar";
import Search from "./search/Search";

const CustomTable = ({ header, data, noOfDataInAPage = 12 }) => {
  const [allData, setAllData] = useState(data);
  const [dataToDispaly, setDataToDisplay] = useState([]);
  const [sort, setSort] = useState({ col: null, order: null });
  const [selectedRow, setSelectedRow] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hoverLocation, setHoverLocation] = useState({ row: null, col: null });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

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
          noOfDataInAPage * (pageNumber - 1),
          noOfDataInAPage * pageNumber
        )
      );
    }

    if (selectedRow.length) {
      addMessage(`Selected ${selectedRow.length} row(s)`);
    }

    if (search) {
      const newData = allData.filter((item) => {
        for (let key in item) {
          if (
            key !== "id" &&
            item[key].toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
      setDataToDisplay(newData);
    }
    // eslint-disable-next-line
  }, [sort, selectedRow, search]);

  useEffect(() => {
    setDataToDisplay(
      allData.slice(
        noOfDataInAPage * (pageNumber - 1),
        noOfDataInAPage * pageNumber
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
    addMessage("Row deleted successfully");
    const newData = allData.filter((item) => item.id !== id);
    setAllData(newData);
    setDataToDisplay(
      newData.slice(
        noOfDataInAPage * (pageNumber - 1),
        noOfDataInAPage * pageNumber
      )
    );
  };

  const handleMouseOver = (row, col) => {
    setHoverLocation({ row: row, col: col });
  };

  const addMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="container">
      <Search search={search} setSearch={setSearch} />
      <table id="table">
        <thead style={{ position: "sticky", top: -1 }}>
          <tr>
            {header.map((item) => {
              if (item.indexTitle === "select") {
                return (
                  <th key={item.id}>
                    <input type="checkbox" onChange={selectAllRow} /> ID.
                  </th>
                );
              } else if (item.indexTitle === "delete") {
                return <th key={item.id}>...</th>;
              } else {
                return (
                  <th key={item.id}>
                    <div className="flex-container">
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
                        onClick={() => {
                          window.confirm("Are you sure you want to delete?") &&
                            handleDelete(item.id);
                        }}
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
                      <div className="flex-container">
                        {item[col.indexTitle]}
                        {hoverLocation.row === item.id &&
                          hoverLocation.col === col.id && (
                            <Icon
                              icon="material-symbols:file-copy"
                              width="24"
                              id={
                                isMouseDown ? "copy-icon-active" : "copy-icon"
                              }
                              onClick={() => {
                                setIsMouseDown(true);
                                setTimeout(() => {
                                  setIsMouseDown(false);
                                }, 200);
                                addMessage("Copied to clipboard");
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
      {search ? null : (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          data={data}
          noOfDataInAPage={noOfDataInAPage}
        />
      )}
      {message ? <SnackBar message={message} /> : null}
    </div>
  );
};

export default CustomTable;
