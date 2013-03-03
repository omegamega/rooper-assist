
var ROLE_LIMIT_NOLIMIT = 999;

var roles = [
	{
		name 		: "パーソン",
		alias		: "person",
		skill		: [],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name 		: "キーパーソン",
		alias		: "keyperson",
		skill		: [
				{
					timing	: 'passive',
					text	: "【強制：死亡時】主人公は<span class=\"skill_terminator\">敗北</span>する",
				},
			],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "キラー",
		alias		: "killer",
		skill		: [
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】同一エリアのキーパーソンに[暗躍C]が2つ以上→<span class=\"skill_terminator\">キーパーソンを死亡</span>させる",
				},
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】このキャラクターに[暗躍C]が4つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
				},
			],
		friendship	: 'ignore',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "クロマク",
		alias		: "kuromaku",
		skill		:　[
				{
					timing	: 'writer',
					text	: "【任意：脚本家能力】同一エリアのキャラクター、またはこのキャラクターがいるボードに[暗躍C]を1つ置く",
				},
			],
		friendship	: 'ignore',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "アンサツシャ",
		alias		: "ansatsusya",
		skill		:　[
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】このキャラクターに[暗躍C]が5つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
				},
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】学校に[暗躍C]が3つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
				},
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】同一エリアのキャラクターに[暗躍C]が3つ以上→そのキャラクターを死亡させる",
				},
			],
		friendship	: 'ignore',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "アクリョウツキ",
		alias		: "akuryoutuki",
		skill		:　[
				{
					timing	: 'passive',
					text	: "【強制：常時】同一エリアのキャラクター、またはこのキャラクターのいるボードに対する暗躍禁止を無視",
				},
				{
					timing	: 'passive',
					text	: "【強制：常時】このキャラクターに対する移動禁止を無視",
				},
			],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "ウイッチ",
		alias		: "witch",
		skill		:　[],
		friendship	: 'reject',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "フレンド",
		alias		: "friend",
		skill		:　[
				{
					timing	: 'loopend',
					text	: "【敗北条件：ループ終了時】このキャラクターが死亡している場合、このキャラクターの役職を公開し、<span class=\"skill_terminator\">主人公は敗北</span>する",
				},
				{
					timing	: 'loopstart',
					text	: "【強制：ループ開始時】このキャラクターの役職が公開されたことがある→このキャラクターに[友好C]を1つ置く",
				},
			],
		friendship	: 'normal',
		limit		: 2,
	},
	{
		name		: "メインラバーズ",
		alias		: "mainlovers",
		skill		:　[
				{
					timing	: 'passive',
					text	: "【強制：ラバーズの死亡時】このキャラクターに[不安C]を6つ置く",
				},
				{
					timing	: 'turnend',
					text	: "【任意：ターン終了】このキャラクターに[暗躍C]が1つ以上かつ[不安C]が3つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
				},
			],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "ラバーズ",
		alias		: "lovers",
		skill		:　[
				{
					timing	: 'passive',
					text	: "【強制：メインラバーズの死亡時】このキャラクターに[不安C]を6つ置く",
				},
			],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "シリアルキラー",
		alias		: "serialkiller",
		skill		:　[
				{
					timing	: 'turnend',
					text	: "【強制：ターン終了】このキャラクターと同一エリアにあるキャラクターが一人だけ→そのキャラクターを死亡させる",
				},
			],
		friendship	: 'normal',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "マイナス",
		alias		: "minus",
		skill		:　[],
		friendship	: 'ignore',
		limit		: ROLE_LIMIT_NOLIMIT,
	},
	{
		name		: "ミスリーダー",
		alias		: "missleader",
		skill		:　[
				{
					timing	: 'writer',
					text	: "【任意：脚本家】同一エリアのキャラクターに[不安C]を1つ置く",
				},
			],
		friendship	: 'normal',
		limit		: 1,
	},
];

