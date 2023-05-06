import "./App.css";

import Header from './Header';
import Form from "./Form";
import Graph from "./Graph";
import Footer from './Footer';
import usePrefectures, { PrefectureContent } from "../composables/usePrefectures";

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
          <Graph></Graph>
        </PrefectureContent.Provider>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
