import { createContext } from "react";

import "./App.css";

import Header from './Header';
import Form from "./Form";
import Footer from './Footer';
import usePrefectures, { Prefecture } from "../composables/usePrefectures";

interface PrefectureContent {
  prefectures: Prefecture[]
  
}

export const PrefectureContent = createContext<PrefectureContent>({
  prefectures: []
})

function App() {
  const { prefectures } = usePrefectures()
  const value = {
    prefectures
  }

  return (
    <>
      <Header></Header>
      <main>
        <PrefectureContent.Provider value={ value }>
          <p>APPコンポーネント [ { prefectures.length } ]</p>
          <Form></Form>
        </PrefectureContent.Provider>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
