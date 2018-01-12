import * as React from 'react';
import { Organization } from '../api/Organizations';
import { XWrapBody } from './X/XWrap';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';

export function ListOrganizations(props: { developers: Organization[] }) {
    return (
        <XWrapBody>
            {props.developers.map(p => {
                return (
                    <XLink key={p.id} path={'/organizations/' + p.slug} className="x-dev--short">
                        <div className="x-dev--short-l"><XCloudImage src={p.logo}
                                                                     placeholder={'/static/img/no-photo.png'} width={78}
                                                                     height={78}/></div>
                        <div className="x-dev--short-n">{p.title}<span>
                            {((p.isDeveloper) && !(p.isConstructor)) ? 'Developer' : ''}
                            {(!(p.isDeveloper) && (p.isConstructor)) ? 'Constructor' : ''}
                            {((p.isDeveloper) && (p.isConstructor)) ? 'Developer, Constructor' : ''}
                        </span></div>
                    </XLink>
                );
            })}
        </XWrapBody>
    );
}