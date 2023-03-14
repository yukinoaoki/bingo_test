<template>
	<div class="Bingocard">
		<v-tabs
			v-model="tabs"
			fixed-tabs
			flat
			centered
			purple
			color="purple lighten-3"
		>
			<v-tab><v-icon vertical-align="middle">mdi-dots-square</v-icon></v-tab>
			<v-tab @click="goCloset()"
				><v-icon vertical-align="middle">mdi-wardrobe-outline</v-icon></v-tab
			>
		</v-tabs>
		<br />
		<!-- <div class="text-h5 mb-6 text-center">
			<code v-text="day"></code>
		</div> -->
		<v-row justify="center">
			<div v-for="n in 25" :key="n" class="d-flex child-flex">
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
						@click="toNext(n)"
						:src="ImageSrc2[n - 1]"
						:class="status[n - 1]"
						><v-card-text class="text" v-text="selectedDay[n - 1]"></v-card-text
					></v-img>
				</v-card>
			</div>
		</v-row>

		<br />
		<v-card class="d-flex align-center justify-center pa-2 mx-auto" outlined>
			<div><p class="font-weight-regular">DAY 6</p></div>
		</v-card>
		<v-alert
			border="left"
			color="red accent-1"
			icon="mdi-foot-print"
			type="success"
			v-model="this.makeReach"
			>{{ this.makereachCount }} REACH!!</v-alert
		>
		<v-alert
			border="left"
			color="blue accent-1"
			icon="mdi-trophy-award"
			type="success"
			v-model="this.makeBingo"
			>{{ this.makebingoCount }} BINGO!!</v-alert
		>

		<v-dialog v-model="this.dialog" :width="wWidth * 0.8">
			<v-card :height="wWidth / 2">
				<v-card-title class="text-h5 grey lighten-2">
					変更しました</v-card-title
				>
				<v-card-text>
					<v-row class="light--text" justify="center">
						<v-col cols="5" align-self="stretch">
							<v-img :src="this.beforeChange" :width="wWidth * 0.3" />
						</v-col>
						<v-col cols="2">
							<v-icon vertical-align="middle" size="60"
								>mdi-arrow-right-bold</v-icon
							>
						</v-col>
						<v-col cols="5" align-self="stretch">
							<v-img :src="this.afterChange" :width="wWidth * 0.3" />
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-bottom-navigation grow app>
			<v-btn dark @click="magnify()">
				<span>拡大</span>
				<v-icon size="30">mdi-eye-plus</v-icon>
			</v-btn>

			<v-btn dark @click="submit()">
				<span>送信</span>
				<v-icon size="30">mdi-hanger</v-icon>
			</v-btn>

			<v-btn dark @click="submitCancel()">
				<span>取り消し</span>
				<v-icon size="30">mdi-block-helper</v-icon>
			</v-btn>
			<v-btn dark @click="randomChange()">
				<span>チェンジ</span>
				<v-icon size="30">mdi-autorenew</v-icon>
			</v-btn>
		</v-bottom-navigation>

		<v-bottom-sheet v-model="sheet">
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
		</v-bottom-sheet>
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
			dialog: false,
			status: [
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
				"img",
			],
			selected: [
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,
			],
			ImageSrc: [],
			ImageSrc2: [
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
			],
			selectedDay: [
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
			],
			bingo_cell: [],
			randSrc: [], //画像の順番ぐちゃぐちゃにしたやつ入れるとこ
			whatToday: null,
			aryDay: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri"],
			changeStartDay: null,
			showWeek: 1,
			user_cloth: [],
			makeBingo: false,
			makeReach: false,
			makebingoCount: false,
			makereachCount: false,
			beforeChange: null,
			afterChange: null,
			tabs: 0,
			day: "Day6",
		};
	},
	created() {
		this.tabs = 0;
		this.$store.state.userid = 0;
		this.getPHP();

		this.$store.state.cloth.forEach((item) => {
			if (item.User_ID == this.$store.state.userid) {
				this.user_cloth.push(item);
			}
		});

		if (this.$store.state.userid == null) {
			this.$router.push("/");
		}

		// this.showBingo();

		//for (let i = 0; i < this.ImageSrc.length; i++) {
		//  this.randSrc[i] = _.shuffle(this.randSrc[i]);
		//}
		//開始時間とるよ
		//this.startTime = new Date();
		// マウスの軌跡取り始めるよ
	},
	mounted: function () {
		window.addEventListener("resize", this.handleResize);
	},
	methods: {
		goCloset() {
			this.$router.push("/closet");
		},
		// imageClick(index) {
		// 	this.currentImageIndex = index;
		// 	this.fullImage = true;
		// },
		getPHP() {
			// 後で消そうね
			this.axios
				//これテスト用の私の服しか出てこないphpだからね
				.get("https://aoki.nkmr.io/api/get_bingo_aoki.php", {})
				.then((response) => {
					this.$store.commit("setBingo", { bingo: response.data });
					// console.log("ここ", this.$store.state.bingo);
				})
				.catch((error) => {
					console.log("err:", error);
				});

			this.axios
				.get("https://aoki.nkmr.io/api/get_cloth_aoki.php", {})
				.then((response) => {
					this.$store.commit("setCloth", { cloth: response.data });
					this.showBingo();
				})
				.catch((error) => {
					console.log("err:", error);
				});

			// this.axios
			// 	.get("https://aoki.nkmr.io/api/get_bingouser.php", {})
			// 	.then((response) => {
			// 		this.$store.commit("setUser", { user: response.data });
			// 	})
			// 	.catch((error) => {
			// 		console.log("err:", error);
			// 	});
			//ここまでで消す
		},
		magnify() {
			//画像拡大するよ
			this.selectingIndex = this.status
				.map((e, i) => {
					return e === "select" || e === "selectedCancel" || e === "bingoCancel"
						? i
						: -1;
				})
				.filter((e) => {
					return e !== -1;
				});
			console.log(this.selectingIndex);
			console.log(this.status);
			this.sheet = !this.sheet;
			this.status[this.selectingIndex] = "img";
			this.showBingo();
			this.CheckReachBingo();
		},
		showBingo() {
			this.checkDB();
			//ログインのユーザと一致するビンゴ集める
			// console.log("発火した？", this.$store.state.bingo);
			//ビンゴシートのそれぞれ要素見る
			this.$store.state.bingo.forEach((item) => {
				if (
					item.User_ID == this.$store.state.userid &&
					item.Week == this.showWeek
				) {
					this.bingo_cell.push(item);
				}
			});

			this.bingo_cell.forEach((item) => {
				// console.log(item.Position)
				if (item.Day !== null) {
					////////////this.selected[item.Position] = true;
					this.status[item.Position] = "selected";
					this.selectedDay[item.Position] = item.Day;
				}
				this.ImageSrc2[item.Position] =
					"https://aoki.nkmr.io/aoki_bingo_image/after/" +
					String(
						this.$store.state.cloth.filter((v) => v.ID === item.Cloth_ID)[0]
							.FilePath
					).trim();
			});

			this.CheckReachBingo();
		},
		toNext(n) {
			this.dialog = false;
			if (this.status[n - 1] == "select") {
				this.$set(this.status, n - 1, "img");
			} else if (this.status[n - 1] == "img") {
				this.$set(this.status, n - 1, "select");
			} else if (this.status[n - 1] == "reach") {
				this.$set(this.status, n - 1, "selectReach");
			} else if (this.status[n - 1] == "selectReach") {
				this.$set(this.status, n - 1, "reach");
			} else if (this.status[n - 1] == "selected") {
				this.$set(this.status, n - 1, "selectedCancel");
			} else if (this.status[n - 1] == "bingo") {
				this.$set(this.status, n - 1, "bingoCancel");
			} else if (this.status[n - 1] == "selectedCancel") {
				this.$set(this.status, n - 1, "selected");
			} else if (this.status[n - 1] == "bingoCancel") {
				this.$set(this.status, n - 1, "bingo");
			}
		},
		checkDay() {
			//曜日の計算と表示

			let getDay = new Date().getDay();
			//1を土曜日にする
			//if (getDay < 6) {
			//  this.changeStartDay = getDay + 2;
			//} else {
			//  this.changeStartDay = getDay - 5;
			//}
			//1を月曜日にする
			if (getDay == 0) {
				this.changeStartDay = 7;
			} else {
				this.changeStartDay = getDay;
			}
			this.whatToday = this.aryDay[this.changeStartDay];
		},
		checkDB() {
			this.axios
				.get("https://aoki.nkmr.io/api/get_bingo_aoki.php", {})
				.then((response) => {
					this.$store.commit("setBingo", { bingo: response.data });
				})
				.catch((error) => {
					console.log("err:", error);
				});
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
					// デモ版なので送らないよ〜
					// this.axios
					// 	.get("https://aoki.nkmr.io/api/update_bingo_test.php", {
					// 		params: {
					// 			Day: this.changeStartDay,
					// 			ID: this.bingo_cell[i].ID,
					// 		},
					// 	})
					// 	.then((response) => {
					// 		console.log("status:", response.status);

					// 		////////////this.$set(this.selected, i, true);
					// 		this.$set(this.selectedDay, i, this.changeStartDay);
					// 	})
					// 	.catch((error) => {
					// 		console.log("err:", error);
					// 	});
				}
				//console.log(i);
				//console.log(this.status[i]);
				//console.log(this.selected[i]);
			}
			//this.showBingo();
			this.CheckReachBingo();

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
					// デモ版なので送らないよ〜
					// this.axios
					// 	.get("https://aoki.nkmr.io/api/update_bingo.php", {
					// 		params: {
					// 			Day: null,
					// 			ID: this.bingo_cell[i].ID,
					// 		},
					// 	})
					// 	.then((response) => {
					// 		console.log("status:", response.status);
					// 		this.$set(this.status, i, "img");
					// 		////////////this.$set(this.selected, i, false);
					// 		this.$set(this.selectedDay, i, null);
					// 		console.log(this.status[i]);
					// 		console.log(this.selected[i]);
					// 	})
					// 	.catch((error) => {
					// 		console.log("err:", error);
					// 	});
				}
				console.log(i);
				console.log(this.status[i]);
			}
			///
			//データベースの更新が終わったら処理するのを入れたい！！！！
			///
			//this.showBingo();
			this.CheckReachBingo();

			console.log(this.status);
			console.log(this.selected);
		},
		changeWeek(n) {
			//押された週にいく
			//進行形のweekを取ってくるのは途中で挫折
			//this.checkDay();
			this.showWeek = n;

			// for (let i = 0; i < this.status.length; i++) {
			//   this.$set(this.status, i, "img");
			//   this.$set(this.selectedDay, i, null);
			// }

			// this.showBingo();
			// this.CheckReachBingo();
		},
		CheckReachBingo() {
			//ビンゴ・リーチの判定かく
			this.makeBingo = false;
			this.makeReach = false;
			this.makebingoCount = 0;
			this.makereachCount = 0;

			//一旦reachはimdタグに、bingoはselectedタグに戻す
			let bingoCount;
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] == "bingo") {
					this.$set(this.status, i, "selected");
				} else if (this.status[i] == "reach") {
					this.$set(this.status, i, "img");
				}
			}

			//横リーチ
			for (let i = 0; i < this.status.length; i = i + 5) {
				bingoCount = 0;
				for (let j = 0; j < 5; j++) {
					if (
						this.status[i + j] == "selected" ||
						this.status[i + j] == "bingo"
					) {
						bingoCount = bingoCount + 1;
					}
				}
				if (bingoCount == 5) {
					for (let j = 0; j < 5; j++) {
						this.$set(this.status, i + j, "bingo");
					}
					this.makeBingo = true;
					this.makebingoCount = this.makebingoCount + 1;
				} else if (bingoCount == 4) {
					for (let j = 0; j < 5; j++) {
						if (
							this.status[i + j] !== "selected" &&
							this.status[i] !== "bingo"
						) {
							this.$set(this.status, i + j, "reach");
						}
					}
					this.makeReach = true;
					this.makereachCount = this.makereachCount + 1;
				}
			}
			//縦リーチ
			for (let j = 0; j < 5; j++) {
				bingoCount = 0;
				for (let i = 0; i < this.status.length; i = i + 5) {
					if (
						this.status[i + j] == "selected" ||
						this.status[i + j] == "bingo"
					) {
						bingoCount = bingoCount + 1;
					}
				}
				if (bingoCount == 5) {
					for (let i = 0; i < this.status.length; i = i + 5) {
						this.$set(this.status, i + j, "bingo");
					}
					this.makeBingo = true;
					this.makebingoCount = this.makebingoCount + 1;
				} else if (bingoCount == 4) {
					for (let i = 0; i < this.status.length; i = i + 5) {
						if (
							this.status[i + j] !== "selected" &&
							this.status[i] !== "bingo"
						) {
							this.$set(this.status, i + j, "reach");
						}
					}
					this.makeReach = true;
					this.makereachCount = this.makereachCount + 1;
				}
			}
			//斜めリーチ
			bingoCount = 0;
			for (let i = 4; i < this.status.length - 1; i = i + 4) {
				if (this.status[i] == "selected" || this.status[i] == "bingo") {
					bingoCount = bingoCount + 1;
				}
			}
			if (bingoCount == 5) {
				for (let i = 4; i < this.status.length - 1; i = i + 4) {
					this.$set(this.status, i, "bingo");
				}
				this.makeBingo = true;
				this.makebingoCount = this.makebingoCount + 1;
			} else if (bingoCount == 4) {
				for (let i = 4; i < this.status.length - 1; i = i + 4) {
					if (this.status[i] !== "selected" && this.status[i] !== "bingo") {
						this.$set(this.status, i, "reach");
					}
				}
				this.makeReach = true;
				this.makereachCount = this.makereachCount + 1;
			}
			bingoCount = 0;
			for (let i = 0; i < this.status.length; i = i + 6) {
				if (this.status[i] == "selected" || this.status[i] == "bingo") {
					bingoCount = bingoCount + 1;
				}
			}
			if (bingoCount == 5) {
				for (let i = 0; i < this.status.length; i = i + 6) {
					this.$set(this.status, i, "bingo");
				}
				this.makeBingo = true;
				this.makebingoCount = this.makebingoCount + 1;
			} else if (bingoCount == 4) {
				for (let i = 0; i < this.status.length; i = i + 6) {
					if (this.status[i] !== "selected" && this.status[i] !== "bingo") {
						this.$set(this.status, i, "reach");
					}
				}
				this.makeReach = true;
				this.makereachCount = this.makereachCount + 1;
			}
			console.log(this.makeBingo);
		},
		randomChange() {
			for (let i = 0; i < this.user_cloth.length; i++) {
				if (this.status[i] == "select") {
					this.beforeChange = this.ImageSrc2[i];
					console.log(this.bingo_cell[i]);
					console.log("change");
					this.dialog = true;
					var min = 0;
					var max = this.user_cloth.length;

					for (let j = 0; j < this.user_cloth.length; j++) {
						if (this.user_cloth[j].ID == this.$store.state.bingo[i].Cloth_ID) {
							console.log(this.user_cloth[j]);
							var cloth_ID = this.user_cloth[j].ID;
							var cloth_item = this.user_cloth[j].Item;
							var cloth_season = this.user_cloth[j].Season;
						}
					}

					var ok = 1;
					while (ok > 0) {
						var a = Math.floor(Math.random() * (max + 1 - min)) + min;
						if (
							this.user_cloth[a].Item == cloth_item &&
							this.user_cloth[a].Season == cloth_season &&
							this.user_cloth[a].ID !== cloth_ID
						) {
							var out = 0;
							for (let m = 0; m < this.bingo_cell.length; m++) {
								if (this.bingo_cell[m].Cloth_ID == this.user_cloth[a].ID) {
									out = 1;
								}
							}
							if (out == 0) ok = 0;
						}
					}

					console.log(this.bingo_cell[i]);

					console.log(this.ImageSrc2[i]);

					console.log(
						"https://aoki.nkmr.io/aoki_bingo_image/after/" +
							String(this.user_cloth[a].FilePath)
					);
					this.ImageSrc2[i] =
						"https://aoki.nkmr.io/aoki_bingo_image/after/" +
						String(this.user_cloth[a].FilePath);
					console.log(this.ImageSrc2[i]);
					//console.log(this.bingo_cell[i].Cloth_ID);

					// this.axios
					// 	.get("https://aoki.nkmr.io/api/update_bingo_change_aoki.php", {
					// 		params: {
					// 			Cloth_ID: this.user_cloth[a].ID,
					// 			ID: this.bingo_cell[i].ID,
					// 		},
					// 	})
					// 	.then((response) => {
					// 		console.log("status:", response.status);

					// 		////////////this.$set(this.selected, i, true);
					// 		//this.$set(this.selectedDay, i, this.changeStartDay);
					// 	})
					// 	.catch((error) => {
					// 		console.log("err:", error);
					// 	});
					this.afterChange = this.ImageSrc2[i];

					console.log(this.beforeChange);
					console.log(this.afterChange);

					//select状態戻す
					this.status[i] = "img";
					this.CheckReachBingo();
				}
			}
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
/* .w-text {
	font-size: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
} */
.text {
	color: white;
	font-size: 200%;
	/* display: flex;
	justify-content: center; */
}
.Research {
	width: 100vw;
	height: 100vh;
}

.selected {
	filter: brightness(70%);
	background-color: rgb(200, 200, 200);
}
.bingo {
	filter: brightness(70%);
	background-color: rgb(200, 200, 200);
	outline: 4px solid #82b1ff;
	outline-offset: -4px;
}
.reach {
	outline: 4px solid #ff5252;
	background-color: rgb(200, 170, 170);
	outline-offset: -4px;
}
.selectedCancel {
	filter: brightness(70%);
	background-color: rgb(200, 200, 200);
	outline: 3px dashed black;
	outline-offset: -3px;
}
.bingoCancel {
	filter: brightness(70%);
	background-color: rgb(200, 200, 200);
	outline: 3px dashed black;
	outline-offset: -3px;
}
.select {
	outline: 3px dashed black;
	outline-offset: -3px;
}
.selectReach {
	outline: 3px dashed black;
	background-color: rgb(200, 170, 170);
	outline-offset: -3px;
}
.button_wrapper {
	text-align: center;
}
</style>
