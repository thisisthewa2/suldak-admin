import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { ChangeEvent } from "react";

const inputAtom = atom<string>('')

function useStoreInput(initialValue: string): [string, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useAtom(inputAtom)

  useEffect(() => {
    console.log(value)
  }, [value])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return [value, onChange];
}

export default useStoreInput