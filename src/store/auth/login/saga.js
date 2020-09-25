import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, logoutUserSuccess, apiError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postLogin } from "../../../helpers/fakebackend_helper";
import { baseApi } from "../../../utils/routeNames";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.username,
        user.password
      );
      yield put(loginSuccess(response));
    } else {
      let formData = new FormData();
      formData.append("username", user.username);
      formData.append("password", user.password);
      const response = yield call(
        postLogin,
        `${baseApi}authenticate`,
        formData,
        {
          headers: {
            Authorization: "",
          },
        }
      );
      sessionStorage.setItem("authUser", JSON.stringify(response));
      console.log("token: " + response.token);
      localStorage.setItem("token", response.token);
      yield put(loginSuccess(response));
    }
    // history.push("/dashboard");
    window.location.replace("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}

export const logout = () => {
  const items = ["token", "password", "code"];

  items.forEach((item) => localStorage.removeItem(item));
};

export default authSaga;
