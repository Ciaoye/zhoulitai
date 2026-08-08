const TIMELINE_META = {
  range: "1996—2026",
  sourceUpdated: "2026-08-07",
  sourceNote: "据 LLM Wiki 年份页、周立太时间线、中国劳工权益时间线及媒体来源页整理。页面只做内部研究展示；Wiki 多数条目仍处于未复核状态。"
};

const TIMELINE_CATEGORIES = {
  case: { label: "案件与实践", short: "案件", color: "#d56755" },
  policy: { label: "法律与政策", short: "政策", color: "#167f82" },
  media: { label: "媒体叙事", short: "媒体", color: "#b54f79" },
  event: { label: "公共事件与劳工背景", short: "背景", color: "#667b45" }
};

const TIMELINE_CHAINS = [
  {
    id: "access",
    title: "从无门可入，到法院必须受理",
    kicker: "诉权入口",
    description: "李启兵等人的行政诉讼把“仲裁不受理、法院也不收案”的制度死结推到最高法会议，形成全国性的受理口径。",
    color: "#167f82",
    nodeIds: ["1997-li-qibing", "1998-li-qibing-result", "1999-spc-meeting"]
  },
  {
    id: "double",
    title: "个案反复诉讼，推动双赔口径变化",
    kicker: "交通事故与工伤双赔",
    description: "徐昌文案开启双赔实践；王琼等系列案不断冲撞地方低标准与“补差”口径，随后在深圳、重庆留下制度回响。",
    color: "#d56755",
    nodeIds: ["1996-xu", "1998-wang-result", "2000-written-decisions", "2008-citizen-standard", "2011-double-correction"]
  },
  {
    id: "advance",
    title: "从垫付个案，到先行支付真正落地",
    kicker: "工伤基金先行支付",
    description: "陈用刚案推动深圳建立基金垫付条款；《社会保险法》确立先行支付后，伍锡梅案又通过人大监督纠正地方限制，最终完成赔付。",
    color: "#d4a72c",
    nodeIds: ["2000-chen", "2011-social-insurance-law", "2015-wu-ximei-start", "2021-article24-repealed", "2024-wu-ximei-paid"]
  },
  {
    id: "media",
    title: "媒体镜头中的身份不断变化",
    kicker: "媒体叙事框架",
    description: "报道从“打工仔打赢官司”的胜利叙事，转向“黑律师”、英雄与挣扎、风险代理困局，再到转型与历史回望。",
    color: "#b54f79",
    nodeIds: ["1998-shenzhen-press", "2001-black-lawyer", "2004-cctv-struggle", "2007-media-dilemma", "2012-reduce-cases", "2015-thepaper", "2019-retrospect"]
  },
  {
    id: "household",
    title: "户籍差别进入判决与公共议题",
    kicker: "同工不同保",
    description: "上海两起截瘫、截肢案与 58 号通知，把外来劳动者低待遇制度暴露出来；深圳法院随后提出农民工交通事故赔偿“市民待遇”。",
    color: "#4e6da8",
    nodeIds: ["1999-hu", "2000-shanghai-58", "2000-wan", "2008-citizen-standard"]
  },
  {
    id: "overage",
    title: "“超龄”不应成为保障真空",
    kicker: "超龄劳动者",
    description: "地方参保条件与工伤不予受理引发连续诉讼；皮大明案确认达到退休年龄的进城务工农民仍受工伤保险规范保护。",
    color: "#667b45",
    nodeIds: ["2011-overage-rule", "2013-pi-daming", "2015-pi-result", "2016-zhang-xiantang"]
  },
  {
    id: "dust",
    title: "煤矿关闭后，尘肺鉴定仍被文件卡住",
    kicker: "职业病与程序障碍",
    description: "劳动关系证明与保险关系存续被设为复查前提，骆世海案将这一连串规范性文件障碍带入司法审查。",
    color: "#775b8f",
    nodeIds: ["2014-luo-start", "2019-luo-blocked", "2020-rule-303", "2021-luo-review"]
  },
  {
    id: "compensation",
    title: "一只断手值多少钱",
    kicker: "赔偿标准与假肢费",
    description: "从冻结在 679 元的计发基数、彭刚中案一次性假肢费，到刘涛案巨额赔偿与深圳规则修订，赔偿开始覆盖伤残者漫长的生活成本。",
    color: "#df7a36",
    nodeIds: ["1996-low-base", "1997-peng", "1998-wang-result", "1998-liu-tao", "1999-prosthesis-rule", "2000-written-decisions", "2010-hand-value"]
  },
  {
    id: "risk",
    title: "让工人打得起官司，也让律所承担风险",
    kicker: "风险代理的代价",
    description: "风险代理降低了诉讼门槛，却把费用、时间与败诉风险压在律师一方；欠费诉讼与律所收缩显示这套模式难以长期维持。",
    color: "#a66543",
    nodeIds: ["1997-risk", "2004-sues-client", "2007-media-dilemma", "2011-client-lawsuit", "2012-reduce-cases", "2012-close-office"]
  },
  {
    id: "legislation",
    title: "个案之外，全国劳动保障框架逐步成形",
    kicker: "全国劳动立法",
    description: "工伤保险、职业病防治、劳动争议仲裁、劳动合同与社会保险先后进入国家法律框架，个案争议获得新的制度坐标。",
    color: "#2f6f95",
    nodeIds: ["1996-trial-measures", "2001-occupational-law", "2004-work-injury-reg", "2007-arbitration-law", "2008-labor-contract-law", "2011-social-insurance-law"]
  },
  {
    id: "review",
    title: "从告一个机关，到审查一份规则",
    kicker: "地方文件审查",
    description: "多起案件把争议从待遇数额推向地方文件是否合法：补差、参保门槛、职业病复查与先行支付限制都成为审查对象。",
    color: "#3d8b69",
    nodeIds: ["2002-government-suit", "2004-chongqing-211", "2011-double-correction", "2012-cleanup", "2012-rule-185", "2020-supervision", "2021-article24-repealed", "2021-luo-review"]
  },
  {
    id: "occupational",
    title: "职业病待遇之外，能否再获民事赔偿",
    kicker: "职业病双赔",
    description: "职业病防治法提供新的请求基础，骆世林、刘忠斌等案持续争论工伤待遇与民事赔偿能否并行。",
    color: "#8c5570",
    nodeIds: ["2001-occupational-law", "2003-luo-shilin", "2013-luo-shilin-result", "2014-liu-zhongbin"]
  }
];

