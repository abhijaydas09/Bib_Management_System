import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Analytics from './Analytics';
import ManageParticipants from './ManageParticipants';
import ManageStaff from './ManageStaff';
import EditDetails from './EditDetails';
import QRLogs from './QRLogs';
import PreviewPage from './PreviewPage';
import DeleteEvent from './DeleteEvent';
import OrganiserNavbar from '../../components/tabs/OrganiserNavbar';
import './MarathonManagement.css';

// Single-color SVG icons (stroke: #0B405B, size: 22)
const analyticsIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="12" width="4" height="8"/><rect x="9" y="8" width="4" height="12"/><rect x="15" y="4" width="4" height="16"/></svg>
);
const participantIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
);
const staffIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20c0-2.5 5-4 5-4s5 1.5 5 4"/><path d="M12 20c0-2.5 5-4 5-4s5 1.5 5 4"/></svg>
);
const editIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
);
const qrIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M7 17v4M3 17h4v4"/></svg>
);
const previewIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B405B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
);
const deleteIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);

const tabs = [
  { label: 'View Analytics', icon: analyticsIcon },
  { label: 'Manage Participants', icon: participantIcon },
  { label: 'Manage Staff', icon: staffIcon },
  { label: 'Edit Details', icon: editIcon },
  { label: 'View QR Logs', icon: qrIcon },
  { label: 'Preview Page', icon: previewIcon },
  { label: 'Delete Event', icon: deleteIcon },
];

const tabComponents = [
  <Analytics />,
  <ManageParticipants />,
  <ManageStaff />,
  <EditDetails />,
  <QRLogs />,
  <PreviewPage />,
  <DeleteEvent />,
];

function MarathonManagement() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#f7fafd' }}>
      <OrganiserNavbar />
      <div className="marathon-management-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 66px)', width: '100vw' }}>
        <Sidebar tabs={tabs} activeIndex={activeTab} onTabClick={setActiveTab} />
        <main style={{ flex: 1, padding: 0, background: '#f7fafd', width: '100%' }}>
          {tabComponents[activeTab]}
        </main>
      </div>
    </div>
  );
}

export default MarathonManagement; 