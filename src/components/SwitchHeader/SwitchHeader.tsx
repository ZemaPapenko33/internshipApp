import React from 'react';

interface ISwitchHeader {
  children: Array<JSX.Element>;
  value: string;
}

export const SwitchHeader: React.FC<ISwitchHeader> = ({ children, value }): JSX.Element | null => {
  return children.find((child) => child.props[`data-value`] === value) ?? null;
};

export default SwitchHeader;
