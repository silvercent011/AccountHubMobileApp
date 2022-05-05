import { defineStore } from 'pinia'
import { Toast } from "@capacitor/toast";
import axios from 'axios'
import { useUserStore } from './user';

const API = import.meta.env.VITE_API_LINK

export interface iFaculty {
    _id: string;
    cpf: string;
    created: string;
    email: string;
    jobtitle: string;
    nome: string;
    updated: string;
}

const userStore = useUserStore()
export const useFacultyStore = defineStore('faculty', {
    state() {
        return {
            teachers: <iFaculty[]>[]
        }
    },
    actions: {
        async getTeachers() {
            await axios.get(`${API}/professores`, { headers: { auth: userStore.userData.token } }).then((data) => {
                this.teachers = data.data
            })
        },
        async resetFacultyPassword(cpf:string) {
            await axios.post(`${import.meta.env.VITE_API_LINK}/distribution/faculty/password/${cpf}`, {}, { headers: { auth: userStore.userData.token } }).then((data) => {    
                return true
            })
        }
    }
})