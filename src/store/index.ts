import axios from "axios";
import { createStore } from "vuex";
import { router } from "../router";
// import process from "process";

import { Toast } from "@capacitor/toast";

interface iUserData {
    token: string
}

export const store = createStore({
    state: {
        userData: <iUserData>{},
        students: [],
        teachers: [],
        distribution: [],
        services: []
    },
    mutations: {
        loginUserData(context, payload) {
            context.userData = payload
            router.replace({ name: "Home" })
        }
    },
    actions: {
        async doSignIn(context, payload) {
            const { login, password } = payload;
            await axios.post(`${import.meta.env.VITE_API_LINK}/users/auth`, { cpf: login, password: password }).then((data) => {
                if (data.data.level > 1) {
                    context.commit('loginUserData', data.data)
                } else {

                    Toast.show({text: "Você não tem nível de usuário para acessar o app :("})
                }
            }).catch((error: Error) => {
                Toast.show({text: "CPF ou Senha incorretos, tente novamente..."})
            })
        },

        async getEnabledStudents(context) {
            await axios.get(`${import.meta.env.VITE_API_LINK}/alunos/enabled`, { headers: { auth: context.state.userData.token } }).then((data) => {
                context.state.students = data.data
            })
        },

        async getTeachers(context) {
            await axios.get(`${import.meta.env.VITE_API_LINK}/professores`, { headers: { auth: context.state.userData.token } }).then((data) => {
                context.state.teachers = data.data
            })
        },

        async getDistributions(context) {
            await axios.get(`${import.meta.env.VITE_API_LINK}/distribution/`, { headers: { auth: context.state.userData.token } }).then((data) => {
                context.state.distribution = data.data
            })
        },

        async getServices(context) {
            await axios.get(`${import.meta.env.VITE_API_LINK}/services/all`, { headers: { auth: context.state.userData.token } }).then((data) => {
                context.state.services = data.data
            })
        },

        async resetStudentPassword(context, payload) {
            await axios.post(`${import.meta.env.VITE_API_LINK}/distribution/student/password/${payload.id}`, {}, { headers: { auth: context.state.userData.token } }).then((data) => {
                
                return true
            })
        },

        async resetFacultyPassword(context, payload) {
            await axios.post(`${import.meta.env.VITE_API_LINK}/distribution/faculty/password/${payload.id}`, {}, { headers: { auth: context.state.userData.token } }).then((data) => {
                
                return true
            })
        }
    }
})