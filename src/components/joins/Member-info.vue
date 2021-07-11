<template>
  <div>
    <v-card
      class="mb-12"
      color="grey lighten-4"
      height="500px"
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
                <v-row>
                  <v-col
                    cols="12"
                    sm="9"
                  >
                    <v-text-field
                      v-model="formData.id"
                      :counter="20"
                      :rules="idRules"
                      :success="isNotExists"
                      :success-messages="notExistMsg"
                      :error="isExists"
                      :error-messages="existMsg"
                      label="아이디"
                      required
                      dense
                      @input="resetExists"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                    class="pl-0"
                  >
                    <v-btn
                      color="primary"
                      @click.stop="idExistChk"
                    >중복체크</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-select
                  v-model="formData.type"
                  :items="typeItems"
                  item-text="text"
                  item-value="value"
                  :rules="[v => !!v || '회원구분은 필수값 입니다.']"
                  label="회원구분"
                  required
                  dense
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.pass"
                  :counter="20"
                  :rules="passRules"
                  label="패스워드"
                  required
                  type="password"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.passConfirm"
                  :counter="20"
                  :rules="passConfirmRules"
                  label="패스워드 확인"
                  required
                  type="password"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.name"
                  :counter="30"
                  :rules="nameRules"
                  label="성함 또는 상호"
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.email"
                  :rules="emailRules"
                  label="이메일"
                  required
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.tel"
                  :rules="telRules"
                  label="전화번호"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.fax"
                  :rules="telRules"
                  label="팩스"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.phone"
                  :rules="telRules"
                  label="휴대폰"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-row>
                  <v-col
                    cols="12"
                    sm="8"
                  >
                    <v-text-field
                      v-model="formData.zipCode"
                      label="우편번호"
                      dense
                      readonly
                      @focus="openZippop"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="pl-0"
                  >
                    <v-btn
                      color="primary"
                      @click.stop="openZippop"
                    >
                      우편번호
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.addr1"
                  label="주소"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.addr2"
                  label="상세주소"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.nation"
                  label="국적"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.area1"
                  label="지역1"
                  dense
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="formData.area2"
                  label="지역2"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="formData.cmpNm"
                  label="업체"
                  dense
                  readonly
                ></v-text-field>
              </v-col>
              <v-col>
              </v-col>
              <v-col>
              </v-col>
            </v-row>
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
      @click.stop="clickPrev"
    >
      이전
    </v-btn>
  </div>
</template>
<script>
export default {
  props: [ 'company' ],
  name: 'MemberInfo',
  data() {
    return {
      valid: true,
      isNotExists: false,
      isExists: false,
      notExistMsg: '',
      existMsg: '',
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
        cmpNm: ''
      },
      idRules: [
        v => !!v || '아이디은(는) 필수값 입니다.',
        v => (v && v.length >= 5) || '아이디는 최소 5자이상 입력하셔야 합니다.',
        v => (v && v.length <= 20) || '아이디는 최대 20자까지 입력할 수 있습니다.',
      ],
      passRules: [
        v => !!v || '패스워드은(는) 필수값 입니다.',
        v => (v && v.length >= 8) || '아이디는 최소 8자이상 입력하셔야 합니다.',
        v => (v && v.length <= 20) || '패스워드는 최대 20자까지 입력할 수 있습니다.',
      ],
      passConfirmRules: [
        v => (v && v === this.formData.pass) || '패스워드가 일치하지 않습니다.',
      ],
      nameRules: [
        v => !!v || '성함 또는 상호은(는) 필수값 입니다.',
        v => (v && v.length >= 2) || '아이디는 최소 2자이상 입력하셔야 합니다.',
        v => (v && v.length <= 30) || '성함 또는 상호은(는) 최대 30자까지 입력할 수 있습니다.',
      ],
      emailRules: [
        v => !!v || 'E-mail은(는) 필수값 입니다.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 맞지 않습니다.',
      ],
      telRules: [
        v => (!v || /\d{2,3}-\d{3,4}-\d{4}/.test(v)) || '전화번호 형식이 맞지 않습니다.',
      ],
      typeRules: [
        v => !!v || '회원구분은 필수값 입니다.'
      ],
      typeItems: [
        { text: '마린', value: 'M' },
        { text: '종합상사', value: 'C' },
        { text: '공급자', value: 'P'}
      ]
    }
  },
  watch: {
    company: {
      deep: true,
      immediate: true,
      handler(val) {
        this.formData.cmpId = val.id;
        this.formData.cmpNm = val.name;
      }
    }
  },
  methods: {
    clickPrev() {
      this.$emit('prev');
    },
    memberSave() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('user/join', { memberInfo: this.formData })
            .then(() => this.$emit('complete', this.formData));
      }
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
    idExistChk() {
      this.$store.dispatch('user/findId', this.formData.id)
          .then((res) => {
            if (res.data && res.data.id) {
              this.isExists = true;
              this.existMsg = '이미 사용중인 아이디 입니다.';
            } else {
              this.isNotExists = true;
              this.notExistMsg = '사용가능한 아이디 입니다.';
            }
          })
    },
    resetExists() {
      this.isExists = false;
      this.existMsg = '';
    },
    openZippop() {
      const self = this.formData;
      new window.daum.Postcode({
        oncomplete: function(data) {
          self.zipCode = data.zonecode;
          const address = data.buildingName ? `${data.address} (${data.buildingName})` : data.address;
          self.addr1 = address;
        }
      }).open();
    }
  }
}
</script>