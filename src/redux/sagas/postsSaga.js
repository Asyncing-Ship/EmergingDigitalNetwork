import Axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// function to get Posts
function* fetchPosts(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    const response = yield Axios.get("/api/posts");
    // const result = yield call(axios.get, '/post');
    yield put({ type: "SET_POSTS", payload: response.data });
  } catch (error) {
    // console.log('Error fetching Posts', error);
    alert("unable to get Post from server");
  }
}

// function to add Posts
function* addPost(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    yield Axios.post("/api/posts", action.payload);
    yield put({ type: "FETCH_POSTS" });
  } catch (error) {
    // console.log('Error fetching Posts', error);
    alert("unable to add new Post to server");
  }
}

// function to delete Posts
function* deletePost(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    yield Axios.delete(`/api/posts/${action.payload}`);
    yield put({ type: "FETCH_POSTS" });
  } catch (error) {
    // console.log('Error fetching Posts', error);
    alert("unable to delete Post from server");
  }
}

// function to get current Post
function* fetchPostDetail(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    const response = yield Axios.get(`/api/detail/${action.payload}`);
    // const result = yield call(axios.get, '/post');
    yield put({ type: "SET_POST_DETAIL", payload: response.data });
  } catch (error) {
    // console.log('Error fetching posts', error);
    alert("Unable to get detail from server");
  }
}

// function to get current Post
function* fetchCurrentPost(action) {
  // wrap it all in try/catch
  // yield axios
  // dispatch the result with put!
  try {
    const response = yield Axios.get(`/api/posts/${action.payload}`);
    // const result = yield call(axios.get, '/post');
    yield put({ type: "SET_CURRENT_POST", payload: response.data });
  } catch (error) {
    // console.log('Error fetching posts', error);
    alert("Unable to fetch current Post");
  }
}
function* updatePost(action) {
  //Update the post
  try {
    yield Axios.put(`/api/posts/${action.payload.currentId}`, action.payload);
    yield put({ type: "FETCH_POSTS" });
  } catch (error) {
    alert("Unable to update Post on server", error);
  }
}

function* fetchPostAuthor(action) {
  try {
    const response = Axios.get(`/api/members/${action.payload}`);
    console.log(response.data);

    yield put({ type: "SET_POST_AUTHOR", payload: response.data });
  } catch (error) {
    // alert("Unable to get post author on server", error);
  }
}

function* addPostLike(action) {
  try {
    yield Axios.put("api/likes/posts", action.payload);
    yield put({ type: "FETCH_POSTS" });
  } catch (error) {
    alert("unable to add post like to server");
  }
}

function* postsSaga() {
  yield takeEvery("FETCH_POSTS", fetchPosts);
  yield takeEvery("FETCH_POST_DETAIL", fetchPostDetail);
  yield takeEvery("UPDATE_POST", updatePost);
  yield takeEvery("FETCH_CURRENT_POST", fetchCurrentPost);
  yield takeEvery("ADD_POST", addPost);
  yield takeEvery("DELETE_POST", deletePost);
  yield takeEvery("FETCH_POST_AUTHOR", fetchPostAuthor);
  yield takeEvery("ADD_POST_LIKE", addPostLike);
}

export default postsSaga;
