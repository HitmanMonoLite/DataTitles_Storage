import { useState, useEffect, useMemo } from 'react';

import { ThemeContext } from "@/context/ThemeContext";

const BackgroundTheme = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    const themeValues = useMemo(() => ({
    theme,
    buttonBackgroundTheme:
        theme === 'dark' ? '#000000' : '#1677ff62',
    objectBackgroundTheme:
        theme === 'dark' ? '#08133ad2' : '#dbdbdb',
    colorTheme: 
        theme === 'dark' ? '#ffffff' : '#000000',
    sliderColor:
        theme === 'dark' ? '#1677ff' : '#ffffff',
    selectedBackgroundTheme:
        theme === 'dark' ? '#1677ff' : '#ffffff',
    selectedColorTheme:
        theme === 'dark' ? '#ffffff' : '#000000',
    
    loginBackgroundThemeBody:
        theme === 'dark' 
            ? `
            /* left-line */
            linear-gradient(to right, rgb(2, 13, 54) 0.08%, rgba(0,0,0,0) 2%),
            /* right-line */
            linear-gradient(to right, rgba(0,0,0,0) 98%, rgb(2, 13, 54) 100%),
            /* up-line */
            linear-gradient(to bottom,rgb(2, 13, 54) 0.08%, rgba(0,0,0,0) 4%),
            /* doun-line */
            linear-gradient(to bottom, rgba(0,0,0,0) 96%, rgb(2, 13, 54) 99.92%),
            #000000
            `
            :
            `
            radial-gradient(
                circle at center,
                rgba(56, 118, 255, 0.35) 0%,
                rgba(22, 119, 255, 0.15) 20%,
                rgba(0, 0, 0, 0.45) 80%,
                rgba(0, 0, 0, 0.75) 100%
            ),
            linear-gradient(
                135deg,
                #08133ad2 0%,
                #0f1f6d 50%,
                #1677ff 100%
            )
            `,
    loginBackgroundThemeHeader:
        theme === 'dark' ? '#000000' : '#202c70',
    setTheme,
    changeTheme,
    }), [theme]);

    useEffect(() => {
        const background = theme === 'dark'
            ? `
            /* left-line */
            linear-gradient(to right, rgb(0, 225, 255) 0.08%, rgb(2, 13, 54) 0.08%, rgba(0,0,0,0) 2%),
            /* right-line */
            linear-gradient(to right, rgba(0,0,0,0) 98%, rgb(2, 13, 54) 99.92%, rgb(0, 225, 255) 100%),
            /* up-line */
            linear-gradient(to bottom, rgb(0, 225, 255) 0.08%, rgb(2, 13, 54) 0.08%, rgba(0,0,0,0) 4%),
            /* doun-line */
            linear-gradient(to bottom, rgba(0,0,0,0) 96%, rgb(2, 13, 54) 99.92%, rgb(0, 225, 255) 100%),
            #000000
            `
            : 
            `
            radial-gradient(
                circle at center,
                rgba(56, 118, 255, 0.35) 0%,
                rgba(22, 119, 255, 0.15) 30%,
                rgba(0, 0, 0, 0.45) 70%,
                rgba(0, 0, 0, 0.75) 100%
            ),
            linear-gradient(
                135deg,
                #08133ad2 0%,
                #0f1f6d 50%,
                #1677ff 100%
            )
            `;

        document.body.style.background = background;
    }, [theme]);
    
    return (
        <div>
             <ThemeContext.Provider value={ themeValues }>
                <div
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                }}
                ></div>
                {children}
            </ThemeContext.Provider>
        </div>
  );
};

export default BackgroundTheme;