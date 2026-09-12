import { NotificationProvider } from "./components/providers/NotificationProvider";

import { AuthProvider } from "./context/AuthContext";

import LeftPanel from "./components/panels/LeftPanel/LeftPanel"
import BackgroundTheme from "./components/theme/BackgroundTheme"
import DownPanel from "./components/panels/DownPanel/DownPanel"
import RightPanel from "./components/panels/RightPanel/RightPanel"

import "./App.css"

function App() {

  return (
    <div>
      <div className="min-h-screen">
        <NotificationProvider>
          <AuthProvider>
            <BackgroundTheme>
              <RightPanel/>
              <LeftPanel/>
              <DownPanel/>
            </BackgroundTheme>
          </AuthProvider>
        </NotificationProvider>
      </div>
    </div>
  )
}

export default App
