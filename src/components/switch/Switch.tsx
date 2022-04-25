import { ChangeEventHandler } from 'react';
import styles from './switch.module.scss';

type SwitchProps = {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

function Switch(props: SwitchProps) {
  const { checked = false, onChange } = props;

  return (
    <div className={styles.root}>
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className={styles.text} />
        <span className={styles.handle} />
      </label>
    </div>
  );
}

export default Switch;
