<template>
  <v-container>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          개인정보 수집 및 취급 동의
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          업체정보 입력
          <small>
            개인회원의 경우 하단 건너뛰기 버튼을 클릭.
          </small>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 3"
          step="3"
        >
          회원정보 입력
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">
          가입 완료
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <!-- 개인정보 수집 및 이용동의 -->
        <v-stepper-content step="1">
          <Privacy/>

          <v-btn
            color="primary"
            @click="nextStep"
          >
            동의
          </v-btn>
        </v-stepper-content>
        <!-- 개인정보 수집 및 이용동의 -->

        <!-- 업체정보 입력 -->
        <v-stepper-content step="2">
          <CompanyInfo @next="nextStep" @complete="companySave"/>
        </v-stepper-content>
        <!-- 업체정보 입력 -->

        <!-- 회원정보 입력 -->
        <v-stepper-content step="3">
          <MemberInfo :company="compData" @prev="prevStep" @complete="mamberSave"/>
        </v-stepper-content>
        <!-- 회원정보 입력 -->

        <!-- 가입완료 -->
        <v-stepper-content step="4">
          <Complete :name="formData.name" :id="formData.id" />

          <v-btn
            color="primary"
            to="/login"
          >
            로그인
          </v-btn>
        </v-stepper-content>
        <!-- 가입완료 -->
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import Privacy from '@/components/joins/Privacy.vue'
import Complete from '@/components/joins/Complete.vue'
import CompanyInfo from '@/components/joins/Company-info.vue'
import MemberInfo from '@/components/joins/Member-info.vue'

export default {
  components: {
    Privacy,
    Complete,
    CompanyInfo,
    MemberInfo
  },
  name: 'MemberJoin',
  data() {
    return {
      e1: 1,
      compData: {},
      formData: {
        id: '',
        pass: '',
        passConfirm: '',
        name: '',
        email: '',
        tel: '',
        fax: '',
        phone: '',
        zipCode: '',
        addr1: '',
        addr2: '',
        nation: '',
        area1: '',
        area2: '',
        type: null,
        cmpId: null,
        cmpNo: ''
      },
    }
  },
  methods: {
    prevStep() {
      this.e1--;
    },
    nextStep() {
      this.e1++;
    },
    companySave(data) {
      this.compData = data;
      this.nextStep();
    },
    mamberSave(data) {
      this.formData = data;
      this.nextStep();
    }
  }
}
</script>