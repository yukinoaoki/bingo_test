<template>
	<div class="Add">
		<div id="box">
			<v-card flat
				><v-card-title class="justify-center font-weight-regular"
					>服の追加</v-card-title
				><v-card-subtitle class="text-center"
					>※デモ版のため、服の追加はクローゼットに反映されません。</v-card-subtitle
				></v-card
			>
			<v-file-input
				multiple
				v-model="image"
				accept="image/*"
				color="purple lighten-3"
				@change="getFileName"
				label="File input"
				class="px-5"
			>
				<!-- <v-row justify="center"> -->
				<!-- <div v-for="(p, index) in p" :key="index" class="d-flex child-flex"> -->
				<!-- 押されたらtoNextを実行 -->
				<!-- <v-card
							flat
							tile
							class="d-flex"
							:width="wWidth / 5"
							:height="wWidth / 5"
							:max-height="wWidth / 5"
							:max-width="wWidth / 5"
						> -->
				<!-- <v-img contain :src="p"></v-img> -->
				<!-- </v-card> -->
				<!-- </div> -->
				<!-- </v-row> -->
			</v-file-input>
			<v-row justify="center" class="d-flex"
				><div
					v-for="(image, index) in p"
					:key="index"
					class="d-flex child-flex"
				>
					<v-card
						flat
						tile
						class="d-flex"
						:width="wWidth / 3"
						:height="wWidth / 3"
						:max-height="wWidth / 3"
						:max-width="wWidth / 3"
						><v-img :src="image" class="image-vw"
					/></v-card></div
			></v-row>
		</div>
		<div class="text-center">
			<v-container class="d-flex justify-content-center">
				<v-row justify="center" class="d-flex">
					<v-radio-group v-model="radioGroup">
						<v-btn-toggle
							class="justify-center"
							v-model="radioGroup"
							tile
							color="deep-purple accent-5"
							group
							><v-btn key="1" value="T"> Tops </v-btn>
							<v-btn key="2" value="B"> Bottoms </v-btn>
							<v-btn key="3" value="A"> All in one </v-btn></v-btn-toggle
						>
					</v-radio-group>
				</v-row> </v-container
			><v-container class="d-flex justify-content-center px-5">
				<v-row justify="center" class="d-flex">
					<v-col cols="3">
						<v-checkbox
							v-model="checkSpring"
							color="pink"
							label="Spring"
						></v-checkbox>
					</v-col>
					<v-col cols="3">
						<v-checkbox
							v-model="checkSummer"
							color="primary"
							label="Summer"
						></v-checkbox>
					</v-col>
					<v-col cols="3">
						<v-checkbox
							v-model="checkAutumn"
							color="orange darken-3"
							label="Autumn"
						></v-checkbox>
					</v-col>
					<v-col cols="3">
						<v-checkbox
							v-model="checkWinter"
							color="indigo darken-3"
							label="Winter"
						></v-checkbox>
					</v-col>
				</v-row>
			</v-container>
			<!-- <v-btn outlined rounded color="blue-grey" text @click="post()"
				><span class="ma-2">add</span></v-btn
			> -->
			<v-dialog transition="dialog-bottom-transition" max-width="600">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="purple lighten-3"
						v-bind="attrs"
						v-on="on"
						class="ma-2 white--text"
						rounded
						@click="post()"
						><v-icon class="ma-1">mdi-cloud-upload-outline</v-icon>登録</v-btn
					>
				</template>
				<template v-slot="dialog">
					<v-card>
						<div class="text-center">
							<v-card-title class="text-h5 justify-center"
								><v-avatar><v-icon>mdi-cloud-upload-outline</v-icon></v-avatar>
								登録しました</v-card-title
							>
							<v-card-actions class="justify-center">
								<v-btn text @click="dialog.value = false">Close</v-btn>
							</v-card-actions>
						</div>
					</v-card>
				</template>
			</v-dialog>
			<div>
				<v-btn class="my-10" text @click="goCloset">クローゼットに戻る</v-btn>
			</div>
			<!-- <v-sheet v-model="done" height="50" outlined rounded shaped width="73">
				<v-btn outlined rounded color="blue-grey" text @click="post()"
					><span class="ma-2">add</span></v-btn
				>
				<v-alert border="left" elevation="7" type="success"></v-alert>
			</v-sheet> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// image: [],
			wWidth: window.innerWidth, //ウィンドウさいず
			wHeight: window.innerWidth,
			checkSpring: false,
			checkSummer: false,
			checkAutumn: false,
			checkWinter: false,
			radioGroup: 1,
			// message: "Try Preview!",
			// url: "",
			image: [],
			user: 0,
			FilePath: [],
			urlImages: [],
			p: [],
			uploadFiles: [],
			dialog: false,
		};
	},
	computed: {
		// url() {
		// 	if (this.image === null) {
		// 		return;
		// 	} else {
		// 		// for (let n = 0; n < this.image.length; n++) {
		// 		// URL.createObjectURL(this.image[0]);
		// 		// }
		// 		console.log("クリエイトurl", URL.createObjectURL(this.image[1]));
		// 		// this.p[0] = URL.createObjectURL(this.image[1]);
		// 		// this.pp[1] = URL.createObjectURL(this.image[2]);
		// 		return URL.createObjectURL(this.image);
		// 	}
		// },
	},

	methods: {
		goCloset() {
			this.$router.push("/closet");
		},
		getFileName(e) {
			this.p = [];
			this.FilePath = [];
			// console.log("fileが選択されました。");
			console.log("ファイル情報", e);
			// e.preventDefault();
			// let files = e.target.files;
			// console.log(e.target)
			this.uploadFiles = e[0];
			console.log("uploadfileには", this.uploadFiles);
			console.log(e.length);
			this.image = [];

			for (let n = 0; n < e.length; n++) {
				this.image.push(e[n]);
				// 	// 	//this.urlImages.push(URL.createObjectURL(e[n]));
				// 	// this.files.push(e[n]);
				this.p.push(URL.createObjectURL(e[n]));
				this.FilePath.push(e[n].name);
				console.log("クリエイト何ちゃら", e[n].name);
				// 	// console.log("イメージって何", this.image);
				// }
				// let files = e.target.files;
				// this.uploadFile = files;
				// console.log("ファイルパス：", this.FilePath);
				// for (let n = 0; n < e.length; n++) {
				// 	this.p.push(URL.createObjectURL(e[n]));
				// 	// this.pp =URL.createObjectURL(e[2]);
				// 	console.log(this.p);
			}
		},
		post() {
			this.dialog = true;
			var e = 0;
			var f = 0;
			var g = 0;
			var h = 0;
			if (this.checkSpring) e = 1;
			if (this.checkSummer) f = 1;
			if (this.checkAutumn) g = 1;
			if (this.checkWinter) h = 1;
			console.log("送るよ");
			console.log(this.user);
			// console.log(this.FilePath);
			console.log(this.radioGroup);
			console.log("Spring:", e);
			console.log("Summer:", f);
			console.log("Autumn:", g);
			console.log("Winter:", h);
			// デモ版なので送信の部分は消しとく
			for (let n = 0; n < this.image.length; n++) {
				// for (let n = 1; n < 282; n++) {
				this.axios
					.get("https://aoki.nkmr.io/api/add_cloth.php", {
						params: {
							//ID: a,
							User_ID: this.user,
							FilePath: this.FilePath[n],
							// FilePath: n,
							// Item: this.radioGroup,
							Item: 2,
							Spring: e,
							Summer: f,
							Autumn: g,
							Winter: h,
							// images: this.image[n],
						},
					})
					.then((response) => {
						console.log("status:", response.status);
						this.done = true;
						this.p = [];
						this.FilePath = [];
					})
					.catch((error) => {
						console.log("err:", error);
					});
			}

			// this.submitFiles();
		},
		// doPasteActions(event) {
		// 	event.preventDefault();
		// 	if (event.clipboardData.types[0] === "Files") {
		// 		const imageFile = event.clipboardData.items[0].getAsFile();

		// 		const fd = new FormData();
		// 		fd.append("image", imageFile);

		// 		this.axios
		// 			.post("https://aoki.nkmr.io/api/bingo_pic_upload.php", fd)
		// 			.then((response) => {
		// 				console.log("status:", response.status);
		// 			})
		// 			.catch((error) => {
		// 				console.log("err:", error);
		// 			});

		// 		// const { data } = await axios.post('自分のURL', fd)
		// 		// const imgUrl = data.url
		// 	}
		// },
		submitFiles() {
			// let formData = new FormData();
			// for (var i = 0; i < this.image.length; i++) {
			// 	// this.file = this.image[i];
			// 	// // console.log(this.file);
			// }
			// formData.append("img", this.uploadFiles);
			// this.axios
			// 	.get("https://aoki.nkmr.io/api/bingo_pic_upload.php", formData)
			// 	.then((response) => {
			// 		console.log("サーバ青くる方だ、status:", response.status);
			// 	})
			// 	.catch((error) => {
			// 		console.log("err:", error);
			// 	});
			// let config = {
			// 	headers: {
			// 		"content-type": "multipart/form-data",
			// 	},
			// };
			// console.log("ここ見てみてformDataは", formData);
			// for (let n = 0; n < this.image.length; n++) {
			// 	this.axios
			// 		.get("https://aoki.nkmr.io/api/bingo_pic_upload.php", {
			// 			params: {
			// 				createURL: this.p[n],
			// 				imgPath: this.FilePath[n],
			// 			},
			// 		})
			// 		.then((response) => {
			// 			console.log("status:", response.status);
			// 		})
			// 		.catch((error) => {
			// 			console.log("err:", error);
			// 		});
			// }
			// this.axios
			// 	.post("https://aoki.nkmr.io/api/bingo_pic_upload.php", formData, config)
			// 	.then((response) => {
			// 		console.log("できたよstatus:", response.status);
			// 	})
			// 	.catch((error) => {
			// 		console.log("ここの？err:", error);
			// 	});
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

<style>
.image-vw {
	width: 70vw;
}

#box input {
	float: left;
	clear: both;
	padding: 15px;
}

#box > div#preview-item1 {
	width: 150px;
	float: left;
	clear: both;
}

#box > div img {
	width: 100%;
	border: 1px solid #000;
}
</style>
