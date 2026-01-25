import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"

export interface User{
  UserID: number,
  Email: string,
  FirstName: string,
  LastName: string,
  IsAdmin?: boolean
}

export interface State{
  user: User,
  accessToken: string,
  authReady: boolean
}

export interface LoginData {
  Email: string,
  Password: string
}

export interface RegisterData {
  Email: string,
  FirstName: string,
  LastName: string
  Password: string,
  ConfirmPassword: string,
}


export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: "" as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => state.accessToken ? true : false,
    isAdmin: (state: State) => state.user?.IsAdmin === true
  },

  actions:{
    async attempt(){
      try {
        await this.refresh()
        await this.getUser()
      } catch (error) {
        return
      }
      return
    },


  async login(payload: LoginData){
  try {
    const {data} = await useApi().post(`/auth/login`, payload);
    this.accessToken = data.access_token
    await this.getUser()
    return data
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 404) {
        throw new Error('User not found. Please check your email or register.')
      } else if (error.response.status === 401) {
        throw new Error('Invalid password. Please try again.')
      } else if (error.response.status === 400) {
        throw new Error(error.response.data?.error || 'Please fill in all required fields.')
      }
      throw new Error(error.response.data?.error || error.response.data?.message || 'Login failed. Please try again.')
    }
    throw new Error('Network error. Please check your connection and try again.')
  }
},

async register(payload: RegisterData){
  try {
    const {data} = await useApi().post(`/auth/register`, payload);
    return data
  } catch (error: any) {
    if (error.response) {
      // Server responded with error status
      if (error.response.status === 409) {
        throw new Error('This email is already registered.')
      } else if (error.response.status === 422) {
        throw new Error('Passwords do not match.')
      } else if (error.response.status === 400) {
        throw new Error(error.response.data?.error || 'Please fill in all required fields.')
      }
      throw new Error(error.response.data?.error || error.response.data?.message || 'Registration failed. Please try again.')
    }
    throw new Error('Network error. Please check your connection and try again.')
  }
},
async updateUser(payload: Partial<User>) {
  try {
    const {data} = await useApiPrivate().put(`/auth/user`, payload);
    this.user = data
    return data
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 409) {
        throw new Error('This email is already in use.')
      }
      throw new Error(error.response.data?.error || error.response.data?.message || 'Failed to update user.')
    }
    throw new Error('Network error. Please check your connection and try again.')
  }
},

  async getUser(){
  try {
    const {data} = await useApiPrivate().get(`/auth/user`);
    this.user = data
    return data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data?.error || error.response.data?.message || 'Failed to get user data.')
    }
    throw new Error('Network error. Please check your connection and try again.')
  }
},

    async logout(){
      try {
        const {data} = await useApiPrivate().post(`/auth/logout`);
        this.accessToken = ""
        this.user = {} as User
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh(){
      try {
        const {data} = await useApi().post(`/auth/refresh`);
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})