var rule_y = [
	{
		name		: "殺人計画" , 
		additional	: [
		] ,
		roles		: {
			keyperson		: 1,
			killer			: 1,
			kuromaku		: 1,
		},
	},
	{
		name 		: "悪霊の封印" ,
		additional 	: [	
				{
					timing	: 'loopend',
					text	: "【敗北条件：ループ終了】神社に[暗躍C]が2つ以上ある場合、主人公は<span class=\"skill_terminator\">敗北</span>する",
				},
			] ,
		roles		: {
			kuromaku		: 1,
			akuryoutuki		: 1,
		},
	},
	{
		name 		: "僕と契約しようよ！" ,
		additional 	: [	
				{
					timing	: 'passive',
					text	: "【強制：脚本作成時】必ず少女がキーパーソンになる",
				},
				{
					timing	: 'loopend',
					text	: "【敗北条件：ループ終了】キーパーソーンに[暗躍C]が2つ以上ある場合、主人公は<span class=\"skill_terminator\">敗北</span>する",
				},
			] ,
		roles		: {
			keyperson		: 1,
		},
	},
	{
		name 		: "主人公殺人計画" ,
		additional 	: [	
			] ,
		roles		: {
			ansatsusya		: 1,
			akuryoutuki		: 1,
		},
	},
	{
		name 		: "巨大時限爆弾X" ,
		additional 	: [	
				{
					timing	: 'loopend',
					text	: "【敗北条件：ループ終了】ウイッチの初期エリアに[暗躍C]が2つ以上ある場合、主人公は<span class=\"skill_terminator\">敗北</span>する",
				},
			] ,
		roles		: {
			witch			: 1,
		},
	},
];

var rule_x = [
	{
		name		: "友情グループ" ,
		additional	: [],
		roles		: {
			friend			: 2,
		},
	},
	{
		name		: "恋愛模様" ,
		additional	: [],
		roles		: {
			mainlovers		: 1,
			lovers			: 1,
			missleader		: 1,
		},
	},
	{
		name		: "不穏な噂" ,
		additional 	: [	
				{
					timing	: 'writer',
					text	: "【任意：脚本家】任意のボード1つに[暗躍C]を1つ置く(1ループ1回)",
				},
			] ,
		roles		: {
			missleader		: 1,
		},
	},
	{
		name		: "因果の糸" ,
		additional 	: [	
				{
					timing	: 'loopstart',
					text	: "【強制：ループ開始時】ひとつ前のループ終了時に[友好C]の置かれていた全キャラクターに[不安C]を2つ置く",
				},
			] ,
		roles		: {},
	},
	{
		name		: "マイナス13" ,
		additional	: [],
		roles		: {
			friend			: 1,
			minus			: 2,
			missleader		: 1,
		},
	},
	{
		name		: "潜む殺人鬼" ,
		additional	: [],
		roles		: {
			friend			: 1,
			serialkiller	: 1,
		},
	},
	{
		name		: "妄想拡大ウイルス" ,
		additional 	: [	
				{
					timing	: 'passive',
					text	: "【強制：常時】パーソンは[不安C]が3つ以上置かれている限り、役職がシリアルキラーになる",
				},
			] ,
		roles		: {
			missleader		: 1,
		},
	},
];

var accidents = [
	{
		name	: "-",
		effect	: [],
	},
	{
		name	: "殺人事件",
		effect	: [
				{
					timing	: '',
					text	: "犯人と同じエリアにいる犯人以外のキャラクター1人を死亡させる",
				},
			],
	},
	{
		name	: "邪気の汚染",
		effect	: [
				{
					timing	: '',
					text	: "神社に[暗躍C]を2つ置く",
				},
			],
	},
	{
		name	: "病院の事件",
		effect	: [
				{
					timing	: '',
					text	: "病院に[暗躍C]が1つ以上→病院にいるすべてのキャラクターを死亡させる",
				},
				{
					timing	: '',
					text	: "病院に[暗躍C]が2つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
				},
			],
	},
	{
		name	: "自殺",
		effect	: [
				{
					timing	: '',
					text	: "犯人は死亡する",
				},
			],
	},
	{
		name	: "不安拡大",
		effect	: [
				{
					timing	: '',
					text	: "任意のキャラクター1人に[不安C]を2つ置き、別のキャラクター1人に[暗躍C]を1つ置く",
				},
			],
	},
	{
		name	: "別離",
		effect	: [
				{
					timing	: '',
					text	: "犯人を任意のボードに移動させる",
				},
			],
	},
	{
		name	: "暴露",
		effect	: [
				{
					timing	: '',
					text	: "【選択】犯人と同じエリアにいるキャラクターから[友好C]を2つまで取り除く(割り振り可)",
				},
				{
					timing	: '',
					text	: "【選択】犯人と同じエリアにいるキャラクターに[友好C]を2つまで置く(割り振り可)",
				},
			],
	},
];


(function(){
	roles_reverse = [];
	for(var i in roles) {
		roles_reverse[roles[i].alias] = i;
	}
})();