import { POSITION, useToast } from 'vue-toastification'

export default function toast(message: any) {
    useToast().success(message, {
        position: POSITION.BOTTOM_CENTER,
        timeout: 2500,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false
    })
}
