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
        @click="companySave"
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
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formData.cmpNo"
                    :rules="cmpNoRules"
                    :success="isNotExists"
                    :success-messages="notExistMsg"
                    label="사업자등록번호 (123-12-12345)"
                    required
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formData.name"
                :counter="30"
                :rules="nameRules"
                label="상호"
                required
                dense
                :readonly="!isNotExists"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="formData.ceoNm"
                label="대표자명"
                dense
                :readonly="!isNotExists"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formData.bzNo"
                label="법인번호"
                dense
                :readonly="!isNotExists"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
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
                    :disabled="!isNotExists"
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
                    :disabled="!isNotExists"
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
                :readonly="!isNotExists"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formData.addr2"
                label="상세주소"
                dense
                :readonly="!isNotExists"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedCategorys"
                label="취급품목"
                :items="categorys"
                item-text="nameKor"
                item-value="code"
                multiple
                chips
                dense
                solo
                hide-details
                deletable-chips
                return-object
                :readonly="!isNotExists"
              ></v-select>
            </v-col>
          </v-row>

        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'comp' ],
  name: 'CompanyEdit',
  data() {
    return {
      selectedCategorys: [],
      valid: true,
      isNotExists: true,
      notExistMsg: '',
      defaultData: {
        name: '',
        email: '',
        tel: '',
        fax: '',
        zipCode: '',
        addr1: '',
        addr2: '',
        cmpNm: '',
        bzNo: '',
        ceoNm: '',
        categorys: []
      },
      formData: {
        name: '',
        email: '',
        tel: '',
        fax: '',
        zipCode: '',
        addr1: '',
        addr2: '',
        cmpNm: '',
        bzNo: '',
        ceoNm: '',
        categorys: []
      },
      nameRules: [
        v => !!v || '상호은(는) 필수값 입니다.',
        v => (v && v.length >= 2) || '상호은(는) 최소 2자이상 입력하셔야 합니다.',
        v => (v && v.length <= 30) || '상호은(는) 최대 30자까지 입력할 수 있습니다.',
      ],
      cmpNoRules: [
        v => !!v || '사업자등록번호은(는) 필수값 입니다.',
        v => /\d{3}-\d{2}-\d{5}$/.test(v) || '사업자등록번호 형식이 맞지 않습니다.',
      ],
      emailRules: [
        v => !!v || 'E-mail은(는) 필수값 입니다.',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 맞지 않습니다.',
      ],
      telRules: [
        v => (!v || /\d{2,3}-\d{3,4}-\d{4}/.test(v)) || '전화번호 형식이 맞지 않습니다.',
      ],
    }
  },
  computed: {
    categorys() {
      return this.$store.getters['category/categorys'];
    }
  },
  methods: {
    companySave() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('user/updateComp', { companyInfo: this.formData, categorys: this.selectedCategorys })
            .then(() => this.finish());
      }
    },
    finish() {
      this.$emit('finish');
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
  },
  mounted() {
    this.$store.dispatch('category/findAll');
    this.formData = this.comp;
    this.selectedCategorys = this.comp.categorys;
  }
}
</script>