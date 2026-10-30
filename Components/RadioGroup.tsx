"use client";

import { useId, useState } from "react";

export interface RadioOption {
  value: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}

const RADIO_STYLES = `
  .radio-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: fit-content;
  }

  .radio-group__option {
    display: block;
    position: relative;
    width: 18px;
    height: 18px;
    flex: 0 0 18px;
    cursor: pointer;
    user-select: none;
  }

  .radio-group__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 1;
  }

  .radio-group__mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: #EDEDED;
    border: 1px solid #858585;
    border-radius: 50%;
    box-sizing: border-box;
    pointer-events: none;
    transition:
      background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .radio-group__mark::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #FFFFFF;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition:
      transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.2s ease;
  }

  .radio-group__option:hover .radio-group__input:not(:checked) ~ .radio-group__mark {
    background-color: #E4E4E4;
    border-color: #858585;
  }

  .radio-group__option:active .radio-group__input:not(:checked) ~ .radio-group__mark {
    background-color: #D6D6D6;
    border-color: #D6D6D6;
  }

  .radio-group__option:active .radio-group__input:not(:checked) ~ .radio-group__mark::after {
    transform: translate(-50%, -50%) scale(0.4);
    opacity: 1;
  }

  .radio-group__input:checked ~ .radio-group__mark {
    background-color: #242424;
    border-color: #242424;
  }

  .radio-group__input:checked ~ .radio-group__mark::after {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  .radio-group__option:hover .radio-group__input:checked ~ .radio-group__mark {
    background-color: #404040;
    border-color: #404040;
  }

  .radio-group__option:active .radio-group__input:checked ~ .radio-group__mark {
    background-color: #595959;
    border-color: #595959;
  }

  .radio-group__option:active .radio-group__input:checked ~ .radio-group__mark::after {
    transform: translate(-50%, -50%) scale(0.4);
  }

  .radio-group__input:focus-visible ~ .radio-group__mark {
    outline: 2px solid #858585;
    outline-offset: 3px;
  }

  .radio-group__option--disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .radio-group__option--disabled .radio-group__input {
    cursor: not-allowed;
  }
`;

export function RadioGroup({
  options,
  name,
  value,
  defaultValue,
  onChange,
  disabled = false,
  ariaLabel = "Radio options",
  className = "",
}: RadioGroupProps) {
  const groupId = useId();

  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? ""
  );

  const selectedValue = value !== undefined ? value : internalValue;
  const groupName = name ?? `radio-${groupId}`;

  const handleChange = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <>
      <style>{RADIO_STYLES}</style>

      <div
        className={`radio-group ${className}`.trim()}
        role="radiogroup"
        aria-label={ariaLabel}
      >
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const isDisabled = disabled || !!option.disabled;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`radio-group__option ${
                isDisabled ? "radio-group__option--disabled" : ""
              }`}
            >
              <input
                id={optionId}
                className="radio-group__input"
                type="radio"
                name={groupName}
                value={option.value}
                checked={selectedValue === option.value}
                disabled={isDisabled}
                aria-label={option.ariaLabel ?? `Option ${index + 1}`}
                onChange={() => handleChange(option.value)}
              />

              <span
                className="radio-group__mark"
                aria-hidden="true"
              />
            </label>
          );
        })}
      </div>
    </>
  );
}

export default RadioGroup;
