import http from './Api';

class PostApi {
  static getPosts(filters = '') {
    return http.get(`/api/BlogPosts${filters}`);
  }

  static addPost(data) {
    return http.post('/api/BlogPosts', data);
  }

  static deletePost(id) {
    return http.delete(`/api/BlogPosts/${id}`);
  }

  static editPost(id, data) {
    return http.put(`/api/BlogPosts/${id}`, data);
  }
}

export default PostApi;
