import { useState } from 'react';

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const reset = () => {
    setValue(initialValue);
  };
  const bind = {
    value,
    onChange: ({ target }) => {
      const value = target.type === 'number' ? +target.value : target.value;
      setValue(value);
    },
  };

  return [value, bind, reset];
};
