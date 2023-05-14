import {
    LitElement,
    html,
    css,
    PropertyValueMap
} from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dashboard-kit')
export class DashboardKit extends LitElement {
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

    @property()
    public gap: number = 12;

    constructor() {
        super();
    }

    public render() {
        return html`<slot></slot>`;
    }

    public updated(changedProperties: PropertyValueMap<any>): void {
        if (changedProperties.has('gap'))
        {
            this.style.gap = `${this.gap}px`;
            this.style.padding = `${this.gap}px`;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-kit": DashboardKit;
    }
}