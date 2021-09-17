<template>
  <div>
    <v-card-title>
      Список всех валют изи API нац. банка
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="this.$store.getters.GET_COURSES"
      :search="search"
      item-key="Cur_ID"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      search: "",
      selected: this.$store.getters.GET_SELECTED,
      headers: [
        {
          text: "Буквенный код",
          align: "start",
          sortable: false,
          value: "Cur_Abbreviation",
        },
        { text: "Текущий курс", value: "Cur_OfficialRate" },
        { text: "Дата", value: "Date" },
      ],
    };
  },
  methods: {
    addSelectItems() {
      this.$store.commit("ADD_SELECTED", this.selected);
    },
  },
  watch: {
    selected: function () {
      this.addSelectItems();
    },
  },
};
</script>
