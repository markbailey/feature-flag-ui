/// <reference types="react-scripts" />

declare type DispatchAction = {
  type: string;
  payload?: unknown;
};

declare type SelectOption = {
  text: string;
  value: string;
};

declare type AdditionalControl = {
  tagName: 'input' | 'select';
  type?: 'text' | 'number';
  value: string | number;
  options?: SelectOption[];
};

declare type Setting = {
  id: string;
  label: string;
  enabled: boolean;
  additionalControl?: AdditionalControl;
};

declare type SettingWithChildren = Setting & {
  children?: Setting[];
};

declare type Settings = SettingWithChildren | SettingWithChildren[];

declare type SettingGroup = {
  label: string;
  items: Settings[];
};

// State
declare type SettingsState = {
  data: (Settings | SettingGroup)[];
};
