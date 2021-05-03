import Vue from 'vue'
import Vuex from 'vuex'
import { baseUrl, showError } from '@/global'
import axios from 'axios'
Vue.use(Vuex)

export const state = () => ({
  products: [],
  loaded: [],
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
  },
  saveBud(state, car) {
    state.loaded = car
  },
}

export const actions = {
  //GET PRODUCTS/CATEGORIES/BRANDS/USERS
  async loadProducts({ commit }) {
    const url = `${baseUrl}/products`
    await axios
      .get(url)
      .then((res) => commit('setProducts', res))
      .catch((err) => console.log(err))
  },
  async loadCategories({ commit }) {
    const url = `${baseUrl}/categories`
    await axios
      .get(url)
      .then((res) => commit('setCategories', res))
      .catch((err) => console.log(err))
  },
  async loadBrands({ commit }) {
    const url = `${baseUrl}/brands`
    await axios
      .get(url)
      .then((res) => commit('setBrands', res))
      .catch((err) => console.log(err))
  },
  async loadUsers({ commit }) {
    const url = `${baseUrl}/users`
    await axios
      .get(url)
      .then((res) => commit('setUsers', res))
      .catch((err) => console.log(err))
  },

  //REMOVE PRODUCTS/CATEGORIES/BRANDS/USERS
  async removeCategory({}, categoryId) {
    return await axios.delete(`${baseUrl}/categories/${categoryId}`)
  },
  async removeProduct({}, productId) {
    return await axios.delete(`${baseUrl}/products/${productId}`)
  },
  async removeBrand({}, brandId) {
    return await axios.delete(`${baseUrl}/brands/${brandId}`)
  },
  async removeUser({}, userId) {
    return await axios.delete(`${baseUrl}/users/${userId}`)
  },

  //SAVE PRODUCT/CATEGORY/BRAND/USER
  async saveCategory({}, category) {
    const method = category.id ? 'put' : 'post'
    const id = category.id ? `/${category.id}` : ''
    return await axios[method](`${baseUrl}/categories${id}`, category)
  },
  async saveProduct({}, product) {
    const method = product.id ? 'put' : 'post'
    const id = product.id ? `/${product.id}` : ''

    return await axios[method](`${baseUrl}/products${id}`, product)
  },
  async saveBrand({}, brand) {
    const method = brand.id ? 'put' : 'post'
    const id = brand.id ? `/${brand.id}` : ''

    return await axios[method](`${baseUrl}/brands${id}`, brand)
  },
  async saveUser({}, user) {
    const method = user.id ? 'put' : 'post'
    const id = user.id ? `/${user.id}` : ''

    return await axios[method](`${baseUrl}/users${id}`, user)
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

  //SAVE PRODUCTS ON EXIT BUDGET PAGE
  saveBud({ commit }, car) {
    commit('saveBud', car)
  },
}
