import { createSlice } from "@reduxjs/toolkit";
import {
  call,
  put,
  takeEvery,
  delay,
  takeLeading,
  takeLatest,
} from "redux-saga/effects";
import { fetchA, fetchB, fetchC } from "../../api/apiList";

const initialState = {
  a: "내용 없음",
  b: "내용 없음",
  c: "내용 없음",
  loading: false,
};

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    pushButton: (state, action) => {
      state.loading = true;
    },
    pushA: (state, action) => {
      state.a = action.payload;
      state.loading = false;
    },
    pushB: (state, action) => {
      state.b = action.payload;
      state.loading = false;
    },
    pushC: (state, action) => {
      state.c = action.payload;
      state.loading = false;
    },
  },
});

function* pushSaga(action) {
  // pushButton이 dispatch된 이후 순차적으로 코드 실행

  yield console.log("실행시작");
  // 맨처음 실행

  if (action.payload === "A") {
    // action에 담긴 인자에 따라 분기를 나누어 실행
    const result = yield call(fetchA);
    yield put(pushA(result));
  } else if (action.payload === "B") {
    const result = yield call(fetchB);
    yield put(pushB(result));
  } else if (action.payload === "C") {
    const result = yield call(fetchC);
    yield put(pushC(result));
  }

  yield console.log("실행 완료");
  // 마지막 실행
}

export function* buttonSaga() {
  //   yield takeEvery(pushButton, pushSaga);           // dispatch된 액션 모두 실행
  //   yield takeLeading(pushButton, pushSaga);         // 맨처음 dispatch된 액션이 실행 완료 될 때까지 이후에 dispatch된 액션 모두 무시
  yield takeLatest(pushButton, pushSaga); // 새로운 액션이 dispatch 될 시 실행 중이던 액션 중단하고 제일 최근의 액션만 실행
}

export const { pushButton, pushA, pushB, pushC } = buttonSlice.actions;
export default buttonSlice.reducer;
