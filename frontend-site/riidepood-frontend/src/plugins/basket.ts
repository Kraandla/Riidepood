import { defineStore } from "pinia";
import { useApiPrivate } from "../composables/useApi";

export type ProductId = string

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [] as ProductId[],
    }),
    getters: {
        isInCart: (state) => {
            return (id: ProductId) => state.items.includes(id);
        },
        count: (state) => state.items.length,
    },
    actions: {
        add(id: ProductId) {     
            if (!this.items.includes(id)) {
                this.items.push(id);
            }
        },
        remove(id: ProductId) {
            this.items = this.items.filter((item) => item !== id);
        },
        clear(){
            this.items = []
        },
        async checkout(){
            try {
                await useApiPrivate().post('/orders', {
                    Products: this.items
                });
                this.clear();
            } catch (error) {
                console.error('Checkout failed:', error);
                throw error;
            }
        },
    }
    
})