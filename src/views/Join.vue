<template>
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
        회원정보 입력
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        가입 완료
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <!-- 개인정보 수집 및 이용동의 -->
      <v-stepper-content step="1">
        <Privacy/>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          동의
        </v-btn>
      </v-stepper-content>
      <!-- 개인정보 수집 및 이용동의 -->

      <!-- 회원정보 입력 -->
      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="600px"
        >
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="id"
                      :counter="10"
                      :rules="nameRules"
                      label="아이디"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                      v-model="type"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="회원구분"
                      required
                      dense
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="pass"
                      :counter="10"
                      :rules="nameRules"
                      label="패스워드"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="pass"
                      :counter="10"
                      :rules="nameRules"
                      label="패스워드 확인"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      :counter="10"
                      :rules="nameRules"
                      label="성함 또는 상호"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="이메일"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="tel"
                      :rules="emailRules"
                      label="전화번호"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="fax"
                      :rules="emailRules"
                      label="팩스"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="phone"
                      :rules="emailRules"
                      label="휴대폰"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="zipCode"
                      :rules="emailRules"
                      label="우편번호"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="addr1"
                      :rules="emailRules"
                      label="주소"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="addr2"
                      :rules="emailRules"
                      label="상세주소"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="nation"
                      :rules="emailRules"
                      label="국적"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="area1"
                      :rules="emailRules"
                      label="지역1"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="area2"
                      :rules="emailRules"
                      label="지역2"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="companyNo"
                      :rules="emailRules"
                      label="사업자등록번호"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="ceoNm"
                      :rules="emailRules"
                      label="대표자명"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="corpNo"
                      :rules="emailRules"
                      label="법인번호"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-select
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  label="Item"
                  required
                ></v-select>

                <v-checkbox
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  label="Do you agree?"
                  required
                ></v-checkbox>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Validate
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Reset Form
                </v-btn>

                <v-btn
                  color="warning"
                  @click="resetValidation"
                >
                  Reset Validation
                </v-btn>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>

        <v-btn
          color="primary"
          @click="memberSave"
        >
          회원가입
        </v-btn>

        <v-btn 
          text
          @click="e1 = 1"
        >
          이전
        </v-btn>
      </v-stepper-content>
      <!-- 회원정보 입력 -->

      <!-- 가입완료 -->
      <v-stepper-content step="3">
        <Complete/>

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
</template>
<script>
import Privacy from '@/components/joins/Privacy.vue'
import Complete from '@/components/joins/Complete.vue'

export default {
  components: {
    Privacy,
    Complete
  },
  name: 'MemberJoin',
  data() {
    return {
      e1: 1,
      valid: true,
      id: '',
      pass: '',
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
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
      companyNo: '',
      corpNo: '',
      ceoNm: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }
  },
  methods: {
    memberSave() {
      this.e1 = 3;
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
  }
}
</script>