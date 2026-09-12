import { useContext } from "react";
import { Switch } from "antd";
import { ThemeContext } from "../../context/ThemeContext";

function ThemeSwitch() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme === "dark"}
      onChange={changeTheme}
      checkedChildren="OLED"
      unCheckedChildren="Default"
      // {...props}
    />
  );
}

export default ThemeSwitch;