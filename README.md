## 리덕스 사가 예시코드 작성

<br/>

> ### 리덕스 사가 코드 위치

```

src/store/store.js

src/store/slice/buttonSlice.js

```

<br />

> ### 실행하기

```
npm i
npm run dev
npm run server
```

<br />

> ### 코드 살펴보기

```js
데이터 불러오기 위한 유틸 함수

import axios from "axios";

const axiosConfig = axios.create({ baseURL: "http://localhost:4000" });

export const fetchA = async () => {
  const result = await axiosConfig.get("test1");
  return result.data.text;
};

export const fetchB = async () => {
  const result = await axiosConfig.get("test2");
  return result.data.text;
};

export const fetchC = async () => {
  const result = await axiosConfig.get("test3");
  return result.data.text;
};

```


<br />

```js
import {
  call,
  put,
  takeEvery,
  delay,
  takeLeading,
  takeLatest,
} from "redux-saga/effects";
import { fetchA, fetchB, fetchC } from "../../api/apiList";

function* pushSaga(action) {              // pushButton이 dispatch된 이후 순차적으로 코드 실행

  yield console.log("실행시작");           // 맨처음 실행

  if (action.payload === "A") {           // action에 담긴 인자에 따라 분기를 나누어 실행
    const result = yield call(fetchA);
    yield put(pushA(result));
  } else if (action.payload === "B") {
    const result = yield call(fetchB);    // call: 제너레이트 함수 내에서 다른 함수 실행하기 (첫번째 인자는 해당 함수, 두번째 인자는 해당 함수에 들어갈 인자, 두번째는 생략 가능)
    yield put(pushB(result));             // put:  제너레이트 함수 내에서 액션 디스패치 하기
  } else if (action.payload === "C") {
    const result = yield call(fetchC);
    yield put(pushC(result));
  }

  yield console.log("실행 완료");                        // 마지막 실행
}

export function* buttonSaga() {                         // 하위 코드 중 한 가지 선택하기
  //   yield takeEvery(pushButton, pushSaga);           // dispatch된 액션 모두 실행
  //   yield takeLeading(pushButton, pushSaga);         // 맨처음 dispatch된 액션이 실행 완료 될 때까지 이후에 dispatch된 액션 모두 무시
  yield takeLatest(pushButton, pushSaga);               // 새로운 액션이 dispatch 될 시 실행 중이던 액션 중단하고 제일 최근의 액션만 실행
}
```

<br />

```js

import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { all } from "@redux-saga/core/effects";
import { buttonSaga } from "./slice/buttonSlice";
import buttonReducer from "./slice/buttonSlice";

const sagaMiddleware = createSagaMiddleware();     // 사가 

const store = configureStore({
  reducer: { button: buttonReducer },
  middleware: [sagaMiddleware],                    // 사용하고자 하는 미들웨어 모두 배열에 담아줌
  devTools: true,
});

function* rootSaga() {
  yield all([buttonSaga()]);                       // 배열 내에 있는 사가 모두 병렬적 실행            
}

sagaMiddleware.run(rootSaga);                      // 사가 실행하기

export default store;

```
