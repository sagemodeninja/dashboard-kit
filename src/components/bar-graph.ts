import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardItem } from '../core/dashboard-item';

@customElement('bar-graph')
export class BarGraph extends DashboardItem {
    static internalStyles = css`
        span {
            color: blue;
        }
    `;

    static styles = [
        DashboardItem.styles,
        BarGraph.internalStyles
    ];

    public override renderContent() {
        return html`
            <span>Hello World!</span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "bar-graph": BarGraph;
    }
}