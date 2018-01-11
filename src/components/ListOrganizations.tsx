import * as React from 'react';
import { Organization } from '../api/Organizations';
import { XWrapBody } from './X/XWrap';
import { XLink } from './X/XLink';

export function ListOrganizations(props: { developers: Organization[] }) {
    return (
        <XWrapBody>
            {props.developers.map(p => {
                return (
                    <XLink key={p.id} path={'/organizations/' + p.slug} className="x-dev--short">
                        <div className="x-dev--short-l"><img src="//placehold.it/80x80" alt="" /></div>
                        <div className="x-dev--short-n">{p.title}<span>Developer</span></div>
                    </XLink>
                );
            })}
        </XWrapBody>
    );
}