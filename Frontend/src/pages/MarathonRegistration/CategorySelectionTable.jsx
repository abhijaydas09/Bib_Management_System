import React from 'react';
import '../../components/table/Table.css';

function CategorySelectionTable({ columns, data }) {
  return (
    <div className="table-root" style={{ marginRight: 16 }}>
      <div className="table-scroll" style={{ marginRight: 16 }}>
        <table className="table-main">
          <thead>
            <tr className="table-header-row" style={{ gap: 0 }}>
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  className="table-header-cell"
                  style={{
                    paddingLeft: idx === 0 ? 16 : 8,
                    paddingRight: idx === columns.length - 1 ? 16 : 8,
                    gap: 0,
                    textAlign: col.align ? col.align : 'left',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="table-row">
                {columns.map((col, idx) => (
                  <td
                    key={col.key}
                    className="table-cell"
                    style={{
                      paddingLeft: idx === 0 ? 16 : 8,
                      paddingRight: idx === columns.length - 1 ? 16 : 8,
                      gap: 0,
                      textAlign: col.align ? col.align : 'left',
                    }}
                  >
                    {col.render ? col.render(row[col.key], row, i) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategorySelectionTable; 