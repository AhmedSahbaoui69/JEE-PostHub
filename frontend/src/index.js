import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="-z-20 fixed w-full h-full  dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-700"></div>
            <div className="-z-20 fixed w-full h-full pattern-isometric pattern-blue-300 dark:pattern-gray-500 pattern-bg-slate-200  dark:pattern-bg-transparent
  pattern-size-32 pattern-opacity-1=90 "></div>
            <App/>
    </React.StrictMode>
);