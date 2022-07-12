import { useState } from 'react';

export default function UseErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {
    const errorAlreadyExist = errors.find((error) => error.field === field);
    if (errorAlreadyExist) {
      return;
    }
    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(field) {
    setErrors((prevState) => (
      prevState.filter((error) => error.field !== field)
    ));
  }

  function getErrorMessageByField(field) {
    return errors.find((error) => error.field === field)?.message;
  }

  return { setError, removeError, getErrorMessageByField };
}
