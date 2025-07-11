import React from 'react';
import './Table.css';

function Table({ columns, data, summary, page, pageSize, total, onPageChange, onPageSizeChange, actionButton }) {
  // Common page size options
  const pageSizeOptions = [5, 10, 20, 50, 100];

  return (
    <div className="table-root" style={{ marginRight: 16 }}>
      <div className="table-toolbar" style={{ paddingRight: 16 }}>
        <div className="table-summary" style={{ gap: 0, marginRight: 0, paddingRight: 0 }}>
          Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} [items]
        </div>
        {actionButton && (
          <div className="table-action" style={{ paddingRight: 0 }}>
            {actionButton}
          </div>
        )}
      </div>
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
                    paddingRight: idx === columns.length - 1 ? 16 : 8, // Up to 16px gap on rightmost cell
                    gap: 0,
                    textAlign: col.align ? col.align : 'left'
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
                      paddingRight: idx === columns.length - 1 ? 16 : 8, // Up to 16px gap on rightmost cell
                      gap: 0,
                      textAlign: col.align ? col.align : 'left'
                    }}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-pagination" style={{ paddingRight: 16 }}>
        <div className="table-pagination-left">
          Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} of {total} [items]
        </div>
        <div className="table-pagination-right">
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <select
              value={pageSize}
              onChange={e => onPageSizeChange(Number(e.target.value))}
              style={{ fontSize: 8, marginRight: 4, height: 18, borderRadius: 4, padding: '0 4px' }}
            >
              {pageSizeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            rows / page
          </label>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>{'<'}</button>
          <button onClick={() => onPageChange(page + 1)} disabled={(page + 1) * pageSize >= total}>{'>'}</button>
        </div>
      </div>
    </div>
  );
}

export default Table; 