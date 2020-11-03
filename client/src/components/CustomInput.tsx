import React, { useState } from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface CustomInputProps {
  id: string;
  type: string;
  label: string;
  name?: string;
  error: string | undefined;
  value: string;
  onChange: (newValue: any) => void;
}

export const CustomInput: React.FC<CustomInputProps> = ({ id, type, label, name, error, value, onChange }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown(!passwordShown);

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {id === 'email' ? (
        <Form.Control
          className={`${error && 'is-invalid'}`}
          id={id}
          type={type}
          value={value}
          autoFocus={true}
          autoComplete={name}
          onChange={e => onChange(e)}
        />
      ) : (
        <InputGroup className='mb-3'>
          <FormControl
            className={`${error && 'is-invalid'}`}
            id={id}
            type={passwordShown ? 'text' : type}
            value={value}
            autoComplete={name}
            onChange={e => onChange(e)}
          />
          <InputGroup.Append>
            <Button variant='outline-secondary' onClick={togglePasswordVisiblity}>
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      )}
      <Form.Text className='text-danger'>{error}</Form.Text>
    </Form.Group>
  );
};
