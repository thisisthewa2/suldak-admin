import { useState, ChangeEventHandler } from 'react';

function useFormInput<T>(
  initialValues: T
): [T, ChangeEventHandler<HTMLInputElement>, React.Dispatch<React.SetStateAction<T>>] {
  const [values, setValues] = useState<T>(initialValues);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setValues(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as T)
    );
  };

  return [values, onChange, setValues];
}

export default useFormInput;
