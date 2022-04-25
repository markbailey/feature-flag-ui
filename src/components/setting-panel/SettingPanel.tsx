import { ChangeEvent, memo, useEffect, useState } from 'react';

import Switch from 'components/switch';
import InputControl from 'components/input-control';
import styles from './setting-panel.module.scss';
import Collapse from 'components/collapse';

type SettingPanelProps = SettingWithChildren & {
  onChange?: (id: string, enabled: boolean, inputValue?: string) => void;
};

export const settingStyles = styles;

function SettingPanel(props: SettingPanelProps) {
  const [showChildren, setShowChildren] = useState(false);
  const {
    children,
    id,
    label,
    enabled,
    additionalControl: controlProps,
    onChange
  } = props;

  let rootClassName = styles.root;
  let className = styles.panel;

  if (children !== undefined) rootClassName += ` ${styles.hasChildren}`;
  if (controlProps) className += ` ${styles.hasControl}`;
  if (showChildren) className += ` ${styles.open}`;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onChange) onChange(id, enabled, value);
  };

  const onSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (onChange) onChange(id, checked);
  };

  useEffect(() => {
    if (children !== undefined) setShowChildren(enabled);
  }, [enabled, children]);

  return (
    <div className={rootClassName}>
      <div id={id} className={className}>
        <span className={styles.label}>{label}</span>
        {controlProps && (
          <InputControl
            {...controlProps}
            onChange={onInputChange}
            className={styles.control}
            disabled={!enabled}
          />
        )}
        <Switch checked={enabled} onChange={onSwitchChange} />
      </div>

      {children && (
        <Collapse show={showChildren}>
          {children.map((child) => (
            <SettingPanel key={child.id} {...child} onChange={onChange} />
          ))}
        </Collapse>
      )}
    </div>
  );
}

export default memo(SettingPanel);
