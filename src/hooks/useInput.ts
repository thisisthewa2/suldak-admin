import { useState, ChangeEvent } from 'react';

interface IUseInput {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  setData: (data: string) => void;
}

/** 인풋 커스텀훅 */
const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const reset = () => {
    setValue('');
  }

  const setData = (data: string) => {
    setValue(data)
  }

  return { value, onChange, reset, setData };
}

export default useInput