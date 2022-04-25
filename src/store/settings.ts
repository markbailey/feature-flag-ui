import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import settings from '../settings.json';

const initialState: SettingsState = {
  data: settings as (Settings | SettingGroup)[]
};

function getSettingById(settings: (Settings | SettingGroup)[], id: string) {
  let match: SettingWithChildren | undefined;

  for (let i = 0; i < settings.length; i++) {
    const setting = settings[i];
    const keys = Object.keys(setting);

    if (keys.includes('id') && (setting as SettingWithChildren).id === id)
      match = setting as SettingWithChildren;
    else if (keys.includes('children'))
      match = getSettingById(
        (setting as SettingWithChildren).children || [],
        id
      );
    else if (keys.includes('0'))
      match = getSettingById(setting as Settings[], id);
    else if (keys.includes('items'))
      match = getSettingById((setting as SettingGroup).items, id);

    if (match !== undefined) break;
  }

  return match;
}

// Store slice
const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSetting: (
      state,
      action: PayloadAction<{
        id: string;
        enabled: boolean;
        inputValue?: string | number;
      }>
    ) => {
      const { payload } = action;
      let setting = getSettingById(state.data, payload.id);

      if (!setting) return;
      setting.enabled = payload.enabled;

      if (payload.inputValue && setting.additionalControl)
        setting.additionalControl.value = payload.inputValue;

      if (!setting.enabled) {
        setting.children?.forEach((child) => {
          if (Array.isArray(child))
            child.forEach((grandChild: Setting) => {
              grandChild.enabled = false;
            });
          else child.enabled = false;
        });
      }
    }
  }
});

export const { updateSetting } = slice.actions;
export const reducer = slice.reducer;
