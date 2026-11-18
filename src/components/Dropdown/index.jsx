import React, {useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

function ChevronIcon({className}) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 6.25 8 10.25l4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6.3 11.2 3.4 8.3a.75.75 0 1 1 1.06-1.06l1.84 1.84 4.8-4.8a.75.75 0 1 1 1.06 1.06l-5.33 5.33a.75.75 0 0 1-1.06 0Z" />
    </svg>
  );
}

/*
 * Accessible listbox dropdown. Arrow keys / Home / End move, Enter or Space
 * picks, Escape or Tab closes, and a click outside closes it too.
 *
 * options: [{value, label, meta?, short?}]
 *   meta  - small muted badge (e.g. "0.1.5")
 *   short - compact text for the trigger (e.g. "EN"), used by variant="pill"
 */
export default function Dropdown({
  ariaLabel,
  icon,
  options,
  value,
  onChange,
  variant = 'field',
  align = 'left',
}) {
  const id = useId();
  const root = useRef(null);
  const trigger = useRef(null);
  const optionRefs = useRef([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (open) optionRefs.current[active]?.focus();
  }, [open, active]);

  function openList() {
    setActive(selectedIndex);
    setOpen(true);
  }

  function closeList(returnFocus = true) {
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  }

  function choose(index) {
    const option = options[index];
    if (option && option.value !== value) onChange(option.value);
    closeList();
  }

  function onTriggerKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openList();
    }
  }

  function onListKeyDown(event) {
    const last = options.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActive((index) => (index >= last ? 0 : index + 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActive((index) => (index <= 0 ? last : index - 1));
        break;
      case 'Home':
        event.preventDefault();
        setActive(0);
        break;
      case 'End':
        event.preventDefault();
        setActive(last);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(active);
        break;
      case 'Escape':
        event.preventDefault();
        closeList();
        break;
      case 'Tab':
        closeList(false);
        break;
      default:
    }
  }

  const listId = `${id}-list`;

  return (
    <div
      ref={root}
      className={clsx(styles.root, styles[`align-${align}`])}
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={clsx(styles.trigger, styles[variant], open && styles.triggerOpen)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? closeList(false) : openList())}
        onKeyDown={onTriggerKeyDown}
      >
        {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
        <span className={styles.value}>{selected?.short ?? selected?.label}</span>
        {variant === 'field' && selected?.meta && <span className={styles.meta}>{selected.meta}</span>}
        <ChevronIcon className={clsx(styles.chevron, open && styles.chevronOpen)} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className={clsx(styles.list, styles[`list-${variant}`])}
          onKeyDown={onListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            return (
              <li
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                className={clsx(styles.option, index === active && styles.optionActive, isSelected && styles.optionSelected)}
                onMouseEnter={() => setActive(index)}
                onClick={() => choose(index)}
              >
                <span className={styles.optionLabel}>{option.label}</span>
                {option.meta && <span className={styles.optionMeta}>{option.meta}</span>}
                {isSelected && <CheckIcon />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
