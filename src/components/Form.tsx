import "./Form.css";

import { ChangeEvent, useContext, useState } from "react";
import { PrefectureContent } from "../composables/usePrefectures";

interface FromProps {
  onChange(newValue: number[]): void;
}

function Form(props: FromProps) {
  const prefecture = useContext(PrefectureContent);
  const [value, setValue] = useState<number[]>([]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = [...value];
    const targetValue = Number(event.currentTarget.value);
    if (event.currentTarget.checked) {
      newValue.push(targetValue);
    } else {
      newValue = newValue.filter(
        (val) => val !== Number(event.currentTarget.value)
      );
    }
    setValue(newValue);
    props.onChange(newValue);
  };

  return (
    <div className="form">
      {prefecture.prefectures.map((item) => (
        <label className="form__label" key={item.prefCode}>
          <input
            type="checkbox"
            value={item.prefCode}
            checked={value.includes(item.prefCode)}
            onChange={onChange}
          />
          {item.prefName}
        </label>
      ))}
    </div>
  );
}

export default Form;
