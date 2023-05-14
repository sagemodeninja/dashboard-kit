import { LitElement, PropertyValueMap } from 'lit'
import { property } from 'lit/decorators.js'
import { ColorScheme } from './types';

export class ColorSchemeComponent extends LitElement {
    @property({ attribute: 'preferred-color-scheme' })
    public preferredColorScheme: ColorScheme = 'inherit';

    constructor() {
        super();
        this.resolveColorScheme();
    }

    protected override updated(changedProperties: PropertyValueMap<any>) {
        if (changedProperties.has('preferredColorScheme'))
            this.resolveColorScheme();
    }

    protected setColorScheme(colorScheme: string) {
        // Override in child class...
    }

    private resolveColorScheme() {
        let colorScheme = this.preferredColorScheme;
        
        if (!colorScheme || colorScheme == 'inherit')
        {
            const media = '(prefers-color-scheme: dark)';
            const isDark = window.matchMedia && window.matchMedia(media).matches;

            colorScheme = !isDark ? 'light' : 'dark';
        }

        this.setColorScheme(colorScheme);
    }
}