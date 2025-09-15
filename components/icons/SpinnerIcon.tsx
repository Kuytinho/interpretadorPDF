
import React from 'react';

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
    <path
      style={{ animation: 'spin 1s linear infinite' }}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v3m0 12v3m9-9h-3m-12 0H3m16.5-4.5l-2.12-2.12M6.62 17.38l-2.12-2.12M17.38 6.62l2.12-2.12M6.62 6.62l-2.12 2.12"
    />
  </svg>
);
