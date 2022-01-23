import { useEffect, useState } from 'react';

export const useForm = (initialState, cb = () => {}) => {
  const [fields, setFields] = useState(initialState);

  useEffect(() => {
    cb(fields);
  }, [fields]);

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  return [fields, handleChange, setFields];
};
