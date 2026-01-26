import { defineStore } from "pinia";

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
                await fetch('http://localhost:8080/orders', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({Products: this.items}),
                });
                this.clear();
            },
    }
    
})