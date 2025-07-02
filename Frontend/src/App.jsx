import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BasicTextInput from './components/text-inputs/BasicTextInput'
import PhoneNumberInput from './components/text-inputs/PhoneNumberInput'
import DropdownInput from './components/text-inputs/DropdownInput'
import SearchInput from './components/text-inputs/SearchInput'
import DateInput from './components/text-inputs/DateInput'
import TimeInput from './components/text-inputs/TimeInput'
import Button from './components/button/Button'
import OtpInput from './components/otp-input/OtpInput'
import Tooltip from './components/tooltip/Tooltip'
import Toast from './components/toast/Toast'
import Tabs from './components/tabs/Tabs'
import TabsBoxed from './components/tabs/TabsBoxed'
import Table from './components/table/Table'
import ProgressBar from './components/progress-bar/ProgressBar'
import Pagination from './components/pagination/Pagination'
import Modal from './components/modal/Modal'

const colorRoles = [
  { name: 'Primary', variable: '--color-primary' },
  { name: 'Secondary 1', variable: '--color-secondary-1' },
  { name: 'Secondary 2', variable: '--color-secondary-2' },
  { name: 'Neutral', variable: '--color-neutral' },
  { name: 'Text Primary', variable: '--color-text-primary' },
  { name: 'Text Muted', variable: '--color-text-muted' },
  { name: 'Error', variable: '--color-error' },
  { name: 'Success', variable: '--color-success' },
  { name: 'Warning', variable: '--color-warning' },
  { name: 'Border', variable: '--color-border' },
];

const dropdownOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

