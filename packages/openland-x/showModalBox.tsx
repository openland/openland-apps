import * as React from 'react';
import { XModal, showModal, XModalController } from './showModal';
import { css } from 'linaria';
import { randomKey } from 'openland-graphql/utils/randomKey';
import * as className from 'classnames';
import { XScrollView3 } from './XScrollView3';

const boxStyle = css`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 3px 14px 4px #82777747;
    max-height: 100vh;
    max-width: 100vw;
`

const overlayHiding = css`
    opacity: 0;
    transition: opacity 75ms;
`;

const overlayVisible = css`
    opacity: 1;
    transition: opacity 150ms;
`;

const overlayShowing = css`
    opacity: 0;
`;

const overlayStyle = css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
`;

class ModalBoxComponent extends React.Component<{ ctx: XModalController, modal: XModal }, { status: 'showing' | 'visible' | 'hiding' }> {
    private readonly key = randomKey();
    private readonly contents: React.ReactElement<{}>;

    constructor(props: { modal: XModal, ctx: XModalController }) {
        super(props);
        let ctx2: XModalController = {
            hide: () => {
                this.tryHide();
            },
            setOnEscPressed: () => {
                // Ignore?
            }
        }
        this.contents = this.props.modal(ctx2);
        this.props.ctx.setOnEscPressed(() => {
            this.tryHide();
        });
        this.state = { status: 'showing' };
    }

    private handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === this.key) {
            this.tryHide();
        }
    }

    private tryHide = () => {
        if (this.state.status !== 'hiding') {
            this.setState({ status: 'hiding' }, () => {
                setTimeout(() => { this.props.ctx.hide() }, 75);
            });
        }
    }

    componentDidMount() {
        this.setState({ status: 'visible' });
    }

    render() {
        return (
            <div
                id={this.key}
                className={className(
                    overlayStyle,
                    (this.state.status === 'showing') && overlayShowing,
                    (this.state.status === 'visible') && overlayVisible,
                    (this.state.status === 'hiding') && overlayHiding,
                )}
                onClick={this.handleContainerClick}
            >
                <div className={boxStyle}>
                    <XScrollView3 maxHeight="calc(100vh - 48px)">
                        {this.contents}
                    </XScrollView3>
                </div>
            </div>
        )
    }
}

export function showModalBox(modal: XModal) {
    showModal((ctx) => {
        return (
            <ModalBoxComponent modal={modal} ctx={ctx} />
        )
    })
}