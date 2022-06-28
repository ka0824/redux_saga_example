import "./App.css";
import { pushButton } from "./store/slice/buttonSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const aText = useSelector((state) => state.button.a);
  const bText = useSelector((state) => state.button.b);
  const cText = useSelector((state) => state.button.c);
  const isLoading = useSelector((state) => state.button.loading);

  const handleA = () => {
    dispatch(pushButton("A"));
  };
  const handleB = () => {
    dispatch(pushButton("B"));
  };
  const handleC = () => {
    dispatch(pushButton("C"));
  };

  return (
    <div className="App">
      <section className="one">
        <button onClick={handleA}>버튼 A</button>
        <button onClick={handleB}>버튼 B</button>
        <button onClick={handleC}>버튼 C</button>
      </section>
      {isLoading ? (
        <div>로딩중 입니다.</div>
      ) : (
        <section className="two">
          <div>버튼 A를 누른 결과: {aText}</div>
          <div>버튼 B를 누른 결과: {bText}</div>
          <div>버튼 C를 누른 결과: {cText}</div>
        </section>
      )}
    </div>
  );
}

export default App;
