// eslint-disable-next-line
import {provide, inject, Ref, ref} from '@vue/composition-api';
const StoreSymbol = Symbol();

export function provideStore(store: Ref<string>) {
    provide(StoreSymbol, store);
}

export function useStore() {
    const store = inject(StoreSymbol, ref(''));
    if(!store) {

    }
    return store;
}