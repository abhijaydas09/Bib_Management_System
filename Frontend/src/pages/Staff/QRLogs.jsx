import React, { useState } from 'react';
import StaffNavbar from '../../components/tabs/StaffNavbar';
import Table from '../../components/table/Table';

const columns = [
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone Number', key: 'phone' },
  { label: 'Timestamp', key: 'timestamp' },
  { label: 'Category', key: 'category' },
  { label: 'BIB Number', key: 'bib' },
  { label: 'Actions', key: 'actions', render: (val, row) => <button className="table-details-btn">Details</button> },
];

const mockData = [
  { firstName: 'Archit', lastName: 'Chitte', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0001' },
  { firstName: 'Abhijay', lastName: 'Das', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0001' },
  { firstName: 'Samresh', lastName: 'Chaudhari', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0002' },
  { firstName: 'Nidhi', lastName: 'Purthan', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0001' },
  { firstName: 'Parth', lastName: 'Narkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0002' },
  { firstName: 'Varun', lastName: 'Rahatgaonkar', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0003' },
  { firstName: 'Tanaya', lastName: 'Jain', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT02', bib: '2-0005' },
  { firstName: 'Atharva', lastName: 'Pingle', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0002' },
  { firstName: 'Nikhil', lastName: 'Kale', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT01', bib: '1-0004' },
  { firstName: 'Amav', lastName: 'Chouahary', phone: '+91-90867 54857', timestamp: 'Fri Feb 27, 1:35pm', category: 'CAT03', bib: '3-0003' },
];

function QRLogs() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  // Filtered data (search only on firstName, lastName, phone, bib)
  const filteredData = mockData.filter(row =>
    row.firstName.toLowerCase().includes(search.toLowerCase()) ||
    row.lastName.toLowerCase().includes(search.toLowerCase()) ||
    row.phone.includes(search) ||
    row.bib.includes(search)
  );

  return (
    <div>
      <StaffNavbar activeTab="/staff/qr-logs" />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="SEARCH"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 240, height: 32, borderRadius: 4, border: '1px solid #ccc', padding: '0 12px', fontSize: 14 }}
          />
          <button style={{ height: 32, borderRadius: 4, border: '1px solid #ccc', background: '#fff', padding: '0 16px', fontSize: 14 }}>SORT</button>
          <button style={{ height: 32, borderRadius: 4, border: '1px solid #ccc', background: '#fff', padding: '0 16px', fontSize: 14 }}>FILTER</button>
          <button style={{ height: 32, borderRadius: 4, background: '#0B405B', color: '#fff', padding: '0 24px', fontSize: 14, border: 'none' }}>Bib Collection</button>
          <button style={{ height: 32, borderRadius: 4, background: '#e3e8ef', color: '#0B405B', padding: '0 24px', fontSize: 14, border: 'none' }}>Attendance</button>
        </div>
        <Table
          columns={columns}
          data={filteredData.slice(page * pageSize, (page + 1) * pageSize)}
          page={page}
          pageSize={pageSize}
          total={filteredData.length}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
}

export default QRLogs; 