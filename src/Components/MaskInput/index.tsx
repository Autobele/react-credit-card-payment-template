import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { InputContainer, Input, Error } from './styles';

type Props = {
  name: string;
  label: string;
  mask: string;
};

const TextInput: React.FC<Props> = ({ name, label, mask, ...rest }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState<string>('');

  const { fieldName, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue('');
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer>
      <Input
        mask={mask}
        ref={inputRef}
        error={error}
        value={value}
        maskChar={null}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default TextInput;
