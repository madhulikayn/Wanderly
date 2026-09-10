import React, { useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';

/**
 * Props definition for the AccessibleModal component.
 */
export interface AccessibleModalProps {
  /** Controls visibility state of the modal dialog */
  isOpen: boolean;
  /** Callback triggered to request closing the modal (Escape key, overlay click, close button) */
  onClose: () => void;
  /** Primary title of the dialog, linked to aria-labelledby */
  title: string;
  /** Optional descriptive subtitle, linked to aria-describedby */
  description?: string;
  /** Body content rendered inside the modal */
  children: React.ReactNode;
}

/**
 * Selector for all interactively focusable elements.
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * AccessibleModal Component
 *
 * Implements W3C WAI-ARIA Authoring Practices for Modal Dialogs:
 * - Uses role="dialog", aria-modal="true", and aria-labelledby / aria-describedby.
 * - Focus is programmatically moved into the dialog upon opening.
 * - Multi-layer focus trap (keydown interception + Focus Guard sentinels + focusin document trap)
 *   guarantees focus never escapes to the background page or browser controls.
 * - Pressing Escape key closes the modal.
 * - Upon closing, keyboard focus is restored to the triggering element.
 * - Clean event listener management with useEffect cleanup.
 */
export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Generate unique IDs for aria-labelledby and aria-describedby
  const titleId = useId();
  const descriptionId = useId();

  /**
   * Helper function to query all visible, focusable HTML elements within the modal.
   */
  const getFocusableElements = (): HTMLElement[] => {
    if (!modalRef.current) return [];
    const elements = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    return elements.filter(
      (el) =>
        el.offsetWidth > 0 ||
        el.offsetHeight > 0 ||
        el.getClientRects().length > 0
    );
  };

  // Effect 1: Handle initial focus placement, body scroll locking, and focus restoration
  useEffect(() => {
    if (isOpen) {
      // 1. Store element that triggered the modal
      previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

      // 2. Lock background scrolling
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // 3. Move keyboard focus inside the modal on mount
      const animationFrameId = requestAnimationFrame(() => {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      });

      return () => {
        cancelAnimationFrame(animationFrameId);
        document.body.style.overflow = originalOverflow;

        // 4. Restore focus to original trigger element when modal closes
        if (
          previouslyFocusedElementRef.current &&
          typeof previouslyFocusedElementRef.current.focus === 'function'
        ) {
          previouslyFocusedElementRef.current.focus();
        }
      };
    }
  }, [isOpen]);

  // Effect 2: Manage keyboard listeners (Escape & Tab focus trap) and focusin trap
  useEffect(() => {
    if (!isOpen) return;

    // Handle key press (Escape key close + Tab focus trap)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements();

        // Handle 0 focusable elements safely
        if (focusableElements.length === 0) {
          e.preventDefault();
          if (modalRef.current) {
            modalRef.current.focus();
          }
          return;
        }

        // Handle 1 focusable element safely
        if (focusableElements.length === 1) {
          e.preventDefault();
          focusableElements[0].focus();
          return;
        }

        const activeElement = document.activeElement as HTMLElement | null;
        const currentIndex = activeElement
          ? focusableElements.indexOf(activeElement)
          : -1;

        if (e.shiftKey) {
          // Shift + Tab: Wrap from first (or outside) to last
          if (currentIndex === 0 || currentIndex === -1) {
            e.preventDefault();
            focusableElements[focusableElements.length - 1].focus();
          }
        } else {
          // Tab: Wrap from last (or outside) to first
          if (currentIndex === focusableElements.length - 1 || currentIndex === -1) {
            e.preventDefault();
            focusableElements[0].focus();
          }
        }
      }
    };

    // Catch any focus movement outside the modal and pull it back inside
    const handleFocusIn = (e: FocusEvent) => {
      if (
        modalRef.current &&
        e.target instanceof Node &&
        !modalRef.current.contains(e.target)
      ) {
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isOpen, onClose]);

  // Focus guard handlers for Sentinel elements
  const handleFocusTopGuard = () => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    } else if (modalRef.current) {
      modalRef.current.focus();
    }
  };

  const handleFocusBottomGuard = () => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else if (modalRef.current) {
      modalRef.current.focus();
    }
  };

  if (!isOpen) return null;

  const modalOverlay = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Focus Guard Sentinel */}
      <div
        tabIndex={0}
        aria-hidden="true"
        onFocus={handleFocusTopGuard}
        className="sr-only"
      />

      {/* 
        Semantic Modal Container:
        - role="dialog"
        - aria-modal="true"
        - aria-labelledby pointing to dialog title
        - aria-describedby pointing to dialog description (if provided)
      */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl outline-none text-slate-100 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 id={titleId} className="text-xl font-bold text-slate-50 tracking-tight">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>

          {/* Accessible Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="py-4 text-slate-300">{children}</div>
      </div>

      {/* Bottom Focus Guard Sentinel */}
      <div
        tabIndex={0}
        aria-hidden="true"
        onFocus={handleFocusBottomGuard}
        className="sr-only"
      />
    </div>
  );

  return createPortal(modalOverlay, document.body);
};
