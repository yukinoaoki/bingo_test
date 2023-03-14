<template>
	<div class="Closet">
		<v-tabs
			v-model="tabs"
			fixed-tabs
			flat
			centered
			purple
			color="purple lighten-3"
		>
			<v-tab @click="goBingo(2)"
				><v-icon vertical-align="middle">mdi-dots-square</v-icon></v-tab
			>
			<v-tab
				><v-icon vertical-align="middle">mdi-wardrobe-outline</v-icon></v-tab
			>
			<!--<v-tab @click="changeWeek(2)">Week2</v-tab> -->
			<!--<v-tab @click="changeWeek(3)">Week3</v-tab> -->
		</v-tabs>

		<div class="text-center">
			<div>
				<v-btn
					fixed
					color="blue-grey"
					fab
					left
					bottom
					class="ma-2 white--text"
					@click="goAdd()"
				>
					<v-icon>mdi-plus</v-icon>
				</v-btn>
				<v-btn
					fixed
					color="blue-grey"
					fab
					right
					bottom
					class="ma-2 white--text"
					@click="checkSeason()"
				>
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</div>
			<!-- <v-btn color="blue" dark @click="sheet = !sheet"> Open v-model </v-btn> -->
			<v-bottom-sheet v-model="sheet" hide-overlay>
				<v-sheet class="text-center">
					<div class="py-3">
						<v-row align="center" justify="center">
							<v-col cols="3">
								<v-checkbox
									v-model="season"
									label="spring"
									color="pink"
									value="spring"
									hide-details
								></v-checkbox>
							</v-col>
							<v-col cols="3">
								<v-checkbox
									v-model="season"
									label="summer"
									color="primary"
									value="summer"
									hide-details
								></v-checkbox>
							</v-col>
							<v-col cols="3">
								<v-checkbox
									v-model="season"
									label="autumn"
									color="orange darken-3"
									value="autumn"
									hide-details
								></v-checkbox>
							</v-col>
							<v-col cols="3">
								<v-checkbox
									v-model="season"
									label="winter"
									color="indigo darken-3"
									value="winter"
									hide-details
								></v-checkbox>
							</v-col>
						</v-row>
						<v-row align="center" justify="center">
							<v-btn-toggle
								v-model="toggle_exclusive"
								tile
								color="deep-purple accent-5"
								group
								multiple
								><v-btn value="T"> Tops </v-btn>
								<v-btn value="B"> Bottoms </v-btn>
								<v-btn value="A"> All in one </v-btn></v-btn-toggle
							>
						</v-row>
						<v-row align="center" justify="center"
							><v-btn
								color="blue-grey"
								class="ma-2 white--text"
								@click="checkSeason()"
							>
								絞り込み<v-icon>mdi-magnify</v-icon>
							</v-btn></v-row
						>
					</div>
				</v-sheet>
			</v-bottom-sheet>
		</div>

		<br />
		<v-row justify="center">
			<div
				v-for="(image, index) in ImageSrc"
				:key="index"
				class="d-flex child-flex"
			>
				<!-- 押されたらtoNextを実行 -->
				<v-card
					flat
					tile
					class="d-flex"
					:width="wWidth / 5"
					:height="wWidth / 5"
					:max-height="wWidth / 5"
					:max-width="wWidth / 5"
				>
					<v-img
						contain
						@click="toNext(index)"
						:src="image"
						:class="status[index - 1]"
						><v-card-text
							class="text"
							v-text="selectedDay[index - 1]"
						></v-card-text
					></v-img>
				</v-card>
			</div>
		</v-row>
		<br />

		<!-- <v-bottom-navigation grow app>
			<v-btn @click="magnify()">
				<span>拡大</span>
				<v-icon size="30">mdi-eye-plus</v-icon>
			</v-btn>
			<v-btn @click="viewspring()">
				<span>Spring</span>
				<v-icon size="30">mdi-hanger</v-icon>
			</v-btn>

			<v-btn @click="viewsummer()">
				<span>Summer</span>
				<v-icon size="30">mdi-block-helper</v-icon>
			</v-btn>
			<v-btn @click="viewautumn()">
				<span>Autumn</span>
				<v-icon size="30">mdi-block-helper</v-icon>
			</v-btn>
			<v-btn @click="viewwinter()">
				<span>Winter</span>
				<v-icon size="30">mdi-block-helper</v-icon>
			</v-btn>
		</v-bottom-navigation> -->

		<!-- <v-bottom-sheet v-model="sheet" fullscreen>
			<v-sheet class="text-center">
				<v-btn class="mt-6" text color="red" @click="sheet = !sheet">
					close
				</v-btn>
				<div class="py-3">
					<v-row>
						<v-col class="d-flex child-flex text-align-center" cols="12">
							<v-img
								:src="ImageSrc2[selectingIndex ? selectingIndex[0] : 0]"
							></v-img>
						</v-col>
					</v-row>
				</div>
			</v-sheet>
		</v-bottom-sheet> -->
	</div>
