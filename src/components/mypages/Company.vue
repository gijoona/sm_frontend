<template>
  <v-card>
    <v-toolbar
      dark
      color="indigo"
      class="font-weight-bold"
      flat
    >
      업체정보
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="edit"
      >
        <v-icon>mdi-pen</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-row
        class="py-2"
      >
        <v-col
          class="text-overline text-center font-weight-black"
        >업체명</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.name }}</v-col>
        <v-divider vertical></v-divider>
        <v-col
          class="text-overline text-center font-weight-black"
        >대표자 성명</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.ceoNm }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col
          class="text-overline text-center font-weight-black"
        >사업자등록번호</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.cmpNo }}</v-col>
        <v-divider vertical></v-divider>
        <v-col
          class="text-overline text-center font-weight-black"
        >법인번호</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.bzNo }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col
          class="text-overline text-center font-weight-black"
        >전화번호</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.tel }}</v-col>
        <v-divider vertical></v-divider>
        <v-col
          class="text-overline text-center font-weight-black"
        >팩스번호</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.fax }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col
          cals="12"
          sm="3"
          class="text-overline text-center font-weight-black"
        >이메일</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ comp.email }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col
          cals="12"
          sm="3"
          class="text-overline text-center font-weight-black"
        >주소</v-col>
        <v-divider vertical></v-divider>
        <v-col>({{ comp.zipCode }}) {{ comp.addr1 }} {{ comp.addr2 }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col
          cals="12"
          sm="3"
          class="text-overline text-center font-weight-black"
        >취급 품목</v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <v-virtual-scroll
            height="192"
            item-height="50"
            :items="comp.categorys"
          >
            <template v-slot:default="{ item }">
              <v-list-item>
                <v-list-item-content>
                  {{ item.code }}.{{ item.nameKor }}
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-virtual-scroll>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'comp' ],
  name: 'Company',
  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('edit', 'company');
    }
  }
}
</script>