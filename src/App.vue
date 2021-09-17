<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item class="height">
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Меню </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <router-link :to="item.link" class="router-link">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Курс валют национального банка РБ</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "Главная", icon: "mdi-home-city", link: "/" },
        { title: "Настройки", icon: "mdi-account", link: "settings" },
      ],
      mini: true,
      right: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.router-link {
  display: block;
  text-transform: uppercase;
  color: black;
  text-decoration: none;
}
.height {
  height: 64px;
}
</style>
