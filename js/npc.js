var npcs = {
	boy		: {
		name	: "男子学生",
		alias	: "b",
		anxiety	: 2,
	},
	girl		: {
		name	: "女子学生",
		alias	: "g",
		anxiety	: 3,
	},
	daughter		: {
		name	: "お嬢様",
		alias	: "a",
		anxiety	: 1,
	},
	miko		: {
		name	: "巫女",
		alias	: "mi",
		anxiety	: 2,
	},
	detective	: {
		name	: "刑事",
		alias	: "v",
		anxiety	: 3,
	},
	salaryman	: {
		name	: "サラリーマン",
		alias	: "d",
		anxiety	: 2,
	},
	informer	: {
		name	: "情報屋",
		alias	: "i",
		anxiety	: 3,
	},
	doctor		: {
		name	: "医者",
		alias	: "d",
		anxiety	: 2,
	},
	patient		: {
		name	: "入院患者",
		alias	: "p",
		anxiety	: 2,
	},
};

(function() {
	npcs_reverse = [];
	for(var i in npcs) {
		npcs_reverse[npcs[i].alias] = i;
	}
})();
