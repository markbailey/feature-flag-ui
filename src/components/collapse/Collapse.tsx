import { createRef, PropsWithChildren, useEffect } from 'react';
import { HTMLDivProps } from 'types/html';
import styles from './collapse.module.scss';

export type CollapseProps = HTMLDivProps &
  PropsWithChildren<{
    show: boolean;
  }>;

function Collapse(props: CollapseProps) {
  const { children, className, id, show, ...otherProps } = props;
  const ref = createRef<HTMLDivElement>();

  let newClassName = styles.base;
  if (className) newClassName += ` ${className}`;

  useEffect(() => {
    const element = ref.current;
    const height = element?.scrollHeight || 0;

    if (show && element) element.style.height = `${height}px`;
    else if (element) element.style.height = '0';
  }, [show, ref]);

  return (
    <div {...otherProps} ref={ref} className={newClassName}>
      {children}
    </div>
  );
}

export default Collapse;
