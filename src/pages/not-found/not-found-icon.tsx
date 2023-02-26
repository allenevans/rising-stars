import React from 'react';

export interface NotFoundIconProps {
  className?: string;
}

export const NotFoundIcon: React.FC<NotFoundIconProps> = ({ className }: NotFoundIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className={className}>
      <g data-name="05-error 404">
        <path d="M45 40H3a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3h3v2H3a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h42a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1h-3V8h3a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3z" />
        <path d="M15 39h2v4h-2z" />
        <path d="M13 47h-2v-2a3 3 0 0 1 3-3h10v2H14a1 1 0 0 0-1 1zM31 39h2v4h-2z" />
        <path d="M37 47h-2v-2a1 1 0 0 0-1-1h-5v-2h5a3 3 0 0 1 3 3z" />
        <path d="M9 46h30v2H9zM40 36H8a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h32a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3zM8 2a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h32a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
        <path d="M6 6h36v2H6zM9 3h2v2H9zM13 3h2v2h-2zM17 3h2v2h-2zM1 30h5v2H1zM42 30h5v2h-5zM9 10h2v2H9zM37 10h2v2h-2zM37 30h2v2h-2zM9 30h2v2H9zM17 25h-2v-2h-3a1 1 0 0 1-.781-1.625l4-5A1 1 0 0 1 17 17v4h1v2h-1zm-2.919-4H15v-1.149zM35 25h-2v-2h-3a1 1 0 0 1-.781-1.625l4-5A1 1 0 0 1 35 17v4h1v2h-1zm-2.919-4H33v-1.149zM25 25h-2a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3zm-2-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM13 30h22v2H13zM13 10h22v2H13z" />
      </g>
    </svg>
  );
};
