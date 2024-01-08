import React from 'react';
import { Input } from '@mui/material';

export default function DatePicker({
  id,
  name,
  onChange
}: {
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): React.ReactElement {
  return <Input id={id} name={name} type="date" onChange={onChange} />;
}
