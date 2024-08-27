import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this function runs when the things we are watching change!
    setInputs(initial);
  }, [initialValues]);
  function handleChange(e) {
    let { value, name, type } = e.target;

    // form keeps changing our number to string and breaking backend
    if (type === 'number') {
      value = parseInt(value);
    }

    // files are weird
    if (type === 'file') {
      [value] = e.target.files;
    }

    // setInputs(e.target.value);
    setInputs({
      // copy the existing state of all inputs
      ...inputs,
      // grab name from event to make this dynamic
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the things we want from this custom hook
  return { inputs, handleChange, resetForm, clearForm };
}
