import {
    LitElement,
    TemplateResult,
    CSSResultGroup,
    PropertyValueMap,
    html,
    css
} from 'lit';
import { property } from 'lit/decorators.js';

export type colorSchemes = 'inherit' | 'light' | 'dark';

export class DashboardItem extends LitElement {
    static styles = css`
        :host {
            --color: red;
            color-scheme: light;
        }

        :host([data-color-scheme=dark]) {
            --color: green;
            color-scheme: dark;
        }
    ` as CSSResultGroup;

    @property({ attribute: 'preferred-color-scheme' })
    public preferredColorScheme: colorSchemes = 'inherit';

    constructor() {
        super();
        this.resolveColorScheme();
    }

    public render() {
        return html`
        <div>
            ${this.renderContent()}
        </div>
        `;
    }

    public updated(changedProperties: PropertyValueMap<any>) {
        if (changedProperties.has('preferredColorScheme'))
            this.resolveColorScheme();
    }

    /**
     * Renders the content of a dashboard item.
     */
    protected renderContent(): TemplateResult {
        return null;
    }

    private resolveColorScheme() {
        let colorScheme = this.preferredColorScheme;
        
        if (!this.preferredColorScheme || this.preferredColorScheme == 'inherit')
        {
            const media = '(prefers-color-scheme: dark)';
            const isDark = window.matchMedia && window.matchMedia(media).matches;

            colorScheme = !isDark ? 'light' : 'dark';
        }

        this.dataset.colorScheme = colorScheme;
    }
}