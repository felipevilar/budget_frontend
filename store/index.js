import Vue from 'vue'
import Vuex from 'vuex'
import { baseUrl, showError } from '@/global'
import axios from 'axios'
Vue.use(Vuex)

export const state = () => ({
  products: [],
  categories: [],
  brands: [],
  users: [],
  isMenuVisible: false,
  user: {},
})
export const mutations = {
  setProducts(state, res) {
    state.products = res.data.data
  },
  setCategories(state, res) {
    state.categories = res.data
  },
  setBrands(state, res) {
    state.brands = res.data
  },
  setUsers(state, res) {
    state.users = res.data
  },
  setUser(state, user) {
    state.user = user
    if (user) {
      axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      state.isMenuVisible = true
    } else {
      delete axios.defaults.headers.common['Authorization']
      state.isMenuVisible = false
    }
  },
  toogleMenuOff(state) {
    state.isMenuVisible = false
  },
  toogleMenuOn(state) {
    state.isMenuVisible = true
  }
}

export const actions = {
  //GET PRODUCTS/CATEGORIES/BRANDS/USERS
  loadProducts({ commit }) {
    const url = `${baseUrl}/products`
    axios
      .get(url)
      .then((res) => commit('setProducts', res))
      .catch((err) => console.log(err))
  },
  loadCategories({ commit }) {
    const url = `${baseUrl}/categories`
    axios
      .get(url)
      .then((res) => commit('setCategories', res))
      .catch((err) => console.log(err))
  },
  loadBrands({ commit }) {
    const url = `${baseUrl}/brands`
    axios
      .get(url)
      .then((res) => commit('setBrands', res))
      .catch((err) => console.log(err))
  },
  loadUsers({ commit }) {
    const url = `${baseUrl}/users`
    axios
      .get(url)
      .then((res) => commit('setUsers', res))
      .catch((err) => console.log(err))
  },

  //REMOVE PRODUCTS/CATEGORIES/BRANDS/USERS
  removeCategory({}, categoryId) {
    return axios
      .delete(`${baseUrl}/categories/${categoryId}`)
  },
  removeProduct({}, productId) {
    return axios
      .delete(`${baseUrl}/products/${productId}`)
  },
  removeBrand({}, brandId) {
    return axios
      .delete(`${baseUrl}/brands/${brandId}`)
  },
  removeUser({}, userId) {
    return axios
      .delete(`${baseUrl}/users/${userId}`)
  },

  //SAVE PRODUCT/CATEGORY/BRAND/USER
  saveCategory({}, category) {
    const method = category.id ? 'put' : 'post'
    const id = category.id ? `/${category.id}` : ''
    return axios[method](`${baseUrl}/categories${id}`, category)
  },
  saveProduct({}, product) {
    const method = product.id ? 'put' : 'post'
    const id = product.id ? `/${product.id}` : ''

    return axios[method](`${baseUrl}/products${id}`, product)
  },
  saveBrand({}, brand) {
    const method = brand.id ? 'put' : 'post'
    const id = brand.id ? `/${brand.id}` : ''

    return axios[method](`${baseUrl}/brands${id}`, brand)
  },
  saveUser({}, user) {
    const method = user.id ? 'put' : 'post'
    const id = user.id ? `/${user.id}` : ''

    return axios[method](`${baseUrl}/users${id}`, user)
  },

  //SET USER
  setUser({ commit }, user) {
    commit('setUser', user)
  },

  //Toogle Menu
  toogleMenuOff({ commit }) {
    commit('toogleMenuOff')
  },
  toogleMenuOn({ commit }) {
    commit('toogleMenuOn')
  },
}
