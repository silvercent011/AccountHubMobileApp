import { defineStore } from 'pinia'
import { Toast } from "@capacitor/toast";
import axios from 'axios'
import { useUserStore } from './user';

const API = import.meta.env.VITE_API_LINK

export interface iDistribution {
    _id: string;
    cpf?: string;
    matricula?: string;
    created: string;
    email: string;
    senha: string;
    reset_password: Boolean;
    sharedTimes: Number;
    jobtitle: string;
    nome: string;
    updated: string;
}

const userStore = useUserStore()
export const useDistributionStore = defineStore('distribution', {
    state() {
        return {
            distribution: <iDistribution[]>[]
        }
    },
    actions: {
        async getDistributions() {
            await axios.get(`${API}/distribution/`, { headers: { auth: userStore.userData.token } }).then((data) => {
                this.distribution = data.data
            })
        },

    }
})