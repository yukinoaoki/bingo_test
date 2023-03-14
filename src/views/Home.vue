<template>
	<div class="home">
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto my-7" max-width="700" outlined>
					<h1>ログインnn</h1>
					<div class="pt-5">
						<strong><h3 class="pb-3">ユーザ名</h3></strong>
						<v-text-field outlined v-model="userName"></v-text-field>
						<strong><h3 class="pb-3">パスワード</h3></strong>
						<v-text-field
							outlined
							v-model="pass"
							type="password"
						></v-text-field>

						<v-btn @click="login()">ログイン</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
// @ is an alias to /src
export default {
	name: "Home",
	data() {
		return {
			userName: "",
			pass: "",
		};
	},
	created() {
		this.axios
			.get("https://aoki.nkmr.io/api/get_bingo.php", {})
			.then((response) => {
				this.$store.commit("setBingo", { bingo: response.data });
			})
			.catch((error) => {
				console.log("err:", error);
			});
		this.axios
			.get("https://aoki.nkmr.io/api/get_cloth.php", {})
			.then((response) => {
				this.$store.commit("setCloth", { cloth: response.data });
			})
			.catch((error) => {
				console.log("err:", error);
			});
		this.axios
			.get("https://aoki.nkmr.io/api/get_bingouser.php", {})
			.then((response) => {
				this.$store.commit("setUser", { user: response.data });
			})
			.catch((error) => {
				console.log("err:", error);
			});
	},
	methods: {
		login() {
			const target = this.$store.state.user.find(
				(v) => v.Name === this.userName
			);
			console.log(this.$store.state.user);
			if (target.password === this.pass) {
				this.$store.commit("setUser", { userid: target.ID });
				this.$router.push("/bingocard");
			} else {
				alert("パスワードが違います");
			}
			if (target == undefined) {
				alert("ユーザが存在しません");
			}
		},
	},
};
</script>
