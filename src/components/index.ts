import { colorSchemes } from '../core/dashboard-item';
import { BarGraph } from './bar-graph';

export { BarGraph };

let colorScheme: string;
let toggleColorSchemeBtn: HTMLButtonElement;
let barGraph: BarGraph;

document.addEventListener('DOMContentLoaded', () => {
    toggleColorSchemeBtn = document.getElementById('toggle_color_scheme') as HTMLButtonElement;
    barGraph = document.getElementById('bar_graph') as BarGraph;

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
    barGraph.preferredColorScheme = colorScheme.toLowerCase() as colorSchemes;
    toggleColorSchemeBtn.innerText = `Toggle: ${colorScheme}`;
    document.body.classList.toggle('dark', colorScheme == 'Dark');
}