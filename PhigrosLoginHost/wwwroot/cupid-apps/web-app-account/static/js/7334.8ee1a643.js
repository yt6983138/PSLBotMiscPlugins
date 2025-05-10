"use strict";
(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[7334],
	{
		27334: function (e, t, n) {
			n.r(t),
				n.d(t, {
					default: function () {
						return f;
					},
				});
			var r = n(1319),
				s = n(70800),
				i = (n(26586), n(99315), n(1945), n(92071)),
				o = n(46163),
				a = n(36558),
				u = n(53244),
				c = n(23625),
				l = function () {
					var e;
					try {
						e = parent.location.origin;
					} catch (t) {
						e =
							(0, u.jq)(document.referrer).scheme +
							"://" +
							(0, u.jq)(document.referrer).host;
					}
					return e;
				},
				p = {
					name: "LogoutPage",
					metaInfo: function () {
						return { title: this.$t("seo_logout_title") };
					},
					data: function () {
						return { oKCount: 0, res: null };
					},
					mounted: function () {
						var e = this;
						return (0, s.Z)(
							(0, r.Z)().mark(function t() {
								var n, s, a, u, p;
								return (0, r.Z)().wrap(
									function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													return (
														e.$toast({
															loading: !0,
															message:
																e.$t(
																	"logout_in_loading"
																),
														}),
														(t.prev = 1),
														(n = (0, o.stringify)(
															e.$route.query
														)),
														(s = { parameters: n }),
														(t.next = 6),
														(0, i.rB)(s)
													);
												case 6:
													(e.res = t.sent),
														window.self !==
															window.top &&
															parent.postMessage(
																JSON.stringify({
																	selfLogoutSuccess:
																		!0,
																}),
																l()
															),
														(a = e.$lg(
															e.res,
															"sub_systems",
															[]
														)),
														(e.oKCount = 0),
														window.addEventListener(
															"message",
															e.receiveMessage,
															!1
														),
														(u = 0);
												case 12:
													if (!(u < a.length)) {
														t.next = 19;
														break;
													}
													return (
														(p = e.$lg(
															a[u],
															"logout_url"
														)),
														(t.next = 16),
														(0, c.p)(p)
													);
												case 16:
													u++, (t.next = 12);
													break;
												case 19:
													setTimeout(function () {
														window.self !==
														window.top
															? parent.postMessage(
																	JSON.stringify(
																		{
																			done: !1,
																			timeout:
																				!0,
																		}
																	),
																	l()
															  )
															: e.redirect();
													}, 3e3),
														(t.next = 24);
													break;
												case 22:
													(t.prev = 22),
														(t.t0 = t.catch(1));
												case 24:
												case "end":
													return t.stop();
											}
									},
									t,
									null,
									[[1, 22]]
								);
							})
						)();
					},
					methods: {
						redirect: function () {
							this.$lg(this.res, "redirect_url", "") &&
								(location.href = this.$lg(
									this.res,
									"redirect_url",
									""
								));
						},
						receiveMessage: function (e) {
							var t = "" + (0, a.Nb)("DOMAIN_TAP");
							if (
								e.origin === window.location.origin ||
								e.origin === t
							) {
								if ("string" == typeof e.data) {
									var n = JSON.parse(e.data);
									"1" === this.$lg(n, "ok", "0") &&
										this.oKCount++;
								}
								var r = this.$lg(this.res, "sub_systems");
								this.oKCount === r.length &&
									(window.self !== window.top
										? parent.postMessage(
												JSON.stringify({ done: !0 }),
												l()
										  )
										: this.redirect());
							}
						},
					},
				},
				f = (0, n(39563).Z)(
					p,
					function () {
						var e = this.$createElement;
						return (this._self._c || e)("div");
					},
					[],
					!1,
					null,
					null,
					null
				).exports;
		},
	},
]);
