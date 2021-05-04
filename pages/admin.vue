<template>
  <div class="container-table">
    <v-tabs v-model="tab" slider-color="#ff7f35" background-color="#008bd2" color="amber">
      <v-tab v-for="item in items" :key="item.tab">
        <v-icon class="px-2">{{ item.icon }}</v-icon>
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
      <v-tab-item>
        <UserAdmin />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mdiPackageVariantClosed } from '@mdi/js'
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
        {
          tab: 'Produtos',
          content: 'ProductAdmin',
          icon: 'mdi-package-variant-closed',
        },
        {
          tab: 'Categorias',
          content: 'CategoryAdmin',
          icon: 'mdi-family-tree',
        },
        { tab: 'Marcas', content: 'BrandAdmin', icon: 'mdi-microsoft' },
        { tab: 'Usuários', content: 'UserAdmin', icon: 'mdi-account-group' },
      ],
    }
  },
}
</script>

<style></style>
<style scoped>
.container-table {
  border: 3px solid black;
  
}
</style>