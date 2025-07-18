import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import AddStaffModal from '../../components/modal/AddStaffModal';
import axios from 'axios';

function ActionMenu({ onViewQRLogs, onRemove }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span
        style={{ color: '#109960', fontWeight: 500, cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        View Action
      </span>
      {open && (
        <div style={{
          position: 'absolute',
          top: 24,
          right: 0,
          background: '#fff',
          border: '1px solid #e3e8ef',
          borderRadius: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          zIndex: 10,
          minWidth: 120
        }}>
          <div
            style={{ padding: '8px 16px', cursor: 'pointer', color: '#0B405B', fontWeight: 500 }}
            onClick={() => { setOpen(false); onViewQRLogs && onViewQRLogs(); }}
          >
            View QR Logs
          </div>
          <div
            style={{ padding: '8px 16px', cursor: 'pointer', color: '#e53935', fontWeight: 500 }}
            onClick={() => { setOpen(false); onRemove && onRemove(); }}
          >
            Remove
          </div>
        </div>
      )}
    </div>
  );
}

const staffColumns = [
  { label: 'Select All', key: 'select', render: (val, row, idx, selected, onSelect) => (
      <input type="radio" name="selectStaff" checked={selected === row.userId} onChange={() => onSelect(row.userId)} />
    ) },
  { label: 'First Name', key: 'firstName' },
  { label: 'Last Name', key: 'lastName' },
  { label: 'Phone Number', key: 'phoneNumber' },
  { label: 'User-ID', key: 'userId' },
  { label: 'Role', key: 'role', render: () => 'Staff' },
  { label: 'Activity', key: 'activity', render: (val) => (
      <span style={{ color: val === 'Online' ? '#4CAF50' : '#e53935', fontWeight: 500 }}>{val}</span>
    ) },
  { label: 'Actions', key: 'actions', render: (val, row) => (
      <ActionMenu
        onViewQRLogs={() => alert(`View QR Logs for ${row.firstName} ${row.lastName}`)}
        onRemove={() => alert(`Remove staff: ${row.firstName} ${row.lastName}`)}
      />
    ) },
];

const EVENT_ID = '68710b78d6126635978b59b2';

export default function ManageStaff() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/auth/staff_by_event/${EVENT_ID}`, { withCredentials: true });
        setStaff(res.data);
      } catch (err) {
        alert('Error fetching staff: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  // Filtered data
  const filteredData = staff.filter(row =>
    row.firstName.toLowerCase().includes(search.toLowerCase()) ||
    row.lastName.toLowerCase().includes(search) ||
    row.phoneNumber.includes(search) ||
    row.userId.includes(search)
  );

  return (
    <div style={{ padding: 32, background: '#fff', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
        <BasicTextInput
          placeholder="SEARCH"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 220 }}
        />
        <BasicTextInput
          placeholder="SORT"
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ width: 120 }}
        />
        <BasicTextInput
          placeholder="FILTER"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ width: 120, marginLeft: -100 }}
        />
        <button
          style={{
            background: '#109960',
            color: '#fff',
            border: 'none',
            borderRadius: 2,
            padding: '4px 8px',
            fontWeight: 400,
            fontSize: 14,
            cursor: 'pointer',
            textAlign: 'center',
            width: 80,
            height: 31,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -200
          }}
          onClick={() => setAddModalOpen(true)}
        >
          + Add
        </button>
      </div>
      <Table
        columns={staffColumns.map(col =>
          col.key === 'select'
            ? { ...col, render: (val, row) => col.render(val, row, null, selected, setSelected) }
            : col
        )}
        data={filteredData.slice(page * pageSize, (page + 1) * pageSize)}
        page={page}
        pageSize={pageSize}
        total={filteredData.length}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {loading && <div style={{textAlign:'center', color:'#0B405B'}}>Loading staff...</div>}
      <AddStaffModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddStaff={async form => {
          // Map frontend form fields to backend API fields
          const payload = {
            firstName: form.firstName,
            lastName: form.lastName,
            phoneNumber: form.phone, // backend expects phoneNumber
            userId: form.userId,
            password: form.password,
            event: EVENT_ID, // hardcoded event ID
          };
          try {
            await axios.post('http://localhost:8000/api/auth/staff_signup', payload, { withCredentials: true });
            setAddModalOpen(false);
            // Refresh staff list after adding
            const res = await axios.get(`http://localhost:8000/api/auth/staff_by_event/${EVENT_ID}`, { withCredentials: true });
            setStaff(res.data);
            alert('Staff added successfully!');
          } catch (err) {
            alert('Error adding staff: ' + (err.response?.data?.message || err.message));
          }
        }}
      />
    </div>
  );
}