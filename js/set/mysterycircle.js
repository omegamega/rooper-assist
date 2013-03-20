Set_MysteryCircle = {
	load : function(){
		tragedy_name = "MysteryCircle";
		roles = [
			{
				name 		: "キーパーソン",
				alias		: "keyperson",
				skill		: [
						{
							timing	: 'passive',
							text	: "【強制：死亡時】主人公は<span class=\"skill_terminator\">敗北</span>する",
						},
					],
			},
			{
				name		: "キラー",
				alias		: "killer",
				skill		: [
						{
							timing	: 'turnend',
							text	: "【任意：ターン終了】同一エリアのキーパーソンに[暗躍C]が2つ以上→<span class=\"skill_killer\">キーパーソンを死亡</span>させる",
						},
						{
							timing	: 'turnend',
							text	: "【任意：ターン終了】このキャラクターに[暗躍C]が4つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
						},
					],
				friendship	: "ignore",
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
			},
			{
				name		: "ドリッパー",
				alias		: "dripper",
				skill		:　[
						{
							timing	: 'turnend',
							text	: "【強制：ターン終了】Exゲージが2以上→同一エリアの<span class=\"skill_killer\">キャラクター1人を死亡</span>させる(1ループ1回)",
						},
						{
							timing	: 'turnend',
							text	: "【強制：ターン終了】Exゲージが4つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
						},
					],
				friendship	: "ignore",
			},
			{
				name		: "フール",
				alias		: "fool",
				skill		:　[
						{
							timing	: 'passive',
							text	: "【強制：脚本作成時】いずれかの事件の犯人になる",
						},
						{
							timing	: 'event',
							text	: "【強制：自身が犯人の事件解決後】このキャラクターまたは死体の[不安C]をすべて取り除く",
						},
					],
				limit		: 1,
			},
			{
				name		: "ミスリーダー",
				alias		: "missleader",
				skill		:　[
						{
							timing	: 'writer',
							text	: "【任意：脚本家能力】同一エリアのキャラクターに[不安C]を1つ置く",
						},
					],
				limit		: 1,
			},
			{
				name		: "フレンド",
				alias		: "friend",
				skill		:　[
						{
							timing	: 'loopend',
							text	: "【敗北：ループ終了時】このキャラクターが死亡している場合、このキャラクターの役職を公開し、<span class=\"skill_terminator\">主人公は敗北</span>する",
						},
						{
							timing	: 'loopstart',
							text	: "【強制：ループ開始時】このキャラクターの役職が公開されたことがある→このキャラクターに[友好C]を1つ置く",
						},
					],
				limit		: 2,
			},
			{
				name		: "シリアルキラー",
				alias		: "serial",
				skill		:　[
						{
							timing	: 'turnend',
							text	: "【強制：ターン終了】このキャラクターと同一エリアにあるキャラクターが一人だけ→その<span class=\"skill_killer\">キャラクターを死亡</span>させる",
						},
					],
			},
			{
				name		: "パラノイア",
				alias		: "paranoia",
				skill		:　[
						{
							timing	: 'writer',
							text	: "【任意：脚本家能力】このキャラクターに[暗躍C]か[友好C]を1つ置く",
						},
					],
				friendship	: "reject",
			},
			{
				name		: "セラピスト",
				alias		: "therapist",
				skill		:　[
						{
							timing	: 'writer',
							text	: "【強制：脚本家能力】Exゲージが1以上→同一エリアの自身以外のキャラクター1人から[不安C]を1つ取り除く",
						},
					],
			},
			{
				name		: "メイタンテイ",
				alias		: "meitantei",
				skill		:　[
						{
							timing	: 'passive',
							text	: "【強制：脚本作成時】犯人とならない",
						},
						{
							timing	: 'passive',
							text	: "【強制：常時】死亡しない",
						},
						{
							timing	: 'event',
							text	: "【強制：事件】Exゲージが0以上→同一エリアに犯人が存在する場合、その事件は必ず発生する",
						},
					],
			},
			{
				name		: "ゼッタイシャ",
				alias		: "absolute",
				skill		:　[
						{
							timing	: 'passive',
							text	: "【強制：脚本作成時】いずれかの事件の犯人になる",
						},
						{
							timing	: 'event',
							text	: "【強制：事件】このキャラクターの事件は必ず発生する",
						},
					],
				friendship	: "reject",
			},
			{
				name		: "ツイン",
				alias		: "twin",
				skill		:　[
						{
							timing	: 'passive',
							text	: "【強制：脚本作成時】いずれかの事件の犯人になる",
						},
						{
							timing	: 'event',
							text	: "【強制：自身が犯人の事件解決中】本来の位置の代わりに、対角線にあるボードにいるものとして扱う",
						},
					],
				friendship	: "normal",
			},

		];

		rule_y = [
			{
				name		: "殺人計画" , 
				alias		: "murder_plan",
				additional	: [] ,
				roles		: {
					"キーパーソン"		: 1,
					"キラー"			: 1,
					"クロマク"			: 1,
				},
			},
			{
				name 		: "組み重なり事件キルト" ,
				alias		: "event_quilt",
				additional 	: [	
					{
						timing	: 'loopend',
						text	: "【敗北：ループ終了】Exゲージが3以上である",
					},
				] ,
				roles		: {
					"フール"			: 1,
					"ミスリーダー"		: 1,
				},
			},
			{
				name 		: "タイトロープ上の計画" ,
				alias		: "tightrope",
				additional 	: [	
					{
						timing	: 'loopend',
						text	: "【敗北：ループ終了】Exゲージが1以下である",
					},
				] ,
				roles		: {
					"キラー"		: 1,
					"クロマク"		: 1,
				},
			},
			{
				name 		: "黒の学園" ,
				alias		: "black_school",
				additional 	: [	
					{
						timming	: 'loopend',
						text	: "【敗北：ループ終了時】学校に[暗躍C]がX個以上ある。X=現在のループ数",
					}
				] ,
				roles		: {
					"クロマク"		: 1,
				},
			},
			{
				name 		: "ストリキニーネの雫" ,
				alias		: "strychnine",
				additional 	: [	
					{
						timing	: 'event',
						text	: "【強制：常時】「殺人事件」「自殺」が発生するとき、[暗躍C]を[不安C]としても扱う",
					},
				] ,
				roles		: {
					"キーパーソン"	: 1,
					"ドリッパー"	: 1,
					"フール"		: 1,
				},
			},
		];

		rule_x = [
			{
				name		: "潜む殺人鬼" ,
				alias		: "hidden_killer",
				additional	: [],
				roles		: {
					"フレンド"			: 1,
					"シリアルキラー"	: 1,
				},
			},
			{
				name		: "隔離病棟サイコ" ,
				alias		: "psycho",
				additional	: [
					{
						timing	: 'loopstart',
						text	: "【強制：ループ開始時】ひとつ前のループでExゲージが2以下→Exゲージを1増加させる",
					},
				],
				roles		: {
					"ミスリーダー"		: 1,
					"パラノイア"		: 1,
					"セラピスト"		: 1,
				},
			},
			{
				name		: "火薬の香り" ,
				alias		: "gunpowder",
				additional	: [
					{
						timing	: 'loopend',
						text	: "【敗北：ループ終了時】生存している全キャラクターに置かれた<span class=\"skill_terminator\">[不安C]の合計が12以上</span>である",
					},
				],
				roles		: {
					"シリアルキラー"	: 1,
				},
			},
			{
				name		: "私はメイタンテイ" ,
				alias		: "im_detective",
				additional 	: [] ,
				roles		: {
					"ミスリーダー"		: 1,
					"フレンド"			: 1,
					"メイタンテイ"		: 1,
				},
			},
			{
				name		: "愚者のダンス" ,
				alias		: "fool_dance",
				additional 	: [] ,
				roles		: {
					"フール"			: 1,
					"フレンド"			: 1,
				},
			},
			{
				name		: "絶対の意思" ,
				alias		: "absolute_will",
				additional	: [],
				roles		: {
					"ゼッタイシャ"		: 1,
				},
			},
			{
				name		: "双子のトリック",
				alias		: "twin_trick",
				additional 	: [] ,
				roles		: {
					"パラノイア"		: 1,
					"ツイン"			: 1,
				},
			},
		];

		accidents = [
			{
				name	: "殺人事件",
				alias	: "murder",
				effect	: [
					{
						text	: "犯人と同じエリアにいる犯人以外の<span class=\"skill_killer\">キャラクター1人を死亡</span>させる",
					},
				],
			},
			{
				name	: "テロリズム",
				alias	: "terrorism",
				effect	: [
					{
						text	: "都市に[暗躍C]が1つ以上→病院にいる<span class=\"skill_killer\">すべてのキャラクターを死亡</span>させる",
					},
					{
						text	: "都市に[暗躍C]が2つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
					},
				],
			},
			{
				name	: "病院の事件",
				alias	: "hospital",
				effect	: [
					{
						text	: "病院に[暗躍C]が1つ以上→病院にいる<span class=\"skill_killer\">すべてのキャラクターを死亡</span>させる",
					},
					{
						text	: "病院に[暗躍C]が2つ以上→<span class=\"skill_terminator\">主人公を死亡</span>させる",
					},
				],
			},
			{
				name	: "自殺",
				alias	: "suicide",
				effect	: [
					{
						text	: "<span class=\"skill_killer\">犯人は死亡</span>する",
					},
				],
			},
			{
				name	: "不安拡大",
				alias	: "expand_anxiety",
				effect	: [
					{
						text	: "任意のキャラクター1人に[不安C]を2つ置き、別のキャラクター1人に[暗躍C]を1つ置く",
					},
				],
			},
			{
				name	: "前兆",
				alias	: "omen",
				effect	: [
					{
						text	: "＜不安臨界-1＞犯人と同じエリアにいるキャラクター1人に[不安C]を1つ置く",
					},
				],
			},
			{
				name	: "猟奇殺人",
				alias	: "bizarre",
				effect	: [
					{
						text	: "＜不安臨界+1＞＜Exゲージ非増加＞「殺人事件」と「不安拡大」をこの順で発生させる(結果、Exゲージは2増加)",
					},
				],
			},
			{
				name	: "偽装自殺",
				alias	: "camouflage",
				effect	: [
					{
						text	: "犯人にExカードAをセットする。(ExカードAがセットされたキャラクターに対し、主人公はカードをセットできない)",
					},
				],
			},
			{
				name	: "不和",
				alias	: "discord",
				effect	: [
					{
						text	: "犯人と同じエリアにいるキャラクターのうち、[友好C]の置かれた1人からすべての[友好C]を取り除く",
					},
				],
			},
			{
				name	: "クローズドサークル",
				alias	: "closed_circle",
				effect	: [
					{
						text	: "犯人のいるボードを指定する。事件発生日を含み3日間、そのボードからの移動とそのボードへの移動を禁止する",
					},
				],
			},
			{
				name	: "銀の銃弾",
				alias	: "silver_bullet",
				effect	: [
					{
						text	: "＜Exゲージ非増加＞このフェイズの終了時にループを終了させる",
					},
				],
			},
		];
	},
};