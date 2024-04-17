import React from 'react';

export default function Playground({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
