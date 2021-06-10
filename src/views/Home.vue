<template>
  <div>
    <div
      style="height: 100vh;"
    >
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        :height="fullHeight"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            class="text-center"
            cols="12"
          >
            <h1 class="display-4 font-weight-black mb-4">
              Space Marine
            </h1>
            <h4 class="subheading">
              Correct Price Information of ships stores!
            </h4>
          </v-col>
        </v-row>
      </v-parallax>
    </div>
    
    <v-row>
      <v-col cols="12">
        <v-carousel
          cycle
          :height="fullHeight"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-sheet
      dark
      color="grey darken-3"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          class="text-center"
        >
          <h1 class="display-2 font-weight-medium mt-10">
            CONTACT US
          </h1>
        </v-col>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col sm="12" md="12" lg="12" cols="12"></v-col>
        <v-col sm="10" md="3" lg="3" cols="10">
          <v-card
            light
            :color="contactOps.color"
            :min-height="contactOps.minHeight"
          >
            <v-card-title>
              <v-icon 
                size="48"
                color="primary"
                class="mx-auto"
              >fa-at</v-icon>
            </v-card-title>

            <v-card-text
              style="min-height: 100px;"
            >
              <div>
                <v-label>
                  <v-icon>mdi-email</v-icon>
                  master@space-marine.com
                </v-label>
              </div>
              <div>
                <v-label>
                  <v-icon>mdi-email</v-icon>
                  yeomhoseob@korea.com
                </v-label>
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn
                block
                color="primary"
              >
                Send Email
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="10" md="3" lg="3" cols="10">
          <v-card
            light
            :color="contactOps.color"
            :min-height="contactOps.minHeight"
          >
            <v-card-title>
              <v-icon 
                size="48"
                color="primary"
                class="mx-auto"
              >fa-route</v-icon>
            </v-card-title>

            <v-card-text
              style="min-height: 100px;"
            >
              <v-label>
                <v-icon>fa-map</v-icon>
                부산광역시 서구 구덕로 134번길 34-2
              </v-label>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn
                block
                color="primary"
              >
                Location
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="10" md="3" lg="3" cols="10">
          <v-card
            light
            :color="contactOps.color"
            :min-height="contactOps.minHeight"
          >
            <v-card-title>
              <v-icon 
                size="48"
                color="primary"
                class="mx-auto"
              >fa-phone-square-alt</v-icon>
            </v-card-title>
            
            <v-card-text
              style="min-height: 100px;"
            >
              <div>
                <v-label>
                  <v-icon>mdi-phone</v-icon> 
                  010-4558-9075
                </v-label>
              </div>
              <div>
                <v-label>
                  <v-icon>mdi-phone</v-icon>
                  82-51-417-0466
                </v-label>
              </div>
              <div>
                <v-label>
                  <v-icon>mdi-fax</v-icon>
                  82-51-711-7381
                </v-label>
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn
                block
                color="primary"
              >
                Call
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col sm="12" md="12" lg="12" cols="12"></v-col>
      </v-row>
    </v-sheet>
    <section>
      <iframe 
        :src="googleMap.src" 
        :width="googleMap.width" 
        :height="googleMap.height" 
        :loading="googleMap.loading"
        style="border:0;" 
        allowfullscreen="" 
      ></iframe>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data: () => {
    return {
      slides: [
        { name: 'slide1', src: require('@/assets/main_slider_1.jpg')},
        { name: 'slide2', src: require('@/assets/main_slider_2.jpg')},
        { name: 'slide3', src: require('@/assets/main_slider_3.jpg')},
        { name: 'slide4', src: require('@/assets/main_slider_4.jpg')},
      ],
      googleMap: {
        src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3264.327125751126!2d129.0199668!3d35.0985416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568e9a47ab996db%3A0x6b2b363cb16b63c0!2z67aA7IKw6rSR7Jet7IucIOyEnOq1rCDthqDshLHrj5k16rCAIOq1rOuNleuhnDEzNOuyiOq4uCAzNC0y!5e0!3m2!1sko!2skr!4v1620890125650!5m2!1sko!2skr',
        width: '100%',
        height: 500,
        loading: 'lazy'
      },
      contactOps: {
        color: 'white',
        minHeight: 200
      }
    }
  },
  computed: {
    fullHeight() {
      return (window.innerHeight * 100) / 100;
    }
  }
}
</script>