function ThemeDemo() {
  const [theme, setTheme] = useState('light');
  const [inputValue, setInputValue] = useState('');
  const [active, setActive] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [dropdownValue, setDropdownValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [otp6, setOtp6] = useState('');
  const [otp4, setOtp4] = useState('');
  const [showToasts, setShowToasts] = useState(true);
  const handleDismiss = () => setShowToasts(false);
  const handleAction = () => alert('Action clicked!');
  const [activeTab, setActiveTab] = useState(0);
  const tabDemoData = [
    {
      label: 'Payments',
      leadingIcon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2"/></svg>
      ),
      trailingItem: <span>12</span>,
    },
    { label: 'Refunds' },
    { label: 'Disputes' },
    { label: 'Settlements' },
  ];
  // Icon SVG for demo
  const DemoIcon = (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h14M10 3l7 7-7 7"/></svg>
  );

  // Table demo data
  const [tablePage, setTablePage] = useState(0);
  const tablePageSize = 10;
  const tableTotal = 240;
  const tableColumns = [
    { key: 'paymentId', label: 'Payment ID' },
    { key: 'bankRrn', label: 'Bank RRN', render: (val, row) => <div>{val}<div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{row.bankType}</div></div> },
    { key: 'customer', label: 'Customer Details' },
    { key: 'createdOn', label: 'Created On' },
    { key: 'amount', label: 'Amount', render: val => <b>₹ {val.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b> },
    { key: 'status', label: 'Status', render: val => <span className="table-status-label">{val}</span> },
    { key: 'actions', label: 'Actions', render: () => <button className="table-details-btn">Details <span style={{ color: 'var(--color-primary)' }}>{'>'}</span></button> },
  ];
  const tableData = Array.from({ length: tablePageSize }, (_, i) => ({
    paymentId: 'Row Title',
    bankRrn: '123456789012',
    bankType: ['Credit Card', 'UPI', 'Paypal Wallet', 'Debit Card'][i % 4],
    customer: '+91-90867 54857',
    createdOn: 'Fri Feb 27, 1:33pm',
    amount: 1000,
    status: 'Label',
    actions: '',
  }));
  const tableSummary = '0123456789';

  const [page, setPage] = useState(7);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
  }, [theme]);

  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{ marginBottom: 24, padding: '8px 16px', fontSize: 16 }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {colorRoles.map(role => (
          <div key={role.variable} style={{
            background: `var(${role.variable})`,
            color: role.name.includes('Text') ? 'var(--color-text-primary)' : '#fff',
            border: '2px solid var(--color-border)',
            borderRadius: 8,
            width: 160,
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontWeight: 600 }}>{role.name}</div>
            <div style={{ fontSize: 12 }}>{role.variable}</div>
          </div>
        ))}
      </div>
      <h2 className="header" style={{marginTop: 48}}>Text Input Fields</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <BasicTextInput label="Label" placeholder="Placeholder" value={inputValue} onChange={e => setInputValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <BasicTextInput label="Label" placeholder="" value={inputValue} onChange={e => setInputValue(e.target.value)} isActive={true} />
        </div>
        <div>
          <div className="subheader">Disabled fields</div>
          <BasicTextInput label="Label" placeholder="Placeholder" value="" disabled />
        </div>
        <div>
          <div className="subheader">Error Message</div>
          <BasicTextInput label="Label" placeholder="Placeholder" value={inputValue} onChange={e => setInputValue(e.target.value)} error="Error Message" />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Phone Number Fields</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 500 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <PhoneNumberInput label="Label" placeholder="Placeholder" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} countryCode={countryCode} onCountryChange={e => setCountryCode(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <PhoneNumberInput label="Label" placeholder="Placeholder" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} countryCode={countryCode} onCountryChange={e => setCountryCode(e.target.value)} isActive={true} />
        </div>
        <div>
          <div className="subheader">Disabled fields</div>
          <PhoneNumberInput label="Label" placeholder="Placeholder" value="" countryCode={countryCode} onCountryChange={e => setCountryCode(e.target.value)} disabled />
        </div>
        <div>
          <div className="subheader">Error Message</div>
          <PhoneNumberInput label="Label" placeholder="Placeholder" value={phoneValue} onChange={e => setPhoneValue(e.target.value)} countryCode={countryCode} onCountryChange={e => setCountryCode(e.target.value)} error="Error Message" />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Drop Down Menu</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 500 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <DropdownInput label="Label" options={dropdownOptions} value={dropdownValue} onChange={e => setDropdownValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <DropdownInput label="Label" options={dropdownOptions} value={dropdownValue} onChange={e => setDropdownValue(e.target.value)} isActive={true} />
        </div>
        <div>
          <div className="subheader">Disabled fields</div>
          <DropdownInput label="Label" options={dropdownOptions} value={dropdownValue} onChange={e => setDropdownValue(e.target.value)} disabled />
        </div>
        <div>
          <div className="subheader">Error Message</div>
          <DropdownInput label="Label" options={dropdownOptions} value={dropdownValue} onChange={e => setDropdownValue(e.target.value)} error="Error Message" />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Search Fields</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 500 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <SearchInput value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <SearchInput value={searchValue} onChange={e => setSearchValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Disabled fields</div>
          <SearchInput value={searchValue} onChange={e => setSearchValue(e.target.value)} disabled />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Date Picker Fields</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 500 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <DateInput label="Label" value={dateValue} onChange={e => setDateValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <DateInput label="Label" value={dateValue} onChange={e => setDateValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Disabled fields</div>
          <DateInput label="Label" value={dateValue} onChange={e => setDateValue(e.target.value)} disabled />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Time Fields</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 500 }}>
        <div>
          <div className="subheader">Default Fields</div>
          <TimeInput label="Label" value={timeValue} onChange={e => setTimeValue(e.target.value)} />
        </div>
        <div>
          <div className="subheader">Active Fields</div>
          <TimeInput label="Label" value={timeValue} onChange={e => setTimeValue(e.target.value)} />
        </div>
      <div>
          <div className="subheader">Disabled fields</div>
          <TimeInput label="Label" value={timeValue} onChange={e => setTimeValue(e.target.value)} disabled />
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Button Demo (Mouse Interaction)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
        <label style={{ color: 'var(--color-text-muted)', fontSize: 14, marginBottom: 4 }}>
          <input type="checkbox" checked={buttonDisabled} onChange={e => setButtonDisabled(e.target.checked)} style={{ marginRight: 8 }} />
          Disabled
        </label>
        <Button
          leadingIcon={DemoIcon}
          disabled={buttonDisabled}
          style={{
            background: 'var(--color-primary)',
            color: '#000',
            transition: 'all 200ms',
          }}
        >
          Button
        </Button>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 14, maxWidth: 400 }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><b>Default:</b> Not hovered, not focused, not pressed.</li>
            <li><b>Hover:</b> Move your mouse over the button.</li>
            <li><b>Active:</b> Click and hold the button.</li>
            <li><b>Focus:</b> Click or Tab to the button (shows white border).</li>
            <li><b>Disabled:</b> Use the checkbox above to disable/enable the button.</li>
          </ul>
        </div>
      </div>
      <h2 className="header" style={{marginTop: 48}}>OTP Input Demo</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32 }}>
        <OtpInput label="6-digit OTP" helpText="Enter the 6-digit code" length={6} value={otp6} onChange={setOtp6} />
        <OtpInput label="4-digit OTP" helpText="Enter the 4-digit code" length={4} value={otp4} onChange={setOtp4} />
      </div>
      <h2 className="header" style={{marginTop: 48}}>Tooltip Demo</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 32 }}>
        <Tooltip heading="Heading Text" body={"This section right here contains the text that goes inside of the tooltip."}>
          <button style={{ padding: '12px 24px', borderRadius: 8, background: 'var(--color-primary)', color: '#000', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Hover or focus me
        </button>
        </Tooltip>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Toast Demo</h2>
      {showToasts && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <Toast type="info" onAction={handleAction} onDismiss={handleDismiss} />
          <Toast type="success" onAction={handleAction} onDismiss={handleDismiss} />
          <Toast type="error" onAction={handleAction} onDismiss={handleDismiss} />
          <Toast type="warning" onAction={handleAction} onDismiss={handleDismiss} />
          <Toast type="neutral" onAction={handleAction} onDismiss={handleDismiss} />
        </div>
      )}
      <h2 className="header" style={{marginTop: 48}}>Tabs Demo</h2>
      <Tabs tabs={tabDemoData} activeIndex={activeTab} onTabClick={setActiveTab} />
      <div style={{ color: 'var(--color-text-muted)', fontSize: 16, marginTop: 12 }}>
        Selected tab: <b>{tabDemoData[activeTab].label}</b>
      </div>
      <h2 className="header" style={{marginTop: 48}}>TabsBoxed Demo</h2>
      <TabsBoxed tabs={tabDemoData} activeIndex={activeTab} onTabClick={setActiveTab} />
      <div style={{ color: 'var(--color-text-muted)', fontSize: 16, marginTop: 12 }}>
        Selected tab: <b>{tabDemoData[activeTab].label}</b>
      </div>
      <h2 className="header" style={{marginTop: 48}}>Table Demo</h2>
      <Table
        columns={tableColumns}
        data={tableData}
        summary={tableSummary}
        page={tablePage}
        pageSize={tablePageSize}
        total={tableTotal}
        onPageChange={setTablePage}
        actionButton={<button>+ Payout</button>}
      />
      <section style={{ margin: '2rem 0' }}>
        <h2>Progress Bar Demo</h2>
        <ProgressBar label="Label" value={50} max={100} />
      </section>
      <section style={{ margin: '2rem 0' }}>
        <h2>Pagination Demo</h2>
        <Pagination current={page} total={20} onChange={setPage} showJumper={true} />
      </section>
      <section style={{ margin: '2rem 0' }}>
        <h2>Modal Demo</h2>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          leading={<span style={{fontSize:'1.3em'}}>☆</span>}
          title="Header Title"
          counter={12}
          label={<span>Label</span>}
          trailing={null}
          subtitle="Header Subtitle"
          primaryAction={{ label: 'Primary', onClick: () => setModalOpen(false) }}
          secondaryAction={{ label: 'Secondary', onClick: () => setModalOpen(false) }}
        >
          <div style={{height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b6aaff'}}>
            Modal body content
          </div>
        </Modal>
      </section>
    </div>
  );
}

function App() {
  return <ThemeDemo />;
}

export default App
