var npcs = [
	{
		name	: "男子学生",
		alias	: "boy",
		anxiety	: 2,
		type	: "学生",
		gender	: "少年",
	},
	{
		name	: "女子学生",
		alias	: "girl",
		anxiety	: 3,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "お嬢様",
		alias	: "daughter",
		anxiety	: 1,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "巫女",
		alias	: "miko",
		anxiety	: 2,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "刑事",
		alias	: "detective",
		anxiety	: 3,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "サラリーマン",
		alias	: "salaryman",
		anxiety	: 2,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "情報屋",
		alias	: "informer",
		anxiety	: 3,
		type	: "大人",
		gender	: "女性",
	},
	{
		name	: "医者",
		alias	: "doctor",
		anxiety	: 2,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "入院患者",
		alias	: "patient",
		anxiety	: 2,
		type	: "",
		gender	: "少年",
	},
];

(function(){
	npcs_reverse = {};
	for(var i in npcs) {
		npcs_reverse[npcs[i].alias] = i;
	}
})();