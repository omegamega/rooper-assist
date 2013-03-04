var npcs = [
	{
		name	: "男子学生",
		anxiety	: 2,
		type	: "学生",
		gender	: "少年",
	},
	{
		name	: "女子学生",
		anxiety	: 3,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "お嬢様",
		anxiety	: 1,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "巫女",
		anxiety	: 2,
		type	: "学生",
		gender	: "少女",
	},
	{
		name	: "刑事",
		anxiety	: 3,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "サラリーマン",
		anxiety	: 2,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "情報屋",
		anxiety	: 3,
		type	: "大人",
		gender	: "女性",
	},
	{
		name	: "医者",
		anxiety	: 2,
		type	: "大人",
		gender	: "男性",
	},
	{
		name	: "入院患者",
		anxiety	: 2,
		type	: "",
		gender	: "少年",
	},
];

(function(){
	npcs_reverse = {};
	for(var i in npcs) {
		npcs_reverse[npcs[i].name] = i;
	}
})();