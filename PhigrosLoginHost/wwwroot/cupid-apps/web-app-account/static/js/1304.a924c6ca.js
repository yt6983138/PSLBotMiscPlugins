(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[1304],
	{
		90902: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return r;
				},
			});
			n(5192), n(28469), n(92094), n(29161), n(95661), n(9079), n(20599);
			var o = n(2258),
				i = n.n(o),
				a = {
					name: "TapQrcode",
					props: {
						content: { type: String, required: !0 },
						size: { type: Number, default: 180 },
						colorDark: { type: String, default: "#000000" },
						colorLight: { type: String, default: "#ffffff" },
						correctLevel: { type: Number, default: 3 },
						margin: { type: Number, default: 0 },
						renderAs: {
							type: String,
							default: "canvas",
							validator: function (e) {
								return ["canvas", "svg"].includes(e);
							},
						},
						imageSettings: {
							type: Object,
							default: function () {
								return null;
							},
						},
					},
					data: function () {
						return { qrcode: null };
					},
					watch: {
						content: {
							handler: function (e) {
								e && this.generateQRCode();
							},
							immediate: !0,
						},
						size: function () {
							this.generateQRCode();
						},
						colorDark: function () {
							this.generateQRCode();
						},
						colorLight: function () {
							this.generateQRCode();
						},
						correctLevel: function () {
							this.generateQRCode();
						},
						margin: function () {
							this.generateQRCode();
						},
						renderAs: function () {
							this.generateQRCode();
						},
						imageSettings: {
							handler: function () {
								this.generateQRCode();
							},
							deep: !0,
						},
					},
					mounted: function () {
						this.generateQRCode();
					},
					beforeDestroy: function () {
						this.qrcode && (this.qrcode = null);
					},
					methods: {
						generateQRCode: function () {
							var e = this;
							if (this.content && this.$refs.qrcodeContainer) {
								this.qrcode &&
									((this.$refs.qrcodeContainer.innerHTML =
										""),
									(this.qrcode = null));
								var t = {
									text: this.content,
									width: this.size,
									height: this.size,
									colorDark: this.colorDark,
									colorLight: this.colorLight,
									correctLevel: this.getCorrectLevel(),
									margin: this.margin,
									render: this.renderAs,
								};
								this.imageSettings &&
									((t.logo = this.imageSettings.src),
									(t.logoWidth = this.imageSettings.width),
									(t.logoHeight = this.imageSettings.height),
									(t.logoBackgroundColor =
										this.imageSettings.bgColor),
									(t.logoBackgroundTransparent =
										this.imageSettings.bgTransparent)),
									(this.qrcode = new (i())(
										this.$refs.qrcodeContainer,
										t
									)),
									this.$nextTick(function () {
										e.$refs.qrcodeContainer &&
											(e.$refs.qrcodeContainer.removeAttribute(
												"title"
											),
											e.$refs.qrcodeContainer
												.querySelectorAll("*")
												.forEach(function (e) {
													e.removeAttribute("title");
												}));
									});
							}
						},
						getCorrectLevel: function () {
							switch (this.correctLevel) {
								case 0:
									return i().CorrectLevel.L;
								case 1:
									return i().CorrectLevel.M;
								case 2:
									return i().CorrectLevel.Q;
								default:
									return i().CorrectLevel.H;
							}
						},
					},
				},
				r =
					(n(3257),
					(0, n(39563).Z)(
						a,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{
									staticClass: "tap-qrcode",
									style: {
										width: e.size + "px",
										height: e.size + "px",
									},
								},
								[
									n("div", {
										ref: "qrcodeContainer",
										staticClass: "tap-qrcode__container",
									}),
								]
							);
						},
						[],
						!1,
						null,
						"14605832",
						null
					).exports);
		},
		10170: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return i;
				},
			});
			n(33815), n(16724);
			var o = {
					name: "GlobalTab",
					mixins: [n(64286).Z],
					methods: {
						handleTabClick: function (e) {
							e !== this.activeTab &&
								(this.$emit("tabChange", e),
								this.$router.replace({
									path: this.$route.path,
									query: { type: e },
								}));
						},
					},
				},
				i =
					(n(66768),
					(0, n(39563).Z)(
						o,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{ staticClass: "global-tab--wrapper" },
								e._l(Object.keys(e.tabConfig), function (t) {
									return n(
										"div",
										{
											key: e.tabConfig[t].key,
											staticClass:
												"global-tab--tab-item font-bold flex-1",
											class: {
												active:
													e.activeTab ===
													e.tabConfig[t].key,
											},
											on: {
												click: function (n) {
													return e.handleTabClick(
														e.tabConfig[t].key
													);
												},
											},
										},
										[
											e._v(
												" " +
													e._s(
														e.$t(
															e.tabConfig[t]
																.textKey
														)
													) +
													" "
											),
										]
									);
								}),
								0
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports);
		},
		50310: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return s;
				},
			});
			var o = n(43659),
				i = (n(33815), n(39958), n(95085)),
				a = n(36428),
				r = {
					name: "GlobalEmailInput",
					data: function () {
						return { emailValue: "" };
					},
					computed: (0, o.Z)(
						{},
						(0, a.rn)([
							"isMobileLandscape",
							"mediaQueryMatchMobile",
						])
					),
					watch: {
						emailValue: function (e) {
							this.$emit("handleEmailChange", {
								value: e,
								validation: i.rt.test(e),
							});
						},
					},
					created: function () {},
					mounted: function () {},
					methods: {
						handleClearInput: function () {
							this.emailValue = "";
						},
						handleInputEnter: function () {
							this.$emit("handleInputSubmit");
						},
					},
				},
				l =
					(n(17211),
					(0, n(39563).Z)(
						r,
						function () {
							var e = this,
								t = e.$createElement;
							return (e._self._c || t)("tap-input", {
								class: [
									"global-email-input__input",
									"global-login-input",
									{
										"global-login-input--mobile":
											e.mediaQueryMatchMobile ||
											e.isMobileLandscape,
									},
								],
								attrs: {
									theme: "row",
									placeholder: e.$t(
										"global_email_placeholder"
									),
									icon: e.emailValue
										? "ico-m20-w20-clearinput"
										: null,
									"icon-click": e.emailValue
										? e.handleClearInput
										: null,
									type: "email",
									autofocus: "",
								},
								on: {
									keydown: function (t) {
										return !t.type.indexOf("key") &&
											e._k(
												t.keyCode,
												"enter",
												13,
												t.key,
												"Enter"
											)
											? null
											: e.handleInputEnter.apply(
													null,
													arguments
											  );
									},
								},
								model: {
									value: e.emailValue,
									callback: function (t) {
										e.emailValue = t;
									},
									expression: "emailValue",
								},
							});
						},
						[],
						!1,
						null,
						null,
						null
					)),
				s = l.exports;
		},
		7453: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return l;
				},
			});
			var o = n(43659),
				i = n(36428),
				a = {
					name: "GlobalPasswordInput",
					props: {
						theme: { type: String, default: "row" },
						placeholder: { type: String, default: "" },
					},
					data: function () {
						return { passwordValue: "", showPassword: !1 };
					},
					computed: (0, o.Z)(
						{},
						(0, i.rn)([
							"isMobileLandscape",
							"mediaQueryMatchMobile",
						])
					),
					watch: {
						passwordValue: function (e) {
							this.$emit("handlePasswordChange", e);
						},
					},
					created: function () {},
					mounted: function () {},
					methods: {
						handleClearInput: function () {
							this.passwordValue = "";
						},
						handleTogglePassword: function () {
							this.showPassword = !this.showPassword;
						},
						handleInputEnter: function () {
							this.$emit("handleInputSubmit");
						},
					},
				},
				r =
					(n(83272),
					(0, n(39563).Z)(
						a,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n("tap-input", {
								class: [
									"global-password-input__input global-login-input",
									"base" === e.theme
										? "global-password-input__input--base"
										: "",
									{
										"global-login-input--mobile":
											e.isMobileLandscape ||
											e.mediaQueryMatchMobile,
									},
								],
								attrs: {
									theme: e.theme,
									placeholder:
										e.placeholder ||
										e.$t("global_password_placeholder"),
									"input-type": "password",
									type: e.showPassword ? "text" : "password",
									icon: e.showPassword
										? "ico-m20-w20-visible"
										: "ico-m20-w20-invisible",
									"icon-click": e.handleTogglePassword,
									"max-length": 20,
								},
								on: {
									keydown: function (t) {
										return !t.type.indexOf("key") &&
											e._k(
												t.keyCode,
												"enter",
												13,
												t.key,
												"Enter"
											)
											? null
											: e.handleInputEnter.apply(
													null,
													arguments
											  );
									},
								},
								scopedSlots: e._u([
									{
										key: "input-right",
										fn: function () {
											return [
												"base" === e.theme
													? n("icon", {
															staticClass:
																"row-input--icon",
															attrs: {
																icon: e.showPassword
																	? "ico-m20-w20-visible"
																	: "ico-m20-w20-invisible",
															},
															nativeOn: {
																click: function (
																	t
																) {
																	return (
																		t.preventDefault(),
																		e.handleTogglePassword.apply(
																			null,
																			arguments
																		)
																	);
																},
															},
													  })
													: e._e(),
											];
										},
										proxy: !0,
									},
								]),
								model: {
									value: e.passwordValue,
									callback: function (t) {
										e.passwordValue = t;
									},
									expression: "passwordValue",
								},
							});
						},
						[],
						!1,
						null,
						null,
						null
					)),
				l = r.exports;
		},
		46775: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return c;
				},
			});
			var o = n(43659),
				i = (n(33815), n(16724), n(75432)),
				a = n(36558),
				r = n(36428),
				l = {
					name: "GlobalPhoneInput",
					components: { PhoneRegionSelection: i.Z },
					props: {},
					data: function () {
						return {
							phoneValue: "",
							currentRegionCode: "",
							isIntl: (0, a.DI)(),
						};
					},
					computed: (0, o.Z)(
						{},
						(0, r.rn)([
							"isMobileLandscape",
							"mediaQueryMatchMobile",
						])
					),
					watch: {
						phoneValue: function (e) {
							this.$emit("handlePhoneChange", {
								value: e,
								regionCode: this.currentRegionCode,
							});
						},
					},
					created: function () {},
					mounted: function () {},
					methods: {
						changeRegionCode: function (e) {
							this.currentRegionCode = e;
						},
						handleInputEnter: function () {
							this.$emit("handleInputSubmit");
						},
						handleInputting: function () {
							this.phoneValue = this.phoneValue.replace(
								/[^\d]/g,
								""
							);
						},
					},
				},
				s =
					(n(5715),
					(0, n(39563).Z)(
						l,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{
									class: [
										"global-phone-input--wrapper",
										{
											"global-phone-input--wrapper--mobile":
												e.mediaQueryMatchMobile ||
												e.isMobileLandscape,
										},
									],
								},
								[
									n("phone-region-selection", {
										on: {
											selectRegionCode:
												e.changeRegionCode,
										},
										scopedSlots: e._u([
											{
												key: "selection",
												fn: function (t) {
													return [
														n(
															"div",
															{
																staticClass:
																	"global-phone-input--selection-wrapper",
															},
															[
																n(
																	"tap-text",
																	{
																		class: e.isIntl
																			? "global-phone-input__select-text"
																			: "heading-m14-w16 primary-black",
																		attrs: {
																			tag: "span",
																		},
																	},
																	[
																		e._v(
																			" " +
																				e._s(
																					t.currentRegion
																				) +
																				" +" +
																				e._s(
																					t.currentRegionCode
																				) +
																				" "
																		),
																	]
																),
																n("icon", {
																	attrs: {
																		icon: "ico-m12-w12-dropdown",
																		"class-name":
																			"global-phone-input--selection-icon primary-black",
																	},
																}),
															],
															1
														),
													];
												},
											},
										]),
									}),
									n("input", {
										directives: [
											{
												name: "model",
												rawName: "v-model",
												value: e.phoneValue,
												expression: "phoneValue",
											},
										],
										staticClass:
											"global-phone-input--input flex-1",
										class: e.isIntl
											? "body-16"
											: "heading-m14-w16 primary-black",
										attrs: {
											type: "tel",
											placeholder: e.$t(
												"global_phone_placeholder"
											),
										},
										domProps: { value: e.phoneValue },
										on: {
											keydown: function (t) {
												return !t.type.indexOf("key") &&
													e._k(
														t.keyCode,
														"enter",
														13,
														t.key,
														"Enter"
													)
													? null
													: e.handleInputEnter.apply(
															null,
															arguments
													  );
											},
											input: [
												function (t) {
													t.target.composing ||
														(e.phoneValue =
															t.target.value);
												},
												e.handleInputting,
											],
										},
									}),
								],
								1
							);
						},
						[],
						!1,
						null,
						null,
						null
					)),
				c = s.exports;
		},
		57091: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return r;
				},
			});
			var o = n(43659),
				i = (n(5192), n(39879), n(74840), n(36428)),
				a = {
					name: "TapCheckbox",
					components: { TapIcon: n(20187).Z },
					props: {
						disabled: { default: !1, type: Boolean },
						selected: { default: !1, type: Boolean },
						size: { default: 22, type: Number },
						icon: {
							default: "ico-m16-w18-checkmark",
							type: String,
						},
					},
					data: function () {
						return { isFill: this.selected };
					},
					computed: (0, o.Z)(
						(0, o.Z)({}, (0, i.rn)(["isTouchscreen", "isIntl"])),
						{},
						{
							isSelect: function () {
								return this.selected;
							},
							checkBoxClass: function () {
								var e = this.disabled,
									t = this.selected;
								return [
									{
										"tap-checkbox--unselected-disabled":
											e && !t,
										"tap-checkbox--selected-disabled":
											e && t,
									},
								];
							},
							checkBoxStyle: function () {
								var e = this.size + 3;
								return { width: e + "px", height: e + "px" };
							},
							checkBoxCenterStyle: function () {
								var e = this.size - 8;
								return {
									fontSize: e + "px",
									width: e + "px",
									height: e + "px",
								};
							},
						}
					),
					methods: {
						selectItem: function () {
							this.disabled ||
								((this.isFill = !this.isFill),
								this.$emit("selectCheckbox", this.isFill));
						},
					},
				},
				r =
					(n(5379),
					(0, n(39563).Z)(
						a,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{
									class: [
										"tap-checkbox flex-center",
										{
											"tap-checkbox--intl": e.isIntl,
											"tap-checkbox--hover":
												!e.isTouchscreen && !e.disabled,
										},
									],
									on: { click: e.selectItem },
								},
								[
									e.isSelect
										? n("tap-icon", {
												staticClass:
													"tap-check-box__icon tap-checkbox__select",
												attrs: {
													icon: "check-box-filled",
												},
										  })
										: n("tap-icon", {
												staticClass:
													"tap-check-box__icon tap-checkbox__select un-check",
												attrs: { icon: "check-box" },
										  }),
								],
								1
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports);
		},
		96688: function (e, t, n) {
			"use strict";
			n.r(t),
				n.d(t, {
					default: function () {
						return j;
					},
				});
			var o = n(43659),
				i = n(36428),
				a = n(59685),
				r = n(49345),
				l = n(10170),
				s = n(64286),
				c = n(1319),
				d = n(70800),
				u = (n(9864), n(50310)),
				p = n(7453),
				h = n(30237),
				g = n(63684),
				f = n(53923),
				m = n(29824),
				b = n(50225),
				_ = n(24151),
				w = n(51328),
				v = n(16559),
				x = n(82712),
				y = {
					name: "LoginViaEmail",
					components: {
						GlobalErrorTip: g.Z,
						GlobalNext: h.Z,
						GlobalPasswordInput: p.Z,
						GlobalEmailInput: u.Z,
					},
					mixins: [f.Z, m.Z, _.Z],
					inject: ["getPreInputValue"],
					mounted: function () {
						var e = this.getPreInputValue().email;
						e &&
							this.$refs.emailInput &&
							(this.$refs.emailInput.emailValue = e);
					},
					methods: {
						handleNoPasswordLogin: function () {
							this.$router.push({
								name: "LoginWithoutPassword",
								params: { preInputEmailValue: this.emailValue },
							});
						},
						handleLogin: function () {
							var e = this;
							(0, b.np)({
								email_address: this.emailValue,
								password: this.passwordValue,
							}).then(
								(function () {
									var t = (0, d.Z)(
										(0, c.Z)().mark(function t(n) {
											return (0, c.Z)().wrap(function (
												t
											) {
												for (;;)
													switch ((t.prev = t.next)) {
														case 0:
															return (
																(t.next = 2),
																e.$store.dispatch(
																	"getUserProfile"
																)
															);
														case 2:
															e.handleResult(n),
																(0, w.I)({
																	customParam:
																		{
																			action: "loginSuccess",
																			object_type:
																				"email",
																		},
																	boothInfo:
																		(0,
																		v.iG)(
																			e.$el
																		),
																}),
																(0, x.ZP)({
																	object_type:
																		"email",
																	action: "loginSuccess",
																});
														case 5:
														case "end":
															return t.stop();
													}
											},
											t);
										})
									);
									return function (e) {
										return t.apply(this, arguments);
									};
								})(),
								function (t) {
									(e.showErrorTip = !0),
										e.handleErrorTip(t),
										(0, w.I)({
											customParam: {
												action: "loginFailed",
												object_type: "email",
											},
											boothInfo: (0, v.iG)(e.$el),
										});
								}
							);
						},
						handlePasswordSubmit: function () {
							this.validEmail && this.handleLogin();
						},
					},
				},
				C = y,
				I = (n(6441), n(39563)),
				k = (0, I.Z)(
					C,
					function () {
						var e = this,
							t = e.$createElement,
							n = e._self._c || t;
						return n(
							"div",
							{
								staticClass: "global-login--email-wrapper",
								attrs: { "data-booth-item": "" },
							},
							[
								n("global-email-input", {
									ref: "emailInput",
									on: {
										handleEmailChange: e.handleEmailChange,
									},
								}),
								n("global-password-input", {
									on: {
										handlePasswordChange:
											e.handlePasswordChange,
										handleInputSubmit:
											e.handlePasswordSubmit,
									},
								}),
								n(
									"div",
									{
										staticClass:
											"global-login--button-area",
									},
									[
										n(
											"div",
											{
												staticClass:
													"global-login--tip",
											},
											[
												e.showErrorTip
													? n("global-error-tip", {
															attrs: {
																"error-text":
																	e.errorTip,
															},
													  })
													: e._e(),
											],
											1
										),
										n(
											"tap-router",
											{
												directives: [
													{
														name: "tracker",
														rawName: "v-tracker",
														value: {
															type: ["click"],
															terms: {
																object_type:
																	"label",
																object_id:
																	"forgot_psw",
																ctx: {
																	location:
																		"email",
																},
															},
														},
														expression:
															"{\n        type: ['click'],\n        terms: {\n          object_type: 'label',\n          object_id: 'forgot_psw',\n          ctx: {\n            location: 'email',\n          },\n        },\n      }",
													},
												],
												staticClass:
													"global-login--forgot green-primary heading-12 font-bold",
												attrs: {
													to: {
														name: "ResetPassword",
														params: {
															preInputEmailValue:
																e.emailValue,
														},
													},
												},
											},
											[
												e._v(
													" " +
														e._s(
															e.$t(
																"global_forgot_password_hint"
															)
														) +
														" "
												),
											]
										),
									],
									1
								),
								n(
									"div",
									{ staticClass: "global-login--footer" },
									[
										n(
											"tap-text",
											{
												directives: [
													{
														name: "tracker",
														rawName: "v-tracker",
														value: {
															type: ["click"],
															terms: {
																object_type:
																	"label",
																object_id:
																	"login_without_psw",
																ctx: {
																	location:
																		"email",
																},
															},
														},
														expression:
															"{\n        type: ['click'],\n        terms: {\n          object_type: 'label',\n          object_id: 'login_without_psw',\n          ctx: {\n            location: 'email',\n          },\n        },\n      }",
													},
												],
												staticClass:
													"body-12 global-login--footer__click",
												attrs: { line: 1 },
												nativeOn: {
													click: function (t) {
														return e.handleNoPasswordLogin.apply(
															null,
															arguments
														);
													},
												},
											},
											[
												e._v(
													" " +
														e._s(
															e.$t(
																"global_log_in_without_password"
															)
														) +
														" "
												),
											]
										),
										n("global-next", {
											staticClass:
												"global-login--email-next",
											attrs: {
												"need-track": "",
												"next-id": "login_in",
												"next-location": "email",
												offset: 20,
												"is-valid":
													e.validEmail &&
													!!e.passwordValue,
												"btn-text":
													e.$t("global_log_in"),
											},
											on: { handleClick: e.handleLogin },
										}),
									],
									1
								),
							],
							1
						);
					},
					[],
					!1,
					null,
					null,
					null
				),
				z = k.exports,
				$ = (n(83454), n(46775)),
				Z = n(39509),
				S = n(9261),
				P = n(32122),
				T = n(69241),
				E = n(25602),
				L = {
					name: "LoginViaPhone",
					components: {
						RedeemCode: P.Z,
						GlobalErrorTip: g.Z,
						GlobalNext: h.Z,
						GlobalPhoneInput: $.Z,
					},
					mixins: [Z.Z, _.Z, T.Z],
					data: function () {
						return { showErrorTip: !1 };
					},
					computed: (0, o.Z)(
						(0, o.Z)(
							{},
							(0, i.rn)([
								"isMobileLandscape",
								"isInSDK",
								"isInApp",
							])
						),
						{},
						{
							validPhone: function () {
								return (
									this.$lg(this.phoneValue, "length", 0) > 0
								);
							},
							finalPhoneString: function () {
								return "+"
									.concat(this.regionCode)
									.concat(this.phoneValue);
							},
						}
					),
					methods: {
						handleSendCode: function () {
							var e = this;
							(0, E.Z)({ action: "login_or_register_request" }),
								(0, S.y)({
									action: "login",
									target: this.finalPhoneString,
									type: "phone",
									callback: function (t) {
										var n = e.$lg(t, "retry_after");
										(e.showRedeemCode = !0),
											(e.retry = n),
											e.$tapBus.$emit(
												"pending_resend_code",
												n
											);
									},
									errorCallback: function (t) {
										(e.showErrorTip = !0),
											e.handleErrorTip(t);
									},
								});
						},
						handleErrorCallback: function () {
							(0, w.I)({
								customParam: {
									action: "loginFailed",
									object_type: "phone",
								},
								boothInfo: (0, v.iG)(this.$el),
							});
						},
						handleSubmitLogin: function (e) {
							var t = this;
							return (0, b.PV)({
								phone_code: e,
								phone_number: this.finalPhoneString,
							}).then(
								(function () {
									var e = (0, d.Z)(
										(0, c.Z)().mark(function e(n) {
											return (0, c.Z)().wrap(function (
												e
											) {
												for (;;)
													switch ((e.prev = e.next)) {
														case 0:
															return (
																(e.next = 2),
																t.$store.dispatch(
																	"getUserProfile"
																)
															);
														case 2:
															t.handleResult(n),
																(0, w.I)({
																	customParam:
																		{
																			action: "loginSuccess",
																			object_type:
																				"phone",
																		},
																	boothInfo:
																		(0,
																		v.iG)(
																			t.$el
																		),
																}),
																(0, x.ZP)({
																	object_type:
																		"phone",
																	action: "loginSuccess",
																});
														case 5:
														case "end":
															return e.stop();
													}
											},
											e);
										})
									);
									return function (t) {
										return e.apply(this, arguments);
									};
								})()
							);
						},
					},
				},
				M = L,
				V =
					(n(56042),
					(0, I.Z)(
						M,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{
									staticClass: "global-login--phone-wrapper",
									attrs: { "data-booth-item": "" },
								},
								[
									n(
										"div",
										{
											staticClass:
												"global-login--inputting-phone-wrapper",
										},
										[
											n("global-phone-input", {
												on: {
													handlePhoneChange:
														e.handlePhoneChange,
													handleInputSubmit:
														e.handleSendCode,
												},
											}),
											e.showErrorTip
												? n("global-error-tip", {
														attrs: {
															"error-text":
																e.errorTip,
															offset: e.isInSDK
																? "10"
																: "27",
														},
												  })
												: e._e(),
											n(
												"div",
												{
													staticClass:
														"global-signup--footer",
												},
												[
													n("global-next", {
														directives: [
															{
																name: "tracker",
																rawName:
																	"v-tracker",
																value: {
																	type: [
																		"click",
																	],
																	terms: {
																		object_type:
																			"button",
																		object_id:
																			"send_code",
																		ctx: {
																			location:
																				"phone",
																		},
																	},
																},
																expression:
																	"{\n          type: ['click'],\n          terms: {\n            object_type: 'button',\n            object_id: 'send_code',\n            ctx: {\n              location: 'phone',\n            },\n          },\n        }",
															},
														],
														staticClass:
															"global-signup--phone-next",
														attrs: {
															offset: 24,
															"btn-text":
																e.$t(
																	"global_send_code"
																),
															"is-valid":
																e.validPhone,
														},
														on: {
															handleClick:
																e.handleSendCode,
														},
													}),
												],
												1
											),
											n("redeem-code", {
												attrs: {
													"page-title":
														e.$t("global_log_in"),
													"sent-address":
														"+" +
														e.regionCode +
														" " +
														e.phoneValue,
													"retry-seconds": e.retry,
													"resend-code":
														e.handleSendCode,
													"handle-submit":
														e.handleSubmitLogin,
													"show-redeem":
														e.showRedeemCode,
												},
												on: {
													"update:showRedeem":
														function (t) {
															e.showRedeemCode =
																t;
														},
													"update:show-redeem":
														function (t) {
															e.showRedeemCode =
																t;
														},
													closeRedeem: e.closeRedeem,
													errorCallback:
														e.handleErrorCallback,
												},
											}),
										],
										1
									),
								]
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports),
				R = {
					name: "LoginGlobal",
					isLogBooth: "eb16908b",
					components: {
						GlobalLayout: n(63758).Z,
						LoginViaPhone: V,
						GlobalTab: l.Z,
						LoginViaEmail: z,
					},
					mixins: [s.Z],
					props: {},
					data: function () {
						return {};
					},
					computed: (0, o.Z)(
						{},
						(0, i.rn)([
							"isInSDK",
							"isMobileLandscape",
							"mediaQueryMatchMobile",
						])
					),
					watch: {
						activeTab: {
							handler: function () {
								var e = this;
								this.$nextTick(function () {
									(0,
									w.ux)({ useEventLog: !0, boothDom: e.$el, gUrl: location.href });
								});
							},
							immediate: !0,
						},
					},
					mounted: function () {
						(0, x.ZP)({ action: "page_view" });
					},
					methods: {
						handleTabChange: function () {
							var e = this.$lg(this.tabConfig, "phone.key");
							(0, x.ZP)({
								action: "click",
								object_type:
									this.activeTab === e
										? "email_tab"
										: "phone_tab",
							});
						},
					},
				},
				D =
					(n(51839),
					(0, I.Z)(
						R,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"global-layout",
								{
									class: {
										"login-global-wrapper--in-sdk":
											e.isInSDK && e.isMobileLandscape,
										"login-global-wrapper--mobile":
											e.mediaQueryMatchMobile ||
											e.isMobileLandscape,
										"login-global-wrapper--landscape":
											e.isMobileLandscape,
									},
									attrs: {
										"nav-title": e.$t("global_log_in"),
										"is-show-header": "",
									},
								},
								[
									n("global-tab", {
										staticClass:
											"login-global-wrapper__tab",
										on: { tabChange: e.handleTabChange },
									}),
									n("login-via-email", {
										directives: [
											{
												name: "show",
												rawName: "v-show",
												value:
													e.activeTab ===
													e.tabConfig.email.key,
												expression:
													"activeTab === tabConfig.email.key",
											},
										],
									}),
									n("login-via-phone", {
										directives: [
											{
												name: "show",
												rawName: "v-show",
												value:
													e.activeTab ===
													e.tabConfig.phone.key,
												expression:
													"activeTab === tabConfig.phone.key",
											},
										],
									}),
								],
								1
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports),
				Q = n(36558),
				q = {
					components: { LoginPage: r.Z, LoginGlobal: D },
					provide: function () {
						return { getPreInputValue: this.getPreInput };
					},
					beforeRouteEnter: function (e, t, n) {
						var i, a;
						(0, Q.DI)()
							? "email" ===
									(null == e ||
									null === (i = e.query) ||
									void 0 === i
										? void 0
										: i.type) ||
							  "phone" ===
									(null == e ||
									null === (a = e.query) ||
									void 0 === a
										? void 0
										: a.type)
								? n()
								: n(
										(0, o.Z)(
											(0, o.Z)({}, e),
											{},
											{
												query: (0, o.Z)(
													(0, o.Z)({}, e.query),
													{},
													{ type: "email" }
												),
											}
										)
								  )
							: n();
					},
					props: ["emailValue", "phoneValue"],
					data: function () {
						return { logoUrl: a.h1, isIntl: (0, Q.DI)() };
					},
					computed: (0, o.Z)(
						(0, o.Z)(
							{
								authType: function () {
									return this.$lg(
										this.globalConfig,
										"default_login_method"
									);
								},
								authStyle: function () {
									return this.$lg(
										this.globalConfig,
										"login_style"
									);
								},
							},
							(0, i.rn)(["mediaQueryMatchMobile", "globalConfig"])
						),
						{},
						{
							authComponent: function () {
								return (0, Q.Tj)()
									? "login-global"
									: "login-page";
							},
						}
					),
					mounted: function () {
						this.trackSDKPageTimeEvent({ onlySendOnce: !0 });
					},
					methods: {
						getPreInput: function () {
							return {
								email: this.emailValue,
								phone: this.phoneValue,
							};
						},
					},
				},
				j =
					(n(86235),
					(0, I.Z)(
						q,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{
									staticClass: "auth-page",
									class: { "auth-page__intl": e.isIntl },
								},
								[
									e.globalConfig
										? n(e.authComponent, {
												tag: "component",
												attrs: {
													"login-type": e.authType,
													"login-style": e.authStyle,
												},
										  })
										: e._e(),
								],
								1
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports);
		},
		32122: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return g;
				},
			});
			var o = n(43659),
				i = n(35243),
				a = n.n(i),
				r = (n(5192), n(82856)),
				l = n(63684),
				s = n(63758),
				c = n(24151),
				d = n(36428),
				u = n(30237),
				p = {
					name: "RedeemCode",
					components: {
						MediaComponent: n(36719).default,
						GlobalNext: u.Z,
						GlobalLayout: s.Z,
						GlobalErrorTip: l.Z,
						VerifyCodeInput: r.Z,
					},
					mixins: [c.Z],
					props: {
						pageTitle: { type: String },
						sentAddress: { type: String, default: "" },
						retrySeconds: { type: [String, Number], default: 60 },
						type: String,
						handleSubmit: Function,
						resendCode: Function,
						showRedeem: { default: !0, type: Boolean },
					},
					data: function () {
						return {
							resendCountDown: this.retrySeconds,
							isAutoFocus: !1,
							show: this.showRedeem,
						};
					},
					computed: (0, o.Z)(
						{},
						(0, d.rn)([
							"isMobileLandscape",
							"isInSDK",
							"isInApp",
							"mediaQueryMatchMobile",
						])
					),
					watch: {
						showRedeem: function (e) {
							this.show = e;
						},
						show: function (e) {
							e
								? ((this.isAutoFocus = !1),
								  (this.resendCountDown = this.retrySeconds),
								  this.startCountDown())
								: this.resetInputState();
						},
					},
					updated: function () {
						var e = this;
						this.$nextTick(function () {
							e.isAutoFocus || e.focusInput();
						});
					},
					methods: {
						focusInput: function () {
							a()(this, "$refs.codeInput.triggerInput"),
								a()(this, "$refs.codeInputModal.triggerInput"),
								(this.isAutoFocus = !0);
						},
						handleInput: function () {
							this.showErrorTip = !1;
						},
						handleSubmitCode: function (e) {
							var t = this;
							this.handleSubmit(e).catch(function (e) {
								t.$emit("errorCallback", e),
									(t.showErrorTip = !0),
									t.handleErrorTip(e);
							});
						},
						startCountDown: function () {
							var e = this,
								t =
									arguments.length > 0 &&
									void 0 !== arguments[0]
										? arguments[0]
										: this.retrySeconds;
							(this.resendCountDown = t),
								this.countingDown &&
									clearInterval(this.countingDown),
								(this.countingDown = setInterval(function () {
									e.resendCountDown
										? (e.resendCountDown =
												e.resendCountDown - 1)
										: clearInterval(e.countingDown);
								}, 1e3));
						},
						resetInputState: function () {
							a()(this, "$refs.codeInput.clearCode"),
								a()(this, "$refs.codeInputModal.clearCode"),
								(this.showErrorTip = !1),
								this.countingDown &&
									clearInterval(this.countingDown);
						},
						handleResendCode: function () {
							var e = this;
							this.resetInputState(),
								this.resendCode(),
								this.$tapBus.$once(
									"pending_resend_code",
									function (t) {
										e.focusInput(), e.startCountDown(t);
									}
								);
						},
						handleUpdateModal: function (e) {
							this.$emit("update:showRedeem", e);
						},
					},
				},
				h = p,
				g =
					(n(61811),
					(0, n(39563).Z)(
						h,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"media-component",
								{
									ref: "redeemCodeRef",
									class: [
										"redeem-code--wrapper",
										{
											"global-layout--wrapper__mobile":
												e.mediaQueryMatchMobile ||
												e.isMobileLandscape,
											"global-layout--wrapper__landscape":
												e.isMobileLandscape,
										},
									],
									attrs: {
										show: e.show,
										"style-map": {
											PC_WIDTH: "modal",
											MOBILE_WIDTH: "page",
										},
										"append-to-body": "",
										"append-to-body-map": { page: !0 },
										"show-page-title": !1,
										"lock-scroll": !1,
									},
									on: {
										"update:show": [
											function (t) {
												e.show = t;
											},
											e.handleUpdateModal,
										],
									},
									scopedSlots: e._u(
										[
											e.mediaQueryMatchMobile
												? null
												: {
														key: "headerLeft",
														fn: function () {
															return [
																n(
																	"div",
																	{
																		staticClass:
																			"redeem-code__model-header",
																	},
																	[
																		n(
																			"div",
																			{
																				staticClass:
																					"redeem-code--header heading-20 font-bold",
																			},
																			[
																				e._v(
																					" " +
																						e._s(
																							e.$t(
																								"global_enter_code"
																							)
																						) +
																						" "
																				),
																			]
																		),
																		n(
																			"div",
																			{
																				staticClass:
																					"redeem-code--sub-header heading-12 font-bold black-30",
																			},
																			[
																				e._v(
																					" " +
																						e._s(
																							e.$tc(
																								"global_code_is_send_to",
																								"your address",
																								{
																									sent: e.sentAddress,
																								}
																							)
																						) +
																						" "
																				),
																			]
																		),
																	]
																),
															];
														},
														proxy: !0,
												  },
											e.mediaQueryMatchMobile
												? null
												: {
														key: "default",
														fn: function () {
															return [
																n(
																	"div",
																	{
																		staticClass:
																			"redeem-code__modal-wrapper",
																	},
																	[
																		n(
																			"verify-code-input",
																			{
																				ref: "codeInputModal",
																				staticClass:
																					"redeem-code--input-wrapper",
																				attrs: {
																					"force-use-base":
																						!0,
																					"custom-input-class":
																						"redeem-code--input",
																				},
																				on: {
																					finishEvent:
																						e.handleSubmitCode,
																					handleInput:
																						e.handleInput,
																				},
																			}
																		),
																		e.showErrorTip
																			? n(
																					"global-error-tip",
																					{
																						staticClass:
																							"redeem-code--wrong-code",
																						attrs: {
																							"error-text":
																								e.errorTip,
																						},
																					}
																			  )
																			: e._e(),
																		e.resendCountDown
																			? n(
																					"tap-text",
																					{
																						staticClass:
																							"black-30 font-bold heading-12 redeem-code--resend-code",
																						domProps:
																							{
																								innerHTML:
																									e._s(
																										e.$tc(
																											"global_resend_count_down",
																											"60",
																											{
																												countdown:
																													e.resendCountDown,
																											}
																										)
																									),
																							},
																					}
																			  )
																			: n(
																					"div",
																					{
																						staticClass:
																							"redeem-code--resend-code redeem-code--resend-code-button",
																					},
																					[
																						n(
																							"global-next",
																							{
																								attrs: {
																									offset: 0,
																									"btn-text":
																										e.$t(
																											"global_resend_code"
																										),
																									"is-valid":
																										"",
																								},
																								on: {
																									handleClick:
																										e.handleResendCode,
																								},
																							}
																						),
																					],
																					1
																			  ),
																	],
																	1
																),
															];
														},
														proxy: !0,
												  },
										],
										null,
										!0
									),
								},
								[
									e.mediaQueryMatchMobile
										? n("global-layout", {
												class: [
													{
														"redeem-code--wrapper__landscape":
															e.isMobileLandscape &&
															!1,
													},
												],
												attrs: {
													"nav-title": e.pageTitle,
												},
												scopedSlots: e._u(
													[
														{
															key: "back",
															fn: function () {
																return [
																	n("icon", {
																		staticClass:
																			"auth-layout__main-header-icon gray-06",
																		attrs: {
																			icon: "ico-m28-w28-backL-outlined",
																		},
																		nativeOn:
																			{
																				click: function (
																					t
																				) {
																					return e.handleUpdateModal(
																						!1
																					);
																				},
																			},
																	}),
																];
															},
															proxy: !0,
														},
														{
															key: "default",
															fn: function () {
																return [
																	n(
																		"div",
																		{
																			staticClass:
																				"redeem-code--header heading-20 font-bold white-primary",
																		},
																		[
																			e._v(
																				" " +
																					e._s(
																						e.$t(
																							"global_enter_code"
																						)
																					) +
																					" "
																			),
																		]
																	),
																	n(
																		"div",
																		{
																			staticClass:
																				"redeem-code--sub-header heading-12 font-bold black-30",
																		},
																		[
																			e._v(
																				" " +
																					e._s(
																						e.$tc(
																							"global_code_is_send_to",
																							"your address",
																							{
																								sent: e.sentAddress,
																							}
																						)
																					) +
																					" "
																			),
																		]
																	),
																	n(
																		"verify-code-input",
																		{
																			ref: "codeInput",
																			staticClass:
																				"redeem-code--input-wrapper",
																			attrs: {
																				"force-use-base":
																					!0,
																				"custom-input-class":
																					"redeem-code--input",
																			},
																			on: {
																				finishEvent:
																					e.handleSubmitCode,
																				handleInput:
																					e.handleInput,
																			},
																		}
																	),
																	e.showErrorTip
																		? n(
																				"global-error-tip",
																				{
																					staticClass:
																						"redeem-code--wrong-code",
																					attrs: {
																						"error-text":
																							e.errorTip,
																					},
																				}
																		  )
																		: e._e(),
																	e.resendCountDown
																		? n(
																				"tap-text",
																				{
																					staticClass:
																						"black-30 font-bold heading-12 redeem-code--resend-code",
																					domProps:
																						{
																							innerHTML:
																								e._s(
																									e.$tc(
																										"global_resend_count_down",
																										"60",
																										{
																											countdown:
																												e.resendCountDown,
																										}
																									)
																								),
																						},
																				}
																		  )
																		: n(
																				"div",
																				{
																					staticClass:
																						"redeem-code--resend-code redeem-code--resend-code-button",
																				},
																				[
																					n(
																						"global-next",
																						{
																							attrs: {
																								offset: 0,
																								"btn-text":
																									e.$t(
																										"global_resend_code"
																									),
																								"is-valid":
																									"",
																							},
																							on: {
																								handleClick:
																									e.handleResendCode,
																							},
																						}
																					),
																				],
																				1
																		  ),
																];
															},
															proxy: !0,
														},
													],
													null,
													!1,
													1459567710
												),
										  })
										: e._e(),
								],
								1
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports);
		},
		13488: function (e, t, n) {
			"use strict";
			var o = n(1319),
				i = n(70800),
				a = n(43659),
				r = (n(83454), n(48666)),
				l = n(90317),
				s = n(71634),
				c = n(36428);
			t.Z = {
				data: function () {
					return { isAgreeProtocolShown: !1 };
				},
				computed: (0, a.Z)(
					(0, a.Z)({}, (0, c.rn)(["isIntl", "isInSDK", "isInApp"])),
					{},
					{
						protocol_1: function () {
							return this.isIntl ? r.Jw : r.SP;
						},
						protocol_2: function () {
							return this.isIntl ? r.p : r.m5;
						},
					}
				),
				methods: {
					agreeProtocol: function () {
						var e = this,
							t =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: function () {};
						if (!this.isAgreeProtocolShown) {
							this.isAgreeProtocolShown = !0;
							var n =
									'<a style="color:#1D669D" target="_blank" href="'
										.concat(
											this.protocol_1,
											'" onclick="return window.__handleProtocolClick(event, \''
										)
										.concat(this.protocol_1, "')\">")
										.concat(
											this.$t("login_read_protocol_1"),
											"</a>"
										),
								a =
									'<a style="color:#1D669D" target="_blank" href="'
										.concat(
											this.protocol_2,
											'" onclick="return window.__handleProtocolClick(event, \''
										)
										.concat(this.protocol_2, "')\">")
										.concat(
											this.$t("login_read_protocol_2"),
											"</a>"
										),
								r =
									'<p class="heading-m14-w16 gray-06" style="font-height:22px">'.concat(
										this.$t("agree_protocol_message", {
											1: n,
											2: a,
										}),
										"</p>"
									);
							(window.__handleProtocolClick = (function () {
								var t = (0, i.Z)(
									(0, o.Z)().mark(function t(n, i) {
										return (0, o.Z)().wrap(
											function (t) {
												for (;;)
													switch ((t.prev = t.next)) {
														case 0:
															if (!e.isInSDK) {
																t.next = 6;
																break;
															}
															return (
																n.preventDefault(),
																(0, l.ZP)(
																	"openBrowser",
																	i
																),
																t.abrupt(
																	"return",
																	!1
																)
															);
														case 6:
															if (!e.isInApp) {
																t.next = 17;
																break;
															}
															return (
																n.preventDefault(),
																(t.prev = 8),
																(t.next = 11),
																(0, s.uo)(
																	"to?url=".concat(
																		encodeURIComponent(
																			i +
																				"/for-client"
																		)
																	)
																)
															);
														case 11:
															t.next = 16;
															break;
														case 13:
															(t.prev = 13),
																(t.t0 =
																	t.catch(8)),
																window.open(
																	i,
																	"_blank"
																);
														case 16:
															return t.abrupt(
																"return",
																!1
															);
														case 17:
															return t.abrupt(
																"return",
																!0
															);
														case 18:
														case "end":
															return t.stop();
													}
											},
											t,
											null,
											[[8, 13]]
										);
									})
								);
								return function (e, n) {
									return t.apply(this, arguments);
								};
							})()),
								this.$confirmNew(r, {
									title: this.$t("agree_protocol_title"),
									confirmText: this.$t("agree_protocol_btn"),
									confirmSite: "single",
									canChangeRoute: !1,
								}).then(function (n) {
									n && t(),
										(e.isAgreeProtocolShown = !1),
										delete window.__handleProtocolClick;
								});
						}
					},
				},
			};
		},
		53923: function (e, t) {
			"use strict";
			t.Z = {
				data: function () {
					return { emailValue: "", validEmail: !1 };
				},
				methods: {
					handleEmailChange: function (e) {
						this.invalidAccount = !1;
						var t = e.value,
							n = e.validation;
						(this.emailValue = t),
							(this.validEmail = n),
							this.showErrorTip && (this.showErrorTip = !1);
					},
				},
			};
		},
		29824: function (e, t) {
			"use strict";
			t.Z = {
				data: function () {
					return { passwordValue: "", incorrectPassword: !1 };
				},
				methods: {
					handlePasswordChange: function (e) {
						(this.passwordValue = e),
							this.showErrorTip && (this.showErrorTip = !1);
					},
				},
			};
		},
		39509: function (e, t) {
			"use strict";
			t.Z = {
				data: function () {
					return { phoneValue: "", regionCode: "" };
				},
				methods: {
					handlePhoneChange: function (e) {
						var t = e.value,
							n = e.regionCode;
						(this.phoneValue = t),
							(this.regionCode = n),
							this.showErrorTip && (this.showErrorTip = !1);
					},
				},
			};
		},
		69241: function (e, t, n) {
			"use strict";
			n(92094), n(29161);
			t.Z = {
				data: function () {
					return { showRedeemCode: !1, retry: 0 };
				},
				methods: {
					closeRedeem: function () {
						this.showRedeemCode = !1;
					},
				},
				watch: {
					showRedeemCode: function (e) {
						e &&
							Array.prototype.forEach.call(
								this.$el.querySelectorAll("input"),
								function (e) {
									e.blur();
								}
							);
					},
				},
			};
		},
		64286: function (e, t, n) {
			"use strict";
			n(1945), n(28469), n(77265);
			var o = {
				email: { key: "email", textKey: "global_log_type_email" },
				phone: { key: "phone", textKey: "global_log_type_phone" },
			};
			t.Z = {
				data: function () {
					return { tabConfig: o };
				},
				computed: {
					activeTab: function () {
						var e = Object.keys(o),
							t = this.$lg(this.$route, "query.type", e[0]);
						return e.includes(t) ? t : e[0];
					},
				},
			};
		},
		22046: function (e, t, n) {
			"use strict";
			n(83454);
			t.Z = {
				data: function () {
					return {};
				},
				methods: {
					showSocialLoginTips: function () {
						var e =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: function () {},
							t = arguments.length > 1 ? arguments[1] : void 0;
						"wechatweb" === this.$lg(t, "social") &&
						this.$browser.is("mobile")
							? this.$confirmNew(
									'<div>\n              <p class="caption-m12-w14 gray-08">'
										.concat(
											this.$t("wechat_login_tips"),
											'</p>\n              <p class="caption-m12-w14 gray-08">'
										)
										.concat(
											this.$t(
												"wechat_login_first_suggestion"
											),
											'</p>\n              <p class="caption-m12-w14 gray-06">'
										)
										.concat(
											this.$t(
												"wechat_login_first_suggestion_description"
											),
											'</p>\n              <p class="caption-m12-w14 gray-08">'
										)
										.concat(
											this.$t(
												"wechat_login_second_suggestion"
											),
											"</p>\n              </div>"
										),
									{
										confirmText: this.$t("i_see"),
										canChangeRoute: !1,
										confirmSite: "single",
									}
							  ).then(function (t) {
									t && e();
							  })
							: e();
					},
				},
			};
		},
		3257: function (e) {
			e.exports = {};
		},
		66768: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		51839: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		17211: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		83272: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		5715: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		6441: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		56042: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		5379: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		86235: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
		61811: function (e) {
			e.exports = {
				"zIndex-navbar": "100",
				"zIndex-dropdown": "100",
				"zIndex-sticky": "200",
				"zIndex-navbar-fixed": "300",
				"zIndex-overlay": "400",
				"zIndex-dialog": "500",
				"zIndex-popover": "600",
				"zIndex-tooltip": "1000",
			};
		},
	},
]);
