import http from './Api';

class PostApi {
  static getPosts(filters = '') {
    return http.get(`BlogPosts${filters}`);
  }

  static addPost(data) {
    return http.post('BlogPosts', data);
  }

  static deletePost(id) {
    return http.delete(`BlogPosts/${id}`);
  }

  static editPost(id, data) {
    return http.put(`BlogPosts/${id}`, data);
  }
}

export default PostApi;