</template>

<script>
//import imageSelect from '../assets/data'

export default {
	data() {
		return {
			sheet: false,
			wWidth: window.innerWidth, //ウィンドウさいず
			wHeight: window.innerWidth,
			selectingIndex: [0],
			status: [],
			imageList: [],
			imageList2: [],
			image: [],
			ImageSrc: [],
			selectedDay: [],
			closet: [],
			randSrc: [], //画像の順番ぐちゃぐちゃにしたやつ入れるとこ
			whatToday: null,
			aryDay: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri"],
			changeStartDay: null,
			showWeek: 1,
			user_cloth: [],
			toggle_exclusive: ["T", "B", "A"],
			season: ["spring", "summer", "autumn", "winter"],
			tabs: 2,
		};
	},
	created() {
		//後で消そうね
		this.$store.state.userid = 0;
		this.axios
			.get("https://aoki.nkmr.io/api/get_cloth_aoki.php", {})
			.then((response) => {
				this.$store.commit("setCloth", { cloth: response.data });
				this.$store.state.cloth.forEach((item) => {
					if (item.User_ID == this.$store.state.userid) {
						this.user_cloth.push(item);
					}
				});

				console.log("ユーザの全服：", this.user_cloth);

				this.user_cloth.forEach((item) => {
					this.imageList.push(item);
				});
				this.imageList.forEach((item) => {
					this.ImageSrc.push(
						"https://aoki.nkmr.io/aoki_bingo_image/after/" + item.FilePath
					);
				});
			})
			.catch((error) => {
				console.log("err:", error);
			});

		console.log("見てみて", this.$store.state.cloth);
		this.tabs = 1;

		//ここまでで消す

		// if (this.$store.state.userid == null) {
		// 	this.$router.push("/");
		// }
	},
	mounted: function () {
		window.addEventListener("resize", this.handleResize);
	},
	methods: {
		check() {
			// console.log(this.model);
		},
		goBingo() {
			this.$router.push("/bingocard");
		},
		goAdd() {
			this.$router.push("/add");
		},
		checkSeason() {
			this.sheet = !this.sheet;
			//アイテムの季節の絞り込み
			this.flagSpring = 0;
			this.flagSummer = 0;
			this.flagAutumn = 0;
			this.flagWinter = 0;
			for (let n = 0; n < this.season.length; n++) {
				if (this.season[n] == "spring") this.flagSpring = 1;
				if (this.season[n] == "summer") this.flagSummer = 1;
				if (this.season[n] == "autumn") this.flagAutumn = 1;
				if (this.season[n] == "winter") this.flagWinter = 1;
			}

			this.imageList = [];
			this.ImageSrc = [];
			console.log("見てみよ", this.user_cloth);

			this.user_cloth.forEach((item) => {
				this.pushed = 0;
				if (this.flagSpring == 1) {
					if (item.Spring == 1) {
						this.imageList.push(item);
						this.pushed = 1;
					}
				}
				if (this.flagSummer == 1) {
					if (item.Summer == 1 && this.pushed == 0) {
						this.imageList.push(item);
						this.pushed = 1;
					}
				}
				if (this.flagAutumn == 1) {
					if (item.Autumn == 1 && this.pushed == 0) {
						this.imageList.push(item);
						this.pushed = 1;
					}
				}
				if (this.flagWinter == 1) {
					if (item.Winter == 1 && this.pushed == 0) {
						this.imageList.push(item);
					}
				}
			});

			//アイテムの種類の絞り込み
			this.T = 0;
			this.B = 0;
			this.A = 0;
			for (let n = 0; n < this.toggle_exclusive.length; n++) {
				if (this.toggle_exclusive[n] == "T") this.T = 1;
				if (this.toggle_exclusive[n] == "B") this.B = 1;
				if (this.toggle_exclusive[n] == "A") this.A = 1;
			}
			this.imageList2 = this.imageList;
			this.imageList = [];
			this.imageList2.forEach((item) => {
				if (this.T == 1 && item.Item == 1) {
					this.imageList.push(item);
				}
				if (this.B == 1 && item.Item == 2) {
					this.imageList.push(item);
				}
				if (this.A == 1 && item.Item == 0) {
					this.imageList.push(item);
				}
			});

			this.imageList.forEach((item) => {
				this.ImageSrc.push(
					"https://aoki.nkmr.io/aoki_bingo_image/after/" + item.FilePath
				);
			});
			console.log("季節", this.season);
			console.log("アイテム", this.toggle_exclusive);
			console.log("これ", this.imageList);
			// console.log("絞り込み結果", this.ImageSrc);
			// console.log("1の方", this.imageList);
		},
		// imageClick(index) {
		// 	this.currentImageIndex = index;
		// 	this.fullImage = true;
		// },
		// setInfo() {
		// 	//画像拡大するよ
		// 	this.selectingIndex = this.status
		// 		.map((e, i) => {
		// 			return e === "select" ? i : -1;
		// 		})
		// 		.filter((e) => {
		// 			return e !== -1;
		// 		});

		// 	console.log(this.selectingIndex);
		// 	console.log(this.status);
		// 	this.sheet = !this.sheet;
		// 	this.sheet = !this.sheet;
		// },
		toNext(n) {
			if (this.status[n - 1] == "select") {
				this.$set(this.status, n - 1, "img");
			} else if (this.status[n - 1] == "img") {
				this.$set(this.status, n - 1, "select");
			}
			// this.setInfo();
		},
		submit() {
			//選択した画像送信するとこ

			//選択した曜日とる
			this.checkDay();

			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == "selectReach") {
					this.$set(this.status, i, "select");
				}
				if (this.status[i] == "select") {
					this.$set(this.status, i, "selected");
					this.axios
						.get("https://aoki.nkmr.io/api/update_bingo.php", {
							params: {
								Day: this.changeStartDay,
								ID: this.bingo_cell[i].ID,
							},
						})
						.then((response) => {
							console.log("status:", response.status);

							////////////this.$set(this.selected, i, true);
							this.$set(this.selectedDay, i, this.changeStartDay);
						})
						.catch((error) => {
							console.log("err:", error);
						});
				}
				//console.log(i);
				//console.log(this.status[i]);
				//console.log(this.selected[i]);
			}
			this.showBingo();

			//console.log(i);
			console.log(this.status);
			console.log(this.selected);
		},
		submitCancel() {
			//送信取り消しするとこ
			//let Day = new Date();

			for (let i = 0; i < this.status.length; i++) {
				if (
					this.status[i] == "selectedCancel" ||
					this.status[i] == "bingoCancel"
				) {
					this.axios
						.get("https://aoki.nkmr.io/api/update_bingo.php", {
							params: {
								Day: null,
								ID: this.bingo_cell[i].ID,
							},
						})
						.then((response) => {
							console.log("status:", response.status);
							this.$set(this.status, i, "img");
							////////////this.$set(this.selected, i, false);
							this.$set(this.selectedDay, i, null);
						})
						.catch((error) => {
							console.log("err:", error);
						});
				}
				console.log(i);
				console.log(this.status[i]);
				console.log(this.selected[i]);
			}
			///
			//データベースの更新が終わったら処理するのを入れたい！！！！
			///
			this.showBingo();

			console.log(this.status);
			console.log(this.selected);
		},
		handleResize: function () {
			// ウインドウサイズが変わるたびにサイズを代入
			this.wWidth = window.innerWidth;
			this.wHeight = window.innerHeight;
			if (this.wWidth > this.wHeight) {
				this.wHeight = window.innerWidth;
			}
		},
	},
};
</script>

<style scoped>
.v-card {
	margin: 0 auto;
	width: 100%;
	height: 100%;
	object-fit: contain;
	filter: brightness(110%);
}
.w-text {
	font-size: 200%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.text {
	color: white;
	font-size: 200%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.Research {
	width: 100vw;
	height: 100vh;
}

.selected {
	filter: brightness(50%);
}
.bingo {
	filter: brightness(50%);
	outline: 4px solid blue;
	outline-offset: -4px;
}
.reach {
	outline: 4px solid red;
	outline-offset: -4px;
}
.selectedCancel {
	filter: brightness(50%);
	outline: 6px dashed black;
	outline-offset: -6px;
}
.bingoCancel {
	filter: brightness(50%);
	outline: 6px dashed black;
	outline-offset: -6px;
}
.select {
	outline: 6px dashed black;
	outline-offset: -6px;
}
.selectReach {
	outline: 6px dashed black;
	outline-offset: -6px;
}
.button_wrapper {
	text-align: center;
}
</style>
