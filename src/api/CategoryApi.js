import http from './Api';

class CategoryApi {
  static getCategories(filters = '') {
    return http.get(`/api/Category${filters}`);
  }

  static addCategory(data) {
    return http.post('/api/Category', data);
  }

  static deleteCategory(id) {
    return http.delete(`/api/Category/${id}`);
  }

  static editCategory(id, data) {
    return http.put(`/api/Category/${id}`, data);
  }
}

export default CategoryApi;
