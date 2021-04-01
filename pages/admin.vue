<template>
  <v-card>
    <v-tabs v-model="tab" background-color="primary">
      <v-tab v-for="item in items" :key="item.tab">
        <v-icon small class="px-2">{{ item.icon }}</v-icon>
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <ProductAdmin />
      </v-tab-item>
      <v-tab-item>
        <CategoryAdmin />
      </v-tab-item>
      <v-tab-item>
        <BrandAdmin />
      </v-tab-item>
<!--       <v-tab-item>
        <UserAdmin />
      </v-tab-item> -->
    </v-tabs-items>
  </v-card>
</template>

<script>
import ProductAdmin from '~/components/admin/products/ProductAdmin'
import UserAdmin from '~/components/admin/users/UserAdmin'
import CategoryAdmin from '~/components/admin/categories/CategoryAdmin'
import BrandAdmin from '~/components/admin/brands/BrandAdmin'

export default {
  name: 'Admin',
  components: { ProductAdmin, UserAdmin, CategoryAdmin, BrandAdmin },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Produtos', content: 'ProductAdmin', icon: 'mdi-cog' },
        { tab: 'Categorias', content: 'CategoryAdmin', icon: 'mdi-cog' },
        { tab: 'Marcas', content: 'BrandAdmin', icon: 'mdi-cog' },
        /* { tab: 'Usuários', content: 'UserAdmin', icon: 'mdi-cog' }, */
      ],
    }
  },
}
</script>

<style></style>
