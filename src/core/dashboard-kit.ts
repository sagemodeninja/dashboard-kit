import {
    PropertyValueMap,
    html,
    css
} from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { ColorSchemeComponent } from './color-scheme-component';
import { DashboardItem } from './dashboard-item';

@customElement('dashboard-kit')
export class DashboardKit extends ColorSchemeComponent {
    static styles = css`
        :host {
            box-sizing: border-box;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-auto-rows: min-content;
            height: 100%;
            justify-content: space-evenly;
            width: 100%;
        }
    `;

    @queryAssignedElements({ selector: '.dashboard-item' })
    private _items: Array<DashboardItem>;

    @property()
    public gap: number = 12;

    constructor() {
        super();
    }

    protected override render() {
        return html`<slot></slot>`;
    }

    protected override updated(changedProperties: PropertyValueMap<any>): void {
        super.updated(changedProperties);

        if (changedProperties.has('gap'))
        {
            this.style.gap = `${this.gap}px`;
            this.style.padding = `${this.gap}px`;
        }
    }

    protected override setColorScheme(colorScheme: string): void {
        this._items.forEach(i => i.setColorScheme(colorScheme));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-kit": DashboardKit;
    }
}