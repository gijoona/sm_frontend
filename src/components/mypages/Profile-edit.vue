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
        @click="memberSave"
      >
        <v-icon>fa-save</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="finish"
      >
        <v-icon>fa-undo</v-icon>
      </v-btn>
    </v-toolbar>
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
                v-model="member.id"
                :counter="20"
                :rules="idRules"
                label="아이디"
                required
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="member.type"
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
                v-model="member.pass"
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
                v-model="member.passConfirm"
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
                v-model="member.name"
                :counter="30"
                :rules="nameRules"
                label="성함 또는 상호"
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.email"
                :rules="emailRules"
                label="이메일"
                required
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.tel"
                :rules="telRules"
                label="전화번호"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.fax"
                :rules="telRules"
                label="팩스"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.phone"
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
                    v-model="member.zipCode"
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
                v-model="member.addr1"
                label="주소"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.addr2"
                label="상세주소"
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="member.nation"
                label="국적"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.area1"
                label="지역1"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.area2"
                label="지역2"
                dense
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="member.companyNo"
                label="사업자등록번호"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.ceoNm"
                label="대표자명"
                dense
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="member.corpNo"
                label="법인번호"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'member' ],
  name: 'ProfileEdit',
  data() {
    return {
      valid: true,
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
        v => (v && v === this.member.pass) || '패스워드가 일치하지 않습니다.',
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
  methods: {
    finish() {
      this.$emit('finish');
    },
    memberSave() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('user/save', { memberInfo: this.member })
            .then(() => this.finish());
      }
    },
    openZippop() {
      const self = this.member;
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