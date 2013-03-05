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
		role_number[roles[i].name] = 0;
	}
	
	function getRoleNum(rules,rule,role) {
		return (rules[rule].roles[role] != undefined) ? rules[rule].roles[role] : 0;
	}
	for(var i in roles) {
		role_number[roles[i].name] +=
			getRoleNum(rule_y, $('.rule_y_selector').val() ,roles[i].name)
			+ getRoleNum(rule_x, $('.rule_x1_selector').val() ,roles[i].name)
			+ getRoleNum(rule_x, $('.rule_x2_selector').val() ,roles[i].name);
	}
	
	// TODO:上限付き役職チェック
	
	// 役職テーブルの状態を見て、過不足を算出する
	for(var i in npcs) {
		role_number[roles[$('select.role_selector.role_' + i).val()].name]--;
	}
	var notices = [];
	
	if($('.rule_x1_selector').val() == $('.rule_x2_selector').val()) {
		notices.push("<span class=\"red\">ルールX1とX2が重複</span>");
	}
	for(var i in role_number) {
		if(i == 'パーソン') continue;
		
		if(role_number[i] > 0) {
			notices.push("<span class=\"red\">" + i + "</span>" + role_number[i] + "人不足");
		}
		if(role_number[i] < 0) {
			notices.push("<span class=\"blue\">" + i + "</span>" + (-role_number[i]) + "人過剰");
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
		
		var attr_str = '';
		var friendship = roles[$('.role_selector.role_' + i).val()].friendship;
		switch(friendship) {
			case 'ignore':
				attr_str += '<span class="red">無視</span>';
				break;
			case 'reject':
				attr_str += '<span class="blue">絶無</span>';
				break;
			default:
				attr_str += '<span class="gray">友好</span>';
				break;
		}
		$('.role_attr.role_' + i).html(attr_str);
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
			+ '<td><span class="role_attr role_' + i + '"></span></td>'
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
		encodeScenarioToUrl();
	}).change();
}

updateRuleAdditional = function() {
	$('.rule_y_additional').html(decorateSkill(rule_y[$('.rule_y_selector').val()].additional));
	$('.rule_x1_additional').html(decorateSkill(rule_x[$('.rule_x1_selector').val()].additional));
	$('.rule_x2_additional').html(decorateSkill(rule_x[$('.rule_x2_selector').val()].additional));
}

var CRIMINAL_SEPARATOR = ":";
var GLOBAL_SEPARATOR = ",";
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

// シナリオ情報をURLにする
encodeScenarioToUrl = function() {
	var str = location.search.split("?");
	var param = {
		set			: tragedy_name,
		scenario	: $('input#scenario_name').val(),
		loop		: $('select.loop_selector').val(),
		day			: $('select.day_selector').val(),
		rule_y		: rule_y[$('select.rule_y_selector').val()].alias,
		rule_x1		: rule_x[$('select.rule_x1_selector').val()].alias,
		rule_x2		: rule_x[$('select.rule_x2_selector').val()].alias,
	};
	
	for(var i in npcs) {
		param[npcs[i].alias] = roles[$('select.role_selector.role_' + i).val()].alias;
	}
	for(var i=1;i<=$('select.day_selector').val();i++) {
		if($('select.accident_selector.day_'+i).val() != 0) {
			var key = 'event' + i;
			var value = accidents[$('select.accident_selector.day_'+i).val()].alias
				+ CRIMINAL_SEPARATOR + npcs[$('select.accident_criminal_selector.day_'+i).val()].alias;
			if(param[key] == undefined) {
				param[key] = value;
			}else{
				param[key] = param[key] + GLOBAL_SEPARATOR + value;
			}
		}
	}

	var url = createUrlWithParam(location.href.split("?")[0] , param);
	$('#assist_url').val(url);
	
	// pushStateしておく
	/* TODO:復元時に動作不良してしまうのでなんとかする
	if(window.history.current != url) {
		window.history.replaceState(null,null,url);
	}*/
	return param;
	
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
	
	$('input#scenario_name').change(encodeScenarioToUrl);
	
	// ルールフォーカス処理
	$('.focus_button').click(function(){
		if($('span.skill_' + $(this).val()).hasClass('skill_focused') == true) {
			$('span.skill_writer, span.skill_turnend, span.skill_terminator, span.skill_killer').removeClass('skill_focused');
		}else{
			$('span.skill_writer, span.skill_turnend, span.skill_terminator, span.skill_killer').removeClass('skill_focused');
			$('span.skill_' + $(this).val()).addClass('skill_focused');
		}
	});
	
	// 編集/完了
	$('#edit_button').click(function() {
		$('.play_mode').hide();
		$('.edit_mode').show();
		$('select, #scenario_name').attr('disabled',null);
	}).click();

	$('#complete_button').click(function(){		
		$('.play_mode').show();
		$('.edit_mode').hide();
		$('select, #scenario_name').attr('disabled','1');
	});
	
	$('.loop_selector, .day_selector, .rule_y_selector, .rule_x1_selector, .rule_x2_selector'
	 + ', .role_selector, .accident_selector, .accident_criminal_selector').change(encodeScenarioToUrl);
	
	// URLパラムを読む
	var data = decodeUrlParam();
	if(data != null) {
		// シナリオデータっぽいなら復元する
		// TODO: data['set'] 惨劇セットを切り替える
		$('select.loop_selector').val(data['loop']).change();
		$('select.day_selector').val(data['day']).change();
		$('select.rule_y_selector').val(rule_y_reverse[data['rule_y']]).change();
		$('select.rule_x1_selector').val(rule_x_reverse[data['rule_x1']]).change();
		$('select.rule_x2_selector').val(rule_x_reverse[data['rule_x2']]).change();
		$('input#scenario_name').val(data['scenario']);
		
		for(var i=0;i<npcs.length;i++) {
			var npc_alias = npcs[i].alias;
			$('select.role_selector.role_' + i).val(roles_reverse[data[npc_alias]]).change();
		}
		for(var i=1;i<=data['day'];i++) {
			var key = 'event' + i;
			if(data[key] != undefined) {
				var d = data[key].split(GLOBAL_SEPARATOR);
				for(var j=0;j<d.length;j++) {
					var v = d[j].split(CRIMINAL_SEPARATOR);
					$('select.accident_selector.day_' + i).val(accidents_reverse[v[0]]).change();
					$('select.accident_criminal_selector.day_' + i).val(npcs_reverse[v[1]]).change();
				}
			}
		}
		$('#complete_button').click();
	}else{
		$('.loop_selector').val(3);
		$('.day_selector').val(5).change();
	}
}
