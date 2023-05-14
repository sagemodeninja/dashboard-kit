import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardItem } from '../core/dashboard-item';
import { SizeDefinition } from '../core/types';

@customElement('dashboard-bar-graph')
export class DashboardBarGraph extends DashboardItem {
    static internalStyles = css``;

    static styles = [
        DashboardItem.styles,
        DashboardBarGraph.internalStyles
    ];

    public override get sizeDefinitions(): SizeDefinition[] {
        return [{ 
            size: 1,
            colSpan: 4,
            rowSpan: 2
        }];
    };

    public override renderContent() {
        return html`
            <span>Hello World!</span>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-bar-graph": DashboardBarGraph;
    }
}