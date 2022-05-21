/* eslint-disable semi */
/* eslint-disable quotes */
import axios from "./axios";

export const fetchPosts = () => axios.get('/posts/list/').then(({ data }: any) => data);
