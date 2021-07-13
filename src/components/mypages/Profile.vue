<template>
  <v-card>
    <v-toolbar
      dark
      color="indigo"
      class="font-weight-bold"
      flat
    >
      회원정보
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
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >회원유형</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ member.type }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >아이디</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ member.id }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >성함, 상호</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ member.name }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >이메일</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ member.email }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >연락처</v-col>
        <v-divider vertical></v-divider>
        <v-col>
          tel: {{ member.tel }}<br>
          fax: {{ member.fax }}<br>
          phone: {{ member.phone }}
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >주소</v-col>
        <v-divider vertical></v-divider>
        <v-col>({{ member.zipCode }}) {{ member.addr1 }} {{ member.addr2 }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >지역</v-col>
        <v-divider vertical></v-divider>
        <v-col>({{ member.nation }}) {{ member.area1 }} {{ member.area2 }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row
        class="py-2"
      >
        <v-col cols="12" sm="4"
          class="text-overline text-center font-weight-black"
        >가입일</v-col>
        <v-divider vertical></v-divider>
        <v-col>{{ member.createdAt }}</v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row v-if="member.isPaidMember === 'Y'">
        <v-col>
          <v-row
            class="py-2"
          >
            <v-col cols="12" sm="4"
              class="text-overline text-center font-weight-black"
            >유료회원여부</v-col>
            <v-divider vertical></v-divider>
            <v-col>{{ member.isPaidMember }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row
            class="py-2"
          >
            <v-col cols="12" sm="4"
              class="text-overline text-center font-weight-black"
            >유료회원시작일</v-col>
            <v-divider vertical></v-divider>
            <v-col>{{ member.paidStart }}</v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row
            class="py-2"
          >
            <v-col cols="12" sm="4"
              class="text-overline text-center font-weight-black"
            >유료회원만료일</v-col>
            <v-divider vertical></v-divider>
            <v-col>{{ member.paidEnd }}</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
  
<script>
export default {
  props: [ 'member' ],
  name: 'Profile',
  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('edit');
    }
  }
}
</script>