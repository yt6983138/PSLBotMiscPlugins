"use strict";
(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[6591],
	{
		69878: function (t, e, n) {
			n(91359), n(1638), n(99315), n(1945);
			var r = {
					setItem: function (t, e) {},
					getItem: function (t) {
						return null;
					},
					removeItem: function (t) {},
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
					set: function (t, e) {
						e && this.storage.setItem(t, i(e));
					},
					get: function (t) {
						if (t) {
							var e = this.storage.getItem(t);
							return c(e);
						}
					},
					remove: function (t) {
						t && this.storage.removeItem(t);
					},
					clear: function () {
						this.storage.clear();
					},
					setList: function (t) {
						for (var e in t) this.set(e, t[e]);
					},
					getList: function (t) {
						var e = this;
						return t.map(function (t) {
							return e.get(t);
						});
					},
				},
				i = function (t) {
					if (t) return JSON.stringify(t);
				},
				c = function (t) {
					try {
						return JSON.parse(t);
					} catch (e) {
						return t;
					}
				};
			Object.assign(a, o), (e.Z = a);
		},
		1084: function (t, e, n) {
			n(99315), n(1945);
			var r = { storage: window.sessionStorage },
				a = {
					set: function (t, e) {
						e && this.storage.setItem(t, o(e));
					},
					get: function (t) {
						if (t) {
							var e = this.storage.getItem(t);
							return i(e);
						}
					},
					remove: function (t) {
						t && this.storage.removeItem(t);
					},
					clear: function () {
						this.storage.clear();
					},
				},
				o = function (t) {
					if (t) return JSON.stringify(t);
				},
				i = function (t) {
					try {
						return JSON.parse(t);
					} catch (e) {
						return t;
					}
				};
			Object.assign(r, a), (e.Z = r);
		},
		44542: function (t, e, n) {
			n.d(e, {
				F: function () {
					return o;
				},
			});
			var r = n(12736),
				a = n(69878);
			function o() {
				var t = a.Z.get("web_app_uuid");
				return (
					null != t || ((t = (0, r.Z)()), a.Z.set("web_app_uuid", t)),
					t
				);
			}
		},
		5926: function (t, e, n) {
			n.d(e, {
				B6: function () {
					return v;
				},
				Dv: function () {
					return Z;
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
					return I;
				},
				ZC: function () {
					return m;
				},
				bN: function () {
					return _;
				},
				cS: function () {
					return T;
				},
				ub: function () {
					return h;
				},
				v7: function () {
					return y;
				},
				wf: function () {
					return k;
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
				f = n(24591),
				d = n(4042),
				l = n(97934),
				p = n(75817),
				h = function () {
					return "//" + (0, r.Nb)("DOMAIN_TAP");
				},
				g = function () {
					location.href = h() + "/profile";
				},
				v = function () {
					f.Z.push({ name: "PersonalInfoPage" });
				},
				m = function () {
					var t = document.domain.split(".").slice(-2);
					return t[0] + "." + t[1];
				},
				w = function () {
					return (0, r.Nb)("CLIENT_ID") || "XNQDwJfWa6toXnG077";
				},
				b = function () {
					return location.origin + "/logout?client_id=" + w();
				};
			var _ = function () {
					return new Promise(function (t) {
						if ((0, o.je)("getLoginCertificate")) {
							window.webviewOn(
								"getLoginCertificateSuccess",
								function (e) {
									(e = JSON.parse(e)),
										c.Z.get("accounts_login_state") ===
										e.state
											? (0, a.Gc)(
													{ code: e.code },
													{ mainRequest: !0 }
											  ).finally(function () {
													t();
											  })
											: (0, s.Z)({
													message:
														u.Z.t("error_overdue"),
											  });
								}
							);
							try {
								(0, o.ZP)("getLoginCertificate", {
									client_id: w(),
									state:
										((e = (0, i.Z)()),
										c.Z.set("accounts_login_state", e),
										e),
								});
							} catch (t) {}
						} else t();
						var e;
					});
				},
				Z = function (t) {
					var e = f.Z.resolve(t),
						n = (0, d.lg)(e, "route.name", "");
					"ErrorPage" === n || "" === n
						? (location.href = t)
						: y({ path: t });
				},
				y = function (t) {
					var e = (0, s.Z)({ loading: !0 });
					l.Z.dispatch("getUserProfile").then(function () {
						e.remove(), f.Z.push(t);
					});
				},
				k = function (t) {
					var e = (0, d.lg)(t, "error.response.data.data.error"),
						n = p.Z.find(function (t) {
							return t.errorType === e;
						});
					return n ? (0, d.lg)(n, "reason") : "";
				},
				S = function (t) {
					return (0, d.lg)(
						t,
						"error.response.data.data.error_metadata",
						""
					);
				},
				I = function (t) {
					var e = (0, d.lg)(t, "error.response.data.data.msg");
					(0, s.Z)({ message: e, duration: 3e3 });
				},
				T = function (t) {
					var e = "",
						n = "";
					switch (t) {
						case "wechat":
						case "wechatweb":
							(n = "微信"), (e = "ico-m32-w32-Wechat");
							break;
						case "qq":
							(n = "QQ"), (e = "ico-m32-w32-QQ");
							break;
						case "apple":
							(n = "Apple"), (e = "ico-m32-w32-Apple");
							break;
						case "facebook":
							(n = "Facebook"), (e = "ico-m32-w32-Facebook");
							break;
						case "google":
							(n = "Google"), (e = "ico-m32-w32-Google");
							break;
						case "line":
							(n = "Line"), (e = "ico-m32-w32-Line");
					}
					return { icon: e, text: n };
				};
		},
		23625: function (t, e, n) {
			n.d(e, {
				p: function () {
					return o;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = (function () {
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											((n =
												document.createElement(
													"iframe"
												)).src = e),
												(n.style.display = "none"),
												document.body.appendChild(n);
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
				})();
		},
		64949: function (t, e, n) {
			n.d(e, {
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
			function r(t, e, n) {
				n = "string" == typeof e ? [e] : e;
				for (
					var r = t.$parent, a = r.$options.name;
					r && (!a || n.indexOf(a) < 0);

				)
					(r = r.$parent) && (a = r.$options.name);
				return r;
			}
			function a(t, e) {
				var n = [],
					r = t.$parent;
				return r
					? (r.$options.name === e && n.push(r), n.concat(a(r, e)))
					: [];
			}
			function o(t) {
				if (!t) return 0;
				for (var e = t.offsetTop, n = t.offsetParent; null !== n; )
					(e += n.offsetTop), (n = n.offsetParent);
				return e;
			}
			function i(t) {
				return null != t;
			}
			function c(t, e) {
				var n,
					r = 0;
				if (Array.isArray(t))
					for (var a = 0; a < t.length; a++) {
						var o = t[a];
						if (
							i(o) &&
							(i(o.componentOptions) ||
								((n = o).isComment && n.asyncFactory))
						) {
							if (r === e) return o;
							r += 1;
						}
					}
			}
		},
		78630: function (t, e, n) {
			n.d(e, {
				Xh: function () {
					return _;
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
					for (var t in b) if (b[t].test(o)) return t;
					return null;
				},
				c = function () {
					for (var t in m) if (m[t] && "mobile" !== t) return t;
					return null;
				},
				u = function (t) {
					return t.test(o);
				},
				s = u(/android/i),
				f = u(/iPhone|iPad|iPod/i),
				d = u(/iPad/i),
				l = /(mobi|mzbrowser)/i.test(o),
				p = !d && (l || s || f),
				h = function (t) {
					return p && u(t);
				},
				g = function (t) {
					var e;
					for (e in m)
						if (e.toLowerCase() === t.toLowerCase()) return m[e];
					for (e in w)
						if (e.toLowerCase() === t.toLowerCase()) return w[e];
					for (e in b)
						if (e.toLowerCase() === t.toLowerCase())
							return b[e].test(o);
					return null;
				},
				v = function () {
					return !(
						(!g("HuaWei") && !g("honor")) ||
						g("QQBrowser") ||
						g("Opera") ||
						g("Chrome") ||
						g("Firefox") ||
						g("Shoujibaidu")
					);
				},
				m = { web: !p, Android: s, iOS: f },
				w = {
					mobile: p,
					iPhone: u(/iPhone/i),
					iPad: d,
					inApp: (0, r.vX)(),
					HuaWei: h(/HUAWEI/i),
					honor: h(/HONOR/i),
					Lenovo: h(/Lenovo/i),
					PC: !p && !d,
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
				_ = g;
			function Z() {
				var t = window.navigator.userAgent,
					e = t.indexOf("OS ");
				return (t.indexOf("iPhone") > -1 || t.indexOf("iPad") > -1) &&
					e > -1
					? window.Number(t.substr(e + 3, 3).replace("_", "."))
					: 0;
			}
			function y() {
				var t = o.match(/(iPod|iPad|iPhone)/i),
					e = o.match(
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
					f = o.match(
						/(Coolpad[\s-_](\w*)|\s(7295C|7298A|7620L|8908|8085|8970L|9190L|Y80D)[\s)])/i
					),
					d = o.match(
						/\s(mx\d*\w*|mz-(\w*))\s(\w*)\s*\w*\s*build|M463C|M35\d/i
					),
					l = /HarmonyOS/i.test(o);
				return t
					? "iOS"
					: l
					? "HarmonyOS"
					: e || n
					? "Huawei"
					: r || a
					? "OPPO"
					: i
					? "VIVO"
					: c || u
					? "Xiaomi"
					: s
					? "Samsung"
					: f
					? "Coolpad"
					: d
					? "Meizu"
					: "Other";
			}
			e.ZP = {
				is: g,
				getBrowser: i,
				getPlatform: c,
				isHuaWeiNativeBrowser: v,
				getIOSVersion: Z,
				getOperatingPlatform: y,
			};
		},
		90317: function (t, e, n) {
			n.d(e, {
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
					var t = !1;
					try {
						t =
							(window.urlResource &&
								window.urlResource.TapTapAPI) ||
							window.TapTapAPI;
					} catch (t) {}
					return t;
				},
				i = function (t, e) {
					"object" === (0, r.Z)(e) && (e = JSON.stringify(e));
					try {
						var n;
						return (0, a.Xh)("Android") &&
							null !== (n = window.urlResource) &&
							void 0 !== n &&
							n.TapTapAPI
							? window.urlResource.TapTapAPI(t, e)
							: window.TapTapAPI && window.TapTapAPI[t]
							? window.TapTapAPI[t](e)
							: window.TapTapAPI && window.TapTapAPI(t, e);
					} catch (t) {}
				},
				c = function (t) {
					try {
						return JSON.parse(i("actionList")).includes(t);
					} catch (t) {}
				},
				u = function () {
					if (!i("tapEnv")) return "";
					try {
						var t, e;
						if ((0, a.Xh)("Android"))
							return null === (t = JSON.parse(i("tapEnv"))) ||
								void 0 === t
								? void 0
								: t.VN_CODE;
						if ((0, a.Xh)("iOS"))
							return null === (e = JSON.parse(i("tapEnv"))) ||
								void 0 === e
								? void 0
								: e.VN_NAME;
					} catch (t) {
						return "error";
					}
					return "";
				};
			e.ZP = i;
		},
		11623: function (t, e, n) {
			var r = n(43659),
				a = n(69800),
				o = n.n(a),
				i = { secure: !0 };
			e.Z = (0, r.Z)(
				(0, r.Z)({}, o()),
				{},
				{
					set: function (t, e, n) {
						return o().set(t, e, (0, r.Z)((0, r.Z)({}, i), n));
					},
				}
			);
		},
		93463: function (t, e, n) {
			n.d(e, {
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
			function i(t, e) {
				var n = (0, r.lg)(e, "deep", 0);
				if (t && t._isVue) {
					var i = (0, a.VC)(t, "feb-alive");
					if (i.length > 0) {
						i.reverse();
						var c = i[n];
						if (c.$el)
							return (
								c.$el.appendChild(t.$el), void o.set(t, c.$el)
							);
					}
				}
				if (document && document.querySelector) {
					var u = document.querySelector("#tap-account");
					u.appendChild(t && t._isVue ? t.$el : t), o.set(t, u);
				}
			}
			function c(t) {
				var e = o.get(t);
				o.delete(t), e && t && e.removeChild(t && t._isVue ? t.$el : t);
			}
			n(83454), n(78959), n(46163);
		},
		59685: function (t, e, n) {
			n.d(e, {
				Ny: function () {
					return o;
				},
				W2: function () {
					return u;
				},
				XN: function () {
					return p;
				},
				YX: function () {
					return d;
				},
				_D: function () {
					return l;
				},
				a5: function () {
					return f;
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
				f =
					"/market/images/65bb89800489915f2b02dfb7247c6da4.png",
				d = "/payment/orders",
				l =
					"/market/images/0fed2b40356e8a5f3ddf06a344f8d2a7.png",
				p = s;
		},
		18690: function (t, e, n) {
			n.d(e, {
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
		29298: function (t, e, n) {
			n.d(e, {
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
				var t,
					e,
					n = new Promise(function (n, r) {
						(t = n), (e = r);
					});
				return (n.resolve = t), (n.reject = e), n;
			}
			var a = r(),
				o = r(),
				i = r();
		},
		37485: function (t, e, n) {
			n.d(e, {
				R: function () {
					return a;
				},
			});
			var r = n(38739),
				a = function (t) {
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
							}["".concat(t)]
						) +
						" " +
						t
					);
				};
		},
		8637: function (t, e, n) {
			var r = n(97934),
				a = n(36558),
				o = n(80097),
				i = n(38739),
				c = {
					start: function () {
						a.Qm.$on("pageErrorHappened", function (t) {
							r.Z.commit("setPageError", t);
						}),
							a.Qm.$on("rewriteErrorHappened", function (t) {
								(0, o.Z)({ message: i.Z.t(t), duration: 3e3 });
							});
					},
				};
			e.Z = c;
		},
		65552: function (t, e) {
			var n = {
				listen: function (t, e, n) {
					var r =
						arguments.length > 3 &&
						void 0 !== arguments[3] &&
						arguments[3];
					return t.addEventListener
						? (t.addEventListener(e, n, r),
						  {
								remove: function () {
									t.removeEventListener(e, n, r);
								},
						  })
						: t.attachEvent
						? (t.attachEvent("on" + e, n),
						  {
								remove: function () {
									t.detachEvent("on" + e, n);
								},
						  })
						: void 0;
				},
			};
			e.Z = n;
		},
		23156: function (t, e, n) {
			n.d(e, {
				n: function () {
					return r;
				},
			});
			var r = function () {
				var t =
					arguments.length > 3 && void 0 !== arguments[3]
						? arguments[3]
						: "/";
				return (
					(arguments.length > 0 && void 0 !== arguments[0]
						? arguments[0]
						: "") +
					t +
					(arguments.length > 1 && void 0 !== arguments[1]
						? arguments[1]
						: "") +
					t +
					(arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: "")
				);
			};
		},
		54354: function (t, e, n) {
			n(5192), n(88467), n(83454);
		},
		9261: function (t, e, n) {
			n.d(e, {
				y: function () {
					return h;
				},
			});
			var r = n(1319),
				a = n(70800),
				o = n(13546),
				i = n.n(o),
				c = n(29206),
				u = n.n(c),
				s = n(36317),
				f = n(42918),
				d = n(4042),
				l = n(97934),
				p = n(80097);
			function h() {
				return g.apply(this, arguments);
			}
			function g() {
				return (
					(g = (0, a.Z)(
						(0, r.Z)().mark(function t() {
							var e,
								n,
								a,
								o,
								c,
								g,
								v,
								m,
								w,
								b,
								_,
								Z,
								y,
								k,
								S,
								I,
								T,
								x,
								A,
								P,
								C,
								N,
								E,
								O = arguments;
							return (0, r.Z)().wrap(
								function (t) {
									for (;;)
										switch ((t.prev = t.next)) {
											case 0:
												return (
													(n = (e =
														O.length > 0 &&
														void 0 !== O[0]
															? O[0]
															: {}).action),
													(a = void 0 === n ? "" : n),
													(o = e.captchaData),
													(c = void 0 === o ? {} : o),
													(g = e.target),
													(v = void 0 === g ? "" : g),
													(m = e.type),
													(w = void 0 === m ? "" : m),
													(b = e.unLogin),
													(_ = void 0 === b || b),
													(Z = e.callback),
													(y =
														void 0 === Z
															? function () {}
															: Z),
													(k = e.errorCallback),
													(S =
														void 0 === k
															? function () {}
															: k),
													(I = e.captchaType),
													(T =
														void 0 === I
															? void 0
															: I),
													(x = (0, p.Z)({
														loading: !0,
													})),
													(A = {
														action: a,
														captcha_type:
															T ||
															(0, d.lg)(
																l.Z.state,
																"globalConfig.captcha.captcha_type"
															),
													}),
													u()(c) ||
														(A.captcha_data = c),
													(P = "email_address"),
													(C = s._),
													"phone" === w &&
														((P = "phone_number"),
														(C = s.f)),
													(A[P] = v),
													(N = function (t) {
														var e =
															arguments.length >
																1 &&
															void 0 !==
																arguments[1]
																? arguments[1]
																: {};
														h({
															target: v,
															type: w,
															captchaData:
																t.captchaData,
															captchaType: i()(
																e,
																"captcha_type"
															),
															action: a,
															unLogin: _,
															callback: y,
															errorCallback: S,
														});
													}),
													(t.prev = 9),
													(t.next = 12),
													C({ unLogin: _, data: A })
												);
											case 12:
												(E = t.sent),
													x.remove(),
													y(E),
													(t.next = 21);
												break;
											case 17:
												(t.prev = 17),
													(t.t0 = t.catch(9)),
													x.remove(),
													"captcha.needs" ===
														i()(
															t.t0,
															"error.response.data.data.error"
														) &&
													i()(
														t.t0,
														"error.response.data.data.error_metadata"
													)
														? (0, f.Ew)({
																error: t.t0,
																callback:
																	function (
																		e
																	) {
																		var n =
																			i()(
																				t.t0,
																				"error.response.data.data.error_metadata"
																			);
																		N(e, n);
																	},
														  })
														: S(t.t0);
											case 21:
											case "end":
												return t.stop();
										}
								},
								t,
								null,
								[[9, 17]]
							);
						})
					)),
					g.apply(this, arguments)
				);
			}
		},
		42918: function (t, e, n) {
			n.d(e, {
				Ew: function () {
					return T;
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
				f = new Map(),
				d = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											if (
												((a = (0, u.lg)(e, "button")),
												!f.has(a))
											) {
												t.next = 5;
												break;
											}
											return (
												(o = f.get(a)).verify(),
												t.abrupt(
													"return",
													Promise.resolve(o)
												)
											);
										case 5:
											return (
												(t.next = 7),
												n.e(188).then(n.bind(n, 10188))
											);
										case 7:
											return t.abrupt(
												"return",
												new Promise(function (t) {
													initGeetest(
														{
															gt: (0, u.lg)(
																e,
																"gt"
															),
															challenge: (0,
															u.lg)(
																e,
																"challenge"
															),
															offline: !(0, u.lg)(
																e,
																"success"
															),
															product: "bind",
															new_captcha: (0,
															u.lg)(
																e,
																"new_captcha"
															),
														},
														function (n) {
															var r = (0, u.lg)(
																	e,
																	"onReady"
																),
																o = (0, u.lg)(
																	e,
																	"onSuccess"
																),
																i = (0, u.lg)(
																	e,
																	"onError"
																);
															f.set(a, n),
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
																t(n);
														}
													);
												})
											);
										case 8:
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
				l = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(a = (0, u.lg)(e, "button")),
												(o = (0, u.lg)(e, "callback")),
												(t.next = 4),
												n
													.e(2385)
													.then(
														n.t.bind(n, 12385, 23)
													)
											);
										case 4:
											window.initGeetest4(
												{
													captchaId: e.captchaId,
													product: "bind",
													language: e.language,
												},
												function (t) {
													t.appendTo(a),
														t
															.onReady(
																function () {
																	s.Qm.$emit(
																		"stopCaptchaLoading"
																	),
																		t.showCaptcha();
																}
															)
															.onSuccess(
																function () {
																	var e =
																		t.getValidate();
																	o && o(e),
																		t.destroy(),
																		(t =
																			null);
																}
															),
														t.onClose(function () {
															s.Qm.$emit(
																"stopCaptchaLoading"
															),
																t.reset();
														}),
														t.onError(function () {
															t.reset();
														});
												}
											);
										case 5:
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
			n(3174), n(86591), n(67096);
			function p(t, e) {
				t.addEventListener
					? t.addEventListener(
							"load",
							function () {
								t.setAttribute("loaded", !0), e && e();
							},
							!1
					  )
					: t.attachEvent &&
					  t.attachEvent("onreadystatechange", function () {
							"loaded" === window.event.srcElement.readyState &&
								(t.setAttribute("loaded", !0), e && e());
					  });
			}
			var h = function (t) {
					return (
						t.startsWith("http") ||
							(t =
								"/cupid-apps/web-app-account/public-static/" +
								t),
						new Promise(function (e) {
							var n = document.querySelector(
								'script[src="'.concat(t, '"]')
							);
							if (n) n.getAttribute("loaded") ? e() : p(n, e);
							else {
								var r = document.createElement("script"),
									a =
										document.getElementsByTagName(
											"head"
										)[0];
								(r.type = "text/javascript"),
									(r.charset = "UTF-8"),
									(r.src = t),
									p(r, e),
									a.appendChild(r);
							}
						})
					);
				},
				g = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, o, i, c, f, d, l;
							return (0, r.Z)().wrap(
								function (t) {
									for (;;)
										switch ((t.prev = t.next)) {
											case 0:
												if (
													((n = (0, u.lg)(
														e,
														"callback"
													)),
													(o = (0, u.lg)(
														e,
														"onCancel"
													)),
													(i = (0, u.lg)(
														e,
														"captcha_app_id"
													)),
													(t.prev = 3),
													!(0, s.DI)())
												) {
													t.next = 9;
													break;
												}
												return (
													(t.next = 7),
													h(
														"https://sg.captcha.qcloud.com/TCaptcha-global.js"
													)
												);
											case 7:
												t.next = 11;
												break;
											case 9:
												return (
													(t.next = 11),
													h(
														"https://turing.captcha.qcloud.com/TCaptcha.js"
													)
												);
											case 11:
												(c = new window.TencentCaptcha(
													i,
													function (t) {
														if (
															!(0, u.lg)(
																t,
																"ticket"
															)
														)
															return (
																o && o(),
																void s.Qm.$emit(
																	"stopCaptchaLoading"
																)
															);
														var r = (0, a.Z)(
															(0, a.Z)({}, e),
															t
														);
														n && n(r),
															c.destroy(),
															setTimeout(
																function () {
																	c = null;
																},
																0
															);
													},
													{}
												)),
													c.show(),
													(t.next = 23);
												break;
											case 15:
												(t.prev = 15),
													(t.t0 = t.catch(3)),
													(f =
														"terror_1001_" +
														i +
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
														ticket: f,
														errorCode: 1001,
														errorMessage:
															"jsload_error",
													}),
													(l = (0, a.Z)(
														(0, a.Z)({}, e),
														d
													)),
													n && n(l);
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
				})(),
				v = (n(83454), n(46163)),
				m = n(97934),
				w = n(20867),
				b = function (t) {
					var e = {};
					(0, u.lg)(t, "render") &&
						(e.render = (0, u.lg)(t, "render"));
					var n = "api";
					return (
						(0, u.lg)(t, "version") &&
							(n = (0, u.lg)(t, "version")),
						h(
							"https://www.google.com/recaptcha/"
								.concat(n, ".js")
								.concat(
									(0, v.stringify)(e, { addQueryPrefix: !0 })
								)
						)
					);
				},
				_ = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, u.lg)(e, "callback")),
												b({
													version: "enterprise",
													render: "explicit",
												}).then(function () {
													s.Qm.$emit(
														"stopCaptchaLoading"
													),
														(0, w.Z)({
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
				Z = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, u.lg)(e, "action")),
												(a = (0, u.lg)(e, "callback")),
												(o = (0, u.lg)(
													m.Z,
													"state.globalConfig.captcha.recaptcha_enterprise_score_key"
												)),
												b({
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
				y = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, u.lg)(e, "action")),
												(a = (0, u.lg)(e, "callback")),
												(o = (0, u.lg)(
													m.Z,
													"state.globalConfig.captcha.recaptcha_v3_key"
												)),
												b({ render: o }).then(
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
				k = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, a, o;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = (0, u.lg)(e, "callback")),
												(a = (0, u.lg)(e, "button")),
												(o = (0, u.lg)(
													m.Z,
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
											b().then(function () {
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
				})(),
				S = n(72395),
				I = (function () {
					var t = (0, o.Z)(
						(0, r.Z)().mark(function t(e) {
							var n, o, i, c, s, f, p;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											(n = e.captchaInfo),
												(o = e.callback),
												(i = e.button),
												(c =
													(0, u.lg)(
														n,
														"captcha_type"
													) ||
													(0, u.lg)(
														m.Z,
														"state.globalConfig.captcha.captcha_type"
													)),
												(s = (0, u.lg)(n, "action")),
												"geetest_v4" === c
													? ((n.language = x()),
													  (n.captchaId =
															(0, u.lg)(
																n,
																"captcha_id"
															) ||
															(0, u.lg)(
																m.Z,
																"state.globalConfig.captcha.captcha_id"
															)),
													  l(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	button: i,
																	callback:
																		function (
																			t
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								t
																							),
																					}
																				);
																		},
																}
															)
													  ))
													: "geetest" === c &&
													  (0, u.lg)(n, "challenge")
													? d(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	button: i,
																	onSuccess:
																		function (
																			t
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								t
																							),
																					}
																				);
																		},
																	onReady:
																		function (
																			t
																		) {
																			t.verify();
																		},
																}
															)
													  )
													: "tencent_captcha" === c
													? g(
															(0, a.Z)(
																(0, a.Z)({}, n),
																{},
																{
																	callback:
																		function (
																			t
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								t
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
														? _({
																action: s,
																callback:
																	function (
																		t
																	) {
																		o &&
																			o({
																				captchaData:
																					JSON.stringify(
																						{
																							g_recaptcha_response:
																								t,
																							g_recaptcha_version:
																								"checkbox",
																							action: s,
																						}
																					),
																			});
																	},
														  })
														: Z({
																action: s,
																callback:
																	function (
																		t
																	) {
																		o &&
																			o({
																				captchaData:
																					JSON.stringify(
																						{
																							g_recaptcha_response:
																								t,
																							g_recaptcha_version:
																								"score",
																							action: s,
																						}
																					),
																			});
																	},
														  })
													: "recaptcha" === c &&
													  ((f = (0, u.lg)(
															n,
															"recaptcha_version"
													  )),
													  (p = (0, u.lg)(
															n,
															"action"
													  )),
													  "v3" === f
															? y({
																	action: p,
																	callback:
																		function (
																			t
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								{
																									g_recaptcha_response:
																										t,
																									g_recaptcha_version:
																										f,
																									action: p,
																								}
																							),
																					}
																				);
																		},
															  })
															: "v2" === f &&
															  k({
																	button: i,
																	callback:
																		function (
																			t
																		) {
																			o &&
																				o(
																					{
																						captchaData:
																							JSON.stringify(
																								{
																									g_recaptcha_response:
																										t,
																									g_recaptcha_version:
																										f,
																								}
																							),
																					}
																				);
																		},
															  }));
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
				T = function (t) {
					var e = t.error,
						n = t.callback,
						r = t.button,
						a = c()(e, "error.response.data.data.error_metadata");
					a && I({ captchaInfo: a, callback: n, button: r });
				},
				x = function () {
					var t = (0, S.VQ)(),
						e = [
							{ lang: "zh_CN", gt4Lang: "zho" },
							{ lang: "zh_TW", gt4Lang: "zho-tw" },
							{ lang: "en_US", gt4Lang: "eng" },
							{ lang: "ja_JP", gt4Lang: "jpn" },
							{ lang: "ko_KR", gt4Lang: "kor" },
							{ lang: "id_ID", gt4Lang: "ind" },
						].find(function (e) {
							return e.lang === t;
						});
					return e ? e.gt4Lang : (0, s.DI)() ? "eng" : "zho";
				};
		},
		31685: function (t, e, n) {
			n.d(e, {
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
					} catch (t) {
						return "" + (0, a.Nb)("DOMAIN_TAP");
					}
				},
				i = function () {
					return window.self !== window.top;
				},
				c = function () {
					var t = "";
					try {
						t = parent.location.origin;
						var e = "https://sight.xdrnd.cn";
						"string" == typeof document.referrer &&
							document.referrer.includes(e) &&
							(t = e);
					} catch (e) {
						"string" != typeof document.referrer ||
							document.referrer.includes(location.origin) ||
							(t = document.referrer);
					}
					return t || (t = "" + (0, a.Nb)("DOMAIN_TAP")), t;
				},
				u = function () {
					if (!i() || r.Z.state.isInSDK) return !1;
					var t = c(),
						e = "" + (0, a.Nb)("ACCOUNT_DOMAIN_TAP");
					return t.includes(e);
				};
		},
		99353: function (t, e, n) {
			function r() {
				return (
					!(!navigator || "function" != typeof window.matchMedia) &&
					(!0 === navigator.standalone ||
						window.matchMedia("(display-mode: standalone)").matches)
				);
			}
			n.d(e, {
				Z: function () {
					return r;
				},
			});
		},
		30878: function (t, e, n) {
			n.d(e, {
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
					var t = (0, a.Z)(
						(0, r.Z)().mark(function t(e) {
							var n,
								a,
								u = arguments;
							return (0, r.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(n = (
													u.length > 1 &&
													void 0 !== u[1]
														? u[1]
														: {}
												).inSDK),
												(a = (0, i.lg)(
													(0, c.jq)(e),
													"host",
													location.origin
												)),
												(t.next = 5),
												(0, o.p)(e)
											);
										case 5:
											return t.abrupt(
												"return",
												new Promise(function (t) {
													window.addEventListener(
														"message",
														function (e) {
															if (
																e.origin.includes(
																	a
																)
															) {
																var r =
																	e.data &&
																	JSON.parse(
																		e.data
																	);
																n &&
																	r &&
																	r.selfLogoutSuccess &&
																	t({
																		done: !0,
																	}),
																	r && r.done
																		? t({
																				done: !0,
																		  })
																		: r &&
																		  r.timeout &&
																		  t({
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
		59696: function (t, e, n) {
			n.d(e, {
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
			function i(t, e) {
				var n, r;
				a &&
					(o[t] && (c(t), (o[t] = null)),
					(o[t] = e),
					e(a[t]),
					(n = a[t]),
					(r = e),
					n.addEventListener
						? n.addEventListener("change", r)
						: n.addListener(r));
			}
			function c(t) {
				a &&
					(Array.isArray(t) &&
						t.length > 0 &&
						t.forEach(function (t) {
							a[t].removeEventListener("change", o[t]);
						}),
					"string" == typeof t &&
						a[t].removeEventListener("change", o[name]));
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
		82781: function (t, e, n) {
			n.d(e, {
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
				i = Object.keys(o).filter(function (t) {
					return o[t].isErrorPageCode;
				});
			function c(t) {
				var e = (t && t.status) || -1e3;
				return 200 == e
					? t.data.data
					: {
							code: e,
							msg:
								a()(o, "".concat(e), {}).errorMessage ||
								"连接错误",
					  };
			}
		},
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
		93476: function (t, e, n) {
			n.d(e, {
				h: function () {
					return C;
				},
				W: function () {
					return R;
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
				d = n.n(f),
				l = n(69800),
				p = n.n(l),
				h = n(80097),
				g = n(44542),
				v = n(46163),
				m = n(72395),
				w = n(36558),
				b = n(82781);
			var _ = n(99304),
				Z = n(70285),
				y = n(76532),
				k = n(97934),
				S = n(4042),
				I = n(78630),
				T = n(38739),
				x = n(57997),
				A = n(11993)({ storeAsString: !0 }),
				P = I.ZP.getPlatform();
			"web" === P && (P = "PC");
			var C = function () {
				var t,
					e = (0, m.VQ)();
				t = (0, w.Tj)() || (0, w.DI)() ? "AccountsIntl" : "Accounts";
				var n = (0, g.F)(),
					r = p().get("ACCOUNTS_VID"),
					a = {
						V: 1,
						PN: t,
						LANG: e,
						VN_CODE: y.VN_CODE,
						UID: n,
						PLT: P,
					};
				return r && (a.VID = r), (0, v.stringify)(a);
			};
			function N() {
				var t =
					arguments.length > 0 && void 0 !== arguments[0]
						? arguments[0]
						: {};
				return (
					!s()(t, "enableSlowNetworkInterceptor") ||
					t.enableSlowNetworkInterceptor
				);
			}
			var E = new Set();
			var O = d().create({
				timeout: 6e4,
				transformResponse: [
					function (t) {
						if ("string" == typeof t)
							try {
								return A.parse(t);
							} catch (t) {}
						return { isNotJSON: !0, data: t };
					},
				],
			});
			function L(t) {
				var e = t.config.slowNetworkConfig;
				N(t.config) && E.delete(e.id);
				var n = null;
				if (
					-1 === c()(t, "response.status", -1) ||
					c()(t, "isNotJSON")
				) {
					n = -1;
					var a = c()(Z.b, "".concat(n), {}).errorMessage;
					w.Qm.$emit("rewriteErrorHappened", a);
				}
				null !== n &&
					(o()(t, "response.status", n), o()(t, "response.code", n)),
					401 === c()(t, "response.status") &&
						w.Qm.$emit("markSignOut");
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
					w.Qm.$emit("pageErrorHappened", c()(t, "response"));
				var u = (0, b.XZ)(t.response);
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
						d = c()(t, "response.data.data.msg", "");
					405 === c()(t, "response.status") &&
						(d = T.Z.t("error_405")),
						f
							? x.default.prototype
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
							: d && (0, h.Z)({ message: d, duration: 3e3 });
				}
				return Promise.reject(
					(0, r.Z)((0, r.Z)({}, u), {}, { error: t })
				);
			}
			(O.defaults.slowNetworkConfig = { slowTime: 5e3 }),
				O.interceptors.request.use(function (t) {
					var e = (t = t || {}).params || {};
					(t.params = (0, r.Z)(
						(0, r.Z)({}, e),
						{},
						{ "X-UA": C(t) }
					)),
						(t.headers["x-requested-with"] = "XMLHttpRequest"),
						(t.headers["X-UA"] = C(t));
					var n = t.url || "";
					n.startsWith("https://www.taptap.com") &&
						(n = n.replace("https://www.taptap.com", "")),
						(t.url = n),
						"post" === t.method &&
							(t.data = (0, v.stringify)(t.data)),
						(0, S.lg)(k.Z, "state.clientXUA") &&
							(t.headers["X-CLIENT-XUA"] = (0, S.lg)(
								k.Z,
								"state.clientXUA"
							)),
						(0, S.lg)(k.Z, "state.sdkUA") &&
							(t.headers["X-TAP-SDK-UA"] = (0, S.lg)(
								k.Z,
								"state.sdkUA"
							)),
						(0, S.lg)(k.Z, "state.gameScene") &&
							(t.headers["X-Client-Game-Scene"] = (0, S.lg)(
								k.Z,
								"state.gameScene"
							));
					var a = t.slowNetworkConfig;
					if (N(t)) {
						var o = (function (t) {
							return t + new Date().getTime() + Math.random();
						})(t.url);
						E.add(o),
							(a.id = o),
							setTimeout(function () {
								E.has(o) &&
									((0, h.Z)({
										message: T.Z.t("loading_tips"),
										duration: 3e3,
									}),
									E.delete(o));
							}, a.slowTime);
					}
					return t;
				}),
				O.interceptors.response.use(function (t) {
					if (c()(t, "data.isNotJSON")) {
						var e = new Error("The data is not json!");
						e.name = "InvalidJsonData";
						var n = {
							response: t,
							isNotJSON: !0,
							config: t.config,
						};
						return Object.assign(e, n), L(e);
					}
					s()(t, "data.now") && (0, _.wS)(c()(t, "data.now"));
					var r = t.config.slowNetworkConfig;
					return (
						N(t.config) && E.delete(r.id),
						(function (t, e) {
							var n,
								r = t.config.mainRequest,
								a = void 0 !== r && r;
							if (200 === t.status) {
								if (a && t.data && t.data.redirect) {
									var o = (n = t.data.redirect)
											? {
													mustRedirect: !0,
													webUrl: n.web_url,
													redirectCode:
														n.status || 301,
											  }
											: { mustRedirect: !1 },
										i = o.webUrl,
										c = o.redirectCode;
									if (o.mustRedirect)
										throw (
											(setTimeout(function () {
												w.Qm.$emit("pageRedirect", i);
											}),
											new Error(c))
										);
								}
								return t.data.data;
							}
							return t;
						})(t)
					);
				}, L);
			var R = O;
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
					return d;
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
				d = a();
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
				d = { color: {}, layout: {} };
			function l(t) {
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
								a = l(e);
							d[e][n]
								? (!(function (t) {
										document.head.appendChild(
											t.cloneNode(!0)
										);
								  })(d[e][n]),
								  r(a))
								: f[e][n] &&
								  f[e][n]().then(function () {
										r(a), (d[e][n] = l(e).cloneNode(!0));
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
			var r = n(93476),
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
				d = n(16559),
				l = (function () {
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
											(0, d.O9)(t) + 1
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
			e.Z = l;
		},
		51328: function (t, e, n) {
			n.d(e, {
				BS: function () {
					return k;
				},
				I: function () {
					return S;
				},
				SB: function () {
					return y;
				},
				uH: function () {
					return _;
				},
				ux: function () {
					return b;
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
				d = n(24591),
				l = n(29298),
				p = n(97934),
				h = n(78630),
				g = n(12736),
				v = n(4042),
				m = n(69878),
				w = n(68485);
			n(69800), n(31685), n(72395);
			m.Z.get("showLogConsole");
			var b = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i, c, f, l, p, h, g, m, w, b, _, Z;
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
												(l = e.logUrl),
												(p = void 0 === l ? "" : l),
												(m = !1),
												!r)
											) {
												t.next = 13;
												break;
											}
											return (
												(t.next = 5),
												N({
													currentTrackValue: o,
													action: "page_view",
													boothInfo: (0, s.iG)(f, !0),
												})
											);
										case 5:
											return (
												(g = t.sent),
												i && (g["G-URL"] = i),
												(t.next = 9),
												T(p)
											);
										case 9:
											(h = t.sent),
												(m = !0),
												(t.next = 24);
											break;
										case 13:
											return (t.next = 15), E("pageView");
										case 15:
											return (
												(g = t.sent),
												(w = (0, v.lg)(
													n,
													"page_view.params",
													{}
												)),
												(t.next = 19),
												A(n)
											);
										case 19:
											(h = t.sent),
												(g = Object.assign(g, w)),
												(b = (0, u.jq)(location.href)),
												(_ = b.path),
												"AppDetail" ===
												(Z =
													d.Z.resolve(_).resolved
														.name)
													? ("baidu" ===
															g.utm_source &&
															"sem" ===
																g.utm_medium &&
															(g.via =
																"baidusem"),
													  (g = O(g)))
													: "TopicDetail" === Z &&
													  (g = O(g));
										case 24:
											(g = P(g)), (g = R(g, m)), I(g, h);
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
				_ = (function () {
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
												T(
													(0, v.lg)(
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
																						N(
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
																							L()),
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
																							O(
																								r
																							)),
																						Z(
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
											(r = t.sent), Z(r, i);
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
				Z = function (t, e) {
					var n = P(t),
						r = {};
					["via", "property"].map(function (t) {
						Object.prototype.hasOwnProperty.call(n, t) &&
							(r[t] = n[t]);
					}),
						(0, v.xb)(r) ||
							(0, s.$A)({ logParam: { needToPassParams: r } }),
						I(n, e);
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
												N({
													currentTrackValue: n,
													action: "view",
													isDirectiveValue: !0,
													boothInfo: (0, s.iG)(e),
												})
											);
										case 3:
											return (
												(r = t.sent),
												(r = P(r)),
												(t.t0 = I),
												(t.t1 = r),
												(t.next = 9),
												T(
													(0, v.lg)(
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
													d.Z.app &&
													d.Z.app.$el &&
													d.Z.app.$el.querySelector(
														"[data-booth]"
													)),
												(t.next = 3),
												N({
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
												(t.t0 = I),
												(t.t1 = o),
												(t.next = 8),
												T()
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
				S = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n,
								o,
								i,
								c,
								u,
								f,
								d,
								l,
								p,
								h,
								g,
								v,
								m,
								w,
								b,
								_,
								Z,
								y,
								k,
								S,
								x,
								A,
								C,
								O;
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
												(d = e.needPosition),
												(l = void 0 === d || d),
												(p = e.needReferer),
												(h = void 0 === p || p),
												(g = e.customUrl),
												(v = void 0 === g ? "" : g),
												(m = e.isDirectiveValue),
												(w = void 0 !== m && m),
												(b = e.boothInfo),
												(_ = void 0 === b ? {} : b),
												(Z = e.customLogStore),
												(y = e.delayTrack),
												(k = void 0 !== y && y),
												(S = e.logTopic),
												"v2" !== c)
											) {
												t.next = 14;
												break;
											}
											return (
												(C = o.action),
												(t.next = 5),
												N({
													action: C,
													currentTrackValue: o,
													isDirectiveValue: w,
													boothInfo: _,
												})
											);
										case 5:
											if (
												((x = t.sent), (t.t0 = v), t.t0)
											) {
												t.next = 11;
												break;
											}
											return (t.next = 10), T(Z);
										case 10:
											t.t0 = t.sent;
										case 11:
											(A = t.t0), (t.next = 24);
											break;
										case 14:
											return (
												(O = o.type),
												(t.next = 17),
												E(O)
											);
										case 17:
											if (
												((x = t.sent), (t.t1 = v), t.t1)
											) {
												t.next = 23;
												break;
											}
											return (
												(t.next = 22), T(Z || "logs")
											);
										case 22:
											t.t1 = t.sent;
										case 23:
											A = t.t1;
										case 24:
											if (
												(l && (x = P(x)),
												f &&
													(x = (0, r.Z)(
														(0, r.Z)(
															{},
															(0, s.jN)()
																.mainRequestParams
														),
														x
													)),
												h && (x = R(x)),
												S && (x.__topic__ = S),
												!k)
											) {
												t.next = 30;
												break;
											}
											return t.abrupt(
												"return",
												function (t) {
													return I(
														(0, r.Z)(
															(0, r.Z)({}, x),
															t
														),
														A
													);
												}
											);
										case 30:
											I(x, A);
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
				I = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e, n) {
							var r, o, i, c;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											if (
												((r = { t_log_id: (0, g.Z)() }),
												Object.assign(e, r),
												!(0, v.lg)(
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
											return (t.next = 15), T();
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
				T = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (t.next = 2), l.up;
										case 2:
											return (
												(n = x(e)),
												(r =
													p.Z.state.globalConfig ||
													{}),
												(o = (0, v.lg)(
													r,
													"aliyun_log.endpoint"
												)),
												(i = (0, v.lg)(
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
				x = function (t) {
					return (
						t ||
						(0, v.lg)(
							d.Z.currentRoute,
							"meta.customPageLogStore",
							(0, w.P_)()
						)
					);
				},
				A = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (
												(t.t0 = v.lg),
												(t.t1 = e),
												(t.next = 4),
												T("logs")
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
				P = function (t) {
					var e = (0, s.Ix)();
					return (
						!Object.prototype.hasOwnProperty.call(t, "position") &&
							e &&
							(t.position = e),
						t
					);
				},
				C = function () {
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
				N = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, o, i, c, u, s, d, h, g;
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
												(d = c ? n.event_log : n),
												(t.next = 4),
												l.up
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
												(0, w.u5)()
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
												(t.t10 = d),
												(t.t11 = (0, t.t2)(
													t.t9,
													t.t10
												)),
												(t.t12 = (0, v.lg)(
													n,
													"terms",
													{}
												)),
												(t.t13 = (0, t.t1)(
													t.t11,
													t.t12
												)),
												(t.t14 = s),
												(g = (0, t.t0)(t.t13, t.t14)),
												p.Z.state.profile &&
													p.Z.state.profile.XUT &&
													(g.XUT =
														p.Z.state.profile.XUT),
												p.Z.state.isIntl &&
													(p.Z.state.isInSDK &&
														(g.ctx = (0, r.Z)(
															(0, r.Z)({}, g.ctx),
															{},
															{ in_sdk: !0 }
														)),
													p.Z.state.isInApp &&
														(g.ctx = (0, r.Z)(
															(0, r.Z)({}, g.ctx),
															{},
															{ in_app: !0 }
														))),
												t.abrupt(
													"return",
													(0, r.Z)(
														(0, r.Z)({}, C()),
														g
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
				E = (function () {
					var t = (0, o.Z)(
						(0, a.Z)().mark(function t(e) {
							var n, r, o, i;
							return (0, a.Z)().wrap(function (t) {
								for (;;)
									switch ((t.prev = t.next)) {
										case 0:
											return (t.next = 2), (0, w.u5)();
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
				O = function (t) {
					var e = L(),
						n = e.fromSearchPage,
						r = e.keyword,
						a = e.referer;
					return n && r && ((t.referer = a), (t.keyWord = r)), t;
				},
				L = function () {
					var t = !1,
						e = null,
						n = null,
						r = p.Z.state.referrer
							? p.Z.state.referrer
							: document.referrer,
						a = (0, u.jq)(r).path;
					if (a) {
						var o = d.Z.resolve(a).resolved,
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
				R = function (t, e) {
					if (!Object.prototype.hasOwnProperty.call(t, "referer")) {
						var n = (0, s.jN)().refererLogParams;
						if ((0, v.lg)(n, "referer") && !c()(n.referer)) {
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
					return g;
				},
				O9: function () {
					return _;
				},
				h3: function () {
					return Z;
				},
				iG: function () {
					return w;
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
				d = n(69878),
				l = {},
				p =
					(d.Z.get("showLogConsole"),
					function () {
						var t =
							arguments.length > 0 && void 0 !== arguments[0]
								? arguments[0]
								: s.Z.currentRoute;
						return v(t)
							? l[v(t)] || {}
							: (0, u.lg)(t, "params._trackParams", {});
					}),
				h = function (t) {
					var e = t.logParam,
						n = t.targetRoute,
						r = void 0 === n ? s.Z.currentRoute : n,
						a = p(r);
					if (v(r)) {
						var o = v(r);
						(a = l[o]), c()(l, o, Object.assign({}, a, e));
					} else
						c()(r, "params._trackParams", Object.assign({}, a, e));
				},
				g = function () {
					var t =
						arguments.length > 0 && void 0 !== arguments[0]
							? arguments[0]
							: s.Z.currentRoute;
					return o()(t, "meta.routeLogParams.position", "").split(
						"|"
					)[0];
				},
				v = function (t) {
					return o()(t, "meta.routeLogParams.extendParent", !1);
				},
				m = function () {
					return o()(s.Z.currentRoute, "meta.needReadTracker", !1);
				},
				w = function (t) {
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
						t && !b(t);

					)
						t.dataset &&
							t.dataset.booth &&
							(Object.prototype.hasOwnProperty.call(
								t.dataset,
								"boothId"
							) ||
								(t.setAttribute("data-booth-id", Z()),
								t.setAttribute("data-booth-level", _(t))),
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
				b = function (t) {
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
				_ = function (t) {
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
				Z = function () {
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
