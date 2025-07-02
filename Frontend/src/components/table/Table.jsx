import React from 'react';
import './Table.css';

function Table({ columns, data, summary, page, pageSize, total, onPageChange, onPageSizeChange, actionButton }) {
  return (
    <div className="table-root">
      <div className="table-toolbar">
        <div className="table-summary">Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} [items]</div>
        {actionButton && <div className="table-action">{actionButton}</div>}
      </div>
      <div className="table-scroll">
        <table className="table-main">
          <thead>
            <tr className="table-header-row">
              {columns.map(col => (
                <th key={col.key} className="table-header-cell">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="table-row">
                {columns.map(col => (
                  <td key={col.key} className="table-cell">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {summary && (
            <tfoot>
              <tr className="table-footer-row">
                <td colSpan={columns.length - 1} className="table-footer-label">Total / Summary</td>
                <td className="table-footer-value">{summary}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <div className="table-pagination">
        <div className="table-pagination-left">
          Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, total)} of {total} [items]
        </div>
        <div className="table-pagination-right">
          <span>{pageSize} rows / page</span>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>{'<'}</button>
          <button onClick={() => onPageChange(page + 1)} disabled={(page + 1) * pageSize >= total}>{'>'}</button>
        </div>
      </div>
    </div>
  );
}

export default Table; 