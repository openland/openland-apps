import * as React from 'react';
import { XLink } from './X/XLink';
import { XCard } from './X/XCard';
import { Links } from '../Links';
import * as Types from '../api/Types';

export class CardProject extends React.Component<{ project: Types.ProjectShortFragment }, { expanded: boolean }> {

    constructor(props: { project: Types.ProjectShortFragment }) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    render() {
        let units: number | undefined = undefined;
        let subtitle: string | undefined = undefined;
        if (this.props.project.proposedUnits !== undefined && this.props.project.existingUnits !== undefined) {
            units = this.props.project.proposedUnits!! - this.props.project.existingUnits!!;
        }
        if (this.props.project.extrasAddress && (this.props.project.extrasAddress.toLowerCase() !== this.props.project.name.toLowerCase())) {
            subtitle = this.props.project.extrasAddress;
        }
        return (
            <XCard>
                <div className={'x-card--in' + (this.props.project.preview ? '' : ' without-photo') + (this.props.project.verified ? ' is-checked' : '') + (this.state.expanded ? ' is-expanded' : '')}>
                    {this.props.project.preview && (<div className="x-card--photo"
                        style={{ backgroundImage: `url(${this.props.project.preview.retina})` }}><XLink path={Links.area('sf').project(this.props.project.slug).view} /></div>)}
                    {!this.props.project.preview && (<div className="x-card--photo no-photo"><XLink path={Links.area('sf').project(this.props.project.slug).view} /></div>)}

                    <div className="x-card--info">
                        <div className="x-card--box">
                            <div className="x-card--title"><XLink path={Links.area('sf').project(this.props.project.slug!!).view}>{this.props.project.name}</XLink></div>
                            {subtitle && (<div className="x-card--text">{subtitle}</div>)}
                        </div>

                        {this.props.project.extrasUrl && (
                            <div className="x-card--btns">
                                {this.props.project.extrasUrl && (<XLink className="x-card--btn" href={this.props.project.extrasUrl}>
                                    <i className="icon-share">{}</i>
                                </XLink>)}
                                {/* <XLink className="x-card--btn" path="#"><i className="icon-edit">{}</i></XLink> */}
                            </div>
                        )}
                    </div>

                    <div className="x-card--tools">
                        <div className="x-card--counter"><span>{units}</span>Net new units</div>
                        <div className="x-card--counter"><span>{this.props.project.extrasYearEnd || '?'}</span>Expected completion</div>

                        {this.props.project.slug && (<XLink path={Links.area('sf').project(this.props.project.slug).view} className="x-card--toggler" />)}
                        {!this.props.project.slug && (<a className="x-card--toggler" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({ expanded: !this.state.expanded });
                        }}>{}</a>)}
                    </div>

                    {/* <div className="x-card--details">
                        {this.props.project.location && (<div className="x-card--map"
                            style={{ backgroundImage: 'url(' + makeLocationUrl(this.props.location) + ')' }}>{}</div>)}
                        {!this.props.location && (<div className="x-card--map no-photo">{}</div>)}

                        <div className="x-card--fields">
                            <table>
                                <tbody>
                                    {this.props.children}
                                </tbody>
                            </table>
                        </div>
                    </div> */}
                </div>
            </XCard>
        );
    }
}