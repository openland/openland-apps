import * as React from 'react';

export function HeaderLargeTitle(props: { title: string }) {
  return (
      <div className="x-intro--title" dangerouslySetInnerHTML={{ __html: props.title }}>{}</div>
  );
}