<template>
  <div>
    <v-card-title>
      <v-card-title> Отслеживаемые валюты </v-card-title>
      <v-btn class="ma-2" color="info" @click="initialize"> Обновить список </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="courses"
      :items-per-page="10"
      class="elevation-1"
      v-if="!loading"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Убрать отслеживаемый курс?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Отмена</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Подтвердить</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="copyText(item)"
        >
          буфер
        </v-btn>
        <v-btn depressed color="error" @click="deleteItem(item)">
          Удалить
        </v-btn>
      </template>
      <template v-slot:no-data>
        У вас пока нет отслеживаемого курса валют
        <router-link to="/settings">Добавить</router-link>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data: () => {
    return {
      loader: null,
      loading: false,
      snackbar: false,
      text: `Текст скопирован в буфер`,
      headers: [
        {
          text: "Буквенный код",
          align: "start",
          sortable: false,
          value: "Cur_Abbreviation",
        },
        { text: "Текущий курс", value: "Cur_OfficialRate" },
        { text: "Дата", value: "Date" },
        { text: "Действия", value: "actions", sortable: false },
      ],
      courses: [],
      editedIndex: -1,
      dialogDelete: false,
    };
  },
  methods: {
    deleteItem(item) {
      this.editedIndex = this.courses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.courses.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    initialize() {
      this.courses = this.$store.getters.GET_SELECTED;
    },
    copyText(item) {
      navigator.clipboard.writeText(
        `${item.Cur_Abbreviation} - ${item.Cur_OfficialRate} - ${item.Date}`
      );
      this.snackbar = true;
    },
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    axios
      .get(`https://www.nbrb.by/api/exrates/rates?periodicity=0`) //145
      .then((response) => {
        this.$store.commit("ADD_COURSES", response.data);
      })
      .then(() => {
        this.initialize();
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
