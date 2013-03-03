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
	var role_number = {};
	for(var i in roles) {
		role_number[i] = 0;
	}
	
	function getRoleNum(rules,rule,role) {
		return (rules[rule].roles[role] != undefined) ? rules[rule].roles[role] : 0;
	}
	for(var i in roles) {
		role_number[i] +=
			getRoleNum(rule_y, $('.rule_y_selector').val() ,i)
			+ getRoleNum(rule_x, $('.rule_x1_selector').val() ,i)
			+ getRoleNum(rule_x, $('.rule_x2_selector').val() ,i);
	}
	
	// TODO:上限付き役職チェック
	
	// 役職テーブルの状態を見て、過不足を算出する
	for(var i in npcs) {
		role_number[$('select.role_selector.role_' + i).val()]--;
	}
	var notices = [];
	
	if($('.rule_x1_selector').val() == $('.rule_x2_selector').val()) {
		notices.push("<span class=\"red\">ルールX1とX2が重複</span>");
	}
	for(var i in roles) {
		if(i == 'person') continue;
		
		if(role_number[i] > 0) {
			notices.push("<span class=\"red\">" + roles[i].name + "</span>" + role_number[i] + "人不足");
		}
		if(role_number[i] < 0) {
			notices.push("<span class=\"blue\">" + roles[i].name + "</span>" + (-role_number[i]) + "人過剰");
		}
	}
	
	// 事件チェック
	for(var i=0;i<$('.day_selector').val();i++) {
		var iac = $('.accident_selector.day_' + i).val();
		var iacs = $('.accident_criminal_selector.day_' + i).val();
		if(iac == 'none') continue;
		
		for(var j=i+1;j<$('.day_selector').val();j++) {
			var jac = $('.accident_selector.day_' + j).val();
			var jacs = $('.accident_criminal_selector.day_' + j).val();
			if(jac == 'none') continue;
			
			if(iacs == jacs) {
				notices.push("<span class=\"red\">" + i + "日目と" + j + "日目の犯人が重複</span>");
			}
		}
	}
	
	if(notices == []) {
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
		if($('.accident_selector.day_' + i).val() == 'none') {
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
	$('.accident_selector .accident_criminal_selector').change(updateRoleCount).change();
}

updateRuleAdditional = function() {
	$('.rule_y_additional').html(decorateSkill(rule_y[$('.rule_y_selector').val()].additional));
	$('.rule_x1_additional').html(decorateSkill(rule_x[$('.rule_x1_selector').val()].additional));
	$('.rule_x2_additional').html(decorateSkill(rule_x[$('.rule_x2_selector').val()].additional));
}

decodeUrlParam = function() {
	var str = location.search.split("?");
	if(str.length < 2) {
		return [];
	}
	
	var params = str[1].split(":");
	var results = [];
	for (var i = 0; i < params.length; i++) {
		var v = params[i].split("=");
		if(v.length < 2) {
			results[decodeURI(v[0])] = "";
		}else{
			results[decodeURI(v[0])] = decodeURI(v[1]);
		}
	}
	return results;
}

var init = function() {
	// ループ回数
	for(var i=1;i<9;i++) {
		$('.loop_selector,.day_selector').append('<option value=' + i + '>' + i + '</option>');
	}
	$('.loop_selector').val(4);
	$('.day_selector').val(7);
	
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
	
	// ルールフォーカス処理
	$('.focus_button').click(function(){
		$('span.skill_writer, span.skill_turnend, span.skill_terminator').removeClass('skill_focused');
		$('span.skill_' + $(this).val()).addClass('skill_focused');
	});
	
	// 完了ボタン
	var CRIMINAL_SEPARATOR = ":";
	var GLOBAL_SEPARATOR = "_";
	$('#complete_button').click(function(){
		var str = location.search.split("?");
		var param = {
			loop	: $('select.loop_selector').val(),
			day		: $('select.day_selector').val(),
			rule_y	: $('select.rule_y_selector').val(),
			rule_x1	: $('select.rule_x1_selector').val(),
			rule_x2 : $('select.rule_x2_selector').val(),
		};
		
		var param_roles = [],param_accidents = [];
		for(var i in npcs) {
			param_roles.push(roles[$('select.role_selector.role_boy').val()].alias);
		}
		for(var i=1;i<=$('select.day_selector').val();i++) {
			param_accidents.push(accidents[$('select.accident_selector.day_'+i).val()].alias
				+ CRIMINAL_SEPARATOR + npcs[$('select.accident_criminal_selector.day_'+i).val()].alias);
		}
		
		param["roles"] = implode(GLOBAL_SEPARATOR, param_roles);
		param["accidents"] = implode(GLOBAL_SEPARATOR, param_accidents);
		
		$('#assist_url').val(createUrlWithParam(location.href.split("?")[0] , param));
	});
	
	// URLパラムを読む
	/*
	var data = decodeUrlParam();
	if(data != []) {
		$('select.loop_selector').val(data['loop']);
		$('select.day_selector').val(data['day']);
		$('select.rule_y_selector').val(data['rule_y']);
		$('select.rule_x1_selector').val(data['rule_x1']);
		$('select.rule_x2_selector').val(data['rule_x2']);
		
		var param_roles = String(data['roles']).split(GLOBAL_SEPARATOR);
		var param_accidents = String(data['accidents']).split(GLOBAL_SEPARATOR);
		for(var i=0;i<param_roles.length;i++) {
			$('select.role_selector')[i].val(
		}
	}*/
}
