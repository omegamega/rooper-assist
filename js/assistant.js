replaceAll = function(expression, org, dest) {  
	return expression.split(org).join(dest);  
}  

decorateSkill = function(skills) {
	var t = '';
	if(skills.length > 0){
		for(var i=0;i<skills.length;i++) {
			var s = skills[i];
			var tx = s.text;
			tx = replaceAll(tx,"【","<span class=\"skill_" + s.timing +"\">【");
			tx = replaceAll(tx,"】","】</span>");
			tx = replaceAll(tx,"[暗躍C]","<span class=\"bad_counter\">[暗躍C]</span>");
			tx = replaceAll(tx,"[不安C]","<span class=\"anxiety_counter\">[不安C]</span>");
			tx = replaceAll(tx,"[友好C]","<span class=\"fav_counter\">[不安C]</span>");

			t += "<p>" + tx + "</p>";
		}
	}else{
		t = '<span class="gray">-</span>';
	}
	return t;
}

createUrlWithParam = function(url,param) {
	var results = [];
	for(var i in param) {
		results.push(encodeURI(i) + "=" + encodeURI(param[i]));
	}
	return url + '?' + implode('&' , results);
}

implode = function(glue, val) {
	var result = '';
	for(var i=0;i<val.length;i++) {
		if(result == '') {
			result = val[i];
		}else{
			result += glue + val[i];
		}
	}
	return result;
}

// 役職の人数チェックをする
updateRoleCount = function(){
	// ルールX,Yから役職人数を算出
role_number = {};
	for(var i in roles) {
		role_number[roles[i].alias] = 0;
	}
	
	function getRoleNum(rules,rule,role) {
		return (rules[rule].roles[role] != undefined) ? rules[rule].roles[role] : 0;
	}
	for(var i in roles) {
		role_number[roles[i].alias] +=
			getRoleNum(rule_y, $('.rule_y_selector').val() ,roles[i].alias)
			+ getRoleNum(rule_x, $('.rule_x1_selector').val() ,roles[i].alias)
			+ getRoleNum(rule_x, $('.rule_x2_selector').val() ,roles[i].alias);
	}
	
	// TODO:上限付き役職チェック
	
	// 役職テーブルの状態を見て、過不足を算出する
	for(var i in npcs) {
		role_number[roles[$('select.role_selector.role_' + i).val()].alias]--;
	}
	var notices = [];
	
	if($('.rule_x1_selector').val() == $('.rule_x2_selector').val()) {
		notices.push("<span class=\"red\">ルールX1とX2が重複</span>");
	}
	for(var i in role_number) {
		if(i == 'person') continue;
		
		if(role_number[i] > 0) {
			notices.push("<span class=\"red\">" + roles[roles_reverse[i]].name + "</span>" + role_number[i] + "人不足");
		}
		if(role_number[i] < 0) {
			notices.push("<span class=\"blue\">" + roles[roles_reverse[i]].name + "</span>" + (-role_number[i]) + "人過剰");
		}
	}
	
	// 事件チェック
	for(var i=1;i<=$('.day_selector').val();i++) {
		var iac = $('.accident_selector.day_' + i).val();
		var iacs = $('.accident_criminal_selector.day_' + i).val();
		if(iac == undefined || accidents[iac].effect.length == 0) continue;
		
		for(var j=i+1;j<=$('.day_selector').val();j++) {
			var jac = $('.accident_selector.day_' + j).val();
			var jacs = $('.accident_criminal_selector.day_' + j).val();
			if(jac == undefined || accidents[jac].effect.length == 0) continue;
			
			if(iacs == jacs) {
				notices.push("<span class=\"red\">" + i + "日目と" + j + "日目の犯人が重複</span>");
			}
		}
	}
	
	if(notices.length == 0) {
		notices = ['準備完了'];
	}
	$('#role_notice > tbody > tr').remove();
	for(var i=0;i<notices.length;i++) {
		$('#role_notice > tbody').append('<tr><td>' + notices[i] + '</td></tr>');
	}
}

