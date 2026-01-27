import { defineStore } from "pinia";
import { useApiPrivate } from "../composables/useApi";

export type ProductId = string

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: (JSON.parse(localStorage.getItem('cart_items') || '[]') as ProductId[]),
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
                this.save()
            }
        },
        remove(id: ProductId) {
            this.items = this.items.filter((item) => item !== id);
            this.save()
        },
        clear(){
            this.items = []
            this.save()
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
        save() {
            try {
                localStorage.setItem('cart_items', JSON.stringify(this.items))
            } catch (e) {
                console.error('Failed to save cart to localStorage', e)
            }
        }
    }
    
})