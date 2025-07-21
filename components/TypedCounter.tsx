import React from 'react';
import { useTranslation } from 'next-i18next';

// Example of a typed component that leverages i18next types
interface TypedCounterProps {
  initialCount?: number;
}

export const TypedCounter: React.FC<TypedCounterProps> = ({ initialCount = 0 }) => {
  const { t } = useTranslation('common');
  const [count, setCount] = React.useState(initialCount);

  return (
    <div style={{ 
      padding: '16px', 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px',
      backgroundColor: '#fafafa' 
    }}>
      <h4>{t('counter.title')}</h4>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{ 
            padding: '8px 12px', 
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t('counter.decrement')}
        </button>
        
        <span style={{ 
          minWidth: '100px', 
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {/* This demonstrates interpolation with type safety */}
          {t('counter.count', { count })}
        </span>
        
        <button 
          onClick={() => setCount(count + 1)}
          style={{ 
            padding: '8px 12px', 
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {t('counter.increment')}
        </button>
      </div>
    </div>
  );
};