// 役職テーブルのスキル欄を更新する
updateRoleSkill = function() {
	for(var i in npcs) {
		$('.role_skill.role_' + i).html(decorateSkill(roles[$('.role_selector.role_' + i).val()].skill));
	};
}

// 役職テーブルの準備
createRoleTable = function() {
	$('#role_table > tbody > tr').remove();
	var j = 0;
	for(var i in npcs) {
		var line = '<tr class="' + ['even','odd'][(j++) % 2] + '">'
			+ '<td>' + npcs[i].name + '</td>'
			+ '<td><select class="role_selector role_' + i + '"></select></td>'
			+ '<td><span class="role_skill role_' + i + '"></span></td>'
			+ '</tr>';
		$('#role_table > tbody').append(line);
	}
	for(var i in roles) {
		$('.role_selector').append('<option value=' + i + ' class="role_' + i +'">' + roles[i].name + '</option>');
	}
	
	$('.role_selector').change(updateRoleSkill).change();
	$('.role_selector').change(updateRoleCount).change();
}

// 事件効果を更新する
updateAccidentEffect = function() {
	for(var i=1;i <= $('.day_selector').val();i++) {
		$('.accident_effect.day_' + i).html(decorateSkill(accidents[$('.accident_selector.day_' + i).val()].effect));
		if(accidents[$('.accident_selector.day_' + i).val()].effect.length == 0) {
			$('.accident_criminal_selector.day_' + i).hide();
		}else{
			$('.accident_criminal_selector.day_' + i).show();
		}
	};
}

// 事件テーブルの準備
updateAccidentTable = function() {
	$('#accident_table > tbody > tr').remove();
	for(var i=1;i <= $('.day_selector').val();i++) {
		var line = '<tr class="' + ['even','odd'][i % 2] + '">'
			+ '<td>' + i + '</td>'
			+ '<td><select class="accident_selector day_' + i + '"></select></td>'
			+ '<td><select class="accident_criminal_selector day_' + i +'"></select></td>'
			+ '<td><span class="accident_effect day_' + i + '"></span></td>'
			+ '</tr>';
		$('#accident_table > tbody').append(line);
	}
	
	for(var i in npcs) {
		$('.accident_criminal_selector').append('<option value=' + i + '>' + npcs[i].name + '《' + npcs[i].anxiety + '》</option>');
	}
	
	for(var i in accidents) {
		$('.accident_selector').append('<option value=' + i + '>' + accidents[i].name + '</option>');
	}
	$('.accident_selector').change(updateAccidentEffect).change();
	$('.accident_selector, .accident_criminal_selector').change(function(){
		updateRoleCount();
		encodeSenarioToUrl();
	}).change();
}

updateRuleAdditional = function() {
	$('.rule_y_additional').html(decorateSkill(rule_y[$('.rule_y_selector').val()].additional));
	$('.rule_x1_additional').html(decorateSkill(rule_x[$('.rule_x1_selector').val()].additional));
	$('.rule_x2_additional').html(decorateSkill(rule_x[$('.rule_x2_selector').val()].additional));
}

var CRIMINAL_SEPARATOR = ":";
var GLOBAL_SEPARATOR = "_";
decodeUrlParam = function() {
	var str = location.search.split("?");
	if(str.length < 2) {
		return null;
	}
	
	var params = str[1].split("&");
	var result = {};
	var nodata = true;
	for (var i = 0; i < params.length; i++) {
		var v = params[i].split("=");
		if(v.length < 2) {
			result[decodeURI(v[0])] = "";
			nodata = false;
		}else{
			result[decodeURI(v[0])] = decodeURI(v[1]);
			nodata = false;
		}
	}
	if(nodata) {
		return null;
	}else{
		return result;
	}
}

