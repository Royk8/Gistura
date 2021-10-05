import config from './config';
import Category from '../../interfaces/categoryInterfaces';

const api = config('categorias');

export const getCategories = async () => api.get<Category.Api.Response[]>('');

export default api;
