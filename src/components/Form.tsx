import { ChangeEvent, ChangeEventHandler, ReactEventHandler, useContext, useState } from "react"

import { PrefectureContent } from "./App"

function Form() {
  const prefecture = useContext(PrefectureContent)
  const [ value, setValue ] = useState<number[]>([])
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = [ ...value ]
    if (event.currentTarget.checked) {
      newValue.push(Number(event.currentTarget.value))
      newValue.sort((a, b) => a-b)
    } else {
      newValue = newValue.filter((val) => val !== Number(event.currentTarget.value))
    }
    setValue(newValue)
  }

  return  (
    <div>
      <p>{ JSON.stringify(value) }</p>
      {
        prefecture.prefectures.map((item) => (
          <label key={item.prefCode}>
            <input 
              type="checkbox"
              value={item.prefCode}
              checked={value.includes(item.prefCode)}
              onChange={onChange}
            />
            {item.prefName}
          </label>
        ))
      }
    </div>
  )
}

export default Form