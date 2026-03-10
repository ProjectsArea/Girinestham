import { useState, useEffect } from "react";
import "../css/StudentsListTable.css";
import { searchStudents } from "../api/studentsApi";
const COLUMNS = [
  {
    prop: "id",
    Label: "Id",
    sortable: true,
  },
  {
    prop: "full_name",
    Label: "Full Name",
    sortable: true,
  },
  {
    prop: "contact_number",
    Label: "Contact Number",
  },
  {
    prop: "created_at",
    Label: "Date of Joining",
    sortable: true,
  },
  {
    prop: "mem_registration_date",
    Label: "Membership Registration Date",
    // sortable: true,
  },

  {
    prop: "mem_status",
    Label: "Membership Status",
  },
  {
    prop: "sport_name",
    Label: "Interested Sport",
  },
];

export default function StudentsListTable() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(null);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [searchName, setSearchName] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await searchStudents({
          page,
          limit,
          sortColumn,
          sortOrder,
          searchName,
        });

        if (result.success) {
          setStudents(result.students || []);
          setTotalPages(result.meta.totalPages);
          setTotalStudents(result.meta.total);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, [page, limit, sortColumn, sortOrder, searchName]);

  return (
    <div>
      <h3>Students List</h3>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.prop}
                onClick={() => {
                  if (column.sortable) {
                    if (sortColumn !== column.prop) {
                      setSortColumn(column.prop);
                      setSortOrder("ASC");
                    } else if (sortOrder === "ASC") {
                      setSortOrder("DESC");
                    } else if (sortOrder === "DESC") {
                      setSortColumn(null);
                      setSortOrder(null);
                    } else {
                      setSortOrder("ASC");
                    }
                  }
                }}
              >
                {column.Label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              {COLUMNS.map((column) => {
                if (column.prop === "mem_status") {
                  return (
                    <td key={column.prop}>
                      {student[column.prop] === 1 ? "Active" : "Inactive"}
                    </td>
                  );
                }
                if (
                  column.prop === "created_at" ||
                  column.prop === "mem_registration_date"
                ) {
                  return (
                    <td key={column.prop}>
                      {student[column.prop]
                        ? Intl.DateTimeFormat("en-IN").format(
                            new Date(student[column.prop]),
                          )
                        : null}
                    </td>
                  );
                }
                return <td key={column.prop}>{student[column.prop]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
