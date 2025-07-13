import React from 'react';
import BasicTextInput from '../../components/text-inputs/BasicTextInput';
import DateInput from '../../components/text-inputs/DateInput';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaMapMarkedAlt } from 'react-icons/fa';

const cardStyle = {
  background: '#fff',
  borderRadius: 6,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  marginBottom: 16,
  padding: 0,
  minWidth: 626,
  maxWidth: 900,
};
const sectionHeaderStyle = {
  background: '#e9e9e9',
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  padding: '14px 24px',
  fontWeight: 400,
  fontSize: 20,
  color: '#0B405B',
  borderBottom: '1px solid #e0e0e0',
};
const sectionBodyStyle = {
  padding: '24px 24px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};
const rowStyle = {
  display: 'flex',
  gap: 24,
  marginBottom: 0,
};
const colStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};
const labelStyle = { fontSize: 10, fontWeight: 400 };

function BibCollectionDetails({ form, onChange, onPrev, onNext, onSameVenueChange, sameVenueChecked }) {
  return (
    <>
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}><span style={{color:'#0B405B', fontWeight:400, fontSize:16, }}>Stage 4: Bib Collection Details</span></div>
        <div style={sectionBodyStyle}>
          <div style={rowStyle}>
            <div style={colStyle}>
              <DateInput
                label={<span style={labelStyle}>Bib Collection Start Date</span>}
                name="bibCollectionStartDate"
                value={form.bibCollectionStartDate}
                onChange={onChange}
                icon={<FaCalendar />}
              />
            </div>
            <div style={colStyle}>
              <DateInput
                label={<span style={labelStyle}>Bib Collection End Date</span>}
                name="bibCollectionEndDate"
                value={form.bibCollectionEndDate}
                onChange={onChange}
                icon={<FaCalendar />}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={{...colStyle, flexDirection:'row', alignItems:'center', gap:8, marginBottom: -24}}>
              <input type="checkbox" checked={sameVenueChecked} onChange={onSameVenueChange} id="sameVenue" style={{width:18, height:18}} />
              <label htmlFor="sameVenue" style={{fontWeight:400, color:'#0B405B', fontSize:12, cursor:'pointer'}}>Same as Marathon Venue</label>
            </div>
          </div>
          <div style={rowStyle}>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Venue</span>}
                name="bibCollectionVenue"
                placeholder="Venue"
                value={form.bibCollectionVenue}
                onChange={onChange}
                icon={<FaMapMarkerAlt />}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Location link</span>}
                name="bibCollectionLocationLink"
                placeholder="Location link"
                value={form.bibCollectionLocationLink}
                onChange={onChange}
                icon={<FaMapMarkedAlt />}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Bib Collection Start Time</span>}
                name="bibCollectionStartTime"
                placeholder="Bib Collection Start Time"
                value={form.bibCollectionStartTime}
                onChange={onChange}
                icon={<FaClock />}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Bib Collection End Time</span>}
                name="bibCollectionEndTime"
                placeholder="Bib Collection End Time"
                value={form.bibCollectionEndTime}
                onChange={onChange}
                icon={<FaClock />}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: cardStyle.minWidth,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 12,
          marginTop: 0,
          marginBottom: 32,
        }}
      >
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            style={{
              background: '#EDF0F3',
              color: '#0B405B',
              borderRadius: 2,
              fontWeight: 400,
              fontSize: 10,
              padding: '6px 8px',
              cursor: 'pointer',
              marginRight: 0,
              transition: 'background 0.18s, color 0.18s',
            }}
          >
            Prev
          </button>
        )}
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            style={{
              background: '#0B405B',
              color: '#fff',
              border: 'none',
              borderRadius: 2,
              padding: '6px 8px',
              fontWeight: 400,
              fontSize: 10,
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default BibCollectionDetails; 