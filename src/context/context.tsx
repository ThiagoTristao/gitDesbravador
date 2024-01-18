import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { useForm } from "react-hook-form";

export interface contextInferface {
  gitForm: any
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export interface childrenInterface {
  children: ReactNode
}

const defaultState = {
  gitForm: () => {},
  loading: false,
  setLoading: (loading:boolean) => {},
} as contextInferface

const MyContext = createContext(defaultState);

const MyContextProvider = ({ children }: childrenInterface) => {
    const [loading, setLoading] = useState<boolean>(false)
    const gitForm = useForm();
  return (
    <MyContext.Provider value={{ gitForm, loading, setLoading,}}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };