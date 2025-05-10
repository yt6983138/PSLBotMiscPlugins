"use strict";
(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[8386],
	{
		69878: function (e, t, n) {
			n(91359), n(1638), n(99315), n(1945);
			var r = {
					setItem: function (e, t) {},
					getItem: function (e) {
						return null;
					},
					removeItem: function (e) {},
					clear: function () {},
				},
				a = {
					storage:
						window && window.localStorage
							? window.localStorage
							: window && window.sessionStorage
							? window.sessionStorage
							: r,
				},
				o = {
					set: function (e, t) {
						t && this.storage.setItem(e, i(t));
					},
					get: function (e) {
						if (e) {
							var t = this.storage.getItem(e);
							return c(t);
						}
					},
					remove: function (e) {
						e && this.storage.removeItem(e);
					},
					clear: function () {
						this.storage.clear();
					},
					setList: function (e) {
						for (var t in e) this.set(t, e[t]);
					},
					getList: function (e) {
						var t = this;
						return e.map(function (e) {
							return t.get(e);
						});
					},
				},
				i = function (e) {
					if (e) return JSON.stringify(e);
				},
				c = function (e) {
					try {
						return JSON.parse(e);
					} catch (t) {
						return e;
					}
				};
			Object.assign(a, o), (t.Z = a);
		},
		1084: function (e, t, n) {
			n(99315), n(1945);
			var r = { storage: window.sessionStorage },
				a = {
					set: function (e, t) {
						t && this.storage.setItem(e, o(t));
					},
					get: function (e) {
						if (e) {
							var t = this.storage.getItem(e);
							return i(t);
						}
					},
					remove: function (e) {
						e && this.storage.removeItem(e);
					},
					clear: function () {
						this.storage.clear();
					},
				},
				o = function (e) {
					if (e) return JSON.stringify(e);
				},
				i = function (e) {
					try {
						return JSON.parse(e);
					} catch (t) {
						return e;
					}
				};
			Object.assign(r, a), (t.Z = r);
		},
		44542: function (e, t, n) {
			n.d(t, {
				F: function () {
					return o;
				},
			});
			var r = n(12736),
				a = n(69878);
			function o() {
				var e = a.Z.get("web_app_uuid");
				return (
					null != e || ((e = (0, r.Z)()), a.Z.set("web_app_uuid", e)),
					e
				);
			}
		},
		5926: function (e, t, n) {
			n.d(t, {
				B6: function () {
					return h;
				},
				Dv: function () {
					return _;
				},
				FR: function () {
					return S;
				},
				HQ: function () {
					return g;
				},
				Ky: function () {
					return b;
				},
				WB: function () {
					return Z;
				},
				ZC: function () {
					return m;
				},
				bN: function () {
					return A;
				},
				cS: function () {
					return E;
				},
				ub: function () {
					return w;
				},
				v7: function () {
					return I;
				},
				wf: function () {
					return y;
				},
			});
			n(9864), n(72155), n(29161), n(1945), n(19238), n(95661), n(7714);
			var r = n(36558),
				a = n(93117),
				o = n(90317),
				i = n(12736),
				c = n(1084),
				u = n(38739),
				s = n(80097),
				d = n(24591),
				f = n(4042),
				p = n(97934),
				l = n(75817),
				w = function () {
					return "//" + (0, r.Nb)("DOMAIN_TAP");
				},
				g = function () {
					location.href = w() + "/profile";
				},
				h = function () {
					d.Z.push({ name: "PersonalInfoPage" });
				},
				m = function () {
					var e = document.domain.split(".").slice(-2);
					return e[0] + "." + e[1];
				},
				v = function () {
					return (0, r.Nb)("CLIENT_ID") || "XNQDwJfWa6toXnG077";
				},
				b = function () {
					return location.origin + "/logout?client_id=" + v();
				};
			var A = function () {
					return new Promise(function (e) {
						if ((0, o.je)("getLoginCertificate")) {
							window.webviewOn(
								"getLoginCertificateSuccess",
								function (t) {
									(t = JSON.parse(t)),
										c.Z.get("accounts_login_state") ===
										t.state
											? (0, a.Gc)(
													{ code: t.code },
													{ mainRequest: !0 }
											  ).finally(function () {
													e();
											  })
											: (0, s.Z)({
													message:
														u.Z.t("error_overdue"),
											  });
								}
							);
							try {
								(0, o.ZP)("getLoginCertificate", {
									client_id: v(),
									state:
										((t = (0, i.Z)()),
										c.Z.set("accounts_login_state", t),
										t),
								});
							} catch (e) {}
						} else e();
						var t;
					});
				},
				_ = function (e) {
					var t = d.Z.resolve(e),
						n = (0, f.lg)(t, "route.name", "");
					"ErrorPage" === n || "" === n
						? (location.href = e)
						: I({ path: e });
				},
				I = function (e) {
					var t = (0, s.Z)({ loading: !0 });
					p.Z.dispatch("getUserProfile").then(function () {
						t.remove(), d.Z.push(e);
					});
				},
				y = function (e) {
					var t = (0, f.lg)(e, "error.response.data.data.error"),
						n = l.Z.find(function (e) {
							return e.errorType === t;
						});
					return n ? (0, f.lg)(n, "reason") : "";
				},
				S = function (e) {
					return (0, f.lg)(
						e,
						"error.response.data.data.error_metadata",
						""
					);
				},
				Z = function (e) {
					var t = (0, f.lg)(e, "error.response.data.data.msg");
					(0, s.Z)({ message: t, duration: 3e3 });
				},
				E = function (e) {
					var t = "",
						n = "";
					switch (e) {
						case "wechat":
						case "wechatweb":
							(n = "微信"), (t = "ico-m32-w32-Wechat");
							break;
						case "qq":
							(n = "QQ"), (t = "ico-m32-w32-QQ");
							break;
						case "apple":
							(n = "Apple"), (t = "ico-m32-w32-Apple");
							break;
						case "facebook":
							(n = "Facebook"), (t = "ico-m32-w32-Facebook");
							break;
						case "google":
							(n = "Google"), (t = "ico-m32-w32-Google");
							break;
						case "line":
							(n = "Line"), (t = "ico-m32-w32-Line");
					}
					return { icon: t, text: n };
				};
		},
		23625: function (e, t, n) {
			n.d(t, {
				p: function () {
					return o;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = (function () {
					var e = (0, a.Z)(
						(0, r.Z)().mark(function e(t) {
							var n;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											((n =
												document.createElement(
													"iframe"
												)).src = t),
												(n.style.display = "none"),
												document.body.appendChild(n);
										case 4:
										case "end":
											return e.stop();
									}
							}, e);
						})
					);
					return function (t) {
						return e.apply(this, arguments);
					};
				})();
		},
		64949: function (e, t, n) {
			n.d(t, {
				U4: function () {
					return o;
				},
				VC: function () {
					return a;
				},
				aU: function () {
					return c;
				},
				ah: function () {
					return r;
				},
			});
			n(9890),
				n(19388),
				n(67704),
				n(29161),
				n(95661),
				n(88484),
				n(9864),
				n(83454),
				n(36766),
				n(3117),
				n(21689),
				n(79485),
				n(3174),
				n(86591);
			function r(e, t, n) {
				n = "string" == typeof t ? [t] : t;
				for (
					var r = e.$parent, a = r.$options.name;
					r && (!a || n.indexOf(a) < 0);

				)
					(r = r.$parent) && (a = r.$options.name);
				return r;
			}
			function a(e, t) {
				var n = [],
					r = e.$parent;
				return r
					? (r.$options.name === t && n.push(r), n.concat(a(r, t)))
					: [];
			}
			function o(e) {
				if (!e) return 0;
				for (var t = e.offsetTop, n = e.offsetParent; null !== n; )
					(t += n.offsetTop), (n = n.offsetParent);
				return t;
			}
			function i(e) {
				return null != e;
			}
			function c(e, t) {
				var n,
					r = 0;
				if (Array.isArray(e))
					for (var a = 0; a < e.length; a++) {
						var o = e[a];
						if (
							i(o) &&
							(i(o.componentOptions) ||
								((n = o).isComment && n.asyncFactory))
						) {
							if (r === t) return o;
							r += 1;
						}
					}
			}
		},
		78630: function (e, t, n) {
			n.d(t, {
				Xh: function () {
					return A;
				},
			});
			n(33815), n(39958), n(19388), n(5192), n(16724), n(37416);
			var r = n(90317),
				a = n(99353),
				o =
					"undefined" != typeof navigator
						? navigator.userAgent
						: null,
				i = function () {
					for (var e in b) if (b[e].test(o)) return e;
					return null;
				},
				c = function () {
					for (var e in m) if (m[e] && "mobile" !== e) return e;
					return null;
				},
				u = function (e) {
					return e.test(o);
				},
				s = u(/android/i),
				d = u(/iPhone|iPad|iPod/i),
				f = u(/iPad/i),
				p = /(mobi|mzbrowser)/i.test(o),
				l = !f && (p || s || d),
				w = function (e) {
					return l && u(e);
				},
				g = function (e) {
					var t;
					for (t in m)
						if (t.toLowerCase() === e.toLowerCase()) return m[t];
					for (t in v)
						if (t.toLowerCase() === e.toLowerCase()) return v[t];
					for (t in b)
						if (t.toLowerCase() === e.toLowerCase())
							return b[t].test(o);
					return null;
				},
				h = function () {
					return !(
						(!g("HuaWei") && !g("honor")) ||
						g("QQBrowser") ||
						g("Opera") ||
						g("Chrome") ||
						g("Firefox") ||
						g("Shoujibaidu")
					);
				},
				m = { web: !l, Android: s, iOS: d },
				v = {
					mobile: l,
					iPhone: u(/iPhone/i),
					iPad: f,
					inApp: (0, r.vX)(),
					HuaWei: w(/HUAWEI/i),
					honor: w(/HONOR/i),
					Lenovo: w(/Lenovo/i),
					PC: !l && !f,
					Standalone: (0, a.Z)(),
				},
				b = {
					iOSSDK: /TapTapiOSSDK/i,
					AndroidSDK: /TapTapAndroidSDK/i,
					Sogou: /SE\s2\.X|SogouMobileBrowser/i,
					Explorer2345: /2345Explorer|2345chrome|Mb2345Browser/i,
					Liebao: /LBBROWSER|LieBaoFast/i,
					WindowsWechat: /WindowsWechat/i,
					Wechat: /MicroMessenger/i,
					Baidu: /BIDUBrowser|baidubrowser|BaiduHD/i,
					UC: /UBrowser|UCBrowser|UCWEB/i,
					MobileQQ:
						/Mobile\/\w{5,}\sQQ\/(\d+[.\d]+)|MQQBrowser.*QQ|QQ.*MQQBrowser/i,
					QQBrowser: /MQQBrowser|QQBrowser/i,
					Shoujibaidu: /baiduboxapp/i,
					Kuaishou: /(Kwai|AllowKsCallApp)/i,
					SamsungBrowser: /samsungbrowser|SamsungBrowser/i,
					Firefox: /Firefox/i,
					Maxthon: /Maxthon/i,
					Se360: /360SE/i,
					Ee360: /360EE/i,
					TheWorld: /TheWorld/i,
					WeiboIntl: /WeiboIntl/i,
					Weibo: /__weibo__/i,
					NokiaBrowser: /NokiaBrowser/i,
					Opera: /Opera|OPR\/(\d+[.\d]+)/i,
					Edge: /Edge/i,
					QQLive: /QQLive(HD)?Browser/i,
					Letv: /LetvClient/i,
					Youku: /Youku/i,
					IE: /Trident|MSIE/i,
					TouTiao: /NewsArticle/i,
					mobileLenovoBrowser: /MobileLenovoBrowser/i,
					emulator: /qmzs$/i,
					BaiduSpider: /Baiduspider/i,
					YisouSpider: /YisouSpider/i,
					Quark: /Quark\//i,
					CoolMarket: /CoolMarket/i,
					Tieba: /tieba/i,
					Zhihu_android: /ZhihuHybrid|zhihu/i,
					Bytedance: /BytedanceWebview|ByteLocale/i,
					Vivaldi: /Vivaldi/i,
					PPhongbao: /PPhongbao/i,
					HuaweiBrowser: /HuaweiBrowser|huawei.*?Build\/huawei/i,
					MZBrowser: /MZBrowser/i,
					VivoBrowser: /VivoBrowser/i,
					HeyTapBrowser: /HeyTapBrowser/i,
					MiuiBrowser: /MiuiBrowser/i,
					AndroidBrowser:
						/Android.*Mobile\sSafari|Android\/(\d[.\d]+)\sRelease\/(\d[.\d]+)\sBrowser\/AppleWebKit(\d[.\d]+)/i,
					Chrome: /Chrome|CriOS/i,
					iOSWebview: /like\sGecko\)\sMobile\/\w{3,}$/i,
					Safari: /Version[|/]([\w.]+)(\s\w.+)?\s?Safari/i,
					Facebook: /(?:FBAN\/|FB_IAB)/i,
				},
				A = g;
			function _() {
				var e = window.navigator.userAgent,
					t = e.indexOf("OS ");
				return (e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1) &&
					t > -1
					? window.Number(e.substr(t + 3, 3).replace("_", "."))
					: 0;
			}
			function I() {
				var e = o.match(/(iPod|iPad|iPhone)/i),
					t = o.match(
						/huawei|(Huawei[\s-_](\w*[-_]?\w*)|\s(7D-\w*|ALE-\w*|ATH-\w*|CHE-\w*|CHM-\w*|Che1-\w*|Che2-\w*|D2-\w*|G616-\w*|G620S-\w*|G621-\w*|G660-\w*|G750-\w*|GRA-\w*|Hol-\w*|MT2-\w*|MT7-\w*|PE-\w*|PLK-\w*|SC-\w*|SCL-\w*|H60-\w*|H30-\w*)[\s)])/i
					),
					n = o.match(/honor/i),
					r = o.match(
						/oppo|(Oppo[\s-_](\w*)|\s(1100|1105|1107|3000|3005|3007|6607|A100|A103|A105|A105K|A109|A109K|A11|A113|A115|A115K|A121|A125|A127|A129|A201|A203|A209|A31|A31c|A31t|A31u|A51kc|A520|A613|A615|A617|E21W|Find|Mirror|N5110|N5117|N5207|N5209|R2010|R2017|R6007|R7005|R7007|R7c|R7t|R8000|R8007|R801|R805|R807|R809T|R8107|R8109|R811|R811W|R813T|R815T|R815W|R817|R819T|R8200|R8205|R8207|R821T|R823T|R827T|R830|R830S|R831S|R831T|R833T|R850|Real|T703|U2S|U521|U525|U529|U539|U701|U701T|U705T|U705W|X9000|X9007|X903|X905|X9070|X9077|X909|Z101|R829T)[\s)])/i
					),
					a = o.match(/pacm00/i),
					i = o.match(
						/(vivo[\s-_](\w*)|\s(E1\w?|E3\w?|E5\w?|V1\w?|V2\w?|S11\w?|S12\w?|S1\w?|S3\w?|S6\w?|S7\w?|S9\w?|X1\w?|X3\w?|X520\w?|X5\w?|X5Max|X5Max+|X5Pro|X5SL|X710F|X710L|Xplay|Xshot|Xpaly3S|Y11\w?|Y11i\w?|Y11i\w?|Y13\w?|Y15\w?|Y17\w?|Y18\w?|Y19\w?|Y1\w?|Y20\w?|Y22\w?|Y22i\w?|Y23\w?|Y27\w?|Y28\w?|Y29\w?|Y33\w?|Y37\w?|Y3\w?|Y613\w?|Y622\w?|Y627\w?|Y913\w?|Y923\w?|Y927\w?|Y928\w?|Y929\w?|Y937\w?)[\s)])/i
					),
					c = o.match(/;\s(mi|m1|m2|m3|m4|hm)(\s*\w*)[\s)]/i),
					u = o.match(/redmi|build\/HM\d{0,7}|redmi\s?(\d+)?/i),
					s = o.match(
						/[-\s](Galaxy[\s-_]nexus|Galaxy[\s-_]\w*[\s-_]\w*|Galaxy[\s-_]\w*|SM-\w*|GT-\w*|s[cgp]h-\w*|shw-\w*|ATIV|i9070|omnia|s7568|A3000|A3009|A5000|A5009|A7000|A7009|A8000|C101|C1116|C1158|E400|E500F|E7000|E7009|G3139D|G3502|G3502i|G3508|G3508J|G3508i|G3509|G3509i|G3558|G3559|G3568V|G3586V|G3589W|G3606|G3608|G3609|G3812|G388F|G5108|G5108Q|G5109|G5306W|G5308W|G5309W|G550|G600|G7106|G7108|G7108V|G7109|G7200|G720NO|G7508Q|G7509|G8508S|G8509V|G9006V|G9006W|G9008V|G9008W|G9009D|G9009W|G9198|G9200|G9208|G9209|G9250|G9280|I535|I679|I739|I8190N|I8262|I879|I879E|I889|I9000|I9060|I9082|I9082C|I9082i|I9100|I9100G|I9108|I9128|I9128E|I9128i|I9152|I9152P|I9158|I9158P|I9158V|I9168|I9168i|I9190|I9192|I9195|I9195I|I9200|I9208|I9220|I9228|I9260|I9268|I9300|I9300i|I9305|I9308|I9308i|I939|I939D|I939i|I9500|I9502|I9505|I9507V|I9508|I9508V|I959|J100|J110|J5008|J7008|N7100|N7102|N7105|N7108|N7108D|N719|N750|N7505|N7506V|N7508V|N7509V|N900|N9002|N9005|N9006|N9008|N9008S|N9008V|N9009|N9100|N9106W|N9108V|N9109W|N9150|N916|N9200|P709|P709E|P729|S6358|S7278|S7278U|S7562C|S7562i|S7898i|b9388)[\s)]/i
					),
					d = o.match(
						/(Coolpad[\s-_](\w*)|\s(7295C|7298A|7620L|8908|8085|8970L|9190L|Y80D)[\s)])/i
					),
					f = o.match(
						/\s(mx\d*\w*|mz-(\w*))\s(\w*)\s*\w*\s*build|M463C|M35\d/i
					),
					p = /HarmonyOS/i.test(o);
				return e
					? "iOS"
					: p
					? "HarmonyOS"
					: t || n
					? "Huawei"
					: r || a
					? "OPPO"
					: i
					? "VIVO"
					: c || u
					? "Xiaomi"
					: s
					? "Samsung"
					: d
					? "Coolpad"
					: f
					? "Meizu"
					: "Other";
			}
			t.ZP = {
				is: g,
				getBrowser: i,
				getPlatform: c,
				isHuaWeiNativeBrowser: h,
				getIOSVersion: _,
				getOperatingPlatform: I,
			};
		},
		90317: function (e, t, n) {
			n.d(t, {
				Q5: function () {
					return u;
				},
				a6: function () {
					return i;
				},
				je: function () {
					return c;
				},
				vX: function () {
					return o;
				},
			});
			var r = n(17743),
				a = (n(99315), n(1945), n(28469), n(77265), n(78630)),
				o = function () {
					var e = !1;
					try {
						e =
							(window.urlResource &&
								window.urlResource.TapTapAPI) ||
							window.TapTapAPI;
					} catch (e) {}
					return e;
				},
				i = function (e, t) {
					"object" === (0, r.Z)(t) && (t = JSON.stringify(t));
					try {
						var n;
						return (0, a.Xh)("Android") &&
							null !== (n = window.urlResource) &&
							void 0 !== n &&
							n.TapTapAPI
							? window.urlResource.TapTapAPI(e, t)
							: window.TapTapAPI && window.TapTapAPI[e]
							? window.TapTapAPI[e](t)
							: window.TapTapAPI && window.TapTapAPI(e, t);
					} catch (e) {}
				},
				c = function (e) {
					try {
						return JSON.parse(i("actionList")).includes(e);
					} catch (e) {}
				},
				u = function () {
					if (!i("tapEnv")) return "";
					try {
						var e, t;
						if ((0, a.Xh)("Android"))
							return null === (e = JSON.parse(i("tapEnv"))) ||
								void 0 === e
								? void 0
								: e.VN_CODE;
						if ((0, a.Xh)("iOS"))
							return null === (t = JSON.parse(i("tapEnv"))) ||
								void 0 === t
								? void 0
								: t.VN_NAME;
					} catch (e) {
						return "error";
					}
					return "";
				};
			t.ZP = i;
		},
		11623: function (e, t, n) {
			var r = n(43659),
				a = n(69800),
				o = n.n(a),
				i = { secure: !0 };
			t.Z = (0, r.Z)(
				(0, r.Z)({}, o()),
				{},
				{
					set: function (e, t, n) {
						return o().set(e, t, (0, r.Z)((0, r.Z)({}, i), n));
					},
				}
			);
		},
		93463: function (e, t, n) {
			n.d(t, {
				k$: function () {
					return i;
				},
				NZ: function () {
					return c;
				},
			});
			n(29161), n(42540), n(11038), n(55031), n(88603);
			var r = n(4042),
				a = n(64949),
				o = new WeakMap();
			function i(e, t) {
				var n = (0, r.lg)(t, "deep", 0);
				if (e && e._isVue) {
					var i = (0, a.VC)(e, "feb-alive");
					if (i.length > 0) {
						i.reverse();
						var c = i[n];
						if (c.$el)
							return (
								c.$el.appendChild(e.$el), void o.set(e, c.$el)
							);
					}
				}
				if (document && document.querySelector) {
					var u = document.querySelector("#tap-account");
					u.appendChild(e && e._isVue ? e.$el : e), o.set(e, u);
				}
			}
			function c(e) {
				var t = o.get(e);
				o.delete(e), t && e && t.removeChild(e && e._isVue ? e.$el : e);
			}
			n(83454), n(78959), n(46163);
		},
		59685: function (e, t, n) {
			n.d(t, {
				Ny: function () {
					return o;
				},
				W2: function () {
					return u;
				},
				XN: function () {
					return l;
				},
				YX: function () {
					return f;
				},
				_D: function () {
					return p;
				},
				a5: function () {
					return d;
				},
				ef: function () {
					return c;
				},
				h1: function () {
					return r;
				},
				nC: function () {
					return s;
				},
				pi: function () {
					return i;
				},
				tu: function () {
					return a;
				},
			});
			var r =
					"/market/images/6ee415231c2429620e14f19a9bc22779.png",
				a =
					"/market/images/22f1196f825298281376608459bfa7fe.png",
				o =
					"/market/images/8f6b08d7aa0b5c32e0275abba82802ea.png",
				i =
					"/market/images/6e2fca050ec6c64b020307ba350cd88e.png",
				c =
					"/market/images/ff45b44c623fc2086b633df6e7d96baa.jpg",
				u =
					"https://www.taptap.com.invalid/feedback/create?category=6290f4d5e1ae552a8997e3a3",
				s =
					"/market/images/611d6f87fdd30a78551869b353f837f8.png",
				d =
					"/market/images/65bb89800489915f2b02dfb7247c6da4.png",
				f = "/payment/orders",
				p =
					"/market/images/0fed2b40356e8a5f3ddf06a344f8d2a7.png",
				l = s;
		},
		18690: function (e, t, n) {
			n.d(t, {
				B: function () {
					return c;
				},
			});
			n(72395);
			var r = n(73474),
				a = n.n(r),
				o =
					(n(42110),
					n(59898),
					n(55299),
					n(65495),
					n(10817),
					n(13840),
					n(28456),
					n(50469)),
				i = n.n(o);
			a().extend(i());
			var c = a();
		},
		29298: function (e, t, n) {
			n.d(t, {
				CC: function () {
					return o;
				},
				UK: function () {
					return i;
				},
				up: function () {
					return a;
				},
			});
			n(29161);
			function r() {
				var e,
					t,
					n = new Promise(function (n, r) {
						(e = n), (t = r);
					});
				return (n.resolve = e), (n.reject = t), n;
			}
			var a = r(),
				o = r(),
				i = r();
		},
		37485: function (e, t, n) {
			n.d(t, {
				R: function () {
					return a;
				},
			});
			var r = n(38739),
				a = function (e) {
					return (
						r.Z.t(
							{
								400: "error_400",
								403: "error_403",
								404: "error_404",
								405: "error_405",
								500: "error_500",
								502: "error_502",
								503: "error_503",
								"-1": "error_-1",
							}["".concat(e)]
						) +
						" " +
						e
					);
				};
		},
		8637: function (e, t, n) {
			var r = n(97934),
				a = n(36558),
				o = n(80097),
				i = n(38739),
				c = {
					start: function () {
						a.Qm.$on("pageErrorHappened", function (e) {
							r.Z.commit("setPageError", e);
						}),
							a.Qm.$on("rewriteErrorHappened", function (e) {
								(0, o.Z)({ message: i.Z.t(e), duration: 3e3 });
							});
					},
				};
			t.Z = c;
		},
		65552: function (e, t) {
			var n = {
				listen: function (e, t, n) {
					var r =
						arguments.length > 3 &&
						void 0 !== arguments[3] &&
						arguments[3];
					return e.addEventListener
						? (e.addEventListener(t, n, r),
						  {
								remove: function () {
									e.removeEventListener(t, n, r);
								},
						  })
						: e.attachEvent
						? (e.attachEvent("on" + t, n),
						  {
								remove: function () {
									e.detachEvent("on" + t, n);
								},
						  })
						: void 0;
				},
			};
			t.Z = n;
		},
		23156: function (e, t, n) {
			n.d(t, {
				n: function () {
					return r;
				},
			});
			var r = function () {
				var e =
					arguments.length > 3 && void 0 !== arguments[3]
						? arguments[3]
						: "/";
				return (
					(arguments.length > 0 && void 0 !== arguments[0]
						? arguments[0]
						: "") +
					e +
					(arguments.length > 1 && void 0 !== arguments[1]
						? arguments[1]
						: "") +
					e +
					(arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: "")
				);
			};
		},
		54354: function (e, t, n) {
			n(5192), n(88467), n(83454);
		},
		9261: function (e, t, n) {
			n.d(t, {
				y: function () {
					return w;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = n(13546),
				i = n.n(o),
				c = n(29206),
				u = n.n(c),
				s = n(36317),
				d = n(56618),
				f = n(4042),
				p = n(97934),
				l = n(80097);
			function w() {
				return g.apply(this, arguments);
			}
			function g() {
				return (
					(g = (0, a.Z)(
						(0, r.Z)().mark(function e() {
							var t,
								n,
								a,
								o,
								c,
								g,
								h,
								m,
								v,
								b,
								A,
								_,
								I,
								y,
								S,
								Z,
								E,
								N,
								C,
								M,
								P,
								k,
								L,
								T = arguments;
							return (0, r.Z)().wrap(
								function (e) {
									for (;;)
										switch ((e.prev = e.next)) {
											case 0:
												return (
													(n = (t =
														T.length > 0 &&
														void 0 !== T[0]
															? T[0]
															: {}).action),
													(a = void 0 === n ? "" : n),
													(o = t.captchaData),
													(c = void 0 === o ? {} : o),
													(g = t.target),
													(h = void 0 === g ? "" : g),
													(m = t.type),
													(v = void 0 === m ? "" : m),
													(b = t.unLogin),
													(A = void 0 === b || b),
													(_ = t.callback),
													(I =
														void 0 === _
															? function () {}
															: _),
													(y = t.errorCallback),
													(S =
														void 0 === y
															? function () {}
															: y),
													(Z = t.captchaType),
													(E =
														void 0 === Z
															? void 0
															: Z),
													(N = (0, l.Z)({
														loading: !0,
													})),
													(C = {
														action: a,
														captcha_type:
															E ||
															(0, f.lg)(
																p.Z.state,
																"globalConfig.captcha.captcha_type"
															),
													}),
													u()(c) ||
														(C.captcha_data = c),
													(M = "email_address"),
													(P = s._),
													"phone" === v &&
														((M = "phone_number"),
														(P = s.f)),
													(C[M] = h),
													(k = function (e) {
														var t =
															arguments.length >
																1 &&
															void 0 !==
																arguments[1]
																? arguments[1]
																: {};
														w({
															target: h,
															type: v,
															captchaData:
																e.captchaData,
															captchaType: i()(
																t,
																"captcha_type"
															),
															action: a,
															unLogin: A,
															callback: I,
															errorCallback: S,
														});
													}),
													(e.prev = 9),
													(e.next = 12),
													P({ unLogin: A, data: C })
												);
											case 12:
												(L = e.sent),
													N.remove(),
													I(L),
													(e.next = 21);
												break;
											case 17:
												(e.prev = 17),
													(e.t0 = e.catch(9)),
													N.remove(),
													"captcha.needs" ===
														i()(
															e.t0,
															"error.response.data.data.error"
														) &&
													i()(
														e.t0,
														"error.response.data.data.error_metadata"
													)
														? (0, d.Ew)({
																error: e.t0,
																callback:
																	function (
																		t
																	) {
																		var n =
																			i()(
																				e.t0,
																				"error.response.data.data.error_metadata"
																			);
																		k(t, n);
																	},
														  })
														: S(e.t0);
											case 21:
											case "end":
												return e.stop();
										}
								},
								e,
								null,
								[[9, 17]]
							);
						})
					)),
					g.apply(this, arguments)
				);
			}
		},
		56618: function (e, t, n) {
			n.d(t, {
				Ew: function () {
					return v;
				},
			});
			var r = n(1319),
				a = n(43659),
				o = n(70800),
				i = n(13546),
				c = n.n(i),
				u =
					(n(99315),
					n(19238),
					n(29161),
					n(90244),
					n(42540),
					n(55031),
					n(4042)),
				s = n(36558),
				d = new Map(),
				f = (function () {
					var e = (0, o.Z)(
						(0, r.Z)().mark(function e(t) {
							var a, o;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											if (
												((a = (0, u.lg)(t, "button")),
												!d.has(a))
											) {
												e.next = 5;
												break;
											}
											return (
												(o = d.get(a)).verify(),
												e.abrupt(
													"return",
													Promise.resolve(o)
												)
											);
										case 5:
											return (
												(e.next = 7),
												n.e(188).then(n.bind(n, 10188))
											);
										case 7:
											return e.abrupt(
												"return",
												new Promise(function (e) {
													initGeetest(
														{
															gt: (0, u.lg)(
																t,
																"gt"
															),
															challenge: (0,
															u.lg)(
																t,
																"challenge"
															),
															offline: !(0, u.lg)(
																t,
																"success"
															),
															product: "bind",
															new_captcha: (0,
															u.lg)(
																t,
																"new_captcha"
															),
														},
														function (n) {
															var r = (0, u.lg)(
																	t,
																	"onReady"
																),
																o = (0, u.lg)(
																	t,
																	"onSuccess"
																),
																i = (0, u.lg)(
																	t,
																	"onError"
																);
															d.set(a, n),
																n.onReady(
																	function () {
																		s.Qm.$emit(
																			"stopCaptchaLoading"
																		),
																			"function" ==
																				typeof r &&
																				r(
																					n
																				);
																	}
																),
																n.onSuccess(
																	function () {
																		"function" ==
																			typeof o &&
																			o(
																				n.getValidate()
																			),
																			n.reset();
																	}
																),
																n.onClose(
																	function () {
																		s.Qm.$emit(
																			"stopCaptchaLoading"
																		),
																			n.reset();
																	}
																),
																n.onError(
																	function () {
																		"function" ==
																			typeof i &&
																			i(),
																			n.reset();
																	}
																),
																e(n);
														}
													);
												})
											);
										case 8:
										case "end":
											return e.stop();
									}
							}, e);
						})
					);
					return function (t) {
						return e.apply(this, arguments);
					};
				})(),
				p = (function () {
					var e = (0, o.Z)(
						(0, r.Z)().mark(function e(t) {
							var a, o;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											return (
												(a = (0, u.lg)(t, "button")),
												(o = (0, u.lg)(t, "callback")),
												(e.next = 4),
												n
													.e(2385)
													.then(
														n.t.bind(n, 12385, 23)
													)
											);
										case 4:
											window.initGeetest4(
												{
													captchaId: t.captchaId,
													product: "bind",
													language: t.language,
												},
												function (e) {
													e.appendTo(a),
														e
															.onReady(
																function () {
																	s.Qm.$emit(
																		"stopCaptchaLoading"
																	),
																		e.showCaptcha();
																}
															)
															.onSuccess(
																function () {
																	var t =
																		e.getValidate();
																	o && o(t),
																		e.destroy(),
																		(e =
																			null);
																}
															),
														e.onClose(function () {
															s.Qm.$emit(
																"stopCaptchaLoading"
															),
																e.reset();
														}),
														e.onError(function () {
															e.reset();
														});
												}
											);
										case 5:
										case "end":
											return e.stop();
									}
							}, e);
						})
					);
					return function (t) {
						return e.apply(this, arguments);
					};
				})(),
				l = n(37050),
				w = n(2982),
				g = n(97934),
				h = n(72395),
				m = (function () {
					var e = (0, o.Z)(
						(0, r.Z)().mark(function e(t) {
							var n, o, i, c, s, d, h;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											(n = t.captchaInfo),
												(o = t.callback),
												(i = t.button),
												(c =
													(0, u.lg)(
														n,
														"captcha_type"
													) ||
													(0, u.lg)(
														g.Z,
														"state.globalConfig.captcha.captcha_type"
													)),
												(s = (0, u.lg)(n, "action")),
												"geetest_v4" === c
													? ((n.language = b()),
													  (n.captchaId =
															(0, u.lg)(
																n,
																"captcha_id"
															) ||
															(0, u.lg)(
																g.Z,
																"state.globalConfig.captcha.captcha_id"
															)),
													  p(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	button: i,
																	callback:
																		function (
																			e
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								e
																							),
																					}
																				);
																		},
																}
															)
													  ))
													: "geetest" === c &&
													  (0, u.lg)(n, "challenge")
													? f(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	button: i,
																	onSuccess:
																		function (
																			e
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								e
																							),
																					}
																				);
																		},
																	onReady:
																		function (
																			e
																		) {
																			e.verify();
																		},
																}
															)
													  )
													: "tencent_captcha" === c
													? (0, l.J)(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	callback:
																		function (
																			e
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								e
																							),
																					}
																				);
																		},
																}
															)
													  )
													: "recaptcha_enterprise" ===
													  c
													? "true" ===
													  (0, u.lg)(n, "down_grade")
														? (0, w.wf)({
																action: s,
																callback:
																	function (
																		e
																	) {
																		o &&
																			o({
																				captchaData:
																					JSON.stringify(
																						{
																							g_recaptcha_response:
																								e,
																							g_recaptcha_version:
																								"checkbox",
																							action: s,
																						}
																					),
																			});
																	},
														  })
														: (0, w.dN)({
																action: s,
																callback:
																	function (
																		e
																	) {
																		o &&
																			o({
																				captchaData:
																					JSON.stringify(
																						{
																							g_recaptcha_response:
																								e,
																							g_recaptcha_version:
																								"score",
																							action: s,
																						}
																					),
																			});
																	},
														  })
													: "recaptcha" === c &&
													  ((d = (0, u.lg)(
															n,
															"recaptcha_version"
													  )),
													  (h = (0, u.lg)(
															n,
															"action"
													  )),
													  "v3" === d
															? (0, w.Ig)({
																	action: h,
																	callback:
																		function (
																			e
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								{
																									g_recaptcha_response:
																										e,
																									g_recaptcha_version:
																										d,
																									action: h,
																								}
																							),
																					}
																				);
																		},
															  })
															: "v2" === d &&
															  (0, w.WG)({
																	button: i,
																	callback:
																		function (
																			e
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								{
																									g_recaptcha_response:
																										e,
																									g_recaptcha_version:
																										d,
																								}
																							),
																					}
																				);
																		},
															  }));
										case 4:
										case "end":
											return e.stop();
									}
							}, e);
						})
					);
					return function (t) {
						return e.apply(this, arguments);
					};
				})(),
				v = function (e) {
					var t = e.error,
						n = e.callback,
						r = e.button,
						a = c()(t, "error.response.data.data.error_metadata");
					a && m({ captchaInfo: a, callback: n, button: r });
				},
				b = function () {
					var e = (0, h.VQ)(),
						t = [
							{ lang: "zh_CN", gt4Lang: "zho" },
							{ lang: "zh_TW", gt4Lang: "zho-tw" },
							{ lang: "en_US", gt4Lang: "eng" },
							{ lang: "ja_JP", gt4Lang: "jpn" },
							{ lang: "ko_KR", gt4Lang: "kor" },
							{ lang: "id_ID", gt4Lang: "ind" },
						].find(function (t) {
							return t.lang === e;
						});
					return t ? t.gt4Lang : (0, s.DI)() ? "eng" : "zho";
				};
		},
		66607: function (e, t, n) {
			n.d(t, {
				Z: function () {
					return a;
				},
			});
			n(82886), n(3174), n(33815), n(16724);
			var r = n(36558);
			function a(e, t) {
				var n,
					a = e.config.mainRequest,
					o = void 0 !== a && a;
				if (200 === e.status) {
					if (o && e.data && e.data.redirect) {
						var i = (n = e.data.redirect)
								? {
										mustRedirect: !0,
										webUrl: n.web_url,
										redirectCode: n.status || 301,
								  }
								: { mustRedirect: !1 },
							c = i.webUrl,
							u = i.redirectCode;
						if (i.mustRedirect)
							throw (
								(setTimeout(function () {
									r.Qm.$emit("pageRedirect", c);
								}),
								new Error(u))
							);
					}
					return e.data.data;
				}
				return e;
			}
		},
		31685: function (e, t, n) {
			n.d(t, {
				LU: function () {
					return c;
				},
				Oe: function () {
					return u;
				},
				u0: function () {
					return o;
				},
				zd: function () {
					return i;
				},
			});
			n(26586), n(28469), n(77265);
			var r = n(97934),
				a = n(36558),
				o = function () {
					try {
						return parent.location.origin;
					} catch (e) {
						return "https://" + (0, a.Nb)("DOMAIN_TAP");
					}
				},
				i = function () {
					return window.self !== window.top;
				},
				c = function () {
					var e = "";
					try {
						e = parent.location.origin;
						var t = "https://sight.xdrnd.cn";
						"string" == typeof document.referrer &&
							document.referrer.includes(t) &&
							(e = t);
					} catch (t) {
						"string" != typeof document.referrer ||
							document.referrer.includes(location.origin) ||
							(e = document.referrer);
					}
					return e || (e = "https://" + (0, a.Nb)("DOMAIN_TAP")), e;
				},
				u = function () {
					if (!i() || r.Z.state.isInSDK) return !1;
					var e = c(),
						t = "https://" + (0, a.Nb)("ACCOUNT_DOMAIN_TAP");
					return e.includes(t);
				};
		},
		90737: function (e, t, n) {
			n.d(t, {
				F: function () {
					return d;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = n(17743);
			n(82886),
				n(3174),
				n(34316),
				n(29161),
				n(95661),
				n(91380),
				n(91359),
				n(1638),
				n(42540),
				n(55031);
			var i = null;
			function c() {
				return u.apply(this, arguments);
			}
			function u() {
				return (u = (0, a.Z)(
					(0, r.Z)().mark(function e() {
						return (0, r.Z)().wrap(function (e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										if (null === i) {
											e.next = 2;
											break;
										}
										return e.abrupt("return", i);
									case 2:
										return (
											(e.next = 4),
											new Promise(function (e) {
												var t = new Image();
												(t.onload = function () {
													e(!0);
												}),
													(t.onerror = function () {
														e(!1);
													}),
													(t.src =
														"data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=");
											})
										);
									case 4:
										return (
											(i = e.sent), e.abrupt("return", i)
										);
									case 6:
									case "end":
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			function s(e) {
				return new Promise(function (t, n) {
					var r = new Image();
					(r.onload = function () {
						return t(r);
					}),
						(r.onerror = function (e) {
							return n(e);
						}),
						(r.src = e);
				});
			}
			function d(e) {
				if (!Array.isArray(e)) throw new Error("sources必须是数组");
				if (
					!e.every(function (e) {
						return (
							"string" == typeof e ||
							("object" === (0, o.Z)(e) &&
								void 0 !== e.webp &&
								void 0 !== e.fallback)
						);
					})
				)
					throw new Error(
						"sources格式不正确，每项必须是字符串或包含webp和fallback的对象"
					);
				var t = !1,
					n = [],
					i = { onLoaded: null, onError: null };
				function u(e, t) {
					return d.apply(this, arguments);
				}
				function d() {
					return (d = (0, a.Z)(
						(0, r.Z)().mark(function e(t, n) {
							var a;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											if ("string" != typeof t) {
												e.next = 4;
												break;
											}
											return e.abrupt("return", s(t));
										case 4:
											if ("object" !== (0, o.Z)(t)) {
												e.next = 7;
												break;
											}
											return (
												(a = n ? t.webp : t.fallback),
												e.abrupt("return", s(a))
											);
										case 7:
										case "end":
											return e.stop();
									}
							}, e);
						})
					)).apply(this, arguments);
				}
				return {
					onLoaded: function (e) {
						return (i.onLoaded = e), this;
					},
					onError: function (e) {
						return (i.onError = e), this;
					},
					load: function () {
						return (0, a.Z)(
							(0, r.Z)().mark(function a() {
								var o, s;
								return (0, r.Z)().wrap(
									function (r) {
										for (;;)
											switch ((r.prev = r.next)) {
												case 0:
													if (!t) {
														r.next = 2;
														break;
													}
													return r.abrupt(
														"return",
														n
													);
												case 2:
													return (
														(r.prev = 2),
														(r.next = 5),
														c()
													);
												case 5:
													return (
														(o = r.sent),
														(s = e.map(function (
															e
														) {
															return u(e, o);
														})),
														(r.next = 9),
														Promise.all(s)
													);
												case 9:
													return (
														(n = r.sent),
														(t = !0),
														i.onLoaded &&
															i.onLoaded(n),
														r.abrupt("return", n)
													);
												case 15:
													throw (
														((r.prev = 15),
														(r.t0 = r.catch(2)),
														i.onError &&
															i.onError(r.t0),
														r.t0)
													);
												case 20:
												case "end":
													return r.stop();
											}
									},
									a,
									null,
									[[2, 15]]
								);
							})
						)();
					},
					getLoadedImages: function () {
						return n;
					},
					isLoaded: function () {
						return t;
					},
				};
			}
		},
		99353: function (e, t, n) {
			function r() {
				return (
					!(!navigator || "function" != typeof window.matchMedia) &&
					(!0 === navigator.standalone ||
						window.matchMedia("(display-mode: standalone)").matches)
				);
			}
			n.d(t, {
				Z: function () {
					return r;
				},
			});
		},
		38316: function (e, t, n) {
			n(67096), n(29161);
			function r(e, t) {
				e.addEventListener
					? e.addEventListener(
							"load",
							function () {
								e.setAttribute("loaded", !0), t && t();
							},
							!1
					  )
					: e.attachEvent &&
					  e.attachEvent("onreadystatechange", function () {
							"loaded" === window.event.srcElement.readyState &&
								(e.setAttribute("loaded", !0), t && t());
					  });
			}
			t.Z = function (e) {
				return (
					e.startsWith("http") ||
						(e =
							"https://assets.tapimg.com/cupid-apps/web-app-account/public-static/" +
							e),
					new Promise(function (t) {
						var n = document.querySelector(
							'script[src="'.concat(e, '"]')
						);
						if (n) n.getAttribute("loaded") ? t() : r(n, t);
						else {
							var a = document.createElement("script"),
								o = document.getElementsByTagName("head")[0];
							(a.type = "text/javascript"),
								(a.charset = "UTF-8"),
								(a.src = e),
								r(a, t),
								o.appendChild(a);
						}
					})
				);
			};
		},
		30878: function (e, t, n) {
			n.d(t, {
				_: function () {
					return u;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = (n(29161), n(28469), n(77265), n(1945), n(23625)),
				i = n(4042),
				c = n(53244),
				u = (function () {
					var e = (0, a.Z)(
						(0, r.Z)().mark(function e(t) {
							var n,
								a,
								u = arguments;
							return (0, r.Z)().wrap(function (e) {
								for (;;)
									switch ((e.prev = e.next)) {
										case 0:
											return (
												(n = (
													u.length > 1 &&
													void 0 !== u[1]
														? u[1]
														: {}
												).inSDK),
												(a = (0, i.lg)(
													(0, c.jq)(t),
													"host",
													location.origin
												)),
												(e.next = 5),
												(0, o.p)(t)
											);
										case 5:
											return e.abrupt(
												"return",
												new Promise(function (e) {
													window.addEventListener(
														"message",
														function (t) {
															if (
																t.origin.includes(
																	a
																)
															) {
																var r =
																	t.data &&
																	JSON.parse(
																		t.data
																	);
																n &&
																	r &&
																	r.selfLogoutSuccess &&
																	e({
																		done: !0,
																	}),
																	r && r.done
																		? e({
																				done: !0,
																		  })
																		: r &&
																		  r.timeout &&
																		  e({
																				done: !1,
																				timeout:
																					!0,
																		  });
															}
														},
														!1
													);
												})
											);
										case 6:
										case "end":
											return e.stop();
									}
							}, e);
						})
					);
					return function (t) {
						return e.apply(this, arguments);
					};
				})();
		},
		59696: function (e, t, n) {
			n.d(t, {
				kP: function () {
					return i;
				},
				ox: function () {
					return c;
				},
			});
			n(92094), n(29161), n(95661), n(9079), n(20599);
			var r = n(8790),
				a = { mediaQueryMatchMobile: null, mediaQueryMatchPad: null },
				o = { mediaQueryMatchMobile: null, mediaQueryMatchPad: null };
			function i(e, t) {
				var n, r;
				a &&
					(o[e] && (c(e), (o[e] = null)),
					(o[e] = t),
					t(a[e]),
					(n = a[e]),
					(r = t),
					n.addEventListener
						? n.addEventListener("change", r)
						: n.addListener(r));
			}
			function c(e) {
				a &&
					(Array.isArray(e) &&
						e.length > 0 &&
						e.forEach(function (e) {
							a[e].removeEventListener("change", o[e]);
						}),
					"string" == typeof e &&
						a[e].removeEventListener("change", o[name]));
			}
			window && window.matchMedia
				? ((a.mediaQueryMatchMobile = window.matchMedia(
						"(max-width: ".concat(r.Z.MOBILE_WIDTH, ")")
				  )),
				  (a.mediaQueryMatchPad = window.matchMedia(
						"(max-width: ".concat(r.Z.PAD_WIDTH, ")")
				  )),
				  (a.mediaQueryMatchVideoMobile = window.matchMedia(
						"(max-width: ".concat(r.Z.VIDEO_MOBILE_WIDTH, ")")
				  )),
				  (a.mediaQueryMatchContentMobile = window.matchMedia(
						"(max-width: ".concat(r.Z.CONTENT_WIDTH, ")")
				  )),
				  (a.mediaQueryMatchPortrait = window.matchMedia(
						"(orientation: portrait)"
				  )),
				  (a.mediaQueryMatchSmallMobile = window.matchMedia(
						"(max-width: ".concat(r.Z.SMALL_MOBILE_WIDTH, ")")
				  )),
				  (a.mediaQuerySwitchHeaderNavigation = window.matchMedia(
						"(max-width: ".concat(r.Z.HEADER_NAVIGATION, ")")
				  )))
				: (a = null);
		},
		82781: function (e, t, n) {
			n.d(t, {
				GP: function () {
					return i;
				},
				XZ: function () {
					return c;
				},
			});
			var r = n(13546),
				a = n.n(r),
				o =
					(n(36766),
					n(29161),
					n(95661),
					n(3117),
					n(1945),
					{
						"-1": {
							errorMessage: "远程服务响应失败,请稍后重试",
							isErrorPageCode: !0,
						},
						400: {
							errorMessage: "400：错误请求",
							isErrorPageCode: !0,
						},
						401: { errorMessage: "401：访问令牌无效或已过期" },
						403: {
							errorMessage: "403：拒绝访问",
							isErrorPageCode: !0,
						},
						404: {
							errorMessage: "404：资源不存在",
							isErrorPageCode: !0,
						},
						405: {
							errorMessage: "405：请求方法未允许",
							isErrorPageCode: !0,
						},
						408: { errorMessage: "408：请求超时" },
						500: {
							errorMessage: "500：访问服务失败",
							isErrorPageCode: !0,
						},
						501: { errorMessage: "501：未实现" },
						502: {
							errorMessage: "502：无效网关",
							isErrorPageCode: !0,
						},
						503: {
							errorMessage: "503：服务不可用",
							isErrorPageCode: !0,
						},
					}),
				i = Object.keys(o).filter(function (e) {
					return o[e].isErrorPageCode;
				});
			function c(e) {
				var t = (e && e.status) || -1e3;
				return 200 == t
					? e.data.data
					: {
							code: t,
							msg:
								a()(o, "".concat(t), {}).errorMessage ||
								"连接错误",
					  };
			}
		},
	},
]);