encodeSenarioToUrl = function() {
	var str = location.search.split("?");
	var param = {
		senario : $('input#senario_name').val(),
		loop	: $('select.loop_selector').val(),
		day		: $('select.day_selector').val(),
		rule_y	: $('select.rule_y_selector').val(),
		rule_x1	: $('select.rule_x1_selector').val(),
		rule_x2 : $('select.rule_x2_selector').val(),
	};
	
	var param_roles = [],param_accidents = [];
	for(var i in npcs) {
		param_roles.push($('select.role_selector.role_' + i).val());
	}
	for(var i=1;i<=$('select.day_selector').val();i++) {
		param_accidents.push($('select.accident_selector.day_'+i).val()
			+ CRIMINAL_SEPARATOR + $('select.accident_criminal_selector.day_'+i).val());
	}
	
	param["roles"] = implode(GLOBAL_SEPARATOR, param_roles);
	param["accidents"] = implode(GLOBAL_SEPARATOR, param_accidents);
	
	$('#assist_url').val(createUrlWithParam(location.href.split("?")[0] , param));
}
	
var init = function() {
	// ループ回数
	for(var i=1;i<9;i++) {
		$('.loop_selector,.day_selector').append('<option value=' + i + '>' + i + '</option>');
	}
	
	// ルールY
	for(var i=0;i<rule_y.length;i++) {
		var r = rule_y[i];
		$('.rule_y_selector').append('<option value=' + i + '>' + r.name + '</option>');
	}
	
	// ルールX
	for(var i=0;i<rule_x.length;i++) {
		var r = rule_x[i];
		$('.rule_x1_selector,.rule_x2_selector').append('<option value=' + i + '>' + r.name + '</option>');
	}
	
	createRoleTable();
	$('.day_selector').change(updateAccidentTable).change();
	$('.rule_y_selector,.rule_x1_selector,.rule_x2_selector').change(updateRuleAdditional).change();
	$('.rule_y_selector,.rule_x1_selector,.rule_x2_selector').change(updateRoleCount).change();
	
	$('input#senario_name').change(encodeSenarioToUrl);
	
	// ルールフォーカス処理
	$('.focus_button').click(function(){
		$('span.skill_writer, span.skill_turnend, span.skill_terminator').removeClass('skill_focused');
		$('span.skill_' + $(this).val()).addClass('skill_focused');
	});
	
	// 編集/完了
	$('#edit_button').click(function() {
		$('.play_mode').hide();
		$('.edit_mode').show();
		$('select, #senario_name').attr('disabled',null);
	}).click();

	$('#complete_button').click(function(){		
		$('.play_mode').show();
		$('.edit_mode').hide();
		$('select, #senario_name').attr('disabled','1');
	});
	
	$('.loop_selector, .day_selector, .rule_y_selector, .rule_x1_selector, .rule_x2_selector'
	 + ', .role_selector, .accident_selector, .accident_criminal_selector').change(encodeSenarioToUrl);
	
	// URLパラムを読む
	var data = decodeUrlParam();
	if(data != null) {
		// シナリオデータっぽいなら復元する
		$('select.loop_selector').val(data['loop']).change();
		$('select.day_selector').val(data['day']).change();
		$('select.rule_y_selector').val(data['rule_y']).change();
		$('select.rule_x1_selector').val(data['rule_x1']).change();
		$('select.rule_x2_selector').val(data['rule_x2']).change();
		$('input#senario_name').val(data['senario']);
		
		var param_roles = String(data['roles']).split(GLOBAL_SEPARATOR);
		var param_accidents = String(data['accidents']).split(GLOBAL_SEPARATOR);
		for(var i=0;i<param_roles.length;i++) {
			$('select.role_selector.role_' + i).val(param_roles[i]).change();
		}
		for(var i=1;i<=param_accidents.length;i++) {
			var v = param_accidents[i-1].split(CRIMINAL_SEPARATOR);
			$('select.accident_selector.day_' + i).val(v[0]).change();
			$('select.accident_criminal_selector.day_' + i).val(v[1]).change();
		}
	}else{
		$('.loop_selector').val(4);
		$('.day_selector').val(7).change();
	}
}
