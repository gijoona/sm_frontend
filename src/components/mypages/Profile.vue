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
      <v-row>
        <v-col cols="12" sm="4">회원유형</v-col>
        <v-col>{{ member.type }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">아이디</v-col>
        <v-col>{{ member.id }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">성함, 상호</v-col>
        <v-col>{{ member.name }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">이메일</v-col>
        <v-col>{{ member.email }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">연락처</v-col>
        <v-col>
          tel: {{ member.tel }}<br>
          fax: {{ member.fax }}<br>
          phone: {{ member.phone }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">주소</v-col>
        <v-col>({{ member.zipCode }}) {{ member.addr1 }} {{ member.addr2 }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">지역</v-col>
        <v-col>({{ member.nation }}) {{ member.area1 }} {{ member.area2 }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">가입일</v-col>
        <v-col>{{ member.createdAt }}</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">업체정보</v-col>
        <v-col>
          대표자: {{ member.ceoNm }}<br>
          법인번호: {{ member.corpNo }}<br>
          사업자등록번호: {{ member.companyNo }}
        </v-col>
      </v-row>
      <v-row v-if="member.isPaidMember === 'Y'">
        <v-col>
          <v-row>
            <v-col cols="12" sm="4">유료회원여부</v-col>
            <v-col>{{ member.isPaidMember }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">유료회원시작일</v-col>
            <v-col>{{ member.paidStart }}</v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="4">유료회원만료일</v-col>
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