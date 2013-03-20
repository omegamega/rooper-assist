loadTragedySet = function(name){	
	switch(name){
		case "MysteryCircle":
			Set_MysteryCircle.load();
			break;
		case "HauntedStage":
			Set_HauntedStage.load();
			break;
		default:
			Set_BasicTragedy.load();
			break;
	};
	
	// 惨劇セットで共通ものを追加
	roles.unshift(
			{
				name		: "-",
				alias		: "",
				skill		: [],
			},
			{
				name 		: "パーソン",
				alias		: "person",
				skill		: [],
			}
	);
	rule_x.unshift(
			{
				name		: "-" , 
				alias		: "",
				additional	: [] ,
				roles		: {},
			}
	);
	accidents.unshift(	
			{
				name	: "-",
				alias	: "",
				effect	: [],
			}
	);
	
	// 逆引きを作る
	roles_reverse = [];
	for(var i in roles) {
		roles_reverse[roles[i].alias] = i;
	}
	
	rule_x_reverse = [];
	for(var i in rule_x) {
		rule_x_reverse[rule_x[i].alias] = i;
	}
	
	rule_y_reverse = [];
	for(var i in rule_y) {
		rule_y_reverse[rule_y[i].alias] = i;
	}
	
	accidents_reverse = [];
	for(var i in accidents) {
		accidents_reverse[accidents[i].alias] = i;
	}
};