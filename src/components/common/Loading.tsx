import React from 'react';

const Loading: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="w-8 h-8 border-4 border-vintage-brown border-t-transparent rounded-full animate-spin"></div>
    {text && <p className="mt-3 text-gray-600">{text}</p>}
  </div>
);

export default Loading;