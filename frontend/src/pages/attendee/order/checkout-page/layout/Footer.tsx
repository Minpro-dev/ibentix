import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-low/50">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-bold text-on-surface font-plus-jakarta">Digital Concierge</div>
          <p className="text-on-surface-variant text-sm text-center md:text-left">
            © 2024 Digital Concierge. Curated Experiences.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-on-surface-variant text-sm font-medium hover:underline decoration-primary underline-offset-4" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant text-sm font-medium hover:underline decoration-primary underline-offset-4" href="#">Terms of Service</a>
          <a className="text-on-surface-variant text-sm font-medium hover:underline decoration-primary underline-offset-4" href="#">Help Center</a>
          <a className="text-on-surface-variant text-sm font-medium hover:underline decoration-primary underline-offset-4" href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
};
