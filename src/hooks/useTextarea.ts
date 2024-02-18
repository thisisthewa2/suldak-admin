import { useState } from 'react';

function useTextarea<T>(
  initialValue: T
): [T, React.ChangeEventHandler<HTMLTextAreaElement>] {
  const [value, setValue] = useState<T>(initialValue);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setValue(event.target.value as T);
  };

  return [value, handleChange];
}

export default useTextarea;
