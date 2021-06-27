<template>
  <v-card
    class="mb-12"
    color="grey lighten-1"
    height="200px"
  >
    <v-card-text>
      반갑습니다. <b>{{ name }}</b> 님.<br>
      <b>{{ name }}</b> 님이 신청하신 아이디 <b>{{ id }}</b> 로 회원가입이 완료되었습니다.<br>
      로그인 후 정상적으로 이용 가능하십니다.
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'name', 'id' ],
  name: 'Complete'
}
</script>
