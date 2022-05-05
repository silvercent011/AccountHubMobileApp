import { defineStore } from 'pinia'
import { Toast } from "@capacitor/toast";
import axios from 'axios'
import { router } from '../router';
import { Storage } from '@capacitor/storage'
import { useStudentsStore } from './students';
import { useDistributionStore } from './distribution';
import { useFacultyStore } from './faculty';
import { useServicesStore } from './services';
const API = import.meta.env.VITE_API_LINK

interface iUserData {
    _id: string;
    cpf: string;
    created: string;
    email: string;
    level: string;
    nome: string;
    passed: Boolean
    token: string;
    updated: string;

}


export const useUserStore = defineStore('user', {
    state() {
        return {
            userData: <iUserData>{},
        }
    },
    actions: {
        async fetchTokenFromStorage() {

            
            try {
                // @ts-ignore
                const { value } = await Storage.get({ key: 'token' })
                if (value) {
                    await axios.get(`${API}/users/me`, { headers: { auth: value } }).then((data) => {
                        const res: iUserData = data.data[0]
                        this.userData = res
                        Storage.set({
                            key: 'token',
                            value: value
                        })
                        this.userData.token = value
                    }).catch((error) => {
                        localStorage.clear()
                    })
                }
            } catch (error) {
                return false
            }
        },
        async doSignIn(login: string, password: string) {
            await axios.post(`${API}/users/auth`, { cpf: login, password: password }).then((data) => {
                const res: iUserData = data.data
                if (parseInt(res.level) > 1) {
                    this.userData = res
                    Storage.set({
                        key: 'token',
                        value: this.userData.token
                    })
                    router.replace({ name: "Home" })
                } else {

                    Toast.show({ text: "Você não tem nível de usuário para acessar o app :(" })
                }
            }).catch((error: Error) => {
                Toast.show({ text: "CPF ou Senha incorretos, tente novamente..." })
            })
        },
    }
})