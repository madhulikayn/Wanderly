# Accessibility Notes

## 1. Custom Modal vs shadcn Dialog

Both the custom `AccessibleModal` component and the `shadcn/ui Dialog` component adhere to the W3C WAI-ARIA Authoring Practices for Modal Dialogs (`role="dialog"` and `aria-modal="true"`), but they handle accessibility mechanics through different structural approaches:

- **Focus Trapping Mechanics**:
  - **Custom Modal (`playground/AccessibleModal.tsx`)**: Manages focus trapping explicitly in application code using a multi-layer strategy. It uses top and bottom focus sentinel guard elements (`<div tabIndex={0} aria-hidden="true" onFocus={...} />`), a document-wide `focusin` event listener, and a `keydown` listener to prevent `Tab` / `Shift+Tab` from escaping the dialog container.
  - **shadcn Dialog (`src/components/ui/dialog.tsx`)**: Delegates focus trapping to the underlying `@radix-ui/react-dialog` primitive, which manages focus trapping and focus containment automatically at the DOM node level without requiring manual sentinel elements.

- **Keyboard Handling & Escape Key closing**:
  - **Custom Modal**: Explicitly attaches a global `keydown` event listener to handle `Escape` keypresses, triggering the `onClose` callback function and cleaning up listeners on unmount.
  - **shadcn Dialog**: Uses Radix UI's internal keyboard event dispatcher to detect `Escape` keypresses and backdrop overlay interaction.

- **Focus Restoration**:
  - **Custom Modal**: Captures `document.activeElement` inside a `useRef` upon mounting, and restores focus to that trigger element when the modal unmounts during cleanup.
  - **shadcn Dialog**: Relies on Radix UI's automatic focus restoration mechanism, which tracks the trigger node and returns focus when `DialogContent` unmounts.

- **Background Scroll Locking**:
  - **Custom Modal**: Sets `document.body.style.overflow = 'hidden'` on open and restores original overflow styles on close via `useEffect` cleanup.
  - **shadcn Dialog**: Radix UI handles scroll locking automatically, adding `pointer-events: none` and `overflow: hidden` to `document.body` while also adjusting scrollbar layout offsets to prevent page shift.

---

## 2. Custom Tabs vs shadcn Tabs

The custom `AccessibleTabs` component and the `shadcn/ui Tabs` component implement the W3C WAI-ARIA Tabs pattern, with key implementation comparisons detailed below:

- **ARIA Roles and Relationships**:
  - **Both**: Utilize `role="tablist"` for the container, `role="tab"` for each selector, and `role="tabpanel"` for the content panels.
  - **Both**: Maintain explicit associations linking each tab trigger to its content panel via `aria-controls` and `aria-labelledby` referencing stable IDs.

- **Roving `tabIndex`**:
  - **Custom Tabs (`playground/AccessibleTabs.tsx`)**: Manages `tabIndex` explicitly: the active tab receives `tabIndex={0}` and inactive tabs receive `tabIndex={-1}`, ensuring only one tab stops sequential `Tab` focus when entering the tablist.
  - **shadcn Tabs (`src/components/ui/tabs.tsx`)**: Delegates roving `tabIndex` management to `@radix-ui/react-tabs`, which applies `tabIndex={0}` to the active trigger and `tabIndex={-1}` to inactive triggers automatically.

- **Keyboard Navigation**:
  - **Custom Tabs**: Explicitly intercepts `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, and `End` keys in a `onKeyDown` handler to compute target tab indices with modulo arithmetic for wrapping.
  - **shadcn Tabs**: Inherits automatic arrow key navigation (with configurable orientation) provided out-of-the-box by Radix UI.

- **Focus Management**:
  - **Custom Tabs**: Maintains a React `useRef` map (`tabRefs = useRef<Map<string, HTMLButtonElement>>`) to store DOM element references and programmatically invoke `.focus()` when navigating between tabs.
  - **shadcn Tabs**: Radix UI handles DOM element references and focus placement internally.

- **Implementation Complexity**:
  - **Custom Tabs**: Requires custom state handling (`useState`), DOM ref tracking (`useRef`), manual ARIA attribute bindings, and keyboard event routing.
  - **shadcn Tabs**: Delegates state, focus movement, and keyboard interaction to Radix UI primitives while providing customizable, styled React wrapper components.

---

## 3. Key Takeaways

1. **ARIA Attributes Alone Are Not Enough**: Adding `role="dialog"` or `role="tablist"` without accompanying keyboard handlers and focus control does not make an element accessible; proper keyboard interactions (`Tab`, `Enter`, `Space`, `Arrow` keys) and state synchronization are required.
2. **Focus Management Is Critical for Modal Dialogs**: Modal dialogs must actively prevent focus from leaking to background elements, handle focus restoration upon dismissal, and ensure keyboard users are never trapped or lost.
3. **Headless Accessible Primitives Streamline Development**: Utilizing well-tested headless libraries (such as Radix UI primitives underlying shadcn/ui) reduces manual boilerplate code for complex focus trapping, portal rendering, and ARIA state management while retaining total styling flexibility.
