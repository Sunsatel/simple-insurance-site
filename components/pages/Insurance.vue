<template>
	<div>
    	<section class="top wrapping" :style="headerStyle">
    		<div class="content presentation-top">
    			<h1>{{ document.data.title }}</h1>
        		<div class="right">
					<center>
						<PrismicImage :img="document.data.logo" w="150" />
						<p>
							<span class="rating">
								{{ this.$helpers.averageRating(document) }} <i class="fa fa-star text-yellow"></i>
							</span>
						</p>
						<div style="padding-left: 15%; padding-right: 15%; padding-top: 10px">
							<a :href="`/out/${document.uid}`" class="cta" target="_blank" rel="nofollow" v-if="document.data.tracking_link"
								>Se ditt pris</a
							>
						</div>
					</center>
        		</div>
				<div class="left">
					<table width="100%">
						<tbody>
							<tr>
								<td width="50%">Maxersättning:</td>
								<td><strong>{{ document.data.max_payment }}</strong></td>
							</tr>
							<tr>
								<td>Maxersättning minskas:</td>
								<td><strong>{{ document.data.max_payment_decrease }}</strong></td>
							</tr>
							<tr>
								<td>Karenstid:</td>
								<td><strong>{{ document.data.waiting_period }}</strong></td>
							</tr>
							<tr>
								<td>Självrisk:</td>
								<td><strong>{{ document.data.excess }}</strong></td>
							</tr>
							<tr>
								<td>Självriskperiod:</td>
								<td><strong>{{ document.data.excess_period }}</strong></td>
							</tr>
							<tr v-if="this.$store.state.settings.use_data_veterinary">
								<td>Veterinärvård kan tecknas:</td>
								<td><strong>{{ document.data.veterinary_before }}</strong></td>
							</tr>
							<tr v-if="this.$store.state.settings.use_data_life_insurance">
								<td>Livförsäkring kan tecknas:</td>
								<td><strong>{{ document.data.life_insurance_before }}</strong></td>
							</tr>
							<tr v-if="this.$store.state.settings.use_data_life_insurance_expires">
								<td>Livförsäkring upphör:</td>
								<td><strong>{{ document.data.life_insurance_expires }}</strong></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="clear"></div>
      		</div>
    	</section>
		<section class="article">
			<div class="content">
				<div class="right">
					<div width="100%">
						<h2>Betyg</h2>
						<table width="100%">
							<tbody>
								<tr>
									<td width="50%">Karenstid:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_waiting_period)" :key="i"></i>
										</span>
									</td>
								</tr>
								<tr>
									<td>Ålder:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_age)" :key="i"></i>
										</span>
									</td>
								</tr>
								<tr>
									<td>Veterinärvård:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_veterinary)" :key="i"></i>
										</span>
									</td>
								</tr>
								<tr>
									<td>Livförsäkring:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_life_insurance)" :key="i"></i>
										</span>
									</td>
								</tr>
								<tr>
									<td>Självrisk:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_excess)" :key="i"></i>
										</span>
									</td>
								</tr>
								<tr>
									<td>Pris:</td>
									<td>
										<span class="rating">
											<i class="fa fa-star text-yellow" v-for="i in parseInt(document.data.rating_price)" :key="i"></i>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<br>
					<h2>Varför välja {{ document.data.title }}?</h2>
					 <ul class="benefits">
                		<li v-for="(iterator, index) in document.data.pros_in_review" :key="`pro${index}`"><i class="fa fa-thumbs-up text-success"></i> {{ iterator.pro }}</li>
            		</ul>
				</div>
				<div class="left">
					<div v-if="document.data.review.length" v-html="$prismic.asHtml(document.data.review)" />
					<div v-else>
						<h2>Om {{ document.data.title }}</h2>
            			<p>Här uppdaterar vi snart med en recension av {{ document.data.title }}.</p>
					</div>
					
					<hr>
					<div style="padding-left: 15%; padding-right: 15%;">
						<a v-if="document.data.tracking_link" :href="`/out/${document.uid}/`" class="cta" target="_blank" rel="nofollow">Se ditt pris</a>
					</div>
				</div>
				<div class="clear" />
			</div>
		</section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      headerStyle: `background: url(${this.$store.state.settings.banner_image.url}); background-size: cover; background-position: center top; (0,0,0,0.8); box-shadow: inset 0 0 0 500px rgba(0,0,0,0.3);`,
    };
  },
  props: {
    document: {
      type: Object,
      required: true,
    },
  },
};
</script>