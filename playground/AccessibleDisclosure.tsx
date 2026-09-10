import React, { useState, useId } from 'react';

/**
 * Props definition for the AccessibleDisclosure component.
 */
export interface AccessibleDisclosureProps {
  /** Heading or title displayed on the trigger button */
  title: string;
  /** Content rendered inside the expandable panel */
  children: React.ReactNode;
  /** Optional initial expanded state (defaults to false) */
  defaultExpanded?: boolean;
  /** Optional custom CSS classes for the outer wrapper */
  className?: string;
}

/**
 * AccessibleDisclosure Component
 *
 * Implements W3C WAI-ARIA Authoring Practices for Disclosure Pattern:
 * - Real semantic <button> element as the disclosure trigger.
 * - aria-expanded reflects open/closed state.
 * - aria-controls connects trigger to the content panel via stable ID.
 * - Content panel with stable ID matching aria-controls.
 * - Keyboard support via native button semantics (Tab focusable, Enter/Space toggles).
 * - Hidden content when collapsed (hidden attribute & CSS display: none).
 */
export const AccessibleDisclosure: React.FC<AccessibleDisclosureProps> = ({
  title,
  children,
  defaultExpanded = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultExpanded);

  // Generate stable, unique IDs for ARIA association across renders
  const uniqueId = useId();
  const triggerId = `disclosure-trigger-${uniqueId}`;
  const contentId = `disclosure-content-${uniqueId}`;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`border border-slate-800 rounded-xl bg-slate-900/40 overflow-hidden ${className}`}>
      {/* 
        ARIA Disclosure Requirement:
        - Real semantic <button> element for trigger.
        - aria-expanded indicates whether controlled region is expanded or collapsed.
        - aria-controls identifies the element controlled by this button.
        - Native <button> natively provides Tab focusability and Enter / Space activation.
      */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-slate-100 bg-slate-900/80 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors duration-150"
      >
        <span>{title}</span>
        {/* Visual expand/collapse indicator */}
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-400' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 
        ARIA Disclosure Content Region:
        - Controlled content has a stable ID linked to aria-controls on the trigger.
        - When collapsed, content is hidden from DOM & accessibility tree.
      */}
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={`p-5 text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed ${
          !isOpen ? 'hidden' : 'block animate-in fade-in duration-150'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AccessibleDisclosure;
