<template>
	<div id="app">
		<v-app-bar>
			<!-- <v-btn text to="/">HOME</v-btn> -->
			<img src="https://aoki.nkmr.io/images/図1.png" :height="wHeight / 20" />
			<v-spacer></v-spacer>デモ版<v-spacer></v-spacer>
			<p class="white--text font-weight-bold ma-2" justify="center">
				{{ $store.state.user.displayName }}
			</p>
			<v-avatar size="36" @click="doLogout()">
				<v-img :src="user.photoURL" contain></v-img>
			</v-avatar>
			<div v-show="user.uid" key="login"></div>
			<!-- 未ログイン時にはログインボタンを表示 -->
			<div v-show="!user.uid" key="logout">
				<v-btn text @click="doLogin"><span class="mr-2">ログイン</span></v-btn>
			</div>
		</v-app-bar>
		<v-app>
			<v-main>
				<router-view />
			</v-main>
		</v-app>
	</div>
</template>

<script>
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
export default {
	name: "App",
	data() {
		return {
			user: [],
			wWidth: window.innerWidth, //ウィンドウさいず
			wHeight: window.innerWidth,
		};
	},
	created() {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			this.$store.commit("setUser", { user: user ? user : {} });
			this.user = user ? user : {};
		});
	},
	methods: {
		// ログイン処理
		doLogin() {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();
			signInWithPopup(auth, provider)
				.then((result) => {
					console.log(result);
					this.$store.commit("setUser", {
						user: result.user ? result.user : {},
					});
				})
				.catch((error) => {
					console.error(error);
				});
		},
		// ログアウト処理
		doLogout() {
			const auth = getAuth();
			signOut(auth)
				.then(() => {
					// Sign-out successful.
					alert("サインアウトしました。");
				})
				.catch((error) => {
					// An error happened.
					console.error(error);
				});
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
