const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			privateData: "",
			loginRes: [],
			newUserRes: ''



		},
		actions: {
			getToken: async (loginObj) => {
				try {
					const store = getStore()
					setStore({ store: store.loginRes = [] })
					await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: { "Content-type": "application/json" },
						body: JSON.stringify(loginObj)
					})
						.then((res) => res.json())
						.then((json) => {
							if (json.access_token) {
								localStorage.setItem("access_token", json.access_token)
								let res = json.status

								store.loginRes.push(res)
								store.loginRes.push(true)
								setStore({ res: store.loginRes })


							} else {
								setStore({ store: store.loginRes = ["fail"] })
							}

						})

				} catch (error) {
					console.log("getToken function error==", error)

				}

			},
			createNewUser: async (newUser) => {
				try {
					const store = getStore()
					setStore({ store: store.newUserRes = "" })
					await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},

						body: JSON.stringify(newUser)
					})
						.then((res) => res.json())
						.then((json) => setStore({ ...store, newUserRes: json.msg }))



				} catch (error) {
					console.log("getToken function error==", error)
				}

			},

			privateViewRequest: async () => {
				if (localStorage.access_token) {
					const store = getStore()
					await fetch(process.env.BACKEND_URL + "/api/private", {

						headers: {
							Authorization: `Bearer ${localStorage.access_token}`
						}
					})
						.then((res) => {
							if (res.status == 200) {
								return res.json()
							} else {
								throw Error(res.statusText)
							}
						})
						.then((json) => store.privateData = json)
					setStore({ store: store.privateData })
					setStore({ store: store.loginRes = [true] })

				}

			},
			clearPrivateData: () => {
				const store = getStore()
				setStore({ store: store.privateData = "" })
				location.reload(true)
			}

		}
	};
};

export default getState;

