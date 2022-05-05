import { defineStore } from 'pinia'
import { Toast } from "@capacitor/toast";
import axios from 'axios'
import { useUserStore } from './user';

const API = import.meta.env.VITE_API_LINK

export interface iStudent {
    _id: string;
    created: string;
    dt_nascimento: string;
    email: string;
    email_secondary: string;
    enabled: Boolean
    img_url: string;
    matricula: string;
    nivel: string;
    nome: string;
    turma: string;
    turno: string;
    updated: string;

}

const userStore = useUserStore()
export const useStudentsStore = defineStore('students', {
    state() {
        return {
            students: <iStudent[]>[]
        }
    },
    actions: {
        async getEnabledStudents() {
            await axios.get(`${API}/alunos/enabled`, { headers: { auth: userStore.userData.token } }).then((data) => {
                this.students = data.data
            })
        },

        async resetStudentPassword(matricula: string) {
            await axios.post(`${API}/distribution/student/password/${matricula}`, {}, { headers: { auth: userStore.userData.token } }).then((data) => {

                return true
            })
        },

    }
})