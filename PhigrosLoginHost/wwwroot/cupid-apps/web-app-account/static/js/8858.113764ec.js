(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[8858],
	{
		35053: function (e, t, i) {
			"use strict";
			i.d(t, {
				Z: function () {
					return c;
				},
			});
			var n = i(43659),
				r = (i(5192), i(4403)),
				a = i(57091),
				s = i(36428),
				o = {
					name: "CheckTerms",
					components: { TapText: r.Z, TapCheckbox: a.Z },
					watch: {
						initSelect: function (e) {
							this.isSelect = e;
						},
					},
					computed: (0, n.Z)({}, (0, s.rn)(["isMobileLandscape"])),
					props: {
						text: { default: "", type: String },
						size: { default: 20, type: Number },
						initSelect: { default: !1, type: Boolean },
					},
					data: function () {
						return { isSelect: this.initSelect };
					},
					methods: {
						check: function (e) {
							(this.isSelect = e), this.$emit("selectedEvent", e);
						},
						handleClick: function () {
							(this.isSelect = !this.isSelect),
								this.$emit("selectedEvent", this.isSelect);
						},
					},
				},
				c =
					(i(78573),
					(0, i(39563).Z)(
						o,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
								"div",
								{
									staticClass: "check-terms flex-center--x",
									class: [
										e.isMobileLandscape
											? "check-terms__text--landscape"
											: "",
									],
								},
								[
									i("tap-checkbox", {
										staticClass: "check-terms_box",
										attrs: {
											size: e.size,
											selected: e.isSelect,
										},
										on: { selectCheckbox: e.check },
									}),
									i(
										"div",
										{
											staticClass: "check-terms__text",
											on: { click: e.handleClick },
										},
										[
											e._t("default", function () {
												return [
													i(
														"tap-text",
														{
															staticClass:
																"caption-m12-w14 gray-04 text",
														},
														[
															e._v(
																" " +
																	e._s(
																		e.text
																	) +
																	" "
															),
														]
													),
												];
											}),
										],
										2
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
					).exports);
		},
		57091: function (e, t, i) {
			"use strict";
			i.d(t, {
				Z: function () {
					return s;
				},
			});
			var n = i(43659),
				r = (i(5192), i(39879), i(74840), i(36428)),
				a = {
					name: "TapCheckbox",
					components: { TapIcon: i(20187).Z },
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
					computed: (0, n.Z)(
						(0, n.Z)({}, (0, r.rn)(["isTouchscreen", "isIntl"])),
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
				s =
					(i(5379),
					(0, i(39563).Z)(
						a,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
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
										? i("tap-icon", {
												staticClass:
													"tap-check-box__icon tap-checkbox__select",
												attrs: {
													icon: "check-box-filled",
												},
										  })
										: i("tap-icon", {
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
		68858: function (e, t, i) {
			"use strict";
			i.r(t),
				i.d(t, {
					default: function () {
						return ee;
					},
				});
			var n = i(1319),
				r = i(70800),
				a = i(43659),
				s =
					(i(92094),
					i(29161),
					i(95661),
					i(9079),
					i(20599),
					i(93793),
					i(36766),
					i(3117),
					i(28469),
					i(77265),
					i(9864),
					i(91359),
					i(1638),
					i(99315),
					i(26586),
					i(19388),
					i(79485),
					i(33815),
					i(16724),
					i(93117)),
				o = i(85831),
				c = i(31274),
				u = i(4403),
				l = i(91056),
				p = {
					INSUFFICIENT_IDACRD_STATUS: {
						failedReason: "real_name_failed",
						failedTip: "auth_real_name_tips",
					},
					MUST_VERIFY_EMAIL: {
						failedReason: "email_not_verified",
						failedTip: "go_to_verify_email",
					},
				},
				d = "INSUFFICIENT_IDACRD_STATUS",
				_ = i(98608),
				h = i(90317),
				f = i(59685),
				m = i(31685),
				g = i(71634),
				v = i(1084),
				b = i(82712),
				y = i(25602),
				C = {
					name: "EmailVerifyAction",
					data: function () {
						return {
							sendBtnLoading: !1,
							verifyBtnLoading: !1,
							waitSecond: 0,
						};
					},
					computed: {
						sendBtnDisable: function () {
							return 0 !== this.waitSecond;
						},
						confirmText: function () {
							return this.waitSecond > 0
								? this.$tc(
										"second_can_be_resent_support_plural",
										this.waitSecond,
										{ waitSecond: this.waitSecond }
								  )
								: this.$t("send_verify_email");
						},
					},
					methods: {
						sendEmail: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (!e.sendBtnLoading) {
															t.next = 2;
															break;
														}
														return t.abrupt(
															"return"
														);
													case 2:
														return (
															(e.sendBtnLoading =
																!0),
															(e.waitSecond = 0),
															(t.prev = 4),
															(t.next = 7),
															(0, s.cA)()
														);
													case 7:
														(i = t.sent),
															(e.waitSecond =
																e.$lg(
																	i,
																	"retry_after",
																	0
																)),
															e.forVerify(),
															(t.next = 14);
														break;
													case 12:
														(t.prev = 12),
															(t.t0 = t.catch(4));
													case 14:
														return (
															(t.prev = 14),
															(e.sendBtnLoading =
																!1),
															t.finish(14)
														);
													case 17:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[4, 12, 14, 17]]
									);
								})
							)();
						},
						emailVerifyConfirm: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (
															!e.verifyBtnLoading
														) {
															t.next = 2;
															break;
														}
														return t.abrupt(
															"return"
														);
													case 2:
														return (
															(e.verifyBtnLoading =
																!0),
															(i = e.$toast({
																loading: !0,
															})),
															(t.prev = 4),
															(t.next = 7),
															(0, s.xX)()
														);
													case 7:
														(r = t.sent),
															e.$lg(
																r,
																"activated"
															)
																? e.$emit(
																		"emailVerifyConfirm"
																  )
																: e.$toast({
																		message:
																			e.$t(
																				"email_not_verified_toast"
																			),
																		duration: 3e3,
																  }),
															(t.next = 13);
														break;
													case 11:
														(t.prev = 11),
															(t.t0 = t.catch(4));
													case 13:
														return (
															(t.prev = 13),
															i.remove(),
															(e.verifyBtnLoading =
																!1),
															t.finish(13)
														);
													case 17:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[4, 11, 13, 17]]
									);
								})
							)();
						},
						forVerify: function () {
							var e = this;
							this.timer && clearInterval(this.timer),
								(this.timer = setInterval(function () {
									e.waitSecond--,
										0 === e.waitSecond &&
											clearInterval(e.timer);
								}, 1e3));
						},
					},
				},
				x = (i(12899), i(39563)),
				w = (0, x.Z)(
					C,
					function () {
						var e = this,
							t = e.$createElement,
							i = e._self._c || t;
						return i(
							"div",
							{
								staticClass:
									"authorize-page__action email-verify__action font-bold flex-center--y",
							},
							[
								i(
									"tap-button",
									{
										staticClass:
											"email-verify__action__send",
										attrs: {
											theme: "primary",
											size: "large",
											disabled: e.sendBtnDisable,
										},
										on: { click: e.sendEmail },
									},
									[e._v(e._s(e.confirmText) + " ")]
								),
								i(
									"tap-text",
									{
										staticClass:
											"email-verify__action__confirm",
										attrs: { line: 1 },
										nativeOn: {
											click: function (t) {
												return e.emailVerifyConfirm.apply(
													null,
													arguments
												);
											},
										},
									},
									[e._v(e._s(e.$t("continue_login")) + " ")]
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
				k = w.exports,
				S = {
					name: "UserAuthItem",
					components: { TapCheckbox: i(57091).Z, TapText: u.Z },
					props: { item: Object },
					data: function () {
						return {
							isSelect: this.$lg(this.item, "allowed") || !1,
						};
					},
					watch: {
						isSelect: {
							handler: function (e) {
								e
									? this.$emit(
											"select",
											this.$lg(this.item, "scope")
									  )
									: this.$emit(
											"unSelect",
											this.$lg(this.item, "scope")
									  );
							},
						},
						immediate: !0,
					},
					mounted: function () {
						this.isSelect &&
							this.$emit("select", this.$lg(this.item, "scope"));
					},
					methods: {
						check: function () {
							this.isSelect = !this.isSelect;
						},
					},
				},
				$ =
					(i(20208),
					(0, x.Z)(
						S,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
								"div",
								{
									staticClass:
										"user-auth-item flex-center--y",
								},
								[
									i(
										"tap-text",
										{
											staticClass:
												"paragraph-m16-w16 gray-08 user-auth-item__text",
										},
										[
											e._v(
												" " +
													e._s(
														e.$lg(e.item, "intro")
													) +
													" "
											),
										]
									),
									e.$lg(e.item, "modifiable")
										? i("tap-checkbox", {
												attrs: { selected: e.isSelect },
												on: { selectCheckbox: e.check },
										  })
										: i("section", {
												staticClass:
													"tap-checkbox flex-center",
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
				L = i(70335),
				Z = i(46163),
				I = i(36428),
				z = i(36558),
				A = {
					name: "AuthorizePageAction",
					props: {
						showRefuseButton: Boolean,
						authErrorReason: String,
						disableApproveBtn: { default: !1, type: Boolean },
						scopes: {
							default: function () {
								return [];
							},
							type: Array,
						},
					},
					computed: {
						confirmStyle: function () {
							return "phone-bind-merge__action__confirm ".concat(
								(0, z.DI)() ? "global-next-button" : ""
							);
						},
						scopesStr: function () {
							return this.scopes.join(",");
						},
					},
					mounted: function () {
						var e = this.scopesStr
							? { scopes: this.scopesStr }
							: {};
						(0, b.ZP)(
							{
								object_type: "authorize_approve",
								action: "view",
							},
							e
						),
							(0, b.ZP)(
								{
									object_type: "authorize_deny",
									action: "view",
								},
								e
							);
					},
					methods: {
						emitErrorConfirm: function () {
							this.$emit("errorConfirm");
						},
						emitRefuse: function () {
							this.$emit("refuse");
						},
						emitAgree: function () {
							this.$emit("agree");
						},
					},
				},
				M = (0, x.Z)(
					A,
					function () {
						var e = this,
							t = e.$createElement,
							i = e._self._c || t;
						return i(
							"div",
							{
								staticClass:
									"authorize-page__action font-bold flex-center--y",
							},
							[
								e.authErrorReason
									? [
											i(
												"tap-button",
												{
													directives: [
														{
															name: "tracker",
															rawName:
																"v-tracker",
															value: {
																terms: {
																	object_id:
																		"我知道了",
																	object_type:
																		"button",
																},
																type: ["click"],
															},
															expression:
																"{\n        terms: {\n          object_id: '我知道了',\n          object_type: 'button',\n        },\n        type: ['click'],\n      }",
														},
													],
													staticClass:
														"phone-bind-merge__action__confirm",
													attrs: {
														theme: "primary",
														size: "large",
													},
													on: {
														click: e.emitErrorConfirm,
													},
												},
												[
													e._v(
														" " +
															e._s(
																e.$t("i_see")
															) +
															" "
													),
												]
											),
									  ]
									: [
											e.showRefuseButton
												? i(
														"span",
														{
															directives: [
																{
																	name: "tracker",
																	rawName:
																		"v-tracker",
																	value: {
																		terms: {
																			object_id:
																				"拒绝",
																			object_type:
																				"button",
																		},
																		type: [
																			"click",
																		],
																	},
																	expression:
																		"{\n        terms: {\n          object_id: '拒绝',\n          object_type: 'button',\n        },\n        type: ['click'],\n      }",
																},
															],
															staticClass:
																"phone-bind-merge__action__cancel heading-m14-w16 gray-08",
															on: {
																click: e.emitRefuse,
															},
														},
														[
															e._v(
																" " +
																	e._s(
																		e.$t(
																			"refuse"
																		)
																	) +
																	" "
															),
														]
												  )
												: e._e(),
											i(
												"tap-button",
												{
													directives: [
														{
															name: "tracker",
															rawName:
																"v-tracker",
															value: {
																terms: {
																	object_id:
																		"同意",
																	object_type:
																		"button",
																},
																type: ["click"],
															},
															expression:
																"{\n        terms: {\n          object_id: '同意',\n          object_type: 'button',\n        },\n        type: ['click'],\n      }",
														},
													],
													class: e.confirmStyle,
													attrs: {
														theme: "primary",
														size: "large",
														disabled:
															e.disableApproveBtn,
													},
													on: { click: e.emitAgree },
												},
												[
													e._v(
														" " +
															e._s(
																e.$t("i_agree")
															) +
															" "
													),
												]
											),
									  ],
							],
							2
						);
					},
					[],
					!1,
					null,
					null,
					null
				).exports,
				D = i(35053),
				P = i(48666),
				j = i(13488),
				B = {
					name: "FirstPartyConfirm",
					components: { CheckTerms: D.Z },
					mixins: [j.Z],
					props: { isQrcodeExpired: { type: Boolean, default: !1 } },
					computed: (0, a.Z)({}, (0, I.rn)(["isInSDK", "isInApp"])),
					data: function () {
						return {
							buttonLoading: !1,
							isAgreeProtocol: !1,
							protocol_1: P.SP,
							protocol_2: P.m5,
						};
					},
					mounted: function () {
						(0, b.ZP)({
							object_type: "authorize_approve",
							action: "view",
							booth: "11e3c132",
						}),
							(0, b.ZP)({
								object_type: "authorize_deny",
								action: "view",
								booth: "11e3c132",
							});
					},
					methods: {
						handleConfirm: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (!e.buttonLoading) {
														t.next = 2;
														break;
													}
													return t.abrupt("return");
												case 2:
													if (e.isAgreeProtocol) {
														t.next = 5;
														break;
													}
													return (
														e.agreeProtocol(
															function () {
																(e.isAgreeProtocol =
																	!0),
																	e.$emit(
																		"confirm"
																	);
															}
														),
														t.abrupt("return")
													);
												case 5:
													e.buttonLoading = !0;
													try {
														(0, b.ZP)({
															object_type:
																"authorize_approve",
															action: "click",
															booth: "11e3c132",
														}),
															e.$emit("confirm");
													} finally {
														e.buttonLoading = !1;
													}
												case 7:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						handleCancel: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (!e.buttonLoading) {
														t.next = 2;
														break;
													}
													return t.abrupt("return");
												case 2:
													e.buttonLoading = !0;
													try {
														(0, b.ZP)({
															object_type:
																"authorize_deny",
															action: "click",
															booth: "11e3c132",
														}),
															(0, h.ZP)(
																"closeWebView"
															);
													} finally {
														e.buttonLoading = !1;
													}
												case 4:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						handleScan: function () {
							(0, g.uo)("scan"), (0, h.ZP)("closeWebView");
						},
						isAgree: function (e) {
							this.isAgreeProtocol = e;
						},
						openBrowser: function (e, t) {
							var i = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function r() {
									return (0, n.Z)().wrap(
										function (n) {
											for (;;)
												switch ((n.prev = n.next)) {
													case 0:
														if (!i.isInSDK) {
															n.next = 5;
															break;
														}
														t.preventDefault(),
															(0, h.ZP)(
																"openBrowser",
																e
															),
															(n.next = 15);
														break;
													case 5:
														if (!i.isInApp) {
															n.next = 15;
															break;
														}
														return (
															t.preventDefault(),
															(n.prev = 7),
															(n.next = 10),
															(0, g.uo)(
																"to?url=".concat(
																	encodeURIComponent(
																		e +
																			"/for-client"
																	)
																)
															)
														);
													case 10:
														n.next = 15;
														break;
													case 12:
														(n.prev = 12),
															(n.t0 = n.catch(7)),
															window.open(
																e,
																"_blank"
															);
													case 15:
													case "end":
														return n.stop();
												}
										},
										r,
										null,
										[[7, 12]]
									);
								})
							)();
						},
					},
				},
				E =
					(i(26810),
					(0, x.Z)(
						B,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{ staticClass: "first-party-confirm" },
								[
									e.isQrcodeExpired
										? n(
												"div",
												{
													staticClass:
														"first-party-confirm__expired",
												},
												[
													n("img", {
														key: "qrcode-expired",
														staticClass:
															"first-party-confirm__expired-img",
														attrs: {
															alt: "二维码已失效",
															src: i(7502),
														},
													}),
													n(
														"p",
														{
															staticClass:
																"first-party-confirm__expired-text",
														},
														[e._v("该二维码已过期")]
													),
													n(
														"tap-button",
														{
															staticClass:
																"first-party-confirm__btn",
															staticStyle: {
																width: "104px",
																height: "40px",
																padding: "0",
															},
															attrs: {
																disabled:
																	e.buttonLoading,
																size: "large",
															},
															on: {
																click: e.handleScan,
															},
														},
														[e._v(" 重新扫码 ")]
													),
												],
												1
										  )
										: n(
												"div",
												{
													staticClass:
														"first-party-confirm__content",
												},
												[
													n("img", {
														key: "taptap-logo",
														staticClass:
															"first-party-confirm__img",
														attrs: {
															alt: "Taptap",
															src: "/market/images/6431b34991717371638d12e5553f2641.png",
														},
													}),
													n(
														"p",
														{
															staticClass:
																"first-party-confirm__title",
														},
														[
															e._v(
																"即将登录 TapTap"
															),
														]
													),
													n(
														"p",
														{
															staticClass:
																"first-party-confirm__desc",
														},
														[
															e._v(
																"请确认登录设备在你身边，且为本人操作，否则可能导致账号被盗"
															),
														]
													),
													n(
														"div",
														{
															staticClass:
																"first-party-confirm__btns",
														},
														[
															n(
																"tap-button",
																{
																	staticClass:
																		"first-party-confirm__btn first-party-confirm__btn--confirm",
																	attrs: {
																		disabled:
																			e.buttonLoading,
																		size: "large",
																	},
																	on: {
																		click: e.handleConfirm,
																	},
																},
																[
																	e._v(
																		" 确认登录 "
																	),
																]
															),
															n(
																"tap-button",
																{
																	staticClass:
																		"first-party-confirm__btn first-party-confirm__btn--cancel",
																	attrs: {
																		disabled:
																			e.buttonLoading,
																		size: "large",
																		theme: "secondary",
																	},
																	on: {
																		click: e.handleCancel,
																	},
																},
																[
																	e._v(
																		" 取消登录 "
																	),
																]
															),
														],
														1
													),
													n(
														"div",
														{
															staticClass:
																"first-party-confirm__protocol",
														},
														[
															n(
																"check-terms",
																{
																	attrs: {
																		"init-select":
																			e.isAgreeProtocol,
																		size: 16,
																	},
																	on: {
																		selectedEvent:
																			e.isAgree,
																	},
																},
																[
																	n(
																		"i18n",
																		{
																			staticClass:
																				"caption-m12-w14 gray-04",
																			attrs: {
																				path: "login_read_protocol_container",
																			},
																		},
																		[
																			n(
																				"a",
																				{
																					staticClass:
																						"checkbox__label",
																					attrs: {
																						slot: "0",
																						href: e.protocol_1,
																						target: "_blank",
																					},
																					on: {
																						click: function (
																							t
																						) {
																							return (
																								t.stopPropagation(),
																								e.openBrowser(
																									e.protocol_1,
																									t
																								)
																							);
																						},
																					},
																					slot: "0",
																				},
																				[
																					e._v(
																						e._s(
																							e.$t(
																								"login_read_protocol_1"
																							)
																						)
																					),
																				]
																			),
																			n(
																				"a",
																				{
																					staticClass:
																						"checkbox__label",
																					attrs: {
																						slot: "1",
																						href: e.protocol_2,
																						target: "_blank",
																					},
																					on: {
																						click: function (
																							t
																						) {
																							return (
																								t.stopPropagation(),
																								e.openBrowser(
																									e.protocol_2,
																									t
																								)
																							);
																						},
																					},
																					slot: "1",
																				},
																				[
																					e._v(
																						e._s(
																							e.$t(
																								"login_read_protocol_2"
																							)
																						)
																					),
																				]
																			),
																		]
																	),
																],
																1
															),
														],
														1
													),
												]
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
				N = {
					name: "UserAuthFailure",
					props: { errorReason: String },
					computed: {
						config: function () {
							return p[this.errorReason];
						},
					},
				},
				T =
					(i(24815),
					(0, x.Z)(
						N,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
								"div",
								{ staticClass: "user-auth-failure" },
								[
									i("tap-text", {
										staticClass:
											"user-auth-failure__reason heading-m16-w18 font-bold primary-black",
										domProps: {
											innerHTML: e._s(
												e.$t(
													e.$lg(
														e.config,
														"failedReason"
													)
												)
											),
										},
									}),
									i(
										"tap-text",
										{
											staticClass:
												"caption-m14-m14 gray-06 user-auth-failure__tip",
										},
										[
											e._v(
												e._s(
													e.$t(
														e.$lg(
															e.config,
															"failedTip"
														)
													)
												)
											),
										]
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
					).exports),
				V = i(23242),
				U = i.n(V),
				F = i(87240),
				R = i.n(F),
				q = new (U())({
					id: "icon-ico-m28-w28-help-outlined",
					use: "icon-ico-m28-w28-help-outlined-usage",
					viewBox: "0 0 18 18",
					content:
						'<symbol viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" id="icon-ico-m28-w28-help-outlined">\n<circle cx="8.99998" cy="8.99998" r="6.42857" fill="#ECFAFB" stroke="#00D9C5" stroke-opacity="0.32" stroke-linecap="square" stroke-linejoin="round" />\n<path d="M8.99997 11.8928V11.5714M7.39282 7.0714L7.41735 6.99783C7.59466 6.4659 8.09245 6.10712 8.65314 6.10712H9.1705C9.96392 6.10712 10.6071 6.75031 10.6071 7.54372V7.54372C10.6071 8.04835 10.3423 8.51598 9.90963 8.7756L9.40175 9.08033C9.15248 9.22989 8.99997 9.49927 8.99997 9.78996V9.96426" stroke="#00D9C5" stroke-opacity="0.32" stroke-linecap="square" stroke-linejoin="round" />\n</symbol>',
				}),
				K = (R().add(q), i(40685)),
				Q = (i(26530), i(60188), i(59155), i(20187)),
				H = i(64757),
				O = "passed",
				W = {
					name: "UserCertification",
					metaInfo: function () {
						return { title: this.$t("seo_certification_title") };
					},
					components: { TapIcon: Q.Z },
					mixins: [_.Z, H.Z],
					computed: (0, a.Z)(
						(0, a.Z)(
							{},
							(0, I.rn)([
								"mediaQueryMatchMobile",
								"isInSandbox",
								"profile",
								"isInSDK",
								"isInApp",
							])
						),
						{},
						{
							isCertificationPassed: function () {
								return this.status === O;
							},
							isCertificationFailed: function () {
								return "verifying_as_failed" === this.status;
							},
							isCertificationVerifying: function () {
								return "verifying" === this.status;
							},
							showStatus: function () {
								return (
									this.isCertificationPassed ||
									this.isCertificationFailed ||
									this.isCertificationVerifying
								);
							},
							showCancelButton: function () {
								return (
									!this.showStatus ||
									this.isCertificationFailed
								);
							},
							isAlreadySubmit: function () {
								return !(
									!this.idCard ||
									!this.realName ||
									"verifying_as_failed" === this.status
								);
							},
							confirmButtonText: function () {
								return this.isCertificationVerifying
									? this.$t("i_see")
									: this.isCertificationFailed
									? this.$t("resubmit")
									: this.isAlreadySubmit
									? this.$t("already_submit")
									: this.$t("submit");
							},
						}
					),
					data: function () {
						return {
							userCertification: {},
							userIdCard: "",
							userName: "",
							status: "",
							idCard: "",
							realName: "",
							submitLoading: !1,
							resubmit: !1,
						};
					},
					created: function () {
						this.getUserCertification();
					},
					mounted: function () {
						(0, b.ZP)({
							object_type: "verify_approve",
							action: "view",
						}),
							(0, b.ZP)({
								object_type: "verify_deny",
								action: "view",
							});
					},
					methods: {
						getUserCertification: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															(t.prev = 0),
															(t.next = 3),
															(0, K.sw)()
														);
													case 3:
														(e.userCertification =
															t.sent),
															(e.realName = e.$lg(
																e.userCertification,
																"real_name"
															)),
															(e.idCard = e.$lg(
																e.userCertification,
																"idcard"
															)),
															(e.status = e.$lg(
																e.userCertification,
																"status"
															)),
															(e.userName = e.$lg(
																e.userCertification,
																"real_name"
															)),
															(e.userIdCard =
																e.$lg(
																	e.userCertification,
																	"idcard"
																)),
															e.status === O &&
																(e.$toast({
																	message:
																		e.$t(
																			"identity_verification_success"
																		),
																	duration: 2e3,
																}),
																e.$emit(
																	"update"
																)),
															(t.next = 14);
														break;
													case 12:
														(t.prev = 12),
															(t.t0 = t.catch(0));
													case 14:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[0, 12]]
									);
								})
							)();
						},
						handleShowVerificationTips: function () {
							this.$confirmNew(
								this.$t("identity_verification_tips"),
								{
									confirmSite: "single",
									footer: !1,
									lockScroll: !1,
								}
							);
						},
						handleCancel: function () {
							(0, b.ZP)({
								object_type: "verify_deny",
								action: "click",
							}),
								this.$emit("cancel");
						},
						handleConfirm: function () {
							(0, b.ZP)({
								object_type: "verify_approve",
								action: "click",
							}),
								this.handleSubmit();
						},
					},
				},
				J =
					(i(41802),
					(0, x.Z)(
						W,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
								"div",
								{
									staticClass: "user-certification—page",
									class: {
										"user-certification—page--sandbox":
											(e.isInSandbox || e.isInSDK) &&
											e.mediaQueryMatchMobile,
										"user-certification—page--landscape":
											e.isMobileLandscape,
										"authorize-page--app":
											e.isInApp &&
											e.mediaQueryMatchMobile,
										"authorize-page--landscape--app":
											e.isInApp && e.isMobileLandscape,
										"user-certification—page--landscape-sdk":
											e.isMobileLandscape &&
											(e.isInSDK || e.isInSandbox),
									},
								},
								[
									i(
										"div",
										{ staticClass: "user-certification" },
										[
											i(
												"div",
												{
													staticClass:
														"user-certification__content",
												},
												[
													i(
														"section",
														{
															staticClass:
																"user-certification__content__input",
														},
														[
															i(
																"div",
																{
																	staticClass:
																		"user-certification__result heading-m14-w16",
																	class: {
																		"user-certification__result--fail":
																			e.isCertificationFailed,
																		"user-certification__result--verifying":
																			e.isCertificationVerifying,
																	},
																},
																[
																	i(
																		"section",
																		{
																			directives:
																				[
																					{
																						name: "show",
																						rawName:
																							"v-show",
																						value: !e.showStatus,
																						expression:
																							"!showStatus",
																					},
																				],
																		},
																		[
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"font-bold heading-m16-w18 user-certification__result__status-title",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.$t(
																									"wait_identity_verification"
																								)
																							) +
																							" "
																					),
																				]
																			),
																			e._v(
																				" "
																			),
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"gray-06 user-certification__result__status-tips",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.$t(
																									"wait_identity_verification_tips"
																								)
																							) +
																							" "
																					),
																					i(
																						"tap-icon",
																						{
																							staticClass:
																								"user-certification__result__status-icon",
																							attrs: {
																								icon: "ico-m28-w28-help-outlined",
																							},
																							nativeOn:
																								{
																									click: function (
																										t
																									) {
																										return e.handleShowVerificationTips.apply(
																											null,
																											arguments
																										);
																									},
																								},
																						}
																					),
																				],
																				1
																			),
																		],
																		1
																	),
																	e._v(" "),
																	i(
																		"section",
																		{
																			directives:
																				[
																					{
																						name: "show",
																						rawName:
																							"v-show",
																						value: e.isCertificationVerifying,
																						expression:
																							"isCertificationVerifying",
																					},
																				],
																		},
																		[
																			i(
																				"i18n",
																				{
																					staticClass:
																						"font-bold heading-m16-w18 user-certification__result__status-title",
																					attrs: {
																						path: "identity_verification_status",
																						tag: "tap-text",
																					},
																					scopedSlots:
																						e._u(
																							[
																								{
																									key: "status",
																									fn: function () {
																										return [
																											i(
																												"span",
																												{
																													staticClass:
																														"user-certification__result__status-detail",
																												},
																												[
																													e._v(
																														e._s(
																															e.$t(
																																"waiting_for_review"
																															)
																														)
																													),
																												]
																											),
																										];
																									},
																									proxy: !0,
																								},
																							]
																						),
																				}
																			),
																			e._v(
																				" "
																			),
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"gray-06 user-certification__result__status-tips",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.$t(
																									"waiting_for_review_tips"
																								)
																							) +
																							" "
																					),
																				]
																			),
																		],
																		1
																	),
																	e._v(" "),
																	i(
																		"section",
																		{
																			directives:
																				[
																					{
																						name: "show",
																						rawName:
																							"v-show",
																						value: e.isCertificationFailed,
																						expression:
																							"isCertificationFailed",
																					},
																				],
																		},
																		[
																			i(
																				"i18n",
																				{
																					staticClass:
																						"font-bold heading-m16-w18",
																					attrs: {
																						path: "identity_verification_status",
																						tag: "tap-text",
																					},
																					scopedSlots:
																						e._u(
																							[
																								{
																									key: "status",
																									fn: function () {
																										return [
																											i(
																												"span",
																												{
																													staticClass:
																														"user-certification__result__status-detail",
																												},
																												[
																													e._v(
																														" " +
																															e._s(
																																e.$t(
																																	"identity_verification_fail"
																																)
																															) +
																															" "
																													),
																												]
																											),
																										];
																									},
																									proxy: !0,
																								},
																							]
																						),
																				}
																			),
																			e._v(
																				" "
																			),
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"gray-06 user-certification__result__status-tips",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.$t(
																									"identity_verification_fail_tips"
																								)
																							) +
																							" "
																					),
																				]
																			),
																		],
																		1
																	),
																]
															),
															e._v(" "),
															e.isCertificationVerifying
																? i(
																		"section",
																		{
																			staticClass:
																				"user-certification__content__info",
																		},
																		[
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"user-certification__content__name heading-m14-w16",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.userName
																							) +
																							" "
																					),
																				]
																			),
																			e._v(
																				" "
																			),
																			i(
																				"tap-text",
																				{
																					staticClass:
																						"user-certification__content__id-card heading-m14-w16",
																				},
																				[
																					e._v(
																						" " +
																							e._s(
																								e.userIdCard
																							) +
																							" "
																					),
																				]
																			),
																		],
																		1
																  )
																: [
																		i(
																			"tap-input",
																			{
																				ref: "userName",
																				staticClass:
																					"user-certification__content__name heading-m16-w18",
																				class: {
																					"user-certification__content__input--done":
																						e.isAlreadySubmit,
																				},
																				attrs: {
																					disabled:
																						e.isAlreadySubmit,
																					placeholder:
																						e.$t(
																							"real_name"
																						),
																					theme: "base",
																					type: "text",
																				},
																				model: {
																					value: e.userName,
																					callback:
																						function (
																							t
																						) {
																							e.userName =
																								t;
																						},
																					expression:
																						"userName",
																				},
																			}
																		),
																		e._v(
																			" "
																		),
																		i(
																			"tap-input",
																			{
																				ref: "userIdCard",
																				staticClass:
																					"user-certification__content__id-card heading-m16-w18",
																				class: {
																					"user-certification__content__input--done":
																						e.isAlreadySubmit,
																				},
																				attrs: {
																					disabled:
																						e.isAlreadySubmit,
																					placeholder:
																						e.$t(
																							"individual_pin"
																						),
																					theme: "base",
																				},
																				on: {
																					keyup: function (
																						t
																					) {
																						return !t.type.indexOf(
																							"key"
																						) &&
																							e._k(
																								t.keyCode,
																								"enter",
																								13,
																								t.key,
																								"Enter"
																							)
																							? null
																							: e.handleConfirm.apply(
																									null,
																									arguments
																							  );
																					},
																				},
																				model: {
																					value: e.userIdCard,
																					callback:
																						function (
																							t
																						) {
																							e.userIdCard =
																								t;
																						},
																					expression:
																						"userIdCard",
																				},
																			}
																		),
																  ],
														],
														2
													),
													e._v(" "),
													i(
														"section",
														{
															staticClass:
																"user-certification__action--container",
														},
														[
															e.showCancelButton
																? i(
																		"span",
																		{
																			directives:
																				[
																					{
																						name: "tracker",
																						rawName:
																							"v-tracker",
																						value: {
																							terms: {
																								object_id:
																									e.resubmit
																										? "real_name_authentication_resubmit"
																										: "real_name_authentication_submit",
																								object_type:
																									"button",
																								class_type:
																									"app",
																								client_id:
																									e.$lg(
																										e
																											.$route
																											.query,
																										"client_id"
																									),
																							},
																							type: [
																								"click",
																							],
																						},
																						expression:
																							"{\n              terms: {\n                object_id: resubmit ? 'real_name_authentication_resubmit' : 'real_name_authentication_submit',\n                object_type: 'button',\n                class_type: 'app',\n                client_id: $lg($route.query, 'client_id'),\n              },\n              type: ['click'],\n            }",
																					},
																				],
																			staticClass:
																				"user-certification__action--cancel heading-m14-w16 gray-08 font-bold",
																			on: {
																				click: e.handleCancel,
																			},
																		},
																		[
																			e._v(
																				" " +
																					e._s(
																						e.$t(
																							"cancel"
																						)
																					) +
																					" "
																			),
																		]
																  )
																: e._e(),
															e._v(" "),
															i(
																"tap-button",
																{
																	directives:
																		[
																			{
																				name: "tracker",
																				rawName:
																					"v-tracker",
																				value: {
																					terms: {
																						object_id:
																							e.resubmit
																								? "real_name_authentication_resubmit"
																								: "real_name_authentication_submit",
																						object_type:
																							"button",
																						class_type:
																							"app",
																						client_id:
																							e.$lg(
																								e
																									.$route
																									.query,
																								"client_id"
																							),
																					},
																					type: [
																						"click",
																					],
																				},
																				expression:
																					"{\n              terms: {\n                object_id: resubmit ? 'real_name_authentication_resubmit' : 'real_name_authentication_submit',\n                object_type: 'button',\n                class_type: 'app',\n                client_id: $lg($route.query, 'client_id'),\n              },\n              type: ['click'],\n            }",
																			},
																		],
																	ref: "submit-button",
																	staticClass:
																		"user-certification__action",
																	class: {
																		"user-certification__action--status":
																			e.showStatus,
																	},
																	attrs: {
																		disabled:
																			e.buttonDisabled,
																		done: e.isAlreadySubmit,
																		size: "x-large",
																		theme: "primary",
																	},
																	on: {
																		click: e.handleConfirm,
																	},
																},
																[
																	e._v(
																		" " +
																			e._s(
																				e.confirmButtonText
																			) +
																			" "
																	),
																]
															),
														],
														1
													),
												]
											),
										]
									),
								]
							);
						},
						[],
						!1,
						null,
						null,
						null
					)),
				Y = J.exports,
				G = {
					isLogBooth: "c2d0e0bf",
					name: "AuthorizePage",
					components: {
						EmailVerifyAction: k,
						UserAvatar: c.Z,
						UserAuthItem: $,
						TapButton: l.Z,
						LayoutMain: L.Z,
						AuthBox: o.Z,
						TapText: u.Z,
						UserAuthFailure: T,
						AuthorizePageAction: M,
						UserCertification: Y,
						FirstPartyConfirm: E,
					},
					mixins: [_.Z],
					metaInfo: function () {
						return { title: this.$t("seo_authorize_title") };
					},
					data: function () {
						return {
							resData: null,
							guestAvatarUrl: f.tu,
							isShowErrorMessage: !1,
							errorMessage: null,
							scopeArray: [],
							buttonLoading: !1,
							independentScopeIndex: -1,
							authErrorReason: "",
							isNeedVerifyEmail: !1,
							showUserCertification: !1,
							appVersion: (0, h.Q5)(),
							trackScopes: [],
							firstMountAuthApi: !1,
							sendNativeShowUi: !1,
							isFirstParty: !1,
							isQrcodeExpired: !1,
						};
					},
					computed: (0, a.Z)(
						(0, a.Z)(
							{},
							(0, I.rn)([
								"mediaQueryMatchMobile",
								"isMobileLandscape",
								"profile",
								"globalConfig",
								"isInSDK",
								"isInApp",
								"isIntl",
								"isInSandbox",
							])
						),
						{},
						{
							scopeCode: function () {
								var e = "";
								return (
									this.scopeArray.length &&
										this.scopeArray.forEach(function (t) {
											(e += t), (e += " ");
										}),
									e
								);
							},
							canLogout: function () {
								return this.$lg(
									this.globalConfig,
									"authorize_config.can_logout"
								);
							},
							isShowAuthBoxHeader: function () {
								return (
									!!this.canLogout &&
									!this.isInApp &&
									!(
										this.mediaQueryMatchMobile &&
										!this.isInSDK
									) &&
									!this.isInSandbox &&
									"1" !==
										this.$route.query
											.third_party_login_by_iframe
								);
							},
							isShowDefaultHeader: function () {
								return (
									!this.isInApp &&
									!this.isInSDK &&
									!this.isInSandbox &&
									"1" !==
										this.$route.query
											.third_party_login_by_iframe &&
									!(
										!this.mediaQueryMatchMobile &&
										!this.isMobileLandscape
									)
								);
							},
							pcSDK: function () {
								return (
									"custom_uri_scheme" ===
										this.$lg(this.resData, "flow", "") ||
									"pc_localhost" ===
										this.$lg(this.resData, "flow", "")
								);
							},
							isBaseScope: function () {
								return this.independentScopeIndex < 0;
							},
							baseScopes: function () {
								return this.$lg(
									this.resData,
									"requested_scope",
									[]
								);
							},
							hasBaseScope: function () {
								return this.baseScopes.length > 0;
							},
							independentScopes: function () {
								return this.$lg(
									this.resData,
									"requested_independent_scope",
									[]
								);
							},
							hasIndependentScope: function () {
								return this.independentScopes.length > 0;
							},
							logoImage: function () {
								return this.isIntl
									? "/web-app-global/static/img/taptap_mini.ef72185c..png"
									: "/market/images/6431b34991717371638d12e5553f2641.png";
							},
							disableApproveBtn: function () {
								return !this.$lg(this.scopeArray, "length", 0);
							},
							trackScopesStr: function () {
								return this.trackScopes.join(",");
							},
							baseSelectedScopesStr: function () {
								var e = this;
								return this.trackScopes
									.filter(function (t) {
										return e.scopeArray.includes(t);
									})
									.join(",");
							},
							independentSelectedScopesStr: function () {
								var e = this;
								return this.scopeArray
									.filter(function (t) {
										return !e.trackScopes.includes(t);
									})
									.join(",");
							},
						}
					),
					mounted: function () {
						var e = this;
						if (
							((0, b.ZP)({ action: "page_view" }, {}),
							this.trackSDKPageTimeEvent({ onlySendOnce: !0 }),
							this.$lg(this.profile, "is_deactivated"))
						)
							return (
								v.Z.set(
									"deactivated_referer_page",
									this.$route.fullPath
								),
								this.$router.push({ name: "DeactivatedPage" })
							);
						this.$store.state.profile &&
							((this.sendNativeShowUi = !1),
							this.getAuth().then(function () {
								var t;
								((e.sendNativeShowUi = !0),
								(e.firstMountAuthApi = !0),
								e.showUserCertification) ||
									(null !== (t = e.baseScopes) &&
										void 0 !== t &&
										null !== (t = t[0]) &&
										void 0 !== t &&
										t.scope &&
										(e.trackScopes = e.baseScopes.map(
											function (e) {
												return e.scope;
											}
										)));
							})),
							(0, y.Z)({ action: "authorize_in" });
					},
					methods: {
						reloadAuthorize: function () {
							this.getAuth();
						},
						handleCancel: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i;
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (
														!e.showUserCertification
													) {
														t.next = 4;
														break;
													}
													return (
														(0, b.ZP)(
															{
																object_type:
																	"authorize_deny",
																action: "click",
															},
															{
																scopes: e.trackScopesStr,
															}
														),
														e.cancelAuth(),
														t.abrupt("return")
													);
												case 4:
													if (!e.isBaseScope) {
														t.next = 8;
														break;
													}
													return (
														(0, b.ZP)(
															{
																object_type:
																	"authorize_deny",
																action: "click",
															},
															{
																scopes: e.trackScopesStr,
															}
														),
														e.cancelAuth(),
														t.abrupt("return")
													);
												case 8:
													if (!e.hasBaseScope) {
														t.next = 13;
														break;
													}
													return (
														(0, b.ZP)(
															{
																object_type:
																	"authorize_deny",
																action: "click",
															},
															{
																scopes: e.independentScopes
																	.filter(
																		function (
																			t
																		) {
																			return e.scopeArray.includes(
																				t.scope
																			);
																		}
																	)
																	.map(
																		function (
																			e
																		) {
																			return e.scope;
																		}
																	)
																	.join(","),
															}
														),
														e.independentScopes.forEach(
															function (t) {
																e.unSelectScope(
																	t.scope
																);
															}
														),
														e.approveAuth(),
														t.abrupt("return")
													);
												case 13:
													(0, b.ZP)(
														{
															object_type:
																"authorize_deny",
															action: "click",
														},
														{
															scopes:
																null ===
																	(i =
																		e.independentScopes) ||
																void 0 === i ||
																null ===
																	(i =
																		i[0]) ||
																void 0 === i
																	? void 0
																	: i.scope,
														}
													),
														e.cancelAuth();
												case 15:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						handleConfirm: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r;
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (
														!e.isBaseScope ||
														e.hasIndependentScope
													) {
														t.next = 4;
														break;
													}
													return (
														(0, b.ZP)(
															{
																object_type:
																	"authorize_approve",
																action: "click",
															},
															{
																scopes: e.baseSelectedScopesStr,
															}
														),
														e.approveAuth(),
														t.abrupt("return")
													);
												case 4:
													if (
														!(
															e.hasIndependentScope &&
															e.independentScopeIndex <
																0
														)
													) {
														t.next = 11;
														break;
													}
													return (
														(0, b.ZP)(
															{
																object_type:
																	"authorize_approve",
																action: "click",
															},
															{
																scopes: e.baseSelectedScopesStr,
															}
														),
														(0, b.ZP)(
															{
																object_type:
																	"authorize_approve",
																action: "view",
															},
															{
																scopes:
																	null ===
																		(i =
																			e.independentScopes) ||
																	void 0 ===
																		i ||
																	null ===
																		(i =
																			i[0]) ||
																	void 0 === i
																		? void 0
																		: i.scope,
															}
														),
														(0, b.ZP)(
															{
																object_type:
																	"authorize_deny",
																action: "view",
															},
															{
																scopes:
																	null ===
																		(r =
																			e.independentScopes) ||
																	void 0 === r
																		? void 0
																		: r[0]
																				.scope,
															}
														),
														e.independentScopeIndex++,
														(e.authErrorReason =
															e.independentScopes
																.map(function (
																	t
																) {
																	return e.$lg(
																		t,
																		"reason",
																		""
																	);
																})
																.filter(
																	Boolean
																)[0]),
														t.abrupt("return")
													);
												case 11:
													(0, b.ZP)(
														{
															object_type:
																"authorize_approve",
															action: "click",
														},
														{
															scopes: e.independentSelectedScopesStr,
														}
													),
														e.approveAuth();
												case 13:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						handleAuthErrorConfirm: function () {
							this.hasBaseScope
								? this.approveAuth()
								: this.cancelAuth();
						},
						getAuth: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r, a, o, c, u, l, p, _, f;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															(e.isNeedVerifyEmail =
																!1),
															(e.showUserCertification =
																!1),
															(i = (0,
															Z.stringify)(
																e.$route.query
															)),
															(r = {
																parameters: i,
															}),
															(a = e.$toast({
																loading: !0,
															})),
															(t.prev = 5),
															(t.next = 8),
															(0, s.v0)(r)
														);
													case 8:
														if (
															!(o = t.sent)
																.is_first_party
														) {
															t.next = 15;
															break;
														}
														return (
															(e.resData = o),
															(e.isFirstParty =
																!0),
															(e.isQrcodeExpired =
																!1),
															a.close(),
															t.abrupt("return")
														);
													case 15:
														(c =
															e.getScopeReasonListFromScope(
																e.$lg(
																	o,
																	"requested_independent_scope",
																	[]
																)
															)),
															(u =
																e.getScopeReasonListFromScope(
																	e.$lg(
																		o,
																		"requested_scope",
																		[]
																	)
																)),
															(l = e.$lg(
																c,
																"0",
																e.$lg(
																	u,
																	"0",
																	""
																)
															)),
															(c.includes(d) ||
																u.includes(
																	d
																)) &&
																(e.isInApp &&
																e.$browser.is(
																	"Android"
																) &&
																e.appVersion
																	? (e.showUserCertification =
																			e.appVersion >=
																			238001e3)
																	: (e.showUserCertification =
																			!0)),
															e.$lg(
																o,
																"redirect_uri"
															) ||
																!(0, m.Oe)() ||
																e.sendNativeShowUi ||
																((e.sendNativeShowUi =
																	!0),
																(p = (0,
																m.LU)()),
																parent.postMessage(
																	JSON.stringify(
																		{
																			action: "showWeb",
																		}
																	),
																	p
																)),
															e.$lg(
																o,
																"redirect_uri"
															) ||
																e.sendNativeShowUi ||
																((e.sendNativeShowUi =
																	!0),
																(0, h.a6)(
																	"showWeb"
																)),
															e.$lg(
																o,
																"redirect_uri"
															) &&
															!e.showUserCertification
																? window.self !==
																  window.top
																	? e.postSilentLoginMessage(
																			e.$lg(
																				o,
																				"redirect_uri"
																			)
																	  )
																	: (location.href =
																			e.$lg(
																				o,
																				"redirect_uri"
																			))
																: ((e.resData =
																		o),
																  e.showUserCertification ||
																		e.hasBaseScope ||
																		!e.hasIndependentScope ||
																		((e.independentScopeIndex = 0),
																		(e.authErrorReason =
																			l))),
															(t.next = 29);
														break;
													case 24:
														(t.prev = 24),
															(t.t0 = t.catch(5)),
															(_ = e.$lg(
																t.t0,
																"error.response.data.data.error"
															)),
															(f = e.$lg(
																t.t0,
																"error.response.data.data.msg"
															)),
															e.handleAuthResult(
																_,
																f
															);
													case 29:
														return (
															(t.prev = 29),
															a.remove(),
															t.finish(29)
														);
													case 32:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[5, 24, 29, 32]]
									);
								})
							)();
						},
						approveAuth: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r, a, o, c;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (!e.buttonLoading) {
															t.next = 2;
															break;
														}
														return t.abrupt(
															"return"
														);
													case 2:
														return (
															(i = e.$toast({
																loading: !0,
															})),
															(e.buttonLoading =
																!0),
															(r = {
																grant_type:
																	e.$lg(
																		e.resData,
																		"grant_type"
																	),
																client_id:
																	e.$lg(
																		e.resData,
																		"client.id"
																	),
																scopes: e.scopeCode,
																continuation_code:
																	e.$lg(
																		e.resData,
																		"continuation_code"
																	),
																parameters: (0,
																Z.stringify)(
																	e.$route
																		.query
																),
															}),
															(t.prev = 5),
															(t.next = 8),
															(0, s.xz)(r)
														);
													case 8:
														if (
															((a = t.sent),
															!e.pcSDK)
														) {
															t.next = 14;
															break;
														}
														return (
															(e.buttonLoading =
																!1),
															i.remove(),
															e.goToAuthorizeLaunch(
																a
															),
															t.abrupt("return")
														);
													case 14:
														if (
															!e.$lg(
																e.resData,
																"is_first_party"
															)
														) {
															t.next = 18;
															break;
														}
														return (
															(0, y.Z)({
																action: "authorize_approve",
															}),
															(0, h.a6)(
																"closeWebView"
															),
															t.abrupt("return")
														);
													case 18:
														(0, y.Z)(
															{
																action: "authorize_approve",
																authorize_scopes:
																	e.scopeCode,
															},
															{
																logTopic:
																	"authorize",
															}
														),
															e.postSilentLoginMessage(
																e.$lg(
																	a,
																	"redirect_uri"
																)
															),
															(location.href =
																e.$lg(
																	a,
																	"redirect_uri"
																)),
															(t.next = 29);
														break;
													case 23:
														(t.prev = 23),
															(t.t0 = t.catch(5)),
															(o = e.$lg(
																t.t0,
																"error.response.data.data.error"
															)),
															(c = e.$lg(
																t.t0,
																"error.response.data.data.msg"
															)),
															e.handleAuthResult(
																o,
																c
															),
															e.$nextTick(
																function () {
																	(e.buttonLoading =
																		!1),
																		i.remove();
																}
															);
													case 29:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[5, 23]]
									);
								})
							)();
						},
						cancelAuth: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r, a, o, c;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (!e.buttonLoading) {
															t.next = 2;
															break;
														}
														return t.abrupt(
															"return"
														);
													case 2:
														return (
															(i = e.$toast({
																loading: !0,
															})),
															(e.buttonLoading =
																!0),
															(r = {
																grant_type:
																	e.$lg(
																		e.resData,
																		"grant_type"
																	),
																client_id:
																	e.$lg(
																		e.resData,
																		"client.id"
																	),
																continuation_code:
																	e.$lg(
																		e.resData,
																		"continuation_code"
																	),
																parameters: (0,
																Z.stringify)(
																	e.$route
																		.query
																),
															}),
															(t.prev = 5),
															(t.next = 8),
															(0, s.ly)(r)
														);
													case 8:
														if (
															((a = t.sent),
															(0, y.Z)({
																action: "authorize_deny",
															}),
															e.postSilentLoginMessage(
																e.$lg(
																	a,
																	"redirect_uri"
																)
															),
															!e.$lg(
																e.resData,
																"is_first_party"
															))
														) {
															t.next = 15;
															break;
														}
														return (
															(0, y.Z)({
																action: "authorize_deny",
															}),
															(0, h.a6)(
																"closeWebView"
															),
															t.abrupt("return")
														);
													case 15:
														(location.href = e.$lg(
															a,
															"redirect_uri"
														)),
															(t.next = 26);
														break;
													case 18:
														(t.prev = 18),
															(t.t0 = t.catch(5)),
															(e.buttonLoading =
																!1),
															i.remove(),
															(o = e.$lg(
																t.t0,
																"error.response.data.data.error"
															)),
															(c = e.$lg(
																t.t0,
																"error.response.data.data.msg"
															)),
															e.handleAuthResult(
																o,
																c
															);
													case 26:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[5, 18]]
									);
								})
							)();
						},
						selectScope: function (e) {
							this.scopeArray.push(e);
						},
						unSelectScope: function (e) {
							var t = this.scopeArray.indexOf(e);
							t > -1 && this.scopeArray.splice(t, 1);
						},
						goToAuthorizeLaunch: function (e) {
							var t = {
								appName: this.$lg(this.resData, "client.name"),
								appIcon: this.$lg(
									this.resData,
									"client.icon_url"
								),
								appRedirectUrl: this.$lg(
									this.resData,
									"open_app_uri"
								),
								messageUrl: this.$lg(e, "redirect_uri"),
								mode: this.$lg(this.resData, "flow", ""),
							};
							v.Z.set("authorizeLaunchInfo", t),
								this.$router.push({
									name: "AuthorizeLaunchPage",
								});
						},
						handleAuthResult: function (e, t) {
							switch (e) {
								case "must_verify_email":
									this.isNeedVerifyEmail = !0;
									break;
								case "access_denied":
									this.isInApp
										? this.$router.push({
												name: "OpenClientLoginPage",
										  })
										: this.$router.push({ name: "Auth" });
									break;
								case "needs_taptap_client":
									this.$router.push({
										name: "SDKDownloadGuide",
									});
									break;
								case "invalid_qrcode":
									(this.isFirstParty = !0),
										(this.isQrcodeExpired = !0);
									break;
								case "user_is_deactivated":
									v.Z.set(
										"deactivated_referer_page",
										this.$route.fullPath
									),
										this.$router.push({
											name: "DeactivatedPage",
										});
									break;
								default:
									(this.isShowErrorMessage = !0),
										(this.errorMessage = {
											img: f.Ny,
											description: t,
										});
							}
						},
						postSilentLoginMessage: function (e) {
							if ((0, m.Oe)()) {
								var t = (0, m.LU)(),
									i = this.getQueryParams(e);
								parent.postMessage(
									JSON.stringify({
										mode: "default",
										code: this.$lg(i, "code"),
										state: this.$lg(i, "state"),
										redirect_uri: e,
									}),
									t
								);
							}
						},
						getQueryParams: function (e) {
							if (!e || "string" != typeof e) return {};
							var t = e.split("?")[1];
							return t && "string" == typeof t
								? ((t = t.replace(/#.*$/, "")),
								  (0, Z.parse)(t, { ignoreQueryPrefix: !0 }))
								: {};
						},
						handleCloseWebView: function () {
							(0, g.uo)("close-webview");
						},
						handleUserCertificationUpdate: function () {
							this.getAuth();
						},
						handleUserCertificationCancel: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									var i, r, a;
									return (0, n.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														if (!e.buttonLoading) {
															t.next = 2;
															break;
														}
														return t.abrupt(
															"return"
														);
													case 2:
														return (
															(i = e.$toast({
																loading: !0,
															})),
															(e.buttonLoading =
																!0),
															(r = {
																grant_type:
																	e.$lg(
																		e.resData,
																		"grant_type"
																	),
																client_id:
																	e.$lg(
																		e.resData,
																		"client.id"
																	),
																continuation_code:
																	e.$lg(
																		e.resData,
																		"continuation_code"
																	),
																parameters: (0,
																Z.stringify)(
																	e.$route
																		.query
																),
															}),
															(t.prev = 5),
															(t.next = 8),
															(0, s.ly)(r)
														);
													case 8:
														if (
															((a = t.sent),
															!e.pcSDK)
														) {
															t.next = 14;
															break;
														}
														return (
															(e.buttonLoading =
																!1),
															i.remove(),
															e.goToAuthorizeLaunch(
																a
															),
															t.abrupt("return")
														);
													case 14:
														(0, y.Z)({
															action: "authorize_deny",
														}),
															e.postSilentLoginMessage(
																e.$lg(
																	a,
																	"redirect_uri"
																)
															),
															(location.href =
																e.$lg(
																	a,
																	"redirect_uri"
																)),
															(t.next = 24);
														break;
													case 19:
														(t.prev = 19),
															(t.t0 = t.catch(5)),
															(e.buttonLoading =
																!1),
															i.remove();
													case 24:
													case "end":
														return t.stop();
												}
										},
										t,
										null,
										[[5, 19]]
									);
								})
							)();
						},
						getScopeReasonListFromScope: function () {
							var e = this;
							return (
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: []
							).map(function (t) {
								return e.$lg(t, "reason", "");
							});
						},
						handleFirstPartyConfirm: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (
														(0, b.ZP)({
															object_type:
																"authorize_approve",
															action: "click",
														}),
														(t.next = 3),
														e.approveAuth()
													);
												case 3:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						handleFirstPartyCancel: function () {
							var e = this;
							return (0, r.Z)(
								(0, n.Z)().mark(function t() {
									return (0, n.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (
														(0, b.ZP)({
															object_type:
																"authorize_deny",
															action: "click",
														}),
														(t.next = 3),
														e.cancelAuth()
													);
												case 3:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
					},
				},
				X = G,
				ee =
					(i(98633),
					(0, x.Z)(
						X,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i(
								"section",
								{ staticClass: "authorize-page-container" },
								[
									e.isFirstParty
										? i("first-party-confirm", {
												attrs: {
													"is-qrcode-expired":
														e.isQrcodeExpired,
													loading: e.buttonLoading,
												},
												on: {
													cancel: e.handleFirstPartyCancel,
													confirm:
														e.handleFirstPartyConfirm,
												},
										  })
										: e.resData ||
										  e.isShowErrorMessage ||
										  e.isNeedVerifyEmail
										? i("layout-main", {
												staticClass: "authorize-page",
												class: [
													e.mediaQueryMatchMobile
														? "authorize-page--mobile"
														: "authorize-page--pc",
													{
														"authorize-page--landscape":
															e.isShowLandScape,
													},
													{
														"authorize-page--sdk":
															e.isInSDK,
													},
													{
														"authorize-page--landscape-sdk":
															e.isInSDK &&
															e.isMobileLandscape,
													},
													{
														"global-layout--wrapper":
															e.isIntl,
													},
													{
														"authorize-page--app":
															e.isInApp &&
															e.mediaQueryMatchMobile,
													},
													{
														"authorize-page--landscape--app":
															e.isInApp &&
															e.isMobileLandscape,
													},
													{
														"authorize-page--sandbox":
															(e.isInSandbox ||
																e.isInSDK) &&
															(e.mediaQueryMatchMobile ||
																e.isMobileLandscape),
													},
													{
														"authorize-page--landscape--sandbox":
															e.isMobileLandscape &&
															(e.isInSandbox ||
																e.isInSDK),
													},
												],
												attrs: {
													"is-show-header":
														e.isShowDefaultHeader,
													"nav-title":
														e.isMobileLandscape
															? e.$t(
																	"user_authorize"
															  )
															: "",
												},
												scopedSlots: e._u(
													[
														!e.canLogout ||
														e.isInSDK ||
														e.isInSandbox
															? null
															: {
																	key: "headerContentLeft",
																	fn: function () {
																		return [
																			i(
																				"div",
																				{
																					staticClass:
																						"auth-layout__main-header-title flex-center--y",
																				},
																				[
																					e._t(
																						"headerTitle",
																						function () {
																							return [
																								i(
																									"tap-text",
																									{
																										staticClass:
																											"mobile-nav__title heading-m16-w18 gray-08",
																										attrs: {
																											line: 1,
																										},
																									},
																									[
																										e._v(
																											" " +
																												e._s(
																													e.$t(
																														"user_authorize"
																													)
																												) +
																												" "
																										),
																									]
																								),
																							];
																						}
																					),
																					e._v(
																						" "
																					),
																					i(
																						"user-avatar"
																					),
																				],
																				2
																			),
																		];
																	},
																	proxy: !0,
															  },
														{
															key: "main",
															fn: function () {
																return [
																	i(
																		"auth-box",
																		{
																			attrs: {
																				"show-box-header":
																					e.isShowAuthBoxHeader,
																			},
																			scopedSlots:
																				e._u(
																					[
																						{
																							key: "header",
																							fn: function () {
																								return [
																									i(
																										"div",
																										{
																											staticClass:
																												"authorize-page__header flex-center--y",
																										},
																										[
																											i(
																												"div",
																												{
																													staticClass:
																														"authorize-page__header__info flex-center--y",
																												},
																												[
																													i(
																														"img",
																														{
																															staticClass:
																																"authorize-page__header__tap-icon paragraph-m14-w14 gray-06",
																															attrs: {
																																src: e.logoImage,
																																alt: "TapTap",
																															},
																														}
																													),
																													e._v(
																														" "
																													),
																													i(
																														"tap-text",
																														{
																															staticClass:
																																"gray-06",
																														},
																														[
																															e._v(
																																" " +
																																	e._s(
																																		e.$t(
																																			"login_in_with_TapTap_account"
																																		)
																																	) +
																																	" "
																															),
																														]
																													),
																												],
																												1
																											),
																											e._v(
																												" "
																											),
																											i(
																												"user-avatar"
																											),
																										],
																										1
																									),
																								];
																							},
																							proxy: !0,
																						},
																						{
																							key: "content",
																							fn: function () {
																								return [
																									e.isShowErrorMessage
																										? i(
																												"div",
																												{
																													staticClass:
																														"authorize-page__error",
																												},
																												[
																													e.$lg(
																														e.errorMessage,
																														"img"
																													)
																														? i(
																																"img",
																																{
																																	staticClass:
																																		"authorize-page__error__img",
																																	attrs: {
																																		src: e.$lg(
																																			e.errorMessage,
																																			"img"
																																		),
																																	},
																																}
																														  )
																														: e._e(),
																													e._v(
																														" "
																													),
																													e.$lg(
																														e.errorMessage,
																														"title"
																													)
																														? i(
																																"tap-text",
																																{
																																	staticClass:
																																		"authorize-page__error__title heading-m16-w18 gray-08",
																																},
																																[
																																	e._v(
																																		" " +
																																			e._s(
																																				e.$lg(
																																					e.errorMessage,
																																					"title"
																																				)
																																			) +
																																			" "
																																	),
																																]
																														  )
																														: e._e(),
																													e._v(
																														" "
																													),
																													e.$lg(
																														e.errorMessage,
																														"description"
																													)
																														? i(
																																"tap-text",
																																{
																																	staticClass:
																																		"authorize-page__error__description paragraph-m14-w14 gray-06",
																																},
																																[
																																	e._v(
																																		" " +
																																			e._s(
																																				e.$lg(
																																					e.errorMessage,
																																					"description"
																																				)
																																			) +
																																			" "
																																	),
																																]
																														  )
																														: e._e(),
																													e._v(
																														" "
																													),
																													e.$lg(
																														e.errorMessage,
																														"canClose"
																													)
																														? i(
																																"tap-button",
																																{
																																	staticClass:
																																		"phone-bind-merge__error__confirm",
																																	attrs: {
																																		size: "large",
																																		theme: "primary",
																																	},
																																	on: {
																																		click: e.handleCloseWebView,
																																	},
																																},
																																[
																																	e._v(
																																		" " +
																																			e._s(
																																				e.$t(
																																					"close_webview"
																																				)
																																			) +
																																			" "
																																	),
																																]
																														  )
																														: e._e(),
																												],
																												1
																										  )
																										: i(
																												"div",
																												{
																													staticClass:
																														"authorize-page__content",
																												},
																												[
																													i(
																														"div",
																														{
																															staticClass:
																																"authorize-page__content__user-info flex-center--y",
																														},
																														[
																															i(
																																"img",
																																{
																																	staticClass:
																																		"authorize-page__content__user-info__avatar",
																																	attrs: {
																																		src:
																																			e.$lg(
																																				e.resData,
																																				"user.avatar_url"
																																			) ||
																																			e.guestAvatarUrl,
																																		alt: "avatar",
																																	},
																																}
																															),
																															e._v(
																																" "
																															),
																															i(
																																"tap-text",
																																{
																																	staticClass:
																																		"authorize-page__content__user-info__nickname heading-m14-w16 gray-08",
																																	attrs: {
																																		line: 1,
																																	},
																																},
																																[
																																	e._v(
																																		" " +
																																			e._s(
																																				e.$lg(
																																					e.resData,
																																					"user.nickname"
																																				)
																																			) +
																																			" "
																																	),
																																]
																															),
																														],
																														1
																													),
																													e._v(
																														" "
																													),
																													i(
																														"div",
																														{
																															staticClass:
																																"authorize-page__content__permission-info",
																														},
																														[
																															e.showUserCertification
																																? i(
																																		"section",
																																		{
																																			staticClass:
																																				"authorize-page__content__user-certification",
																																		},
																																		[
																																			i(
																																				"user-certification",
																																				{
																																					directives:
																																						[
																																							{
																																								name: "tracker",
																																								rawName:
																																									"v-tracker",
																																								value: {
																																									terms: {
																																										object_id:
																																											"real_name_authentication_submit",
																																										object_type:
																																											"button",
																																										class_type:
																																											"app",
																																										client_id:
																																											e.$lg(
																																												e
																																													.$route
																																													.query,
																																												"client_id"
																																											),
																																									},
																																									type: [
																																										"view",
																																									],
																																								},
																																								expression:
																																									"{\n                      terms: {\n                        object_id: 'real_name_authentication_submit',\n                        object_type: 'button',\n                        class_type: 'app',\n                        client_id: $lg($route.query, 'client_id'),\n                      },\n                      type: ['view'],\n                    }",
																																							},
																																						],
																																					on: {
																																						cancel: e.handleUserCertificationCancel,
																																						update: e.handleUserCertificationUpdate,
																																					},
																																				}
																																			),
																																		],
																																		1
																																  )
																																: e.isNeedVerifyEmail
																																? i(
																																		"div",
																																		[
																																			i(
																																				"user-auth-failure",
																																				{
																																					attrs: {
																																						"error-reason":
																																							"MUST_VERIFY_EMAIL",
																																					},
																																				}
																																			),
																																		],
																																		1
																																  )
																																: e.isBaseScope
																																? i(
																																		"div",
																																		{
																																			directives:
																																				[
																																					{
																																						name: "tracker",
																																						rawName:
																																							"v-tracker",
																																						value: {
																																							terms: {
																																								object_id:
																																									"baseAuth",
																																								object_type:
																																									"dialog",
																																							},
																																							type: [
																																								"view",
																																							],
																																						},
																																						expression:
																																							"{\n                    terms: {\n                      object_id: 'baseAuth',\n                      object_type: 'dialog',\n                    },\n                    type: ['view'],\n                  }",
																																					},
																																				],
																																			staticClass:
																																				"authorize-page__content__permission-info__wrap",
																																		},
																																		[
																																			i(
																																				"tap-text",
																																				{
																																					staticClass:
																																						"authorize-page__content__permission-info__title heading-m14-w16 gray-08",
																																				},
																																				[
																																					i(
																																						"span",
																																						{
																																							staticClass:
																																								"authorize-page__content__permission-info__title-content font-bold",
																																						},
																																						[
																																							e._v(
																																								e._s(
																																									e.$lg(
																																										e.resData,
																																										"client.name"
																																									)
																																								)
																																							),
																																						]
																																					),
																																					e._v(
																																						" "
																																					),
																																					i(
																																						"span",
																																						{
																																							staticClass:
																																								"authorize-page__content__permission-info__tips paragraph-m14-w14 gray-08",
																																						},
																																						[
																																							e._v(
																																								" " +
																																									e._s(
																																										e.$t(
																																											"apply_for_using_user_info"
																																										)
																																									) +
																																									" "
																																							),
																																						]
																																					),
																																				]
																																			),
																																			e._v(
																																				" "
																																			),
																																			i(
																																				"div",
																																				{
																																					staticClass:
																																						"auth-divide-line",
																																				}
																																			),
																																			e._v(
																																				" "
																																			),
																																			e._l(
																																				e.baseScopes,
																																				function (
																																					t,
																																					n
																																				) {
																																					return [
																																						i(
																																							"user-auth-item",
																																							{
																																								directives:
																																									[
																																										{
																																											name: "show",
																																											rawName:
																																												"v-show",
																																											value: !e.$lg(
																																												t,
																																												"hidden",
																																												!1
																																											),
																																											expression:
																																												"!$lg(item, 'hidden', false)",
																																										},
																																									],
																																								key: n,
																																								attrs: {
																																									item: t,
																																								},
																																								on: {
																																									select: e.selectScope,
																																									unSelect:
																																										e.unSelectScope,
																																								},
																																							}
																																						),
																																					];
																																				}
																																			),
																																			e._v(
																																				" "
																																			),
																																			i(
																																				"section",
																																				{
																																					staticClass:
																																						"gray-04 caption-m10-w12 authorize-page__content__permission-info__edit-tips",
																																				},
																																				[
																																					e._v(
																																						" " +
																																							e._s(
																																								e.$t(
																																									"user_auth_edit_tips"
																																								)
																																							) +
																																							" "
																																					),
																																				]
																																			),
																																		],
																																		2
																																  )
																																: e.authErrorReason
																																? i(
																																		"user-auth-failure",
																																		{
																																			directives:
																																				[
																																					{
																																						name: "tracker",
																																						rawName:
																																							"v-tracker",
																																						value: {
																																							terms: {
																																								object_id:
																																									"certificatAuth",
																																								object_type:
																																									"dialog",
																																							},
																																							type: [
																																								"view",
																																							],
																																						},
																																						expression:
																																							"{\n                    terms: {\n                      object_id: 'certificatAuth',\n                      object_type: 'dialog',\n                    },\n                    type: ['view'],\n                  }",
																																					},
																																				],
																																			attrs: {
																																				"error-reason":
																																					e.authErrorReason,
																																			},
																																		}
																																  )
																																: i(
																																		"div",
																																		{
																																			directives:
																																				[
																																					{
																																						name: "tracker",
																																						rawName:
																																							"v-tracker",
																																						value: {
																																							terms: {
																																								object_id:
																																									"ageAuth",
																																								object_type:
																																									"dialog",
																																							},
																																							type: [
																																								"view",
																																							],
																																						},
																																						expression:
																																							"{\n                    terms: {\n                      object_id: 'ageAuth',\n                      object_type: 'dialog',\n                    },\n                    type: ['view'],\n                  }",
																																					},
																																				],
																																			staticClass:
																																				"authorize-page__content__permission-info__wrap",
																																		},
																																		[
																																			i(
																																				"tap-text",
																																				{
																																					staticClass:
																																						"authorize-page__content__permission-info__title heading-m14-w16 gray-08",
																																				},
																																				[
																																					i(
																																						"span",
																																						{
																																							staticClass:
																																								"authorize-page__content__permission-info__title-content font-bold",
																																						},
																																						[
																																							e._v(
																																								e._s(
																																									e.$lg(
																																										e.resData,
																																										"client.name"
																																									)
																																								)
																																							),
																																						]
																																					),
																																					e._v(
																																						" "
																																					),
																																					i(
																																						"span",
																																						{
																																							staticClass:
																																								"authorize-page__content__permission-info__tips paragraph-m14-w14 gray-06",
																																						},
																																						[
																																							e._v(
																																								" " +
																																									e._s(
																																										e.$t(
																																											"apply_for_using_user_info"
																																										)
																																									) +
																																									" "
																																							),
																																						]
																																					),
																																				]
																																			),
																																			e._v(
																																				" "
																																			),
																																			i(
																																				"div",
																																				{
																																					staticClass:
																																						"auth-divide-line",
																																				}
																																			),
																																			e._v(
																																				" "
																																			),
																																			e._l(
																																				e.independentScopes,
																																				function (
																																					t
																																				) {
																																					return i(
																																						"user-auth-item",
																																						{
																																							key: t.scope,
																																							attrs: {
																																								item: t,
																																							},
																																							on: {
																																								select: e.selectScope,
																																								unSelect:
																																									e.unSelectScope,
																																							},
																																						}
																																					);
																																				}
																																			),
																																			e._v(
																																				" "
																																			),
																																			i(
																																				"section",
																																				{
																																					staticClass:
																																						"gray-04 caption-m10-w12 authorize-page__content__permission-info__edit-tips",
																																				},
																																				[
																																					e._v(
																																						" " +
																																							e._s(
																																								e.$t(
																																									"user_auth_edit_tips"
																																								)
																																							) +
																																							" "
																																					),
																																				]
																																			),
																																		],
																																		2
																																  ),
																															e._v(
																																" "
																															),
																															e.isNeedVerifyEmail &&
																															e.isLandScape
																																? i(
																																		"email-verify-action",
																																		{
																																			on: {
																																				emailVerifyConfirm:
																																					e.reloadAuthorize,
																																			},
																																		}
																																  )
																																: !e.isShowErrorMessage &&
																																  e.isLandScape &&
																																  !e.showUserCertification &&
																																  e.firstMountAuthApi
																																? i(
																																		"authorize-page-action",
																																		{
																																			attrs: {
																																				"auth-error-reason":
																																					e.authErrorReason,
																																				"disable-approve-btn":
																																					e.disableApproveBtn,
																																				scopes: e.trackScopes,
																																				"show-refuse-button":
																																					!e.pcSDK,
																																			},
																																			on: {
																																				agree: e.handleConfirm,
																																				errorConfirm:
																																					e.handleAuthErrorConfirm,
																																				refuse: e.handleCancel,
																																			},
																																		}
																																  )
																																: e._e(),
																														],
																														1
																													),
																												]
																										  ),
																								];
																							},
																							proxy: !0,
																						},
																						e.isShowErrorMessage ||
																						e.isLandScape
																							? null
																							: {
																									key: "contentFooter",
																									fn: function () {
																										return [
																											e.isNeedVerifyEmail
																												? i(
																														"email-verify-action",
																														{
																															on: {
																																emailVerifyConfirm:
																																	e.reloadAuthorize,
																															},
																														}
																												  )
																												: !e.showUserCertification &&
																												  e.firstMountAuthApi
																												? i(
																														"authorize-page-action",
																														{
																															attrs: {
																																"auth-error-reason":
																																	e.authErrorReason,
																																"disable-approve-btn":
																																	e.disableApproveBtn,
																																scopes: e.trackScopes,
																																"show-refuse-button":
																																	!e.pcSDK,
																															},
																															on: {
																																agree: e.handleConfirm,
																																errorConfirm:
																																	e.handleAuthErrorConfirm,
																																refuse: e.handleCancel,
																															},
																														}
																												  )
																												: e._e(),
																										];
																									},
																									proxy: !0,
																							  },
																					],
																					null,
																					!0
																				),
																		}
																	),
																];
															},
															proxy: !0,
														},
													],
													null,
													!0
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
		13488: function (e, t, i) {
			"use strict";
			var n = i(1319),
				r = i(70800),
				a = i(43659),
				s = (i(83454), i(48666)),
				o = i(90317),
				c = i(71634),
				u = i(36428);
			t.Z = {
				data: function () {
					return { isAgreeProtocolShown: !1 };
				},
				computed: (0, a.Z)(
					(0, a.Z)({}, (0, u.rn)(["isIntl", "isInSDK", "isInApp"])),
					{},
					{
						protocol_1: function () {
							return this.isIntl ? s.Jw : s.SP;
						},
						protocol_2: function () {
							return this.isIntl ? s.p : s.m5;
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
							var i =
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
								s =
									'<p class="heading-m14-w16 gray-06" style="font-height:22px">'.concat(
										this.$t("agree_protocol_message", {
											1: i,
											2: a,
										}),
										"</p>"
									);
							(window.__handleProtocolClick = (function () {
								var t = (0, r.Z)(
									(0, n.Z)().mark(function t(i, r) {
										return (0, n.Z)().wrap(
											function (t) {
												for (;;)
													switch ((t.prev = t.next)) {
														case 0:
															if (!e.isInSDK) {
																t.next = 6;
																break;
															}
															return (
																i.preventDefault(),
																(0, o.ZP)(
																	"openBrowser",
																	r
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
																i.preventDefault(),
																(t.prev = 8),
																(t.next = 11),
																(0, c.uo)(
																	"to?url=".concat(
																		encodeURIComponent(
																			r +
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
																	r,
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
								return function (e, i) {
									return t.apply(this, arguments);
								};
							})()),
								this.$confirmNew(s, {
									title: this.$t("agree_protocol_title"),
									confirmText: this.$t("agree_protocol_btn"),
									confirmSite: "single",
									canChangeRoute: !1,
								}).then(function (i) {
									i && t(),
										(e.isAgreeProtocolShown = !1),
										delete window.__handleProtocolClick;
								});
						}
					},
				},
			};
		},
		64757: function (e, t, i) {
			"use strict";
			var n = i(1319),
				r = i(70800),
				a = (i(29161), i(56618)),
				s = i(40685);
			t.Z = {
				data: function () {
					return {
						userNameFlag: "",
						userIdCardFlag: "",
						needCheckChange: !1,
					};
				},
				computed: {
					buttonDisabled: function () {
						return (
							!this.userName ||
							!this.userIdCard ||
							!!this.isAlreadySubmit ||
							!!this.submitLoading ||
							(!!this.needCheckChange &&
								this.userNameFlag === this.userName &&
								this.userIdCardFlag === this.userIdCard)
						);
					},
				},
				methods: {
					handleSubmit: function (e) {
						var t = this;
						return (0, r.Z)(
							(0, n.Z)().mark(function i() {
								return (0, n.Z)().wrap(function (i) {
									for (;;)
										switch ((i.prev = i.next)) {
											case 0:
												if (!t.buttonDisabled) {
													i.next = 2;
													break;
												}
												return i.abrupt("return");
											case 2:
												return i.abrupt(
													"return",
													t.doSubmit(e)
												);
											case 3:
											case "end":
												return i.stop();
										}
								}, i);
							})
						)();
					},
					doSubmit: function (e) {
						var t = this;
						return (0, r.Z)(
							(0, n.Z)().mark(function i() {
								var r, o, c;
								return (0, n.Z)().wrap(function (i) {
									for (;;)
										switch ((i.prev = i.next)) {
											case 0:
												(t.resubmit = !0),
													(t.submitLoading = !0),
													(r = t.$toast({
														loading: !0,
													})),
													(o = t.$lg(
														e,
														"captchaData"
													)),
													(c = {
														real_name: t.userName,
														captcha_type: t.$lg(
															t.$store.state,
															"globalConfig.captcha.captcha_type"
														),
														idcard: t.userIdCard,
													}),
													(t.needCheckChange = !1),
													(t.userNameFlag =
														t.userName),
													(t.userIdCardFlag =
														t.userIdCard),
													o && (c.captcha_data = o),
													(0, s.Q)(c)
														.then(function () {
															t.getUserCertification(),
																(t.submitLoading =
																	!1),
																r.remove();
														})
														.catch(function (e) {
															(0, a.Ew)({
																error: e,
																callback:
																	t.doSubmit,
																button: t.$refs[
																	"submit-button"
																].$el,
															}),
																400 ===
																t.$lg(
																	e,
																	"error.response.status"
																)
																	? ((t.needCheckChange =
																			!0),
																	  (t.submitLoading =
																			!1))
																	: 403 ===
																	  t.$lg(
																			e,
																			"error.response.status"
																	  )
																	? setTimeout(
																			function () {
																				t.submitLoading =
																					!1;
																			},
																			6e4
																	  )
																	: (t.submitLoading =
																			!1);
														})
														.finally(function () {
															r.remove();
														});
											case 10:
											case "end":
												return i.stop();
										}
								}, i);
							})
						)();
					},
				},
			};
		},
		78573: function (e) {
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
		98633: function (e) {
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
		12899: function (e) {
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
		26810: function (e) {
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
		24815: function (e) {
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
		20208: function (e) {
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
		41802: function (e) {
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
		74840: function (e, t, i) {
			"use strict";
			var n = i(23242),
				r = i.n(n),
				a = i(87240),
				s = i.n(a),
				o = new (r())({
					id: "icon-check-box-filled",
					use: "icon-check-box-filled-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol viewBox="0 0 24 24" id="icon-check-box-filled"><mask id="icon-check-box-filled_path-1-inside-1_2148_827"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0723 1.80006C6.81551 1.80817 1.80732 6.17231 1.79994 11.9509C1.79256 17.7295 5.89743 22.2 11.9157 22.2C17.9339 22.2 22.1999 18.3043 22.1999 11.9509C22.1999 5.59752 17.329 1.79196 12.0723 1.80006ZM12.7507 10.6552C11.9242 11.4817 11.3321 12.1854 10.9228 12.7894C10.7373 12.5155 10.4958 12.226 10.1891 11.9193L9.35303 11.0832C8.82946 10.5596 7.98058 10.5596 7.457 11.0832C6.93343 11.6068 6.93343 12.4557 7.457 12.9792L10.1583 15.6806C10.2852 15.8075 10.4633 15.8557 10.6226 15.8186C10.796 15.861 10.9991 15.8029 11.1423 15.6596L16.5843 10.2177C17.0532 9.74875 17.0532 8.98852 16.5843 8.51962C16.1154 8.05073 15.3551 8.05072 14.8862 8.51962L12.7507 10.6552Z" /></mask><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0723 1.80006C6.81551 1.80817 1.80732 6.17231 1.79994 11.9509C1.79256 17.7295 5.89743 22.2 11.9157 22.2C17.9339 22.2 22.1999 18.3043 22.1999 11.9509C22.1999 5.59752 17.329 1.79196 12.0723 1.80006ZM12.7507 10.6552C11.9242 11.4817 11.3321 12.1854 10.9228 12.7894C10.7373 12.5155 10.4958 12.226 10.1891 11.9193L9.35303 11.0832C8.82946 10.5596 7.98058 10.5596 7.457 11.0832C6.93343 11.6068 6.93343 12.4557 7.457 12.9792L10.1583 15.6806C10.2852 15.8075 10.4633 15.8557 10.6226 15.8186C10.796 15.861 10.9991 15.8029 11.1423 15.6596L16.5843 10.2177C17.0532 9.74875 17.0532 8.98852 16.5843 8.51962C16.1154 8.05073 15.3551 8.05072 14.8862 8.51962L12.7507 10.6552Z" /><path d="M1.79994 11.9509L-0.200062 11.9484L1.79994 11.9509ZM12.0723 1.80006L12.0754 3.80006L12.0723 1.80006ZM22.1999 11.9509L20.1999 11.9509L22.1999 11.9509ZM10.9228 12.7894L9.26688 13.911C9.63892 14.4602 10.2591 14.7893 10.9226 14.7894C11.586 14.7895 12.2063 14.4606 12.5784 13.9114L10.9228 12.7894ZM10.1891 11.9193L8.77494 13.3336L8.77494 13.3336L10.1891 11.9193ZM9.35303 11.0832L7.93882 12.4974L7.93882 12.4974L9.35303 11.0832ZM7.457 11.0832L6.04279 9.66901L6.04279 9.66901L7.457 11.0832ZM7.457 12.9792L6.04278 14.3935H6.04278L7.457 12.9792ZM10.1583 15.6806L8.74411 17.0948L8.74411 17.0948L10.1583 15.6806ZM10.6226 15.8186L11.097 13.8757C10.7924 13.8013 10.4746 13.7996 10.1693 13.8707L10.6226 15.8186ZM11.1423 15.6596L12.5565 17.0738L12.5565 17.0738L11.1423 15.6596ZM16.5843 10.2177L17.9985 11.6319V11.6319L16.5843 10.2177ZM16.5843 8.51962L15.17 9.93384L15.17 9.93384L16.5843 8.51962ZM14.8862 8.51962L16.3004 9.93384L16.3004 9.93384L14.8862 8.51962ZM3.79994 11.9535C3.80578 7.3732 7.82247 3.80662 12.0754 3.80006L12.0692 -0.199936C5.80854 -0.190281 -0.191153 4.97143 -0.200062 11.9484L3.79994 11.9535ZM11.9157 20.2C7.06513 20.2 3.79389 16.6897 3.79994 11.9535L-0.200062 11.9484C-0.208772 18.7693 4.72972 24.2 11.9157 24.2V20.2ZM20.1999 11.9509C20.1999 14.6643 19.3001 16.6828 17.9205 18.0239C16.5325 19.3733 14.4901 20.2 11.9157 20.2V24.2C15.3594 24.2 18.4592 23.0789 20.7087 20.892C22.9667 18.697 24.1999 15.591 24.1999 11.9509L20.1999 11.9509ZM12.0754 3.80006C16.3615 3.79345 20.1999 6.8338 20.1999 11.9509L24.1999 11.9509C24.1999 4.36123 18.2965 -0.209539 12.0692 -0.199936L12.0754 3.80006ZM12.5784 13.9114C12.8952 13.444 13.396 12.8383 14.1649 12.0694L11.3365 9.24094C10.4523 10.1251 9.76896 10.9269 9.26715 11.6674L12.5784 13.9114ZM8.77494 13.3336C9.00945 13.5681 9.16515 13.7608 9.26688 13.911L12.5787 11.6678C12.3094 11.2702 11.9821 10.8838 11.6034 10.5051L8.77494 13.3336ZM7.93882 12.4974L8.77494 13.3336L11.6034 10.5051L10.7672 9.66901L7.93882 12.4974ZM8.87121 12.4974C8.61374 12.7549 8.19629 12.7549 7.93882 12.4974L10.7672 9.66901C9.46262 8.36439 7.34741 8.36439 6.04279 9.66901L8.87121 12.4974ZM8.87122 11.565C9.12869 11.8225 9.12869 12.24 8.87122 12.4974L6.04279 9.66901C4.73817 10.9736 4.73817 13.0888 6.04278 14.3935L8.87122 11.565ZM11.5726 14.2664L8.87122 11.565L6.04278 14.3935L8.74411 17.0948L11.5726 14.2664ZM10.1693 13.8707C10.6942 13.7485 11.2191 13.913 11.5725 14.2664L8.74411 17.0948C9.35131 17.702 10.2325 17.9628 11.0759 17.7666L10.1693 13.8707ZM9.7281 14.2454C10.0373 13.9362 10.5366 13.7389 11.097 13.8757L10.1481 17.7615C11.0554 17.9831 11.9608 17.6695 12.5565 17.0738L9.7281 14.2454ZM15.17 8.80344L9.7281 14.2454L12.5565 17.0738L17.9985 11.6319L15.17 8.80344ZM15.17 9.93384C14.8579 9.62169 14.8579 9.11559 15.17 8.80344L17.9985 11.6319C19.2484 10.3819 19.2484 8.35535 17.9985 7.10541L15.17 9.93384ZM16.3004 9.93384C15.9883 10.246 15.4822 10.246 15.17 9.93384L17.9985 7.10541C16.7485 5.85547 14.722 5.85546 13.472 7.10541L16.3004 9.93384ZM14.1649 12.0694L16.3004 9.93384L13.472 7.10541L11.3365 9.24094L14.1649 12.0694Z" mask="url(#icon-check-box-filled_path-1-inside-1_2148_827)" /></symbol>',
				});
			s().add(o);
		},
		39879: function (e, t, i) {
			"use strict";
			var n = i(23242),
				r = i.n(n),
				a = i(87240),
				s = i.n(a),
				o = new (r())({
					id: "icon-check-box",
					use: "icon-check-box-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol viewBox="0 0 24 24" id="icon-check-box"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 4.32869C7.76324 4.32869 4.32863 7.7633 4.32863 12.0001C4.32863 16.2369 7.76324 19.6715 12.0001 19.6715C16.2369 19.6715 19.6715 16.2369 19.6715 12.0001C19.6715 7.7633 16.2369 4.32869 12.0001 4.32869ZM2.52863 12.0001C2.52863 6.76919 6.76913 2.52869 12.0001 2.52869C17.231 2.52869 21.4715 6.76919 21.4715 12.0001C21.4715 17.231 17.231 21.4715 12.0001 21.4715C6.76913 21.4715 2.52863 17.231 2.52863 12.0001Z" /></symbol>',
				});
			s().add(o);
		},
		26530: function (e, t, i) {
			"use strict";
			var n = i(23242),
				r = i.n(n),
				a = i(87240),
				s = i.n(a),
				o = new (r())({
					id: "icon-ico-m28-w28-deny",
					use: "icon-ico-m28-w28-deny-usage",
					viewBox: "0 0 28 28",
					content:
						'<symbol viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" id="icon-ico-m28-w28-deny">\n<circle cx="14" cy="14" r="10" fill="#F64C4C" stroke="#F64C4C" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />\n<path d="M11.1722 16.8284L16.829 11.1716M11.1722 11.1716L16.829 16.8284" stroke="white" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />\n</symbol>',
				});
			s().add(o);
		},
		60188: function (e, t, i) {
			"use strict";
			var n = i(23242),
				r = i.n(n),
				a = i(87240),
				s = i.n(a),
				o = new (r())({
					id: "icon-ico-m28-w28-submitted",
					use: "icon-ico-m28-w28-submitted-usage",
					viewBox: "0 0 28 28",
					content:
						'<symbol viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" id="icon-ico-m28-w28-submitted">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9999 23.9997C19.5227 23.9997 23.9998 19.5226 23.9998 13.9999C23.9998 8.47709 19.5227 4 13.9999 4C8.47717 4 4.00008 8.47709 4.00008 13.9999C4.00008 15.6718 4.41043 17.248 5.1359 18.6331C5.58669 20.3921 5.09717 21.1191 4.20878 22.4386C4.1414 22.5386 4.07173 22.6421 4 22.7497C5.14377 22.7497 6.81901 22.7497 8.39446 22.2821C9.99328 23.3663 11.9226 23.9997 13.9999 23.9997Z" fill="#00D9C5" />\n<path d="M5.1359 18.6331L5.9143 18.4336C5.89889 18.3734 5.87654 18.3153 5.84773 18.2602L5.1359 18.6331ZM4.20878 22.4386L4.87533 22.8874H4.87534L4.20878 22.4386ZM4 22.7497L3.3314 22.304C3.16701 22.5506 3.15169 22.8676 3.29152 23.1289C3.43136 23.3902 3.70365 23.5533 4 23.5533L4 22.7497ZM8.39446 22.2821L8.84546 21.617C8.64613 21.4819 8.39669 21.4432 8.16581 21.5118L8.39446 22.2821ZM23.1962 13.9999C23.1962 19.0788 19.0789 23.1962 13.9999 23.1962V24.8033C19.9665 24.8033 24.8034 19.9664 24.8034 13.9999H23.1962ZM13.9999 4.80356C19.0789 4.80356 23.1962 8.92088 23.1962 13.9999H24.8034C24.8034 8.03329 19.9665 3.19644 13.9999 3.19644V4.80356ZM4.80364 13.9999C4.80364 8.92088 8.92096 4.80356 13.9999 4.80356V3.19644C8.03338 3.19644 3.19652 8.03329 3.19652 13.9999H4.80364ZM5.84773 18.2602C5.18107 16.9874 4.80364 15.5389 4.80364 13.9999H3.19652C3.19652 15.8048 3.63978 17.5085 4.42407 19.0059L5.84773 18.2602ZM4.87534 22.8874C5.30167 22.2542 5.72256 21.6409 5.9415 20.9404C6.17455 20.1947 6.16593 19.4154 5.9143 18.4336L4.35749 18.8326C4.55665 19.6097 4.52867 20.0734 4.40756 20.4609C4.27234 20.8936 4.00427 21.3035 3.54222 21.9898L4.87534 22.8874ZM4.6686 23.1954C4.73916 23.0896 4.80782 22.9876 4.87533 22.8874L3.54222 21.9898C3.47498 22.0897 3.4043 22.1946 3.3314 22.304L4.6686 23.1954ZM8.16581 21.5118C6.71825 21.9414 5.15616 21.9462 4 21.9462V23.5533C5.13139 23.5533 6.91978 23.558 8.6231 23.0524L8.16581 21.5118ZM13.9999 23.1962C12.0884 23.1962 10.3154 22.6138 8.84546 21.617L7.94346 22.9472C9.67117 24.1188 11.7568 24.8033 13.9999 24.8033V23.1962Z" fill="#00D9C5" />\n<circle cx="9.5" cy="14.25" r="1.25" fill="white" />\n<circle cx="18.5" cy="14.25" r="1.25" fill="white" />\n<circle cx="14" cy="14.25" r="1.25" fill="white" />\n</symbol>',
				});
			s().add(o);
		},
		59155: function (e, t, i) {
			"use strict";
			var n = i(23242),
				r = i.n(n),
				a = i(87240),
				s = i.n(a),
				o = new (r())({
					id: "icon-ico-m28-w28-success",
					use: "icon-ico-m28-w28-success-usage",
					viewBox: "0 0 18 18",
					content:
						'<symbol xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" id="icon-ico-m28-w28-success"><path fill="#00CDBA" fill-rule="evenodd" d="M7.629 1.316c-.916.705-2.203 1.353-3.942 1.59-.569.076-.853.115-1.02.22a.825.825 0 0 0-.335.385c-.082.179-.082.428-.082.928V9.6c0 3.304 2.783 6.9 6.75 6.9s6.75-3.525 6.75-7.275V4.44c0-.5 0-.75-.08-.927a.819.819 0 0 0-.332-.383c-.163-.106-.45-.148-1.024-.233a8.63 8.63 0 0 1-3.921-1.602C9.737.805 9.409.56 9.237.515c-.22-.056-.242-.056-.462.004-.17.047-.496.297-1.146.798Zm4.797 5.986A.825.825 0 1 0 11.2 6.198L8.405 9.302l-1.26-1.26A.825.825 0 0 0 5.98 9.208l1.875 1.875a.825.825 0 0 0 1.197-.031l3.375-3.75Z" clip-rule="evenodd" /></symbol>',
				});
			s().add(o);
		},
		7502: function (e, t, i) {
			"use strict";
			e.exports = i.p + "static/img/error.55af7cb1..png";
		},
	},
]);
