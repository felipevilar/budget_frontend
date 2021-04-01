export { default as Loading } from '../..\\components\\Loading.vue'
export { default as Home } from '../..\\components\\home\\Home.vue'
export { default as Stat } from '../..\\components\\home\\Stat.vue'
export { default as BrandAdmin } from '../..\\components\\admin\\brands\\BrandAdmin.vue'
export { default as BrandList } from '../..\\components\\admin\\brands\\BrandList.vue'
export { default as ProductAdmin } from '../..\\components\\admin\\products\\ProductAdmin.vue'
export { default as ProductList } from '../..\\components\\admin\\products\\ProductList.vue'
export { default as CategoryAdmin } from '../..\\components\\admin\\categories\\CategoryAdmin.vue'
export { default as CategoryList } from '../..\\components\\admin\\categories\\CategoryList.vue'
export { default as UserAdmin } from '../..\\components\\admin\\users\\UserAdmin.vue'
export { default as UserList } from '../..\\components\\admin\\users\\UserList.vue'

export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components_Loading" */).then(c => c.default || c)
export const LazyHome = import('../..\\components\\home\\Home.vue' /* webpackChunkName: "components_home/Home" */).then(c => c.default || c)
export const LazyStat = import('../..\\components\\home\\Stat.vue' /* webpackChunkName: "components_home/Stat" */).then(c => c.default || c)
export const LazyBrandAdmin = import('../..\\components\\admin\\brands\\BrandAdmin.vue' /* webpackChunkName: "components_admin/brands/BrandAdmin" */).then(c => c.default || c)
export const LazyBrandList = import('../..\\components\\admin\\brands\\BrandList.vue' /* webpackChunkName: "components_admin/brands/BrandList" */).then(c => c.default || c)
export const LazyProductAdmin = import('../..\\components\\admin\\products\\ProductAdmin.vue' /* webpackChunkName: "components_admin/products/ProductAdmin" */).then(c => c.default || c)
export const LazyProductList = import('../..\\components\\admin\\products\\ProductList.vue' /* webpackChunkName: "components_admin/products/ProductList" */).then(c => c.default || c)
export const LazyCategoryAdmin = import('../..\\components\\admin\\categories\\CategoryAdmin.vue' /* webpackChunkName: "components_admin/categories/CategoryAdmin" */).then(c => c.default || c)
export const LazyCategoryList = import('../..\\components\\admin\\categories\\CategoryList.vue' /* webpackChunkName: "components_admin/categories/CategoryList" */).then(c => c.default || c)
export const LazyUserAdmin = import('../..\\components\\admin\\users\\UserAdmin.vue' /* webpackChunkName: "components_admin/users/UserAdmin" */).then(c => c.default || c)
export const LazyUserList = import('../..\\components\\admin\\users\\UserList.vue' /* webpackChunkName: "components_admin/users/UserList" */).then(c => c.default || c)
