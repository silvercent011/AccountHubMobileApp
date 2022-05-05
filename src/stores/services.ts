import { defineStore } from 'pinia'
import { Toast } from "@capacitor/toast";
import axios from 'axios'
import { useUserStore } from './user';

const API = import.meta.env.VITE_API_LINK

interface iService {
    _id: String;
    matricula: String;
    created: String;
    data: String;
    updated: String;
    serviceName: String;
    enabled: Boolean;
}

const userStore = useUserStore()
export const useServicesStore = defineStore('services', {
    state() {
        return {
            services: <iService[]>[]
        }
    },
    actions: {
        async getServices() {
            await axios.get(`${API}/services/all`, { headers: { auth: userStore.userData.token } }).then((data) => {
                this.services = data.data
            })
        },
    }
})