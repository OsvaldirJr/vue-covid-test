import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Swal } from 'vue-sweetalert2';
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
    $swal: Swal
  }
}