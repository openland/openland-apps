import * as React from 'react';
import { ListCardProps } from '../api/List';
import { formatDuration } from '../utils/date';
import { PermitStatus } from './PermitStatus';
import { InfiniteListContainer, XInfiniteListItem } from './withInfiniteList';
import { DataListCard, DataListCardItem } from './DataListCard';
import { XCard } from './X/XCard';
import { XLink } from './X/XLink';
import { XCounter } from './X/XCounter';
import { XCloudImage } from './X/XCloudImage';
import { XEnumeration } from './X/XEnumerations';
import { PermitType } from './PermitType';

export class ListCard extends React.Component<ListCardProps, { cardData?: any; cardType?: string }> {
    constructor(props: ListCardProps) {
        super(props);
    }

    render() {

        if (this.props.cardType === 'permits') {
            return (
                <InfiniteListContainer>
                    {
                        this.props.cardData.map((item: any) => (
                            <XInfiniteListItem key={item.id}>
                                <XCard>
                                    <div className="x-permit">
                                        <div className="x-permit--in">
                                            <XLink path={'/permits/' + item.id} className="x-permit--id">
                                                {item.id}
                                            </XLink>
                
                                            <div className="x-permit--keys">
                                                {item.streetNumbers!!.length > 0 && (
                                                    <div className="x-permcard--key">
                                                        <span>
                                                            {item.streetNumbers!![0].streetNumber + (item.streetNumbers!![0].streetNumberSuffix ? item.streetNumbers!![0].streetNumberSuffix!! : '') +
                                                                ' ' + item.streetNumbers!![0].streetName + (item.streetNumbers!![0].streetNameSuffix ? ' ' + item.streetNumbers!![0].streetNameSuffix : '')}
                                                        </span>
                                                        Address
                                                    </div>
                                                )}
                
                                                {item.proposedUnits && (
                                                    <div className="x-permcard--key">
                                                        <span><XCounter value={item.proposedUnits!!} oldValue={item.existingUnits} /></span>
                                                        Units
                                                    </div>
                                                )}
                
                                                {item.approvalTime != null && (
                                                    <div className="x-permcard--key">
                                                        <span>{formatDuration(item.approvalTime)}</span>
                                                        Approval time
                                                    </div>
                                                )}
                                            </div>
                
                                            <div className="x-permit--wrap">
                                                {item.status && <PermitStatus status={item.status} date={item.statusUpdatedAt} />}
                                            </div>
                                        </div>
                
                                        <div className="x-permit--box">
                                            <div className="x-permit--type"><PermitType type={item.type!!}/></div>
                                            <div className="x-permit--text">{item.description}</div>
                
                                            <XLink path={'/permits/' + item.id}
                                                className="x-permit--btn"><span>View details</span></XLink>
                                        </div>
                                    </div>
                                </XCard>
                            </XInfiniteListItem>
                        ))
                    }
                </InfiniteListContainer>
            )
        }

        if (this.props.cardType === 'organizations') {
            return (
                <InfiniteListContainer>
                    {this.props.cardData.map((item: any) => {
                        let subtitle = undefined;
                        if (item.isDeveloper) {
                            if (item.isConstructor) {
                                subtitle = 'Developer and Contractor';
                            } else {
                                subtitle = 'Developer';
                            }
                        } else {
                            subtitle = 'Contractor';
                        }

                        let project = null;
                        if (item.developerIn && item.developerIn.length > 0) {
                            project = item.developerIn!![0];
                        } else if (item.constructorIn && item.constructorIn.length > 0) {
                            project = item.constructorIn!![0];
                        }

                        let featured = undefined;
                        if (project !== null) {
                            featured = {
                                title: project.name,
                                url: '/projects/' + project.slug,
                                picture: project.preview
                            };
                        }

                        let projectsLenght: number = item.constructorIn!!.length + item.developerIn!!.length

                        return (
                            <XInfiniteListItem key={item.id}>
                                <XCard>
                                    <div className={'x-card--in is-organization' + (item.logo ? '' : ' without-photo')}>
                                        <XLink path={'/organizations/' + item.slug}>
                                            {item.logo && (<div className="x-card--photo">
                                                <XCloudImage src={item.logo} maxWidth={140} maxHeight={140}/>
                                            </div>)}
                                            {!item.logo && (<div className="x-card--photo no-photo">{}</div>)}
                                        </XLink>

                                        <div className="x-card--info">
                                            <div className="x-card--box">
                                                <div className="x-card--title" style={{textColor: '#000000'}}><XLink
                                                    path={'/organizations/' + item.slug}>{item.title}</XLink></div>
                                                {subtitle && (<div className="x-card--text">{subtitle}</div>)}
                                            </div>

                                            {item.url && (
                                                <div className="x-card--btns">
                                                    {item.url && (<a className="x-card--btn" href={item.url} target="_blank"><i
                                                        className="icon-share">{}</i></a>)}
                                                    {/* <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a> */}
                                                </div>
                                            )}
                                        </div>

                                        <div className="x-card--tools">
                                            {
                                                (projectsLenght !== undefined) && 
                                                ((projectsLenght > 0) && 
                                                (<div className="x-card--counter">
                                                <span>{
                                                    projectsLenght
                                                }
                                                </span>recent projects</div>))
                                            }

                                            {featured && (
                                                <XLink path={`/projects/${featured.url}`}
                                                    className={'x-card--counter is-project' + (featured.picture ? ' with-photo' : '')}>
                                                    {featured.picture && (
                                                        <img src={featured.picture.retina} alt=""/>)}

                                                    <span>{featured.title}</span>
                                                    featured project
                                                </XLink>
                                            )}

                                            <XLink className="x-card--toggler is-link" path={`/organizations/'${item.profile}`}>View profile</XLink>
                                        </div>
                                    </div>
                                </XCard>
                            </XInfiniteListItem>
                        )
                    })}
                </InfiniteListContainer>
            )
        }

        if (this.props.cardType === 'projects') {
            return (
                this.props.cardData.map((item: any) => {
                    let units: number | undefined = undefined;
                    let subtitle: string | undefined = undefined;
                    if (item.proposedUnits !== undefined && item.existingUnits !== undefined) {
                        units = item.proposedUnits!! - item.existingUnits!!;
                    }
                    if (item.extrasAddress && (item.extrasAddress.toLowerCase() !== item.name.toLowerCase())) {
                        subtitle = item.extrasAddress;
                    }

                    return (
                        <XInfiniteListItem key={item.id}>
                            <DataListCard
                                title={item.name}
                                newUnits={units}
                                endYear={item.extrasYearEnd}
                                subtitle={subtitle}
                                picture={item.preview}
                                verified={item.verified}
                                url={item.extrasUrl}
                                location={item.extrasLocation}
                                slug={item.slug}
                            >
                                {item.extrasAddressSecondary && (
                                    <DataListCardItem title="Secondary address">{item.extrasAddressSecondary}</DataListCardItem>
                                )}
                                {item.developers!!.length > 0 && (
                                    <DataListCardItem title="Developers">
                                        <XEnumeration>
                                            {item.developers!!.map((d: any) => (
                                                <XLink path={'/organizations/' + d.slug}>{d.title}</XLink>
                                            ))}
                                        </XEnumeration>
                                    </DataListCardItem>
                                )}
                                {item.constructors!!.length > 0 && (
                                    <DataListCardItem title="Contractors">
                                        <XEnumeration>
                                            {item.constructors!!.map((d: any) => (
                                                <XLink path={'/organizations/' + d.slug}>{d.title}</XLink>
                                            ))}
                                        </XEnumeration>
                                    </DataListCardItem>
                                )}
            
                                {item.extrasComment && (
                                    <DataListCardItem title="Comment">{item.extrasComment}</DataListCardItem>
                                )}

                            </DataListCard>
                        </XInfiniteListItem>
                    );
                })
            )
        } else {
            return (
                <div>приветик</div>
            )
        }
    }
}