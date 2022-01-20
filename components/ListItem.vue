<template>
  <div class="box">
    <div class="table">
      <div class="tr">
        <div class="td td-min" style="text-align: center">
          <nuxt-link :to="$prismic.linkResolver(insurance)">
            <PrismicImage :img="insurance.data.logo" w="150" :alt="insurance.data.title" />
         </nuxt-link>
          <p>
            <span class="rating"
              >{{ this.$helpers.averageRating(insurance) }} <i class="fa fa-star text-yellow"></i>
            </span>
          </p>
        </div>
        <div class="td td-med">
          Fördelar
          <strong v-for="(iterator, index) in insurance.data.pros_in_list" :key="`pro${index}`"><i class="fa fa-check text-success"></i> {{ iterator.pro }}</strong>
        </div>
        <div class="td td-max">
          <table width="100%">
            <tbody>
              <tr>
                <td width="50%">Maxersättning:</td>
                <td><strong>{{ insurance.data.max_payment }}</strong></td>
              </tr>
              <tr>
                <td>Maxersättning minskas:</td>
                <td><strong>{{ insurance.data.max_payment_decrease }}</strong></td>
              </tr>
              <tr>
                <td>Karenstid:</td>
                <td><strong>{{ insurance.data.waiting_period }}</strong></td>
              </tr>
              <tr>
                <td>Självrisk:</td>
                <td><strong>{{ insurance.data.excess }}</strong></td>
              </tr>
              <tr>
                <td>Självriskperiod:</td>
                <td><strong>{{ insurance.data.excess_period }}</strong></td>
              </tr>
              <tr v-if="this.$store.state.settings.use_data_veterinary">
                <td>Veterinärvård kan tecknas:</td>
                <td><strong>{{ insurance.data.veterinary_before }}</strong></td>
              </tr>
              <tr v-if="this.$store.state.settings.use_data_life_insurance">
                <td>Livförsäkring kan tecknas:</td>
                <td><strong>{{ insurance.data.life_insurance_before }}</strong></td>
              </tr>
							<tr v-if="this.$store.state.settings.use_data_life_insurance_expires">
								<td>Livförsäkring upphör:</td>
								<td><strong>{{ insurance.data.life_insurance_expires }}</strong></td>
							</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="table" style="margin-top: -40px">
      <div class="tr">
        <div class="td" style="text-align: center">
          <hr />
          <a
            v-if="insurance.data.tracking_link"
            :href="`/out/${insurance.uid}/`"
            class="cta"
            target="_blank"
            rel="nofollow"
            style=" margin: 5px; width: 20%; min-width: 250px; display: inline-block;"
            >Se ditt pris</a
          >
          <nuxt-link :to="$prismic.linkResolver(insurance)"
            class="cta"
            style="margin: 5px; width: 20%; min-width: 250px; display: inline-block; background: #f3f3f3; color: #333;"
            >Läs recension</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['id'],
    computed: {
        insurance() {
            return this.$store.state.insurances[this.id];
        }
    }
}
</script>