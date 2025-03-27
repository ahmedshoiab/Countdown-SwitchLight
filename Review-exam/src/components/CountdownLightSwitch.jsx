import React, { useState, useEffect } from "react";
import "./index.css";

function CountdownLightSwitch() {
    const [theme, setTheme] = useState("dark");
    const [timeLeft, setTimeLeft] = useState(30);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        document.body.className = theme; // Apply theme to body
    }, [theme]);

    useEffect(() => {
        if (timeLeft === 0) {
            setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        }
    }, [timeLeft]);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    return (
        <div className="container">
            <div className="header">
                <h1>Countdown & Light Switch</h1>
                <div className="toggle-container">
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={theme === "light"} 
                            onChange={() => setTheme(theme === "dark" ? "light" : "dark")} 
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <div className="timer-section">
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${(30 - timeLeft) / 30 * 100}%` }}></div>
                </div>
                <div className="timer">{timeLeft > 0 ? `${timeLeft}s` : "Time's Up!"}</div>
                <div className="btn-group">
                    <button onClick={() => setIsRunning(true)}>Start Timer</button>
                    {timeLeft === 0 && (
                        <button onClick={() => { setTimeLeft(30); setIsRunning(false); }}>Reset Timer</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CountdownLightSwitch;
