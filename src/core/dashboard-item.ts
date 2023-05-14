import {
    LitElement,
    TemplateResult,
    CSSResultGroup,
    PropertyValueMap,
    html,
    css
} from 'lit';
import { property } from 'lit/decorators.js';
import { SizeDefinition } from './types';

export type colorSchemes = 'inherit' | 'light' | 'dark';

export class DashboardItem extends LitElement {
    private _size: number = 1;

    static styles = css`
        :host {
            --base-border: rgba(0 0 0 / 5.78%);
            --base-fill-rest: #FDFDFD;
            --base-fill-hover: #FFFF;
            --base-shadow-rest: rgb(0 0 0 / 4%);
            --base-shadow-hover: rgb(0 0 0 / 10%);
            color-scheme: light;
        }

        :host([data-color-scheme=dark]) {
            --base-border: rgba(0 0 0 / 10%);
            --base-fill-rest: #333333;
            --base-fill-hover: #373737;
            --base-shadow-rest: rgb(0 0 0 / 13%);
            --base-shadow-hover: rgb(0 0 0 / 26%);
            color-scheme: dark;
        }

        :host {
            aspect-ratio: 1 / 1;
        }

        .base {
            background-color: var(--base-fill-rest);
            border: 1px inset var(--base-border);
            border-radius: 7px;
            box-shadow: 0px 2px 4px 0px var(--base-shadow-rest);
            height: 100%;
            position: relative;
            width: 100%;
        }

        :host(:hover) .base {
            background-color: var(--base-fill-hover);
            box-shadow: 0px 2px 4px 0px var(--base-shadow-hover);
        }

        :host(:active) .base {
            box-shadow: none;
        }
    ` as CSSResultGroup;

    protected get sizeDefinitions(): SizeDefinition[] {
        return [{
            size: 1,
            colSpan: 1,
            rowSpan: 1
        },{
            size: 1.5,
            colSpan: 2,
            rowSpan: 1
        },{
            size: 2,
            colSpan: 2,
            rowSpan: 2
        }]
    };

    @property()
    public get size() {
        return this._size;
    }

    public set size(value: number) {
        const valid = this.sizeDefinitions.some(d => d.size == value);
        
        if (!valid) {
            console.error(`Size "${value}" is not valid.`);
            return;
        }

        this._size = value;
    }

    @property({ attribute: 'preferred-color-scheme' })
    public preferredColorScheme: colorSchemes = 'inherit';

    constructor() {
        super();
        
        this.resolveColorScheme();
        this.setSize();
    }

    public render() {
        return html`
        <div class="base">
            ${this.renderContent()}
        </div>
        `;
    }

    public updated(changedProperties: PropertyValueMap<any>) {
        if (changedProperties.has('preferredColorScheme'))
            this.resolveColorScheme();

        if (changedProperties.has('size'))
            this.setSize();
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

    private setSize() {
        const size = this.sizeDefinitions.find(d => d.size == this._size);
        const colSpan = size.colSpan;
        const rowSpan = size.rowSpan;

        this.style.gridColumn = `auto / span ${colSpan}`;
        this.style.gridRow = `auto / span ${rowSpan}`;
        this.style.aspectRatio = `${colSpan} / ${rowSpan}`;
    }
}