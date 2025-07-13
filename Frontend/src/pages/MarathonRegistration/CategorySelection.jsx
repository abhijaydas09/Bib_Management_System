import React from 'react';
import CategorySelectionTable from './CategorySelectionTable';

const categories = [
  { name: 'Beginner', distance: '3 KM', age: '-NA-', time: '7:30 am', fees: 'INR 400' },
  { name: 'Professional', distance: '6 KM', age: '12-40', time: '7:30 am', fees: 'INR 750' },
  { name: 'Senior Special', distance: '2 KM', age: 'above 50', time: '7:30 am', fees: 'INR 300' },
];

const headerStyle = {
  background: '#e9e9e9',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: '14px 24px',
  fontWeight: 400,
  fontSize: 20,
  color: '#0B405B',
  borderBottom: '1px solid #e0e0e0',
};

const columns = [
  {
    key: 'select',
    label: '',
    render: (value, row, idx, { selectedCategory, onCategoryChange }) => (
      <input
        type="radio"
        name="category"
        value={row.name}
        checked={selectedCategory === row.name}
        onChange={() => onCategoryChange(row.name)}
        style={{ accentColor: '#0B405B', width: 10, height: 10, display: 'block', margin: '0 auto' }}
      />
    ),
    align: 'center',
  },
  { key: 'name', label: 'Category', align: 'left' },
  { key: 'distance', label: 'Distance', align: 'center' },
  { key: 'age', label: 'Age Restriction', align: 'center' },
  { key: 'time', label: 'Time', align: 'center' },
  { key: 'fees', label: 'Fees', align: 'center' },
];

function CategorySelection({ selectedCategory, onCategoryChange }) {
  // Table expects data, columns, and can use render for custom cells
  // We'll pass selectedCategory and onCategoryChange as extra context for the render function
  const tableColumns = columns.map(col =>
    col.render
      ? { ...col, render: (value, row, idx) => col.render(value, row, idx, { selectedCategory, onCategoryChange }) }
      : col
  );

  return (
    <>
      <div style={headerStyle}>Stage 2: Category Selection</div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <div style={{ width: 600, maxWidth: '95vw', margin: '0 auto', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ padding: '18px 24px 0 24px', fontWeight: 500, color: '#0B405B', fontSize: 15, textAlign: 'left', width: '100%', marginLeft:32 }}>
            Select any categories
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: -16}}>
            <div style={{ margin: '0 auto' }}>
              <CategorySelectionTable
                columns={tableColumns}
                data={categories}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySelection; 