const TIMELINE_EVENTS = [
  { id:"1996-xu", year:1996, month:5, category:"case", title:"徐昌文夫妇双赔案", short:"首案：交通事故与工伤双赔", summary:"周立太首次赴深圳代理徐昌文夫妇死亡赔偿案，同时向肇事方与工伤保险责任方主张赔偿。Wiki 将其视为深圳交通事故与工伤“双赔”的早期先例。", impact:"个案把两套赔偿责任是否可以并行，带入此后二十余年的制度争论。", source:"cases/case-xu-changwen-double-compensation.md", status:"多来源并列，金额与历时仍有口径差异", image:"../../数据层/text/blog/二十年前的今天/img_5394f504.jpg", chains:["double"] },
  { id:"1996-trial-measures", year:1996, month:8, category:"policy", title:"《企业职工工伤保险试行办法》施行", short:"首部系统工伤保险部门规章", summary:"原劳动部试行办法系统规范工伤保险，并将上下班途中非本人主要责任的事故纳入工伤范围。", impact:"成为徐昌文案工伤认定的直接法律背景，也开启此后“双赔／补差”争议。", source:"laws-and-policies/law-enterprise-work-injury-trial-measures-1996.md", status:"年份页已收录" },
  { id:"1997-peng", year:1997, month:2, category:"case", title:"彭刚中假肢更换费案", short:"3.3 万标准被突破，获赔约 17.8 万", summary:"彭刚中被机器夺去一只手。周立太挑战按 679 元低基数计赔，并主张把未来假肢更换费一次性支付；媒体材料记载最终获赔约 17.8 万元。", impact:"赔偿从一次伤残补偿扩展到假肢更换等长期生活成本，并成为此后深圳规则变化的重要个案。", source:"cases/case-peng-gangzhong-amputation.md", status:"年份明确；金额存在 17.2 万／17.8 万不同媒体口径" },
  { id:"1996-low-base", year:1996, month:11, category:"policy", title:"宝安、龙岗冻结工伤计发基数", short:"地方批文将标准冻结在 679 元", summary:"两区批文继续按深圳 1993 年职工月平均工资 679 元计赔，与特区法规要求采用上一年度标准发生冲突。", impact:"成为王琼等 200 余人系列行政诉讼的制度起点。", source:"years/year-1996.md", status:"年份页整理；具体文号见相关法律页" },

  { id:"1997-li-qibing", year:1997, month:7, category:"case", title:"李启兵等诉龙岗区劳动局", short:"用行政诉讼打开仲裁入口", summary:"劳动仲裁拒绝受理工伤争议后，李启兵等人起诉龙岗区劳动局不履行法定职责。诉讼期间仲裁最终受理。", impact:"把“仲裁不收、法院不进”的制度死结转化为行政诉讼问题。", source:"cases/case-li-qibing-longgang-labor-bureau.md", status:"Wiki 记录存在“李启兵个人／七人集体”的材料口径差异", chains:["access"] },
  { id:"1997-license", year:1997, month:7.4, category:"event", title:"深圳律师执业证被扣", short:"代理工人告劳动局后遭扣证", summary:"据《工伤背后》记载，周立太被指“不该代表打工仔状告劳动局”，律师执业证被扣；其后提起行政诉讼，证件归还。", impact:"执业资格与跨地区维权之间的冲突开始显形。", source:"events/event-1997-shenzhen-license-seized.md", status:"主要据书籍与自述材料" },
  { id:"1997-risk", year:1997, month:10, category:"event", title:"风险代理模式形成", short:"“打不赢官司不收费”", summary:"彭刚中案前后，周立太开始以风险代理降低伤残工人的诉讼门槛，并承担住宿、诉讼和时间成本。", impact:"这种模式扩大了法律服务可及性，也埋下此后欠费与经营危机。", source:"themes/theme-contingency-fee.md", status:"主题页综合" },

  { id:"1998-wang-result", year:1998, month:6.6, category:"case", title:"王琼等 7 人终审胜诉", short:"法院撤销社保局低标准处理", summary:"深圳中院合并审理 7 名伤残工人上诉案，当庭撤销社保局处理决定，认定地方低标准文件缺乏法律依据。", impact:"行政诉讼第一次正面纠正地方工伤计赔标准。", source:"cases/case-wang-qiong-shenzhen-admin-lawsuit.md", status:"年份页与案件页一致", chains:["double"] },
  { id:"1998-shenzhen-press", year:1998, month:6.9, category:"media", title:"《深圳法制报》头版报道", short:"“七个打工仔打赢索赔官司”", summary:"报道以胜诉和弱者抗争为叙事中心，将原本局限于法庭的社保行政争议带入深圳公共视野。", impact:"媒体关注使个案获得制度议题的可见度。", source:"years/year-1998.md", status:"标题与日期据年份页", chains:["media"] },
  { id:"1998-li-qibing-result", year:1998, month:9, category:"case", title:"李启兵获赔 14.4 万元", short:"补偿基数与未来假肢费获支持", summary:"深圳中院二审改按更高工资基数计算补偿，并支持未来假肢更换费。李启兵后来在假肢厂再就业。", impact:"同一案件同时改变赔偿数额与工伤争议进入司法的路径。", source:"cases/case-li-qibing-longgang-labor-bureau.md", status:"案卷与书籍材料并列", chains:["access"] },
  { id:"1998-base-571", year:1998, month:10, category:"policy", title:"工伤计发基数被降至 571 元", short:"司法纠正后出现地方制度反弹", summary:"深圳市人大常委会相关文件将宝安、龙岗计发基数定为 571 元，甚至低于此前 679 元。Wiki 对发布日期和文件表述并列保留两种口径。", impact:"显示判决胜诉不等于制度马上改进，地方规则仍可形成新的阻力。", source:"laws-and-policies/law-shenzhen-rd-571-base-1998.md", status:"日期与具体文件表述待核" },
  { id:"1998-liu-tao", year:1998, month:11, category:"case", title:"刘涛巨额工伤赔偿案", short:"赔偿达到 158 万元", summary:"周立太自述，刘涛工伤案获赔 158 万元，在当时创下其所称的全国最高工伤赔偿纪录。", impact:"与此前断手仅按 3.3 万余元计算形成强烈对照，显示赔偿基数、伤残等级与长期费用主张发生变化。", source:"cases/case-liu-tao-record-compensation.md", status:"158 万元为周立太自述口径，裁判文书仍待核" },

  { id:"1999-spc-meeting", year:1999, month:11, category:"policy", title:"最高法成都民商工作座谈会", short:"仲裁不予受理，法院应当受理", summary:"广东高院将李启兵等案反映的问题带入最高法会议。会议纪要明确：劳动仲裁委员会作出的不予受理通知，人民法院应予受理。", impact:"把地方个案转换为全国劳动争议的诉权入口规则。", source:"events/event-1999-supreme-court-chengdu-meeting.md", status:"会议纪要影响据案卷与简介材料", chains:["access"] },
  { id:"1999-hu", year:1999, month:7.5, category:"case", title:"胡庆旺上海工伤瘫痪案", short:"外来劳动者与本地待遇差异", summary:"胡庆旺在上海工伤致一级伤残，仲裁与法院赔偿远低于其请求。案件持续申诉，但未能改变结果。", impact:"把户籍差异、终身护理与异地工伤待遇问题集中呈现。", source:"cases/case-hu-qingwang-shanghai-paralysis.md", status:"主要事实来自传记与案件材料", chains:["household"] },
  { id:"1999-central-attention", year:1999, month:3, category:"event", title:"中央层面关注深圳工伤问题", short:"领导批示与九部委赴粤检查", summary:"年份页记载，中央领导对深圳工伤问题作批示，国务院责令多部门赴广东检查安全生产。", impact:"地方诉讼与媒体报道开始进入中央政策视野。", source:"years/year-1999.md", status:"据 DC-0004，自述性材料待独立核实" },
  { id:"1999-prosthesis-rule", year:1999, month:12, category:"policy", title:"深圳工伤规则纳入假肢更换费", short:"一次性假肢费从个案进入规则", summary:"档案材料记载，深圳在工伤保险规则修订中明确伤残劳动者可获假肢更换费用赔偿。", impact:"彭刚中案中的个案主张转化为更稳定的制度保障，结束断手赔偿只覆盖眼前损失的旧做法。", source:"themes/theme-prosthesis-replacement-fee.md", status:"据媒体与周立太自述，具体修订条文待回看" },

  { id:"2000-chen", year:2000, month:3.5, category:"case", title:"陈用刚工伤赔偿无法执行", short:"企业注销后，推动基金垫付", summary:"陈用刚工伤截肢，判决后企业注销逃逸。相关案件推动深圳在工伤保险条例中加入判决无法执行时由社保基金垫付的条款。", impact:"从“判得下来”进一步追问“拿不拿得到”，形成先行支付的早期地方实践。", source:"cases/case-chen-yonggang-work-injury-advance.md", status:"制度影响据典型案例材料", chains:["advance"] },
  { id:"2000-wan", year:2000, month:7, category:"case", title:"万菊生上海截肢案", short:"判决明确区分外地与本地劳动者", summary:"万菊生加班时右臂被机器卷入。二审增加赔偿，却在判决理由中明确外地劳动者的社会保障义务“客观上有别”于本地职工。", impact:"户籍差别不仅存在于行政文件，也进入司法叙述。", source:"cases/case-wan-jusheng-shanghai-amputation.md", status:"金额据年份页", chains:["household"] },
  { id:"2000-shanghai-58", year:2000, month:11.8, category:"policy", title:"上海 58 号通知", short:"外来工适用较低一次性待遇", summary:"上海市劳动和社会保障局发布 58 号通知，按户籍身份对外地工伤劳动者适用不同标准。", impact:"成为万菊生、胡庆旺两案中“户籍歧视”争议的直接制度对象。", source:"laws-and-policies/law-shanghai-notice-2000-58.md", status:"年份页已收录", chains:["household"] },
  { id:"2000-written-decisions", year:2000, month:12, category:"policy", title:"社保局开始出具书面待遇决定", short:"工伤处理变得可诉、可追踪", summary:"王琼等系列案后，两区社保局陆续以书面形式作出工伤保险待遇决定，此前普遍不出具书面决定的做法被改变。", impact:"书面行政决定为复议和诉讼提供了明确对象。", source:"years/year-2000.md", status:"据 CS-0005 典型案例材料", chains:["double"] },

  { id:"2001-search-case", year:2001, month:8, category:"case", title:"吴雪等 56 名女工搜身案", short:"工厂脱衣搜身引发涉外关注", summary:"56 名女工遭工厂管理人员脱衣搜身。案件开庭吸引近百名记者，调解后每人获精神抚慰金；韩国政府道歉，中国外交部照会。", impact:"劳动尊严、性别与外资企业管理问题进入全国新闻。", source:"cases/case-wu-xue-56-female-workers-search.md", status:"国际影响主要据简介材料" },
  { id:"2001-firm", year:2001, month:6, category:"event", title:"重庆立太律师事务所设立", short:"维权实践形成组织载体", summary:"周立太在重庆设立自己的律师事务所，后在多地开设分所。", impact:"个体代理实践开始机构化，也带来更高的运营与欠费压力。", source:"events/event-zhou-litai-found-litai-firm.md", status:"日期明确" },
  { id:"2001-black-lawyer", year:2001, month:12.6, category:"media", title:"“黑律师”风波", short:"从维权律师到非法执业争议", summary:"龙岗区司法局责令周立太停止在深圳从事律师业务；《南方都市报》以“周立太是黑律师？”框架报道。", impact:"媒体叙事从弱者代理人转向执业合法性与跨地执业边界。", source:"sources/media/media-report-0006.md", status:"报道与自述材料并列", chains:["media"] },
  { id:"2001-stop-notice", year:2001, month:12.7, category:"policy", title:"责令停止执业通知", short:"地方执业管理限制跨地办案", summary:"龙岗区司法局发出《关于责令停止非法从事律师业务的通知》，周立太随后起诉。", impact:"案件维权与律师管理制度发生正面冲突。", source:"laws-and-policies/law-notice-stop-zhou-litai-practice-2001.md", status:"具体文号待考" },
  { id:"2001-occupational-law", year:2001, month:10, category:"policy", title:"《职业病防治法》通过", short:"职业病损害获得国家法律框架", summary:"全国人大常委会通过职业病防治法，为职业病预防、诊断、工伤待遇之外的损害赔偿等争议提供法律基础。", impact:"此后骆世林、刘忠斌等职业病案件得以把工伤待遇与民事赔偿是否并行带入诉讼。", source:"laws-and-policies/law-occupational-disease-prevention-law.md", status:"法律节点明确；本馆主要关注其在个案中的适用" },

  { id:"2002-government-suit", year:2002, month:5.5, category:"case", title:"诉重庆市政府不履职案", short:"抽象行政行为不可诉的救济真空", summary:"周立太申请撤销排除养老保险争议受理的 79 号文，政府未答复后起诉；法院以抽象行政行为等理由不予受理。", impact:"制度文件可能直接影响权利，却难以成为当时行政诉讼的对象。", source:"cases/case-zhou-litai-vs-chongqing-gov.md", status:"年份页整理" },
  { id:"2002-brand", year:2002, month:11, category:"media", title:"《新周刊》“个人品牌”叙事", short:"姓名被估值 1000 万元", summary:"《新周刊》将周立太列为“正在成长的个人品牌”。他回应：出名是因为“断手的悲哀”。", impact:"媒体开始把制度型案件压缩为强烈的个人符号。", source:"events/event-zhou-litai-brand-value-2002.md", status:"报道事实与回应可追溯" },
  { id:"2002-shanghai-dual", year:2002, month:7, category:"policy", title:"上海外来人员综合保险双轨制", short:"户籍差别制度化", summary:"外来从业人员综合保险办法与 58 号通知共同形成外来工与本地职工不同的社会保险体系。", impact:"胡庆旺、万菊生案所呈现的待遇差异获得持续制度背景。", source:"laws-and-policies/law-shanghai-migrant-workers-insurance.md", status:"年份页综合" },

  { id:"2003-liu-contract", year:2003, month:5, category:"case", title:"刘朝正风险代理案前因", short:"胜诉后拒付律师费的争议开始", summary:"刘朝正工伤案通过风险代理获得赔偿，后来拒付律师费并离开，成为 2004 年“律师状告农民工”的直接前因。", impact:"公益形象、商业合同与当事人诚信第一次大规模冲突。", source:"cases/case-litai-vs-liu-chaozheng-fee.md", status:"日期链据年份页与媒体页" },
  { id:"2003-luo-shilin", year:2003, month:9, category:"case", title:"骆世林职业病双赔案启动", short:"职业病民事赔偿与工伤待遇并行", summary:"骆世林在惠州务工并暴露于职业危害，此后形成跨越多年的职业病认定与双赔争议。", impact:"“双赔”从交通事故延伸到职业病侵权与工伤保障。", source:"cases/case-luo-shilin-occupational-disease.md", status:"年份精度" },

  { id:"2004-work-injury-reg", year:2004, month:1, category:"policy", title:"《工伤保险条例》施行", short:"全国工伤保险进入行政法规阶段", summary:"国务院《工伤保险条例》施行，统一工伤认定、待遇与基金责任框架。", impact:"周立太早期深圳个案所暴露的问题，进入更系统的全国制度环境。", source:"laws-and-policies/law-work-injury-insurance-reg-2004.md", status:"法规日期明确" },
  { id:"2004-sues-client", year:2004, month:3, category:"event", title:"“周立太状告农民工”", short:"代理人开始向委托人追讨律师费", summary:"刘朝正获赔后拒付风险代理费，周立太起诉委托人。事件引发全国争议：维权律师能否、应否向农民工收费。", impact:"风险代理从解决法律服务门槛的工具，变成媒体审视的道德困境。", source:"events/event-zhou-litai-sues-client-2004.md", status:"多家媒体连续报道" },
  { id:"2004-cctv-struggle", year:2004, month:6, category:"media", title:"CCTV《纪事·挣扎》", short:"英雄叙事转向制度与经营困境", summary:"上下两集纪录片跟拍周立太的执业生活，把道德期待、经济压力、政府关系与当事人欠费放在同一画面中。", impact:"“民工律师”不再只是胜诉英雄，而成为被多重结构夹住的行动者。", source:"sources/media/video-jishi.md", status:"节目转写未经人工校对", image:"../../数据层/text/blog/“我将减少代理农民工维权案”—律师…/img_4d30d7bd.jpg", chains:["media"] },
  { id:"2004-news-room", year:2004, month:7, category:"media", title:"《新闻会客厅：民工律师告民工》", short:"“我不是神，也不是雷锋”", summary:"周立太在央视回应收费争议，强调律师职业与合同责任。", impact:"媒体将他从道德化的“保护神”叙事拉回职业服务与生存逻辑。", source:"sources/media/video-xinwen-huiketing.md", status:"节目转写未经人工校对" },
  { id:"2004-chongqing-211", year:2004, month:9, category:"policy", title:"重庆 211 号文“补差”口径", short:"地方限制双赔", summary:"重庆地方文件对交通事故与工伤待遇采取“补差”处理，成为此后七年持续争议的政策节点。", impact:"全国性法律框架在地方执行中被重新解释。", source:"laws-and-policies/law-chongqing-notice-211.md", status:"年份页与主题页综合" },

  { id:"2005-media-dilemma", year:2005, month:2, category:"media", title:"中国青年报《维权的窘境》", short:"政府、工会、当事人的多重冲突", summary:"深度报道同时呈现周立太、政府官员、工会与当事人的不同评价，淡化单一英雄框架。", impact:"媒体开始把个体困境解释为制度、组织与市场共同造成的问题。", source:"sources/media/media-report-0039.md", status:"媒体页认为立场相对平衡" },
  { id:"2005-public-figure", year:2005, month:12, category:"event", title:"公共人物化", short:"年度人物与高校演讲", summary:"周立太被列入年度新闻人物，并受邀在高校演讲。", impact:"个案代理人转化为讨论农民工与法律制度的公共发言者。", source:"years/year-2005.md", status:"年份页综合" },

  { id:"2006-civil-service", year:2006, month:11, category:"media", title:"“周立太现象”进入公务员考试", short:"个案实践成为公共政策考题", summary:"国家公务员考试申论材料使用“周立太现象”，将农民工维权、法律服务与制度责任纳入公共治理讨论。", impact:"媒体化的人物符号进一步进入国家考试与政策语言。", source:"events/event-2006-civil-service-essay.md", status:"年份明确" },
  { id:"2006-spc-reply", year:2006, month:12, category:"policy", title:"最高法工伤与第三人侵权复函", short:"双赔争议获得司法口径", summary:"最高法相关复函成为交通事故侵权赔偿与工伤待遇能否并行的重要依据，后来也引发“复函是否属于司法解释”的争议。", impact:"双赔从地方个案推进到中央司法适用层面。", source:"laws-and-policies/law-spc-reply-2006-xingta-12.md", status:"文件效力层级仍是后续争点" },

  { id:"2007-media-dilemma", year:2007, month:8.9, category:"media", title:"“民工之过”与“失信之痛”", short:"风险代理危机成为报道中心", summary:"《南方周末》、新华社等集中报道律师费欠付、律所负债与风险代理困境；叙事从维权成就转向委托人失信和模式不可持续。", impact:"媒体关注度仍高，但框架发生明显转向。", source:"sources/media/media-report-0015.md", status:"多篇报道并置", chains:["media"] },
  { id:"2007-arbitration-law", year:2007, month:12, category:"policy", title:"《劳动争议调解仲裁法》通过", short:"劳动争议程序全国重构", summary:"法律建立新的调解仲裁框架，并于 2008 年施行。", impact:"早期李启兵案暴露的仲裁入口问题进入更完整的全国程序法体系。", source:"laws-and-policies/law-labor-dispute-arbitration-2007.md", status:"法律日期明确" },
  { id:"2007-interview", year:2007, month:12.6, category:"media", title:"《农民工维权为什么这样难》", short:"周立太提出制度修补建议", summary:"《南方周末》长访谈让周立太完整表达风险代理、劳动仲裁与 NGO 模式等建议，同时缺少社保局和法院回应。", impact:"媒体从人物命运进一步走向机制讨论。", source:"sources/media/media-report-0009.md", status:"媒体页已标注视角局限" },

  { id:"2008-labor-contract-law", year:2008, month:1, category:"policy", title:"《劳动合同法》施行", short:"用工关系进入新法律阶段", summary:"劳动合同书面化、无固定期限合同与劳务派遣等规则重塑劳资关系，也带来新的规避与适用争议。", impact:"时间线的制度焦点逐步从工伤赔偿扩展到劳动关系本身。", source:"laws-and-policies/law-labor-contract-law-2008.md", status:"法律日期明确" },
  { id:"2008-citizen-standard", year:2008, month:7.5, category:"policy", title:"深圳交通事故赔偿“市民待遇”", short:"农民工不再只按农村标准计赔", summary:"深圳中院发布道路交通事故赔偿指导意见，规定符合条件的农民工可按城镇居民标准计算赔偿。", impact:"从徐昌文双赔案与户籍待遇争议出发，司法口径开始纠正“同命不同价”。", source:"events/event-shenzhen-court-migrant-citizen-treatment-2008.md", status:"媒体报道与事件页可追溯", chains:["double","household"] },
  { id:"2008-reduce-attention", year:2008, month:10, category:"media", title:"媒体框架转向制度回响", short:"从人物奇观到赔偿规则", summary:"报道开始更多讨论市民待遇、双赔与劳动合同制度，而不只聚焦周立太个人。", impact:"个人品牌仍在，但制度性语言逐步占据报道中心。", source:"synthesis/moc-media-coverage.md", status:"综合判断" },

  { id:"2009-anti-mafia", year:2009, month:10, category:"case", title:"重庆打黑中的辩护权争议", short:"李义案与律师执业边界", summary:"周立太代理涉黑案件并提出“打黑不应运动化、扩大化”的观点，遭遇舆论压力。", impact:"时间线从劳工法扩展到刑事辩护权与律师职业独立。", source:"cases/case-li-yi-mafia-organization.md", status:"日期存在 10 月 14／15 日两版口径" },
  { id:"2009-news11", year:2009, month:12, category:"media", title:"CCTV《新闻 1+1》讨论律师“造假门”", short:"辩护律师被置于公共审判", summary:"节目把重庆打黑、李庄案与律师执业边界放在全国舆论场中讨论。", impact:"媒体框架从民工律师转向政治化的辩护角色。", source:"sources/media/video-xinwen-1jia1.md", status:"节目转写未经人工校对" },
  { id:"2009-biography", year:2009, month:10, category:"event", title:"《从底层滚出来》出版", short:"个人经历被整理为完整传记", summary:"陈文定所著传记出版，系统叙述周立太从农村、自学法律到代理农民工案件的经历。", impact:"此后媒体与 Wiki 的个人时间线大量以该书为基础。", source:"sources/books/book-cong-diceng-gun-chulai.md", status:"出版信息明确" },
  { id:"2010-hand-value", year:2010, month:6, category:"media", title:"“一双手价值 342 万元”报道", short:"媒体用赔偿额量化制度变化", summary:"媒体以“一双手的价格”回看赔偿标准，从 11 万元到 342 万元描述深圳工伤赔偿的增长。", impact:"赔偿金额成为理解劳动价值与制度变化的直观刻度。", source:"themes/theme-hand-compensation-standard.md", status:"342 万元为媒体口径，与刘涛案 158 万元自述口径不同，均待裁判文书核实" },

  { id:"2010-return-shenzhen", year:2010, month:1.5, category:"event", title:"公开回到深圳讲座", short:"被逐后首次公开回深", summary:"周立太在深圳劳务工博物馆讲座，媒体将其描述为离开深圳后的公开回归。", impact:"维权实践开始作为深圳劳工历史被回顾。", source:"events/event-shenzhen-labor-museum-lecture-2010.md", status:"年份页明确" },
  { id:"2010-media-profile", year:2010, month:1.8, category:"media", title:"“底层滚出来的律师”", short:"传记式回望与困境叙事并行", summary:"中国青年报、新京报连续报道，以“被套牢”“底层滚出来”为框架，回看其个人经历和风险代理困境。", impact:"媒体从即时争议进入带历史纵深的人物总结。", source:"sources/media/media-report-0020.md", status:"报道页已收录" },
  { id:"2010-disabled-labor", year:2010, month:12, category:"event", title:"托克逊智障包身工事件", short:"残疾劳动者权利真空曝光", summary:"媒体曝光智障劳动者遭强迫劳动。周立太仅转载报道，并未参与案件。", impact:"劳工权益议题从工伤赔偿扩展到强迫劳动、残疾与监护漏洞。", source:"events/event-2010-toksun-disabled-workers-forced-labor.md", status:"须明确周立太未参与" },

  { id:"2011-social-insurance-law", year:2011, month:7, category:"policy", title:"《社会保险法》施行", short:"先行支付写入国家法律", summary:"法律确立工伤保险基金先行支付等制度，为用人单位拒付或逃逸后的救济提供国家层面依据。", impact:"深圳陈用刚案的地方垫付实践，进入全国法律框架。", source:"laws-and-policies/law-social-insurance-law-advance-payment.md", status:"Wiki 法律页目前为 stub", chains:["advance"] },
  { id:"2011-double-correction", year:2011, month:12, category:"policy", title:"重庆高院纠正“补差”口径", short:"七年地方抵抗结束", summary:"重庆高院以 00175 号答复纠正此前交通事故与工伤待遇“补差”的地方立场。", impact:"2004 年以来的双赔地方限制在司法系统内部完成转向。", source:"years/year-2011.md", status:"据 DC-0004 与年份页", chains:["double"] },
  { id:"2011-overage-rule", year:2011, month:9, category:"policy", title:"重庆超龄人员参保条件文件", short:"地方文件设置参保门槛", summary:"重庆 270／272 号相关文件对超龄人员参保设置户籍、时间等条件，成为张先堂等案件的争点。", impact:"“达到退休年龄”逐渐成为劳动与社保保护的新边界。", source:"laws-and-policies/law-chongqing-over-age-insurance-doc-270-2011.md", status:"文号前缀仍待核", chains:["overage"] },
  { id:"2011-client-lawsuit", year:2011, month:4, category:"event", title:"再次起诉拒付费委托人", short:"51 名学生欠付律师费", summary:"招生骗局案学生胜诉后拒付 62.5 万元律师费，周立太再次起诉委托人。", impact:"2004 年的风险代理困境并非孤例，而成为长期结构问题。", source:"sources/media/video-xinwen-diaocha.md", status:"节目转写未经人工校对" },

  { id:"2012-rule-22", year:2012, month:2.5, category:"policy", title:"重庆工伤保险实施办法", short:"通知还是规章？", summary:"渝府发〔2012〕22 号以通知形式发布，其限制伤残等级变化后待遇的条款成为刘忠斌案争点。", impact:"争议从具体待遇延伸到规范性文件的制定形式与合法性。", source:"laws-and-policies/law-chongqing-work-injury-measures-2012.md", status:"周立太观点与文件事实应区分" },
  { id:"2012-rule-185", year:2012, month:8.9, category:"policy", title:"尘肺复查需劳动关系证明", short:"185 号文埋下鉴定障碍", summary:"重庆四部门文件要求复查鉴定提供劳动关系证明。煤矿关闭后，工人往往无法取得材料。", impact:"2019—2021 年骆世海案中的程序障碍由此形成。", source:"years/year-2012.md", status:"据 CS-0019", chains:["dust"] },
  { id:"2012-reduce-cases", year:2012, month:9.9, category:"media", title:"“我将减少代理农民工维权案”", short:"从英雄到转型者", summary:"人民网专访报道周立太因欠费、败诉率上升与律所经营压力，决定大幅减少代理农民工案件。", impact:"媒体将 1996 年以来的维权道路叙述为一个阶段的结束。", source:"sources/media/media-report-0030.md", status:"报道与博客转载可互证", image:"../../数据层/text/blog/“我将减少代理农民工维权案”—律师…/img_3472b37b.jpg", chains:["media"] },
  { id:"2012-close-office", year:2012, month:10.5, category:"event", title:"关闭深圳分所", short:"组织规模收缩", summary:"深圳分所正式关闭；Wiki 提醒“离开深圳”的媒体叙事早在 2007 年已出现，与正式关所有时间差。", impact:"个人实践从沿海集中维权转向重庆与制度性案件。", source:"events/event-zhou-litai-close-shenzhen-office-2012.md", status:"具体日期待核" },
  { id:"2012-cleanup", year:2012, month:11, category:"policy", title:"国务院清理交通事故赔偿限额", short:"“同命不同价”的制度根源被削减", summary:"国务院修改、废止部分行政法规，删除道路与铁路交通事故条例中的部分赔偿限额条款。", impact:"个案中反复出现的身份差异与限额赔偿，开始在国家行政法规层面被清理。", source:"laws-and-policies/law-state-council-regulation-cleanup-2012.md", status:"决定于 2013 年 1 月 1 日起施行" },

  { id:"2013-pi-daming", year:2013, month:8.6, category:"case", title:"皮大明超龄工亡认定案", short:"退休年龄是否切断工伤保护", summary:"朱世琼在深圳工作中死亡，人社部门以其达到法定退休年龄为由不予受理工伤认定。", impact:"案件直接挑战“超龄即不受劳动法保护”的行政实践。", source:"cases/case-pi-daming-over-age-work-injury.md", status:"案件页可追溯", chains:["overage"] },
  { id:"2013-fund-investment", year:2013, month:5, category:"event", title:"深圳社保基金投资争议", short:"社保基金安全与透明度", summary:"举报与官方回应披露深圳曾动用社保基金投资多个项目，争议聚焦基金性质、经商禁令与财务公开。", impact:"工伤保障讨论从个体赔付扩展到基金治理。", source:"events/event-shenzhen-social-insurance-fund.md", status:"年份页综合媒体材料" },
  { id:"2013-tang-lan", year:2013, month:1.9, category:"case", title:"唐兰房屋案最高法再审", short:"区分合同成立与合同有效", summary:"最高法再审撤销此前判决并判令房屋返还，确立合同是否成立与是否有效的区分。", impact:"显示周立太后期执业范围已超出劳工与工伤案件。", source:"cases/case-tang-lan-property-fraud.md", status:"年份页明确" },
  { id:"2013-zhou-hanjun", year:2013, month:6, category:"case", title:"周含军案再遇“补差”", short:"地方判决拒绝适用最高法双赔复函", summary:"周含军之妻因工出差遇交通事故死亡。四川宜宾两级法院依地方实施意见只支持工伤待遇差额，并以复函并非司法解释为由不采双赔口径。", impact:"显示中央复函并未自动统一地方裁判，双赔仍需在不同地区反复争取。", source:"cases/case-zhou-hanjun-work-injury.md", status:"主要据周立太博文，未附完整裁判文书" },
  { id:"2013-luo-shilin-result", year:2013, month:9.8, category:"case", title:"骆世林职业病双赔二审改判", short:"工伤待遇之外再获民事赔偿", summary:"惠州中院二审改判用人单位支付残疾赔偿金等费用 71 万余元，回应职业病工伤待遇与民事侵权赔偿能否并行的争议。", impact:"“双赔”从交通事故推进到职业病损害，强调企业预防职业危害的独立责任。", source:"cases/case-luo-shilin-occupational-disease.md", status:"金额与日期据案件页，页面仍标记未复核" },

  { id:"2014-luo-start", year:2014, month:6, category:"case", title:"骆世海尘肺案起点", short:"煤矿关闭后的职业病复查困境", summary:"骆世海初诊一期尘肺并获工伤认定，之后病情加重；煤矿关闭使其难以再次证明劳动关系。", impact:"个体病情变化最终暴露出复查鉴定文件的制度障碍。", source:"cases/case-luo-shihai-black-lung.md", status:"主要据典型案例材料", chains:["dust"] },
  { id:"2014-liu-zhongbin", year:2014, month:11.5, category:"case", title:"刘忠斌职业病双赔争议", short:"内部复函实质决定裁判", summary:"重庆高院民一庭内部复函主张民事赔偿与工伤赔偿“补差”，下级法院据此驳回上诉。", impact:"不公开的内部请示答复如何影响权利，成为新的程序正义议题。", source:"cases/case-liu-zhongbin-civil-compensation.md", status:"周立太批评与裁判事实应区分" },
  { id:"2014-team-roster", year:2014, month:6.2, category:"event", title:"公布十八年团队名册", short:"150 余人参与过维权实践", summary:"周立太回顾 1996 年以来共事的律师与工作人员，并称多数已经离开。", impact:"个人英雄叙事背后，出现一个不断流动和耗损的法律服务团队。", source:"events/event-2014-zhou-litai-team-roster.md", status:"实名名册不在消费层展开" },

  { id:"2015-pi-result", year:2015, month:3.7, category:"case", title:"皮大明案终审胜诉", short:"超龄农民仍受工伤规范保护", summary:"深圳中院撤销不予受理决定，明确达到法定退休年龄的进城务工农民仍有劳动权利，应受工伤保险规范保护。", impact:"司法裁判为超龄劳动者保障提供了清晰反例。", source:"cases/case-pi-daming-over-age-work-injury.md", status:"裁判日期明确", chains:["overage"] },
  { id:"2015-wu-ximei-start", year:2015, month:10.9, category:"case", title:"伍锡梅先行支付案起点", short:"工亡后企业注销，判决无法执行", summary:"江福坤工地突发疾病死亡，之后被认定工亡并获判赔；企业注销使赔偿无法执行，家属转向工伤基金先行支付。", impact:"检验《社会保险法》先行支付制度能否真正兑现。", source:"cases/case-wu-ximei-nanan-social-insurance.md", status:"完整链条跨 2015—2024", chains:["advance"] },
  { id:"2015-thepaper", year:2015, month:5, category:"media", title:"澎湃“五一”回访", short:"二十年维权史与结构变化", summary:"报道以周立太重访深圳旧居开篇，回看 20 年维权生涯，同时指出 2012 年后企业参保率提高等结构变化。", impact:"个人回忆与制度进展第一次在同一篇回访中被明确对照。", source:"sources/media/media-report-0010.md", status:"媒体页已标注总结性质", chains:["media"] },
  { id:"2015-wang-bing", year:2015, month:8, category:"case", title:"王兵案再次实现交通事故与工伤双赔", short:"地方纠正后，双赔在重庆落地", summary:"王兵之妻因客车爆胎事故死亡，在获得交通事故赔偿后继续主张工伤保险待遇并获支持。", impact:"从 2004 年地方“补差”限制到 2011 年纠正，再到具体赔付，双赔经历了制度反复后的落地检验。", source:"cases/case-wang-bing-double-compensation.md", status:"案件页可追溯" },

  { id:"2016-twenty-years", year:2016, month:5, category:"event", title:"“民工维权之路二十年”", short:"以 1996 年 5 月 1 日为自我叙事原点", summary:"周立太发表《二十年前的今天》，把第一次赴深圳代理徐某案定义为二十年民工维权道路的起点。", impact:"个人记忆主动把分散案件整理为一条历史线。", source:"events/event-2016-zhou-litai-twenty-year-essay.md", status:"周立太自述口径" },
  { id:"2016-zhang-xiantang", year:2016, month:10.5, category:"case", title:"张先堂超龄参保案", short:"诉讼附带审查地方参保文件", summary:"张先堂起诉人社部门，并请求附带审查限制超龄人员参保的地方文件。", impact:"超龄保护从工伤认定扩展到养老保险参保权。", source:"cases/case-zhang-xiantang-over-age-insurance.md", status:"开庭日期与延期情况据年份页", chains:["overage"] },

  { id:"2017-coal-closure", year:2017, month:6, category:"event", title:"重庆煤矿集中关闭的后果显现", short:"劳动关系证明随企业一起消失", summary:"2012—2017 年间大量私营煤矿关闭。对尘肺矿工而言，复查时要求出具劳动关系证明变得近乎不可能。", impact:"产业政策、企业退出与职业病保障形成意外联动。", source:"years/year-2017.md", status:"年份页为制度背景" },

  { id:"2018-luo-shangjun", year:2018, month:6, category:"case", title:"罗尚军劳动关系与工伤案", short:"程序反复的“马拉松诉讼”", summary:"罗尚军采油工作中突发疾病后死亡，案件经历仲裁、一审、上诉、重审与再审，最终获得赔偿。", impact:"劳动关系确认成为工伤认定前的高成本门槛。", source:"cases/case-luo-shangjun-labor-relation.md", status:"具体裁判日期仍需在案件页逐项核对" },

  { id:"2019-luo-blocked", year:2019, month:8, category:"case", title:"骆世海复查鉴定被挡", short:"煤矿关闭后无法再证劳动关系", summary:"骆世海被诊断为二期尘肺，申请复查鉴定时被要求提供劳动关系证明，因煤矿关闭而无法办理。", impact:"2012 年文件设置的前置条件转化为现实中的权利障碍。", source:"cases/case-luo-shihai-black-lung.md", status:"案件材料可追溯", chains:["dust"] },
  { id:"2019-retrospect", year:2019, month:2.8, category:"media", title:"媒体回看“周立太告状”", short:"十五年后重述风险代理冲突", summary:"找法网回顾 1996 年首案与 2004 年状告委托人，再次把焦点放在欠费、失信与风险代理。", impact:"早期争议成为稳定的媒体记忆框架。", source:"sources/media/media-report-0014.md", status:"回顾性报道，非裁判文书", chains:["media"] },

  { id:"2020-rule-303", year:2020, month:10.8, category:"policy", title:"303 号文再设复查限制", short:"保险关系终止，不再复查鉴定", summary:"重庆市人社局文件规定工伤保险关系已终止的不再进行复查鉴定，与 2012 年劳动关系证明要求叠加。", impact:"煤矿关闭后的尘肺矿工遭遇双重程序门槛。", source:"years/year-2020.md", status:"文件条款据典型案例材料", chains:["dust"] },
  { id:"2020-supervision", year:2020, month:6, category:"event", title:"伍锡梅案转向人大监督", short:"从个案诉讼追到规范性文件", summary:"法院不支持先行支付请求后，周立太申请人大监督，要求纠正重庆高院限制工伤基金垫付的指导意见。", impact:"维权策略从起诉行政机关转向监督法院规范性文件。", source:"cases/case-zhou-litai-apply-npc-wu-ximei.md", status:"年份精度", chains:["advance"] },

  { id:"2021-article24-repealed", year:2021, month:2, category:"policy", title:"重庆高院废止第 24 条", short:"人大监督纠正先行支付限制", summary:"重庆市人大监督后，重庆高院废止工伤行政案件指导意见第 24 条，移除与《社会保险法》先行支付义务冲突的地方限制。", impact:"个案通过人大监督改变法院系统内部规范。", source:"cases/case-zhou-litai-apply-npc-wu-ximei.md", status:"通知日期与文号可追溯", chains:["advance"] },
  { id:"2021-luo-review", year:2021, month:8, category:"case", title:"尘肺鉴定障碍进入司法审查", short:"地方联合文件被否定", summary:"骆世海起诉人社部门不履行法定职责，年份页记载法院确认相关文件条款违法。", impact:"规范性文件附带审查成为纠正职业病程序障碍的路径。", source:"cases/case-luo-shihai-black-lung.md", status:"裁判层级与具体表述需回看案卷", chains:["dust"] },
  { id:"2021-archive", year:2021, month:9, category:"event", title:"周立太律师档案馆设立", short:"维权实践开始实体化保存", summary:"周立太在开州设立律师档案馆，集中保存案件卷宗、媒体报道、照片和影像资料。", impact:"案件材料从执业工具转变为公共记忆基础设施。", source:"organizations/org-zhou-litai-law-museum.md", status:"简介材料" },

  { id:"2022-museum", year:2022, month:9, category:"event", title:"档案馆迁回重庆并更名博物馆", short:"二十六年材料进入展示语境", summary:"档案馆迁至重庆江北，更名为周立太律师博物馆，继续收藏案件卷宗与媒体资料。", impact:"农民工维权史被明确作为可保存、可展示的历史。", source:"organizations/org-zhou-litai-law-museum.md", status:"年份页已收录" },

  { id:"2023-reform-letter", year:2023, month:2.8, category:"event", title:"以罗尚军案第三次致信司法部", short:"用马拉松诉讼样本推动修法", summary:"周立太以罗尚军案漫长的劳动关系确认与工伤程序为例，再次向司法部提出修改制度的主张。", impact:"个案代理继续被转化为立法与程序改革建议。", source:"years/year-2023.md", status:"周立太自述，未附函件原文" },

  { id:"2024-wu-ximei-paid", year:2024, month:6, category:"case", title:"伍锡梅案先行支付落地", short:"九年后完成制度闭环", summary:"南岸区社保局一次性支付 130 余万元，死者父母及子女按月领取抚恤金。", impact:"从 2015 年工亡、2018 年申请、2021 年废止限制文件到 2024 年赔付，先行支付终于从法律条文变成实际救济。", source:"cases/case-wu-ximei-nanan-social-insurance.md", status:"金额据年份页", chains:["advance"] },

  { id:"2025-forty-years", year:2025, month:6, category:"media", title:"“四十年的回顾”", short:"个人执业史成为制度变迁注脚", summary:"周立太在微博回顾四十年执业历程，并将伍锡梅案列为代表案件之一。", impact:"自我叙事从二十年维权转向四十年法律实践与公共记忆。", source:"years/year-2025.md", status:"自述性社交媒体材料" },

  { id:"2026-digital-archive", year:2026, month:8, category:"event", title:"时代档案馆", short:"从实体卷宗到可检索知识网络", summary:"标准化数据包、视频转写与知识页面持续建设，1996—2026 年份页被连接为可追溯的知识网络。", impact:"本时间线正是这一资料工程的消费层入口；它展示关系，但不替代原始证据与 Wiki 核验。", source:"years/year-2026.md", status:"当前建设状态" }
];
