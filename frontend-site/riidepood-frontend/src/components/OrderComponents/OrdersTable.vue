<script>
    import OrderDeleteButton from './OrderDeleteButton.vue'
    export default {
        name: "OrdersTable",
        components: {
            OrderDeleteButton
        },
        props: {
            items: Array,
        },
        methods: {
            async updateOrderStatus(order){
                const newStatus = order.Status === 0 ? 1 : 0;
                await fetch(`http://localhost:8080/orders/${order.OrderID}`, {
                    method: 'PUT',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({Status: newStatus})
                });
                order.Status = newStatus;
            },
            goToOrderDetails(item){
                this.$router.push({ name: 'singleOrder', params: { itemID: item.OrderID } })
            }
        }
    }
</script>

<template>
<table class="table table-hover table-dark table-striped w-100">
  <thead>
    <tr class="table-row">
      <th>Nr</th>
      <th>Order ID</th>
      <th>Order Status</th>
      <th>
      </th>
    </tr>
  </thead>

  <tbody>
        <tr
        class="table-row"
        style="cursor: pointer;"
        v-for="(item, index) in items"
        :key="item.OrderID"
        >
        <td @click="goToOrderDetails(item)">
            {{ index + 1 }}
        </td>

        <td @click="goToOrderDetails(item)">
            {{ item.OrderID }}
        </td>

        <td @click="goToOrderDetails(item)">
            <span v-if="item.Status == 1">Confirmed</span>
            <span v-else>Unconfirmed</span>
        </td>

        <td>
            <div class="flex-row w-100 d-inline-flex">
            <button
                class="btn btn-primary col-6 me-auto"
                @click="updateOrderStatus(item)"
            >
                Confirm / Unconfirm
            </button>

            <order-delete-button
                :seekID="item.OrderID"
            />
            </div>
        </td>
        </tr>
    </tbody>
    </table>
    <button><router-link :to="{ name: 'newOrder'}">Create new order</router-link></button>
</template>