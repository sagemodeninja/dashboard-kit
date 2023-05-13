import {
    LitElement,
    TemplateResult,
    CSSResultGroup,
    html,
    css
} from 'lit';

export class DashboardItem extends LitElement {
    static styles = css`
        span {
            text-decoration: underline;
        }
    ` as CSSResultGroup;

    public render() {
        return html`
        <div>
            ${this.renderContent()}
        </div>
        `;
    }

    /**
     * Renders the content of a dashboard item.
     */
    protected renderContent(): TemplateResult {
        return null;
    }
}