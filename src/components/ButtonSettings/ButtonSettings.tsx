import { ButtonSettingsWrapper } from './ButtonSettingStyled';

interface IButtonSettings {
  settingButtonHandler: () => void;
  children: React.ReactNode;
}

const ButtonSettings: React.FC<IButtonSettings> = ({ settingButtonHandler, children }) => {
  return <ButtonSettingsWrapper onClick={settingButtonHandler}>{children}</ButtonSettingsWrapper>;
};

export default ButtonSettings;
