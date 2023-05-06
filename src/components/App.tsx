import "./App.css";

import Header from "./Header";
import Form from "./Form";
import Graph from "./Graph";
import Footer from "./Footer";
import usePrefectures, {
  PrefectureContent,
} from "../composables/usePrefectures";
import { useState } from "react";

function App() {
  const { prefectures } = usePrefectures();
  const providerValue = {
    prefectures,
  };

  const [value, setValue] = useState<number[]>([]);

  const onChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <>
      <Header></Header>
      <main>
        <PrefectureContent.Provider value={providerValue}>
          <Form onChange={onChange}></Form>
          <Graph populations={value}></Graph>
        </PrefectureContent.Provider>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
