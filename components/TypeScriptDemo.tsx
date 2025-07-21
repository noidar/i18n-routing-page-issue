import React from 'react';
import { useTranslation } from 'next-i18next';

/**
 * Demonstration component showing TypeScript support for next-i18next
 * 
 * This component shows:
 * 1. Type-safe translation keys with full autocomplete
 * 2. Compile-time validation of translation keys
 * 3. Support for nested translation objects  
 * 4. Interpolation with type safety
 */
export const TypeScriptDemo: React.FC = () => {
  const { t } = useTranslation('common');
  const [count, setCount] = React.useState(5);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px 0',
      border: '2px solid #4caf50', 
      borderRadius: '8px',
      backgroundColor: '#f1f8e9' 
    }}>
      <h3>🚀 TypeScript Support Demo</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>✅ Valid Translation Keys (with autocomplete):</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>• <strong>{t('welcome')}</strong> - Simple key</li>
          <li>• <strong>{t('counter.title')}</strong> - Nested key</li>
          <li>• <strong>{t('pages.about.title')}</strong> - Deeply nested key</li>
          <li>• <strong>{t('counter.count', { count })}</strong> - With interpolation</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>❌ These would cause TypeScript errors:</h4>
        <pre style={{ 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px'
        }}>
{`// ❌ TypeScript Error: Unknown key
t('nonexistent-key')

// ❌ TypeScript Error: Wrong nested path  
t('counter.nonexistent')

// ❌ TypeScript Error: Invalid namespace
t('invalid.namespace.key')`}
        </pre>
      </div>
      
      <div>
        <h4>🎯 Interactive Counter (Type-safe):</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => setCount(count - 1)}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {t('counter.decrement')}
          </button>
          
          <span style={{ fontWeight: 'bold', minWidth: '100px', textAlign: 'center' }}>
            {t('counter.count', { count })}
          </span>
          
          <button 
            onClick={() => setCount(count + 1)}
            style={{ 
              padding: '5px 10px', 
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
    </div>
  );
};
