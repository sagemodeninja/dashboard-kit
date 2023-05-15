import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import { DashboardItem } from '../core/dashboard-item';
import { SizeDefinition } from '../core/types';

@customElement('dashboard-bar-graph')
export class DashboardBarGraph extends DashboardItem {
    private _canvasRef: Ref<HTMLCanvasElement> = createRef();

    static internalStyles = css`
        canvas {
            height: 100%;
            width: 100%;
        }
    `;

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

    protected override firstUpdated() {
        // Delay
        setTimeout(() => this.renderGraph(), 100);
    }

    public override renderContent() {
        return html`
            <canvas ${ref(this._canvasRef)}></canvas>
        `;
    }

    private renderGraph() {
        const canvas = this._canvasRef.value;
        const context = canvas.getContext("2d");

        this.scaleCanvas(canvas, context);

        // TODO: Calculate position and size of bars separately
        const container = context.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        const height = rect.height * 0.5;
        const barRect = new DOMRect(10, 10, 10, height);

        // Render bar
        context.fillStyle = 'rgb(96 205 255 / 70%)';
        this.fillRoundedRect(context, barRect, 10);
    }

    private scaleCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
        const rect = canvas.getBoundingClientRect();
        const scaleFactor = window.devicePixelRatio;

        canvas.width = rect.width * scaleFactor;
        canvas.height = rect.height * scaleFactor;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        context.scale(scaleFactor, scaleFactor);
    }

    private fillRoundedRect(context: CanvasRenderingContext2D, rect: DOMRect, cornerRadius: number) {
        // Normalize corner radius
        cornerRadius = Math.min(cornerRadius, rect.width / 2);

        const topOffset = rect.top + cornerRadius;
        const rightOffset = rect.right - cornerRadius;
        const bottomOffset = rect.bottom - cornerRadius;
        const leftOffset = rect.left + cornerRadius;

        context.beginPath();

        // Top, draws left-right corner.
        context.moveTo(rect.left, topOffset);
        context.arcTo(rect.left, rect.top, leftOffset, rect.top, cornerRadius);
        context.arcTo(rect.right, rect.top, rect.right, topOffset, cornerRadius);

        // Left
        context.lineTo(rect.right, bottomOffset);

        // Bottom, draws right-left corner.
        context.arcTo(rect.right, rect.bottom, rightOffset, rect.bottom, cornerRadius);
        context.arcTo(rect.left, rect.bottom, rect.left, bottomOffset, cornerRadius);

        // Right
        context.lineTo(rect.left, topOffset);

        context.closePath();
        context.fill();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "dashboard-bar-graph": DashboardBarGraph;
    }
}