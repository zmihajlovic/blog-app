import http from './Api';

class CategoryApi {
  static getCategories(filters = '') {
    return http.get(`Category${filters}`);
  }

  static addCategory(data) {
    return http.post('Category', data);
  }

  static deleteCategory(id) {
    return http.delete(`Category/${id}`);
  }

  static editCategory(id, data) {
    return http.put(`Category/${id}`, data);
  }
}

export default CategoryApi;
