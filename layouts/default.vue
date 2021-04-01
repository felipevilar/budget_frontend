<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="isMenuVisible"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="isMenuVisible" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div class="px-1">
        <v-menu bottom rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="orange accent" size="48">
                <span class="white--text font-weight-bold"
                  >{{ (user.name[0]+user.name[1]).toUpperCase() }}</span
                >
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="orange accent" class="my-2">
                  <span class="white--text font-weight-bold">{{
                    (user.name[0] + user.name[1]).toUpperCase()
                  }}</span>
                </v-avatar>
                <h3>{{ user.name }}</h3>
                <p class="caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-1"></v-divider>
                <v-btn depressed rounded text>
                  <v-icon class="mx-1" color="grey">mdi-cog</v-icon>
                  <router-link to="/admin">Administraçãos</router-link>
                </v-btn>
                <v-divider class="my-1"></v-divider>
                <v-btn depressed rounded text @click="logout">
                  <v-icon class="mx-1" color="grey">mdi-exit-to-app</v-icon>
                  Sair
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <Loading v-if="validatingToken" />
      <v-container v-else>
        <nuxt />
      </v-container>
    </v-main>

    <div></div>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { userKey, baseUrl } from '@/global'
import axios from 'axios'
import Loading from '~/components/Loading'

export default {
  components: { Loading },
  data() {
    return {
      validatingToken: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-cog',
          title: 'Administração',
          to: '/admin',
        },
        {
          icon: 'mdi-cash-usd',
          title: 'Orçamentos',
          to: '/budget',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '3CORE TECNOLOGIA',
    }
  },
  methods: {
    logout() {
      localStorage.removeItem(userKey)
      this.$store.dispatch('setUser', null)
      this.$router.push({ path: '/login' })
    },
    async validateToken() {
      console.log('async validateToken()')
      if (process.browser) {
        this.validatingToken = true

        const json = localStorage.getItem(userKey)
        const userdata = JSON.parse(json)
        this.$store.dispatch('setUser', null)

        if (!userdata) {
          this.validatingToken = false
          this.$router.push({ path: '/login' })
          return
        }

        try {
          const res = await axios.post(`${baseUrl}/validateToken`, userdata)
          if (res.data) {
            this.$store.dispatch('setUser', userdata)
          } else {
            console.log('Removing localStorage item')
            localStorage.removeItem(userKey)
            this.$router.push({ path: '/login' })
          }
        } catch (error) {
          console.log('Validate token error: ' + error)
        }

        this.validatingToken = false
      } else {
        this.$router.push({ path: '/login' })
      }
    },
  },
  computed: {
    ...mapState({
      isMenuVisible: (state) => state.isMenuVisible,
      user: (state) => state.user,
    }),
  },
  mounted() {
    console.log('Usuario: ' + this.isMenuVisible)
  },
  created() {
    this.validateToken()
  },
}
</script>
