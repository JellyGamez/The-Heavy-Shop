import { defineNuxtPlugin } from '#app'
import Toast, { POSITION } from 'vue-toastification'
import 'assets/css/toast.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, {
        transition: 'toast',
        position: POSITION.BOTTOM_CENTER,
        timeout: 3000,
        maxToasts: 5,
        newestOnTop: true,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
    })
})
