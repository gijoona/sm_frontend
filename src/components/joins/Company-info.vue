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
                      v-model="formData.cmpNo"
                      :rules="cmpNoRules"
                      :success="isNotExists"
                      :success-messages="notExistMsg"
                      label="사업자등록번호 (123-12-12345)"
                      required
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="3"
                    class="pl-0"
                  >
                    <v-btn
                      color="primary"
                      @click.stop="cmpNoExistChk"
                    >중복체크</v-btn>
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
                  item-text="nameKor2"
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

    <v-btn v-if="isNotExists"
      color="primary"
      @click="save"
    >
      업체정보 등록
    </v-btn>
    <v-btn v-else
      color="primary"
      @click="confirm"
    >
      확인
    </v-btn>

    <v-btn 
      text
      @click.stop="clickNext"
    >
      건너뛰기
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'CompanyInfo',
  data() {
    return {
      selectedCategorys: [],
      valid: true,
      isNotExists: false,
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
        v => (!v || /.+@.+\..+/.test(v)) || '이메일 형식이 맞지 않습니다.',
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
    clickNext() {
      this.$emit('next');
    },
    save() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('user/registComp', { companyInfo: this.formData, categorys: this.selectedCategorys })
            .then((res) => this.$emit('complete', res.data));
      }
    },
    confirm() {
      this.$emit('complete', this.formData);
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
    cmpNoExistChk() {
      if(this.formData.cmpNo && /\d{3}-\d{2}-\d{5}$/.test(this.formData.cmpNo)) {
        this.$store.dispatch('user/finCmpNo', this.formData.cmpNo)
            .then((res) => {
              if (res.data && res.data.cmpNo) {
                this.isNotExists = false;
                this.notExistMsg = '';
                this.formData = res.data;
                this.selectedCategorys = res.data.categorys;
              } else {
                this.formData = {...this.defaultData, ...{ cmpNo: this.formData.cmpNo }};
                this.selectedCategorys = [];
                this.isNotExists = true;
                this.notExistMsg = '미등록된 사업자등록번호 입니다.';
              }
            })
      }
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
  }
}
</script>