<template>
  <v-container fluid>
    <v-form>
      <input id="product-id" type="hidden" v-model="product.id" />
      <v-row>
        <v-col cols="6">
          <v-text-field outlined v-model="product.name" required label="Nome" />
        </v-col>
        <v-col cols="6">
          <v-text-field
            outlined
            v-model="product.imageUrl"
            required
            label="Imagem (Url)"
            placeholder="Ex: http://www.google.com/produto.jpg"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            outlined
            v-model="product.model"
            label="Modelo"
          />
        </v-col>
        <v-col cols="4">
          <v-select
            outlined
            :items="brands"
            item-text="name"
            item-value="id"
            v-model="product.brandId"
            label="Marca"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            outlined
            :items="categories"
            item-text="path"
            item-value="id"
            v-model="product.categoryId"
            label="Categoria"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea
            name="product-desc"
            outlined
            label="Descrição do Produto"
            auto-grow
            value="Descrição do Produto..."
            v-model="product.desc"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field
            outlined
            v-model="product.buyPrice"
            required
            label="Preço de Compra"
            prefix="R$"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            outlined
            v-model="product.taxes"
            v-show="taxesInPercent"
            required
            label="Impostos"
            prefix="%"
          />
          <v-text-field
            outlined
            v-model="product.taxes"
            v-show="!taxesInPercent"
            required
            label="Impostos"
            prefix="R$"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-checkbox
            v-model="taxesInPercent"
            label="Impostos em %"
          ></v-checkbox>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            outlined
            v-model="product.sellPrice"
            required
            label="Preço de Venda"
            prefix="R$"
          />
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            outlined
            v-model="product.qtd"
            required
            type="number"
            label="Quantidade"
          />
        </v-col>
        <v-col cols="12" md="2">
          <span>
            <v-text-field
              readonly
              disable
              label="Lucro"
              :value="
                this.calcProfits(
                  this.product.sellPrice,
                  this.product.buyPrice,
                  this.product.taxes
                )
              "
            />
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="success" @click="save">Salvar</v-btn>
          <v-btn color="error" @click="reset">Limpar</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <ProductList @loadProduct="loadProduct" />
    </v-row>
  </v-container>
</template>

<script>
import ProductList from '~/components/admin/products/ProductList'
import Vue from 'vue'
import { showError } from '@/global'
import { calcProfit } from '@/globalv2'
import { mapState } from 'vuex'

export default {
  name: 'ProductAdmin',
  components: { ProductList },
  data: function () {
    return {
      taxesInPercent: true,
      product: {},
    }
  },
  methods: {
    load() {
      this.$store.dispatch('loadCategories')
      this.$store.dispatch('loadBrands')
    },
    reset() {
      this.product = {}
      this.taxesInPercent = true
    },
    save() {
      if (
        this.product.buyPrice &&
        this.product.sellPrice &&
        this.product.taxes
      ) {
        if(!this.product.model) this.product.model = ""
        this.product.buyPrice = this.product.buyPrice.replace(/,/g, '.')
        this.product.sellPrice = this.product.sellPrice.replace(/,/g, '.')
        this.product.taxes = this.product.taxes.replace(/,/g, '.')

        if (!this.taxesInPercent) this.product.taxes = (this.product.taxes/this.product.buyPrice) * 100

        this.$store
          .dispatch('saveProduct', this.product)
          .then(() => {
            Vue.toasted.success('Sucesso!!')
            this.$store.dispatch('loadProducts')
            this.reset()
          })
          .catch(showError)
      } else {
        Vue.toasted.error("Preencha os preços!")
      }
    },
    loadProduct(item) {
      this.taxesInPercent = true
      this.product = item
    },
    calcProfits(sellPrice, buyPrice, taxes) {
      if (sellPrice && buyPrice && taxes) {
        buyPrice = buyPrice.replace(/,/g, '.')
        sellPrice = sellPrice.replace(/,/g, '.')
        taxes = taxes.replace(/,/g, '.')

        if (this.taxesInPercent) taxes = (taxes / 100) * buyPrice

        return (
          calcProfit(Number(sellPrice), Number(buyPrice), Number(taxes), true) +
          ' | ' +
          calcProfit(Number(sellPrice), Number(buyPrice), Number(taxes), false)
        )
      }
      return ''
    },
  },
  computed: {
    ...mapState({
      brands: (state) => state.brands,
      categories: (state) => state.categories,
    }),
  },
  created() {
    this.load()
  },
}
</script>

<style></style>
