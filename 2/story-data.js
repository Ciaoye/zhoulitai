/* 自动生成：scripts/build_story_js.py，勿手改。数据源 story-data-v2.json + city-coords.json */
const STORY_DATA = {
  "schemaVersion": 3,
  "generatedAt": "2026-08-08T01:13:34.525961",
  "warning": "本数据集由 Agent 从 wiki 页面提取、经主线程抽样校验。金额已分阶段但多来源冲突处并列标注未裁决；原籍/事故地/法院地四类地点已区分。所有事实公开前仍须回到 source_refs 复核。",
  "coverage": {
    "inventory": {
      "figures": 33,
      "injured_workers": 14,
      "died_workers": 12,
      "family_claimants": 7,
      "cases": 28,
      "cases_with_compensation": 13
    },
    "figure": {
      "with_body_parts": {
        "count": 13,
        "total": 33,
        "percent": 39.4
      },
      "with_disability_grade": {
        "count": 12,
        "total": 33,
        "percent": 36.4
      },
      "with_compensation": {
        "count": 16,
        "total": 33,
        "percent": 48.5
      },
      "with_origin": {
        "count": 24,
        "total": 33,
        "percent": 72.7
      },
      "with_accident_place": {
        "count": 11,
        "total": 33,
        "percent": 33.3
      },
      "represented_by_zhou": {
        "count": 30,
        "total": 33,
        "percent": 90.9
      }
    },
    "case": {
      "with_date": {
        "count": 25,
        "total": 28,
        "percent": 89.3
      },
      "with_compensation_events": {
        "count": 13,
        "total": 28,
        "percent": 46.4
      },
      "with_origin": {
        "count": 23,
        "total": 28,
        "percent": 82.1
      },
      "with_accident_place": {
        "count": 17,
        "total": 28,
        "percent": 60.7
      },
      "represented_by_zhou": {
        "count": 27,
        "total": 28,
        "percent": 96.4
      }
    },
    "sensitive": {
      "figures_contains_sensitive": 2,
      "figures_redacted": 2,
      "figures_cleared": 1
    }
  },
  "incidentCategoryCounts": {
    "岗位突发疾病猝死": 7,
    "职业病长期暴露": 7,
    "机器卷入挤压截肢": 6,
    "行政程序制度执行": 6,
    "其他": 2,
    "因工出差运输交通": 2,
    "上下班途中交通": 1,
    "坠落坠物高处": 1,
    "坠海溺水": 1,
    "触电": 1
  },
  "figures": [
    {
      "id": "person-wan-jusheng",
      "name": "万菊生",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人"
      ],
      "origin": "安徽省巢湖市柘皋镇红星大队小李村",
      "originCoord": {
        "lon": 117.87,
        "lat": 31.6,
        "label": "安徽巢湖"
      },
      "workCity": "上海",
      "workCoord": {
        "lon": 121.47,
        "lat": 31.23,
        "label": "上海"
      },
      "accidentDate": "2000-07-03",
      "accidentPlace": "上海浦东",
      "accidentCoord": {
        "lon": 121.47,
        "lat": 31.23,
        "label": "上海"
      },
      "injury": "右臂被印刷机卷入致截肢",
      "bodyParts": [
        "右臂"
      ],
      "lostParts": [
        "右臂"
      ],
      "disabilityGrade": "四级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "仲裁",
          "date": "2001-02",
          "amount": 68664,
          "note": "依沪劳保保发（2000）58号标准"
        },
        {
          "stage": "一审",
          "date": "2001-05",
          "amount": 98764,
          "note": ""
        },
        {
          "stage": "二审",
          "date": "2001",
          "amount": 150000,
          "note": "约15万，含厂方'人道主义'追加51,236元"
        }
      ],
      "totalCompensation": 150000,
      "representedByZhou": true,
      "caseIds": [
        "case-wan-jusheng-shanghai-amputation"
      ],
      "storyNotes": "与胡庆旺案对比揭示上海户籍歧视；'保机器还是保人'细节（手臂绞三小时无人敢毁机器救人）；请求额141.8万 vs 仲裁6.9万 vs 终审约15万；再审提请上海高院至今无答复",
      "sourceLocators": "DC-0002第九章（第2037-2308行）；DC-0001第五章（第1469-1679行）",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-wu-ximei",
      "name": "伍锡梅",
      "type": "family_claimant",
      "role": [
        "工亡者家属",
        "行政诉讼原告"
      ],
      "origin": "重庆市开州区（原开县）",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "2015-10-27",
        "cause": "其夫江福坤于2015-10-27在工地突发疾病，送医抢救当日死亡"
      },
      "compensation": [
        {
          "stage": "渝北区法院一审判决（企业赔偿）",
          "date": "2016-12-28",
          "amount": 1142318,
          "note": "判决企业赔偿1,142,318元（含丧葬费28,428+工亡补助金576,880+两子女抚恤金205,241+331,769）；2017-08-18执行终结，企业注销无财产可供执行"
        },
        {
          "stage": "五中院再审判决（社保垫付）",
          "date": "2021-12-21",
          "amount": null,
          "note": "判决南岸区社保局60天内作出垫付决定"
        },
        {
          "stage": "社保局实际赔付",
          "date": "约2022",
          "amount": 1300000,
          "note": "一次性赔付约130余万元，死者父母及子女按月领取抚恤金"
        }
      ],
      "totalCompensation": 1300000,
      "representedByZhou": true,
      "caseIds": [
        "case-wu-ximei-nanan-social-insurance"
      ],
      "storyNotes": "江福坤之妻；企业注销逃逸致判决无法执行，社保局以重庆高院第24条拒绝垫付；周立太启动人大监督程序，全国人大认定第24条违反《社会保险法》第41条，重庆高院2021-02-25以渝高法(2021)24号通知废止该条；检察院抗诉后五中院再审改判。隐私注意：子女姓名与身份证号见于卷宗，公开前须脱敏。",
      "sourceLocators": "CS-0020 全案；DC-0004 典型案例第十三项；CASE-0002 卷宗",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-he-shulin",
      "name": "何树林",
      "type": "died_worker",
      "role": [
        "农民工",
        "矽肺病患者",
        "工伤赔偿请求人"
      ],
      "origin": "重庆市万州区",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "温州",
      "workCoord": {
        "lon": 120.7,
        "lat": 28.0,
        "label": "温州"
      },
      "accidentDate": "",
      "accidentPlace": "温州市龙湾区永昌矿石研磨厂",
      "accidentCoord": {
        "lon": 120.82,
        "lat": 27.93,
        "label": "温州龙湾"
      },
      "injury": "矽肺病（尘肺）；1996—1999年务工期间患病，2004年初确诊，经诊断为二期、三期矽肺，完全丧失劳动能力",
      "bodyParts": [
        "肺"
      ],
      "lostParts": [],
      "disabilityGrade": "2—4级",
      "death": {
        "is_death": true,
        "date": "2006-11",
        "cause": "矽肺病（页面未明确记载直接死因）"
      },
      "compensation": [
        {
          "stage": "政府调解",
          "date": "2004",
          "amount": null,
          "note": "未做职业病诊断即补偿，金额几千至几万元不等"
        },
        {
          "stage": "仲裁",
          "date": "",
          "amount": 120000,
          "note": "裁决厂方支付12万—23万不等（每人不一）"
        },
        {
          "stage": "民事赔偿诉讼",
          "date": "",
          "amount": 0,
          "note": "龙湾区法院判决驳回民工诉求，温州中院维持，再审被驳回；全部败诉"
        }
      ],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-he-shulin-silicosis"
      ],
      "storyNotes": "2006年11月去世；该厂33名患病职工至2017年仅剩2人存活；周立太先后变更7次委托合同（当事人陆续死亡）；民事赔偿诉讼全部败诉；获赔最终金额因败诉无法确定",
      "sourceLocators": "REPORT-0031新华社专稿；BK-0094",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-feng-chengyang",
      "name": "冯成杨",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人"
      ],
      "origin": "贵州省贞丰县小屯乡尾酒村三组",
      "originCoord": {
        "lon": 105.65,
        "lat": 25.38,
        "label": "贵州贞丰"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1999-12-15",
      "accidentPlace": "深圳龙岗区坑梓镇",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "工作中被机器压伤双手",
      "bodyParts": [
        "双手"
      ],
      "lostParts": [],
      "disabilityGrade": "六级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "私了",
          "date": "2000-06-02",
          "amount": 26790,
          "note": "厂方一次性补偿（含补偿金21,440+工资补贴1,000+津贴1,200+护理费1,800+住宿750），解除劳动关系，放弃后续一切权利"
        },
        {
          "stage": "仲裁",
          "date": "2000-11-18",
          "amount": 0,
          "note": "驳回全部请求（超60天申诉时效）"
        },
        {
          "stage": "一审",
          "date": "2001-03-11",
          "amount": 0,
          "note": "驳回全部诉请"
        },
        {
          "stage": "二审",
          "date": "2001-07-26",
          "amount": 0,
          "note": "维持原判"
        }
      ],
      "totalCompensation": 26790,
      "representedByZhou": true,
      "caseIds": [
        "case-feng-chengyang-shenzhen-work-injury"
      ],
      "storyNotes": "周立太代理案件中唯一状告深圳市政府的工伤当事人；深圳副市长宋海2000年5月12日来访纪要致未参保工人告状无门；诉讼全部败诉，最终继续在深圳打工持六级伤残残疾证；出生年份两说（法院判决1977年、私了协议1975年，可能笔误）",
      "sourceLocators": "DC-0001第五章（第1247-1435行）；DC-0002第五章（第1219-1459行）",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-liu-zhongbin",
      "name": "刘忠斌",
      "type": "injured_worker",
      "role": [
        "当事人",
        "职业病工人",
        "尘肺病患者"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "巫山县",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "患煤工尘肺、伤残四级",
      "bodyParts": [
        "肺"
      ],
      "lostParts": [],
      "disabilityGrade": "四级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-liu-zhongbin-civil-compensation",
        "case-liu-zhongbin-disability-benefit"
      ],
      "storyNotes": "信息不足：stub页面，无金额记载；依《职业病防治法》第59条提起民事赔偿诉讼，同时就伤残补助金起诉巫山社保局，职业病双赔两条诉讼线",
      "sourceLocators": "BK-0530；BK-0568；BK-0591",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-liu-tao",
      "name": "刘涛",
      "type": "injured_worker",
      "role": [
        "当事人",
        "工伤赔偿请求人"
      ],
      "origin": "四川省乐山县",
      "originCoord": {
        "lon": 103.77,
        "lat": 29.55,
        "label": "四川乐山"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1998-07-21",
      "accidentPlace": "深圳福田区",
      "accidentCoord": {
        "lon": 114.05,
        "lat": 22.54,
        "label": "深圳福田"
      },
      "injury": "工作中双上臂被机器轧断",
      "bodyParts": [
        "双上臂"
      ],
      "lostParts": [
        "双上臂"
      ],
      "disabilityGrade": "一级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "终审",
          "date": "约2000",
          "amount": 1580000,
          "note": "约2000年终审，获伤残补助金及假肢更换费共158万元，创当时中国工伤赔偿之最"
        }
      ],
      "totalCompensation": 1580000,
      "representedByZhou": true,
      "caseIds": [
        "case-liu-tao-record-compensation"
      ],
      "storyNotes": "女工；时年31岁（生年不详）；该案提出工伤精神损失费诉求，被最高法判例选编收录，曾登央视新闻联播；各程序具体日期页面标注为推断",
      "sourceLocators": "CS-0006全案；DC-0004",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-liu-shengqing",
      "name": "刘胜青",
      "type": "family_claimant",
      "role": [
        "工亡职工家属",
        "工伤认定申请人"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "2019-08-06",
        "cause": "其夫郭小平于2019-08-06在山东茌平县木之家家具公司淋浴室冲洗油漆时触电身亡"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-liu-shengqing-work-death"
      ],
      "storyNotes": "死者郭小平之妻；其夫触电身亡后于2019年委托周立太代理工伤认定申请；案件涉及劳动关系确认争议（厂方答辩称不存在事实劳动关系），后续判决结果待从案卷OCR提取，无获赔金额记载。",
      "sourceLocators": "CASE-0004 全案卷宗",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-zhan-shanlin",
      "name": "占善林",
      "type": "died_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人（死者）"
      ],
      "origin": "江西省",
      "originCoord": {
        "lon": 115.86,
        "lat": 28.68,
        "label": "江西"
      },
      "workCity": "深圳（宝安区沙井）",
      "workCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "1998-09-13",
        "cause": "猝死（公安鉴定）；厂方主张系手淫所致，死亡原因与死亡方式关联待核"
      },
      "compensation": [
        {
          "stage": "民事赔偿二审终审与执行",
          "date": "约2001",
          "amount": 127173.6,
          "note": "历时约三年，家属获赔127,173.6元并执行完毕"
        }
      ],
      "totalCompensation": 127173.6,
      "representedByZhou": true,
      "caseIds": [
        "case-zhan-shanlin-work-death-disputed"
      ],
      "storyNotes": "工伤认定历经争议：厂方以\"手淫致死\"拒赔，法院依据《深圳经济特区工伤保险条例》认定因工死亡，判决指出\"手淫不违反法律禁止性规定\"；生年不详、具体江西籍贯信息有限；其妻胡桂仙作为赔偿请求人角色待独立建页。隐私注意：页面标注案件涉及个人死亡方式，公开表述须审慎、不猎奇。",
      "sourceLocators": "CS-0007 全案；DC-0004 典型案例第十项",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-zhou-hanjun",
      "name": "周含军",
      "type": "family_claimant",
      "role": [
        "当事人",
        "工伤家属"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "",
        "cause": "其妻因工出差发生交通事故身亡，经认定为因工死亡（死亡日期未载）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": false,
      "caseIds": [
        "case-zhou-hanjun-work-injury"
      ],
      "storyNotes": "其妻因工出差交通事故身亡并获因工死亡认定；其主张全额工伤保险待遇，宜宾市人社局按四川省《工伤保险条例实施意见》只赔差额，行政诉讼经翠屏区法院、宜宾中院两审败诉；宜宾中院在判决中否定最高法(2006)行他12号复函；页面未载原籍、死亡日期与具体金额。",
      "sourceLocators": "BK-0278 正文第1—6段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-zhou-yongde",
      "name": "周永德",
      "type": "died_worker",
      "role": [
        "当事人",
        "超龄劳动者"
      ],
      "origin": "重庆梁平",
      "originCoord": {
        "lon": 107.77,
        "lat": 30.68,
        "label": "重庆梁平"
      },
      "workCity": "深圳（横岗）",
      "workCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2015-05-09",
        "cause": "工作岗位猝死（法医确认）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-zhou-yongde-sudden-death"
      ],
      "storyNotes": "62岁超龄保安，生年不详；厂方以超龄为由拒绝赔偿并拒付火化费，遗体在殡仪馆滞留一个多月后于2015-06-20由殡仪馆免除费用火化；家属已委托周立太向横岗社保站申请工伤认定，结果未载。隐私注意：影像与租住细节按 §7 从略。",
      "sourceLocators": "BK-0021 正文第9—13段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-zhang-lizhen",
      "name": "张礼洁",
      "type": "injured_worker",
      "role": [
        "委托人",
        "工伤当事人"
      ],
      "origin": "重庆巴南区（按§7脱敏）",
      "originCoord": {
        "lon": 106.54,
        "lat": 29.39,
        "label": "重庆巴南"
      },
      "workCity": "重庆",
      "workCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "injury": "工作中摔伤致高位截瘫",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "工伤赔偿（获赔）",
          "date": "",
          "amount": 400000,
          "note": "获赔医疗费等约40万元"
        }
      ],
      "totalCompensation": 400000,
      "representedByZhou": true,
      "caseIds": [],
      "storyNotes": "已按§7脱敏（姓名与住址脱敏为'张某，巴南区人'，原页面记张礼洁）；2002年受聘重庆华泰建设公司；获赔约40万后拒不按合同支付律师费并向记者泼尿；伤情部位页面未明确（高位截瘫），body_parts留空；页面无关联案件id",
      "sourceLocators": "BK-0625正文第15—21段；BK-0529正文第4—6段",
      "privacyStatus": "redacted"
    },
    {
      "id": "person-peng-gangzhong",
      "name": "彭刚中",
      "type": "injured_worker",
      "role": [
        "当事人",
        "工伤赔偿请求人"
      ],
      "origin": "四川省资中县",
      "originCoord": {
        "lon": 104.85,
        "lat": 29.77,
        "label": "四川资中"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1996-08-29",
      "accidentPlace": "深圳宝安区石岩镇",
      "accidentCoord": {
        "lon": 113.88,
        "lat": 22.55,
        "label": "深圳宝安"
      },
      "injury": "工作中因机器故障致左上肢被轧断（左臂截肢）",
      "bodyParts": [
        "左上肢"
      ],
      "lostParts": [
        "左上肢"
      ],
      "disabilityGrade": "五级（深圳地方标准；CS-0003记四级，两说）",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "一审",
          "date": "",
          "amount": 172320.75,
          "note": "宝安区法院判决：一次性补偿金56,520.75+继续医疗费15,000+假肢安装费100,800（每4年换1次共9次）=172,320.75元"
        },
        {
          "stage": "二审",
          "date": "",
          "amount": 172320.75,
          "note": "深圳市中级法院维持原判"
        }
      ],
      "totalCompensation": 172321,
      "representedByZhou": true,
      "caseIds": [
        "case-peng-gangzhong-amputation"
      ],
      "storyNotes": "周立太执业第一个工伤客户、风险代理首案；获赔约17.2万后逃费失联（第一个消失的当事人）；获赔金额各来源约17.2万/17.8万两说，此处按DC-0002明细17.2万余；伤残等级五级/四级两说；事故年份CS-0003记1995年10月与1996-08-29两说",
      "sourceLocators": "CS-0003全案；DC-0002第二章；REPORT-0039；DC-0004",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-xu-kezhao",
      "name": "徐克钊",
      "type": "family_claimant",
      "role": [
        "委托人"
      ],
      "origin": "重庆市开县南门镇",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "1996-04-30",
        "cause": "其子徐昌文、儿媳赵碧于1996-04-30在深圳龙岗下班途中遭香港货柜车撞击身亡"
      },
      "compensation": [
        {
          "stage": "交通事故赔偿",
          "date": "",
          "amount": 130000,
          "note": "交通事故约13万元（其子徐昌文、儿媳赵碧双赔案）"
        },
        {
          "stage": "工伤赔偿",
          "date": "",
          "amount": 200000,
          "note": "工伤赔偿约20万元"
        }
      ],
      "totalCompensation": 330000,
      "representedByZhou": true,
      "caseIds": [
        "case-xu-changwen-double-compensation"
      ],
      "storyNotes": "徐昌文之父、赵碧之翁；1996-05-01委托周立太办理其子、儿媳交通事故双赔案，为周立太深圳执业首案，开创深圳交通事故与工伤双赔先例；案件总获赔约33万元（交通事故约13万+工伤约20万，与赵碧页所载金额构成一致）。隐私注意：privacy_status 为 redacted，原材料所载村组住址已脱敏。",
      "sourceLocators": "BK-0382 正文第5段；BK-0466 正文第5段",
      "privacyStatus": "redacted"
    },
    {
      "id": "person-xu-changwen",
      "name": "徐昌文",
      "type": "died_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人（死者）",
        "双赔首案当事人"
      ],
      "origin": "重庆市开县（今开州区）南门镇清泉村三组",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1996-04-30",
      "accidentPlace": "深圳龙岗区大鹏镇（下班途中）",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "下班途中被香港货柜车撞击当场死亡（无肢体伤情，为交通事故+工伤双赔首案）",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "1996-04-30",
        "cause": "交通事故（被香港货柜车撞击，当场死亡）"
      },
      "compensation": [
        {
          "stage": "交通事故赔偿",
          "date": "",
          "amount": 130000,
          "note": "香港车主一次性赔偿抚恤费等13万元"
        },
        {
          "stage": "工伤赔偿",
          "date": "",
          "amount": 200000,
          "note": "约20万（徐昌文由社保局约10万＋妻子赵碧由厂方约10万）；金额多口径并列"
        }
      ],
      "totalCompensation": 330000,
      "representedByZhou": true,
      "caseIds": [
        "case-xu-changwen-double-compensation"
      ],
      "storyNotes": "周立太深圳执业首案（1996-05-01接受委托，律师费分文未收）；被称全国首例交通事故工伤双赔案但本馆未核到裁判文书原文，谨慎表述；金额多口径并列（33万/35万余/30余万）；夫妇同日在事故中双亡",
      "sourceLocators": "CS-0002全案；DC-0002第一章（第115-226行）；DC-0001第五章（化名徐志坚）",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-zhu-shiqiong",
      "name": "朱世琼",
      "type": "died_worker",
      "role": [
        "当事人",
        "劳动者"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2013-08-18",
        "cause": "工作期间突发疾病，抢救无效死亡"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-pi-daming-over-age-work-injury"
      ],
      "storyNotes": "皮大明之妻，死者本人（页面 person_role 未标注死者身份，据页面事实补注）；深圳人社局以其达法定退休年龄为由对工伤认定申请不予受理，2015-03-20深圳中院终审撤销该决定；页面未载其原籍与获赔金额。",
      "sourceLocators": "BK-0021 正文第63段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-li-gang",
      "name": "李刚",
      "type": "injured_worker",
      "role": [
        "工伤职工",
        "诉讼当事人"
      ],
      "origin": "重庆合川",
      "originCoord": {
        "lon": 106.28,
        "lat": 30.0,
        "label": "重庆合川"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-li-qibing-longgang-labor-bureau"
      ],
      "storyNotes": "信息不足：stub页面，无伤情、日期与赔偿记载；1997年与李启兵等7人申请龙岗区仲裁委受理工伤案件的入口之诉当事人；与记者李罡非同一人须消歧",
      "sourceLocators": "BK-0466正文第5段",
      "privacyStatus": "cleared"
    },
    {
      "id": "person-li-qibing",
      "name": "李启兵",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人",
        "行政诉讼原告"
      ],
      "origin": "重庆市开县（原四川省开县）胡家乡安沟村2村民组",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1997-03-11",
      "accidentPlace": "深圳龙岗区坑梓镇",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "清洗塑料粉碎机时右小腿被机器轧断（粉碎性骨折），实施截肢术",
      "bodyParts": [
        "右小腿"
      ],
      "lostParts": [
        "右小腿"
      ],
      "disabilityGrade": "六级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "仲裁",
          "date": "1998-03-10",
          "amount": 28721,
          "note": "裁决协柏厂支付一次性补偿金和工资共28,721元，假肢更换费被驳回"
        },
        {
          "stage": "一审",
          "date": "1998",
          "amount": 123521,
          "note": "民事一审判决协柏厂支付123,521元"
        },
        {
          "stage": "二审",
          "date": "",
          "amount": 144191,
          "note": "深圳中院改判按1996年市平均工资1,209元计发：一次性补偿金47,151+假肢更换费94,800+工资2,240"
        }
      ],
      "totalCompensation": 144191,
      "representedByZhou": true,
      "caseIds": [
        "case-li-qibing-longgang-labor-bureau"
      ],
      "storyNotes": "行政诉讼推动最高人民法院1999年会议纪要（仲裁不予受理通知法院应予受理）；获赔后在深圳假肢厂再就业，少数'圆满结局'；卷宗异名多（李啟兵/李启文/李教兵）待核",
      "sourceLocators": "DC-0002第三章；DC-0004正文典型案例第四项；CS-0004全案",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-wang-qiong",
      "name": "王琼",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人",
        "行政诉讼原告"
      ],
      "origin": "四川省渠县",
      "originCoord": {
        "lon": 106.97,
        "lat": 30.84,
        "label": "四川渠县"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "1996-12-09",
      "accidentPlace": "深圳龙岗区布吉镇",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "操作啤机时右前臂被机器轧断",
      "bodyParts": [
        "右前臂"
      ],
      "lostParts": [
        "右前臂"
      ],
      "disabilityGrade": "五级（深圳地方标准；按国家标准本应为四级）",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-wang-qiong-shenzhen-admin-lawsuit"
      ],
      "storyNotes": "深圳第一起因工伤保险待遇处理决定不服状告社保局的行政案件，后发展为200余人诉宝安龙岗两区社保局集体诉讼；诉讼期间靠拾破烂维生；最终获赔金额页面明确未见记载",
      "sourceLocators": "DC-0002第四章；DC-0001第五章；DC-0004正文典型案例第五项；CS-0005全案",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-pi-daming",
      "name": "皮大明",
      "type": "family_claimant",
      "role": [
        "当事人",
        "工伤家属"
      ],
      "origin": "重庆垫江县",
      "originCoord": {
        "lon": 107.33,
        "lat": 30.33,
        "label": "重庆垫江"
      },
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "2013-08-18",
        "cause": "其妻朱世琼于2013-08-18在深圳普莱斯眼镜厂工作期间突发疾病，经抢救无效死亡"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-pi-daming-over-age-work-injury"
      ],
      "storyNotes": "朱世琼之夫；向深圳市人社局申请工伤认定被以超龄为由不予受理（2013-09-30），经行政诉讼，深圳中院2015-03-20终审撤销不予受理决定，确认超龄农民工受工伤保险保护；无获赔金额记载。",
      "sourceLocators": "BK-0021 正文第1—5段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-sheng-guoxiang",
      "name": "盛国祥",
      "type": "died_worker",
      "role": [
        "工亡职工"
      ],
      "origin": "湖北麻城",
      "originCoord": {
        "lon": 115.03,
        "lat": 31.18,
        "label": "湖北麻城"
      },
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "",
        "cause": "因工死亡（页面未载具体死亡原因与日期）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-sheng-guoxiang-work-death"
      ],
      "storyNotes": "湖北麻城人，因工死亡；家属委托周立太代理工伤保险先行支付申请，申请被拒后经历行政诉讼与民事诉讼双线维权，经麻城市法院与黄冈中院审理；页面未载死亡日期、死亡原因与获赔金额，信息不足。",
      "sourceLocators": "CASE-0007 全案卷宗",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-luo-shangjun",
      "name": "罗尚军",
      "type": "died_worker",
      "role": [
        "采油工",
        "工亡赔偿请求人（死者）"
      ],
      "origin": "重庆市酉阳（另说黔江）",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "陕西志丹县",
      "workCoord": {
        "lon": 108.77,
        "lat": 36.82,
        "label": "陕西志丹"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 108.77,
        "lat": 36.82,
        "label": "陕西志丹"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2018-06-06",
        "cause": "夜班突发疾病，因送医延误抢救无效死亡"
      },
      "compensation": [
        {
          "stage": "工伤赔偿仲裁裁决",
          "date": "",
          "amount": 700000,
          "note": "裁决赔偿约70余万元"
        }
      ],
      "totalCompensation": 700000,
      "representedByZhou": true,
      "caseIds": [
        "case-luo-shangjun-labor-relation"
      ],
      "storyNotes": "程序链最长样本（劳动仲裁→一审→上诉→发回重审→重审→二审→高院驳回再审→工伤认定→行政复议→行政诉讼→仲裁赔偿），2020-08-24延安市人社局确认因工死亡；公司曾编造其患病前已被辞退的\"事实\"否认劳动关系；周立太三次致信司法部推动修法（48小时脑死亡认定、死亡赔偿金计发基数）。页面另载：按2017年度标准死亡赔偿金计发727,920元、按2020年度为847,180元（差额约12万元），属计发基数说明，非实获。",
      "sourceLocators": "DC-0004 典型案例第十二项；微博 WB-795797c308cb 等7条",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-hu-qingwang",
      "name": "胡庆旺",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人"
      ],
      "origin": "江西省婺源县",
      "originCoord": {
        "lon": 117.86,
        "lat": 29.25,
        "label": "江西婺源"
      },
      "workCity": "上海",
      "workCoord": {
        "lon": 121.47,
        "lat": 31.23,
        "label": "上海"
      },
      "accidentDate": "1999-07-16",
      "accidentPlace": "上海",
      "accidentCoord": {
        "lon": 121.47,
        "lat": 31.23,
        "label": "上海"
      },
      "injury": "运输作业中受伤，L1椎体爆裂骨折、脱位伴截瘫，终身截瘫，完全丧失劳动能力和基本生活能力",
      "bodyParts": [
        "脊柱"
      ],
      "lostParts": [],
      "disabilityGrade": "一级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "仲裁申请",
          "date": "",
          "amount": 990000,
          "note": "仲裁申请金额99万元"
        },
        {
          "stage": "仲裁",
          "date": "2000-04",
          "amount": 55000,
          "note": "仲裁裁决5.5万元"
        },
        {
          "stage": "一审",
          "date": "",
          "amount": 120000,
          "note": "黄浦区法院判决12万元"
        },
        {
          "stage": "二审",
          "date": "",
          "amount": 140000,
          "note": "约14万，维持并含厂方'人道主义'追加2万元"
        }
      ],
      "totalCompensation": 140000,
      "representedByZhou": true,
      "caseIds": [
        "case-hu-qingwang-shanghai-paralysis"
      ],
      "storyNotes": "与万菊生案极端对比揭示上海户籍歧视：伤情最重（一级截瘫）获赔最少；后续状况未见记载；仲裁后申诉至高院、最高检均无果",
      "sourceLocators": "DC-0001第五章（第1647-1669行）；DC-0002第九章",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-mo-desong",
      "name": "莫德松",
      "type": "died_worker",
      "role": [
        "当事人",
        "职业病工人",
        "已故劳动者"
      ],
      "origin": "四川泸县福集镇",
      "originCoord": {
        "lon": 105.38,
        "lat": 29.15,
        "label": "四川泸县"
      },
      "workCity": "东莞",
      "workCoord": {
        "lon": 113.75,
        "lat": 23.02,
        "label": "东莞"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 113.75,
        "lat": 23.02,
        "label": "东莞"
      },
      "injury": "长期接触天那水等有害物质，2009年确诊职业病并于同年死亡",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2009",
        "cause": "职业病（具体死因页面未载）"
      },
      "compensation": [
        {
          "stage": "民事赔偿判决",
          "date": "2012",
          "amount": 400000,
          "note": "东莞中院撤销一审不受理裁定后，东莞市第一人民法院判决用人单位另行支付民事赔偿近40万元"
        }
      ],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-mo-desong-occupational-disease"
      ],
      "storyNotes": "职业病双赔成功先例；2009年确诊职业病并于同年死亡；此前工伤待遇金额未记载，total仅计记载到的民事赔偿近40万",
      "sourceLocators": "BK-0531正文第2—6段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-tan-shaobai",
      "name": "谭少柏",
      "type": "injured_worker",
      "role": [
        "当事人",
        "职业病工人"
      ],
      "origin": "重庆万州区长滩镇",
      "originCoord": {
        "lon": 108.41,
        "lat": 30.81,
        "label": "重庆万州"
      },
      "workCity": "万州",
      "workCoord": {
        "lon": 108.41,
        "lat": 30.81,
        "label": "重庆万州"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 108.41,
        "lat": 30.81,
        "label": "重庆万州"
      },
      "injury": "患尘肺病，经重庆市第六人民医院诊断为职业病",
      "bodyParts": [
        "肺"
      ],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-tan-shaobai-work-injury-suspension"
      ],
      "storyNotes": "信息不足：stub页面，无伤残等级与金额记载；申请工伤认定时万州人社局以未确认劳动关系为由中止认定，法院维持该决定",
      "sourceLocators": "BK-0083正文第4段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-tan-yuemin",
      "name": "谭跃民",
      "type": "died_worker",
      "role": [
        "当事人",
        "已故劳动者"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "公海（重庆渝万劳务派遣至台籍渔船）",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2008-03-05",
        "cause": "公海捕鱼时坠海身亡"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-tan-yuemin-work-death"
      ],
      "storyNotes": "高风险源：本页受 BK-0101 审定约束，未经审定不得全文刊引，亦不得扩散未证实指控。是否属工亡历经两次工伤认定、两次复议、一次补证通知与仲裁裁决，至2010年实体工伤认定仍未终局；仲裁裁决其与渝万公司不存在劳动关系（2010-06-01）；案件 verification_status 标 disputed。无获赔金额记载。",
      "sourceLocators": "BK-0101 正文第1—6段",
      "privacyStatus": "contains_sensitive"
    },
    {
      "id": "person-zhao-bi",
      "name": "赵碧",
      "type": "died_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人（死者）"
      ],
      "origin": "重庆市开县（今开州区）南门镇新埔村",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "深圳（龙岗区大鹏镇）",
      "workCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.27,
        "lat": 22.72,
        "label": "深圳龙岗"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "1996-04-30",
        "cause": "下班途中遭香港货柜车撞击，抢救一小时后无效死亡"
      },
      "compensation": [
        {
          "stage": "仲裁裁决（厂方直接赔偿）",
          "date": "",
          "amount": 100000,
          "note": "因厂方未为其办理工伤保险，其工伤赔偿无法经社保局赔付，由厂方直接赔偿10万元；页面另载金额构成：香港车主13万+徐昌文工厂10万+赵碧工厂10万，合计约33万"
        }
      ],
      "totalCompensation": 100000,
      "representedByZhou": true,
      "caseIds": [
        "case-xu-changwen-double-compensation"
      ],
      "storyNotes": "徐昌文之妻；案发时31岁（据DC-0002推算约1965年生，生年不详故未填 birth_year）；因厂方未办工伤保险，其工伤赔偿单独由厂方承担，与徐昌文（已参保、社保赔付）形成对比；姓名仅见于CS-0002，同期媒体以\"儿媳\"代称；交警认定港车负事故主要责任。隐私注意：其父赵丕富的姓名、年龄与住址见于DC-0002，公开前需复核隐私级别。",
      "sourceLocators": "CS-0002 第1段；DC-0002 第一章；DC-0001 第五章；REPORT-0014",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-guo-xiaoping",
      "name": "郭小平",
      "type": "died_worker",
      "role": [
        "油漆工",
        "工亡职工"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "山东茌平县",
      "workCoord": {
        "lon": 116.27,
        "lat": 36.58,
        "label": "山东茌平"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 116.27,
        "lat": 36.58,
        "label": "山东茌平"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "2019-08-06",
        "cause": "冲洗油漆时触电身亡（鉴定为电击死亡）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-liu-shengqing-work-death"
      ],
      "storyNotes": "油漆工，2019-08-06约11时30分在淋浴室冲洗油漆时触电身亡；厂方答辩否认事实劳动关系，争议涉\"工作时间、工作地点延伸\"认定；工资记录显示厂方2019-08-17支付其6—8月工资合计24,031元（收款人刘胜青）；工伤认定结果待从案卷OCR提取，无获赔金额记载。",
      "sourceLocators": "CASE-0004 全案卷宗",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-chen-mingfeng",
      "name": "陈明凤",
      "type": "family_claimant",
      "role": [
        "当事人",
        "工伤家属"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "",
        "cause": "其夫黄俊明工作中跌倒致蛛网膜下腔出血死亡（具体日期未载）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": false,
      "caseIds": [
        "case-huang-junming-work-injury"
      ],
      "storyNotes": "黄俊明之妻；不服渝北区劳动局\"不属因工死亡\"认定，依法申请行政复议并先后向渝北区法院、重庆市一中院起诉、上诉和申请再审，均未获支持；其维权经历构成黄俊明工伤系列案的主体线索；无获赔金额记载。",
      "sourceLocators": "BK-0626 正文第9—13段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-chen-yonggang",
      "name": "陈用刚",
      "type": "injured_worker",
      "role": [
        "农民工",
        "工伤赔偿请求人"
      ],
      "origin": "湖南省茶陵县",
      "originCoord": {
        "lon": 113.54,
        "lat": 26.78,
        "label": "湖南茶陵"
      },
      "workCity": "深圳",
      "workCoord": {
        "lon": 114.06,
        "lat": 22.55,
        "label": "深圳"
      },
      "accidentDate": "2000-03-17",
      "accidentPlace": "深圳南山",
      "accidentCoord": {
        "lon": 113.93,
        "lat": 22.53,
        "label": "深圳南山"
      },
      "injury": "操作啤机时右臂被机器轧断",
      "bodyParts": [
        "右臂"
      ],
      "lostParts": [
        "右臂"
      ],
      "disabilityGrade": "四级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-chen-yonggang-work-injury-advance"
      ],
      "storyNotes": "深圳工伤保险社保基金垫付制度第一人；企业违法注销逃逸致判决无法执行；最终获赔金额不详（页面明确未载）；诉讼时间线待核",
      "sourceLocators": "CS-0009全案；DC-0004典型案例第六项",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-luo-shilin",
      "name": "骆世林",
      "type": "injured_worker",
      "role": [
        "当事人",
        "职业病工人",
        "尘肺病患者"
      ],
      "origin": "重庆开县长沙镇",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "惠州",
      "workCoord": {
        "lon": 114.42,
        "lat": 23.11,
        "label": "惠州"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 114.42,
        "lat": 23.11,
        "label": "惠州"
      },
      "injury": "尘肺病、伤残三级（2009年确诊）",
      "bodyParts": [
        "肺"
      ],
      "lostParts": [],
      "disabilityGrade": "三级",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [
        {
          "stage": "工伤赔偿",
          "date": "",
          "amount": 200000,
          "note": "约20余万元"
        },
        {
          "stage": "二审（职业病民事赔偿）",
          "date": "2013-09",
          "amount": 710000,
          "note": "惠州中院二审改判，获残疾赔偿金等71万余元"
        }
      ],
      "totalCompensation": 910000,
      "representedByZhou": true,
      "caseIds": [
        "case-luo-shilin-occupational-disease"
      ],
      "storyNotes": "职业病双赔成功案例；两阶段金额均约数，合计约91万；与骆世海非同一人（页面明确）",
      "sourceLocators": "BK-0200正文第1—6段",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-luo-shihai",
      "name": "骆世海",
      "type": "injured_worker",
      "role": [
        "煤矿工人",
        "尘肺病患者",
        "行政诉讼原告"
      ],
      "origin": "重庆市开州区",
      "originCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "workCity": "重庆开州",
      "workCoord": {
        "lon": 108.39,
        "lat": 31.2,
        "label": "重庆开州"
      },
      "accidentDate": "",
      "accidentPlace": "重庆市开州区",
      "accidentCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "injury": "尘肺病：2014年6月诊断1期尘肺（七级伤残），2019年8月重庆疾控中心诊断2期尘肺（病情加重）",
      "bodyParts": [
        "肺"
      ],
      "lostParts": [],
      "disabilityGrade": "四级（复查后；2014年初为七级）",
      "death": {
        "is_death": false,
        "date": "",
        "cause": ""
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-luo-shihai-black-lung"
      ],
      "storyNotes": "四部门联合文件被确认违法（渝人社发[2012]185号第20条第1款第6项、渝人社办[2020]303号）；复查鉴定为四级后社保局仍以企业不存在、工伤保险关系已终止为由拒赔，继续诉讼中，无获赔金额记载",
      "sourceLocators": "CS-0019全案；DC-0004典型案例第八项",
      "privacyStatus": "unassessed"
    },
    {
      "id": "person-huang-shuyin",
      "name": "黄书银",
      "type": "family_claimant",
      "role": [
        "当事人",
        "工伤家属",
        "行政诉讼申请人"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "",
      "workCoord": null,
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": null,
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": false,
        "date": "2008-03-05",
        "cause": "其夫谭跃民于2008-03-05在公海捕鱼时坠海身亡"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": true,
      "caseIds": [
        "case-tan-yuemin-work-death"
      ],
      "storyNotes": "谭跃民之妻；丈夫坠海身亡后历经两次工伤认定、两次行政复议、一次补证通知与仲裁裁决，打了2年5个月官司仍未进入实体审理；高风险源，本页受 BK-0101 审定约束，未经审定不得全文刊引，未证实指控不扩散；无获赔金额记载。",
      "sourceLocators": "BK-0101 正文第2—6段",
      "privacyStatus": "contains_sensitive"
    },
    {
      "id": "person-huang-junming",
      "name": "黄俊明",
      "type": "died_worker",
      "role": [
        "当事人",
        "劳动者"
      ],
      "origin": "",
      "originCoord": null,
      "workCity": "重庆",
      "workCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "accidentDate": "",
      "accidentPlace": "",
      "accidentCoord": {
        "lon": 106.55,
        "lat": 29.56,
        "label": "重庆"
      },
      "injury": "",
      "bodyParts": [],
      "lostParts": [],
      "disabilityGrade": "",
      "death": {
        "is_death": true,
        "date": "",
        "cause": "工作中跌倒致蛛网膜下腔出血，抢救无效死亡（具体死亡日期未载）"
      },
      "compensation": [],
      "totalCompensation": null,
      "representedByZhou": false,
      "caseIds": [
        "case-huang-junming-work-injury"
      ],
      "storyNotes": "2007年受聘，工作中死亡；渝北区劳动局两次作出不属因工死亡认定，其家属历经复议、诉讼、再审均未获支持（其妻陈明凤维权构成案件主体线索）；无获赔金额记载，工伤认定未获支持。隐私注意：住址按 §7 降精度。页面未载死亡日期。",
      "sourceLocators": "BK-0626 正文第6段",
      "privacyStatus": "unassessed"
    }
  ],
  "cases": [
    {
      "id": "case-zhan-shanlin-work-death-disputed",
      "title": "占善林工伤死亡争议案",
      "kind": "工伤认定与行政给付",
      "dateStart": "1994-06",
      "dateEnd": "2001",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "岗位突发疾病猝死"
      ],
      "origins": [],
      "workPlaces": [
        "深圳市宝安区"
      ],
      "accidentPlaces": [
        "深圳市宝安区"
      ],
      "compensationEvents": [
        {
          "stage": "民事赔偿终审",
          "date": "",
          "amount": 127173.6,
          "note": "127173.6元，经仲裁、一审、二审民事赔偿程序并获法院执行；各程序具体日期未载，约2001年"
        }
      ],
      "legalSignificance": "工作场所猝死因工死亡认定争议：厂方主张手淫致死不应认定，法院维持因工死亡认定（《深圳经济特区工伤保险条例》工作时间、工作范围猝死属工伤）；历经工伤认定、复议、行政诉讼、仲裁、民事赔偿共七个程序约三年",
      "sourceLocators": "CS-0007；DC-0004"
    },
    {
      "id": "case-xu-changwen-double-compensation",
      "title": "徐昌文夫妇交通事故与工伤事故双赔案",
      "kind": "工伤赔偿",
      "dateStart": "1996",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 2,
      "incidentCategory": [
        "上下班途中交通"
      ],
      "origins": [
        "重庆市开州区"
      ],
      "workPlaces": [
        "深圳市"
      ],
      "accidentPlaces": [
        "深圳市龙岗区大鹏镇"
      ],
      "compensationEvents": [
        {
          "stage": "综合（仲裁与民事诉讼）",
          "date": "",
          "amount": 350000,
          "note": "约35万元，多项来源金额冲突并列待核：CS-0002『两项相加35万余元』；REPORT-0014『合计33万元（香港车主13万＋工厂10万＋社保局10万）』；DC-0001『合计30余万元』；BK-0076周立太自述『30余万元（交通13万＋工伤近20万）』；各阶段分项金额未载"
        }
      ],
      "legalSignificance": "全国因交通事故引发工伤『双赔』的早期代表案件（材料称开创先例，本馆未见裁判文书原文，未下『全国首例』定论）；处于补差与双赔之争起点；金额（35万/33万/30余万）与历时（一年半/五个月）多来源冲突，verification_status: disputed",
      "sourceLocators": "CS-0002；REPORT-0014；DC-0001第五章；DC-0002第一章；BK-0076；BK-0617"
    },
    {
      "id": "case-peng-gangzhong-amputation",
      "title": "彭刚中断手工伤赔偿案",
      "kind": "工伤赔偿",
      "dateStart": "1997",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "机器卷入挤压截肢"
      ],
      "origins": [
        "四川省资中县"
      ],
      "workPlaces": [
        "深圳市宝安区"
      ],
      "accidentPlaces": [
        "深圳市宝安区"
      ],
      "compensationEvents": [
        {
          "stage": "一审",
          "date": "",
          "amount": 172320.75,
          "note": "约172320.75元（一次性补偿金56520.75＋继续医疗费15000＋假肢更换费9次×11200）；金额多来源冲突并列：REPORT-0014『17.2万元』、DC-0003『17万余元』、DC-0004/BK-0523/BK-0048『17.8万元』，待核"
        },
        {
          "stage": "二审",
          "date": "",
          "amount": 172320.75,
          "note": "深圳中院维持原判；此后彭刚中领款后欠约4万元律师费失联"
        }
      ],
      "legalSignificance": "纠正深圳市宝安区工伤赔偿计发基数（断一只手仅赔33101.25元）；开创中国工伤赔偿一次性支付假肢更换费先例（DC-0004称『全国首例』）；事故年份（1995-10 vs 1996-08-29）、厂名、金额口径多来源冲突待核",
      "sourceLocators": "CS-0003；REPORT-0014；DC-0001第五章；DC-0002第二章；DC-0003；DC-0004；BK-0523；BK-0048；BK-0625"
    },
    {
      "id": "case-liu-tao-record-compensation",
      "title": "刘涛巨额工伤赔偿案",
      "kind": "工伤赔偿",
      "dateStart": "1998",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "机器卷入挤压截肢"
      ],
      "origins": [
        "四川省乐山县"
      ],
      "workPlaces": [
        "深圳市福田区"
      ],
      "accidentPlaces": [
        "深圳市福田区"
      ],
      "compensationEvents": [
        {
          "stage": "终审（二审）",
          "date": "",
          "amount": 1580000,
          "note": "伤残补助金及假肢更换费共计158万元，创当时中国工伤赔偿金额之最；各程序具体日期未载，约2000年终审"
        }
      ],
      "legalSignificance": "158万元创当时中国工伤赔偿之最；首次提出工伤赔偿精神损失费诉求，最高法判例选编评语建议在将来司法解释中规范；被最高法判例选编收录、央视新闻联播报道",
      "sourceLocators": "VT-0007/VT-0030『一双手和342万元』/VT-0065等视频机器转写（待复核）"
    },
    {
      "id": "case-wang-qiong-shenzhen-admin-lawsuit",
      "title": "王琼等7人诉深圳市社会保险局龙岗分局行政诉讼案",
      "kind": "行政诉讼",
      "dateStart": "1998",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 7,
      "incidentCategory": [
        "行政程序制度执行",
        "机器卷入挤压截肢"
      ],
      "origins": [],
      "workPlaces": [
        "深圳市龙岗区"
      ],
      "accidentPlaces": [
        "深圳市龙岗区"
      ],
      "compensationEvents": [
        {
          "stage": "社保待遇调整",
          "date": "1998-10",
          "amount": 28950,
          "note": "1998年10月深常函1998-22号将两区补偿基数定为571元后，社保局将补偿金从34425元降为28950元（DC-0002）；1998-06-19中院终审胜诉，7人具体获赔总额未载"
        }
      ],
      "legalSignificance": "深圳中院行政审判庭1998-06-19当庭终审胜诉，纠正以679元为计发基数的错误并确认两区政府文件违法；推动宝安、龙岗两区以书面形式作出工伤保险待遇决定书（全国首次）；伤残等级争议（按国标四级 vs 深圳地方五级）；终审日期（2000-01-28 vs 2001-01-15）及1378元计发基数（孤证）等周立太自述多版本并列待核",
      "sourceLocators": "DC-0001第五章；DC-0002第四章；CS-0005；DC-0004；BK-0382/0470/0575"
    },
    {
      "id": "case-hu-qingwang-shanghai-paralysis",
      "title": "胡庆旺诉上海申泰建筑物资经销公司工伤瘫痪索赔案",
      "kind": "工伤赔偿",
      "dateStart": "1999-07-16",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "坠落坠物高处"
      ],
      "origins": [
        "江西省婺源县"
      ],
      "workPlaces": [
        "上海市"
      ],
      "accidentPlaces": [
        "上海市"
      ],
      "compensationEvents": [
        {
          "stage": "仲裁",
          "date": "2000-03",
          "amount": 55000,
          "note": "约5.5万元，黄浦区劳动争议仲裁委员会"
        },
        {
          "stage": "一审",
          "date": "",
          "amount": 120000,
          "note": "上海市黄浦区人民法院判决约12万元"
        },
        {
          "stage": "二审",
          "date": "",
          "amount": 140000,
          "note": "维持一审并人道主义追加2万元，合计约14万元（仅为99万元请求额的约14%）；高院申诉与最高检抗诉均无结果"
        }
      ],
      "legalSignificance": "建筑行业农民工不签合同、无工伤保险重度伤残保障不足的代表性个案；99万元请求 vs 约14万元终判；两审终审后申诉、抗诉渠道均无结果；二级法院名称（二审）页面未载",
      "sourceLocators": "DC-0001第五章"
    },
    {
      "id": "case-feng-chengyang-shenzhen-work-injury",
      "title": "冯成杨诉升宁塑胶五金制品厂工伤赔偿案",
      "kind": "工伤赔偿",
      "dateStart": "1999-12-15",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "机器卷入挤压截肢"
      ],
      "origins": [
        "贵州省贞丰县"
      ],
      "workPlaces": [
        "深圳市龙岗区"
      ],
      "accidentPlaces": [
        "深圳市龙岗区"
      ],
      "compensationEvents": [
        {
          "stage": "私了辞退补偿",
          "date": "2000-06-02",
          "amount": 26790,
          "note": "厂方『协力书』一次性补偿26790元解除劳动关系；此后仲裁（2000-11-18驳回）、一审（2000-12-09）、二审（2001-07-26）、再审（粤高法）全部败诉，另案诉深圳市政府行政赔偿亦不予受理"
        }
      ],
      "legalSignificance": "深圳经济特区法规与广东省法规在宝安、龙岗两区适用冲突的标志性案件；宋海副市长2000-05-12来访纪要『违法指示』背景（DC-0002）；仲裁以超申请时效、诉讼以私了协议真实意思表示为由驳回；工伤赔偿路径全败诉",
      "sourceLocators": "DC-0001第三章；DC-0002第五章"
    },
    {
      "id": "case-chen-yonggang-work-injury-advance",
      "title": "陈用刚工伤保险待遇垫付案",
      "kind": "工伤赔偿",
      "dateStart": "2000-03-17",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "机器卷入挤压截肢"
      ],
      "origins": [
        "湖南省茶陵县"
      ],
      "workPlaces": [
        "深圳市"
      ],
      "accidentPlaces": [
        "深圳市南山区",
        "深圳市福田区"
      ],
      "compensationEvents": [],
      "legalSignificance": "企业恶意注销后推动立法：媒体报道后深圳市人大修改《深圳经济特区工伤保险条例》增设社保基金垫付，陈用刚成为第一受益人，为《社会保险法》垫付条款提供参考；事故地点两说待核（wiki前文南山区 vs 案卷CS-0009福田区/赛丽特工贸发展有限公司）；获赔具体金额未载",
      "sourceLocators": "DC-0004；CS-0009"
    },
    {
      "id": "case-wan-jusheng-shanghai-amputation",
      "title": "万菊生诉上海金羽纸品印刷厂工伤截肢索赔案",
      "kind": "工伤赔偿",
      "dateStart": "2000-07-03",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "机器卷入挤压截肢"
      ],
      "origins": [
        "安徽省巢湖市"
      ],
      "workPlaces": [
        "上海市"
      ],
      "accidentPlaces": [
        "上海市浦东新区"
      ],
      "compensationEvents": [
        {
          "stage": "仲裁",
          "date": "2001-02-14",
          "amount": 68664.2,
          "note": "依沪劳保保发(2000)58号裁决68664.20元（DC-0001）；DC-0002另记裁决75164.20元、扣除借款后实际支付68664.20元，两说并列待核"
        },
        {
          "stage": "一审",
          "date": "2001-05-18",
          "amount": 98764,
          "note": "约98764元（DC-0002，浦东法院认定58号通知合法）；DC-0001记『约107564元』，两说并列待核"
        },
        {
          "stage": "二审",
          "date": "2001-06-04",
          "amount": 150000,
          "note": "约15万元；上海一中院追加51235.80元，并写明『外地劳动力不具备上海市常住户口，履行社会保障义务客观上有别于本地职工』；追加部分似为厂方15万『一次性了断』人道补偿；向上海高院申请再审无答复"
        }
      ],
      "legalSignificance": "挑战沪劳保保发(2000)58号户籍歧视标准（外地四级伤残72000元 vs 本地467775元，差距6-7倍）；与胡庆旺案构成上海外地劳动力工伤制度对比；各阶段金额多来源冲突并列待核；再审无结果",
      "sourceLocators": "DC-0001第五章；DC-0002第九章"
    },
    {
      "id": "case-luo-shilin-occupational-disease",
      "title": "骆世林职业病双赔案",
      "kind": "职业病双赔",
      "dateStart": "2003-09",
      "dateEnd": "2013-09-24",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市开县"
      ],
      "workPlaces": [
        "广东省惠州市"
      ],
      "accidentPlaces": [],
      "compensationEvents": [
        {
          "stage": "工伤赔偿（先行）",
          "date": "",
          "amount": 200000,
          "note": "约20余万元，经仲裁及诉讼获赔并已执行；因用人单位未办工伤保险"
        },
        {
          "stage": "一审（民事）",
          "date": "2012-06-03",
          "amount": 20000,
          "note": "惠阳区法院仅支持住院伙食费、交通费2万余元，其余均不支持"
        },
        {
          "stage": "二审（民事）",
          "date": "2013-09-24",
          "amount": 714921.66,
          "note": "惠州中院改判用人单位一次性支付残疾赔偿金等714921.66元"
        }
      ],
      "legalSignificance": "职业病『双赔』典型样本；依《职业病防治法》另诉民事赔偿获二审改判；一审拖延近两年（涉审理周期，待核）；714921.66元赔偿项目构成与文书字号待核；与骆世海案（case-luo-shihai-black-lung）非同一人同一案，页面已消歧",
      "sourceLocators": "BK-0200"
    },
    {
      "id": "case-he-shulin-silicosis",
      "title": "何树林等11名重庆籍民工温州矽肺工伤赔偿案",
      "kind": "职业病双赔",
      "dateStart": "2004-10",
      "dateEnd": "2009-08-21",
      "representedByZhou": true,
      "workerCount": 11,
      "incidentCategory": [
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市万州区"
      ],
      "workPlaces": [
        "浙江省温州市龙湾区"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "矽肺职业病维权、放弃诊断与诉权调解协议（龙湾区检察院认定显失公平）、『诉讼长于生命』样本；龙湾法院一审撤销工伤认定、温州中院2005-08二审确认工伤；来源BK-0094作者媒体不明（P0待考），仅限事实短引；『厂长被诉』说法与原文不符，应为龙湾卫生监督所监督员玩忽职守案；工人获赔具体金额页面未载",
      "sourceLocators": "BK-0094（来源待考P0）"
    },
    {
      "id": "case-yang-wenwei-bao20",
      "title": "杨文伟诉宝二十冶公司人身损害赔偿纠纷案",
      "kind": "民事纠纷",
      "dateStart": "2006",
      "dateEnd": "",
      "representedByZhou": false,
      "workerCount": 1,
      "incidentCategory": [
        "其他"
      ],
      "origins": [],
      "workPlaces": [],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "最高法2006年第八期公报案例，明确因第三人侵权造成工伤的职工除民事侵权赔偿外仍有权享受工伤保险待遇（双赔）；与最高法2006-12-28(2006)行他字第12号答复共同构成双赔司法依据；本馆仅博文提及，案号、裁判文书全文未收录，具体事故类型未载",
      "sourceLocators": "BK-0617"
    },
    {
      "id": "case-mo-desong-occupational-disease",
      "title": "莫德松职业病案",
      "kind": "职业病双赔",
      "dateStart": "2006-06",
      "dateEnd": "2012-01-12",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "职业病长期暴露"
      ],
      "origins": [
        "四川省泸县"
      ],
      "workPlaces": [
        "广东省东莞市"
      ],
      "accidentPlaces": [],
      "compensationEvents": [
        {
          "stage": "工伤待遇（社保支付）",
          "date": "",
          "amount": 370000,
          "note": "约37万余元，由东莞市社保机构支付因工伤亡待遇"
        },
        {
          "stage": "一审（民事）",
          "date": "2012-01-12",
          "amount": 400000,
          "note": "（2010）东一法民一初字第11220号判决用人单位一次性支付近40万元，已全部执行；东莞第一法院原不予受理，经东莞中院撤销裁定指令审理"
        }
      ],
      "legalSignificance": "职业病『双赔』典型样本（与骆世林案并列）；东莞中院撤销一审不予受理裁定、指令继续审理；《职业病防治法》条号52/59冲突待核；判决『近40万元』具体项目构成待核",
      "sourceLocators": "BK-0531"
    },
    {
      "id": "case-huang-junming-work-injury",
      "title": "黄俊明工伤认定系列案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2007-10-22",
      "dateEnd": "2010-09-01",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市万州区"
      ],
      "workPlaces": [
        "重庆市渝北区"
      ],
      "accidentPlaces": [
        "重庆市渝北区"
      ],
      "compensationEvents": [],
      "legalSignificance": "『马拉松式诉讼』样本：近三年程序（工伤认定→复议→渝北法院两次判决→重庆一中院终审→两级法院再审驳回）工伤认定仍未确认，陈明凤未获分文赔偿；法正司法鉴定所文证审查意见证据资格与劳动局举证责任争议",
      "sourceLocators": "BK-0626"
    },
    {
      "id": "case-tan-yuemin-work-death",
      "title": "谭跃民工亡认定系列案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2008-03-05",
      "dateEnd": "2010-06-01",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "坠海溺水"
      ],
      "origins": [
        "重庆市万州区"
      ],
      "workPlaces": [],
      "accidentPlaces": [
        "公海"
      ],
      "compensationEvents": [],
      "legalSignificance": "『一诉一撤一定』反复：113号（2008-03-20）不属工亡→自行撤销→428号（2008-08-14）仍不属工亡→复议撤销→84号补证通知→仲裁（2010-06-01）裁决不存在劳动关系；『以先确认劳动关系阻却工伤认定』的最具体记录；verification_status: disputed，来源含未证实指控不引；428号决定与万州府复〔2008〕93号日期逻辑矛盾待核；实体工伤认定至2010-09未终局",
      "sourceLocators": "BK-0101（含未证实指控，人工审定前不扩散）"
    },
    {
      "id": "case-liu-zhongbin-disability-benefit",
      "title": "刘忠斌伤残补助金行政给付案",
      "kind": "行政诉讼",
      "dateStart": "2010-11-18",
      "dateEnd": "2015-02-09",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "行政程序制度执行",
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市巫山县"
      ],
      "workPlaces": [
        "重庆市巫山县"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "尘肺等级变更（七级→四级）后一次性伤残补助金行政给付争议；巫山县社保局2014-07-15依渝府发〔2012〕22号第38条不予支付，一、二审驳回；争议核心为该办法属市政府规章还是一般规范性文件、尘肺加重是否属『再次发生工伤』；本页为行政给付线，民事线见 case-liu-zhongbin-civil-compensation",
      "sourceLocators": "BK-0591"
    },
    {
      "id": "case-zhou-hanjun-work-injury",
      "title": "周含军工伤待遇差额争议案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2013",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "因工出差运输交通"
      ],
      "origins": [],
      "workPlaces": [
        "四川省宜宾市"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "宜宾中院以『非司法解释』为由拒绝适用最高法(2006)行他字第12号复函（确立双赔），二审维持补差；与『唯重庆』地方例外叙事构成并列矛盾待调和；材料仅周方博文转述，裁判文书未附、案号日期待核；工伤待遇仅赔差额，具体金额未载",
      "sourceLocators": "BK-0278"
    },
    {
      "id": "case-pi-daming-over-age-work-injury",
      "title": "皮大明超龄工亡工伤认定案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2013-08-18",
      "dateEnd": "2015-03-20",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市垫江县"
      ],
      "workPlaces": [
        "深圳市福田区"
      ],
      "accidentPlaces": [
        "深圳市福田区"
      ],
      "compensationEvents": [],
      "legalSignificance": "超龄农民工受工伤保护的先例：深圳中院2015-03-20终审撤销人社局不予受理决定，认定法律未禁止超龄从业、超龄进城务工农民仍应受工伤保险规范保护；仅一份媒体转述（澎湃2015-06-24），未见判决书原文与案号，待核；被援引为周永德案『先例』，两案不可混为一案",
      "sourceLocators": "BK-0021"
    },
    {
      "id": "case-liu-zhongbin-civil-compensation",
      "title": "刘忠斌职业病民事赔偿诉讼",
      "kind": "职业病双赔",
      "dateStart": "2014",
      "dateEnd": "2014-12",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市巫山县"
      ],
      "workPlaces": [
        "重庆市巫山县"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "重庆高院民一庭（2014）渝高法民一复字第45号复函确立『补差』原则，二中院据此驳回上诉，一、二审均未支持民事赔偿；复函原件未见、文号日期措辞待核；《职业病防治法》条号52/59冲突待核；周称民一庭超越职权（个人主张，非认定）；与行政给付线分列两页",
      "sourceLocators": "BK-0568；BK-0530"
    },
    {
      "id": "case-luo-shihai-black-lung",
      "title": "骆世海尘肺病诉开州区人社局不履行法定职责案",
      "kind": "行政诉讼",
      "dateStart": "2014-06",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "行政程序制度执行",
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市开州区"
      ],
      "workPlaces": [
        "重庆市开州区"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "煤矿关闭后尘肺复查鉴定障碍的制度性纠正：开州区法院撤销不予鉴定告知书（2021-02-05），确认渝人社发【2012】185号文第20条第6项已修改、渝人社办【2020】303号第二条『工伤保险关系终止不再复查』不合法不予适用；来源为周立太简介典型案例八（DC-0004）与案卷CS-0019；与骆世林案非同一人同一案已消歧",
      "sourceLocators": "CS-0019；DC-0004"
    },
    {
      "id": "case-zhou-yongde-sudden-death",
      "title": "周永德超龄猝死工伤认定案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2015-05-09",
      "dateEnd": "2015-06-24",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市梁平县"
      ],
      "workPlaces": [
        "深圳市"
      ],
      "accidentPlaces": [
        "深圳市"
      ],
      "compensationEvents": [],
      "legalSignificance": "超龄劳动者劳动权与工伤保护议题；厂方以超龄拒赔并拒付火化费（遗体滞留后由殡仪馆免费火化）；周立太向横岗社保站申请工伤认定，结果未载；与皮大明案共同关联『超龄劳动者劳动权与工伤保护』",
      "sourceLocators": "BK-0021"
    },
    {
      "id": "case-wang-bing-double-compensation",
      "title": "开县王兵交通事故同时获得工伤双赔案",
      "kind": "工伤赔偿",
      "dateStart": "2015-08",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "因工出差运输交通"
      ],
      "origins": [
        "重庆市开县"
      ],
      "workPlaces": [
        "重庆市开县"
      ],
      "accidentPlaces": [
        "重庆市垫江县"
      ],
      "compensationEvents": [],
      "legalSignificance": "双赔原则后期代表实例（与徐昌文案首尾呼应）；开县社保局以重庆地方『补差』规定拒付，经诉讼开县法院判决社保局败诉支持双赔；重庆市高院2011年12月自行纠正原违法规定（时间线注意：2011纠正为制度背景，2015案为纠正后适用）；获赔具体金额未载",
      "sourceLocators": "CS-0018"
    },
    {
      "id": "case-zhou-litai-apply-npc-wu-ximei",
      "title": "周立太因伍锡梅案申请人大撤销重庆高院违法文件案",
      "kind": "行政诉讼",
      "dateStart": "2015-10-27",
      "dateEnd": "2021-02-25",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "行政程序制度执行",
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市开州区"
      ],
      "workPlaces": [
        "重庆市南岸区"
      ],
      "accidentPlaces": [
        "重庆市南岸区"
      ],
      "compensationEvents": [
        {
          "stage": "工伤待遇判决",
          "date": "",
          "amount": 1142318,
          "note": "判决公司赔偿伍锡梅等人一次性死亡赔偿金等1142318元（约114.2万元），因公司已注销无法执行；先行支付申请被拒后，经检察院抗诉、高院撤销五中院判决指定再审"
        }
      ],
      "legalSignificance": "人大监督撤销违法规范性文件的罕见样本：全国人大认定重庆高院《关于审理工伤行政案件若干问题的解答》第24条违反《社会保险法》第41条，高院2021-02-25以渝高法（2021）24号废止；体现『以诉推进法治』方法论；与2006年人大审查建议（针对2005年工伤赔偿意见第三条）经核定非同一行动",
      "sourceLocators": "CS-0020；DC-0002第十四章"
    },
    {
      "id": "case-luo-shangjun-labor-relation",
      "title": "罗尚军确认劳动关系及工伤赔偿案",
      "kind": "劳动争议",
      "dateStart": "2018-06-05",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市酉阳县"
      ],
      "workPlaces": [
        "陕西省志丹县"
      ],
      "accidentPlaces": [
        "陕西省志丹县"
      ],
      "compensationEvents": [
        {
          "stage": "工伤赔偿（最终）",
          "date": "",
          "amount": 700000,
          "note": "约70余万元；确认劳动关系历经仲裁、一审、上诉、重审、再审，工伤认定历经一审、二审、再审；获赔具体程序节点日期未载"
        }
      ],
      "legalSignificance": "劳动关系确认『马拉松』样本；2018-06-05凌晨突发疾病、老板拒绝送医、死于医院门口，老板编造此前已解除劳动关系；具体法院名称与文书未载",
      "sourceLocators": "DC-0004"
    },
    {
      "id": "case-liu-shengqing-work-death",
      "title": "刘胜青申请确认其夫郭小平因工死亡案",
      "kind": "工伤认定与行政给付",
      "dateStart": "2019-08-06",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "触电"
      ],
      "origins": [],
      "workPlaces": [
        "山东省茌平县"
      ],
      "accidentPlaces": [
        "山东省茌平县"
      ],
      "compensationEvents": [],
      "legalSignificance": "工作后淋浴室冲洗油漆时触电身亡的工亡认定争议：厂方否认事实劳动关系、是否属工作时间地点延伸；工资记录（2019-08-17支付6-8月工资24031元）证明计件工资关系；后续判决结果待从案卷OCR提取",
      "sourceLocators": "CASE-0004（案卷OCR 1022页）"
    },
    {
      "id": "case-tan-shaobai-work-injury-suspension",
      "title": "谭少柏工伤认定中止案",
      "kind": "工伤认定与行政给付",
      "dateStart": "",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "行政程序制度执行",
        "职业病长期暴露"
      ],
      "origins": [
        "重庆市万州区"
      ],
      "workPlaces": [
        "重庆市万州区"
      ],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "『以先确认劳动关系阻却工伤认定』的样本（万州长滩镇政府下属煤矿，尘肺职业病诊断表用人单位栏已盖章仍被中止）；具体日期未载，据2017-09-29博文；无获赔金额",
      "sourceLocators": "BK-0083"
    },
    {
      "id": "case-sheng-guoxiang-work-death",
      "title": "盛国祥工亡先行支付案",
      "kind": "工伤认定与行政给付",
      "dateStart": "",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "其他"
      ],
      "origins": [
        "湖北省麻城市"
      ],
      "workPlaces": [],
      "accidentPlaces": [],
      "compensationEvents": [],
      "legalSignificance": "工伤保险先行支付制度在基层执行困境的代表：工伤认定后先行支付申请被拒，经行政诉讼、民事诉讼、强制执行完整程序链；死亡原因与事故类别页面未载（归为『其他』）；具体日期、争议焦点、判决结果待从案卷OCR提取，21页PDF原件无OCR；与伍锡梅案、陈用刚案同属先行支付类",
      "sourceLocators": "CASE-0007（案卷OCR，21页PDF无OCR）"
    },
    {
      "id": "case-wu-ximei-nanan-social-insurance",
      "title": "伍锡梅诉南岸区社保局工伤保险垫付案",
      "kind": "工伤认定与行政给付",
      "dateStart": "",
      "dateEnd": "",
      "representedByZhou": true,
      "workerCount": 1,
      "incidentCategory": [
        "行政程序制度执行",
        "岗位突发疾病猝死"
      ],
      "origins": [
        "重庆市开州区"
      ],
      "workPlaces": [],
      "accidentPlaces": [],
      "compensationEvents": [
        {
          "stage": "再审（五中院）",
          "date": "",
          "amount": 1000000,
          "note": "五中院撤销一、二审判决，判决南岸区社保局承担垫付责任，赔偿100多万元并已履行；精确数额页面未载"
        }
      ],
      "legalSignificance": "与 case-zhou-litai-apply-npc-wu-ximei 为同一伍锡梅案（本页为垫付线）；诉讼期间重庆高院工伤保险指导意见第24条（渝高法〔2021〕24号废止）被认定违反《社会保险法》第41条；经市检察院抗诉、市高院指令再审后改判；本页日期未载，详情见关联页面",
      "sourceLocators": "DC-0004；关联 case-zhou-litai-apply-npc-wu-ximei"
    }
  ],
  "compensationMatrix": [
    {
      "caseId": "case-wu-ximei-nanan-social-insurance",
      "title": "伍锡梅诉南岸区社保局工伤保险垫付案",
      "year": "",
      "amount": 1000000,
      "stage": "再审（五中院）",
      "workerCount": 1
    },
    {
      "caseId": "case-zhan-shanlin-work-death-disputed",
      "title": "占善林工伤死亡争议案",
      "year": "1994-06",
      "amount": 127173.6,
      "stage": "民事赔偿终审",
      "workerCount": 1
    },
    {
      "caseId": "case-xu-changwen-double-compensation",
      "title": "徐昌文夫妇交通事故与工伤事故双赔案",
      "year": "1996",
      "amount": 350000,
      "stage": "综合（仲裁与民事诉讼）",
      "workerCount": 2
    },
    {
      "caseId": "case-peng-gangzhong-amputation",
      "title": "彭刚中断手工伤赔偿案",
      "year": "1997",
      "amount": 172320.75,
      "stage": "二审",
      "workerCount": 1
    },
    {
      "caseId": "case-wang-qiong-shenzhen-admin-lawsuit",
      "title": "王琼等7人诉深圳市社会保险局龙岗分局行政诉讼案",
      "year": "1998",
      "amount": 28950,
      "stage": "社保待遇调整",
      "workerCount": 7
    },
    {
      "caseId": "case-liu-tao-record-compensation",
      "title": "刘涛巨额工伤赔偿案",
      "year": "1998",
      "amount": 1580000,
      "stage": "终审（二审）",
      "workerCount": 1
    },
    {
      "caseId": "case-hu-qingwang-shanghai-paralysis",
      "title": "胡庆旺诉上海申泰建筑物资经销公司工伤瘫痪索赔案",
      "year": "1999-07-16",
      "amount": 140000,
      "stage": "二审",
      "workerCount": 1
    },
    {
      "caseId": "case-feng-chengyang-shenzhen-work-injury",
      "title": "冯成杨诉升宁塑胶五金制品厂工伤赔偿案",
      "year": "1999-12-15",
      "amount": 26790,
      "stage": "私了辞退补偿",
      "workerCount": 1
    },
    {
      "caseId": "case-wan-jusheng-shanghai-amputation",
      "title": "万菊生诉上海金羽纸品印刷厂工伤截肢索赔案",
      "year": "2000-07-03",
      "amount": 150000,
      "stage": "二审",
      "workerCount": 1
    },
    {
      "caseId": "case-luo-shilin-occupational-disease",
      "title": "骆世林职业病双赔案",
      "year": "2003-09",
      "amount": 714921.66,
      "stage": "二审（民事）",
      "workerCount": 1
    },
    {
      "caseId": "case-mo-desong-occupational-disease",
      "title": "莫德松职业病案",
      "year": "2006-06",
      "amount": 400000,
      "stage": "一审（民事）",
      "workerCount": 1
    },
    {
      "caseId": "case-zhou-litai-apply-npc-wu-ximei",
      "title": "周立太因伍锡梅案申请人大撤销重庆高院违法文件案",
      "year": "2015-10-27",
      "amount": 1142318,
      "stage": "工伤待遇判决",
      "workerCount": 1
    },
    {
      "caseId": "case-luo-shangjun-labor-relation",
      "title": "罗尚军确认劳动关系及工伤赔偿案",
      "year": "2018-06-05",
      "amount": 700000,
      "stage": "工伤赔偿（最终）",
      "workerCount": 1
    }
  ]
};
