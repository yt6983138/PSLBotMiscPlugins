(self.webpackChunk_taptap_cupid_spa_web_app_account =
	self.webpackChunk_taptap_cupid_spa_web_app_account || []).push([
	[4339],
	{
		35053: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return c;
				},
			});
			var i = n(43659),
				o = (n(5192), n(4403)),
				r = n(57091),
				a = n(36428),
				s = {
					name: "CheckTerms",
					components: { TapText: o.Z, TapCheckbox: r.Z },
					watch: {
						initSelect: function (e) {
							this.isSelect = e;
						},
					},
					computed: (0, i.Z)({}, (0, a.rn)(["isMobileLandscape"])),
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
					(n(78573),
					(0, n(39563).Z)(
						s,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
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
									n("tap-checkbox", {
										staticClass: "check-terms_box",
										attrs: {
											size: e.size,
											selected: e.isSelect,
										},
										on: { selectCheckbox: e.check },
									}),
									n(
										"div",
										{
											staticClass: "check-terms__text",
											on: { click: e.handleClick },
										},
										[
											e._t("default", function () {
												return [
													n(
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
		49345: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return pe;
				},
			});
			var i = n(1319),
				o = n(70800),
				r = n(43659),
				a =
					(n(25926),
					n(33815),
					n(39958),
					n(16724),
					n(99315),
					n(93117)),
				s = (n(8469), n(23242)),
				c = n.n(s),
				l = n(87240),
				u = n.n(l),
				d = new (c())({
					id: "icon-email--colorful",
					use: "icon-email--colorful-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol fill="none" viewBox="0 0 24 24" id="icon-email--colorful"><path fill="#00D9C5" d="M12 2.2c8.493 0 9.8 3.811 9.8 9.8 0 5.989-1.6 9.8-9.8 9.8-8.2 0-9.8-4.41-9.8-9.8 0-5.39 1.307-9.8 9.8-9.8Z" /><mask id="icon-email--colorful_a" fill="#fff"><path fill-rule="evenodd" d="M6.472 8.162c-.305.6-.305 1.383-.305 2.951v1.774c0 1.568 0 2.352.305 2.951a2.8 2.8 0 0 0 1.223 1.224c.6.305 1.383.305 2.952.305h2.706c1.568 0 2.353 0 2.952-.305a2.8 2.8 0 0 0 1.223-1.224c.305-.599.305-1.383.305-2.951v-1.774c0-1.568 0-2.352-.305-2.95a2.8 2.8 0 0 0-1.223-1.224c-.6-.306-1.384-.306-2.952-.306h-2.706c-1.569 0-2.353 0-2.952.306a2.8 2.8 0 0 0-1.223 1.223Zm1.814 1.957a.239.239 0 0 0-.292.022.955.955 0 0 0 .098 1.494l2.184 1.508c.834.576 1.251.864 1.724.864.473 0 .89-.288 1.723-.864l2.185-1.508a.955.955 0 0 0 .098-1.494.239.239 0 0 0-.292-.022l-3.456 2.293c-.125.083-.188.125-.258.125s-.133-.042-.258-.125L8.286 10.12Z" clip-rule="evenodd" /></mask><path fill="#fff" fill-rule="evenodd" d="M6.472 8.162c-.305.6-.305 1.383-.305 2.951v1.774c0 1.568 0 2.352.305 2.951a2.8 2.8 0 0 0 1.223 1.224c.6.305 1.383.305 2.952.305h2.706c1.568 0 2.353 0 2.952-.305a2.8 2.8 0 0 0 1.223-1.224c.305-.599.305-1.383.305-2.951v-1.774c0-1.568 0-2.352-.305-2.95a2.8 2.8 0 0 0-1.223-1.224c-.6-.306-1.384-.306-2.952-.306h-2.706c-1.569 0-2.353 0-2.952.306a2.8 2.8 0 0 0-1.223 1.223Zm1.814 1.957a.239.239 0 0 0-.292.022.955.955 0 0 0 .098 1.494l2.184 1.508c.834.576 1.251.864 1.724.864.473 0 .89-.288 1.723-.864l2.185-1.508a.955.955 0 0 0 .098-1.494.239.239 0 0 0-.292-.022l-3.456 2.293c-.125.083-.188.125-.258.125s-.133-.042-.258-.125L8.286 10.12Z" clip-rule="evenodd" /><path fill="#fff" d="m6.472 8.162-1.04-.53 1.04.53Zm0 7.676 1.04-.53-1.04.53Zm1.223 1.224-.53 1.04.53-1.04Zm8.61 0 .53 1.04-.53-1.04Zm1.223-1.224 1.04.53-1.04-.53Zm0-7.676 1.04-.53-1.04.53ZM16.305 6.94l-.53 1.04.53-1.04Zm-8.61 0-.53-1.04.53 1.04Zm.299 3.202-.783-.865.783.865Zm.292-.022.645-.972-.645.972Zm-.194 1.516.663-.96-.663.96Zm2.184 1.508-.662.96.662-.96Zm3.447 0 .663.96-.662-.96Zm2.185-1.508-.663-.96.663.96Zm.098-1.494-.783.865.783-.865Zm-.292-.022.645.973-.645-.973Zm-3.456 2.293.645.972-.645-.972Zm-.516 0 .645-.972-.645.972Zm-4.409-1.299c0-.803.001-1.335.035-1.744.032-.394.088-.57.143-.677l-2.079-1.06c-.25.492-.346 1.008-.39 1.547C4.999 9.705 5 10.35 5 11.113h2.333Zm0 1.774v-1.774H5v1.774h2.333Zm.178 2.421c-.055-.107-.111-.282-.143-.677-.034-.409-.035-.94-.035-1.744H5c0 .765 0 1.408.042 1.934.044.539.14 1.055.39 1.547l2.08-1.06Zm.714.714a1.633 1.633 0 0 1-.714-.714l-2.079 1.06c.38.746.987 1.353 1.734 1.733l1.06-2.079Zm2.422.178c-.804 0-1.336 0-1.744-.034-.395-.032-.57-.089-.678-.144l-1.06 2.08c.492.25 1.009.345 1.548.39.525.042 1.169.041 1.934.041V16.2Zm2.706 0h-2.706v2.334h2.706V16.2Zm2.422-.178c-.108.055-.283.112-.678.144-.408.033-.94.034-1.744.034v2.334c.765 0 1.409 0 1.934-.043.54-.044 1.056-.14 1.547-.39l-1.06-2.079Zm.714-.714a1.633 1.633 0 0 1-.714.714l1.06 2.08a3.966 3.966 0 0 0 1.733-1.734l-2.08-1.06Zm.178-2.421c0 .803-.001 1.335-.035 1.744-.032.395-.089.57-.143.677l2.079 1.06c.25-.492.346-1.008.39-1.547.043-.526.042-1.17.042-1.934h-2.333Zm0-1.774v1.774H19v-1.774h-2.333Zm-.178-2.421c.054.108.111.283.143.677.034.409.035.941.035 1.745H19c0-.765 0-1.41-.042-1.935-.044-.539-.14-1.055-.39-1.546l-2.08 1.059Zm-.714-.714c.307.157.557.407.714.714l2.079-1.06A3.967 3.967 0 0 0 16.834 5.9l-1.06 2.08ZM13.353 7.8c.804 0 1.336.001 1.744.034.395.033.57.09.678.144l1.06-2.079c-.492-.25-1.009-.346-1.548-.39-.525-.043-1.169-.042-1.934-.042V7.8Zm-2.706 0h2.706V5.467h-2.706V7.8Zm-2.422.178c.108-.055.283-.111.678-.144.408-.033.94-.034 1.744-.034V5.467c-.765 0-1.409-.001-1.934.042-.54.044-1.056.14-1.547.39l1.06 2.08Zm-.714.714c.157-.307.407-.557.714-.714L7.165 5.9a3.967 3.967 0 0 0-1.733 1.734l2.08 1.059Zm1.266 2.314a.928.928 0 0 1-1.136.085l1.29-1.944a1.405 1.405 0 0 0-1.72.13l1.566 1.73Zm-.022-.33a.21.21 0 0 1 .022.33L7.21 9.276a2.122 2.122 0 0 0 .218 3.32l1.326-1.92Zm2.184 1.507-2.184-1.508-1.326 1.92 2.185 1.508 1.325-1.92ZM12 12.84c.026 0-.002.016-.174-.076-.197-.106-.448-.278-.887-.58l-1.325 1.92c.395.273.77.533 1.107.715.363.195.78.355 1.279.355V12.84Zm1.06-.657c-.438.303-.69.475-.886.58-.172.093-.2.077-.174.077v2.334c.499 0 .915-.16 1.279-.355.338-.182.712-.442 1.107-.716l-1.325-1.92Zm2.185-1.508-2.184 1.508 1.325 1.92 2.185-1.508-1.326-1.92Zm-.022.331a.212.212 0 0 1 .022-.33l1.326 1.92a2.122 2.122 0 0 0 .218-3.32l-1.566 1.73Zm1.136.085a.928.928 0 0 1-1.136-.085l1.566-1.73a1.405 1.405 0 0 0-1.72-.129l1.29 1.944Zm-3.456 2.293 3.456-2.293-1.29-1.944-3.456 2.293 1.29 1.944Zm-.903.32a1.4 1.4 0 0 0 .645-.162c.109-.057.216-.13.258-.158l-1.29-1.944c-.034.023-.05.034-.063.041-.012.008-.001 0 .022-.011.054-.028.21-.1.428-.1v2.334Zm-.903-.32c.041.028.149.101.258.158.134.07.356.162.645.162V11.37c.218 0 .374.072.428.1.023.012.034.019.022.011a3.595 3.595 0 0 1-.063-.04l-1.29 1.943ZM7.64 11.091l3.456 2.293 1.29-1.944L8.93 9.147l-1.29 1.944Z" mask="url(#icon-email--colorful_a)" /></symbol>',
				}),
				h =
					(u().add(d),
					new (c())({
						id: "icon-phone--colorful",
						use: "icon-phone--colorful-usage",
						viewBox: "0 0 24 24",
						content:
							'<symbol fill="none" viewBox="0 0 24 24" id="icon-phone--colorful"><path fill="#00D9C5" d="M12 2.2c8.493 0 9.8 3.811 9.8 9.8 0 5.989-1.6 9.8-9.8 9.8-8.2 0-9.8-4.41-9.8-9.8 0-5.39 1.307-9.8 9.8-9.8Z" /><g fill="#fff" clip-path="url(#icon-phone--colorful_a)"><mask id="icon-phone--colorful_b"><path fill-rule="evenodd" d="M7.333 10.063c0-1.568 0-2.352.306-2.95a2.8 2.8 0 0 1 1.223-1.224c.6-.306 1.383-.306 2.951-.306h.374c1.568 0 2.352 0 2.95.306a2.8 2.8 0 0 1 1.224 1.223c.306.6.306 1.383.306 2.951v3.874c0 1.568 0 2.352-.306 2.951a2.8 2.8 0 0 1-1.223 1.224c-.6.305-1.383.305-2.951.305h-.374c-1.568 0-2.352 0-2.95-.305a2.8 2.8 0 0 1-1.224-1.224c-.306-.599-.306-1.383-.306-2.951v-3.873Zm1.334-.89c0-.784 0-1.176.152-1.475a1.4 1.4 0 0 1 .612-.612c.3-.152.692-.152 1.476-.152h2.186c.784 0 1.177 0 1.476.152a1.4 1.4 0 0 1 .612.612c.152.3.152.691.152 1.476v2.106c0 1.046 0 1.568-.203 1.968a1.866 1.866 0 0 1-.816.815c-.4.204-.922.204-1.967.204h-.694c-1.045 0-1.568 0-1.967-.204a1.867 1.867 0 0 1-.816-.815c-.203-.4-.203-.922-.203-1.968V9.174Zm4.5 7.41c0 .357-.156.584-1.167.584-1.011 0-1.167-.263-1.167-.584 0-.32.19-.583 1.167-.583.976 0 1.167.227 1.167.584Z" clip-rule="evenodd" /></mask><path fill-rule="evenodd" d="M7.333 10.063c0-1.568 0-2.352.306-2.95a2.8 2.8 0 0 1 1.223-1.224c.6-.306 1.383-.306 2.951-.306h.374c1.568 0 2.352 0 2.95.306a2.8 2.8 0 0 1 1.224 1.223c.306.6.306 1.383.306 2.951v3.874c0 1.568 0 2.352-.306 2.951a2.8 2.8 0 0 1-1.223 1.224c-.6.305-1.383.305-2.951.305h-.374c-1.568 0-2.352 0-2.95-.305a2.8 2.8 0 0 1-1.224-1.224c-.306-.599-.306-1.383-.306-2.951v-3.873Zm1.334-.89c0-.784 0-1.176.152-1.475a1.4 1.4 0 0 1 .612-.612c.3-.152.692-.152 1.476-.152h2.186c.784 0 1.177 0 1.476.152a1.4 1.4 0 0 1 .612.612c.152.3.152.691.152 1.476v2.106c0 1.046 0 1.568-.203 1.968a1.866 1.866 0 0 1-.816.815c-.4.204-.922.204-1.967.204h-.694c-1.045 0-1.568 0-1.967-.204a1.867 1.867 0 0 1-.816-.815c-.203-.4-.203-.922-.203-1.968V9.174Zm4.5 7.41c0 .357-.156.584-1.167.584-1.011 0-1.167-.263-1.167-.584 0-.32.19-.583 1.167-.583.976 0 1.167.227 1.167.584Z" clip-rule="evenodd" /><path d="m7.639 7.112-1.04-.53 1.04.53ZM8.862 5.89l-.53-1.04.53 1.04Zm6.276 0 .53-1.04-.53 1.04Zm1.223 1.223 1.04-.53-1.04.53Zm0 9.776 1.04.53-1.04-.53Zm-1.223 1.224.53 1.04-.53-1.04Zm-6.276 0-.53 1.04.53-1.04ZM7.64 16.888l-1.04.53 1.04-.53Zm1.18-9.19-1.04-.53 1.04.53Zm.612-.612-.53-1.04.53 1.04Zm5.138 0-.53 1.04.53-1.04Zm.612.612 1.04-.53-1.04.53Zm-.051 5.55-1.04-.53 1.04.53Zm-.816.815-.53-1.04.53 1.04Zm-4.628 0 .53-1.04-.53 1.04Zm-.816-.815 1.04-.53-1.04.53ZM6.6 6.583c-.251.491-.347 1.007-.391 1.546-.043.526-.042 1.17-.042 1.934H8.5c0-.803 0-1.335.034-1.744.033-.394.09-.57.144-.677L6.6 6.582Zm1.733-1.734a3.967 3.967 0 0 0-1.734 1.734l2.08 1.059c.156-.307.406-.557.713-.714L8.332 4.85Zm3.48-.432c-.764 0-1.408-.001-1.934.042-.539.044-1.055.14-1.546.39l1.059 2.08c.107-.056.283-.112.677-.145.409-.033.941-.034 1.744-.034V4.417Zm.374 0h-.374V6.75h.374V4.417Zm3.48.432c-.49-.25-1.007-.346-1.546-.39-.526-.043-1.17-.042-1.934-.042V6.75c.803 0 1.335.001 1.744.034.395.033.57.09.677.144l1.06-2.079Zm1.734 1.734a3.967 3.967 0 0 0-1.733-1.734l-1.06 2.08c.308.156.557.406.714.713l2.079-1.06Zm.432 3.48c0-.764.001-1.408-.042-1.934-.044-.539-.14-1.055-.39-1.546l-2.079 1.059c.055.108.112.283.144.677.033.409.034.941.034 1.744h2.333Zm0 3.874v-3.873H15.5v3.873h2.333Zm-.432 3.48c.25-.49.346-1.007.39-1.546.043-.526.042-1.17.042-1.934H15.5c0 .803 0 1.336-.034 1.744-.032.395-.09.57-.144.677l2.079 1.06Zm-1.733 1.734a3.967 3.967 0 0 0 1.733-1.733l-2.079-1.06a1.633 1.633 0 0 1-.714.714l1.06 2.08Zm-3.481.433c.764 0 1.408 0 1.934-.043.539-.044 1.055-.14 1.546-.39l-1.059-2.079c-.107.055-.283.112-.677.144-.409.033-.941.034-1.744.034v2.334Zm-.374 0h.374V17.25h-.374v2.334Zm-3.48-.433c.49.25 1.007.346 1.546.39.526.043 1.17.043 1.934.043V17.25c-.803 0-1.335 0-1.744-.034-.394-.032-.57-.089-.677-.144l-1.06 2.08Zm-1.734-1.733c.38.746.987 1.353 1.734 1.733l1.059-2.079a1.633 1.633 0 0 1-.714-.714L6.6 17.418Zm-.432-3.481c0 .765-.001 1.408.042 1.934.044.539.14 1.055.39 1.547l2.08-1.06c-.056-.107-.112-.282-.145-.677-.033-.408-.034-.94-.034-1.744H6.167Zm0-3.873v3.873H8.5v-3.873H6.167ZM7.78 7.167a2.6 2.6 0 0 0-.257.991C7.499 8.45 7.5 8.8 7.5 9.173h2.333c0-.412.001-.65.016-.825.013-.161.031-.164.01-.121l-2.08-1.06Zm1.12-1.12a2.567 2.567 0 0 0-1.12 1.121l2.079 1.06a.233.233 0 0 1 .102-.102L8.9 6.046Zm2.006-.28c-.373 0-.723-.001-1.015.023a2.6 2.6 0 0 0-.99.257L9.96 8.126c-.042.021-.04.003.121-.01a11.6 11.6 0 0 1 .825-.016V5.767Zm2.186 0h-2.186V8.1h2.186V5.767Zm2.006.28a2.599 2.599 0 0 0-.991-.257c-.292-.024-.642-.023-1.015-.023V8.1c.412 0 .65.001.825.015.161.014.163.032.121.01l1.06-2.078Zm1.121 1.121A2.567 2.567 0 0 0 15.1 6.047l-1.06 2.079c.044.022.08.058.102.102l2.08-1.06Zm.28 2.006c0-.373 0-.723-.023-1.015a2.599 2.599 0 0 0-.257-.99L14.14 8.228c-.021-.043-.003-.04.01.121.015.175.016.413.016.825H16.5Zm0 2.106V9.174h-2.333v2.106H16.5Zm-.33 2.497c.199-.391.27-.792.3-1.176.03-.37.03-.817.03-1.32h-2.333c0 .541-.001.877-.022 1.13-.02.24-.05.3-.055.307l2.08 1.06Zm-1.326 1.326a3.033 3.033 0 0 0 1.325-1.326l-2.079-1.059a.7.7 0 0 1-.306.306l1.06 2.079Zm-2.497.33c.503 0 .95.001 1.32-.029.384-.031.785-.102 1.177-.301l-1.06-2.08c-.007.005-.067.036-.306.056-.253.02-.59.021-1.131.021v2.334Zm-.694 0h.694V13.1h-.694v2.334Zm-2.497-.33c.392.2.793.27 1.176.301.37.03.818.03 1.321.03V13.1c-.542 0-.878 0-1.13-.021-.24-.02-.3-.051-.307-.055l-1.06 2.079ZM7.83 13.777c.29.571.755 1.035 1.325 1.326l1.06-2.08a.7.7 0 0 1-.306-.305l-2.08 1.06ZM7.5 11.28c0 .504 0 .951.03 1.321.03.384.101.785.3 1.176l2.08-1.059c-.004-.008-.036-.068-.055-.307-.02-.252-.022-.589-.022-1.13H7.5Zm0-2.106v2.106h2.333V9.174H7.5Zm4.5 9.16c.52 0 1.106-.044 1.572-.33.279-.171.498-.416.628-.722a1.77 1.77 0 0 0 .133-.698H12c0 .017-.004-.081.053-.216a.8.8 0 0 1 .3-.354c.089-.054.133-.05.059-.038A2.604 2.604 0 0 1 12 16v2.334Zm-2.333-1.75c0 .166.018.42.137.692.128.293.338.531.605.702.464.297 1.047.355 1.591.355V16a2.2 2.2 0 0 1-.392-.026c-.066-.012-.025-.014.058.039.102.065.21.178.277.331.058.133.057.234.057.24H9.667ZM12 14.834c-.538 0-1.108.062-1.566.347a1.605 1.605 0 0 0-.767 1.403H12a.73.73 0 0 1-.332.578c-.074.046-.107.042-.043.03a2.1 2.1 0 0 1 .375-.025v-2.334Zm2.333 1.75a1.73 1.73 0 0 0-.153-.733 1.582 1.582 0 0 0-.633-.695c-.461-.275-1.034-.322-1.547-.322v2.333c.204 0 .328.012.395.024.072.012.036.017-.044-.031a.754.754 0 0 1-.288-.327C12 16.695 12 16.59 12 16.583h2.333Z" mask="url(#icon-phone--colorful_b)" /></g><defs><clipPath id="icon-phone--colorful_a"><path fill="#fff" d="M5 5h14v14H5z" /></clipPath></defs></symbol>',
					})),
				p = (u().add(h), n(85831)),
				g = (n(5192), n(36428)),
				f = {
					name: "CheckBoxHint",
					props: { duration: { default: 2e3, type: Number } },
					data: function () {
						return { isShow: !0 };
					},
					computed: (0, r.Z)(
						(0, r.Z)({}, (0, g.rn)(["mediaQueryMatchMobile"])),
						{},
						{
							getShowTime: function () {
								return this.duration;
							},
						}
					),
					mounted: function () {
						var e = this;
						this.timer = setTimeout(function () {
							e.disappear();
						}, this.duration);
					},
					methods: {
						disappear: function () {
							clearTimeout(this.timer),
								(this.isShow = !1),
								this.$emit("disappear");
						},
					},
				},
				_ = (n(58402), n(39563)),
				m = (0, _.Z)(
					f,
					function () {
						var e = this,
							t = e.$createElement,
							n = e._self._c || t;
						return n("transition", { attrs: { name: "fade" } }, [
							e.isShow
								? n("div", { staticClass: "check-box-hint" }, [
										n(
											"div",
											{
												staticClass:
													"check-box-hint__title heading-m14-w16 extension-button-label-white",
											},
											[e._v(e._s(e.$t("check_yes")))]
										),
								  ])
								: e._e(),
						]);
					},
					[],
					!1,
					null,
					null,
					null
				).exports,
				C = (n(83454), n(42376)),
				v = n(90902),
				y = n(97934),
				b = n(36558),
				w = n.p + "static/img/guide.135652cd..webp",
				k = n.p + "static/img/guide_dark.0be58f84..webp",
				L = n.p + "static/img/guide.174b3d58..png",
				Z = n.p + "static/img/guide_dark.a2337717..png",
				x = n(90737),
				T = n(56455),
				I = n(82712),
				M = n(12736),
				S = "pending",
				A = "waiting",
				D = "success",
				P = "failed",
				B = {
					name: "QrcodeLogin",
					components: { TapQrcode: v.Z },
					props: { loginSession: { type: String, required: !0 } },
					data: function () {
						return {
							loading: !1,
							qrcodeUrl: "",
							deviceCode: "",
							sessionId: "",
							checkLoginStatusInterval: 1e3,
							expiresIn: 300,
							startTime: 0,
							loginStatus: S,
							statusTitle: "",
							statusSubtitle: "",
							timer: null,
							scanSuccessFlag: !1,
							generateType: "page_load",
							showGuide: !1,
							theme: "light",
							guideLightSrc: w,
							guideDarkSrc: k,
							guideLightPngSrc: L,
							guideDarkPngSrc: Z,
						};
					},
					computed: (0, r.Z)(
						(0, r.Z)({}, (0, g.rn)(["mediaQueryMatchMobile"])),
						{},
						{
							qrcodeSize: function () {
								return window.innerWidth <= 450
									? 145
									: window.innerWidth <= 460
									? 190
									: 194;
							},
							appDownloadUrl: function () {
								return ""
									.concat(
										(0, b.Nb)("DOMAIN_TAP"),
										"/mobile?utm_medium=coop&utm_source=scanqr_www&utm_sid="
									)
									.concat(this.sessionId);
							},
							showOverlay: function () {
								return (
									this.loginStatus === A ||
									this.loginStatus === P
								);
							},
							refreshButtonType: function () {
								return this.loginStatus === A
									? "click_scan_again"
									: "invalid_and_refresh";
							},
							guideWebpSrc: function () {
								return "dark" === this.theme
									? this.guideDarkSrc
									: this.guideLightSrc;
							},
							guidePngSrc: function () {
								return "dark" === this.theme
									? this.guideDarkPngSrc
									: this.guideLightPngSrc;
							},
						}
					),
					mounted: function () {
						(this.theme = (0, T.g)()),
							this.preloadGuideImages(),
							this.generateQrcode();
					},
					beforeDestroy: function () {
						this.clearReCheckLoginStatus();
					},
					methods: {
						preloadGuideImages: function () {
							return (0, x.F)([
								{
									webp: this.guideWebpSrc,
									fallback: this.guidePngSrc,
								},
							]).load();
						},
						generateQrcode: function () {
							var e = arguments,
								t = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function n() {
									var o, r;
									return (0, i.Z)().wrap(
										function (n) {
											for (;;)
												switch ((n.prev = n.next)) {
													case 0:
														if (
															((o =
																e.length > 0 &&
																void 0 !== e[0]
																	? e[0]
																	: "page_load"),
															(t.generateType =
																o),
															(t.sessionId = (0,
															M.Z)()),
															y.Z.commit(
																"setQueryCtx",
																{
																	session_id:
																		t.sessionId,
																	session_type:
																		"taptap",
																}
															),
															!t.loading)
														) {
															n.next = 6;
															break;
														}
														return n.abrupt(
															"return"
														);
													case 6:
														return (
															(n.prev = 6),
															(t.scanSuccessFlag =
																!1),
															t.clearReCheckLoginStatus(),
															(t.loginStatus = S),
															(t.loading = !0),
															(n.next = 13),
															(i = {
																session_id:
																	t.sessionId,
																session_type:
																	"taptap",
															}),
															C.W.post(
																"/api/device-code/get",
																i
															)
														);
													case 13:
														(r = n.sent),
															(t.deviceCode =
																r.device_code),
															(t.qrcodeUrl =
																r.qrcode_url),
															r.expires_in &&
																(t.expiresIn =
																	r.expires_in),
															r.interval &&
																(t.checkLoginStatusInterval =
																	1e3 *
																	r.interval),
															(t.startTime =
																Date.now()),
															t.checkLoginStatus(),
															(0, I.ZP)(
																{
																	action: "view",
																	page_booth:
																		"login_mobile",
																	object_type:
																		"login_qrcode",
																},
																{
																	generate_type:
																		t.generateType,
																	qrcode_session_id:
																		t.sessionId,
																}
															),
															(n.next = 26);
														break;
													case 23:
														(n.prev = 23),
															(n.t0 = n.catch(6)),
															(t.loginStatus = P);
													case 26:
														return (
															(n.prev = 26),
															(t.loading = !1),
															n.finish(26)
														);
													case 29:
													case "end":
														return n.stop();
												}
											var i;
										},
										n,
										null,
										[[6, 23, 26, 29]]
									);
								})
							)();
						},
						refreshQrcode: function (e) {
							(0, I.ZP)(
								{
									action: "click",
									object_type: "refresh_qrcode_btn",
								},
								{ btn_type: e }
							),
								this.generateQrcode(e);
						},
						clearSessionInfo: function () {
							y.Z.commit("setQueryCtx", {
								session_id: "",
								session_type: "",
							});
						},
						handleQRCodeFailed: function (e, t) {
							var n =
								arguments.length > 2 && void 0 !== arguments[2]
									? arguments[2]
									: "";
							(this.loginStatus = P),
								(this.statusTitle = e),
								(this.statusSubtitle = t),
								this.clearSessionInfo(),
								n &&
									(0, I.ZP)({
										action: "loginFailed",
										args: { failed_reason: n },
										object_type: "login_qrcode",
									});
						},
						reCheckLoginStatus: function () {
							this.clearReCheckLoginStatus(),
								(Date.now() - this.startTime) / 1e3 >=
								this.expiresIn
									? this.handleQRCodeFailed(
											"二维码失效",
											"点击刷新"
									  )
									: (this.timer = window.setTimeout(
											this.checkLoginStatus,
											this.checkLoginStatusInterval
									  ));
						},
						clearReCheckLoginStatus: function () {
							this.timer &&
								(clearTimeout(this.timer), (this.timer = null));
						},
						checkLoginStatus: function () {
							var e = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function t() {
									var n, o, r, a, s;
									return (0, i.Z)().wrap(
										function (t) {
											for (;;)
												switch ((t.prev = t.next)) {
													case 0:
														return (
															(t.prev = 0),
															(t.next = 3),
															(i = {
																device_code:
																	e.deviceCode,
																session_id:
																	e.sessionId,
																session_type:
																	"taptap",
															}),
															C.W.post(
																"/api/device-code/login",
																i,
																{
																	errorToast:
																		!1,
																}
															)
														);
													case 3:
														(n = t.sent),
															(0, I.ZP)({
																action: "loginSuccess",
																object_type:
																	"login_qrcode",
															}),
															e.$emit(
																"login-success",
																n
															),
															(e.loginStatus = D),
															(t.next = 34);
														break;
													case 9:
														(t.prev = 9),
															(t.t0 = t.catch(0)),
															(a =
																null === t.t0 ||
																void 0 ===
																	t.t0 ||
																null ===
																	(o =
																		t.t0
																			.error) ||
																void 0 === o ||
																null ===
																	(o =
																		o.response) ||
																void 0 === o ||
																null ===
																	(o =
																		o.data) ||
																void 0 === o ||
																null ===
																	(o =
																		o.data) ||
																void 0 === o
																	? void 0
																	: o.error),
															(s =
																null === t.t0 ||
																void 0 ===
																	t.t0 ||
																null ===
																	(r =
																		t.t0
																			.error) ||
																void 0 === r ||
																null ===
																	(r =
																		r.response) ||
																void 0 === r ||
																null ===
																	(r =
																		r.data) ||
																void 0 === r ||
																null ===
																	(r =
																		r.data) ||
																void 0 === r
																	? void 0
																	: r.interval),
															(t.t1 = a),
															(t.next =
																"authorization_pending" ===
																t.t1
																	? 16
																	: "authorization_waiting" ===
																	  t.t1
																	? 19
																	: "slow_down" ===
																	  t.t1
																	? 25
																	: "invalid_grant_code" ===
																	  t.t1
																	? 28
																	: "access_denied" ===
																	  t.t1
																	? 30
																	: 32);
														break;
													case 16:
														return (
															e.reCheckLoginStatus(),
															(e.loginStatus = S),
															t.abrupt(
																"break",
																34
															)
														);
													case 19:
														return (
															(e.loginStatus = A),
															(e.statusTitle =
																"扫码成功"),
															(e.statusSubtitle =
																"请在手机上确认"),
															e.reCheckLoginStatus(),
															e.scanSuccessFlag ||
																((e.scanSuccessFlag =
																	!0),
																(0, I.ZP)(
																	{
																		action: "scanSuccess",
																		object_type:
																			"login_qrcode",
																	},
																	{
																		generate_type:
																			e.generateType,
																		qrcode_session_id:
																			e.sessionId,
																	}
																)),
															t.abrupt(
																"break",
																34
															)
														);
													case 25:
														return (
															"number" ==
																typeof s &&
																(e.checkLoginStatusInterval =
																	1e3 * s),
															e.reCheckLoginStatus(),
															t.abrupt(
																"break",
																34
															)
														);
													case 28:
														return (
															e.handleQRCodeFailed(
																"二维码失效",
																"点击刷新",
																"invalid_grant_code"
															),
															t.abrupt(
																"break",
																34
															)
														);
													case 30:
														return (
															e.handleQRCodeFailed(
																"授权已取消",
																"点击刷新",
																"access_denied"
															),
															t.abrupt(
																"break",
																34
															)
														);
													case 32:
														return (
															e.reCheckLoginStatus(),
															t.abrupt(
																"break",
																34
															)
														);
													case 34:
													case "end":
														return t.stop();
												}
											var i;
										},
										t,
										null,
										[[0, 9]]
									);
								})
							)();
						},
						sendOpenTrack: function () {
							(0, I.ZP)({
								action: "click",
								object_type: "download_taptap_app_btn",
							});
						},
						handleGuideClick: function () {
							this.showGuide = !this.showGuide;
						},
					},
				},
				E = B,
				$ =
					(n(88117),
					(0, _.Z)(
						E,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return i("div", { staticClass: "qrcode-login" }, [
								e._m(0),
								i(
									"div",
									{
										staticClass:
											"qrcode-login__guide-container",
									},
									[
										i(
											"transition",
											{ attrs: { name: "fade" } },
											[
												i(
													"picture",
													{
														directives: [
															{
																name: "show",
																rawName:
																	"v-show",
																value: e.showGuide,
																expression:
																	"showGuide",
															},
														],
													},
													[
														i("source", {
															attrs: {
																srcset: e.guideWebpSrc,
																type: "image/webp",
															},
														}),
														i("source", {
															attrs: {
																srcset: e.guidePngSrc,
																type: "image/png",
															},
														}),
														i("img", {
															staticClass:
																"qrcode-login__guide-img",
															attrs: {
																src: e.guidePngSrc,
																alt: "扫码指南",
																loading:
																	"eager",
																decoding:
																	"async",
																importance:
																	"high",
															},
														}),
													]
												),
											]
										),
									],
									1
								),
								i(
									"div",
									{ staticClass: "qrcode-login__container" },
									[
										e.loading
											? i(
													"div",
													{
														staticClass:
															"qrcode-login__loading flex-center",
													},
													[
														i("div", {
															staticClass:
																"qrcode-login__loading-spinner",
														}),
														i(
															"p",
															{
																staticClass:
																	"qrcode-loading-text caption-m12-w14",
															},
															[
																e._v(
																	"二维码加载中"
																),
															]
														),
													]
											  )
											: e.qrcodeUrl
											? i(
													"div",
													{
														staticClass:
															"qrcode-login__qrcode-wrapper",
													},
													[
														i("TapQrcode", {
															staticClass:
																"qrcode-login__qrcode",
															attrs: {
																content:
																	e.qrcodeUrl,
																size: e.qrcodeSize,
																"color-dark":
																	"#000000",
																"color-light":
																	"#ffffff",
																margin: 0,
															},
														}),
														e.showOverlay
															? i("div", {
																	staticClass:
																		"qrcode-login__qrcode-overlay",
															  })
															: e._e(),
													],
													1
											  )
											: e._e(),
										e.showOverlay
											? i(
													"div",
													{
														staticClass:
															"qrcode-login__overlay flex-center",
													},
													[
														i(
															"div",
															{
																staticClass:
																	"qrcode-login__refresh-button",
																on: {
																	click: function (
																		t
																	) {
																		return e.refreshQrcode(
																			e.refreshButtonType
																		);
																	},
																},
															},
															[
																i("img", {
																	attrs: {
																		src: n(
																			6788
																		),
																		alt: "refresh",
																	},
																}),
															]
														),
														i(
															"p",
															{
																staticClass:
																	"font-bold caption-m14-w16 gray-08",
															},
															[
																e._v(
																	" " +
																		e._s(
																			e.statusTitle
																		) +
																		" "
																),
															]
														),
														i(
															"p",
															{
																staticClass:
																	"caption-m12-w14 gray-08",
															},
															[
																e._v(
																	" " +
																		e._s(
																			e.statusSubtitle
																		) +
																		" "
																),
															]
														),
													]
											  )
											: e._e(),
									]
								),
								i(
									"p",
									{
										staticClass:
											"qrcode-tip caption-m12-w14 gray-06",
									},
									[
										e._v(" 打开 "),
										i(
											"a",
											{
												staticClass: "qrcode-tip-link",
												attrs: {
													href: e.appDownloadUrl,
													target: "_blank",
												},
												on: { click: e.sendOpenTrack },
											},
											[e._v("TapTap APP")]
										),
										e._v(" 右上角扫一扫登录 "),
									]
								),
								i(
									"div",
									{ staticClass: "guide-button-wrapper" },
									[
										i(
											"tap-button",
											{
												attrs: {
													theme: "tertiary",
													size: "small",
												},
												on: {
													click: e.handleGuideClick,
												},
											},
											[e._v(" " + e._s("如何扫码") + " ")]
										),
									],
									1
								),
							]);
						},
						[
							function () {
								var e = this,
									t = e.$createElement,
									n = e._self._c || t;
								return n(
									"div",
									{ staticClass: "qrcode-login__header" },
									[
										n(
											"div",
											{
												staticClass:
													"qrcode-title heading-m16-w18 gray-07",
											},
											[e._v("二维码登录")]
										),
										n(
											"div",
											{
												staticClass:
													"qrcode-subtitle caption-m12-w14 gray-06",
											},
											[e._v("请使用 TapTap APP 扫码登录")]
										),
									]
								);
							},
						],
						!1,
						null,
						null,
						null
					).exports),
				N = n(22046),
				R = n(92481),
				V = n(13488),
				q = n(25602),
				O = n(20187),
				H = n(91119),
				z = new (c())({
					id: "icon-wechat--colorful",
					use: "icon-wechat--colorful-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol viewBox="0 0 24 24" fill="none" id="icon-wechat--colorful"><path d="M12.0001 2.20013C20.4934 2.20013 21.8001 6.01125 21.8001 12.0001C21.8001 17.989 20.2001 21.8001 12.0001 21.8001C3.80007 21.8001 2.20007 17.3901 2.20007 12.0001C2.20007 6.61013 3.50674 2.20013 12.0001 2.20013Z" fill="#00D415" /><path fill-rule="evenodd" clip-rule="evenodd" d="M14.6899 9.8126C14.5387 9.79703 14.3866 9.78647 14.2351 9.78647C11.991 9.78647 10.2172 11.4605 10.2175 13.5221C10.2175 13.8627 10.2697 14.1966 10.364 14.5111C10.2175 14.5261 10.0704 14.5314 9.92414 14.5314C9.43734 14.5314 9.02649 14.4481 8.56256 14.3541C8.46793 14.335 8.37109 14.3153 8.27096 14.2959L6.61805 15.1272L7.08876 13.7048C5.90656 12.8779 5.20007 11.8111 5.20007 10.5135C5.20007 8.26423 7.32926 6.49622 9.92414 6.49622C12.2477 6.49622 14.2823 7.90807 14.6899 9.8126ZM12.283 9.09611C12.283 8.74023 12.0478 8.50473 11.6922 8.50473C11.3413 8.50473 10.9862 8.73995 10.9809 9.09611C10.9809 9.45144 11.3363 9.68693 11.6922 9.68693C12.0475 9.68693 12.283 9.45144 12.283 9.09611ZM7.67485 9.09555C7.67485 9.45116 8.03018 9.68637 8.38606 9.68637C8.74222 9.68637 8.97744 9.44615 8.97772 9.09555C8.97772 8.73995 8.74222 8.50445 8.38606 8.50445C8.03046 8.50445 7.67485 8.73967 7.67485 9.09555Z" fill="white" /><path fill-rule="evenodd" clip-rule="evenodd" d="M14.6167 10.1952C16.6967 10.1952 18.5456 11.701 18.5456 13.5502C18.5456 14.5903 17.8539 15.5173 16.9272 16.2137L17.2747 17.3709L16.0047 16.6747C15.9896 16.6784 15.9746 16.6821 15.9595 16.6857C15.5135 16.7946 15.0627 16.9047 14.6167 16.9047C12.413 16.9047 10.6826 15.4041 10.6826 13.5502C10.6826 11.701 12.413 10.1952 14.6167 10.1952ZM12.8801 12.5101C12.8801 12.7411 13.1106 12.9713 13.3406 12.9713C13.6892 12.9713 13.92 12.7411 13.92 12.5101C13.92 12.2804 13.6892 12.0496 13.3406 12.0496C13.1106 12.0496 12.8801 12.2804 12.8801 12.5101ZM15.4269 12.5101C15.4269 12.7411 15.6569 12.9713 15.8871 12.9713C16.2296 12.9713 16.4659 12.7411 16.4659 12.5101C16.4659 12.2804 16.2352 12.0496 15.8871 12.0496C15.6569 12.0496 15.4269 12.2804 15.4269 12.5101Z" fill="white" /></symbol>',
				}),
				Q =
					(u().add(z),
					new (c())({
						id: "icon-qq--colorful",
						use: "icon-qq--colorful-usage",
						viewBox: "0 0 24 24",
						content:
							'<symbol viewBox="0 0 24 24" fill="none" id="icon-qq--colorful"><path d="M12 2.20013C20.4933 2.20013 21.8 6.01125 21.8 12.0001C21.8 17.989 20.2 21.8001 12 21.8001C3.79995 21.8001 2.19995 17.3901 2.19995 12.0001C2.19995 6.61013 3.50662 2.20013 12 2.20013Z" fill="#1AB2FF" /><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6451 13.6377C16.5375 13.2877 16.3908 12.8797 16.242 12.488L15.6992 11.1188C15.6996 11.103 15.7063 10.8333 15.7063 10.6943C15.7063 8.35307 14.6128 6.00035 11.923 6.00012C9.23355 6.00035 8.13977 8.35307 8.13977 10.6943C8.13977 10.8333 8.14648 11.103 8.14693 11.1188L7.60429 12.488C7.45554 12.8797 7.30859 13.2877 7.201 13.6377C6.68811 15.3059 6.8543 15.9963 6.9809 16.0119C7.25245 16.0449 8.03778 14.7559 8.03778 14.7559C8.03778 15.5023 8.41803 16.4764 9.24093 17.1798C8.93315 17.2757 8.55604 17.4231 8.31357 17.6041C8.09571 17.7667 8.123 17.9324 8.16214 17.9993C8.3346 18.2931 11.1194 18.1869 11.9235 18.0953C12.7274 18.1869 15.5124 18.2931 15.6846 17.9993C15.724 17.9324 15.7511 17.7667 15.5332 17.6041C15.2907 17.4231 14.9134 17.2755 14.6054 17.1796C15.4281 16.4762 15.8083 15.5023 15.8083 14.7559C15.8083 14.7559 16.5939 16.0449 16.8654 16.0119C16.9918 15.9963 17.158 15.3059 16.6451 13.6377Z" fill="white" /></symbol>',
					})),
				F =
					(u().add(Q),
					new (c())({
						id: "icon-gmail--colorful",
						use: "icon-gmail--colorful-usage",
						viewBox: "0 0 24 24",
						content:
							'<symbol viewBox="0 0 24 24" fill="none" id="icon-gmail--colorful"><path d="M21.2002 12.2116C21.2002 11.5928 21.1454 11.0053 21.0514 10.4335H12.1997V13.9663H17.2679C17.0407 15.1257 16.3749 16.1048 15.3879 16.7707V19.1207H18.4116C20.1819 17.4835 21.2002 15.0708 21.2002 12.2116Z" fill="#4285F4" /><path d="M12.1997 21.4001C14.7377 21.4001 16.8606 20.5541 18.4116 19.1206L15.3879 16.7706C14.5419 17.3346 13.4687 17.6793 12.1997 17.6793C9.74787 17.6793 7.67203 16.0265 6.92786 13.7939H3.81018V16.2145C5.35335 19.2851 8.52587 21.4001 12.1997 21.4001Z" fill="#34A853" /><path d="M6.92774 13.794C6.73191 13.23 6.63007 12.6268 6.63007 12.0002C6.63007 11.3735 6.73974 10.7703 6.92774 10.2063V7.78583H3.81006C3.16773 9.05483 2.79956 10.4805 2.79956 12.0002C2.79956 13.5198 3.16773 14.9455 3.81006 16.2145L6.92774 13.794Z" fill="#FBBC05" /><path d="M12.1997 6.32088C13.5862 6.32088 14.8239 6.79872 15.8031 7.73089L18.4821 5.05188C16.8606 3.53221 14.7377 2.60004 12.1997 2.60004C8.52587 2.60004 5.35335 4.71505 3.81018 7.78573L6.92786 10.2062C7.67203 7.97373 9.74787 6.32088 12.1997 6.32088Z" fill="#EA4335" /></symbol>',
					})),
				U =
					(u().add(F),
					new (c())({
						id: "icon-apple--colorful",
						use: "icon-apple--colorful-usage",
						viewBox: "0 0 24 24",
						content:
							'<symbol fill="none" viewBox="0 0 24 24" id="icon-apple--colorful"><path fill="#1A1C1E" d="M12 2.2c8.493 0 9.8 3.81 9.8 9.8 0 5.988-1.6 9.8-9.8 9.8-8.2 0-9.8-4.41-9.8-9.8 0-5.39 1.306-9.8 9.8-9.8Z" /><g clip-path="url(#icon-apple--colorful_a)"><path fill="#fff" fill-rule="evenodd" d="M13.53 6.968c.443-.536.741-1.281.659-2.023-.637.025-1.409.424-1.867.96-.41.475-.77 1.234-.672 1.961.71.054 1.438-.362 1.88-.898Zm1.597 4.71c-.014-1.604 1.308-2.375 1.37-2.412-.745-1.09-1.906-1.24-2.32-1.257-.987-.1-1.925.581-2.426.581-.5 0-1.273-.567-2.092-.552-1.076.015-2.066.626-2.62 1.588-1.119 1.939-.286 4.811.802 6.385.532.77 1.167 1.635 2.001 1.603.803-.032 1.107-.52 2.077-.52s1.243.52 2.091.504c.863-.016 1.412-.785 1.94-1.557.61-.893.859-1.757.876-1.802-.019-.006-1.683-.644-1.7-2.562Z" clip-rule="evenodd" /></g><defs><clipPath id="icon-apple--colorful_a"><path fill="#fff" d="M4.667 4.667h14.667v14.667H4.667z" /></clipPath></defs></symbol>',
					})),
				G =
					(u().add(U),
					new (c())({
						id: "icon-apple-dark--colorful",
						use: "icon-apple-dark--colorful-usage",
						viewBox: "0 0 24 24",
						content:
							'<symbol viewBox="0 0 24 24" fill="none" id="icon-apple-dark--colorful"><path d="M11.9997 2.19934C20.493 2.19934 21.7997 6.01045 21.7997 11.9993C21.7997 17.9882 20.1997 21.7993 11.9997 21.7993C3.79971 21.7993 2.19971 17.3893 2.19971 11.9993C2.19971 6.60934 3.50637 2.19934 11.9997 2.19934Z" fill="white" /><g clip-path="url(#icon-apple-dark--colorful_clip0_2334_4670)"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.53 6.96847C13.9732 6.43215 14.2714 5.68659 14.189 4.94458C13.5517 4.97045 12.7802 5.36909 12.322 5.90543C11.9119 6.37985 11.5529 7.13868 11.6503 7.86618C12.3605 7.92032 13.0881 7.50363 13.53 6.96847ZM15.1265 11.6772C15.1127 10.0741 16.4349 9.30325 16.4975 9.26596C15.7525 8.17587 14.5913 8.02614 14.1765 8.0087C13.1897 7.90892 12.2523 8.59013 11.7514 8.59013C11.2504 8.59013 10.4783 8.02317 9.65942 8.03816C8.58309 8.05318 7.59271 8.66407 7.03833 9.62615C5.92049 11.5647 6.7527 14.437 7.84107 16.0106C8.37318 16.7803 9.00814 17.6456 9.84221 17.6143C10.6455 17.5824 10.9486 17.0948 11.9192 17.0948C12.8884 17.0948 13.162 17.6143 14.0105 17.5981C14.8728 17.5824 15.4218 16.8128 15.9491 16.0407C16.56 15.1477 16.809 14.2836 16.8258 14.2386C16.8072 14.2332 15.1428 13.5952 15.1265 11.6772Z" fill="#191919" /></g><defs><clipPath id="icon-apple-dark--colorful_clip0_2334_4670"><rect width="14.6667" height="14.6667" fill="white" transform="translate(4.66669 4.66681)" /></clipPath></defs></symbol>',
					})),
				K = (u().add(G), n(1084)),
				j = {
					name: "SocialLogin",
					components: { TapIcon: O.Z },
					mixins: [N.Z, R.Z, V.Z],
					data: function () {
						return {};
					},
					props: { isAgreeProtocol: { type: Boolean, default: !0 } },
					computed: (0, r.Z)(
						{},
						(0, g.rn)([
							"mediaQueryMatchMobile",
							"globalConfig",
							"theme",
						])
					),
					methods: {
						getIcon: function (e) {
							switch (this.$lg(e, "social")) {
								case "wechat":
								case "wechatweb":
									return "wechat--colorful";
								case "qq":
									return "qq--colorful";
								case "apple":
									return this.theme === H.$
										? "apple-dark--colorful"
										: "apple--colorful";
								case "google":
									return "gmail--colorful";
								default:
									return "";
							}
						},
						iconName: function (e) {
							switch (this.$lg(e, "social")) {
								case "wechat":
								case "wechatweb":
									return "ico-m32-w32-Wechat";
								case "qq":
									return "ico-m32-w32-QQ";
								case "apple":
									return "ico-m32-w32-Apple";
								case "facebook":
									return "ico-m32-w32-Facebook";
								case "google":
									return "ico-m32-w32-Google";
								case "line":
									return "ico-m32-w32-Line";
								default:
									return "";
							}
						},
						getItemText: function (e) {
							var t = "";
							switch (this.$lg(e, "social")) {
								case "wechat":
								case "wechatweb":
									t = "微信";
									break;
								case "qq":
									t = "QQ";
									break;
								case "apple":
									t = "Apple";
									break;
								case "facebook":
									t = "Facebook";
									break;
								case "google":
									t = "Google";
									break;
								case "line":
									t = "Line";
									break;
								case "naver":
									t = "Naver";
							}
							return t;
						},
						handleClick: function (e) {
							var t = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function n() {
									var o;
									return (0, i.Z)().wrap(function (n) {
										for (;;)
											switch ((n.prev = n.next)) {
												case 0:
													(o = t.getItemText(e)),
														(0, I.ZP)({
															object_type:
																"button",
															action: "click",
															object_id: o,
														}),
														K.Z.set("loginType", o),
														t.isAgreeProtocol
															? ((0, q.Z)({
																	action: "login_or_register_request",
															  }),
															  t.handleConnectSocial(
																	e
															  ))
															: t.agreeProtocol(
																	function () {
																		t.$emit(
																			"agreeProtocol"
																		),
																			(0,
																			q.Z)(
																				{
																					action: "login_or_register_request",
																				}
																			),
																			t.handleConnectSocial(
																				e
																			);
																	}
															  );
												case 4:
												case "end":
													return n.stop();
											}
									}, n);
								})
							)();
						},
						handleConnectSocial: function (e) {
							var t = this;
							this.showSocialLoginTips(function () {
								t.handleConnect(e);
							}, e);
						},
					},
				},
				X =
					(n(27967),
					(0, _.Z)(
						j,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"div",
								{ staticClass: "flex-center" },
								[
									e.$lg(
										e.globalConfig,
										"social_config.socials"
									)
										? n(
												"div",
												{ staticClass: "flex-center" },
												e._l(
													e.$lg(
														e.globalConfig,
														"social_config.socials"
													),
													function (t, i) {
														return n("tap-icon", {
															directives: [
																{
																	name: "tracker",
																	rawName:
																		"v-tracker",
																	value: {
																		terms: {
																			object_id:
																				e.getItemText(
																					t
																				),
																			object_type:
																				"button",
																		},
																		type: [
																			"click",
																		],
																	},
																	expression:
																		"{\n          terms: {\n            object_id: getItemText(item),\n            object_type: 'button',\n          },\n          type: ['click'],\n        }",
																},
															],
															key: i,
															staticClass:
																"social-login__icon",
															attrs: {
																icon: e.getIcon(
																	t
																),
															},
															nativeOn: {
																click: function (
																	n
																) {
																	return e.handleClick(
																		t
																	);
																},
															},
														});
													}
												),
												1
										  )
										: e._e(),
									e._v(" "),
									e._t("extra"),
								],
								2
							);
						},
						[],
						!1,
						null,
						null,
						null
					).exports),
				W = n(76398),
				J = n(35053),
				Y = n(4403),
				ee = n(48666),
				te = n(95085),
				ne = n(98608),
				ie = n(90317),
				oe = n(59685),
				re = n(56618),
				ae = n(31685),
				se = n(51328),
				ce = n(36317),
				le = n(70335),
				ue = n(71634),
				de = {
					isLogBooth: "8c7dac66",
					name: "LoginPage",
					components: {
						CheckBoxHint: m,
						AuthBox: p.Z,
						LayoutMain: le.Z,
						VerifyCode: W.Z,
						SocialLogin: X,
						CheckTerms: J.Z,
						TapText: Y.Z,
						QrcodeLogin: $,
					},
					mixins: [ne.Z, V.Z],
					metaInfo: function () {
						return { title: this.$t("seo_login_title") };
					},
					props: {
						loginType: { default: "phone", type: String },
						loginStyle: { default: "normal", type: String },
					},
					data: function () {
						return {
							logoUrl: oe.h1,
							isAgreeProtocol: (0, b.DI)(),
							currentLoginType: this.loginType,
							showVerifyCodeModal: !1,
							errInfo: "",
							geetestReady: !1,
							inputNumber: "",
							isShowCheckBoxHint: !1,
							buttonLoading: !1,
							retrySeconds: 1,
							codeSentTimes: 0,
							sendVerifyTarget: "",
							isLoading: !1,
							verifyCodeErrorInfo: "",
							isTapIframe: (0, ae.Oe)(),
							loginMode: "normal",
						};
					},
					created: function () {
						K.Z.get("isShowToastOfSocialCallbackFail") &&
							(K.Z.remove("isShowToastOfSocialCallbackFail"),
							this.$toast({
								message: this.$t("authorize_fail"),
								duration: 1e3,
							}));
					},
					mounted: function () {
						this.pageViewTrack(),
							(0, I.ZP)({ action: "page_view" });
					},
					computed: (0, r.Z)(
						(0, r.Z)(
							{},
							(0, g.rn)([
								"mediaQueryMatchMobile",
								"isMobileLandscape",
								"isIntl",
								"isInSDK",
								"isInApp",
							])
						),
						{},
						{
							protocol_1: function () {
								return this.isIntl ? ee.Jw : ee.SP;
							},
							protocol_2: function () {
								return this.isIntl ? ee.p : ee.m5;
							},
							buttonDisabled: function () {
								var e = this.inputNumber.trim();
								if ("phone" === this.getCurrentType) {
									if (!te.Xz.test(e)) return !0;
								} else if (!te.rt.test(e)) return !0;
								return this.buttonLoading;
							},
							getTabs: function () {
								return "sdk" === this.loginStyle
									? "phone" === this.loginType
										? ["phone", "email"]
										: ["email", "phone"]
									: "phone" === this.getCurrentType
									? ["phone"]
									: ["email"];
							},
							getCurrentType: function () {
								return this.$lg(this.$route.query, "type")
									? this.$lg(this.$route.query, "type")
									: this.currentLoginType;
							},
							changeLoginTypeText: function () {
								return "email" === this.getCurrentType
									? this.$t("phone_instead")
									: this.isIntl
									? this.$t("email_instead")
									: this.$t("old_user_email_instead");
							},
							isShowMobileHeader: function () {
								return (
									!!this.mediaQueryMatchMobile &&
									(!this.isInSDK || !this.isMobileLandscape)
								);
							},
						}
					),
					methods: {
						cleanVerifyCodeInfo: function () {
							this.verifyCodeErrorInfo = "";
						},
						cleanInputErrInfo: function () {
							this.errInfo = "";
						},
						getTitleByType: function (e) {
							return "phone" === e
								? "sdk" === this.loginStyle
									? this.$t("phone_login_in")
									: this.$t("login_or_register_phone_title")
								: this.isIntl
								? "sdk" === this.loginStyle
									? this.$t("email_login_in")
									: this.$t("login_or_register_email_title")
								: "sdk" === this.loginStyle
								? this.$t("old_user_email_login_in")
								: this.$t("old_user_email_title");
						},
						isAgree: function (e) {
							this.isAgreeProtocol = e;
						},
						changeLoginType: function () {
							(this.inputNumber = ""),
								(this.errInfo = ""),
								"phone" === this.getCurrentType
									? (this.currentLoginType = "email")
									: (this.currentLoginType = "phone"),
								this.$router.replace({
									path: this.$route.path,
									query: { type: this.currentLoginType },
								}),
								this.pageViewTrack();
						},
						changeLoginTypeInSdk: function (e) {
							"normal" !== this.loginStyle &&
								((this.inputNumber = ""),
								(this.errInfo = ""),
								e !== this.getCurrentType &&
									(this.currentLoginType = e),
								this.$router.replace({
									path: this.$route.path,
									query: { type: this.currentLoginType },
								}),
								this.pageViewTrack());
						},
						handleLoginCLick: function () {
							var e = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function t() {
									return (0, i.Z)().wrap(function (t) {
										for (;;)
											switch ((t.prev = t.next)) {
												case 0:
													if (
														((0, I.ZP)({
															object_type:
																"login_button",
															action: "click",
														}),
														!e.buttonDisabled)
													) {
														t.next = 3;
														break;
													}
													return t.abrupt("return");
												case 3:
													e.isAgreeProtocol
														? ((0, q.Z)({
																action: "login_or_register_request",
														  }),
														  e.requestVerifyCode())
														: e.agreeProtocol(
																function () {
																	(e.isAgreeProtocol =
																		!0),
																		(0,
																		q.Z)({
																			action: "login_or_register_request",
																		}),
																		e.requestVerifyCode();
																}
														  );
												case 4:
												case "end":
													return t.stop();
											}
									}, t);
								})
							)();
						},
						pageViewTrack: function () {
							var e = this.getCurrentType;
							(0, se.ux)({
								eventLogParams: { keyword: e },
								useEventLog: !0,
								boothDom: this.$el,
							});
						},
						requestVerifyCode: function (e) {
							var t = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function n() {
									var o, r, a, s, c;
									return (0, i.Z)().wrap(
										function (n) {
											for (;;)
												switch ((n.prev = n.next)) {
													case 0:
														return (
															(o = t.$toast({
																loading: !0,
															})),
															(t.buttonLoading =
																!0),
															t.$tapBus.$on(
																"stopCaptchaLoading",
																function () {
																	o.remove();
																}
															),
															(r = {
																action: "login_or_register",
																captcha_type:
																	t.$lg(
																		t.$store
																			.state,
																		"globalConfig.captcha.captcha_type"
																	),
															}),
															(a = t.$lg(
																e,
																"captchaData"
															)) &&
																(r.captcha_data =
																	a),
															"phone" ===
															t.getCurrentType
																? ((r.phone_number =
																		t.getInputNumber()),
																  (s = ce.f))
																: "email" ===
																		t.getCurrentType &&
																  ((s = ce._),
																  (r.email_address =
																		t.getInputNumber())),
															(t.showVerifyCodeModal =
																!1),
															(n.prev = 8),
															(n.next = 11),
															s({
																unLogin: !0,
																data: r,
															})
														);
													case 11:
														(c = n.sent),
															(0, q.Z)(
																{
																	action:
																		"phone" ===
																		t.getCurrentType
																			? "send_sms"
																			: "send_email",
																	method: r.action,
																	times: ++t.codeSentTimes,
																},
																{
																	logTopic:
																		"verification_code",
																}
															),
															t.cleanVerifyCodeInfo(),
															(t.retrySeconds =
																t.$lg(
																	c,
																	"retry_after"
																)),
															(t.showVerifyCodeModal =
																!0),
															(t.sendVerifyTarget =
																t.getInputNumber()),
															t.$tapBus.$emit(
																"stopCaptchaLoading"
															),
															(t.errInfo = ""),
															(t.buttonLoading =
																!1),
															(n.next = 26);
														break;
													case 22:
														(n.prev = 22),
															(n.t0 = n.catch(8)),
															(0, re.Ew)({
																error: n.t0,
																callback:
																	t.requestVerifyCode,
																button: t.$refs[
																	"submit-button"
																].$el,
															}),
															"captcha.needs" !==
															t.$lg(
																n.t0,
																"error.response.data.data.error"
															)
																? ((t.errInfo =
																		t.$lg(
																			n.t0,
																			"error.response.data.data.msg"
																		)),
																  t.$tapBus.$emit(
																		"stopCaptchaLoading"
																  ),
																  (t.buttonLoading =
																		!1))
																: t.$tapBus.$on(
																		"stopCaptchaLoading",
																		function () {
																			t.buttonLoading =
																				!1;
																		}
																  );
													case 26:
													case "end":
														return n.stop();
												}
										},
										n,
										null,
										[[8, 22]]
									);
								})
							)();
						},
						getInputNumber: function () {
							return "phone" === this.getCurrentType
								? "+" +
										this.$refs.inputNumberDom.$refs.inputNumber.getRegionPhoneCode() +
										this.inputNumber
								: this.inputNumber;
						},
						setCheckBoxHintDisappear: function () {
							this.isShowCheckBoxHint = !1;
						},
						setCheckBoxHintAppear: function () {
							this.isShowCheckBoxHint = !0;
						},
						login: function (e) {
							var t = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function n() {
									var o, r, s, c, l;
									return (0, i.Z)().wrap(
										function (n) {
											for (;;)
												switch ((n.prev = n.next)) {
													case 0:
														if (
															((o = t.$toast({
																loading: !0,
															})),
															(r = ""),
															K.Z.set(
																"loginType",
																t.getCurrentType
															),
															"phone" !==
																t.getCurrentType)
														) {
															n.next = 26;
															break;
														}
														return (
															(n.prev = 4),
															(n.next = 7),
															(0, a.My)({
																phone_code: e,
																phone_number:
																	t.getInputNumber(),
															})
														);
													case 7:
														(s = n.sent),
															(r = t.$lg(
																s,
																"action"
															)),
															(0, q.Z)(
																{
																	action: t.$lg(
																		s,
																		"action"
																	),
																	login_method:
																		"phone",
																},
																{
																	logTopic:
																		"passport",
																}
															),
															(0, q.Z)(
																{
																	action: "verify_sms",
																	method: "login_or_register",
																},
																{
																	logTopic:
																		"verification_code",
																}
															),
															(0, I.ZP)({
																action: "loginOrRegistSuccess",
															}),
															"login" === r &&
																((0, q.Z)({
																	action: "loginSuccess",
																}),
																(0, I.ZP)({
																	object_type:
																		"phone",
																	action: "loginSuccess",
																})),
															(t.codeSentTimes = 0),
															t.handleResult(s),
															(n.next = 21);
														break;
													case 17:
														(n.prev = 17),
															(n.t0 = n.catch(4)),
															(0, I.ZP)({
																action: "loginOrRegistFailed",
															}),
															(t.verifyCodeErrorInfo =
																t.$lg(
																	n.t0,
																	"error.response.data.data.msg"
																));
													case 21:
														return (
															(n.prev = 21),
															o.remove(),
															n.finish(21)
														);
													case 24:
														n.next = 48;
														break;
													case 26:
														if (
															"email" !==
															t.getCurrentType
														) {
															n.next = 48;
															break;
														}
														return (
															(c = ""),
															(n.prev = 28),
															(n.next = 31),
															(0, a.fZ)({
																email_code: e,
																email_address:
																	t.getInputNumber(),
															})
														);
													case 31:
														(l = n.sent),
															(c = t.$lg(
																l,
																"action"
															)),
															(0, q.Z)(
																{
																	action: t.$lg(
																		l,
																		"action"
																	),
																	login_method:
																		"email",
																},
																{
																	logTopic:
																		"passport",
																}
															),
															(0, q.Z)(
																{
																	action: "verify_email",
																	method: "login_or_register",
																},
																{
																	logTopic:
																		"verification_code",
																}
															),
															(0, q.Z)({
																action: "loginOrRegistSuccess",
															}),
															"login" === c &&
																((0, q.Z)({
																	action: "loginSuccess",
																}),
																(0, I.ZP)({
																	object_type:
																		"email",
																	action: "loginSuccess",
																})),
															(t.codeSentTimes = 0),
															t.handleResult(l),
															(n.next = 45);
														break;
													case 41:
														(n.prev = 41),
															(n.t1 =
																n.catch(28)),
															(0, I.ZP)({
																action: "loginOrRegistFailed",
															}),
															(t.verifyCodeErrorInfo =
																t.$lg(
																	n.t1,
																	"error.response.data.data.msg"
																));
													case 45:
														return (
															(n.prev = 45),
															o.remove(),
															n.finish(45)
														);
													case 48:
													case "end":
														return n.stop();
												}
										},
										n,
										null,
										[
											[4, 17, 21, 24],
											[28, 41, 45, 48],
										]
									);
								})
							)();
						},
						handleResult: function (e) {
							K.Z.set(
								"preregisterInfo",
								this.$lg(e, "preregister")
							),
								K.Z.set(
									"ticketToken",
									this.$lg(e, "ticket_token")
								),
								(this.showVerifyCodeModal = !1),
								this.$handleAuthNextStep(
									this.$lg(e, "preregister.next_step")
								);
						},
						openBrowser: function (e, t) {
							var n = this;
							return (0, o.Z)(
								(0, i.Z)().mark(function o() {
									return (0, i.Z)().wrap(
										function (i) {
											for (;;)
												switch ((i.prev = i.next)) {
													case 0:
														if (!n.isInSDK) {
															i.next = 5;
															break;
														}
														t.preventDefault(),
															(0, ie.ZP)(
																"openBrowser",
																e
															),
															(i.next = 15);
														break;
													case 5:
														if (!n.isInApp) {
															i.next = 15;
															break;
														}
														return (
															t.preventDefault(),
															(i.prev = 7),
															(i.next = 10),
															(0, ue.uo)(
																"to?url=".concat(
																	encodeURIComponent(
																		e +
																			"/for-client"
																	)
																)
															)
														);
													case 10:
														i.next = 15;
														break;
													case 12:
														(i.prev = 12),
															(i.t0 = i.catch(7)),
															window.open(
																e,
																"_blank"
															);
													case 15:
													case "end":
														return i.stop();
												}
										},
										o,
										null,
										[[7, 12]]
									);
								})
							)();
						},
						handleInputChange: function () {
							"phone" === this.getCurrentType &&
								(this.inputNumber = this.inputNumber.replace(
									/\D/g,
									""
								));
						},
						handleCloseIframe: function () {
							if (this.isTapIframe && window.parent) {
								var e = (0, ae.LU)();
								parent.postMessage(
									JSON.stringify({
										action: "closeLoginDialog",
									}),
									e
								);
							}
						},
						toggleLoginMode: function () {
							(this.loginMode =
								"normal" === this.loginMode
									? "qrcode"
									: "normal"),
								(0, I.ZP)(
									{
										action: "click",
										object_type: "login_qrcode_icon",
									},
									{
										icon_status:
											"qrcode" === this.loginMode ? 1 : 0,
									}
								),
								"normal" === this.loginMode &&
									this.pageViewTrack();
						},
						handleQrcodeLoginSuccess: function (e) {
							console.log("we are in qrcode login success");
							
							this.handleResult(e);
						},
					},
				},
				he =
					(n(95985),
					(0, _.Z)(
						de,
						function () {
							var e = this,
								t = e.$createElement,
								i = e._self._c || t;
							return e.$store.state.profile
								? e._e()
								: i("layout-main", {
										staticClass: "login-page",
										class: [
											e.mediaQueryMatchMobile
												? "login-page--mobile"
												: "login-page--pc",
											{
												"login-page--landscape":
													e.isShowLandScape,
											},
											{ "login-page--sdk": e.isInSDK },
											{
												"login-page--landscape-sdk":
													e.isInSDK &&
													e.isMobileLandscape,
											},
										],
										attrs: {
											"is-show-header":
												e.isShowMobileHeader,
										},
										scopedSlots: e._u(
											[
												{
													key: "main",
													fn: function () {
														return [
															i("auth-box", {
																scopedSlots:
																	e._u(
																		[
																			{
																				key: "custom-header",
																				fn: function () {
																					return [
																						e.isInSDK
																							? e._e()
																							: i(
																									"div",
																									{
																										staticClass:
																											"login-page__content__login-mode-switch",
																										on: {
																											click: e.toggleLoginMode,
																										},
																									},
																									[
																										"normal" ===
																										e.loginMode
																											? i(
																													"img",
																													{
																														staticClass:
																															"login-page__content__login-mode-icon",
																														attrs: {
																															src: n(
																																29030
																															),
																															alt: "QR Code",
																														},
																													}
																											  )
																											: i(
																													"img",
																													{
																														staticClass:
																															"login-page__content__login-mode-icon",
																														attrs: {
																															src: n(
																																18853
																															),
																															alt: "Password",
																														},
																													}
																											  ),
																									]
																							  ),
																					];
																				},
																				proxy: !0,
																			},
																			{
																				key: "content",
																				fn: function () {
																					return [
																						i(
																							"div",
																							{
																								staticClass:
																									"login-page__content",
																							},
																							[
																								i(
																									"img",
																									{
																										staticClass:
																											"taptap-logo",
																										attrs: {
																											src: e.logoUrl,
																											alt: "TapTap",
																										},
																									}
																								),
																								"qrcode" ===
																								e.loginMode
																									? i(
																											"div",
																											{
																												staticClass:
																													"login-page__content__qrcode-container",
																											},
																											[
																												i(
																													"qrcode-login",
																													{
																														attrs: {
																															"login-session":
																																e
																																	.$route
																																	.query
																																	.session ||
																																"",
																														},
																														on: {
																															"login-success":
																																e.handleQrcodeLoginSuccess,
																														},
																													}
																												),
																											],
																											1
																									  )
																									: [
																											i(
																												"div",
																												{
																													staticClass:
																														"login-page__content__login-text login-page__content__title flex-center--y heading-m16-w18 font-bold",
																												},
																												e._l(
																													e.getTabs,
																													function (
																														t,
																														n
																													) {
																														return i(
																															"tap-text",
																															{
																																key: n,
																																staticClass:
																																	"login-title",
																																class: [
																																	t ===
																																	e.getCurrentType
																																		? "gray-07"
																																		: "gray-04",
																																	"sdk" ===
																																	e.loginStyle
																																		? "login-page__content__default-title--sdk"
																																		: "",
																																],
																																nativeOn:
																																	{
																																		click: function (
																																			n
																																		) {
																																			return e.changeLoginTypeInSdk(
																																				t
																																			);
																																		},
																																	},
																															},
																															[
																																e._v(
																																	" " +
																																		e._s(
																																			e.getTitleByType(
																																				t
																																			)
																																		) +
																																		" "
																																),
																															]
																														);
																													}
																												),
																												1
																											),
																											"normal" ===
																											e.loginStyle
																												? i(
																														"tap-text",
																														{
																															staticClass:
																																"login-page__content__login-text login-page__content__login-tips login-page__content__login-desc gray-06",
																															class: [
																																e.isMobileLandscape
																																	? "login-page__content__login-tips--landscape"
																																	: "",
																															],
																														},
																														[
																															e._v(
																																" " +
																																	e._s(
																																		"phone" ===
																																			e.getCurrentType
																																			? e.$t(
																																					"automatically_register_in_phone"
																																			  )
																																			: e.$t(
																																					"login_tips_in_email"
																																			  )
																																	) +
																																	" "
																															),
																														]
																												  )
																												: e._e(),
																											i(
																												"tap-input",
																												{
																													ref: "inputNumberDom",
																													class: [
																														"normal" ===
																														e.loginStyle
																															? "login-page__content__input--normal"
																															: "",
																														"login-page__content__input--input",
																														e.isMobileLandscape
																															? "login-page__content__input--input--landscape"
																															: "",
																													],
																													attrs: {
																														"err-info":
																															e.errInfo,
																														placeholder:
																															"phone" ===
																															e.getCurrentType
																																? e.$t(
																																		"input_phone_number_placeholder"
																																  )
																																: e.$t(
																																		"input_email_address_placeholder"
																																  ),
																														theme:
																															"phone" ===
																															e.getCurrentType
																																? "phoneNumber"
																																: "base",
																														type:
																															"phone" ===
																															e.getCurrentType
																																? "tel"
																																: "email",
																													},
																													on: {
																														"update:errInfo":
																															function (
																																t
																															) {
																																e.errInfo =
																																	t;
																															},
																														"update:err-info":
																															function (
																																t
																															) {
																																e.errInfo =
																																	t;
																															},
																														input: e.handleInputChange,
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
																																: e.handleLoginCLick.apply(
																																		null,
																																		arguments
																																  );
																														},
																													},
																													model: {
																														value: e.inputNumber,
																														callback:
																															function (
																																t
																															) {
																																e.inputNumber =
																																	t;
																															},
																														expression:
																															"inputNumber",
																													},
																												},
																												[
																													i(
																														"template",
																														{
																															slot: "errInfoSuffix",
																														},
																														[
																															"normal" ===
																															e.loginStyle
																																? i(
																																		"p",
																																		{
																																			staticClass:
																																				"login-page__content__change-type",
																																			staticStyle:
																																				{
																																					color: "#1d669d",
																																				},
																																			on: {
																																				click: e.changeLoginType,
																																			},
																																		},
																																		[
																																			e._v(
																																				" " +
																																					e._s(
																																						e.changeLoginTypeText
																																					) +
																																					" "
																																			),
																																		]
																																  )
																																: e._e(),
																														]
																													),
																												],
																												2
																											),
																											"sdk" !==
																												e.loginStyle ||
																											e.errInfo
																												? e._e()
																												: i(
																														"tap-text",
																														{
																															staticClass:
																																"login-page__content__login-text login-page__content__login-tips caption-m12-w14 gray-06",
																														},
																														[
																															e._v(
																																" " +
																																	e._s(
																																		"phone" ===
																																			e.getCurrentType
																																			? e.$t(
																																					"automatically_register_in_phone"
																																			  )
																																			: e.$t(
																																					"login_tips_in_email"
																																			  )
																																	) +
																																	" "
																															),
																														]
																												  ),
																									  ],
																							],
																							2
																						),
																					];
																				},
																				proxy: !0,
																			},
																			{
																				key: "contentFooter",
																				fn: function () {
																					return [
																						"normal" ===
																						e.loginMode
																							? i(
																									"div",
																									{
																										staticClass:
																											"auth__action-wrap login-page__content__action",
																										class: [
																											{
																												"login-page__content__action--blank":
																													e.isInSDK &&
																													e.isMobileLandscape &&
																													!e.$browser.is(
																														"iOS"
																													),
																											},
																										],
																									},
																									[
																										i(
																											"div",
																											{
																												staticClass:
																													"login-page__content__footer",
																											},
																											[
																												i(
																													"div",
																													[
																														i(
																															"tap-button",
																															{
																																ref: "submit-button",
																																staticClass:
																																	"login-page__content__login-button font-bold",
																																attrs: {
																																	disabled:
																																		e.buttonDisabled,
																																	size: "x-large",
																																	theme: "primary",
																																},
																																on: {
																																	click: e.handleLoginCLick,
																																},
																															},
																															[
																																e._v(
																																	" " +
																																		e._s(
																																			e.$t(
																																				"login_or_register_button"
																																			)
																																		) +
																																		" "
																																),
																															]
																														),
																														i(
																															"div",
																															{
																																staticClass:
																																	"login-page__content__login-checkbox",
																															},
																															[
																																e.isShowCheckBoxHint
																																	? i(
																																			"check-box-hint",
																																			{
																																				staticClass:
																																					"login-checkbox__hint font-bold",
																																				on: {
																																					disappear:
																																						e.setCheckBoxHintDisappear,
																																				},
																																			}
																																	  )
																																	: e._e(),
																																i(
																																	"check-terms",
																																	{
																																		attrs: {
																																			"init-select":
																																				e.isIntl ||
																																				e.isAgreeProtocol,
																																			size: e.mediaQueryMatchMobile
																																				? 16
																																				: 18,
																																		},
																																		on: {
																																			selectedEvent:
																																				e.isAgree,
																																		},
																																	},
																																	[
																																		i(
																																			"i18n",
																																			{
																																				staticClass:
																																					"caption-m12-w14 gray-04 text__landscape",
																																				attrs: {
																																					path: "login_read_protocol_container",
																																				},
																																			},
																																			[
																																				i(
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
																																				i(
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
																													],
																													1
																												),
																												i(
																													"social-login",
																													{
																														staticClass:
																															"login-page__content__social-login",
																														attrs: {
																															"is-agree-protocol":
																																e.isAgreeProtocol,
																														},
																														on: {
																															agreeProtocol:
																																function (
																																	t
																																) {
																																	return e.isAgree(
																																		!0
																																	);
																																},
																															showCheckHint:
																																e.setCheckBoxHintAppear,
																														},
																													}
																												),
																											],
																											1
																										),
																									]
																							  )
																							: e._e(),
																					];
																				},
																				proxy: !0,
																			},
																		],
																		null,
																		!1,
																		2617120498
																	),
															}),
															i("verify-code", {
																attrs: {
																	"clean-err-info":
																		e.cleanVerifyCodeInfo,
																	"err-info":
																		e.verifyCodeErrorInfo,
																	"retry-seconds":
																		e.retrySeconds,
																	"send-verify-target":
																		e.sendVerifyTarget,
																	"send-verify-type":
																		e.getCurrentType,
																	"show-verify-code-modal":
																		e.showVerifyCodeModal,
																},
																on: {
																	"update:showVerifyCodeModal":
																		function (
																			t
																		) {
																			e.showVerifyCodeModal =
																				t;
																		},
																	"update:show-verify-code-modal":
																		function (
																			t
																		) {
																			e.showVerifyCodeModal =
																				t;
																		},
																	resend: e.requestVerifyCode,
																	submitCode:
																		e.login,
																},
															}),
														];
													},
													proxy: !0,
												},
											],
											null,
											!1,
											630716441
										),
								  });
						},
						[],
						!1,
						null,
						null,
						null
					)),
				pe = he.exports;
		},
		76398: function (e, t, n) {
			"use strict";
			n.d(t, {
				Z: function () {
					return u;
				},
			});
			var i = n(43659),
				o = (n(5192), n(43856)),
				r = n(4403),
				a = n(91056),
				s = n(82856),
				c = n(36428),
				l = {
					name: "VerifyCode",
					components: {
						VerifyCodeInput: s.Z,
						TapText: r.Z,
						Modal: o.Z,
						TapButton: a.Z,
					},
					props: {
						sendVerifyTarget: { type: String, default: "" },
						retrySeconds: { type: [String, Number], default: 1 },
						sendVerifyType: { type: String, default: "phone" },
						showVerifyCodeModal: { type: Boolean, default: !1 },
						errInfo: { type: String, default: "" },
						cleanErrInfo: {
							type: Function,
							default: function () {},
						},
					},
					data: function () {
						return {
							waitSecond: this.retrySeconds,
							errorMessage: "",
							show: this.showVerifyCodeModal,
							isAutoFocus: !1,
						};
					},
					watch: {
						showVerifyCodeModal: function (e) {
							this.show = e;
						},
						show: function (e) {
							this.$emit("update:showVerifyCodeModal", e),
								e
									? ((this.isAutoFocus = !1),
									  (this.waitSecond = this.retrySeconds),
									  this.forVerify())
									: (this.$refs.codeInput.clearCode(),
									  this.cleanErrInfo());
						},
					},
					updated: function () {
						var e = this;
						this.$nextTick(function () {
							e.isAutoFocus ||
								(e.$refs.codeInput.triggerInput(),
								(e.isAutoFocus = !0));
						});
					},
					computed: (0, i.Z)(
						(0, i.Z)(
							{},
							(0, c.rn)([
								"mediaQueryMatchMobile",
								"isMobileLandscape",
								"isInSDK",
							])
						),
						{},
						{
							getCodeBtnDisable: function () {
								return 0 !== this.waitSecond;
							},
							confirmText: function () {
								return this.waitSecond > 0
									? this.$tc(
											"second_can_be_resent_support_plural",
											this.waitSecond,
											{ waitSecond: this.waitSecond }
									  )
									: this.$t("send_verify_code");
							},
							verifyMessage: function () {
								return "phone" === this.sendVerifyType
									? this.$t(
											"send_phone_verify_message_tips",
											{
												targetNumber:
													this.sendVerifyTarget,
											}
									  )
									: this.$t(
											"send_email_verify_message_tips",
											{
												targetNumber:
													this.sendVerifyTarget,
											}
									  );
							},
							isLockScroll: function () {
								return (
									!this.$browser.is("mobile") ||
									!this.isMobileLandscape
								);
							},
						}
					),
					methods: {
						sendVerifyCode: function () {
							this.$emit("resend");
						},
						showErrorMessage: function (e) {
							this.errorMessage = e;
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
						postMessage: function (e) {
							this.$emit("submitCode", e);
						},
					},
				},
				u =
					(n(80987),
					(0, n(39563).Z)(
						l,
						function () {
							var e = this,
								t = e.$createElement,
								n = e._self._c || t;
							return n(
								"modal",
								{
									staticClass: "verify-code",
									class: [
										{
											"verify-code--landscape":
												e.isMobileLandscape,
											"verify-code--landscape--blank":
												e.isInSDK &&
												e.isMobileLandscape &&
												!e.$browser.is("iOS"),
										},
									],
									attrs: {
										"can-change-route": !1,
										"media-title": e.$t("input_captcha"),
										"close-icon-position": "right",
										show: e.show,
										"lock-scroll": e.isLockScroll,
									},
									on: {
										"update:show": function (t) {
											e.show = t;
										},
									},
								},
								[
									n(
										"div",
										{
											staticClass:
												"verify-code__description",
										},
										[
											n(
												"div",
												{
													staticClass:
														"verify-code__error-icon",
												},
												[
													e.errInfo
														? n("Icon", {
																attrs: {
																	icon: "ico-m16-w18-error",
																	"class-name":
																		"primary-red",
																},
														  })
														: e._e(),
												],
												1
											),
											n(
												"tap-text",
												{
													staticClass:
														"verify-code__tips caption-m12-w14",
													class: e.errInfo
														? "primary-red"
														: "gray-06",
													attrs: { line: 2 },
												},
												[
													e._v(
														" " +
															e._s(
																e.errInfo ||
																	e.verifyMessage
															) +
															" "
													),
												]
											),
										],
										1
									),
									n("verify-code-input", {
										ref: "codeInput",
										staticClass: "verify-code__input",
										attrs: { "force-use-default": !0 },
										on: {
											errorMessage: e.showErrorMessage,
											finishEvent: e.postMessage,
										},
									}),
									n(
										"div",
										{ staticClass: "verify-code__action" },
										[
											n(
												"tap-button",
												{
													staticClass:
														"verify-code__send-button font-bold",
													attrs: {
														disabled:
															e.getCodeBtnDisable,
														theme: "primary",
														size: "large",
													},
													on: {
														click: e.sendVerifyCode,
													},
												},
												[
													e._v(
														" " +
															e._s(
																e.confirmText
															) +
															" "
													),
												]
											),
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
					).exports);
		},
		51577: function (e, t, n) {
			var i = n(79217).PROPER,
				o = n(91585),
				r = n(16104);
			e.exports = function (e) {
				return o(function () {
					return (
						!!r[e]() || "​᠎" !== "​᠎"[e]() || (i && r[e].name !== e)
					);
				});
			};
		},
		25926: function (e, t, n) {
			"use strict";
			var i = n(75736),
				o = n(70705).trim;
			i(
				{ target: "String", proto: !0, forced: n(51577)("trim") },
				{
					trim: function () {
						return o(this);
					},
				}
			);
		},
		35243: function (e, t, n) {
			var i = n(24007),
				o = n(45563),
				r = n(86040);
			e.exports = function (e, t, n) {
				var a = -1,
					s = (t = i(t, e)).length;
				for (s || ((s = 1), (e = void 0)); ++a < s; ) {
					var c = null == e ? void 0 : e[r(t[a])];
					void 0 === c && ((a = s), (c = n)),
						(e = o(c) ? c.call(e) : c);
				}
				return e;
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
		95985: function (e) {
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
		88117: function (e) {
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
		27967: function (e) {
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
		80987: function (e) {
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
		58402: function (e) {
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
		2258: function (e) {
			var t;
			e.exports = (function () {
				function e(e) {
					(this.mode = i.MODE_8BIT_BYTE),
						(this.data = e),
						(this.parsedData = []);
					for (var t = 0, n = this.data.length; t < n; t++) {
						var o = [],
							r = this.data.charCodeAt(t);
						r > 65536
							? ((o[0] = 240 | ((1835008 & r) >>> 18)),
							  (o[1] = 128 | ((258048 & r) >>> 12)),
							  (o[2] = 128 | ((4032 & r) >>> 6)),
							  (o[3] = 128 | (63 & r)))
							: r > 2048
							? ((o[0] = 224 | ((61440 & r) >>> 12)),
							  (o[1] = 128 | ((4032 & r) >>> 6)),
							  (o[2] = 128 | (63 & r)))
							: r > 128
							? ((o[0] = 192 | ((1984 & r) >>> 6)),
							  (o[1] = 128 | (63 & r)))
							: (o[0] = r),
							this.parsedData.push(o);
					}
					(this.parsedData = Array.prototype.concat.apply(
						[],
						this.parsedData
					)),
						this.parsedData.length != this.data.length &&
							(this.parsedData.unshift(191),
							this.parsedData.unshift(187),
							this.parsedData.unshift(239));
				}
				function n(e, t) {
					(this.typeNumber = e),
						(this.errorCorrectLevel = t),
						(this.modules = null),
						(this.moduleCount = 0),
						(this.dataCache = null),
						(this.dataList = []);
				}
				(e.prototype = {
					getLength: function (e) {
						return this.parsedData.length;
					},
					write: function (e) {
						for (var t = 0, n = this.parsedData.length; t < n; t++)
							e.put(this.parsedData[t], 8);
					},
				}),
					(n.prototype = {
						addData: function (t) {
							var n = new e(t);
							this.dataList.push(n), (this.dataCache = null);
						},
						isDark: function (e, t) {
							if (
								e < 0 ||
								this.moduleCount <= e ||
								t < 0 ||
								this.moduleCount <= t
							)
								throw new Error(e + "," + t);
							return this.modules[e][t];
						},
						getModuleCount: function () {
							return this.moduleCount;
						},
						make: function () {
							this.makeImpl(!1, this.getBestMaskPattern());
						},
						makeImpl: function (e, t) {
							(this.moduleCount = 4 * this.typeNumber + 17),
								(this.modules = new Array(this.moduleCount));
							for (var i = 0; i < this.moduleCount; i++) {
								this.modules[i] = new Array(this.moduleCount);
								for (var o = 0; o < this.moduleCount; o++)
									this.modules[i][o] = null;
							}
							this.setupPositionProbePattern(0, 0),
								this.setupPositionProbePattern(
									this.moduleCount - 7,
									0
								),
								this.setupPositionProbePattern(
									0,
									this.moduleCount - 7
								),
								this.setupPositionAdjustPattern(),
								this.setupTimingPattern(),
								this.setupTypeInfo(e, t),
								this.typeNumber >= 7 && this.setupTypeNumber(e),
								null == this.dataCache &&
									(this.dataCache = n.createData(
										this.typeNumber,
										this.errorCorrectLevel,
										this.dataList
									)),
								this.mapData(this.dataCache, t);
						},
						setupPositionProbePattern: function (e, t) {
							for (var n = -1; n <= 7; n++)
								if (!(e + n <= -1 || this.moduleCount <= e + n))
									for (var i = -1; i <= 7; i++)
										t + i <= -1 ||
											this.moduleCount <= t + i ||
											(this.modules[e + n][t + i] =
												(0 <= n &&
													n <= 6 &&
													(0 == i || 6 == i)) ||
												(0 <= i &&
													i <= 6 &&
													(0 == n || 6 == n)) ||
												(2 <= n &&
													n <= 4 &&
													2 <= i &&
													i <= 4));
						},
						getBestMaskPattern: function () {
							for (var e = 0, t = 0, n = 0; n < 8; n++) {
								this.makeImpl(!0, n);
								var i = a.getLostPoint(this);
								(0 == n || e > i) && ((e = i), (t = n));
							}
							return t;
						},
						createMovieClip: function (e, t, n) {
							var i = e.createEmptyMovieClip(t, n),
								o = 1;
							this.make();
							for (var r = 0; r < this.modules.length; r++)
								for (
									var a = r * o, s = 0;
									s < this.modules[r].length;
									s++
								) {
									var c = s * o;
									this.modules[r][s] &&
										(i.beginFill(0, 100),
										i.moveTo(c, a),
										i.lineTo(c + o, a),
										i.lineTo(c + o, a + o),
										i.lineTo(c, a + o),
										i.endFill());
								}
							return i;
						},
						setupTimingPattern: function () {
							for (var e = 8; e < this.moduleCount - 8; e++)
								null == this.modules[e][6] &&
									(this.modules[e][6] = e % 2 == 0);
							for (var t = 8; t < this.moduleCount - 8; t++)
								null == this.modules[6][t] &&
									(this.modules[6][t] = t % 2 == 0);
						},
						setupPositionAdjustPattern: function () {
							for (
								var e = a.getPatternPosition(this.typeNumber),
									t = 0;
								t < e.length;
								t++
							)
								for (var n = 0; n < e.length; n++) {
									var i = e[t],
										o = e[n];
									if (null == this.modules[i][o])
										for (var r = -2; r <= 2; r++)
											for (var s = -2; s <= 2; s++)
												this.modules[i + r][o + s] =
													-2 == r ||
													2 == r ||
													-2 == s ||
													2 == s ||
													(0 == r && 0 == s);
								}
						},
						setupTypeNumber: function (e) {
							for (
								var t = a.getBCHTypeNumber(this.typeNumber),
									n = 0;
								n < 18;
								n++
							) {
								var i = !e && 1 == ((t >> n) & 1);
								this.modules[Math.floor(n / 3)][
									(n % 3) + this.moduleCount - 8 - 3
								] = i;
							}
							for (n = 0; n < 18; n++)
								(i = !e && 1 == ((t >> n) & 1)),
									(this.modules[
										(n % 3) + this.moduleCount - 8 - 3
									][Math.floor(n / 3)] = i);
						},
						setupTypeInfo: function (e, t) {
							for (
								var n = (this.errorCorrectLevel << 3) | t,
									i = a.getBCHTypeInfo(n),
									o = 0;
								o < 15;
								o++
							) {
								var r = !e && 1 == ((i >> o) & 1);
								o < 6
									? (this.modules[o][8] = r)
									: o < 8
									? (this.modules[o + 1][8] = r)
									: (this.modules[
											this.moduleCount - 15 + o
									  ][8] = r);
							}
							for (o = 0; o < 15; o++)
								(r = !e && 1 == ((i >> o) & 1)),
									o < 8
										? (this.modules[8][
												this.moduleCount - o - 1
										  ] = r)
										: o < 9
										? (this.modules[8][15 - o - 1 + 1] = r)
										: (this.modules[8][15 - o - 1] = r);
							this.modules[this.moduleCount - 8][8] = !e;
						},
						mapData: function (e, t) {
							for (
								var n = -1,
									i = this.moduleCount - 1,
									o = 7,
									r = 0,
									s = this.moduleCount - 1;
								s > 0;
								s -= 2
							)
								for (6 == s && s--; ; ) {
									for (var c = 0; c < 2; c++)
										if (null == this.modules[i][s - c]) {
											var l = !1;
											r < e.length &&
												(l = 1 == ((e[r] >>> o) & 1)),
												a.getMask(t, i, s - c) &&
													(l = !l),
												(this.modules[i][s - c] = l),
												-1 == --o && (r++, (o = 7));
										}
									if ((i += n) < 0 || this.moduleCount <= i) {
										(i -= n), (n = -n);
										break;
									}
								}
						},
					}),
					(n.PAD0 = 236),
					(n.PAD1 = 17),
					(n.createData = function (e, t, i) {
						for (
							var o = u.getRSBlocks(e, t), r = new d(), s = 0;
							s < i.length;
							s++
						) {
							var c = i[s];
							r.put(c.mode, 4),
								r.put(
									c.getLength(),
									a.getLengthInBits(c.mode, e)
								),
								c.write(r);
						}
						var l = 0;
						for (s = 0; s < o.length; s++) l += o[s].dataCount;
						if (r.getLengthInBits() > 8 * l)
							throw new Error(
								"code length overflow. (" +
									r.getLengthInBits() +
									">" +
									8 * l +
									")"
							);
						for (
							r.getLengthInBits() + 4 <= 8 * l && r.put(0, 4);
							r.getLengthInBits() % 8 != 0;

						)
							r.putBit(!1);
						for (
							;
							!(
								r.getLengthInBits() >= 8 * l ||
								(r.put(n.PAD0, 8), r.getLengthInBits() >= 8 * l)
							);

						)
							r.put(n.PAD1, 8);
						return n.createBytes(r, o);
					}),
					(n.createBytes = function (e, t) {
						for (
							var n = 0,
								i = 0,
								o = 0,
								r = new Array(t.length),
								s = new Array(t.length),
								c = 0;
							c < t.length;
							c++
						) {
							var u = t[c].dataCount,
								d = t[c].totalCount - u;
							(i = Math.max(i, u)),
								(o = Math.max(o, d)),
								(r[c] = new Array(u));
							for (var h = 0; h < r[c].length; h++)
								r[c][h] = 255 & e.buffer[h + n];
							n += u;
							var p = a.getErrorCorrectPolynomial(d),
								g = new l(r[c], p.getLength() - 1).mod(p);
							for (
								s[c] = new Array(p.getLength() - 1), h = 0;
								h < s[c].length;
								h++
							) {
								var f = h + g.getLength() - s[c].length;
								s[c][h] = f >= 0 ? g.get(f) : 0;
							}
						}
						var _ = 0;
						for (h = 0; h < t.length; h++) _ += t[h].totalCount;
						var m = new Array(_),
							C = 0;
						for (h = 0; h < i; h++)
							for (c = 0; c < t.length; c++)
								h < r[c].length && (m[C++] = r[c][h]);
						for (h = 0; h < o; h++)
							for (c = 0; c < t.length; c++)
								h < s[c].length && (m[C++] = s[c][h]);
						return m;
					});
				for (
					var i = {
							MODE_NUMBER: 1,
							MODE_ALPHA_NUM: 2,
							MODE_8BIT_BYTE: 4,
							MODE_KANJI: 8,
						},
						o = { L: 1, M: 0, Q: 3, H: 2 },
						r = {
							PATTERN000: 0,
							PATTERN001: 1,
							PATTERN010: 2,
							PATTERN011: 3,
							PATTERN100: 4,
							PATTERN101: 5,
							PATTERN110: 6,
							PATTERN111: 7,
						},
						a = {
							PATTERN_POSITION_TABLE: [
								[],
								[6, 18],
								[6, 22],
								[6, 26],
								[6, 30],
								[6, 34],
								[6, 22, 38],
								[6, 24, 42],
								[6, 26, 46],
								[6, 28, 50],
								[6, 30, 54],
								[6, 32, 58],
								[6, 34, 62],
								[6, 26, 46, 66],
								[6, 26, 48, 70],
								[6, 26, 50, 74],
								[6, 30, 54, 78],
								[6, 30, 56, 82],
								[6, 30, 58, 86],
								[6, 34, 62, 90],
								[6, 28, 50, 72, 94],
								[6, 26, 50, 74, 98],
								[6, 30, 54, 78, 102],
								[6, 28, 54, 80, 106],
								[6, 32, 58, 84, 110],
								[6, 30, 58, 86, 114],
								[6, 34, 62, 90, 118],
								[6, 26, 50, 74, 98, 122],
								[6, 30, 54, 78, 102, 126],
								[6, 26, 52, 78, 104, 130],
								[6, 30, 56, 82, 108, 134],
								[6, 34, 60, 86, 112, 138],
								[6, 30, 58, 86, 114, 142],
								[6, 34, 62, 90, 118, 146],
								[6, 30, 54, 78, 102, 126, 150],
								[6, 24, 50, 76, 102, 128, 154],
								[6, 28, 54, 80, 106, 132, 158],
								[6, 32, 58, 84, 110, 136, 162],
								[6, 26, 54, 82, 110, 138, 166],
								[6, 30, 58, 86, 114, 142, 170],
							],
							G15: 1335,
							G18: 7973,
							G15_MASK: 21522,
							getBCHTypeInfo: function (e) {
								for (
									var t = e << 10;
									a.getBCHDigit(t) - a.getBCHDigit(a.G15) >=
									0;

								)
									t ^=
										a.G15 <<
										(a.getBCHDigit(t) -
											a.getBCHDigit(a.G15));
								return ((e << 10) | t) ^ a.G15_MASK;
							},
							getBCHTypeNumber: function (e) {
								for (
									var t = e << 12;
									a.getBCHDigit(t) - a.getBCHDigit(a.G18) >=
									0;

								)
									t ^=
										a.G18 <<
										(a.getBCHDigit(t) -
											a.getBCHDigit(a.G18));
								return (e << 12) | t;
							},
							getBCHDigit: function (e) {
								for (var t = 0; 0 != e; ) t++, (e >>>= 1);
								return t;
							},
							getPatternPosition: function (e) {
								return a.PATTERN_POSITION_TABLE[e - 1];
							},
							getMask: function (e, t, n) {
								switch (e) {
									case r.PATTERN000:
										return (t + n) % 2 == 0;
									case r.PATTERN001:
										return t % 2 == 0;
									case r.PATTERN010:
										return n % 3 == 0;
									case r.PATTERN011:
										return (t + n) % 3 == 0;
									case r.PATTERN100:
										return (
											(Math.floor(t / 2) +
												Math.floor(n / 3)) %
												2 ==
											0
										);
									case r.PATTERN101:
										return (
											((t * n) % 2) + ((t * n) % 3) == 0
										);
									case r.PATTERN110:
										return (
											(((t * n) % 2) + ((t * n) % 3)) %
												2 ==
											0
										);
									case r.PATTERN111:
										return (
											(((t * n) % 3) + ((t + n) % 2)) %
												2 ==
											0
										);
									default:
										throw new Error("bad maskPattern:" + e);
								}
							},
							getErrorCorrectPolynomial: function (e) {
								for (var t = new l([1], 0), n = 0; n < e; n++)
									t = t.multiply(new l([1, s.gexp(n)], 0));
								return t;
							},
							getLengthInBits: function (e, t) {
								if (1 <= t && t < 10)
									switch (e) {
										case i.MODE_NUMBER:
											return 10;
										case i.MODE_ALPHA_NUM:
											return 9;
										case i.MODE_8BIT_BYTE:
										case i.MODE_KANJI:
											return 8;
										default:
											throw new Error("mode:" + e);
									}
								else if (t < 27)
									switch (e) {
										case i.MODE_NUMBER:
											return 12;
										case i.MODE_ALPHA_NUM:
											return 11;
										case i.MODE_8BIT_BYTE:
											return 16;
										case i.MODE_KANJI:
											return 10;
										default:
											throw new Error("mode:" + e);
									}
								else {
									if (!(t < 41)) throw new Error("type:" + t);
									switch (e) {
										case i.MODE_NUMBER:
											return 14;
										case i.MODE_ALPHA_NUM:
											return 13;
										case i.MODE_8BIT_BYTE:
											return 16;
										case i.MODE_KANJI:
											return 12;
										default:
											throw new Error("mode:" + e);
									}
								}
							},
							getLostPoint: function (e) {
								for (
									var t = e.getModuleCount(), n = 0, i = 0;
									i < t;
									i++
								)
									for (var o = 0; o < t; o++) {
										for (
											var r = 0,
												a = e.isDark(i, o),
												s = -1;
											s <= 1;
											s++
										)
											if (!(i + s < 0 || t <= i + s))
												for (var c = -1; c <= 1; c++)
													o + c < 0 ||
														t <= o + c ||
														(0 == s && 0 == c) ||
														(a ==
															e.isDark(
																i + s,
																o + c
															) &&
															r++);
										r > 5 && (n += 3 + r - 5);
									}
								for (i = 0; i < t - 1; i++)
									for (o = 0; o < t - 1; o++) {
										var l = 0;
										e.isDark(i, o) && l++,
											e.isDark(i + 1, o) && l++,
											e.isDark(i, o + 1) && l++,
											e.isDark(i + 1, o + 1) && l++,
											(0 != l && 4 != l) || (n += 3);
									}
								for (i = 0; i < t; i++)
									for (o = 0; o < t - 6; o++)
										e.isDark(i, o) &&
											!e.isDark(i, o + 1) &&
											e.isDark(i, o + 2) &&
											e.isDark(i, o + 3) &&
											e.isDark(i, o + 4) &&
											!e.isDark(i, o + 5) &&
											e.isDark(i, o + 6) &&
											(n += 40);
								for (o = 0; o < t; o++)
									for (i = 0; i < t - 6; i++)
										e.isDark(i, o) &&
											!e.isDark(i + 1, o) &&
											e.isDark(i + 2, o) &&
											e.isDark(i + 3, o) &&
											e.isDark(i + 4, o) &&
											!e.isDark(i + 5, o) &&
											e.isDark(i + 6, o) &&
											(n += 40);
								var u = 0;
								for (o = 0; o < t; o++)
									for (i = 0; i < t; i++)
										e.isDark(i, o) && u++;
								return (n +=
									(Math.abs((100 * u) / t / t - 50) / 5) *
									10);
							},
						},
						s = {
							glog: function (e) {
								if (e < 1) throw new Error("glog(" + e + ")");
								return s.LOG_TABLE[e];
							},
							gexp: function (e) {
								for (; e < 0; ) e += 255;
								for (; e >= 256; ) e -= 255;
								return s.EXP_TABLE[e];
							},
							EXP_TABLE: new Array(256),
							LOG_TABLE: new Array(256),
						},
						c = 0;
					c < 8;
					c++
				)
					s.EXP_TABLE[c] = 1 << c;
				for (c = 8; c < 256; c++)
					s.EXP_TABLE[c] =
						s.EXP_TABLE[c - 4] ^
						s.EXP_TABLE[c - 5] ^
						s.EXP_TABLE[c - 6] ^
						s.EXP_TABLE[c - 8];
				for (c = 0; c < 255; c++) s.LOG_TABLE[s.EXP_TABLE[c]] = c;
				function l(e, t) {
					if (null == e.length) throw new Error(e.length + "/" + t);
					for (var n = 0; n < e.length && 0 == e[n]; ) n++;
					this.num = new Array(e.length - n + t);
					for (var i = 0; i < e.length - n; i++)
						this.num[i] = e[i + n];
				}
				function u(e, t) {
					(this.totalCount = e), (this.dataCount = t);
				}
				function d() {
					(this.buffer = []), (this.length = 0);
				}
				(l.prototype = {
					get: function (e) {
						return this.num[e];
					},
					getLength: function () {
						return this.num.length;
					},
					multiply: function (e) {
						for (
							var t = new Array(
									this.getLength() + e.getLength() - 1
								),
								n = 0;
							n < this.getLength();
							n++
						)
							for (var i = 0; i < e.getLength(); i++)
								t[n + i] ^= s.gexp(
									s.glog(this.get(n)) + s.glog(e.get(i))
								);
						return new l(t, 0);
					},
					mod: function (e) {
						if (this.getLength() - e.getLength() < 0) return this;
						for (
							var t = s.glog(this.get(0)) - s.glog(e.get(0)),
								n = new Array(this.getLength()),
								i = 0;
							i < this.getLength();
							i++
						)
							n[i] = this.get(i);
						for (i = 0; i < e.getLength(); i++)
							n[i] ^= s.gexp(s.glog(e.get(i)) + t);
						return new l(n, 0).mod(e);
					},
				}),
					(u.RS_BLOCK_TABLE = [
						[1, 26, 19],
						[1, 26, 16],
						[1, 26, 13],
						[1, 26, 9],
						[1, 44, 34],
						[1, 44, 28],
						[1, 44, 22],
						[1, 44, 16],
						[1, 70, 55],
						[1, 70, 44],
						[2, 35, 17],
						[2, 35, 13],
						[1, 100, 80],
						[2, 50, 32],
						[2, 50, 24],
						[4, 25, 9],
						[1, 134, 108],
						[2, 67, 43],
						[2, 33, 15, 2, 34, 16],
						[2, 33, 11, 2, 34, 12],
						[2, 86, 68],
						[4, 43, 27],
						[4, 43, 19],
						[4, 43, 15],
						[2, 98, 78],
						[4, 49, 31],
						[2, 32, 14, 4, 33, 15],
						[4, 39, 13, 1, 40, 14],
						[2, 121, 97],
						[2, 60, 38, 2, 61, 39],
						[4, 40, 18, 2, 41, 19],
						[4, 40, 14, 2, 41, 15],
						[2, 146, 116],
						[3, 58, 36, 2, 59, 37],
						[4, 36, 16, 4, 37, 17],
						[4, 36, 12, 4, 37, 13],
						[2, 86, 68, 2, 87, 69],
						[4, 69, 43, 1, 70, 44],
						[6, 43, 19, 2, 44, 20],
						[6, 43, 15, 2, 44, 16],
						[4, 101, 81],
						[1, 80, 50, 4, 81, 51],
						[4, 50, 22, 4, 51, 23],
						[3, 36, 12, 8, 37, 13],
						[2, 116, 92, 2, 117, 93],
						[6, 58, 36, 2, 59, 37],
						[4, 46, 20, 6, 47, 21],
						[7, 42, 14, 4, 43, 15],
						[4, 133, 107],
						[8, 59, 37, 1, 60, 38],
						[8, 44, 20, 4, 45, 21],
						[12, 33, 11, 4, 34, 12],
						[3, 145, 115, 1, 146, 116],
						[4, 64, 40, 5, 65, 41],
						[11, 36, 16, 5, 37, 17],
						[11, 36, 12, 5, 37, 13],
						[5, 109, 87, 1, 110, 88],
						[5, 65, 41, 5, 66, 42],
						[5, 54, 24, 7, 55, 25],
						[11, 36, 12],
						[5, 122, 98, 1, 123, 99],
						[7, 73, 45, 3, 74, 46],
						[15, 43, 19, 2, 44, 20],
						[3, 45, 15, 13, 46, 16],
						[1, 135, 107, 5, 136, 108],
						[10, 74, 46, 1, 75, 47],
						[1, 50, 22, 15, 51, 23],
						[2, 42, 14, 17, 43, 15],
						[5, 150, 120, 1, 151, 121],
						[9, 69, 43, 4, 70, 44],
						[17, 50, 22, 1, 51, 23],
						[2, 42, 14, 19, 43, 15],
						[3, 141, 113, 4, 142, 114],
						[3, 70, 44, 11, 71, 45],
						[17, 47, 21, 4, 48, 22],
						[9, 39, 13, 16, 40, 14],
						[3, 135, 107, 5, 136, 108],
						[3, 67, 41, 13, 68, 42],
						[15, 54, 24, 5, 55, 25],
						[15, 43, 15, 10, 44, 16],
						[4, 144, 116, 4, 145, 117],
						[17, 68, 42],
						[17, 50, 22, 6, 51, 23],
						[19, 46, 16, 6, 47, 17],
						[2, 139, 111, 7, 140, 112],
						[17, 74, 46],
						[7, 54, 24, 16, 55, 25],
						[34, 37, 13],
						[4, 151, 121, 5, 152, 122],
						[4, 75, 47, 14, 76, 48],
						[11, 54, 24, 14, 55, 25],
						[16, 45, 15, 14, 46, 16],
						[6, 147, 117, 4, 148, 118],
						[6, 73, 45, 14, 74, 46],
						[11, 54, 24, 16, 55, 25],
						[30, 46, 16, 2, 47, 17],
						[8, 132, 106, 4, 133, 107],
						[8, 75, 47, 13, 76, 48],
						[7, 54, 24, 22, 55, 25],
						[22, 45, 15, 13, 46, 16],
						[10, 142, 114, 2, 143, 115],
						[19, 74, 46, 4, 75, 47],
						[28, 50, 22, 6, 51, 23],
						[33, 46, 16, 4, 47, 17],
						[8, 152, 122, 4, 153, 123],
						[22, 73, 45, 3, 74, 46],
						[8, 53, 23, 26, 54, 24],
						[12, 45, 15, 28, 46, 16],
						[3, 147, 117, 10, 148, 118],
						[3, 73, 45, 23, 74, 46],
						[4, 54, 24, 31, 55, 25],
						[11, 45, 15, 31, 46, 16],
						[7, 146, 116, 7, 147, 117],
						[21, 73, 45, 7, 74, 46],
						[1, 53, 23, 37, 54, 24],
						[19, 45, 15, 26, 46, 16],
						[5, 145, 115, 10, 146, 116],
						[19, 75, 47, 10, 76, 48],
						[15, 54, 24, 25, 55, 25],
						[23, 45, 15, 25, 46, 16],
						[13, 145, 115, 3, 146, 116],
						[2, 74, 46, 29, 75, 47],
						[42, 54, 24, 1, 55, 25],
						[23, 45, 15, 28, 46, 16],
						[17, 145, 115],
						[10, 74, 46, 23, 75, 47],
						[10, 54, 24, 35, 55, 25],
						[19, 45, 15, 35, 46, 16],
						[17, 145, 115, 1, 146, 116],
						[14, 74, 46, 21, 75, 47],
						[29, 54, 24, 19, 55, 25],
						[11, 45, 15, 46, 46, 16],
						[13, 145, 115, 6, 146, 116],
						[14, 74, 46, 23, 75, 47],
						[44, 54, 24, 7, 55, 25],
						[59, 46, 16, 1, 47, 17],
						[12, 151, 121, 7, 152, 122],
						[12, 75, 47, 26, 76, 48],
						[39, 54, 24, 14, 55, 25],
						[22, 45, 15, 41, 46, 16],
						[6, 151, 121, 14, 152, 122],
						[6, 75, 47, 34, 76, 48],
						[46, 54, 24, 10, 55, 25],
						[2, 45, 15, 64, 46, 16],
						[17, 152, 122, 4, 153, 123],
						[29, 74, 46, 14, 75, 47],
						[49, 54, 24, 10, 55, 25],
						[24, 45, 15, 46, 46, 16],
						[4, 152, 122, 18, 153, 123],
						[13, 74, 46, 32, 75, 47],
						[48, 54, 24, 14, 55, 25],
						[42, 45, 15, 32, 46, 16],
						[20, 147, 117, 4, 148, 118],
						[40, 75, 47, 7, 76, 48],
						[43, 54, 24, 22, 55, 25],
						[10, 45, 15, 67, 46, 16],
						[19, 148, 118, 6, 149, 119],
						[18, 75, 47, 31, 76, 48],
						[34, 54, 24, 34, 55, 25],
						[20, 45, 15, 61, 46, 16],
					]),
					(u.getRSBlocks = function (e, t) {
						var n = u.getRsBlockTable(e, t);
						if (null == n)
							throw new Error(
								"bad rs block @ typeNumber:" +
									e +
									"/errorCorrectLevel:" +
									t
							);
						for (var i = n.length / 3, o = [], r = 0; r < i; r++)
							for (
								var a = n[3 * r + 0],
									s = n[3 * r + 1],
									c = n[3 * r + 2],
									l = 0;
								l < a;
								l++
							)
								o.push(new u(s, c));
						return o;
					}),
					(u.getRsBlockTable = function (e, t) {
						switch (t) {
							case o.L:
								return u.RS_BLOCK_TABLE[4 * (e - 1) + 0];
							case o.M:
								return u.RS_BLOCK_TABLE[4 * (e - 1) + 1];
							case o.Q:
								return u.RS_BLOCK_TABLE[4 * (e - 1) + 2];
							case o.H:
								return u.RS_BLOCK_TABLE[4 * (e - 1) + 3];
							default:
								return;
						}
					}),
					(d.prototype = {
						get: function (e) {
							var t = Math.floor(e / 8);
							return (
								1 == ((this.buffer[t] >>> (7 - (e % 8))) & 1)
							);
						},
						put: function (e, t) {
							for (var n = 0; n < t; n++)
								this.putBit(1 == ((e >>> (t - n - 1)) & 1));
						},
						getLengthInBits: function () {
							return this.length;
						},
						putBit: function (e) {
							var t = Math.floor(this.length / 8);
							this.buffer.length <= t && this.buffer.push(0),
								e &&
									(this.buffer[t] |= 128 >>> this.length % 8),
								this.length++;
						},
					});
				var h = [
					[17, 14, 11, 7],
					[32, 26, 20, 14],
					[53, 42, 32, 24],
					[78, 62, 46, 34],
					[106, 84, 60, 44],
					[134, 106, 74, 58],
					[154, 122, 86, 64],
					[192, 152, 108, 84],
					[230, 180, 130, 98],
					[271, 213, 151, 119],
					[321, 251, 177, 137],
					[367, 287, 203, 155],
					[425, 331, 241, 177],
					[458, 362, 258, 194],
					[520, 412, 292, 220],
					[586, 450, 322, 250],
					[644, 504, 364, 280],
					[718, 560, 394, 310],
					[792, 624, 442, 338],
					[858, 666, 482, 382],
					[929, 711, 509, 403],
					[1003, 779, 565, 439],
					[1091, 857, 611, 461],
					[1171, 911, 661, 511],
					[1273, 997, 715, 535],
					[1367, 1059, 751, 593],
					[1465, 1125, 805, 625],
					[1528, 1190, 868, 658],
					[1628, 1264, 908, 698],
					[1732, 1370, 982, 742],
					[1840, 1452, 1030, 790],
					[1952, 1538, 1112, 842],
					[2068, 1628, 1168, 898],
					[2188, 1722, 1228, 958],
					[2303, 1809, 1283, 983],
					[2431, 1911, 1351, 1051],
					[2563, 1989, 1423, 1093],
					[2699, 2099, 1499, 1139],
					[2809, 2213, 1579, 1219],
					[2953, 2331, 1663, 1273],
				];
				function p() {
					return "undefined" != typeof CanvasRenderingContext2D;
				}
				function g() {
					var e = !1,
						t = navigator.userAgent;
					if (/android/i.test(t)) {
						e = !0;
						var n = t.toString().match(/android ([0-9]\.[0-9])/i);
						n && n[1] && (e = parseFloat(n[1]));
					}
					return e;
				}
				var f = (function () {
						var e = function (e, t) {
							(this._el = e), (this._htOption = t);
						};
						return (
							(e.prototype.draw = function (e) {
								var t = this._htOption,
									n = this._el,
									i = e.getModuleCount();
								function o(e, t) {
									var n = document.createElementNS(
										"http://www.w3.org/2000/svg",
										e
									);
									for (var i in t)
										t.hasOwnProperty(i) &&
											n.setAttribute(i, t[i]);
									return n;
								}
								Math.floor(t.width / i),
									Math.floor(t.height / i),
									this.clear();
								var r = o("svg", {
									viewBox:
										"0 0 " + String(i) + " " + String(i),
									width: "100%",
									height: "100%",
									fill: t.colorLight,
								});
								r.setAttributeNS(
									"http://www.w3.org/2000/xmlns/",
									"xmlns:xlink",
									"http://www.w3.org/1999/xlink"
								),
									n.appendChild(r),
									r.appendChild(
										o("rect", {
											fill: t.colorLight,
											width: "100%",
											height: "100%",
										})
									),
									r.appendChild(
										o("rect", {
											fill: t.colorDark,
											width: "1",
											height: "1",
											id: "template",
										})
									);
								for (var a = 0; a < i; a++)
									for (var s = 0; s < i; s++)
										if (e.isDark(a, s)) {
											var c = o("use", {
												x: String(s),
												y: String(a),
											});
											c.setAttributeNS(
												"http://www.w3.org/1999/xlink",
												"href",
												"#template"
											),
												r.appendChild(c);
										}
							}),
							(e.prototype.clear = function () {
								for (; this._el.hasChildNodes(); )
									this._el.removeChild(this._el.lastChild);
							}),
							e
						);
					})(),
					_ =
						"svg" === document.documentElement.tagName.toLowerCase()
							? f
							: p()
							? (function () {
									function e() {
										(this._elImage.src =
											this._elCanvas.toDataURL(
												"image/png"
											)),
											(this._elImage.style.display =
												"block"),
											(this._elCanvas.style.display =
												"none");
									}
									if (this._android && this._android <= 2.1) {
										var t = 1 / window.devicePixelRatio,
											n =
												CanvasRenderingContext2D
													.prototype.drawImage;
										CanvasRenderingContext2D.prototype.drawImage =
											function (
												e,
												i,
												o,
												r,
												a,
												s,
												c,
												l,
												u
											) {
												if (
													"nodeName" in e &&
													/img/i.test(e.nodeName)
												)
													for (
														var d =
															arguments.length -
															1;
														d >= 1;
														d--
													)
														arguments[d] =
															arguments[d] * t;
												else
													void 0 === l &&
														((arguments[1] *= t),
														(arguments[2] *= t),
														(arguments[3] *= t),
														(arguments[4] *= t));
												n.apply(this, arguments);
											};
									}
									function i(e, t) {
										var n = this;
										if (
											((n._fFail = t),
											(n._fSuccess = e),
											null === n._bSupportDataURI)
										) {
											var i =
													document.createElement(
														"img"
													),
												o = function () {
													(n._bSupportDataURI = !1),
														n._fFail &&
															n._fFail.call(n);
												},
												r = function () {
													(n._bSupportDataURI = !0),
														n._fSuccess &&
															n._fSuccess.call(n);
												};
											return (
												(i.onabort = o),
												(i.onerror = o),
												(i.onload = r),
												void (i.src =
													"data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==")
											);
										}
										!0 === n._bSupportDataURI && n._fSuccess
											? n._fSuccess.call(n)
											: !1 === n._bSupportDataURI &&
											  n._fFail &&
											  n._fFail.call(n);
									}
									var o = function (e, t) {
										(this._bIsPainted = !1),
											(this._android = g()),
											(this._htOption = t),
											(this._elCanvas =
												document.createElement(
													"canvas"
												)),
											(this._elCanvas.width = t.width),
											(this._elCanvas.height = t.height),
											e.appendChild(this._elCanvas),
											(this._el = e),
											(this._oContext =
												this._elCanvas.getContext(
													"2d"
												)),
											(this._bIsPainted = !1),
											(this._elImage =
												document.createElement("img")),
											(this._elImage.alt = "Scan me!"),
											(this._elImage.style.display =
												"none"),
											this._el.appendChild(this._elImage),
											(this._bSupportDataURI = null);
									};
									return (
										(o.prototype.draw = function (e) {
											var t = this._elImage,
												n = this._oContext,
												i = this._htOption,
												o = e.getModuleCount(),
												r = i.width / o,
												a = i.height / o,
												s = Math.round(r),
												c = Math.round(a);
											(t.style.display = "none"),
												this.clear();
											for (var l = 0; l < o; l++)
												for (var u = 0; u < o; u++) {
													var d = e.isDark(l, u),
														h = u * r,
														p = l * a;
													(n.strokeStyle = d
														? i.colorDark
														: i.colorLight),
														(n.lineWidth = 1),
														(n.fillStyle = d
															? i.colorDark
															: i.colorLight),
														n.fillRect(h, p, r, a),
														n.strokeRect(
															Math.floor(h) + 0.5,
															Math.floor(p) + 0.5,
															s,
															c
														),
														n.strokeRect(
															Math.ceil(h) - 0.5,
															Math.ceil(p) - 0.5,
															s,
															c
														);
												}
											this._bIsPainted = !0;
										}),
										(o.prototype.makeImage = function () {
											this._bIsPainted && i.call(this, e);
										}),
										(o.prototype.isPainted = function () {
											return this._bIsPainted;
										}),
										(o.prototype.clear = function () {
											this._oContext.clearRect(
												0,
												0,
												this._elCanvas.width,
												this._elCanvas.height
											),
												(this._bIsPainted = !1);
										}),
										(o.prototype.round = function (e) {
											return e
												? Math.floor(1e3 * e) / 1e3
												: e;
										}),
										o
									);
							  })()
							: (function () {
									var e = function (e, t) {
										(this._el = e), (this._htOption = t);
									};
									return (
										(e.prototype.draw = function (e) {
											for (
												var t = this._htOption,
													n = this._el,
													i = e.getModuleCount(),
													o = Math.floor(t.width / i),
													r = Math.floor(
														t.height / i
													),
													a = [
														'<table style="border:0;border-collapse:collapse;">',
													],
													s = 0;
												s < i;
												s++
											) {
												a.push("<tr>");
												for (var c = 0; c < i; c++)
													a.push(
														'<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
															o +
															"px;height:" +
															r +
															"px;background-color:" +
															(e.isDark(s, c)
																? t.colorDark
																: t.colorLight) +
															';"></td>'
													);
												a.push("</tr>");
											}
											a.push("</table>"),
												(n.innerHTML = a.join(""));
											var l = n.childNodes[0],
												u =
													(t.width - l.offsetWidth) /
													2,
												d =
													(t.height -
														l.offsetHeight) /
													2;
											u > 0 &&
												d > 0 &&
												(l.style.margin =
													d + "px " + u + "px");
										}),
										(e.prototype.clear = function () {
											this._el.innerHTML = "";
										}),
										e
									);
							  })();
				function m(e, t) {
					for (
						var n = 1, i = C(e), r = 0, a = h.length;
						r <= a;
						r++
					) {
						var s = 0;
						switch (t) {
							case o.L:
								s = h[r][0];
								break;
							case o.M:
								s = h[r][1];
								break;
							case o.Q:
								s = h[r][2];
								break;
							case o.H:
								s = h[r][3];
						}
						if (i <= s) break;
						n++;
					}
					if (n > h.length) throw new Error("Too long data");
					return n;
				}
				function C(e) {
					var t = encodeURI(e)
						.toString()
						.replace(/\%[0-9a-fA-F]{2}/g, "a");
					return t.length + (t.length != e ? 3 : 0);
				}
				return (
					((t = function (e, t) {
						if (
							((this._htOption = {
								width: 256,
								height: 256,
								typeNumber: 4,
								colorDark: "#000000",
								colorLight: "#ffffff",
								correctLevel: o.H,
							}),
							"string" == typeof t && (t = { text: t }),
							t)
						)
							for (var n in t) this._htOption[n] = t[n];
						"string" == typeof e &&
							(e = document.getElementById(e)),
							this._htOption.useSVG && (_ = f),
							(this._android = g()),
							(this._el = e),
							(this._oQRCode = null),
							(this._oDrawing = new _(this._el, this._htOption)),
							this._htOption.text &&
								this.makeCode(this._htOption.text);
					}).prototype.makeCode = function (e) {
						(this._oQRCode = new n(
							m(e, this._htOption.correctLevel),
							this._htOption.correctLevel
						)),
							this._oQRCode.addData(e),
							this._oQRCode.make(),
							(this._el.title = e),
							this._oDrawing.draw(this._oQRCode),
							this.makeImage();
					}),
					(t.prototype.makeImage = function () {
						"function" == typeof this._oDrawing.makeImage &&
							(!this._android || this._android >= 3) &&
							this._oDrawing.makeImage();
					}),
					(t.prototype.clear = function () {
						this._oDrawing.clear();
					}),
					(t.CorrectLevel = o),
					t
				);
			})();
		},
		74840: function (e, t, n) {
			"use strict";
			var i = n(23242),
				o = n.n(i),
				r = n(87240),
				a = n.n(r),
				s = new (o())({
					id: "icon-check-box-filled",
					use: "icon-check-box-filled-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol viewBox="0 0 24 24" id="icon-check-box-filled"><mask id="icon-check-box-filled_path-1-inside-1_2148_827"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0723 1.80006C6.81551 1.80817 1.80732 6.17231 1.79994 11.9509C1.79256 17.7295 5.89743 22.2 11.9157 22.2C17.9339 22.2 22.1999 18.3043 22.1999 11.9509C22.1999 5.59752 17.329 1.79196 12.0723 1.80006ZM12.7507 10.6552C11.9242 11.4817 11.3321 12.1854 10.9228 12.7894C10.7373 12.5155 10.4958 12.226 10.1891 11.9193L9.35303 11.0832C8.82946 10.5596 7.98058 10.5596 7.457 11.0832C6.93343 11.6068 6.93343 12.4557 7.457 12.9792L10.1583 15.6806C10.2852 15.8075 10.4633 15.8557 10.6226 15.8186C10.796 15.861 10.9991 15.8029 11.1423 15.6596L16.5843 10.2177C17.0532 9.74875 17.0532 8.98852 16.5843 8.51962C16.1154 8.05073 15.3551 8.05072 14.8862 8.51962L12.7507 10.6552Z" /></mask><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0723 1.80006C6.81551 1.80817 1.80732 6.17231 1.79994 11.9509C1.79256 17.7295 5.89743 22.2 11.9157 22.2C17.9339 22.2 22.1999 18.3043 22.1999 11.9509C22.1999 5.59752 17.329 1.79196 12.0723 1.80006ZM12.7507 10.6552C11.9242 11.4817 11.3321 12.1854 10.9228 12.7894C10.7373 12.5155 10.4958 12.226 10.1891 11.9193L9.35303 11.0832C8.82946 10.5596 7.98058 10.5596 7.457 11.0832C6.93343 11.6068 6.93343 12.4557 7.457 12.9792L10.1583 15.6806C10.2852 15.8075 10.4633 15.8557 10.6226 15.8186C10.796 15.861 10.9991 15.8029 11.1423 15.6596L16.5843 10.2177C17.0532 9.74875 17.0532 8.98852 16.5843 8.51962C16.1154 8.05073 15.3551 8.05072 14.8862 8.51962L12.7507 10.6552Z" /><path d="M1.79994 11.9509L-0.200062 11.9484L1.79994 11.9509ZM12.0723 1.80006L12.0754 3.80006L12.0723 1.80006ZM22.1999 11.9509L20.1999 11.9509L22.1999 11.9509ZM10.9228 12.7894L9.26688 13.911C9.63892 14.4602 10.2591 14.7893 10.9226 14.7894C11.586 14.7895 12.2063 14.4606 12.5784 13.9114L10.9228 12.7894ZM10.1891 11.9193L8.77494 13.3336L8.77494 13.3336L10.1891 11.9193ZM9.35303 11.0832L7.93882 12.4974L7.93882 12.4974L9.35303 11.0832ZM7.457 11.0832L6.04279 9.66901L6.04279 9.66901L7.457 11.0832ZM7.457 12.9792L6.04278 14.3935H6.04278L7.457 12.9792ZM10.1583 15.6806L8.74411 17.0948L8.74411 17.0948L10.1583 15.6806ZM10.6226 15.8186L11.097 13.8757C10.7924 13.8013 10.4746 13.7996 10.1693 13.8707L10.6226 15.8186ZM11.1423 15.6596L12.5565 17.0738L12.5565 17.0738L11.1423 15.6596ZM16.5843 10.2177L17.9985 11.6319V11.6319L16.5843 10.2177ZM16.5843 8.51962L15.17 9.93384L15.17 9.93384L16.5843 8.51962ZM14.8862 8.51962L16.3004 9.93384L16.3004 9.93384L14.8862 8.51962ZM3.79994 11.9535C3.80578 7.3732 7.82247 3.80662 12.0754 3.80006L12.0692 -0.199936C5.80854 -0.190281 -0.191153 4.97143 -0.200062 11.9484L3.79994 11.9535ZM11.9157 20.2C7.06513 20.2 3.79389 16.6897 3.79994 11.9535L-0.200062 11.9484C-0.208772 18.7693 4.72972 24.2 11.9157 24.2V20.2ZM20.1999 11.9509C20.1999 14.6643 19.3001 16.6828 17.9205 18.0239C16.5325 19.3733 14.4901 20.2 11.9157 20.2V24.2C15.3594 24.2 18.4592 23.0789 20.7087 20.892C22.9667 18.697 24.1999 15.591 24.1999 11.9509L20.1999 11.9509ZM12.0754 3.80006C16.3615 3.79345 20.1999 6.8338 20.1999 11.9509L24.1999 11.9509C24.1999 4.36123 18.2965 -0.209539 12.0692 -0.199936L12.0754 3.80006ZM12.5784 13.9114C12.8952 13.444 13.396 12.8383 14.1649 12.0694L11.3365 9.24094C10.4523 10.1251 9.76896 10.9269 9.26715 11.6674L12.5784 13.9114ZM8.77494 13.3336C9.00945 13.5681 9.16515 13.7608 9.26688 13.911L12.5787 11.6678C12.3094 11.2702 11.9821 10.8838 11.6034 10.5051L8.77494 13.3336ZM7.93882 12.4974L8.77494 13.3336L11.6034 10.5051L10.7672 9.66901L7.93882 12.4974ZM8.87121 12.4974C8.61374 12.7549 8.19629 12.7549 7.93882 12.4974L10.7672 9.66901C9.46262 8.36439 7.34741 8.36439 6.04279 9.66901L8.87121 12.4974ZM8.87122 11.565C9.12869 11.8225 9.12869 12.24 8.87122 12.4974L6.04279 9.66901C4.73817 10.9736 4.73817 13.0888 6.04278 14.3935L8.87122 11.565ZM11.5726 14.2664L8.87122 11.565L6.04278 14.3935L8.74411 17.0948L11.5726 14.2664ZM10.1693 13.8707C10.6942 13.7485 11.2191 13.913 11.5725 14.2664L8.74411 17.0948C9.35131 17.702 10.2325 17.9628 11.0759 17.7666L10.1693 13.8707ZM9.7281 14.2454C10.0373 13.9362 10.5366 13.7389 11.097 13.8757L10.1481 17.7615C11.0554 17.9831 11.9608 17.6695 12.5565 17.0738L9.7281 14.2454ZM15.17 8.80344L9.7281 14.2454L12.5565 17.0738L17.9985 11.6319L15.17 8.80344ZM15.17 9.93384C14.8579 9.62169 14.8579 9.11559 15.17 8.80344L17.9985 11.6319C19.2484 10.3819 19.2484 8.35535 17.9985 7.10541L15.17 9.93384ZM16.3004 9.93384C15.9883 10.246 15.4822 10.246 15.17 9.93384L17.9985 7.10541C16.7485 5.85547 14.722 5.85546 13.472 7.10541L16.3004 9.93384ZM14.1649 12.0694L16.3004 9.93384L13.472 7.10541L11.3365 9.24094L14.1649 12.0694Z" mask="url(#icon-check-box-filled_path-1-inside-1_2148_827)" /></symbol>',
				});
			a().add(s);
		},
		39879: function (e, t, n) {
			"use strict";
			var i = n(23242),
				o = n.n(i),
				r = n(87240),
				a = n.n(r),
				s = new (o())({
					id: "icon-check-box",
					use: "icon-check-box-usage",
					viewBox: "0 0 24 24",
					content:
						'<symbol viewBox="0 0 24 24" id="icon-check-box"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 4.32869C7.76324 4.32869 4.32863 7.7633 4.32863 12.0001C4.32863 16.2369 7.76324 19.6715 12.0001 19.6715C16.2369 19.6715 19.6715 16.2369 19.6715 12.0001C19.6715 7.7633 16.2369 4.32869 12.0001 4.32869ZM2.52863 12.0001C2.52863 6.76919 6.76913 2.52869 12.0001 2.52869C17.231 2.52869 21.4715 6.76919 21.4715 12.0001C21.4715 17.231 17.231 21.4715 12.0001 21.4715C6.76913 21.4715 2.52863 17.231 2.52863 12.0001Z" /></symbol>',
				});
			a().add(s);
		},
		18853: function (e, t, n) {
			"use strict";
			e.exports = n.p + "static/img/password.fb362221..svg";
		},
		29030: function (e, t, n) {
			"use strict";
			e.exports = n.p + "static/img/qrcode.3cafed24..svg";
		},
		6788: function (e, t, n) {
			"use strict";
			e.exports = n.p + "static/img/refresh.d3584d66..svg";
		},
	},
]);
