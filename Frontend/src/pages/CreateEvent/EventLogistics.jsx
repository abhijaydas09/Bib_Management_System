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
  fontSize: 16,
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

function EventLogistics({ form, onChange, onPrev, onNext }) {
  return (
    <>
      <div style={cardStyle}>
        <div style={sectionHeaderStyle}>Stage 2: Event Logistics</div>
        <div style={sectionBodyStyle}>
          <div style={rowStyle}>
            <div style={colStyle}>
              <DateInput
                label={<span style={labelStyle}>Event Date</span>}
                name="eventDate"
                value={form.eventDate}
                onChange={onChange}
                icon={<FaCalendar />}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Start time</span>}
                name="startTime"
                placeholder="Start time"
                value={form.startTime}
                onChange={onChange}
                icon={<FaClock />}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Venue</span>}
                name="venue"
                placeholder="Venue"
                value={form.venue}
                onChange={onChange}
                icon={<FaMapMarkerAlt />}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Location link</span>}
                name="locationLink"
                placeholder="Location link"
                value={form.locationLink}
                onChange={onChange}
                icon={<FaMapMarkedAlt />}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>City</span>}
                name="city"
                placeholder="City"
                value={form.city}
                onChange={onChange}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>District</span>}
                name="district"
                placeholder="District"
                value={form.district}
                onChange={onChange}
              />
            </div>
          </div>
          <div style={rowStyle}>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>State</span>}
                name="state"
                placeholder="State"
                value={form.state}
                onChange={onChange}
              />
            </div>
            <div style={colStyle}>
              <BasicTextInput
                label={<span style={labelStyle}>Country</span>}
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={onChange}
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

export default EventLogistics; 