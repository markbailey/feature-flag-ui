import { useCallback } from 'react';

import { updateSetting } from 'store/settings';
import { useAppDispatch, useAppSelector } from 'hooks';
import SettingPanel, { settingStyles } from 'components/setting-panel';
import gridStyles from 'assets/stylesheets/grid.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { data: settings } = useAppSelector((state) => state.settings);

  const generalSettings = settings.filter(
    (setting) => setting.hasOwnProperty('id') || Array.isArray(setting)
  ) as Settings[];

  const settingGroups = settings.filter(
    (setting) => typeof setting === 'object' && setting.hasOwnProperty('items')
  ) as SettingGroup[];

  const onSettingChange = useCallback(
    (id: string, enabled: boolean, inputValue?: string) =>
      dispatch(updateSetting({ id, enabled, inputValue })),
    [dispatch]
  );

  const renderSetting = (data: Settings, group: string, index: number) => {
    if (Array.isArray(data))
      return (
        <div key={`${group}_${index}`} className={settingStyles.group}>
          {data.map((setting) => (
            <SettingPanel
              key={setting.id}
              {...setting}
              onChange={onSettingChange}
            />
          ))}
        </div>
      );

    return <SettingPanel key={data.id} {...data} onChange={onSettingChange} />;
  };

  return (
    <>
      <h3>General</h3>
      <div className={gridStyles.container}>
        {generalSettings.map((setting, index) =>
          renderSetting(setting, 'general', index)
        )}
      </div>
      <br />

      <div className={gridStyles.container}>
        {settingGroups.map(({ label, items }, indexA) => (
          <div key={`${label}_${indexA}`}>
            <h3>{label}</h3>
            {items.map((setting, indexB) =>
              renderSetting(setting, `${label}_${indexA}`, indexB)
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
