import React from 'react';

export function Filters({ onFilterChange, initialFilters }) {
  const [localCategories, setLocalCategories] = React.useState(initialFilters.categories || []);
  
  const [localMinPrice, setLocalMinPrice] = React.useState(String(initialFilters.minPrice || ''));
  const [localMaxPrice, setLocalMaxPrice] = React.useState(String(initialFilters.maxPrice || ''));

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const errs = {};
    const min = localMinPrice ? Number(localMinPrice) : undefined;
    const max = localMaxPrice ? Number(localMaxPrice) : undefined;

    if (min !== undefined && min < 0) errs.min = 'Цена не может быть отрицательной';
    if (max !== undefined && max < 0) errs.max = 'Цена не может быть отрицательной';

    if (min !== undefined && max !== undefined && min >= 0 && max >= 0 && min > max) {
      errs.min = 'Цена «от» не может быть больше цены «до»';
      errs.max = 'Цена «до» не может быть меньше цены «от»';
    }
    return errs;
  };

  const handleApply = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onFilterChange({
      categories: localCategories.length > 0 ? localCategories : undefined,
      minPrice: localMinPrice ? Number(localMinPrice) : undefined,
      maxPrice: localMaxPrice ? Number(localMaxPrice) : undefined,
    });
  };

  const handleMinChange = (e) => {
    setLocalMinPrice(e.target.value);
    setErrors(prev => ({ ...prev, min: '' }));
  };

  const handleMaxChange = (e) => {
    setLocalMaxPrice(e.target.value);
    setErrors(prev => ({ ...prev, max: '' }));
  };

  const handleCategoryChange = (category) => {
    setLocalCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const allCategories = [
    { id: 'electronics', label: 'Электроника' },
    { id: 'jewelery', label: 'Ювелирные изделия' },
    { id: "men's clothing", label: 'Мужская одежда' },
    { id: "women's clothing", label: 'Женская одежда' }
  ];

  return (
    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Категории</label>
          {allCategories.map(cat => (
            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={localCategories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
              />
              {cat.label}
            </label>
          ))}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Цена от: {localMinPrice || 0} ₽</label>
          <input 
            type="number" 
            value={localMinPrice} 
            onChange={handleMinChange} 
            placeholder="0" 
            min="0" 
            style={{ width: '100%', padding: '8px', border: errors.min ? '1px solid red' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', marginBottom: '8px' }} 
          />
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={localMinPrice === '' ? 0 : localMinPrice} 
            onChange={handleMinChange} 
            style={{ width: '100%' }} 
          />
          {errors.min && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.min}</span>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Цена до: {localMaxPrice || 1000} ₽</label>
          <input 
            type="number" 
            value={localMaxPrice} 
            onChange={handleMaxChange} 
            placeholder="1000" 
            min="0" 
            style={{ width: '100%', padding: '8px', border: errors.max ? '1px solid red' : '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', marginBottom: '8px' }} 
          />
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={localMaxPrice === '' ? 1000 : localMaxPrice} 
            onChange={handleMaxChange} 
            style={{ width: '100%' }} 
          />
          {errors.max && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.max}</span>}
        </div>
      </div>
      
      <button onClick={handleApply} style={{ padding: '10px 24px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
        Применить фильтры
      </button>
    </div>
  );
}