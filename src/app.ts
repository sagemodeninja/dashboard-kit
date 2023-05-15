import '../public/css/demo.css';

import './components'
import './core'
import { DashboardKit } from './core';
import { ColorScheme } from './core/types';

let colorScheme: string;
let toggleColorSchemeBtn: HTMLButtonElement;
let dashboard: DashboardKit;

document.addEventListener('DOMContentLoaded', () => {
    toggleColorSchemeBtn = document.getElementById('toggle_color_scheme') as HTMLButtonElement;
    dashboard = document.getElementById('dashboard') as DashboardKit;

    toggleColorSchemeBtn.addEventListener('click', () => {
        const isDark = colorScheme != 'Dark';

        colorScheme = !isDark ? 'Light' : 'Dark';
        toggleColorScheme();
    });

    colorScheme = resolveColorScheme();
    toggleColorScheme();
});

function resolveColorScheme() {
    const media = '(prefers-color-scheme: dark)';
    const isDark = window.matchMedia && window.matchMedia(media).matches;

    return !isDark ? 'Light' : 'Dark';
}

function toggleColorScheme() {
    dashboard.preferredColorScheme = colorScheme.toLowerCase() as ColorScheme;
    toggleColorSchemeBtn.innerText = `Toggle: ${colorScheme}`;
    document.body.classList.toggle('dark', colorScheme == 'Dark');
}