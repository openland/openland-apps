import * as React from 'react';
import { Links } from '../Links';
import * as Types from '../api/Types';
import { XVertical } from './X/XVertical';
import { XCard } from './X/XCard';
import { XItem } from './X/XItem';

export function ListOrganizations(props: { orgs: Types.OrganizationShortFragment[] }) {
    return (
        <XCard>
            <XCard.Content>
                <XVertical separator="large">
                    {props.orgs.map(p => {
                        return (
                            <XItem
                                key={p.id}
                                path={Links.area('sf').org(p.slug).view}
                            >
                                <XItem.Image src={p.logo} />
                                <XItem.Content>
                                    <XItem.Title>{p.title}</XItem.Title>
                                    <XItem.Subtitle>
                                        {((p.isDeveloper) && !(p.isConstructor)) ? 'Developer' : ''}
                                        {(!(p.isDeveloper) && (p.isConstructor)) ? 'Contractor' : ''}
                                        {((p.isDeveloper) && (p.isConstructor)) ? 'Developer, Contractor' : ''}
                                    </XItem.Subtitle>
                                </XItem.Content>
                                {/* <div className="x-dev--short-l">
                                    <XCloudImage
                                        src={p.logo}
                                        placeholder={'/static/img/no-photo.png'}
                                        width={78}
                                        height={78}
                                    />
                                </div> */}

                            </XItem>
                        );
                    })}
                </XVertical>
            </XCard.Content>
        </XCard>
    );
}