export default function useStatus() {
    return useAuth().status.value === 'authenticated'
}