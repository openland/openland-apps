import * as React from 'react';

export function HeaderLargeTitle(props: { title: string }) {
  return (
      <div className="sf-intro--title">{props.title}</div>
  );
}