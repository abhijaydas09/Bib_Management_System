import React from 'react';
import './Pagination.css';

function getPages(current, total) {
  const pages = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total);
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return pages;
}

export default function Pagination({
  current = 1,
  total = 20,
  onChange = () => {},
  showJumper = true,
}) {
  const pages = getPages(current, total);
  return (
    <div className="pagination-root">
      <nav className="pagination-nav">
        <button
          className="pagination-btn"
          aria-label="Previous page"
          disabled={current === 1}
          onClick={() => onChange(current - 1)}
        >
          &lt;
        </button>
        {pages.map((p, i) =>
          p === '...'
            ? <span key={i} className="pagination-ellipsis">…</span>
            : <button
                key={i}
                className={
                  'pagination-btn' + (p === current ? ' pagination-btn-current' : '')
                }
                aria-current={p === current ? 'page' : undefined}
                onClick={() => onChange(p)}
                disabled={p === current}
              >
                {p}
              </button>
        )}
        <button
          className="pagination-btn"
          aria-label="Next page"
          disabled={current === total}
          onClick={() => onChange(current + 1)}
        >
          &gt;
        </button>
      </nav>
      {showJumper && (
        <div className="pagination-jumper">
          <button
            className="pagination-btn"
            aria-label="Previous page"
            disabled={current === 1}
            onClick={() => onChange(current - 1)}
          >
            &lt;
          </button>
          <select
            className="pagination-jumper-select"
            value={current}
            onChange={e => onChange(Number(e.target.value))}
          >
            {Array.from({ length: total }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <span className="pagination-jumper-label">of {total}</span>
          <button
            className="pagination-btn"
            aria-label="Next page"
            disabled={current === total}
            onClick={() => onChange(current + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
} 