import React, { useState, useRef, useId, KeyboardEvent } from 'react';

/**
 * Data structure defining an individual tab item.
 */
export interface TabItem {
  /** Unique stable string identifier for the tab */
  id: string;
  /** Accessible visual label displayed on the tab button */
  label: string;
  /** React node content displayed inside the corresponding tabpanel */
  content: React.ReactNode;
}

/**
 * Props definition for the AccessibleTabs component.
 */
export interface AccessibleTabsProps {
  /** Array of tab items to render */
  items: TabItem[];
  /** Optional ID of the initially active tab (defaults to first tab if omitted) */
  defaultActiveId?: string;
  /** Accessible aria-label for the tablist container */
  label?: string;
  /** Optional custom CSS classes for the container */
  className?: string;
}

/**
 * AccessibleTabs Component
 *
 * Implements W3C WAI-ARIA Authoring Practices for Tabs pattern:
 * - Tablist container with role="tablist" and aria-label.
 * - Tab buttons with role="tab", aria-selected, aria-controls, and roving tabIndex.
 * - Tab panels with role="tabpanel", aria-labelledby, and tabIndex={0}.
 * - Keyboard navigation (ArrowLeft, ArrowRight, Home, End) with automatic focus & activation.
 * - Mouse click support for activation.
 * - Stable unique IDs connecting tabs and panels.
 */
export const AccessibleTabs: React.FC<AccessibleTabsProps> = ({
  items,
  defaultActiveId,
  label = 'Content tabs',
  className = '',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultActiveId || (items.length > 0 ? items[0].id : '')
  );

  const baseId = useId();
  // Map holding references to DOM button elements for keyboard focus management
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  /**
   * Helper to activate a tab by ID and move keyboard focus to it.
   */
  const focusAndActivateTab = (id: string) => {
    setActiveTabId(id);
    const tabEl = tabRefs.current.get(id);
    if (tabEl) {
      tabEl.focus();
    }
  };

  /**
   * Handles keyboard navigation according to W3C ARIA Tabs specification:
   * - ArrowRight / ArrowDown: Moves focus to the next tab (wraps to first).
   * - ArrowLeft / ArrowUp: Moves focus to the previous tab (wraps to last).
   * - Home: Moves focus to the first tab.
   * - End: Moves focus to the last tab.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (items.length === 0) return;

    let targetIndex = -1;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        targetIndex = (currentIndex + 1) % items.length;
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        targetIndex = (currentIndex - 1 + items.length) % items.length;
        break;

      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;

      case 'End':
        e.preventDefault();
        targetIndex = items.length - 1;
        break;

      default:
        return;
    }

    if (targetIndex !== -1) {
      focusAndActivateTab(items[targetIndex].id);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 
        Requirement 1: role="tablist"
      */}
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-wrap gap-1 border-b border-slate-800 pb-px"
      >
        {items.map((item, index) => {
          const isSelected = item.id === activeTabId;
          const tabId = `${baseId}-tab-${item.id}`;
          const panelId = `${baseId}-panel-${item.id}`;

          return (
            <button
              key={item.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              /* Roving tabIndex: only the active tab receives tab focus from outside */
              tabIndex={isSelected ? 0 : -1}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(item.id, el);
                } else {
                  tabRefs.current.delete(item.id);
                }
              }}
              onClick={() => focusAndActivateTab(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`px-4 py-2.5 text-sm font-medium rounded-t-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                isSelected
                  ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* 
        Requirement 1: role="tabpanel" for each panel
      */}
      {items.map((item) => {
        const isSelected = item.id === activeTabId;
        const tabId = `${baseId}-tab-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isSelected}
            className={`p-6 bg-slate-900/60 border border-t-0 border-slate-800 rounded-b-2xl text-slate-300 outline-none focus:ring-2 focus:ring-emerald-500/50 ${
              isSelected ? 'block animate-in fade-in duration-150' : 'hidden'
            }`}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
