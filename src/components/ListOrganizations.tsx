import * as React from 'react';
import { XWrapBody } from './X/XWrap';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';
import { Links } from '../Links';
import * as Types from '../api/Types';

export function ListOrganizations(props: { orgs: Types.OrganizationShortFragment[] }) {
    return (
        <XWrapBody>
            {props.orgs.map(p => {
                return (
                    <XLink key={p.id} path={Links.area('sf').org(p.slug).view} className="x-dev--short">
                        <div className="x-dev--short-l"><XCloudImage src={p.logo}
                            placeholder={'/static/img/no-photo.png'} width={78}
                            height={78} /></div>
                        <div className="x-dev--short-n">{p.title}<span>
                            {((p.isDeveloper) && !(p.isConstructor)) ? 'Developer' : ''}
                            {(!(p.isDeveloper) && (p.isConstructor)) ? 'Contractor' : ''}
                            {((p.isDeveloper) && (p.isConstructor)) ? 'Developer, Contractor' : ''}
                        </span></div>
                    </XLink>
                );
            })}
        </XWrapBody>
    );
}