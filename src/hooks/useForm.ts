import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValues: T; // {email: '', password: ''}
  // 값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
  // 값
  const [values, setValues] = useState(initialValues);
  // 값이 입력되었는지 여부
  const [touched, setTouched] = useState<Record<string, boolean>>();
  // 값이 올바른지 여부
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 사용자가 입력값을 바꿀 떄 실행되는 함수.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지 (기존 입력값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched, //불변성 유지 (기존 입력되었는지 여부 유지)
      [name]: true,
    });
  };

  //이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value = values[name];

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  // values가 변경될 떄 마다 에러 검증 로직이 실행됨.
  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); //오류 메세지 업뎃
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched,
    getInputProps,
  };
}

export default useForm;
