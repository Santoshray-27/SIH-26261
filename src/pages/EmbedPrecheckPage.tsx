import React from 'react';
import { PrecheckEmbedWidget } from '../features/precheck-embed/PrecheckEmbedWidget';

export const EmbedPrecheckPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <PrecheckEmbedWidget />
      </div>
    </div>
  );
};
