import { ChangeEventHandler } from 'react';
import { HTMLInputProps, HTMLSelectProps } from 'types/html';

type ControlProps = AdditionalControl &
  (HTMLInputProps | HTMLSelectProps) & {
    disabled?: boolean;
    onChange?: ChangeEventHandler;
  };

function InputControl(props: ControlProps) {
  const { className, tagName, type, value, options, disabled, onChange } =
    props;

  switch (tagName) {
    case 'select':
      return (
        <select
          value={value}
          onChange={onChange}
          className={className}
          disabled={disabled}
        >
          <option value="" disabled>
            Select
          </option>

          {options?.map(({ text, value }) => (
            <option key={`${text}_${value}`} value={value}>
              {text}
            </option>
          ))}
        </select>
      );
    case 'input':
      return (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={className}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
}

export default InputControl;
