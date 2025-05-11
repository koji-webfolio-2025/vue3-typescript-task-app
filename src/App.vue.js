import Header from './components/Header.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
const userStore = useUserStore();
onMounted(async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
            withCredentials: true,
        });
        if (res.data && res.data.user) {
            userStore.setUser({
                name: res.data.user.name,
                email: res.data.user.email,
            });
        }
        else {
            userStore.clearUser();
        }
    }
    catch (e) {
        userStore.clearUser(); // セッション切れなどで401の時
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof Header, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Header, new Header({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_3 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Header: Header,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
