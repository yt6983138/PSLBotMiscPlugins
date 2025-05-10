"use strict";
(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[5057],
	{
		71634: function (t, e, n) {
			n.d(e, {
				uo: function () {
					return a;
				},
			});
			var r = n(36558),
				a = function (t) {
					t &&
						(location.href =
							((0, r.DI)()
								? ""
								: "") +
							"/" +
							t);
				};
		},
		19667: function (t, e, n) {
			n.d(e, {
				T: function () {
					return r;
				},
			});
			n(19388);
			var r = function () {
				var t = "landscape",
					e = (screen.orientation && screen.orientation.type) || "";
				return "" === e
					? e
					: (e.indexOf("portrait") > -1 && (t = "portrait"), t);
			};
		},
		2982: function (t, e, n) {
			n.d(e, {
				Ig: function () {
					return h;
				},
				WG: function () {
					return v;
				},
				dN: function () {
					return p;
				},
				wf: function () {
					return d;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = (n(83454), n(38316)),
				i = n(4042),
				c = n(46163),
				u = n(97934),
				s = n(36558),
				f = n(20867),
				l = function (t) {
					var e = {};
					(0, i.lg)(t, "render") &&
						(e.render = (0, i.lg)(t, "render"));
					var n = "api";
					return (
						(0, i.lg)(t, "version") &&
							(n = (0, i.lg)(t, "version")),
						(0, o.Z)(
							"https://www.google.com/recaptcha/"
								.concat(n, ".js")
								.concat(
									(0, c.stringify)(e, { addQueryPrefix: !0 })
								)
						)
					);
				},
				d = (function () {
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, i.lg)(e, "callback")),
												l({
													version: "enterprise",
													render: "explicit",
												}).then(function () {
													s.Qm.$emit(
														"stopCaptchaLoading"
													),
														(0, f.Z)({
															callback: n,
														});
												});
										case 2:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				p = (function () {
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, i.lg)(e, "action")),
												(a = (0, i.lg)(e, "callback")),
												(o = (0, i.lg)(
													u.Z,
													"state.globalConfig.captcha.recaptcha_enterprise_score_key"
												)),
												l({
													version: "enterprise",
													render: o,
												}).then(function () {
													grecaptcha.enterprise.ready(
														function () {
															grecaptcha.enterprise
																.execute(o, {
																	action: n,
																})
																.then(function (
																	t
																) {
																	s.Qm.$emit(
																		"stopCaptchaLoading"
																	),
																		a &&
																			a(
																				t
																			);
																});
														}
													);
												});
										case 4:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				h = (function () {
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, i.lg)(e, "action")),
												(a = (0, i.lg)(e, "callback")),
												(o = (0, i.lg)(
													u.Z,
													"state.globalConfig.captcha.recaptcha_v3_key"
												)),
												l({ render: o }).then(
													function () {
														try {
															grecaptcha.ready(
																function () {
																	grecaptcha
																		.execute(
																			o,
																			{
																				action: n,
																			}
																		)
																		.then(
																			function (
																				t
																			) {
																				s.Qm.$emit(
																					"stopCaptchaLoading"
																				),
																					a &&
																						a(
																							t
																						);
																			}
																		);
																}
															);
														} catch (t) {
															s.Qm.$emit(
																"stopCaptchaLoading"
															);
														}
													}
												);
										case 4:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				v = (function () {
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, i.lg)(e, "callback")),
												(a = (0, i.lg)(e, "button")),
												(o = (0, i.lg)(
													u.Z,
													"state.globalConfig.captcha.recaptcha_v2_key"
												)),
												(window.__tempRecaptchaCallback__ =
													function (t) {
														n && n(t);
													});
											try {
												!a.classList.contains(
													"g-recaptcha"
												) &&
													a.classList.add(
														"g-recaptcha"
													),
													a.setAttribute(
														"data-sitekey",
														o
													),
													a.setAttribute(
														"data-callback",
														"__tempRecaptchaCallback__"
													);
											} catch (t) {}
											l().then(function () {
												try {
													grecaptcha.ready(
														function () {
															grecaptcha.reset(),
																grecaptcha.execute();
														}
													);
												} catch (t) {
												} finally {
													s.Qm.$emit(
														"stopCaptchaLoading"
													);
												}
											});
										case 6:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})();
		},
		42376: function (t, e, n) {
			n.d(e, {
				W: function () {
					return j;
				},
				h: function () {
					return L;
				},
			});
			var r = n(43659),
				a = n(26226),
				o = n.n(a),
				i = n(13546),
				c = n.n(i),
				u = n(45346),
				s = n.n(u),
				f =
					(n(29161),
					n(38138),
					n(42540),
					n(55031),
					n(67096),
					n(33815),
					n(16724),
					n(82886),
					n(3174),
					n(9890),
					n(95326)),
				l = n.n(f),
				d = n(69800),
				p = n.n(d),
				h = n(80097),
				v = n(44542),
				g = n(46163),
				m = n(72395),
				b = n(36558),
				Z = n(82781),
				w = n(66607),
				_ = n(99304),
				y = n(70285),
				k = n(76532),
				x = n(97934),
				T = n(4042),
				S = n(78630),
				P = n(38739),
				C = n(57997),
				O = n(11993)({ storeAsString: !0 }),
				I = S.ZP.getPlatform();
			"web" === I && (I = "PC");
			var L = function () {
				var t,
					e = (0, m.VQ)();
				t = (0, b.Tj)() || (0, b.DI)() ? "AccountsIntl" : "Accounts";
				var n = (0, v.F)(),
					r = p().get("ACCOUNTS_VID"),
					a = {
						V: 1,
						PN: t,
						LANG: e,
						VN_CODE: k.VN_CODE,
						UID: n,
						PLT: I,
					};
				return r && (a.VID = r), (0, g.stringify)(a);
			};
			function A() {
				var t =
					arguments.length > 0 && void 0 !== arguments[0]
						? arguments[0]
						: {};
				return (
					!s()(t, "enableSlowNetworkInterceptor") ||
					t.enableSlowNetworkInterceptor
				);
			}
			var N = new Set();
			var E = l().create({
				timeout: 6e4,
				transformResponse: [
					function (t) {
						if ("string" == typeof t)
							try {
								return O.parse(t);
							} catch (t) {}
						return { isNotJSON: !0, data: t };
					},
				],
			});
			function U(t) {
				var e = t.config.slowNetworkConfig;
				A(t.config) && N.delete(e.id);
				var n = null;
				if (
					-1 === c()(t, "response.status", -1) ||
					c()(t, "isNotJSON")
				) {
					n = -1;
					var a = c()(y.b, "".concat(n), {}).errorMessage;
					b.Qm.$emit("rewriteErrorHappened", a);
				}
				null !== n &&
					(o()(t, "response.status", n), o()(t, "response.code", n)),
					401 === c()(t, "response.status") &&
						b.Qm.$emit("markSignOut");
				var i = t.config;
				i &&
					i.mainRequest &&
					(function () {
						var t =
							arguments.length > 0 && void 0 !== arguments[0]
								? arguments[0]
								: {};
						return (
							!s()(t, "enableCommonErrorPage") ||
							t.enableCommonErrorPage
						);
					})(i) &&
					b.Qm.$emit("pageErrorHappened", c()(t, "response"));
				var u = (0, Z.XZ)(t.response);
				if (
					("captcha.needs" === c()(t, "response.data.data.error") &&
						o()(i, "errorToast", !1),
					(function () {
						var t =
							arguments.length > 0 && void 0 !== arguments[0]
								? arguments[0]
								: {};
						return !s()(t, "errorToast") || t.errorToast;
					})(i))
				) {
					var f = c()(t, "response.data.data.alert", null),
						l = c()(t, "response.data.data.msg", "");
					405 === c()(t, "response.status") &&
						(l = P.Z.t("error_405")),
						f
							? C.default.prototype
									.$confirmNew(f.text, {
										title: f.title,
										confirmText: c()(f, "ok.text"),
										confirmSite: "single",
										confirmType: c()(f, "ok.primary")
											? "primary"
											: "tertiary",
										showHeaderRight: c()(
											i,
											"showHeaderRight",
											!0
										),
									})
									.then(function () {})
							: l && (0, h.Z)({ message: l, duration: 3e3 });
				}
				return Promise.reject(
					(0, r.Z)((0, r.Z)({}, u), {}, { error: t })
				);
			}
			(E.defaults.slowNetworkConfig = { slowTime: 5e3 }),
				E.interceptors.request.use(function (t) {
					var e = (t = t || {}).params || {};
					(t.params = (0, r.Z)(
						(0, r.Z)({}, e),
						{},
						{ "X-UA": L(t) }
					)),
						(t.headers["x-requested-with"] = "XMLHttpRequest"),
						(t.headers["X-UA"] = L(t));
					var n = t.url || "";
					n.startsWith("https://www.taptap.com") &&
						(n = n.replace("https://www.taptap.com", "")),
						(t.url = n),
						"post" === t.method &&
							(t.data = (0, g.stringify)(t.data)),
						(0, T.lg)(x.Z, "state.clientXUA") &&
							(t.headers["X-CLIENT-XUA"] = (0, T.lg)(
								x.Z,
								"state.clientXUA"
							)),
						(0, T.lg)(x.Z, "state.sdkUA") &&
							(t.headers["X-TAP-SDK-UA"] = (0, T.lg)(
								x.Z,
								"state.sdkUA"
							)),
						(0, T.lg)(x.Z, "state.gameScene") &&
							(t.headers["X-Client-Game-Scene"] = (0, T.lg)(
								x.Z,
								"state.gameScene"
							));
					var a = t.slowNetworkConfig;
					if (A(t)) {
						var o = (function (t) {
							return t + new Date().getTime() + Math.random();
						})(t.url);
						N.add(o),
							(a.id = o),
							setTimeout(function () {
								N.has(o) &&
									((0, h.Z)({
										message: P.Z.t("loading_tips"),
										duration: 3e3,
									}),
									N.delete(o));
							}, a.slowTime);
					}
					return t;
				}),
				E.interceptors.response.use(function (t) {
					if (c()(t, "data.isNotJSON")) {
						var e = new Error("The data is not json!");
						e.name = "InvalidJsonData";
						var n = {
							response: t,
							isNotJSON: !0,
							config: t.config,
						};
						return Object.assign(e, n), U(e);
					}
					s()(t, "data.now") && (0, _.wS)(c()(t, "data.now"));
					var r = t.config.slowNetworkConfig;
					return A(t.config) && N.delete(r.id), (0, w.Z)(t);
				}, U);
			var j = E;
		},
		30395: function (t, e, n) {
			n.d(e, {
				$: function () {
					return o;
				},
			});
			n(15096);
			var r = n(99353),
				a = document.querySelector("#firstElement");
			function o() {
				return (0, r.Z)();
			}
			(a && a.length) ||
				(((a = document.createElement("div")).style.visibility =
					"hidden"),
				(a.style.position = "absolute"),
				(a.style.paddingTop = "constant(safe-area-inset-top)"),
				(a.style.paddingTop = "env(safe-area-inset-top)"),
				(a.style.paddingLeft = "constant(safe-area-inset-left)"),
				(a.style.paddingLeft = "env(safe-area-inset-left)"),
				(a.style.paddingBottom = "constant(safe-area-inset-bottom)"),
				(a.style.paddingBottom = "env(safe-area-inset-bottom)"),
				(a.style.paddingRight = "constant(safe-area-inset-right)"),
				(a.style.paddingRight = "env(safe-area-inset-right)"),
				a.setAttribute("id", "firstElement"),
				document.body.insertBefore(a, document.body.firstChild));
		},
		91992: function (t, e, n) {
			n.d(e, {
				Z: function () {
					return o;
				},
			});
			var r = n(73252),
				a = n.n(r);
			function o(t) {
				var e =
					arguments.length > 1 &&
					void 0 !== arguments[1] &&
					arguments[1];
				if (window && document) {
					if (void 0 !== t) {
						var n =
							window.pageXOffset ||
							document.documentElement.scrollLeft ||
							document.body.scrollLeft ||
							0;
						e
							? a().scrollTo("#firstElement", "200")
							: window.scroll(n, t);
					}
					return (
						window.pageYOffset ||
						document.documentElement.scrollTop ||
						document.body.scrollTop ||
						0
					);
				}
				return 0;
			}
		},
		4042: function (t, e, n) {
			n.d(e, {
				Xh: function () {
					return s;
				},
				lg: function () {
					return f;
				},
				xb: function () {
					return l;
				},
			});
			var r = n(29206),
				a = n.n(r),
				o = (n(77837), n(14633), n(26226), n(45346), n(48908)),
				i = n.n(o),
				c = n(13546),
				u = n.n(c);
			n(1945), n(99315);
			function s(t) {
				return JSON.parse(JSON.stringify(t));
			}
			var f = function (t, e) {
					var n =
							arguments.length > 2 && void 0 !== arguments[2]
								? arguments[2]
								: null,
						r =
							arguments.length > 3 &&
							void 0 !== arguments[3] &&
							arguments[3],
						a = u()(t, e, n);
					return (a = i()(a, n)), r ? s(a) : a;
				},
				l = a();
		},
		36558: function (t, e, n) {
			n.d(e, {
				DI: function () {
					return u;
				},
				Nb: function () {
					return c;
				},
				Qm: function () {
					return f;
				},
				Tj: function () {
					return s;
				},
				bg: function () {
					return i;
				},
			});
			n(33815), n(39958);
			var r = n(57997),
				a = n(69800),
				o = n.n(a),
				i = function () {
					return null != o().get("ACCOUNTS_USER_ID");
				},
				c = function (t) {
					var e = window.__tapEnv__ || {},
						n = location.host;
					return e.ACCOUNT_CLUSTER_REGION &&
						"cn" === e.ACCOUNT_CLUSTER_REGION &&
						/^accounts[^.]*\.(xdrnd|taptap)\.com$/.test(n)
						? e["ACCOUNT_" + t + "_TEMP"] ||
								e["ACCOUNT_" + t] ||
								e[t]
						: e["ACCOUNT_" + t] || e[t];
				},
				u = function () {
					return (
						"hk" === c("CLUSTER_REGION") ||
						"intl" === c("CLUSTER_REGION")
					);
				},
				s = function () {
					return "true" === c("IS_GLOBAL") || u();
				},
				f = new r.default();
		},
		37050: function (t, e, n) {
			n.d(e, {
				J: function () {
					return s;
				},
			});
			var r = n(1319),
				a = n(43659),
				o = n(70800),
				i = (n(3174), n(29161), n(86591), n(4042)),
				c = n(36558),
				u = n(38316),
				s = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, o, s, f, l, d, p;
							return (0, r.Z)().wrap(
								function (t) {
									for (;;)
										switch ((t.prev = t.next)) {
											case 0:
												if (
													((n = (0, i.lg)(
														e,
														"callback"
													)),
													(o = (0, i.lg)(
														e,
														"onCancel"
													)),
													(s = (0, i.lg)(
														e,
														"captcha_app_id"
													)),
													(t.prev = 3),
													!(0, c.DI)())
												) {
													t.next = 9;
													break;
												}
												return (
													(t.next = 7),
													(0, u.Z)(
														"https://sg.captcha.qcloud.com/TCaptcha-global.js"
													)
												);
											case 7:
												t.next = 11;
												break;
											case 9:
												return (
													(t.next = 11),
													(0, u.Z)(
														"https://turing.captcha.qcloud.com/TCaptcha.js"
													)
												);
											case 11:
												(f = new window.TencentCaptcha(
													s,
													function (t) {
														if (
															!(0, i.lg)(
																t,
																"ticket"
															)
														)
															return (
																o && o(),
																void c.Qm.$emit(
																	"stopCaptchaLoading"
																)
															);
														var r = (0, a.Z)(
															(0, a.Z)({}, e),
															t
														);
														n && n(r),
															f.destroy(),
															setTimeout(
																function () {
																	f = null;
																},
																0
															);
													},
													{}
												)),
													f.show(),
													(t.next = 23);
												break;
											case 15:
												(t.prev = 15),
													(t.t0 = t.catch(3)),
													(l =
														"terror_1001_" +
														s +
														Math.floor(
															new Date().getTime() /
																1e3
														)),
													(d = {
														ret: 0,
														randstr:
															"@" +
															Math.random()
																.toString(36)
																.substr(2),
														ticket: l,
														errorCode: 1001,
														errorMessage:
															"jsload_error",
													}),
													(p = (0, a.Z)(
														(0, a.Z)({}, e),
														d
													)),
													n && n(p);
											case 23:
											case "end":
												return t.stop();
										}
								},
								t,
								null,
								[[3, 15]]
							);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})();
		},
		56455: function (t, e, n) {
			n.d(e, {
				g: function () {
					return p;
				},
			});
			n(29161),
				n(42540),
				n(55031),
				n(1945),
				n(92094),
				n(95661),
				n(9079),
				n(20599);
			var r = n(53244),
				a = n(4042),
				o = n(91119),
				i = n(69800),
				c = n.n(i),
				u = n(90317),
				s = n(36558),
				f = {
					color: {
						light: function () {
							return (0, s.Tj)()
								? n.e(271).then(n.t.bind(n, 28026, 23))
								: n.e(8594).then(n.t.bind(n, 82778, 23));
						},
						dark: function () {
							return (0, s.Tj)()
								? n.e(4519).then(n.t.bind(n, 85856, 23))
								: n.e(4197).then(n.t.bind(n, 43445, 23));
						},
					},
					layout: {
						pc: function () {
							return n.e(39).then(n.t.bind(n, 41524, 23));
						},
						mobile: function () {
							return n.e(2218).then(n.t.bind(n, 85751, 23));
						},
					},
				},
				l = { color: {}, layout: {} };
			function d(t) {
				return document.querySelector('[href*="theme/'.concat(t, '"]'));
			}
			var p = function () {
				var t, e;
				if ((0, u.ZP)("tapEnv")) {
					var n = JSON.parse((0, u.ZP)("tapEnv")),
						i = (0, a.lg)(n, "THEME");
					if ("dark" === i) return o.$;
					if ("light" === i) return o.f;
				}
				switch ((0, a.lg)((0, r.vl)(), "theme_mode")) {
					case "night":
						return o.$;
					case "day":
					case "light":
						return o.f;
				}
				switch (c().get("tap_theme")) {
					case "dark":
						return o.$;
					case "light":
						return o.f;
				}
				return (null !==
					(t = (
						"undefined" == typeof window ||
							"function" !=
								typeof (null === (e = window) || void 0 === e
									? void 0
									: e.matchMedia)
							? function (t) {
									return { media: t, matches: !1 };
							  }
							: window.matchMedia
					)("(prefers-color-scheme: dark)")) &&
					void 0 !== t &&
					t.matches) ||
					(0, s.Tj)()
					? o.$
					: o.f;
			};
			e.Z = function (t) {
				return new Promise(function (e, n) {
					try {
						var r = function (t) {
								o--, t && t.remove(), 0 === o && e();
							},
							a = Object.keys(t),
							o = a.length;
						a.forEach(function (e) {
							var n = t[e],
								a = d(e);
							l[e][n]
								? (!(function (t) {
										document.head.appendChild(
											t.cloneNode(!0)
										);
								  })(l[e][n]),
								  r(a))
								: f[e][n] &&
								  f[e][n]().then(function () {
										r(a), (l[e][n] = d(e).cloneNode(!0));
								  });
						});
					} catch (t) {
						n(t);
					}
				});
			};
		},
		99304: function (t, e, n) {
			n.d(e, {
				on: function () {
					return a;
				},
				wS: function () {
					return r;
				},
			});
			n(33815), n(37416), n(3174), n(29161), n(86591), n(75406), n(16724);
			var r = function (t) {
					t && t > 0 && 1e3 * t - new Date().getTime();
				},
				a = function (t) {
					var e = t;
					return (
						"number" == typeof t && (e = new Date(1e3 * t)),
						{
							year: e.getFullYear(),
							month: e.getMonth() + 1,
							date: e.getDate(),
							day: e.getDay(),
							hours: e.getHours(),
							minutes: e.getMinutes(),
							seconds: e.getSeconds(),
							timeZone: o(e),
						}
					);
				},
				o = function (t) {
					var e = t.toString().match(/GMT[+-]\d+/);
					return e && e[0];
				};
		},
		82712: function (t, e, n) {
			n.d(e, {
				Pf: function () {
					return u;
				},
			});
			var r = n(43659),
				a = (n(33815), n(42936), n(9890), n(1945), n(24591)),
				o = n(97934),
				i = n(90317),
				c = n(51328);
			function u() {
				var t =
						arguments.length > 0 && void 0 !== arguments[0]
							? arguments[0]
							: {},
					e = o.Z.getters.getSessionInfo;
				return (0, r.Z)(
					(0, r.Z)(
						(0, r.Z)({}, o.Z.getters.getQueryCtx),
						(function () {
							if (o.Z.getters.getTrackInfo) {
								return JSON.parse(o.Z.getters.getTrackInfo);
							}
							return {};
						})()
					),
					{},
					{
						uri: window.location.pathname + window.location.search,
						is_has_taptap: o.Z.getters.getIsInApp ? 1 : 0,
						session_id: e.session_id,
						session_type: e.session_type,
						taptap_login_type:
							"Device" === a.Z.currentRoute.name ||
							"ThirdPartyGuide" === a.Z.currentRoute.name
								? "pc_qrcode"
								: void 0,
					},
					t.ctx
				);
			}
			e.ZP = function (t, e, n) {
				((t = t || {}).ctx = u(t)),
					o.Z.getters.getIsInApp &&
						(0, i.ZP)(
							"clientSendTrack",
							(0, r.Z)(
								(0, r.Z)({}, t),
								{},
								{ extra: (0, r.Z)({}, e) }
							)
						),
					(0, c.I)(
						(0, r.Z)(
							{
								customParam: (0, r.Z)(
									(0, r.Z)({}, t),
									{},
									{ extra: (0, r.Z)({}, e) }
								),
								customLogStore: "web-logs",
								needPosition: !1,
							},
							n
						)
					);
			};
		},
		25602: function (t, e, n) {
			var r = n(43659),
				a = n(51328),
				o = n(78630),
				i = n(97934),
				c = n(4042);
			e.Z = function (t, e) {
				(t = t || {}),
					(o.ZP.is("AndroidSDK") || o.ZP.is("iOSSDK")) &&
						(t.sdk_ua = (0, c.lg)(i.Z, "state.sdkUA", "")),
					(0, c.lg)(i.Z, "state.clientXUA", "") &&
						(t.client_xua = (0, c.lg)(i.Z, "state.clientXUA", "")),
					(0, a.I)(
						(0, r.Z)(
							{
								customParam: t,
								customLogStore: "client_user_logs",
								needPosition: !1,
							},
							e
						)
					);
			};
		},
		68485: function (t, e, n) {
			n.d(e, {
				P_: function () {
					return i;
				},
				c2: function () {
					return a;
				},
				u5: function () {
					return c;
				},
			});
			var r = n(42376),
				a = { rootMargin: "0px", threshold: 0 },
				o = "web_accounts_logs",
				i = function () {
					return o;
				},
				c = r.h;
		},
		19523: function (t, e, n) {
			var r = n(51101),
				a = n(36838),
				o = n(26226),
				i = n.n(o),
				c = n(13546),
				u = n.n(c),
				s =
					(n(28469),
					n(77265),
					n(9864),
					n(92094),
					n(29161),
					n(95661),
					n(9079),
					n(20599),
					n(51328)),
				f = n(68485),
				l = n(16559),
				d = (function () {
					function t(e, n) {
						(0, r.Z)(this, t),
							(this.vue = e),
							(this.observer = null),
							(this.viewQueues = []),
							(this.observerOptions = n || f.c2),
							(this.paramsV2 = null),
							(this.params_ = []),
							(this.uri_ = ""),
							this.init();
					}
					return (
						(0, a.Z)(t, [
							{
								key: "init",
								value: function () {
									this.observer = new IntersectionObserver(
										this.observerHandler.bind(this),
										this.observerOptions
									);
								},
							},
							{
								key: "bind",
								value: function (t, e) {
									var n = this;
									Object.prototype.hasOwnProperty.call(
										e.value,
										"trackerType"
									) || t.setAttribute("data-booth-item", ""),
										(t.bindingValue = e.value),
										e.value.type.includes("view") &&
											(this.viewQueues.push({
												loaded: !1,
												el: t,
												binding: e,
											}),
											this.vue.nextTick(function () {
												n.observer &&
													(n.observer.unobserve(t),
													n.observer.observe(t));
											})),
										e.value.type.includes("click") &&
											(t.removeEventListener(
												"click",
												t.clickEvent,
												!0
											),
											(t.clickEvent = function () {
												(0, s.uH)(t);
											}),
											t.addEventListener(
												"click",
												t.clickEvent,
												!0
											));
								},
							},
							{
								key: "inserted",
								value: function (t) {
									u()(t, "dataset.boothLevel") ||
										i()(
											t,
											"dataset.boothLevel",
											(0, l.O9)(t) + 1
										);
								},
							},
							{
								key: "update",
								value: function (t, e) {
									setTimeout(function () {
										t.bindingValue = e.value;
									}, 0);
								},
							},
							{
								key: "observerHandler",
								value: function (t) {
									var e = this;
									t.forEach(function (t) {
										t.isIntersecting &&
											e.viewQueues.forEach(function (n) {
												if (n.el === t.target) {
													if (n.loaded)
														return e.observer.unobserve(
															n.el
														);
													(n.loaded = !0),
														(0, s.SB)(n.el);
												}
											});
									});
								},
							},
						]),
						t
					);
				})();
			e.Z = d;
		},
		51328: function (t, e, n) {
			n.d(e, {
				BS: function () {
					return k;
				},
				I: function () {
					return x;
				},
				SB: function () {
					return y;
				},
				uH: function () {
					return w;
				},
				ux: function () {
					return Z;
				},
			});
			var r = n(43659),
				a = n(1319),
				o = n(70800),
				i = n(29206),
				c = n.n(i),
				u =
					(n(9890),
					n(92094),
					n(29161),
					n(95661),
					n(9079),
					n(20599),
					n(91359),
					n(9864),
					n(1638),
					n(1945),
					n(83454),
					n(93793),
					n(99315),
					n(28469),
					n(77265),
					n(53244)),
				s = n(16559),
				f = n(44542),
				l = n(24591),
				d = n(29298),
				p = n(97934),
				h = n(78630),
				v = n(12736),
				g = n(4042),
				m = n(69878),
				b = n(68485);
			n(69800), n(31685), n(72395);
			m.Z.get("showLogConsole");
			var Z = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i, c, f, d, p, h, v, m, b, Z, w, _;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											if (
												((n = e.logParams),
												(r = e.useEventLog),
												(o = e.eventLogParams),
												(i = e.gUrl),
												(c = e.boothDom),
												(f = void 0 !== c && c),
												(d = e.logUrl),
												(p = void 0 === d ? "" : d),
												(m = !1),
												!r)
											) {
												t.next = 13;
												break;
											}
											return (
												(t.next = 5),
												L({
													currentTrackValue: o,
													action: "page_view",
													boothInfo: (0, s.iG)(f, !0),
												})
											);
										case 5:
											return (
												(v = t.sent),
												i && (v["G-URL"] = i),
												(t.next = 9),
												S(p)
											);
										case 9:
											(h = t.sent),
												(m = !0),
												(t.next = 24);
											break;
										case 13:
											return (t.next = 15), A("pageView");
										case 15:
											return (
												(v = t.sent),
												(b = (0, g.lg)(
													n,
													"page_view.params",
													{}
												)),
												(t.next = 19),
												C(n)
											);
										case 19:
											(h = t.sent),
												(v = Object.assign(v, b)),
												(Z = (0, u.jq)(location.href)),
												(w = Z.path),
												"AppDetail" ===
												(_ =
													l.Z.resolve(w).resolved
														.name)
													? ("baidu" ===
															v.utm_source &&
															"sem" ===
																v.utm_medium &&
															(v.via =
																"baidusem"),
													  (v = N(v)))
													: "TopicDetail" === _ &&
													  (v = N(v));
										case 24:
											(v = O(v)), (v = U(v, m)), T(v, h);
										case 27:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				w = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, i, c, u;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(n = e.bindingValue),
												(r = {}),
												(t.next = 4),
												S(
													(0, g.lg)(
														n,
														"customLogStore",
														void 0
													)
												)
											);
										case 4:
											if (
												((i = t.sent),
												(c = (function () {
													var t = (0, o.Z)(
														(0, a.Z)().mark(
															function t(r) {
																return (0,
																a.Z)().wrap(
																	function (
																		t
																	) {
																		for (;;)
																			switch (
																				(t.prev =
																					t.next)
																			) {
																				case 0:
																					return t.abrupt(
																						"return",
																						L(
																							{
																								currentTrackValue:
																									n,
																								action: r,
																								isDirectiveValue:
																									!0,
																								boothInfo:
																									(0,
																									s.iG)(
																										e
																									),
																							}
																						)
																					);
																				case 1:
																				case "end":
																					return t.stop();
																			}
																	},
																	t
																);
															}
														)
													);
													return function (e) {
														return t.apply(
															this,
															arguments
														);
													};
												})()),
												!(u = n.trackerType))
											) {
												t.next = 12;
												break;
											}
											(Array.isArray(u)
												? u
												: [u]
											).forEach(
												(function () {
													var t = (0, o.Z)(
														(0, a.Z)().mark(
															function t(e) {
																var n, o, u;
																return (0,
																a.Z)().wrap(
																	function (
																		t
																	) {
																		for (;;)
																			switch (
																				(t.prev =
																					t.next)
																			) {
																				case 0:
																					if (
																						((n =
																							E()),
																						(o =
																							n.fromSearchPage),
																						(u =
																							n.keyword),
																						"appButtonClick" !==
																							e)
																					) {
																						t.next = 4;
																						break;
																					}
																					if (
																						o &&
																						u
																					) {
																						t.next = 4;
																						break;
																					}
																					return t.abrupt(
																						"return",
																						null
																					);
																				case 4:
																					return (
																						(t.next = 6),
																						c(
																							e
																						)
																					);
																				case 6:
																					(r =
																						t.sent),
																						(r =
																							N(
																								r
																							)),
																						_(
																							r,
																							i
																						);
																				case 9:
																				case "end":
																					return t.stop();
																			}
																	},
																	t
																);
															}
														)
													);
													return function (e) {
														return t.apply(
															this,
															arguments
														);
													};
												})()
											),
												(t.next = 16);
											break;
										case 12:
											return (t.next = 14), c("click");
										case 14:
											(r = t.sent), _(r, i);
										case 16:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				_ = function (t, e) {
					var n = O(t),
						r = {};
					["via", "property"].map(function (t) {
						Object.prototype.hasOwnProperty.call(n, t) &&
							(r[t] = n[t]);
					}),
						(0, g.xb)(r) ||
							(0, s.$A)({ logParam: { needToPassParams: r } }),
						T(n, e);
				},
				y = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(n = e.bindingValue),
												(t.next = 3),
												L({
													currentTrackValue: n,
													action: "view",
													isDirectiveValue: !0,
													boothInfo: (0, s.iG)(e),
												})
											);
										case 3:
											return (
												(r = t.sent),
												(r = O(r)),
												(t.t0 = T),
												(t.t1 = r),
												(t.next = 9),
												S(
													(0, g.lg)(
														n,
														"customLogStore",
														void 0
													)
												)
											);
										case 9:
											(t.t2 = t.sent),
												(0, t.t0)(t.t1, t.t2);
										case 11:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				k = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, o;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(n =
													l.Z.app &&
													l.Z.app.$el &&
													l.Z.app.$el.querySelector(
														"[data-booth]"
													)),
												(t.next = 3),
												L({
													currentTrackValue: (0, r.Z)(
														(0, r.Z)(
															{},
															(0, s.jN)()
																.mainRequestParams
														),
														{},
														{ duration: e }
													),
													action: "read",
													boothInfo: (0, s.iG)(n, !0),
												})
											);
										case 3:
											return (
												(o = t.sent),
												(t.t0 = T),
												(t.t1 = o),
												(t.next = 8),
												S()
											);
										case 8:
											(t.t2 = t.sent),
												(0, t.t0)(t.t1, t.t2);
										case 10:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				x = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n,
								o,
								i,
								c,
								u,
								f,
								l,
								d,
								p,
								h,
								v,
								g,
								m,
								b,
								Z,
								w,
								_,
								y,
								k,
								x,
								P,
								C,
								I,
								N;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											if (
												((n = e.customParam),
												(o = void 0 === n ? {} : n),
												(i = e.eventVersion),
												(c = void 0 === i ? "v2" : i),
												(u = e.needPageParams),
												(f = void 0 === u || u),
												(l = e.needPosition),
												(d = void 0 === l || l),
												(p = e.needReferer),
												(h = void 0 === p || p),
												(v = e.customUrl),
												(g = void 0 === v ? "" : v),
												(m = e.isDirectiveValue),
												(b = void 0 !== m && m),
												(Z = e.boothInfo),
												(w = void 0 === Z ? {} : Z),
												(_ = e.customLogStore),
												(y = e.delayTrack),
												(k = void 0 !== y && y),
												(x = e.logTopic),
												"v2" !== c)
											) {
												t.next = 14;
												break;
											}
											return (
												(I = o.action),
												(t.next = 5),
												L({
													action: I,
													currentTrackValue: o,
													isDirectiveValue: b,
													boothInfo: w,
												})
											);
										case 5:
											if (
												((P = t.sent), (t.t0 = g), t.t0)
											) {
												t.next = 11;
												break;
											}
											return (t.next = 10), S(_);
										case 10:
											t.t0 = t.sent;
										case 11:
											(C = t.t0), (t.next = 24);
											break;
										case 14:
											return (
												(N = o.type),
												(t.next = 17),
												A(N)
											);
										case 17:
											if (
												((P = t.sent), (t.t1 = g), t.t1)
											) {
												t.next = 23;
												break;
											}
											return (
												(t.next = 22), S(_ || "logs")
											);
										case 22:
											t.t1 = t.sent;
										case 23:
											C = t.t1;
										case 24:
											if (
												(d && (P = O(P)),
												f &&
													(P = (0, r.Z)(
														(0, r.Z)(
															{},
															(0, s.jN)()
																.mainRequestParams
														),
														P
													)),
												h && (P = U(P)),
												x && (P.__topic__ = x),
												!k)
											) {
												t.next = 30;
												break;
											}
											return t.abrupt(
												"return",
												function (t) {
													return T(
														(0, r.Z)(
															(0, r.Z)({}, P),
															t
														),
														C
													);
												}
											);
										case 30:
											T(P, C);
										case 31:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				T = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e, n) {
							var r, o, i, c;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											if (
												((r = { t_log_id: (0, v.Z)() }),
												Object.assign(e, r),
												!(0, g.lg)(
													e,
													"isSaveTrackerToLocal",
													!1
												))
											) {
												t.next = 6;
												break;
											}
											return (
												delete e.isSaveTrackerToLocal,
												(a = {
													params: e,
													customUrl: n,
												}),
												(u = void 0),
												(u =
													m.Z.get("tracker_logs") ||
													[]).push(a),
												m.Z.set("tracker_logs", u),
												t.abrupt("return")
											);
										case 6:
											if (
												(Object.keys(e).map(function (
													t
												) {
													(void 0 !== e[t] &&
														null !== e[t]) ||
														delete e[t];
												}),
												(o = Object.keys(e)
													.map(function (t) {
														var n = e[t];
														return (
															"string" !=
																typeof n &&
																(n =
																	JSON.stringify(
																		n
																	)),
															encodeURIComponent(
																t
															) +
																"=" +
																encodeURIComponent(
																	n
																)
														);
													})
													.join("&")),
												!n)
											) {
												t.next = 13;
												break;
											}
											(t.t0 = n), (t.next = 16);
											break;
										case 13:
											return (t.next = 15), S();
										case 15:
											t.t0 = t.sent;
										case 16:
											(i = t.t0),
												((c =
													document.createElement(
														"img"
													)).height = 1),
												(c.width = 1),
												(c.src = ""
													.concat(
														i,
														"?APIVersion=0.6.0&"
													)
													.concat(o));
										case 21:
										case "end":
											return t.stop();
									}
								var a, u;
							}, t);
						})
					);
					return function (e, n) {
						return t.apply(this, arguments);
					};
				})(),
				S = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (t.next = 2), d.up;
										case 2:
											return (
												(n = P(e)),
												(r =
													p.Z.state.globalConfig ||
													{}),
												(o = (0, g.lg)(
													r,
													"aliyun_log.endpoint"
												)),
												(i = (0, g.lg)(
													r,
													"aliyun_log.project"
												)),
												t.abrupt(
													"return",
													"/track.gif"
													// "https://"
													// 	.concat(i, ".")
													// 	.concat(
													// 		o,
													// 		"/logstores/"
													// 	)
													// 	.concat(n, "/track.gif")
												)
											);
										case 7:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				P = function (t) {
					return (
						t ||
						(0, g.lg)(
							l.Z.currentRoute,
							"meta.customPageLogStore",
							(0, b.P_)()
						)
					);
				},
				C = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(t.t0 = g.lg),
												(t.t1 = e),
												(t.next = 4),
												S("logs")
											);
										case 4:
											return (
												(t.t2 = t.sent),
												t.abrupt(
													"return",
													(0, t.t0)(
														t.t1,
														"page_view.uri",
														t.t2
													)
												)
											);
										case 6:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				O = function (t) {
					var e = (0, s.Ix)();
					return (
						!Object.prototype.hasOwnProperty.call(t, "position") &&
							e &&
							(t.position = e),
						t
					);
				},
				I = function () {
					var t = (0, s.jN)(),
						e = t.rBoothInfo,
						n = t.needToPassParams,
						r = {};
					if (
						(n &&
							Object.keys(n).map(function (t) {
								var e = "r_".concat(t);
								!r[e] && (r[e] = n[t]);
							}),
						e)
					) {
						var a = e.booth,
							o = e.booth_id,
							i = e.booth_index;
						(r.r_booth = a),
							(r.r_booth_id = o),
							(r.r_booth_index = i);
					}
					return r;
				},
				L = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, o, i, c, u, s, l, h, v;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(n = e.currentTrackValue),
												(o = e.action),
												(i = e.isDirectiveValue),
												(c = void 0 !== i && i),
												(u = e.boothInfo),
												(s = void 0 === u ? {} : u),
												(l = c ? n.event_log : n),
												(t.next = 4),
												d.up
											);
										case 4:
											return (
												(h =
													p.Z.state.globalConfig ||
													{}),
												(t.t0 = r.Z),
												(t.t1 = r.Z),
												(t.t2 = r.Z),
												(t.next = 10),
												(0, b.u5)()
											);
										case 10:
											return (
												(t.t3 = t.sent),
												(t.t4 =
													location.origin +
													location.pathname),
												(t.t5 = p.Z.state.referrer
													? p.Z.state.referrer
													: document.referrer),
												(t.t6 = h.XDT),
												(t.t7 = (0, f.F)()),
												(t.t8 = o),
												(t.t9 = {
													LOG_TYPE: "events",
													XUA: t.t3,
													"G-URL": t.t4,
													"G-REFERER": t.t5,
													XDT: t.t6,
													UID: t.t7,
													action: t.t8,
												}),
												(t.t10 = l),
												(t.t11 = (0, t.t2)(
													t.t9,
													t.t10
												)),
												(t.t12 = (0, g.lg)(
													n,
													"terms",
													{}
												)),
												(t.t13 = (0, t.t1)(
													t.t11,
													t.t12
												)),
												(t.t14 = s),
												(v = (0, t.t0)(t.t13, t.t14)),
												p.Z.state.profile &&
													p.Z.state.profile.XUT &&
													(v.XUT =
														p.Z.state.profile.XUT),
												p.Z.state.isIntl &&
													(p.Z.state.isInSDK &&
														(v.ctx = (0, r.Z)(
															(0, r.Z)({}, v.ctx),
															{},
															{ in_sdk: !0 }
														)),
													p.Z.state.isInApp &&
														(v.ctx = (0, r.Z)(
															(0, r.Z)({}, v.ctx),
															{},
															{ in_app: !0 }
														))),
												t.abrupt(
													"return",
													(0, r.Z)(
														(0, r.Z)({}, I()),
														v
													)
												)
											);
										case 26:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				A = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (t.next = 2), (0, b.u5)();
										case 2:
											return (
												(t.t0 = t.sent),
												(t.t1 = (0, f.F)()),
												(t.t2 = h.ZP.is("emulator")
													? "emulator"
													: "web"),
												(t.t3 =
													location.origin +
													location.pathname),
												(t.t4 = p.Z.state.referrer
													? p.Z.state.referrer
													: document.referrer),
												(t.t5 = e),
												(n = {
													"X-UA": t.t0,
													UID: t.t1,
													platform: t.t2,
													paramUrl: t.t3,
													paramReferer: t.t4,
													type: t.t5,
												}),
												h.ZP.is("Android")
													? (n.ch = "Android")
													: h.ZP.is("iOS")
													? (n.ch = "iOS")
													: (n.ch = "PC"),
												(r = (0, u.vl)()),
												(o = r.utm_source),
												(i = r.utm_medium),
												o && (n.utm_source = o),
												i && (n.utm_medium = i),
												t.abrupt("return", n)
											);
										case 14:
										case "end":
											return t.stop();
									}
							}, t);
						})
					);
					return function (e) {
						return t.apply(this, arguments);
					};
				})(),
				N = function (t) {
					var e = E(),
						n = e.fromSearchPage,
						r = e.keyword,
						a = e.referer;
					return n && r && ((t.referer = a), (t.keyWord = r)), t;
				},
				E = function () {
					var t = !1,
						e = null,
						n = null,
						r = p.Z.state.referrer
							? p.Z.state.referrer
							: document.referrer,
						a = (0, u.jq)(r).path;
					if (a) {
						var o = l.Z.resolve(a).resolved,
							i = o.name,
							c = o.params;
						if ("search" === i) {
							var s = c.type,
								f = c.keywords;
							void 0 === f && s && ((f = s), (s = "search")),
								(t = !0),
								(n = "search"),
								(e = "".concat(s, "/").concat(f));
						} else if (
							"AppGroupSearch" === i ||
							"OfficialGroupSearch" === i
						) {
							(t = !0), (n = "group_search"), (e = c.keywords);
						}
					}
					try {
						e = decodeURIComponent(e);
					} catch (t) {}
					return { fromSearchPage: t, keyword: e, referer: n };
				},
				U = function (t, e) {
					if (!Object.prototype.hasOwnProperty.call(t, "referer")) {
						var n = (0, s.jN)().refererLogParams;
						if ((0, g.lg)(n, "referer") && !c()(n.referer)) {
							var r = n.referer,
								a = n.referer_ext;
							(t.referer = r),
								a &&
									!e &&
									(t.referer += ""
										.concat(
											t.referer.includes("|") ? "," : "|"
										)
										.concat(a));
						}
					}
					return t;
				};
		},
		12452: function (t, e, n) {
			n.d(e, {
				T: function () {
					return u;
				},
			});
			var r = n(13546),
				a = n.n(r),
				o = n(16559),
				i = function (t) {
					return a()(t, "$options.isLogBooth", !1);
				},
				c = function (t) {
					t &&
						t.$el &&
						t.$el.setAttribute &&
						i(t) &&
						!Object.prototype.hasOwnProperty.call(
							t.$el.dataset || {},
							"boothId"
						) &&
						(t.$el.setAttribute("data-booth", i(t)),
						t.$el.setAttribute("data-booth-id", (0, o.h3)()));
				},
				u = {
					mounted: function () {
						i(this) &&
							this.$options &&
							!a()(this.$el, "dataset.boothLevel") &&
							a()(this.$el, "setAttribute", null) &&
							this.$el.setAttribute(
								"data-booth-level",
								(0, o.O9)(this.$el) + 1
							),
							c(this);
					},
					updated: function () {
						c(this);
					},
				};
		},
		78674: function (t, e, n) {
			n.d(e, {
				TC: function () {
					return u;
				},
			});
			n(75406);
			var r,
				a = n(51328),
				o = n(16559),
				i = function () {
					return new Date().getTime();
				},
				c = function () {
					if (r) {
						var t = parseInt("".concat((i() - r) / 1e3));
						(r = 0), (0, o.A8)() && (0, a.BS)(t);
					}
				},
				u = function () {
					document.addEventListener(
						"visibilitychange",
						function () {
							"visible" === document.visibilityState
								? (c(), (r = i()))
								: "hidden" === document.visibilityState && c();
						},
						!0
					),
						(window.onunload = function () {
							c("onunload");
						}),
						window.addEventListener("beforeunload", function () {
							c("beforeunload");
						});
				};
		},
		16559: function (t, e, n) {
			n.d(e, {
				$A: function () {
					return h;
				},
				A8: function () {
					return m;
				},
				Ix: function () {
					return v;
				},
				O9: function () {
					return w;
				},
				h3: function () {
					return _;
				},
				iG: function () {
					return b;
				},
				jN: function () {
					return p;
				},
			});
			var r = n(59908),
				a = (n(29206), n(13546)),
				o = n.n(a),
				i = n(26226),
				c = n.n(i),
				u =
					(n(28469),
					n(77265),
					n(93793),
					n(36766),
					n(29161),
					n(95661),
					n(3117),
					n(95271),
					n(91359),
					n(19388),
					n(9864),
					n(33815),
					n(16724),
					n(4042)),
				s = n(24591),
				f = (n(68485), n(12736)),
				l = n(69878),
				d = {},
				p =
					(l.Z.get("showLogConsole"),
					function () {
						var t =
							arguments.length > 0 && void 0 !== arguments[0]
								? arguments[0]
								: s.Z.currentRoute;
						return g(t)
							? d[g(t)] || {}
							: (0, u.lg)(t, "params._trackParams", {});
					}),
				h = function (t) {
					var e = t.logParam,
						n = t.targetRoute,
						r = void 0 === n ? s.Z.currentRoute : n,
						a = p(r);
					if (g(r)) {
						var o = g(r);
						(a = d[o]), c()(d, o, Object.assign({}, a, e));
					} else
						c()(r, "params._trackParams", Object.assign({}, a, e));
				},
				v = function () {
					var t =
						arguments.length > 0 && void 0 !== arguments[0]
							? arguments[0]
							: s.Z.currentRoute;
					return o()(t, "meta.routeLogParams.position", "").split(
						"|"
					)[0];
				},
				g = function (t) {
					return o()(t, "meta.routeLogParams.extendParent", !1);
				},
				m = function () {
					return o()(s.Z.currentRoute, "meta.needReadTracker", !1);
				},
				b = function (t) {
					for (
						var e =
								arguments.length > 1 &&
								void 0 !== arguments[1] &&
								arguments[1],
							n = [],
							r = [],
							a = [],
							o = [],
							i = t;
						t && !Z(t);

					)
						t.dataset &&
							t.dataset.booth &&
							(Object.prototype.hasOwnProperty.call(
								t.dataset,
								"boothId"
							) ||
								(t.setAttribute("data-booth-id", _()),
								t.setAttribute("data-booth-level", w(t))),
							n.unshift(t.dataset.booth),
							r.unshift(t.dataset.boothId),
							o.unshift(t)),
							(t = t.parentNode);
					e || (o[n.length - 1] === i && (o.pop(), r.pop(), n.pop()));
					return (
						o.map(function (t, n) {
							var r;
							if (n === o.length - 1)
								(r = [].indexOf.call(y(t), i)),
									e && (r = 0),
									-1 === r && !0;
							else {
								var c = +t.dataset.boothLevel;
								0 === (r = +o[n + 1].dataset.boothIndex) ||
									(r && -1 != +r) ||
									(r = [].indexOf.call(
										t.querySelectorAll(
											'[data-booth-level="'.concat(
												c + 1,
												'"]'
											)
										),
										o[n + 1]
									));
							}
							-1 !== r && a.push(r);
						}),
						n.length !== a.length || 0 === r.length
							? {}
							: {
									booth: n.join("_"),
									booth_id: r.join("_"),
									booth_index: a.join("_"),
							  }
					);
				},
				Z = function (t) {
					var e =
							t &&
							t.__vue__ &&
							t.__vue__ === t.__vue__.$root &&
							!t.__vue__.__isExtend__,
						n =
							t &&
							t.tagName &&
							"body" === t.tagName.toLowerCase();
					return e || n;
				},
				w = function (t) {
					var e = o()(t, "dataset.boothLevel", -1);
					if (-1 !== e) return +e;
					if (!t || !t.closest) return -1;
					var n = t.closest("[data-booth-level]"),
						r = +o()(n, "dataset.boothLevel", -1);
					if (n) {
						for (var a = 0, i = t.parentNode; i && i !== n; )
							((i.dataset && i.dataset.booth) ||
								o()(i, "__vue__.$options.isLogBooth", !1)) &&
								((a += 1),
								o()(i, "dataset.boothLevel") ||
									c()(i, "dataset.boothLevel", r + a)),
								(i = i.parentNode);
						r += a;
					}
					return r;
				},
				_ = function () {
					return (0, f.Z)().replace(/-/g, "");
				},
				y = function (t) {
					var e = t.querySelectorAll("[data-booth-item]");
					return (0, r.Z)(e).filter(function (e) {
						var n = e.closest("[data-booth]");
						return n === t || n === e;
					});
				};
		},
		53244: function (t, e, n) {
			n.d(e, {
				jq: function () {
					return a;
				},
				vl: function () {
					return o;
				},
			});
			n(29206),
				n(13546),
				n(31961),
				n(62291),
				n(33815),
				n(18694),
				n(86591),
				n(93793),
				n(42936),
				n(28469),
				n(77265),
				n(78630);
			var r = n(46163),
				a = function (t) {
					var e = {},
						n = ["uri", "scheme", "host", "path", "query", "hash"],
						r = new RegExp(
							[
								"(?:(\\w+):\\/\\/)?",
								"([^\\/]+)?",
								"(\\/[^#?]+)?",
								"(?:\\?([^#]+))?",
								"(?:#(.*))?",
							].join("")
						).exec(t);
					if (r)
						for (var a = 0; a < r.length; a++)
							n[a] && (e[n[a]] = r[a]);
					return e;
				},
				o = function () {
					return (0, r.parse)(location.search, {
						ignoreQueryPrefix: !0,
					});
				};
		},
		36317: function (t, e, n) {
			n.d(e, {
				_: function () {
					return o;
				},
				f: function () {
					return i;
				},
			});
			var r = n(93117),
				a = n(4042),
				o = function (t) {
					var e = (0, a.lg)(t, "unLogin"),
						n = (0, a.lg)(t, "data"),
						o = r.Bb;
					return e && (o = r.mI), o(n);
				},
				i = function (t) {
					var e = (0, a.lg)(t, "unLogin"),
						n = (0, a.lg)(t, "data"),
						o = r.lQ;
					return e && (o = r.S6), o(n);
				};
		},
		87533: function (t, e, n) {
			n.d(e, {
				S: function () {
					return i;
				},
			});
			var r = n(75162),
				a = (n(29161), n(42540), n(55031), n(56004)),
				o = n(72395),
				i = function (t) {
					o.Xh.is("wechat") &&
						(o.Qm.$emit("weixinJsSdkIniting"),
						Promise.all([
							(0, a.y)(),
							n.e(5167).then(n.t.bind(n, 25167, 23)),
						])
							.then(function (e) {
								var n = (0, r.Z)(e, 2),
									a = n[0].config,
									i = n[1];
								i.config(a),
									i.error(function () {
										o.Qm.$emit("weixinJsSdkFailed");
									}),
									i.ready(function () {
										t && t(),
											o.Qm.$emit("weixinJsSdkInited", !0);
									});
							})
							.catch(function () {
								o.Qm.$emit("weixinJsSdkFailed");
							}));
				};
		},
	},
]);
