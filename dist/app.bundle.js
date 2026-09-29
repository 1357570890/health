function L(){let t=new Date,e=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0");return`${e}-${s}-${r}`}function C(){let t=new Date,e=t.getFullYear(),s=t.getMonth()+1,r=t.getDate(),l=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][t.getDay()];return`${e}\u5E74${s}\u6708${r}\u65E5 ${l}`}function x(t=440,e=.25){try{let s=window.AudioContext||window.webkitAudioContext;if(!s)return;let r=new s,a=r.createOscillator(),l=r.createGain();a.type="sine",a.frequency.setValueAtTime(t,r.currentTime),l.gain.setValueAtTime(.12,r.currentTime),l.gain.exponentialRampToValueAtTime(.001,r.currentTime+e),a.connect(l),l.connect(r.destination),a.start(),a.stop(r.currentTime+e)}catch{}}function _(t,e){try{return JSON.parse(t)||e}catch{return e}}var T=[{id:"slot_0700",label:"\u65E9\u8D77\u5524\u9192",time:"07:00~07:30",category:"water"},{id:"slot_0730",label:"\u8425\u517B\u65E9\u9910",time:"07:30~08:30",category:"meal"},{id:"slot_0830",label:"\u4E0A\u5348\u79D1\u7814",time:"08:30~10:00",category:"research"},{id:"slot_1000",label:"\u4E0A\u5348\u52A0\u9910",time:"10:00~10:30",category:"meal"},{id:"slot_1030",label:"\u4E0A\u5348\u653B\u575A",time:"10:30~11:30",category:"research"},{id:"slot_1130",label:"\u63A7\u6CB9\u5348\u9910",time:"11:30~12:30",category:"meal"},{id:"slot_1245",label:"\u80FD\u91CF\u5348\u4F11",time:"12:45~13:15",category:"sleep"},{id:"slot_1330",label:"\u4E0B\u5348\u5B9E\u64CD",time:"13:30~16:00",category:"research"},{id:"slot_1600",label:"\u8336\u6B47\u5FAE\u52A8",time:"16:00~17:30",category:"water"},{id:"slot_1730",label:"\u4F4E\u8102\u665A\u9910",time:"17:30~18:30",category:"meal"},{id:"slot_1900",label:"\u8FD0\u52A8\u8BAD\u7EC3",time:"19:00~20:30",category:"sport"},{id:"slot_2030",label:"\u6587\u732E\u6536\u5C3E",time:"20:30~22:30",category:"research"},{id:"slot_2230",label:"\u7761\u524D\u964D\u6E29",time:"22:30~23:15",category:"sleep"},{id:"slot_2330",label:"\u7184\u706F\u5165\u7720",time:"23:30~07:00",category:"sleep"}],M=["\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D","\u5468\u65E5"];function S(t,e){if(e==="slot_0700")return{type:"water",badge:"\u6E29\u6C34300ml",title:"\u6668\u5149\u951A\u5B9A + \u5524\u9192\u6C34",brief:"\u6E29\u5F00\u6C34300ml + \u7A97\u524D\u6652\u592A\u96335\u5206\u949F\u6821\u51C6\u8282\u5F8B",details:"\u8865\u5145\u591C\u95F4\u6C34\u5206\u635F\u8017\uFF0C\u6FC0\u6D3B\u80C3\u80A0\u8815\u52A8\u4E0E\u89C6\u4EA4\u53C9\u4E0A\u6838\u751F\u7269\u949F\u3002",tips:"\u4E25\u7981\u8D56\u5E8A\u770B\u624B\u673A\uFF0C\u7A97\u5E18\u62C9\u5F00\u8BA9\u81EA\u7136\u5149\u8FDB\u5165\u89C6\u7F51\u819C\u3002"};if(e==="slot_0730")return{type:"meal",badge:"\u9AD8\u86CB\u767D\u63A7\u7CD6",title:"\u65E9\u9910\uFF1A\u9ED1\u9EA6\u9762\u5305+\u725B\u5976+2\u6C34\u716E\u86CB",brief:"\u5168\u9ED1\u9EA6\u9762\u53052\u7247 + \u7EAF\u725B\u5976250ml + 2\u4E2A\u5168\u86CB",details:"\u4F18\u8D28\u590D\u5408\u78B3\u6C34+\u5B8C\u5168\u86CB\u767D+\u8111\u529B\u80C6\u78B1\uFF0C\u5E73\u7A33\u8840\u7CD6\u4E0D\u72AF\u56F0\u3002",sub:"\u725B\u5976\u2194\u8C46\u6D46300ml/\u5E0C\u814A\u9178\u5976150g\uFF1B\u9762\u5305\u2194\u539F\u5473\u71D5\u9EA6\u724735g",tips:"\u86CB\u9EC4\u5FC5\u5403\uFF1B\u9762\u5305\u914D\u6599\u8868\u9996\u4F4D\u5FC5\u987B\u662F\u9ED1\u9EA6\u7C89/\u5168\u9EA6\u7C89\u3002"};if(e==="slot_0830")return{type:"research",badge:"\u9AD8\u80FD\u8111\u529B\u533A",title:"\u9AD8\u8BA4\u77E5\u5F00\u9500\u79D1\u7814\uFF08\u63A8\u5BFC/\u96BE\u70B9\uFF09",brief:"\u4E13\u6CE8\u8BBA\u6587\u6838\u5FC3\u7AE0\u8282\u3001\u7B97\u6CD5\u67B6\u6784\u4E0E\u516C\u5F0F\u63A8\u5BFC",details:"\u5168\u5929\u76AE\u8D28\u9187\u4E0E\u8B66\u89C9\u5EA6\u5904\u4E8E\u5CF0\u503C\uFF0C\u653B\u575A\u6700\u8270\u6DF1\u3001\u6700\u6297\u62D2\u7684\u79D1\u7814\u786C\u9AA8\u5934\u3002",tips:"\u5173\u95ED\u5373\u65F6\u901A\u8BAF\u7FA4\u5F39\u7A97\uFF0C\u5F00\u542F45\u5206\u949F\u5DE5\u4F4D\u756A\u8304\u949F\u4E13\u6CE8\u3002"};if(e==="slot_1000")return{type:"meal",badge:"\u5FC5\u9700\u8102\u80AA\u9178",title:"\u52A0\u9910\uFF1A\u539F\u5473\u6DF7\u5408\u575A\u679C10~15g",brief:"\u539F\u5473\u575A\u679C10~15g + \u5DE5\u4F4D\u9888\u690E\u4E0B\u988C\u5FAE\u56DE\u7F29",details:"\u8865\u5145\u4E0D\u9971\u548C\u8102\u80AA\u9178\u4E0E\u6297\u6C27\u5316VE\uFF0C\u7F13\u89E3\u7528\u8111\u7D27\u7EF7\u611F\u3002",sub:"\u53EF\u6362\u4E3A\u5DF4\u65E6\u67288\u7C92\u6216\u6838\u6843\u4EC12\u4E2A\uFF084\u74E3\uFF09",tips:"\u4E25\u7981\u6293\u7740\u5403\u5927\u7F50\u88C5\uFF0C\u9632\u70ED\u91CF\u8D85\u6807\uFF1B\u62D2\u7EDD\u76D0\u7117\u7CD6\u88F9\u575A\u679C\u3002"};if(e==="slot_1030")return{type:"research",badge:"\u6DF1\u5EA6\u4EA7\u51FA",title:"\u5B9E\u9A8C\u65B9\u6848\u7EC6\u5316\u4E0E\u6587\u732E\u7814\u8BFB",brief:"\u7EC6\u5316\u6280\u672F\u8DEF\u7EBF\u4E0E\u5B9E\u9A8C\u53C2\u6570\u8BBE\u8BA1\uFF0C\u996E\u6C34250ml",details:"\u4FDD\u6301\u6C89\u6D78\uFF0C\u4E34\u8FD1\u5348\u9910\u524D\u5C0F\u53E3\u8865\u6C34\u589E\u5F3A\u9971\u8179\u611F\u3002",tips:"\u5DE5\u4F4D\u7AEF\u5750\uFF0C\u5750\u9AA8\u53D7\u529B\uFF0C\u907F\u514D\u8EAB\u4F53\u659C\u762B\u5728\u8F6C\u6905\u4E0A\u3002"};if(e==="slot_1130")return t==="\u5468\u65E5"?{type:"meal",badge:"\u653E\u7EB5\u9910(Cheat)",title:"\u5468\u65E5\u7279\u8C03\uFF1A\u8BA1\u5212\u5185\u653E\u7EB5\u9910",brief:"\u805A\u9910\u5403\u60F3\u5403\u7684\u7092\u83DC/\u725B\u8089\u706B\u9505\uFF0C\u63A7\u996E\u6599\uFF0C8\u5206\u9971",details:"\u5956\u52B1\u4E00\u5468\u523B\u82E6\u79D1\u7814\u63A8\u8FDB\uFF0C\u591A\u5DF4\u80FA\u5145\u80FD\uFF0C\u91CD\u7F6E\u7626\u7D20\u4EE3\u8C22\u3002",tips:"\u4F9D\u7136\u63A7\u5236\u7C73\u996D\u534A\u7897\uFF0C\u575A\u51B3\u4E0D\u559D\u9AD8\u7CD6\u5976\u8336\uFF0C\u5403\u52308\u5206\u9971\u5373\u6B62\u3002"}:{type:"meal",badge:"\u63A7\u6CB9\u9AD8\u9971\u8179",title:"\u5348\u9910\uFF1A1\u62F3\u7C73\u996D+2\u852C\u83DC+\u81EA\u5E26\u86CB\u767D",brief:"\u7C73\u996D1\u62F3\u5934 + \u98DF\u5802\u4F4E\u6CB9\u7D20\u83DC2\u4EFD + \u81EA\u5E26\u86CB\u767D1\u4EFD",details:"\u81EA\u5E26\u5373\u98DF\u9E21\u80F8100g/\u6C34\u6D78\u91D1\u67AA\u9C7C1\u7F50/\u9171\u725B\u808970g/\u53BB\u76AE\u5364\u9E21\u817F\u3002",sub:"\u7D20\u83DC\u7528\u5F00\u6C34\u8F7B\u6DAE\u4E24\u4E0B\uFF0C\u53BB\u9664\u8868\u976250%\u4EE5\u4E0A\u6D6E\u6CB9",tips:"\u4E25\u7981\u5403\u5730\u4E09\u9C9C\u3001\u70E7\u8304\u5B50\u7B49\u8FC7\u6CB9\u83DC\uFF0C\u7C73\u996D\u4E25\u683C\u96501\u62F3\u5934\u3002"};if(e==="slot_1245")return{type:"sleep",badge:"\u5FAE\u753525\u5206",title:"\u9EC4\u91D1\u5FAE\u5348\u4F11\uFF08Power Nap\uFF09",brief:"\u4F69\u6234\u906E\u5149\u773C\u7F69\u9759\u536720~25\u5206\u949F\uFF0C\u6E05\u7A7A\u795E\u7ECF\u817A\u82F7",details:"\u5FEB\u901F\u6062\u590D\u5927\u8111\u524D\u989D\u53F6\u8B66\u89C9\u5EA6\u4E0E\u8BA4\u77E5\u654F\u9510\u3002",tips:"\u7EDD\u5BF9\u4E0D\u8981\u8D85\u8FC730\u5206\u949F\uFF0C\u9632\u6B62\u8FDB\u5165\u6DF1\u7761\u9192\u540E\u7761\u7720\u60EF\u6027\u5934\u6655\u3002"};if(e==="slot_1330")return{type:"research",badge:"\u4EE3\u7801/\u5B9E\u9A8C",title:"\u4E0B\u5348\u8FDE\u7EED\u5B9E\u64CD\u533A\uFF08\u8C03\u8BD5/\u8DD1\u6570\uFF09",brief:"\u4EE3\u7801\u7F16\u5199\u8C03\u8BD5\u3001\u6570\u636E\u6E05\u6D17\u3001\u4EEA\u5668\u6D4B\u91CF\u6D4B\u8BD5",details:"\u9002\u5408\u6D41\u7A0B\u786E\u5B9A\u6027\u9AD8\u3001\u9700\u8981\u8FDE\u7EED\u64CD\u4F5C\u7684\u4E8B\u52A1\u6027\u5B66\u672F\u5DE5\u4F5C\u3002",tips:"\u6BCF45\u5206\u949F\u8D77\u8EAB\u63A5\u6C34\u4E00\u6B21\uFF08\u76EE\u6807350ml\uFF09\uFF0C\u9632\u4E0B\u80A2\u8840\u6D41\u6DE4\u6EDE\u3002"};if(e==="slot_1600")return{type:"water",badge:"\u6392\u9178\u8865\u6C34",title:"\u4E0B\u5348\u8336\u6B47\uFF1A\u8865\u6C34350ml + \u8D34\u5899\u62C9\u4F38",brief:"\u6E29\u6C34/\u65E0\u7CD6\u8336350ml + \u8D34\u5899W-Y\u6ED1\u884C15\u6B21",details:"\u6FC0\u6D3B\u4E2D\u4E0B\u659C\u65B9\u808C\u4E0E\u80CC\u9614\u808C\uFF0C\u51B2\u6563\u4E0B\u5348\u75B2\u4E4F\uFF0C\u4FC3\u8FDB\u5C3F\u9178\u6392\u51FA\u3002",tips:"\u542B\u5496\u5561\u56E0\u996E\u54C1\u5FC5\u987B\u622A\u65AD\u572815:00\u524D\uFF0C\u4FDD\u62A423:30\u6DF1\u7761\u7720\u3002"};if(e==="slot_1730")return t==="\u5468\u65E5"?{type:"meal",badge:"\u8F7B\u65AD\u98DF\u6392\u6C34\u80BF",title:"\u5468\u65E5\u665A\u7279\u8C03\uFF1A\u8F7B\u65AD\u98DF\u6392\u6C34\u80BF",brief:"\u6C34\u679C\u9EC4\u74DC1\u6839 + \u6C34\u6D78\u91D1\u67AA\u9C7C1\u7F50 + \u591A\u559D\u6E05\u6C34",details:"\u6392\u51FA\u4E2D\u5348\u653E\u7EB5\u9910\u6444\u5165\u7684\u591A\u4F59\u94A0\u76D0\uFF0C\u5468\u4E00\u6E05\u723D\u65E0\u6C34\u80BF\u8FDB\u5B9E\u9A8C\u5BA4\u3002",tips:"20:30\u540E\u53EA\u996E\u767D\u5F00\u6C34\uFF0C\u65E9\u70B9\u6D17\u6F31\u51C6\u5907\u4E0B\u5468\u7EC4\u4F1A\u3002"}:{type:"meal",badge:"\u4F4EGI\u7F13\u91CA",title:"\u665A\u9910\uFF1A\u7EA2\u85AF150g+\u9E21\u80F8\u8089100g+\u9EC4\u74DC",brief:"\u84B8\u7EA2\u85AF150g + \u5373\u98DF\u9E21\u80F8\u8089100g + \u6C34\u679C\u9EC4\u74DC1~2\u6839",details:"\u4F4E\u8102\u4F4E\u70ED\u91CF\uFF0C\u7ED9\u80C3\u80A0\u5145\u8DB3\u6392\u7A7A\u65F6\u95F4\uFF0C\u5B89\u7A33\u526F\u4EA4\u611F\u795E\u7ECF\u3002",sub:"\u7EA2\u85AF\u2194\u751C\u7389\u7C731\u6839\uFF1B\u9EC4\u74DC\u2194\u5723\u5973\u679C15~20\u9897",tips:"\u665A\u95F4\u4E3B\u98DF\u4E0D\u7FFB\u500D\uFF1B\u7761\u524D3\u5C0F\u65F6\u4E25\u683C\u7981\u98DF\uFF08\u4E0D\u5403\u591C\u5BB5\uFF09\u3002"};if(e==="slot_1900")switch(t){case"\u5468\u4E00":return{type:"sport",badge:"\u529B\u91CF\u6297\u963B",title:"\u529B\u91CF\u5065\u8EABA\uFF1A\u4E0A\u80A2\u63A8\u62C9 + \u9762\u62C9\u62A4\u80A9\u8896 + \u6838\u5FC3",brief:"\u4FEF\u5367\u6491\xD74\u7EC4 + \u5212\u8239\xD74\u7EC4 + \u9762\u62C9\xD74\u7EC4 + \u6838\u5FC3\u6297\u65CB\u8F6C",details:"\u91CD\u70B9\u5F3A\u5316\u80CC\u90E8\u4E0E\u80A9\u8896\u5916\u65CB\u808C\u7FA4\uFF0C\u5E73\u8861\u65E5\u5E38\u542B\u80F8\uFF0C\u4E3A\u7FBD\u7403\u6263\u6740\u7B51\u7262\u80A9\u80DB\u57FA\u5E95\u3002",tips:"\u9762\u62C9\uFF08Face Pull\uFF09\u62A4\u80A9\u795E\u5668\uFF0C\u5207\u5FCC\u7528\u5927\u81C2\u8038\u80A9\u501F\u529B\u3002"};case"\u5468\u4E8C":return{type:"sport",badge:"\u8DD1\u6B65\u5FC3\u80BA",title:"\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD14\u516C\u91CC (Zone 2)",brief:"\u64CD\u573A\u6162\u8DD14\u516C\u91CC\uFF0C\u6B65\u9891180\uFF0C\u5FC3\u7387130~145",details:"\u8F7B\u677E\u914D\u901F\u4E0D\u5806\u79EF\u4E73\u9178\uFF0C\u6D17\u5237\u75B2\u60EB\uFF0C\u4FC3\u8FDB\u8840\u6DB2\u643A\u6C27\uFF0C\u4E0D\u4F24\u8111\u529B\u3002",tips:"\u5168\u811A\u638C\u5E73\u7A33\u6EDA\u52A8\u7740\u5730\uFF0C\u5FAE\u5598\u80FD\u5BF9\u8BDD\uFF0C\u8DD1\u540E\u5C0F\u53E3\u8865\u6E29\u6C34\u3002"};case"\u5468\u4E09":return{type:"sport",badge:"\u529B\u91CF\u6297\u963B",title:"\u529B\u91CF\u5065\u8EABB\uFF1A\u4E0B\u80A2\u5355\u4FA7\u529B\u91CF + \u63D0\u8E35\u8DDF\u8171\u521A\u6027",brief:"\u4FDD\u52A0\u5229\u4E9A\u8E72\xD73\u7EC4 + \u5355\u817F\u786C\u62C9\xD73\u7EC4 + \u63D0\u8E35\xD74\u7EC4",details:"\u5355\u4FA7\u817F\u90E8\u8BAD\u7EC3\u7EA0\u6B63\u7FBD\u6BDB\u7403\u5F13\u6B65\u808C\u529B\u5931\u8861\uFF1B\u63D0\u8E35\u5F3A\u5316\u8DDF\u8171\u5F39\u8DF3\u4E0E\u6025\u505C\u3002",tips:"\u52A8\u4F5C\u653E\u6162\u611F\u53D7\u81C0\u808C\u53D1\u529B\uFF0C\u819D\u5173\u8282\u7EDD\u5BF9\u4E0D\u5185\u6263\u3002"};case"\u5468\u56DB":return{type:"sport",badge:"\u8DD1\u6B65\u5FC3\u80BA",title:"\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD14\u516C\u91CC (Zone 2)",brief:"\u64CD\u573A\u6162\u8DD14\u516C\u91CC\uFF0C\u6B65\u9891180\uFF0C\u5FC3\u7387\u7A33\u5B9A",details:"\u6062\u590D\u6027\u6709\u6C27\u8DD1\uFF0C\u4FC3\u8FDB\u8840\u6DB2\u5FAA\u73AF\u4E0E\u4EE3\u8C22\u5E9F\u7269\u6392\u7A7A\u3002",tips:"\u91CD\u5FC3\u524D\u503E\uFF0C\u624B\u81C2\u81EA\u7136\u524D\u540E\u6446\u52A8\uFF0C\u4E0D\u8981\u5DE6\u53F3\u6643\u52A8\u3002"};case"\u5468\u4E94":return{type:"sport",badge:"\u529B\u91CF\u6297\u963B",title:"\u529B\u91CF\u5065\u8EABC\uFF1A\u5168\u8EAB\u7EFC\u5408\u529F\u80FD\u6027\u6297\u963B + \u6838\u5FC3",brief:"\u4FEF\u5367\u6491\u8FDB\u9636\xD74\u7EC4 + \u5F39\u529B\u5E26\u9762\u62C9\xD74\u7EC4 + \u6B7B\u866B\u5F0F\u6838\u5FC3",details:"\u5DE9\u56FA\u4E0A\u80A2\u80A9\u80CC\u4E0E\u6838\u5FC3\u7A33\u5B9A\u6027\uFF0C\u5145\u6C9B\u4F53\u80FD\u8FCE\u63A5\u5468\u672B\u7FBD\u6BDB\u7403\u5BF9\u5C40\u3002",tips:"\u5168\u7A0B\u6536\u7D27\u8179\u6A2A\u808C\uFF0C\u4FDD\u62A4\u8170\u690E\u4E2D\u7ACB\u3002"};case"\u5468\u516D":return{type:"sport",badge:"\u7FBD\u7403\u5B9E\u6218",title:"\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u7403\u5BF9\u629790\u5206\u949F\uFF08\u9AD8\u71C3\u66B4\u6C57\uFF09",brief:"7\u5206\u949F\u52A8\u6001\u70ED\u8EAB + 20\u5206\u949F\u62C9\u5F00 + 60\u5206\u949F\u6218\u672F\u6BD4\u8D5B",details:"\u9AD8\u5F3A\u5EA6\u95F4\u6B47\uFF0C\u5168\u9762\u91CA\u653E\u79D1\u7814\u538B\u529B\uFF0C\u4EAB\u53D7\u4E0E\u7403\u53CB\u7ADE\u6280\u5FEB\u611F\u3002",tips:"\u5FC5\u987B\u7A7F\u4E13\u4E1A\u751F\u80F6\u5E95\u7FBD\u7403\u978B\uFF08\u4E25\u7981\u8DD1\u978B\u9632\u5D34\u811A\uFF09\uFF1B\u6253\u5B8C\u6362\u5E72\u8863\u670D\u3002"};case"\u5468\u65E5":return{type:"sport",badge:"\u7FBD\u7403/\u4E3B\u52A8\u6062\u590D",title:"\u7FBD\u7403\u5207\u78CB \u6216 \u6237\u5916\u6F2B\u6E38\u6392\u9178\uFF08\u8EAB\u5FC3\u91CD\u542F\uFF09",brief:"\u65B9\u6848A\uFF1A\u7EA6\u7403\u6253\u53CC\u625360~90\u5206\u949F\uFF1B\u65B9\u6848B\uFF1A\u6237\u5916\u6F2B\u6E38\u6392\u9178",details:"\u5F7B\u5E95\u653E\u4E0B\u6587\u732E\u4E0E\u4EE3\u7801\uFF0C\u6C90\u6D74\u9633\u5149\u5408\u6210\u7EF4\u751F\u7D20D\uFF0C\u8EAB\u5FC3\u91CD\u542F\u3002",tips:"\u4EAB\u53D7\u5FAE\u98CE\u4E0E\u9633\u5149\uFF0C\u4E0D\u8FFD\u6C42\u5FC3\u7387\u914D\u901F\u6307\u6807\u3002"}}return e==="slot_2030"?{type:"research",badge:"\u95ED\u73AF\u68B3\u7406",title:"\u6587\u732E\u9605\u8BFB\u4E0E\u660E\u65E5\u5F85\u529E\u6E05\u5355 (To-do)",brief:"\u68B3\u7406\u660E\u65E5\u5B9E\u9A8C\u6B65\u9AA4\uFF0C\u5217\u51FA3\u9879\u6838\u5FC3\u4EFB\u52A1\uFF0C21:00\u540E\u7981\u56FA\u4F53\u98DF\u7269",details:"\u5C06\u60AC\u800C\u672A\u51B3\u7684\u4E8B\u9879\u5199\u5728\u7EB8\u4E0A\uFF0C\u9632\u6B62\u7761\u524D\u5927\u8111\u53CD\u590D\u76D8\u65CB\u5F15\u8D77\u5931\u7720\u7126\u8651\u3002",tips:"\u79BB\u5F00\u5B9E\u9A8C\u5BA4\u56DE\u5BBF\u820D\uFF0C\u5F7B\u5E95\u4E0E\u5B9E\u9A8C\u53F0\u8131\u94A9\u3002"}:e==="slot_2230"?{type:"sleep",badge:"\u795E\u7ECF\u89E3\u538B",title:"\u6E29\u6C34\u6DCB\u6D74 + \u7518\u6C28\u9178\u9541 + \u6570\u5B57\u6392\u6BD2",brief:"\u6E29\u6C34\u6DCB\u6D74\u8BF1\u53D1\u6838\u5FC3\u4F53\u6E29\u4E0B\u964D\uFF0C\u624B\u673A\u653E\u7F6E\u79BB\u5E8A2\u7C73\uFF0C\u670D\u9541\u7247",details:"\u5916\u5468\u8840\u7BA1\u8212\u5F20\u6563\u70ED\u8BF1\u5BFC\u6DF1\u5EA6\u7761\u610F\uFF0C\u7518\u6C28\u9178\u9541\u8212\u7F13\u50F5\u786C\u9888\u80A9\u808C\u8089\u3002",tips:"\u4E25\u7981\u9760\u5728\u5E8A\u4E0A\u5237\u77ED\u89C6\u9891\uFF0C\u5E8A\u53EA\u7528\u4E8E\u7761\u89C9\u3002"}:e==="slot_2330"?{type:"sleep",badge:"5\u4E2A\u7761\u7720\u5468\u671F",title:"\u7184\u706F\u5165\u7720\uFF08\u4FDD\u8BC17.5\u5C0F\u65F6\u6DF1\u7761\u7720\uFF09",brief:"\u6162\u56DE\u5F39\u8033\u585E + \u5168\u906E\u5149\u773C\u7F69\uFF0C\u7761\u6EE15\u4E2A90\u5206\u949F\u5468\u671F",details:"\u8111\u810A\u6DB2\u8109\u51B2\u5F0F\u6E05\u9664\u65E5\u95F4\u4EE3\u8C22\u7684\u03B2-\u6DC0\u7C89\u6837\u86CB\u767D\u4E0Etau\u86CB\u767D\uFF0C\u4FEE\u590D\u7A81\u89E6\u8BB0\u5FC6\u3002",tips:"\u82E5\u8EBA\u4E0B25\u5206\u949F\u6BEB\u65E0\u56F0\u610F\uFF0C\u8D77\u8EAB\u5728\u6697\u5149\u4E0B\u770B\u5E72\u762A\u4E66\u7C4D\u76F4\u81F3\u54C8\u6B20\u8FDE\u5929\u518D\u56DE\u5E8A\u3002"}:{type:"other",badge:"\u65E5\u5E38",title:"\u81EA\u5F8B\u63A8\u8FDB",brief:"\u6309\u8BA1\u5212\u6267\u884C",details:"\u4FDD\u6301\u8282\u5F8B\u7A33\u6001\u3002"}}var W="grad_health_hub_records_v1",K="grad_health_hub_daily_tasks_v1",z="grad_health_hub_quick_presets_v1",Q="grad_plan_user_profile_v1",Z={stage:"\u5728\u8BFB\u7814\u7A76\u751F\uFF08\u5DE5\u4F4D\u5750\u73ED\u6A21\u5F0F\xB7\u65E0\u8BFE\u7A0B\uFF09",diet:{breakfast:"\u5168\u9ED1\u9EA6\u9762\u53052\u7247 + \u7EAF\u725B\u5976250ml + \u6C34\u716E\u86CB2\u4E2A",lunchProtein:"\u5373\u98DF\u9E21\u80F8\u8089100g",dinner:"\u84B8\u7EA2\u85AF150g + \u5373\u98DF\u9E21\u80F8\u8089100g + \u9EC4\u74DC1\u6839",coffeeCutoff:"15:00",fastingCutoff:"20:30"},exercise:{strengthDays:["\u5468\u4E00","\u5468\u4E09","\u5468\u4E94"],runDays:["\u5468\u4E8C","\u5468\u56DB"],runDistanceKm:"4\u516C\u91CC",badmintonDays:["\u5468\u516D","\u5468\u65E5"],badmintonDuration:"90\u5206\u949F"},routine:{waterDaily:"2000ml (8\u676F)",sleepTarget:"23:30 (5\u4E2A\u5468\u671F)",deskStretchIntervalMin:45}},Se=[{id:"preset_chicken",title:"\u5F00\u4E00\u5305\u81EA\u5E26\u9AD8\u86CB\u767D\uFF08\u5373\u98DF\u9E21\u80F8\u8089100g/\u9171\u725B\u808970g\uFF09",time:"\u5348\u9910/\u665A\u9910",category:"diet",badge:"\u4F18\u8D28\u86CB\u767D",details:"\u6EE1\u8DB3\u6BCF\u991025~30g\u86CB\u767D\uFF0C\u5148\u83DC\u8089\u540E\u7C73\u996D"},{id:"preset_coffee",title:"\u5348\u540E\u9ED1\u5496\u55611\u676F\uFF08200~250ml\uFF0C15:00\u524D\u622A\u6B62\u9501\u6B7B\uFF09",time:"13:30~15:00",category:"diet",badge:"\u9ED1\u5496\u5561",details:"\u63D0\u5347\u4E0B\u5348\u5DE5\u4F4D\u4E13\u6CE8\u5EA6\uFF0C\u8FC715:00\u4E25\u7981\u996E\u7528"},{id:"preset_desk_stretch",title:"\u5DE5\u4F4D\u9888\u690E\u4E0B\u988C\u5FAE\u56DE\u7F29\u4E0E\u95E8\u6846\u6269\u80F8\u62C9\u4F38",time:"\u6BCF45\u5206\u949F",category:"habit",badge:"\u5DE5\u4F4D\u5FAE\u52A8",details:"\u4E0B\u988C\u56DE\u7F2910\u6B21+\u95E8\u6846\u62C9\u4F3830\u79D2+\u63A5\u6C34250ml"},{id:"preset_run",title:"\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD14\u516C\u91CC\uFF08Zone 2\uFF0C\u6B65\u9891180\uFF09",time:"19:00~19:40",category:"sport",badge:"\u8DD1\u6B65\u5FC3\u80BA",details:"\u5FAE\u5598\u80FD\u5BF9\u8BDD\uFF0C\u6B65\u9891180\uFF0C\u5168\u811A\u638C\u6EDA\u52A8\u7740\u5730"},{id:"preset_badminton",title:"\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u7403\u5B9E\u6218\u5BF9\u629790\u5206\u949F",time:"19:00~20:30",category:"sport",badge:"\u7FBD\u7403\u9AD8\u71C3",details:"\u7A7F\u4E13\u4E1A\u751F\u80F6\u5E95\u7FBD\u7403\u978B\uFF0C\u52A8\u6001\u70ED\u8EAB7\u5206\u949F\u9632\u5D34\u811A"},{id:"preset_strength",title:"\u529B\u91CF\u6297\u963B\uFF1A\u4FEF\u5367\u6491+\u5212\u8239+\u9762\u62C9\u62A4\u80A9\u88964\u7EC4",time:"19:00~19:45",category:"sport",badge:"\u529B\u91CF\u6297\u963B",details:"\u9762\u62C9\u5F3A\u6548\u4FDD\u62A4\u80A9\u8896\u5C0F\u5706\u808C\uFF0C\u6838\u5FC3\u6297\u65CB\u8F6C"},{id:"preset_paper_read",title:"\u7CBE\u8BFB\u9876\u4F1A\u8BBA\u65871\u7BC7\u5E76\u505A\u5B9E\u9A8C\u65B9\u6CD5\u8BBA\u7B14\u8BB0",time:"14:00~15:30",category:"research",badge:"\u6587\u732E\u7CBE\u8BFB",details:"\u62C6\u89E3Method\u521B\u65B0\u70B9\u4E0E\u5B9E\u9A8C\u8BBE\u8BA1"},{id:"preset_code_debug",title:"\u6838\u5FC3\u6A21\u578B\u7B97\u6CD5\u4EE3\u7801\u8C03\u8BD5\u4E0E\u5B9E\u9A8C\u8DD1\u6570",time:"09:00~11:30",category:"research",badge:"\u5B9E\u9A8C\u5B9E\u64CD",details:"\u5173\u95ED\u65E0\u5173\u5F39\u7A97\uFF0C\u4E13\u6CE845\u5206\u949F\u5DE5\u4F4D\u4E13\u6CE8\u5757"},{id:"preset_meeting",title:"\u5BFC\u5E08\u9762\u5BF9\u9762\u6C9F\u901A\uFF08\u63D0\u95EE\u9898\u81EA\u5E262\u4E2A\u5177\u4F53\u65B9\u6848\uFF09",time:"15:00~16:30",category:"research",badge:"\u5BFC\u5E08\u6C47\u62A5",details:"\u4E8B\u5B9E\u4E0E\u60C5\u7EEA\u89E3\u8026\uFF0C\u63D0\u70BC\u5173\u952E\u8BA8\u8BBA\u70B9"},{id:"preset_sleep",title:"\u7761\u524D4-7-8\u547C\u5438\u6CD53\u7EC4\u4E0E23:30\u7184\u706F\u5165\u7720",time:"23:00~23:30",category:"habit",badge:"\u7761\u7720\u8282\u5F8B",details:"\u9501\u5B9A5\u4E2A\u5B8C\u657490\u5206\u949F\u7761\u7720\u5468\u671F\uFF0C\u8FDC\u79BB\u84DD\u5149"}],G=class{constructor(){this.listeners=new Map,this.records=this.loadRecords(),this.tasksByDate=this.loadTasks(),this.presets=this.loadPresets(),this.profile=this.loadProfile(),this.selectedDate=L(),this.ensureDateTasks(this.selectedDate)}loadRecords(){return _(localStorage.getItem(W),{})}saveRecords(){localStorage.setItem(W,JSON.stringify(this.records))}loadTasks(){return _(localStorage.getItem(K),{})}saveTasks(){localStorage.setItem(K,JSON.stringify(this.tasksByDate))}loadPresets(){let e=localStorage.getItem(z);return _(e,Se)}savePresets(){localStorage.setItem(z,JSON.stringify(this.presets))}loadProfile(){return _(localStorage.getItem(Q),Z)}saveProfile(){localStorage.setItem(Q,JSON.stringify(this.profile))}getUserProfile(){return this.profile||Z}updateUserProfile(e){this.profile={...this.profile,...e},this.saveProfile(),this.emit("profileChanged",this.profile),this.emit("stateChanged",null)}generateBaselineTasks(e){let s={meal:"diet",sport:"sport",research:"research",water:"habit",sleep:"habit"};return T.map(r=>{let a=S(e,r.id);return{id:`fixed_${r.id}`,time:r.time,label:r.label,title:a.title,category:s[a.type]||"habit",isFixed:!0,completed:!1,details:a.details,brief:a.brief,badge:a.badge,sub:a.sub||"",tips:a.tips||""}})}ensureDateTasks(e){if(!this.tasksByDate[e]){let s=new Date(e+"T00:00:00"),a=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][s.getDay()];this.tasksByDate[e]=this.generateBaselineTasks(a),this.saveTasks()}}getSelectedDate(){return this.selectedDate}getTasksForToday(){return this.getTasksForSelectedDate()}isViewingToday(){return this.selectedDate===L()}setSelectedDate(e){this.selectedDate=e,this.ensureDateTasks(e),this.emit("dateChanged",e),this.emit("tasksChanged",this.getTasksForSelectedDate())}getTasksForDate(e){return this.ensureDateTasks(e),this.tasksByDate[e]||[]}getTasksForSelectedDate(){return this.ensureDateTasks(this.selectedDate),this.tasksByDate[this.selectedDate]||[]}addTask(e,s=this.selectedDate){this.ensureDateTasks(s);let r={id:`custom_${Date.now()}`,time:e.time||"\u5168\u5929\u968F\u65F6",label:e.label||"\u4E34\u65F6\u4EFB\u52A1",title:e.title,category:e.category||"research",isFixed:!1,completed:!1,details:e.details||"\u624B\u52A8\u6DFB\u52A0\u7684\u5F85\u529E",brief:e.brief||"",badge:e.badge||"\u81EA\u5EFA\u4EFB\u52A1",sub:"",tips:""};return this.tasksByDate[s].push(r),this.saveTasks(),this.emit("tasksChanged",this.tasksByDate[s]),r}updateTask(e,s,r=this.selectedDate){this.ensureDateTasks(r);let a=this.tasksByDate[r]||[];this.tasksByDate[r]=a.map(l=>l.id===e?{...l,...s}:l),this.saveTasks(),this.emit("tasksChanged",this.tasksByDate[r])}deleteTask(e,s=this.selectedDate){this.ensureDateTasks(s);let r=this.tasksByDate[s]||[];this.tasksByDate[s]=r.filter(a=>a.id!==e),this.saveTasks(),this.emit("tasksChanged",this.tasksByDate[s])}toggleTask(e,s=this.selectedDate){this.ensureDateTasks(s);let r=this.tasksByDate[s]||[];this.tasksByDate[s]=r.map(a=>a.id===e?{...a,completed:!a.completed}:a),this.saveTasks(),this.emit("tasksChanged",this.tasksByDate[s])}resetDateToBaseline(e=this.selectedDate){let s=new Date(e+"T00:00:00"),a=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][s.getDay()];this.tasksByDate[e]=this.generateBaselineTasks(a),this.saveTasks(),this.emit("tasksChanged",this.tasksByDate[e])}calculateProgress(e=this.selectedDate){let s=this.tasksByDate[e]||[];if(s.length===0)return{total:0,done:0,percent:0};let r=s.filter(l=>l.completed).length,a=s.length;return{total:a,done:r,percent:Math.round(r/a*100)}}getQuickPresets(){return this.presets||[]}addQuickPreset(e){let s={id:`preset_${Date.now()}`,title:e.title,time:e.time||"\u5168\u5929\u968F\u65F6",category:e.category||"research",badge:e.badge||"\u5FEB\u6377",details:e.details||""};return this.presets.push(s),this.savePresets(),this.emit("presetsChanged",this.presets),s}deleteQuickPreset(e){this.presets=this.presets.filter(s=>s.id!==e),this.savePresets(),this.emit("presetsChanged",this.presets)}exportDataJson(){return JSON.stringify({records:this.records,tasksByDate:this.tasksByDate,presets:this.presets,profile:this.profile,exportedAt:new Date().toISOString()},null,2)}importDataJson(e){let s=_(e,null);return s&&typeof s=="object"?(s.records&&(this.records=s.records),s.tasksByDate&&(this.tasksByDate=s.tasksByDate),s.presets&&(this.presets=s.presets),s.profile&&(this.profile=s.profile),this.saveRecords(),this.saveTasks(),this.savePresets(),this.saveProfile(),this.emit("tasksChanged",this.getTasksForSelectedDate()),this.emit("presetsChanged",this.presets),this.emit("profileChanged",this.profile),!0):!1}subscribe(e,s){return this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(s),()=>{let r=this.listeners.get(e)||[];this.listeners.set(e,r.filter(a=>a!==s))}}emit(e,s){(this.listeners.get(e)||[]).forEach(a=>{try{a(s)}catch(l){console.error("EventBus error:",l)}})}},n=new G;var F="grad_health_hub_sync_config_v1",U=class{constructor(){this.config=this.loadConfig(),this.status="idle",this.lastSyncTime=this.config.lastSyncTime||null,this.listeners=[],this.autoSyncTimer=null,n.subscribe("tasksChanged",()=>this.scheduleAutoPush()),n.subscribe("stateChanged",()=>this.scheduleAutoPush()),n.subscribe("presetsChanged",()=>this.scheduleAutoPush()),typeof window<"u"&&(document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&this.isConfigured()&&this.pullFromCloud(!0)}),window.addEventListener("focus",()=>{this.isConfigured()&&this.pullFromCloud(!0)}))}loadConfig(){let e=localStorage.getItem(F);return _(e,{token:"",gistId:""})}saveConfig(e){this.config={...this.config,...e},localStorage.setItem(F,JSON.stringify(this.config)),this.notify()}isConfigured(){return!!(this.config.token&&this.config.gistId)}getStatus(){return{status:this.status,isConfigured:this.isConfigured(),lastSyncTime:this.lastSyncTime,gistId:this.config.gistId}}subscribe(e){return this.listeners.push(e),()=>{this.listeners=this.listeners.filter(s=>s!==e)}}notify(){this.listeners.forEach(e=>{try{e(this.getStatus())}catch(s){console.error("Sync listener error:",s)}})}scheduleAutoPush(){this.isConfigured()&&(this.autoSyncTimer&&clearTimeout(this.autoSyncTimer),this.autoSyncTimer=setTimeout(()=>{this.pushToCloud(!0)},1200))}async pullFromCloud(e=!1){if(!this.isConfigured())return!1;this.status="syncing",this.notify();try{let s=await fetch(`https://api.github.com/gists/${this.config.gistId}`,{headers:{Authorization:`token ${this.config.token}`,Accept:"application/vnd.github.v3+json"}});if(!s.ok)throw new Error(`\u4E91\u7AEF\u62C9\u53D6\u5931\u8D25 (HTTP ${s.status})`);let a=(await s.json()).files["grad_health_hub_data.json"];if(!a||!a.content)throw new Error("\u4E91\u7AEF\u6570\u636E\u6587\u4EF6\u4E0D\u5B58\u5728");let l=n.importDataJson(a.content);return l?(this.status="synced",this.lastSyncTime=new Date().toLocaleTimeString("zh-CN",{hour12:!1}),this.saveConfig({lastSyncTime:this.lastSyncTime})):this.status="error",this.notify(),l}catch(s){return this.status="error",this.notify(),e||console.error("Pull from cloud error:",s),!1}}async pushToCloud(e=!1){if(!this.isConfigured())return!1;this.status="syncing",this.notify();try{let r={description:"\u7814\u9014\u751F\u6D3B\u5065\u5EB7\u4E2D\u67A2 - \u8DE8\u7AEF\u81EA\u5F8B\u6570\u636E\u540C\u6B65 (Private Gist)",files:{"grad_health_hub_data.json":{content:n.exportDataJson()}}},a=await fetch(`https://api.github.com/gists/${this.config.gistId}`,{method:"PATCH",headers:{Authorization:`token ${this.config.token}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok)throw new Error(`\u4E91\u7AEF\u63A8\u9001\u5931\u8D25 (HTTP ${a.status})`);return this.status="synced",this.lastSyncTime=new Date().toLocaleTimeString("zh-CN",{hour12:!1}),this.saveConfig({lastSyncTime:this.lastSyncTime}),this.notify(),!0}catch(s){return this.status="error",this.notify(),e||console.error("Push to cloud error:",s),!1}}async autoCreatePrivateGist(e){if(!e)throw new Error("\u8BF7\u8F93\u5165\u6709\u6548\u7684 GitHub Token\uFF01");let r={description:"\u7814\u9014\u751F\u6D3B\u5065\u5EB7\u4E2D\u67A2 - \u4E2A\u4EBA\u4E13\u5C5E\u8DE8\u7AEF\u79C1\u5BC6\u5B58\u50A8\u5E93",public:!1,files:{"grad_health_hub_data.json":{content:n.exportDataJson()}}},a=await fetch("https://api.github.com/gists",{method:"POST",headers:{Authorization:`token ${e}`,Accept:"application/vnd.github.v3+json","Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok)throw new Error(`\u521B\u5EFA\u79C1\u5BC6Gist\u5931\u8D25 (HTTP ${a.status})\uFF0C\u8BF7\u68C0\u67E5Token\u662F\u5426\u6709\u52FE\u9009 gist \u6743\u9650`);let l=await a.json();return this.saveConfig({token:e,gistId:l.id}),this.status="synced",this.lastSyncTime=new Date().toLocaleTimeString("zh-CN",{hour12:!1}),this.notify(),l.id}disconnect(){this.config={token:"",gistId:""},localStorage.removeItem(F),this.status="idle",this.lastSyncTime=null,this.notify()}},y=new U;function X(t){let e=document.createElement("div");e.className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200";function s(){let r=y.getStatus(),a=r.isConfigured?btoa(JSON.stringify(y.config)):"",l=r.isConfigured?`${window.location.origin}${window.location.pathname}#sync=${encodeURIComponent(a)}`:"";e.innerHTML=`
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
        <!-- \u5F39\u7A97\u6807\u9898 -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>\u2601\uFE0F</span>
              <span>\u624B\u673A\u4E0E\u5DE5\u4F4D\u7535\u8111\u8DE8\u7AEF\u5B9E\u65F6\u540C\u6B65</span>
            </h3>
            <p class="text-[11px] text-slate-400 mt-0.5">\u57FA\u4E8E\u4E2A\u4EBA\u79C1\u5BC6 GitHub Gist\uFF0C\u96F6\u4E2D\u5FC3\u5316\u3001\u6C38\u4E45\u514D\u8D39\u3001\u5230\u54EA\u90FD\u80FD\u79D2\u7EA7\u4E92\u901A</p>
          </div>
          <button id="sync-modal-close" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">\u2715</button>
        </div>

        ${r.isConfigured?`
          <!-- \u5DF2\u8FDE\u63A5\u72B6\u6001\u9762\u677F -->
          <div class="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/60 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center space-x-1.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>\u8DE8\u7AEF\u4E91\u540C\u6B65\u5DF2\u5C31\u7EEA (\u53CC\u5411\u5BF9\u79F0)</span>
              </span>
              <span class="text-[10px] text-slate-400 font-mono">Gist ID: ${r.gistId.slice(0,8)}...</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300">
              \u624B\u673A\u7AEF\u6253\u5361\u540E\u5C06\u81EA\u52A8\u540E\u53F0\u9759\u9ED8\u63A8\u9001\uFF1B\u7535\u8111\u5DE5\u4F4D\u5207\u56DE\u7F51\u9875\u65F6\u5C06\u81EA\u52A8\u9759\u9ED8\u62C9\u53D6\u6700\u65B0\u8FDB\u5EA6\uFF0C\u5B9E\u73B0\u5168\u5929\u5019\u65E0\u7F1D\u540C\u6B65\u3002
            </p>
            <div class="text-[11px] text-slate-400 pt-1 border-t border-emerald-200/60 dark:border-emerald-900/40 flex justify-between">
              <span>\u4E0A\u6B21\u540C\u6B65\u65F6\u95F4\uFF1A</span>
              <span class="font-bold text-emerald-700 dark:text-emerald-400">${r.lastSyncTime||"\u521A\u521A"}</span>
            </div>
          </div>

          <!-- \u624B\u52A8\u540C\u6B65\u4E0E\u8DE8\u8BBE\u5907\u4E32\u7801 -->
          <div class="grid grid-cols-2 gap-2.5">
            <button id="manual-pull-btn" class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-750 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center space-x-1">
              <span>\u2B07\uFE0F</span>
              <span>\u62C9\u53D6\u4E91\u7AEF\u6700\u65B0</span>
            </button>
            <button id="manual-push-btn" class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm transition-all flex items-center justify-center space-x-1">
              <span>\u2B06\uFE0F</span>
              <span>\u5F3A\u5236\u8986\u76D6\u4E91\u7AEF</span>
            </button>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 text-xs space-y-3">
            <div class="font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>\u{1F4F1} \u624B\u673A\u514D\u8F93\u81EA\u52A8\u914D\u5BF9</span>
              <button id="copy-sync-link-btn" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition-all">
                \u{1F4CB} \u590D\u5236\u4E00\u952E\u76F4\u8FDE\u7F51\u5740
              </button>
            </div>
            
            <div class="flex items-center space-x-3 bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(l)}" alt="\u624B\u673A\u626B\u7801\u76F4\u8FBE" class="w-20 h-20 rounded-lg border border-slate-200 shadow-sm shrink-0" />
              <div class="text-[11px] text-slate-500 leading-relaxed space-y-1">
                <p class="font-semibold text-slate-700 dark:text-slate-200">\u65B9\u5F0F A\uFF1A\u624B\u673A\u76F8\u673A/\u5FAE\u4FE1\u626B\u7801</p>
                <p>\u76F4\u63A5\u626B\u7801\u6253\u5F00\uFF0C\u624B\u673A\u81EA\u52A8\u6FC0\u6D3B\u540C\u6B65\u5E76\u62B9\u53BB\u5BC6\u94A5\uFF0C\u96F6\u8F93\u5165\u5373\u523B\u4E92\u901A\uFF01</p>
                <p class="pt-0.5"><a href="javascript:void(0)" id="copy-sync-code-btn" class="text-blue-600 dark:text-blue-400 hover:underline">\u65B9\u5F0F B\uFF1A\u70B9\u51FB\u590D\u5236\u539F\u59CB\u4E32\u7801\u624B\u52A8\u5BFC\u5165</a></p>
              </div>
            </div>
          </div>

          <div class="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-700">
            <button id="disconnect-sync-btn" class="text-xs text-rose-500 hover:underline font-semibold">
              \u65AD\u5F00\u4E91\u540C\u6B65
            </button>
            <button id="sync-done-btn" class="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs">
              \u5B8C\u6210\u5E76\u8FD4\u56DE
            </button>
          </div>
        `:`
          <!-- \u672A\u8FDE\u63A5\u914D\u7F6E\u9762\u677F -->
          <div class="space-y-3">
            <div class="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300 space-y-1">
              <span class="font-bold block">\u{1F4A1} \u9996\u6B21\u914D\u7F6E\u53EA\u970030\u79D2\uFF08\u4E24\u6B65\u5373\u53EF\uFF09\uFF1A</span>
              <p class="text-[11px] leading-relaxed">
                1. \u6253\u5F00 GitHub \u279C Settings \u279C Developer settings \u279C Personal access tokens \u279C \u52FE\u9009 <b>gist</b> \u6743\u9650\u751F\u6210 Token\uFF1B<br>
                2. \u5C06 Token \u7C98\u8D34\u5728\u4E0B\u65B9\uFF0C\u70B9\u51FB\u4E00\u952E\u521B\u5EFA\u79C1\u5BC6\u4E91\u5E93\u5373\u53EF\uFF0C\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u5E2E\u60A8\u6258\u7BA1\u3002
              </p>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">GitHub Personal Access Token</label>
              <input
                type="password"
                id="sync-token-input"
                placeholder="ghp_xxxxxxxxxxxxxx"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <!-- \u65B9\u5F0FA\uFF1A\u4E00\u952E\u81EA\u52A8\u521B\u5EFA\u79C1\u5BC6\u5E93 -->
            <button
              id="auto-create-btn"
              class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>\u{1F680}</span>
              <span>\u4E00\u952E\u81EA\u52A8\u521B\u5EFA\u79C1\u5BC6\u4E91\u5E93\u5E76\u8FDE\u63A5</span>
            </button>

            <!-- \u65B9\u5F0FB\uFF1A\u5BFC\u5165\u5176\u4ED6\u8BBE\u5907\u751F\u6210\u7684\u540C\u6B65\u7801 -->
            <div class="pt-2 border-t border-slate-100 dark:border-slate-700">
              <span class="block text-[11px] font-bold text-slate-400 mb-1.5">\u6216\u8005\u7C98\u8D34\u53E6\u4E00\u53F0\u8BBE\u5907\u5206\u4EAB\u7684\u3010\u5FEB\u901F\u540C\u6B65\u4E32\u7801\u3011\uFF1A</span>
              <div class="flex space-x-2">
                <input
                  type="text"
                  id="paste-sync-code-input"
                  placeholder="\u7C98\u8D34\u7531\u7535\u8111\u590D\u5236\u7684\u5B8C\u6574\u540C\u6B65\u4E32\u7801..."
                  class="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs font-mono outline-none"
                />
                <button id="import-code-btn" class="px-3.5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs">
                  \u5BFC\u5165\u7ED1\u5B9A
                </button>
              </div>
            </div>
          </div>
        `}
      </div>
    `;let d=()=>{e.remove(),t?.()};e.querySelector("#sync-modal-close")?.addEventListener("click",d),e.querySelector("#sync-done-btn")?.addEventListener("click",d),e.querySelector("#auto-create-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#sync-token-input")?.value?.trim();if(!i){alert("\u8BF7\u8F93\u5165\u6709\u6548\u7684 GitHub Token\uFF01");return}try{e.querySelector("#auto-create-btn").textContent="\u6B63\u5728\u4E91\u7AEF\u521D\u59CB\u5316\u79C1\u5BC6\u5B58\u50A8\u5E93...",e.querySelector("#auto-create-btn").disabled=!0,await y.autoCreatePrivateGist(i),x(659.25,.2),alert("\u{1F389} \u8DE8\u7AEF\u79C1\u5BC6\u4E91\u5E93\u521B\u5EFA\u6210\u529F\uFF01\u624B\u673A\u4E0E\u7535\u8111\u5DF2\u5EFA\u7ACB\u53CC\u5411\u5B9E\u65F6\u540C\u6B65\u901A\u9053\u3002"),s()}catch(o){alert("\u8FDE\u63A5\u5931\u8D25\uFF1A"+o.message),s()}}),e.querySelector("#copy-sync-link-btn")?.addEventListener("click",()=>{let i=btoa(JSON.stringify(y.config)),o=`${window.location.origin}${window.location.pathname}#sync=${encodeURIComponent(i)}`;navigator.clipboard?.writeText(o).then(()=>{alert("\u2705 \u4E00\u952E\u76F4\u8FDE\u7F51\u5740\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF01\u53D1\u9001\u7ED9\u5FAE\u4FE1/QQ\u5E76\u5728\u624B\u673A\u6253\u5F00\uFF0C\u5373\u53EF\u81EA\u52A8\u5B8C\u6210\u914D\u5BF9\u3002")})}),e.querySelector("#copy-sync-code-btn")?.addEventListener("click",()=>{let i=btoa(JSON.stringify(y.config));navigator.clipboard?.writeText(i).then(()=>{alert("\u2705 \u5FEB\u901F\u540C\u6B65\u4E32\u7801\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF01\u53D1\u9001\u81F3\u624B\u673A\u7F51\u9875\u7AEF\u7C98\u8D34\u5373\u53EF\u4E00\u952E\u5B8C\u6210\u914D\u5BF9\u3002")})}),e.querySelector("#import-code-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#paste-sync-code-input")?.value?.trim();if(i)try{let o=JSON.parse(atob(i));o.token&&o.gistId?(y.saveConfig({token:o.token,gistId:o.gistId}),await y.pullFromCloud(),alert("\u{1F389} \u8DE8\u7AEF\u914D\u7F6E\u5BFC\u5165\u6210\u529F\uFF01\u5DF2\u4E0E\u7535\u8111\u7AEF\u5B9E\u65F6\u4E92\u901A\u3002"),s()):alert("\u540C\u6B65\u4E32\u7801\u65E0\u6548\u3002")}catch{alert("\u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u786E\u4FDD\u590D\u5236\u7684\u662F\u5B8C\u6574\u540C\u6B65\u4E32\u7801\u3002")}}),e.querySelector("#manual-pull-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#manual-pull-btn");i.textContent="\u6B63\u5728\u4ECE\u4E91\u7AEF\u62C9\u53D6...",await y.pullFromCloud()?(x(523.25,.15),alert("\u5DF2\u6210\u529F\u4ECE\u4E91\u7AEF\u62C9\u53D6\u6700\u65B0\u6253\u5361\u4E0E\u65E5\u7A0B\u6570\u636E\uFF01")):alert("\u62C9\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u3002"),s()}),e.querySelector("#manual-push-btn")?.addEventListener("click",async()=>{let i=e.querySelector("#manual-push-btn");i.textContent="\u6B63\u5728\u8986\u76D6\u4E0A\u4F20...",await y.pushToCloud()?(x(659.25,.2),alert("\u672C\u5730\u5168\u90E8\u6570\u636E\u5DF2\u6210\u529F\u63A8\u9001\u5230\u4E91\u7AEF\u79C1\u5BC6\u5B58\u50A8\u5E93\uFF01")):alert("\u63A8\u9001\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3002"),s()}),e.querySelector("#disconnect-sync-btn")?.addEventListener("click",()=>{confirm("\u786E\u5B9A\u65AD\u5F00\u4E91\u7AEF\u540C\u6B65\u5417\uFF1F\uFF08\u672C\u5730\u6570\u636E\u4E0D\u4F1A\u4E22\u5931\uFF09")&&(y.disconnect(),s())})}return s(),e}function P(){let t=document.createElement("div");t.className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150";let e=n.getUserProfile();t.innerHTML=`
    <div class="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            \u4E2A\u4EBA\u4E13\u5C5E\u504F\u597D\u4E0E\u5DE5\u4F4D\u6863\u6848
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400">\u7CFB\u7EDF\u5C06\u4F9D\u636E\u6B64\u914D\u7F6E\u52A8\u6001\u8BA1\u7B97\u4E13\u5C5E\u63D0\u9192\u4E0E\u8BA1\u5212</p>
        </div>
        <button id="close-profile-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <form id="profile-form" class="space-y-4 text-xs">
        <!-- \u8EAB\u4EFD\u9636\u6BB5 -->
        <div class="space-y-1.5">
          <label class="block font-semibold text-slate-700 dark:text-slate-300">\u5F53\u524D\u8EAB\u4EFD\u72B6\u6001</label>
          <input type="text" id="prof-stage" value="${e.stage||"\u5728\u8BFB\u7814\u7A76\u751F\uFF08\u5DE5\u4F4D\u5750\u73ED\u6A21\u5F0F\xB7\u65E0\u8BFE\u7A0B\uFF09"}" class="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white">
        </div>

        <!-- \u996E\u98DF\u914D\u7F6E -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">\u63A7\u7CD6\u996E\u98DF\u6807\u914D\u53C2\u6570</span>
          <div class="space-y-1">
            <label class="block text-slate-500 dark:text-slate-400">\u5348\u9910\u81EA\u5E26\u9AD8\u86CB\u767D\u9996\u9009</label>
            <select id="prof-protein" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
              <option value="\u5373\u98DF\u9E21\u80F8\u8089100g" ${e.diet?.lunchProtein==="\u5373\u98DF\u9E21\u80F8\u8089100g"?"selected":""}>\u5373\u98DF\u9E21\u80F8\u8089100g\uFF08\u968F\u62C6\u968F\u5403\uFF09</option>
              <option value="\u539F\u5473\u9171\u725B\u808970g" ${e.diet?.lunchProtein==="\u539F\u5473\u9171\u725B\u808970g"?"selected":""}>\u539F\u5473\u9171\u725B\u808970g\uFF08\u8010\u9965\u6297\u997F\uFF09</option>
              <option value="\u6C34\u6D78\u91D1\u67AA\u9C7C\u7F50\u59341\u7F50" ${e.diet?.lunchProtein==="\u6C34\u6D78\u91D1\u67AA\u9C7C\u7F50\u59341\u7F50"?"selected":""}>\u6C34\u6D78\u91D1\u67AA\u9C7C\u7F50\u59341\u7F50\uFF08DHA\u4E0E\u9AD8\u86CB\u767D\uFF09</option>
              <option value="\u53BB\u76AE\u5364\u9E21\u817F1\u4E2A" ${e.diet?.lunchProtein==="\u53BB\u76AE\u5364\u9E21\u817F1\u4E2A"?"selected":""}>\u53BB\u76AE\u5364\u9E21\u817F1\u4E2A\uFF08\u5265\u76AE\u53BB\u6CB9\uFF09</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u5496\u5561\u56E0\u6444\u5165\u622A\u6B62\u65F6\u95F4</label>
              <input type="text" id="prof-coffee-cutoff" value="${e.diet?.coffeeCutoff||"15:00"}" placeholder="15:00" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u665A\u9910\u665A\u95F4\u7981\u98DF\u7EBF</label>
              <input type="text" id="prof-fasting-cutoff" value="${e.diet?.fastingCutoff||"20:30"}" placeholder="20:30" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <!-- \u4F53\u80FD\u4E0E\u8FD0\u52A8\u914D\u7F6E -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">3+2\u4F53\u80FD\u4E0E\u7FBD\u7403\u914D\u7F6E</span>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u64CD\u573A\u6162\u8DD1\u76EE\u6807\u91CC\u7A0B</label>
              <input type="text" id="prof-run-distance" value="${e.exercise?.runDistanceKm||"4\u516C\u91CC"}" placeholder="4\u516C\u91CC" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u7FBD\u6BDB\u7403\u5355\u6B21\u65F6\u957F</label>
              <input type="text" id="prof-badminton-duration" value="${e.exercise?.badmintonDuration||"90\u5206\u949F"}" placeholder="90\u5206\u949F" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <!-- \u7761\u7720\u4F5C\u606F\u4E0E\u8865\u6C34 -->
        <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
          <span class="font-bold text-slate-800 dark:text-slate-200 block">\u5DE5\u4F4D\u4F5C\u606F\u4E0E\u8865\u6C34\u76EE\u6807</span>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u5168\u5929\u996E\u6C34\u76EE\u6807</label>
              <input type="text" id="prof-water-target" value="${e.routine?.waterDaily||"2000ml (8\u676F)"}" placeholder="2000ml" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
            <div>
              <label class="block text-slate-500 dark:text-slate-400">\u76EE\u6807\u7184\u706F\u5C31\u5BDD\u65F6\u95F4</label>
              <input type="text" id="prof-sleep-time" value="${e.routine?.sleepTarget||"23:30 (5\u4E2A\u5468\u671F)"}" placeholder="23:30" class="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-2.5 pt-2">
          <button type="button" id="cancel-profile-btn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
            \u53D6\u6D88
          </button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm">
            \u4FDD\u5B58\u5E76\u7ACB\u5373\u751F\u6548
          </button>
        </div>
      </form>
    </div>
  `;let s=()=>t.remove();return t.querySelector("#close-profile-btn")?.addEventListener("click",s),t.querySelector("#cancel-profile-btn")?.addEventListener("click",s),t.addEventListener("click",a=>{a.target===t&&s()}),t.querySelector("#profile-form")?.addEventListener("submit",a=>{a.preventDefault();let l=t.querySelector("#prof-stage").value.trim(),d=t.querySelector("#prof-protein").value,i=t.querySelector("#prof-coffee-cutoff").value.trim(),o=t.querySelector("#prof-fasting-cutoff").value.trim(),c=t.querySelector("#prof-run-distance").value.trim(),g=t.querySelector("#prof-badminton-duration").value.trim(),k=t.querySelector("#prof-water-target").value.trim(),p=t.querySelector("#prof-sleep-time").value.trim();n.updateUserProfile({stage:l,diet:{...e.diet,lunchProtein:d,coffeeCutoff:i,fastingCutoff:o},exercise:{...e.exercise,runDistanceKm:c,badmintonDuration:g},routine:{...e.routine,waterDaily:k,sleepTarget:p}}),y.isConfigured()&&y.pushToCloud(),x(784,.15),s()}),t}function ee(t,e,s){let r=document.createElement("div"),a=[{id:"overview",label:"\u603B\u89C8",shortLabel:"\u603B\u89C8"},{id:"daily",label:"\u4ECA\u65E5\u6267\u884C",shortLabel:"\u6267\u884C"},{id:"timetable",label:"\u65E5\u7A0B\u8BFE\u8868",shortLabel:"\u8BFE\u8868"},{id:"plans",label:"\u89C4\u7A0B\u624B\u518C",shortLabel:"\u624B\u518C"},{id:"tools",label:"\u5DE5\u5177\u7BB1",shortLabel:"\u5DE5\u5177"}];function l(){let c=y.getStatus();return c.isConfigured?c.status==="syncing"?`
        <button id="nav-sync-btn" title="\u6B63\u5728\u4E0E\u4E91\u7AEF\u53CC\u5411\u540C\u6B65..." class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-300 border border-sky-300 dark:border-sky-800 transition-all">
          <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
          <span>\u540C\u6B65\u4E2D</span>
        </button>
      `:`
      <button id="nav-sync-btn" title="\u8DE8\u7AEF\u5B9E\u65F6\u540C\u6B65\u5C31\u7EEA (\u4E0A\u6B21\u540C\u6B65: ${c.lastSyncTime||"\u521A\u521A"})" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 transition-all">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <span>\u5DF2\u540C\u6B65</span>
      </button>
    `:`
        <button id="nav-sync-btn" title="\u70B9\u51FB\u914D\u7F6E\u624B\u673A\u4E0E\u7535\u8111\u8DE8\u7AEF\u4E91\u540C\u6B65" class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-all">
          <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          <span>\u672A\u8054\u4E91</span>
        </button>
      `}r.innerHTML=`
    <!-- 1. \u684C\u9762\u7AEF\u9876\u90E8\u5BFC\u822A\u680F (\u79FB\u52A8\u7AEF\u7B80\u5316) -->
    <header class="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-sm">
      <div class="max-w-7xl mx-auto px-3 sm:px-6">
        <div class="py-2.5 flex items-center justify-between gap-3">
          <!-- \u54C1\u724C\u6807\u8BC6 -->
          <div class="flex items-center space-x-2.5 cursor-pointer" id="brand-logo">
            <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs tracking-wider shadow-sm">
              GP
            </div>
            <div>
              <div class="flex items-center space-x-1.5">
                <h1 class="text-sm font-bold text-slate-900 dark:text-white leading-tight">GradPlan</h1>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">\u7814\u9014\u89C4\u5212</span>
              </div>
              <p class="text-[10px] text-slate-400 dark:text-slate-500">\u7814\u7A76\u751F\u5168\u57DF\u8BA1\u5212\u4E0E\u81EA\u5F8B\u4E2D\u67A2</p>
            </div>
          </div>

          <!-- \u684C\u9762\u7AEF\u6A2A\u5411\u5207\u6362\u680F -->
          <div class="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            ${a.map(c=>{let g=t===c.id;return`
                  <button
                    data-mode="${c.id}"
                    class="desktop-nav-btn px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${g?"bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm":"text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"}"
                  >
                    <span>${c.label}</span>
                  </button>
                `}).join("")}
          </div>

          <!-- \u53F3\u4FA7\u63A7\u4EF6\uFF1A\u5DE5\u4F4D\u504F\u597D\u8BBE\u7F6E + \u8DE8\u7AEF\u4E91\u540C\u6B65\u72B6\u6001 + \u4E3B\u9898\u5207\u6362 -->
          <div class="flex items-center space-x-1.5 sm:space-x-2">
            <button
              id="nav-profile-btn"
              title="\u4E2A\u4EBA\u5DE5\u4F4D\u504F\u597D\u4E0E\u751F\u6D3B\u753B\u50CF\u8BBE\u7F6E"
              class="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-all"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span class="hidden sm:inline">\u5DE5\u4F4D\u504F\u597D</span>
            </button>

            <div id="sync-badge-container">${l()}</div>

            <button
              id="theme-toggle"
              title="\u5207\u6362\u660E\u6697\u8272\u5F69\u4E3B\u9898"
              class="p-1.5 sm:p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              <span class="dark:hidden text-xs">\u{1F319}</span>
              <span class="hidden dark:inline text-xs">\u2600\uFE0F</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. \u624B\u673A\u7AEF\u4E13\u5C5E\u5E95\u90E8Dock\u5BFC\u822A\u680F -->
    <nav class="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1 flex items-center justify-around">
      ${a.map(c=>{let g=t===c.id;return`
            <button
              data-mode="${c.id}"
              class="mobile-dock-btn flex-1 py-1.5 px-2 flex flex-col items-center justify-center text-center transition-all ${g?"text-slate-900 dark:text-white font-bold":"text-slate-400 dark:text-slate-500"}"
            >
              <span class="text-xs tracking-tight">${c.shortLabel}</span>
              ${g?'<span class="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white mt-0.5"></span>':'<span class="w-1.5 h-1.5 mt-0.5"></span>'}
            </button>
          `}).join("")}
    </nav>
  `;let d=c=>s(c);r.querySelectorAll(".desktop-nav-btn").forEach(c=>{c.addEventListener("click",()=>d(c.getAttribute("data-mode")))}),r.querySelectorAll(".mobile-dock-btn").forEach(c=>{c.addEventListener("click",()=>d(c.getAttribute("data-mode")))}),r.querySelector("#brand-logo")?.addEventListener("click",()=>d("overview"));let i=()=>{r.querySelector("#nav-sync-btn")?.addEventListener("click",()=>{let c=X();document.body.appendChild(c)})};return i(),r.querySelector("#nav-profile-btn")?.addEventListener("click",()=>{let c=P();document.body.appendChild(c)}),y.subscribe(()=>{let c=r.querySelector("#sync-badge-container");c&&(c.innerHTML=l(),i())}),r.querySelector("#theme-toggle")?.addEventListener("click",()=>{let c=document.documentElement;c.classList.contains("dark")?(c.classList.remove("dark"),localStorage.setItem("theme","light")):(c.classList.add("dark"),localStorage.setItem("theme","dark"))}),r}function Y(t){let e=document.createElement("div");e.className="space-y-6 animate-in fade-in duration-150";let s=L(),r=typeof n.getTasksForDate=="function"?n.getTasksForDate(s):typeof n.getTasksForToday=="function"?n.getTasksForToday():n.getTasksForSelectedDate?n.getTasksForSelectedDate():[],a=r.length,l=r.filter(v=>v.completed).length,d=a>0?Math.round(l/a*100):0,i=n.getUserProfile(),o={research:{label:"\u5B66\u672F\u79D1\u7814",total:0,done:0,tagClass:"bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"},diet:{label:"\u8425\u517B\u996E\u98DF",total:0,done:0,tagClass:"bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"},exercise:{label:"\u4F53\u80FD\u7FBD\u7403",total:0,done:0,tagClass:"bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800"},growth:{label:"\u4E2A\u4EBA\u63D0\u5347",total:0,done:0,tagClass:"bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800"},routine:{label:"\u5DE5\u4F4D\u4F5C\u606F",total:0,done:0,tagClass:"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700"}};r.forEach(v=>{let w=v.category||"routine";w==="sport"&&(w="exercise"),w==="habit"&&(w="routine");let E=o[w]||o.routine;E.total+=1,v.completed&&(E.done+=1)});let c=new Date,g=c.getHours(),k=c.getMinutes(),p=g+k/60,b=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][c.getDay()],m="\u5DE5\u4F4D\u4E13\u6CE8\u79D1\u7814\u63A8\u8FDB",u="\u5F00\u542F45\u5206\u949F\u65E0\u5E72\u6270\u4E13\u6CE8\u5757\uFF0C\u5750\u59FF\u633A\u76F4\uFF0C\u5206\u6BB5\u5C0F\u53E3\u8865\u6C34\u3002",f="\u79D1\u7814\u4E13\u6CE8",h="slot_0830";return p>=7&&p<8.5?(m="\u9AD8\u86CB\u767D\u63A7\u7CD6\u65E9\u9910",u="\u5168\u9ED1\u9EA6\u9762\u53052\u7247 + \u7EAF\u725B\u5976250ml + \u6C34\u716E\u86CB2\u4E2A\uFF08\u86CB\u9EC4\u5FC5\u5403\u8865\u5145\u80C6\u78B1\uFF09\u3002\u53EF\u6362\u65E0\u7CD6\u8C46\u6D46300ml/\u751F\u71D5\u9EA635g\u3002",f="\u8425\u517B\u65E9\u9910",h="slot_0730"):p>=8.5&&p<10?(m="\u4E0A\u5348\u9AD8\u96BE\u5EA6\u79D1\u7814\u653B\u575A",u="\u76AE\u8D28\u9187\u4E0E\u8B66\u89C9\u5EA6\u5CF0\u503C\u533A\uFF1A\u653B\u575A\u7B97\u6CD5\u96BE\u70B9\u4E0E\u516C\u5F0F\u63A8\u5BFC\uFF0C\u5173\u95ED\u793E\u4EA4\u5F39\u7A97\uFF0C\u4E13\u6CE845\u5206\u949F\u756A\u8304\u949F\u3002",f="\u5B66\u672F\u653B\u575A",h="slot_0830"):p>=10&&p<10.5?(m="\u4E0A\u5348\u575A\u679C\u52A0\u9910\u4E0E\u5DE5\u4F4D\u5FAE\u4F38\u5C55",u="\u539F\u5473\u575A\u679C10~15g\uFF088\u9897\u5DF4\u65E6\u6728\u62162\u4E2A\u6838\u6843\uFF09+ \u9888\u690E\u4E0B\u988C\u5FAE\u56DE\u7F2910\u6B21\uFF0C\u7F13\u89E3\u7528\u8111\u7D27\u7EF7\u611F\u3002",f="\u80FD\u91CF\u52A0\u9910",h="slot_1000"):p>=10.5&&p<11.5?(m="\u5B9E\u9A8C\u7EC6\u5316\u4E0E\u5BFC\u5E08\u6C9F\u901A\u51C6\u5907",u="\u4E8B\u5B9E\u4E0E\u60C5\u7EEA\u89E3\u8026\uFF0C\u63D0\u95EE\u9898\u52A1\u5FC5\u81EA\u5E262\u4E2A\u5177\u4F53\u5907\u9009\u65B9\u6848\u3002\u4E34\u8FD1\u5348\u9910\u8865\u6C34250ml\u3002",f="\u79D1\u7814\u63A8\u8FDB",h="slot_1030"):p>=11.5&&p<12.75?(m="\u98DF\u5802\u5348\u9910\u6218\u672F\u6267\u884C",u=`\u7C73\u996D\u4E25\u683C\u63A7\u52361\u62F3\u5934 + \u4F4E\u6CB9\u852C\u83DC2\u4EFD\uFF08\u5F00\u6C34\u8F7B\u6DAE\u6D6E\u6CB9\uFF09 + \u5F00\u81EA\u5E26\u9AD8\u86CB\u767D\uFF08${i.diet?.lunchProtein||"\u5373\u98DF\u9E21\u80F8\u8089100g"}\uFF09\u3002\u5148\u5403\u83DC\u8089\u540E\u7C73\u996D\uFF0C\u996D\u540E\u4E0D\u72AF\u56F0\uFF01`,f="\u63A7\u7CD6\u5348\u9910",h="slot_1130"):p>=12.75&&p<13.5?(m="\u9EC4\u91D1\u80FD\u91CF\u5FAE\u5348\u4F11\uFF0820~25\u5206\u949F\uFF09",u="\u4F69\u6234\u773C\u7F69\u9759\u536720\u5206\u949F\u6E05\u7A7A\u817A\u82F7\uFF0C\u9632\u6B62\u6DF1\u7761\u9192\u540E\u5934\u6655\u3002\u968F\u9910\u968F\u6C34\u8865\u5145\u6DF1\u6D77\u9C7C\u6CB9\u3002",f="\u7CBE\u529B\u590D\u4F4D",h="slot_1245"):p>=13.5&&p<15?(m="\u5348\u540E\u9ED1\u5496\u5561\u4E0E\u4EE3\u7801\u8C03\u8BD5",u="\u996E\u7528\u9ED1\u5496\u55611\u676F\uFF08200~250ml\uFF09\u3002\u26A0\uFE0F 15:00\u5496\u5561\u56E0\u9501\u6B7B\u7EA2\u7EBF\u524D\u6293\u7D27\u4EAB\u7528\uFF0C\u4FDD\u62A4\u591C\u95F4\u6DF1\u5EA6\u7761\u7720\uFF01",f="\u4EE3\u7801\u5B9E\u64CD",h="slot_1330"):p>=15&&p<17.5?(m="\u4E0B\u5348\u5B9E\u64CD\u63A8\u8FDB\u4E0E\u8D34\u5899\u62C9\u4F38",u="\u4EE3\u7801\u7F16\u5199\u3001\u6570\u636E\u6E05\u6D17\u4E0E\u6587\u732E\u7814\u8BFB\u3002\u5DF2\u8FC715:00\u4E25\u7981\u996E\u7528\u5496\u5561\u56E0\uFF01\u505A\u8D34\u5899W-Y\u6ED1\u884C15\u6B21\u6FC0\u6D3B\u80CC\u808C\u3002",f="\u4E0B\u5348\u51B2\u523A",h="slot_1600"):p>=17.5&&p<18.75?(m="\u665A\u9910\u4F4EGI\u63A7\u80FD\u6444\u5165",u="\u84B8\u7EA2\u85AF150g\uFF08\u6216\u771F\u7A7A\u7389\u7C731\u6839\uFF09+ \u5373\u98DF\u9E21\u80F8\u8089100g + \u6C34\u679C\u9EC4\u74DC1\u6839\u3002\u7761\u524D3\u5C0F\u65F6\u4E25\u683C\u7981\u98DF\uFF0820:30\u540E\u53EA\u559D\u6E05\u6C34\uFF09\u3002",f="\u8F7B\u76C8\u665A\u9910",h="slot_1730"):p>=18.75&&p<20.75?(["\u5468\u4E00","\u5468\u4E09","\u5468\u4E94"].includes(b)?(m="\u4ECA\u65E5\u4F53\u80FD\uFF1A\u529B\u91CF\u6297\u963B\u8BAD\u7EC3\u65E5",u="\u4FEF\u5367\u6491\xD74\u7EC4 + \u5750\u59FF\u5212\u8239\xD74\u7EC4 + \u9762\u62C9(\u62A4\u80A9\u8896)\xD74\u7EC4 + \u6838\u5FC3\u6297\u65CB\u8F6C\u3002\u4E3A\u5468\u672B\u7FBD\u7403\u5927\u529B\u6740\u7403\u7B51\u7262\u80A9\u80DB\u57FA\u5E95\u3002",f="\u529B\u91CF\u5065\u8EAB"):["\u5468\u4E8C","\u5468\u56DB"].includes(b)?(m=`\u4ECA\u65E5\u4F53\u80FD\uFF1A\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD1 (${i.exercise?.runDistanceKm||"4\u516C\u91CC"})`,u="Zone 2\u5FC3\u7387\u6162\u8DD1\uFF0C\u6B65\u9891180\uFF0C\u5168\u811A\u638C\u6EDA\u52A8\u7740\u5730\u3002\u5FAE\u5598\u80FD\u4EA4\u8C08\uFF0C\u8DD1\u540E\u5C0F\u53E3\u8865\u6C34\u505A\u5C0F\u817F\u62C9\u4F38\u3002",f="\u6162\u8DD1\u5FC3\u80BA"):b==="\u5468\u516D"?(m=`\u4ECA\u65E5\u5B9E\u6218\uFF1A\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u7403\u5BF9\u6297 (${i.exercise?.badmintonDuration||"90\u5206\u949F"})`,u="\u7A7F\u4E13\u4E1A\u751F\u80F6\u5E95\u7FBD\u7403\u978B\uFF08\u4E25\u7981\u8DD1\u978B\u9632\u5D34\u811A\uFF09\uFF01\u6253\u524D\u52A8\u6001\u70ED\u8EAB7\u5206\u949F\uFF0C\u9AD8\u71C3\u5BF9\u5C40\u5F7B\u5E95\u91CA\u653E\u5B66\u672F\u538B\u529B\u3002",f="\u7FBD\u7403\u5B9E\u6218"):(m="\u5468\u65E5\u8EAB\u5FC3\u91CD\u542F\u4E0E\u4E3B\u52A8\u6392\u9178",u="\u7FBD\u6BDB\u7403\u5207\u78CB\u6216\u516C\u56ED\u9633\u5149\u6F2B\u6E38\uFF0C\u4EAB\u53D7\u5FAE\u98CE\u4E0E\u9633\u5149\uFF0C\u5F7B\u5E95\u653E\u4E0B\u6587\u732E\u4E0E\u4EE3\u7801\uFF0C\u91CD\u7F6E\u8EAB\u5FC3\u72B6\u6001\u3002",f="\u4E3B\u52A8\u6062\u590D"),h="slot_1900"):p>=20.75&&p<22.5?(m="\u665A\u95F4\u590D\u76D8\u4E0E\u5B66\u672F\u8868\u8FBE\u79EF\u7D2F",u="\u5B66\u672F\u82F1\u6587\u8868\u8FBE\u79EF\u7D2F10\u6761\u3001\u68B3\u7406\u660E\u65E5\u5B9E\u9A8C\u5F85\u529E3\u9879\u300220:30\u540E\u7981\u6B62\u6444\u5165\u56FA\u4F53\u98DF\u7269\u3002",f="\u5B66\u672F\u590D\u76D8",h="slot_2030"):p>=22.5&&p<23.5?(m="\u7761\u524D\u964D\u6E29\u4E0E\u892A\u9ED1\u7D20\u8282\u5F8B\u4FDD\u62A4",u="\u8FDC\u79BB\u84DD\u5149\u5C4F\u5E55\uFF0C\u505A4-7-8\u547C\u5438\u8BAD\u7EC33\u7EC4\u3002\u76EE\u680723:30\u51C6\u65F6\u7184\u706F\uFF0C\u9501\u5B9A5\u4E2A\u5B8C\u657490\u5206\u949F\u7761\u7720\u5468\u671F\u3002",f="\u7761\u524D\u51C6\u5907",h="slot_2230"):(m="\u6DF1\u5EA6\u7761\u7720\u4E0E\u8111\u90E8\u6392\u6BD2\u6062\u590D",u="\u751F\u957F\u6FC0\u7D20\u5206\u6CCC\u4E0E\u8111\u810A\u6DB2\u6E05\u7A7A\u4EE3\u8C22\u5E9F\u7269\u3002\u4FDD\u6301\u9ED1\u6697\u73AF\u5883\u5B89\u7761\uFF0C\u660E\u5929\u7EE7\u7EED\u638C\u63A7\u5168\u5929\uFF01",f="\u4FEE\u590D\u7761\u7720",h="slot_2330"),e.innerHTML=`
    <!-- 1. \u9876\u90E8\u603B\u89C8\u9A7E\u9A76\u8231 (\u6781\u7B80\u4E13\u4E1A\u8D28\u611F) -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm transition-all space-y-5">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center space-x-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
              ${i.stage||"\u5728\u8BFB\u7814\u7A76\u751F \xB7 \u5DE5\u4F4D\u5750\u73ED\u6A21\u5F0F"}
            </span>
            <span class="text-xs text-slate-400 font-mono">${C()}</span>
          </div>
          <h2 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            \u4ECA\u65E5\u5168\u57DF\u89C4\u5212\u4E0E\u5DE5\u4F4D\u6267\u884C
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            \u5B66\u672F\u79D1\u7814 \xB7 \u63A7\u7CD6\u51CF\u8102 \xB7 3+2\u4F53\u80FD\u4E0E\u7FBD\u7403 \xB7 \u8EAB\u5FC3\u4F5C\u606F\u4E00\u4F53\u5316\u7BA1\u7406
          </p>
        </div>

        <!-- \u5B8C\u6210\u5EA6\u4E0E\u5FEB\u6377\u6267\u884C\u5DE5\u4F5C\u53F0\u5165\u53E3 -->
        <div class="flex items-center gap-4 bg-slate-50 dark:bg-slate-750/70 px-4 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">\u4ECA\u65E5\u95ED\u73AF\u8FDB\u5EA6</span>
            <div class="flex items-baseline space-x-2">
              <span class="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">${d}%</span>
              <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">${l}/${a} \u9879</span>
            </div>
            <div class="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
              <div class="h-full bg-emerald-500 rounded-full transition-all duration-500" style="width: ${d}%;"></div>
            </div>
          </div>

          <button id="go-today-action-btn" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs transition-all shadow-sm shrink-0">
            \u8FDB\u5165\u6267\u884C\u6E05\u5355 \u2192
          </button>
        </div>
      </div>

      <!-- 2. \u6B64\u523B\u5DE5\u4F4D\u5411\u5BFC (Real-Time Dynamic Advice Banner) -->
      <div class="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-750/50 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs font-bold text-slate-900 dark:text-white">\u6B64\u523B\u5DE5\u4F4D\u4E13\u5C5E\u5411\u5BFC \xB7 ${f}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-medium">${g.toString().padStart(2,"0")}:${k.toString().padStart(2,"0")} \u5B9E\u65F6\u5339\u914D</span>
        </div>
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">${m}</h4>
          <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">${u}</p>
        </div>

        <!-- \u4E13\u5C5E\u6781\u901F\u6253\u5361\u4E0E\u64CD\u4F5C\u6761 -->
        <div class="pt-2 border-t border-slate-200/50 dark:border-slate-700/40 flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-1.5 text-xs">
            <button id="quick-check-current" data-slot="${h}" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all shadow-sm">
              \u2713 \u6253\u5361\u5F53\u524D\u73AF\u8282
            </button>
            <button id="quick-drink-water" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              \u559D\u6C34250ml
            </button>
            <button id="quick-desk-stretch" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              \u5DE5\u4F4D\u5FAE\u4F38\u5C55
            </button>
            <button id="quick-protein" class="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
              \u5403\u81EA\u5E26\u86CB\u767D
            </button>
          </div>

          <button id="open-profile-btn" class="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 underline font-medium">
            \u4FEE\u6539\u6211\u7684\u4E2A\u4EBA\u504F\u597D \u2192
          </button>
        </div>
      </div>

      <!-- \u5FEB\u6377\u5165\u53E3\u7D22\u5F15 -->
      <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span class="text-slate-400 font-medium">\u5FEB\u901F\u5BFC\u822A</span>
        <div class="flex flex-wrap items-center gap-2">
          <button id="btn-quick-timetable" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            7\u5929\u5168\u666F\u5927\u8BFE\u8868
          </button>
          <button id="btn-quick-plans" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            \u996E\u98DF\u4E0E\u8FD0\u52A8\u89C4\u7A0B
          </button>
          <button id="btn-quick-tools" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-all">
            \u6548\u7387\u4E0E\u5065\u5EB7\u5DE5\u5177\u7BB1
          </button>
        </div>
      </div>
    </div>

    <!-- 3. \u4E94\u5927\u6838\u5FC3\u7EC6\u5206\u4E13\u533A (Domain Portals) -->
    <div class="space-y-3.5">
      <div>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">
          \u8BA1\u5212\u5206\u7C7B\u4E2D\u5FC3
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">\u7EC6\u5206\u4E13\u533A\u72EC\u7ACB\u89C4\u5212\u4E0E\u6267\u884C\u6D41\uFF0C\u6761\u7406\u5206\u660E</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- \u4E13\u533A 1\uFF1A\u5B66\u672F\u79D1\u7814\u4E0E\u5B9E\u9A8C\u5BA4\u653B\u575A -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${o.research.tagClass}">
                \u5B66\u672F\u79D1\u7814
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${o.research.done}/${o.research.total} \u5DF2\u5B8C\u6210
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              \u5B9E\u9A8C\u5BA4\u5DE5\u4F4D\u79D1\u7814\u653B\u575A
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              \u5DE5\u4F4D\u5750\u73ED\u6A21\u5F0F\u3001\u4EE3\u7801\u5B9E\u9A8C\u63A8\u8FDB\u3001\u9876\u4F1A\u8BBA\u6587\u7CBE\u8BFB\u3001\u5927\u8BBA\u6587\u64B0\u5199\u4E0E\u7EC4\u4F1A\u6C47\u62A5\u5907\u5FD8\u3002
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="research_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              \u67E5\u770B\u79D1\u7814\u89C4\u7A0B \u2192
            </button>
            <button data-action="daily-filter" data-track="research" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/80 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200">
              \u4ECA\u65E5\u5F85\u529E
            </button>
          </div>
        </div>

        <!-- \u4E13\u533A 2\uFF1A\u79D1\u5B66\u8425\u517B\u4E0E\u63A7\u7CD6\u996E\u98DF -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${o.diet.tagClass}">
                \u8425\u517B\u996E\u98DF
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${o.diet.done}/${o.diet.total} \u5DF2\u5B8C\u6210
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              \u79D1\u5B66\u63A7\u7CD6\u996E\u98DF\u4F53\u7CFB
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              \u5168\u9ED1\u9EA6\u4E0E\u53CC\u5168\u86CB\u65E9\u9910\u3001\u98DF\u58021\u62F3\u7C73\u996D+2\u4EFD\u7D20\u83DC\u3001\u81EA\u5E26\u5373\u98DF\u9AD8\u86CB\u767D\u4E0E15:00\u9ED1\u5496\u5561\u622A\u6B62\u3002
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="diet_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              \u56DB\u9910\u996E\u98DF\u65B9\u6848 \u2192
            </button>
            <button data-action="tool" data-sub="substitute_tool" class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-medium">
              \u5E73\u66FF\u8BA1\u7B97\u5668
            </button>
          </div>
        </div>

        <!-- \u4E13\u533A 3\uFF1A\u4F53\u80FD\u5065\u8EAB\u4E0E\u8FD0\u52A8\u7231\u597D -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${o.exercise.tagClass}">
                \u4F53\u80FD\u7FBD\u7403
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${o.exercise.done}/${o.exercise.total} \u5DF2\u5B8C\u6210
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              3+2\u4F53\u80FD\u4E0E\u7FBD\u7403\u5B9E\u6218
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              \u5468\u4E00\u4E09\u4E94\u529B\u91CF\u6297\u963B\u62A4\u80A9\u3001\u5468\u4E8C\u56DB\u64CD\u573A4\u516C\u91CC\u6162\u8DD1\u3001\u5468\u672B\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u740390\u5206\u949F\u5BF9\u6297\u3002
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="plan" data-sub="fitness_plan" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              3+2\u4F53\u80FD\u8BFE\u8868 \u2192
            </button>
            <button data-action="daily-filter" data-track="exercise" class="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-700 dark:text-amber-300 font-medium">
              \u8FD0\u52A8\u6253\u5361
            </button>
          </div>
        </div>

        <!-- \u4E13\u533A 4\uFF1A\u4E2A\u4EBA\u8FDB\u9636\u4E0E\u6280\u80FD\u63D0\u5347 -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${o.growth.tagClass}">
                \u4E2A\u4EBA\u8FDB\u9636
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${o.growth.done}/${o.growth.total} \u5DF2\u5B8C\u6210
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              \u6280\u80FD\u63D0\u5347\u4E0E\u81EA\u5B66\u8FDB\u9636
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              \u5B66\u672F\u5916\u520A\u5730\u9053\u8868\u8FBE\u53E5\u5F0F\u79EF\u7D2F\u3001\u5DE5\u7A0B\u6280\u672F\u5B9E\u64CD\u6C89\u6DC0\u4E0E\u590D\u76D8\uFF0C\u6253\u9020\u957F\u5468\u671F\u590D\u5229\u3002
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="daily-filter" data-track="growth" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              \u4ECA\u65E5\u63D0\u5347\u4EFB\u52A1 \u2192
            </button>
            <button data-action="daily-filter" data-track="growth" class="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-medium">
              \u6253\u5361\u8BB0\u5F55
            </button>
          </div>
        </div>

        <!-- \u4E13\u533A 5\uFF1A\u5DE5\u4F4D\u4F5C\u606F\u4E0E\u8EAB\u5FC3\u7CBE\u529B -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md border ${o.routine.tagClass}">
                \u5DE5\u4F4D\u4F5C\u606F
              </span>
              <span class="text-xs text-slate-400 font-medium">
                ${o.routine.done}/${o.routine.total} \u5DF2\u5B8C\u6210
              </span>
            </div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">
              \u5DE5\u4F4D\u5065\u5EB7\u4E0E\u7CBE\u529B\u7BA1\u7406
            </h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              45\u5206\u949F\u5DE5\u4F4D\u5FAE\u4F38\u5C55(\u4E0B\u988C\u5FAE\u56DE\u7F29+\u6269\u80F8)\u30012000ml\u5206\u6BB5\u8865\u6C34\u300190\u5206\u949F\u7761\u7720\u8282\u5F8B\u4E0E4-7-8\u547C\u5438\u3002
            </p>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <button data-action="tool" data-sub="desk_timer_tool" class="text-slate-900 dark:text-slate-100 font-semibold hover:underline">
              \u4E45\u5750\u756A\u8304\u949F \u2192
            </button>
            <button data-action="tool" data-sub="water_tool" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium">
              \u5206\u6BB5\u996E\u6C34
            </button>
          </div>
        </div>
      </div>
    </div>
  `,e.querySelector("#go-today-action-btn")?.addEventListener("click",()=>{t("daily")}),e.querySelector("#btn-quick-timetable")?.addEventListener("click",()=>{t("timetable")}),e.querySelector("#btn-quick-plans")?.addEventListener("click",()=>{t("plans")}),e.querySelector("#btn-quick-tools")?.addEventListener("click",()=>{t("tools")}),e.querySelector("#open-profile-btn")?.addEventListener("click",()=>{let v=P();document.body.appendChild(v)}),e.querySelector("#quick-check-current")?.addEventListener("click",()=>{let v=r.find(w=>w.id===`fixed_${h}`);v?n.toggleTask(v.id,s):n.addTask({title:m,category:"routine",time:`${g.toString().padStart(2,"0")}:${k.toString().padStart(2,"0")}`,details:u},s),x(784,.15)}),e.querySelector("#quick-drink-water")?.addEventListener("click",()=>{n.addTask({title:"\u8865\u5145\u6E29\u6C34250ml",category:"routine",time:"\u968F\u65F6",details:"\u4FC3\u8FDB\u4F53\u5185\u4EE3\u8C22\u4E0E\u5C3F\u9178\u6392\u51FA"},s),x(659.25,.15)}),e.querySelector("#quick-desk-stretch")?.addEventListener("click",()=>{n.addTask({title:"\u5DE5\u4F4D\u5FAE\u4F38\u5C55\uFF08\u4E0B\u988C\u56DE\u7F2910\u6B21+\u95E8\u6846\u62C9\u4F3830\u79D2\uFF09",category:"routine",time:"\u5DE5\u4F4D\u95F4\u6B47",details:"\u6FC0\u6D3B\u9888\u5C48\u808C\u4E0E\u83F1\u5F62\u808C\uFF0C\u590D\u4F4D\u80A9\u80DB\u9AA8"},s),x(523.25,.15)}),e.querySelector("#quick-protein")?.addEventListener("click",()=>{n.addTask({title:`\u8865\u5145\u81EA\u5E26\u9AD8\u86CB\u767D\uFF08${i.diet?.lunchProtein||"\u5373\u98DF\u9E21\u80F8\u8089100g"}\uFF09`,category:"diet",time:"\u9910\u524D/\u9910\u4E2D",details:"\u6444\u5165\u7EA625g\u7EAF\u86CB\u767D\u8D28\uFF0C\u7EF4\u6301\u808C\u8089\u4E0E\u9971\u8179"},s),x(880,.15)}),e.querySelectorAll("[data-action]").forEach(v=>{v.addEventListener("click",()=>{let w=v.getAttribute("data-action"),E=v.getAttribute("data-sub");w==="plan"?t("plans",E):w==="tool"?t("tools",E):w==="daily-filter"&&t("daily")})}),e}function te(){let t=document.createElement("div");t.className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm";let e=n.getSelectedDate(),s=n.isViewingToday(),r=new Date(e+"T00:00:00"),a=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"],l=`${r.getFullYear()}\u5E74${r.getMonth()+1}\u6708${r.getDate()}\u65E5 ${a[r.getDay()]}`;function d(o){let c=new Date(e+"T00:00:00");c.setDate(c.getDate()+o);let g=c.getFullYear(),k=String(c.getMonth()+1).padStart(2,"0"),p=String(c.getDate()).padStart(2,"0");return`${g}-${k}-${p}`}return t.innerHTML=`
    <!-- \u5DE6\u4FA7\u5207\u6362 -->
    <div class="flex items-center space-x-2">
      <button id="prev-day-btn" title="\u67E5\u770B\u524D\u4E00\u5929\u5386\u53F2\u6863\u6848" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all">
        \u25C0 \u524D\u4E00\u5929
      </button>

      <div class="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
        <span class="text-sm">\u{1F4C5}</span>
        <span class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">${l}</span>
        <input type="date" id="date-picker-input" value="${e}" class="w-5 opacity-0 absolute cursor-pointer" />
      </div>

      <button id="next-day-btn" title="\u67E5\u770B\u540E\u4E00\u5929" class="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all">
        \u540E\u4E00\u5929 \u25B6
      </button>
    </div>

    <!-- \u53F3\u4FA7\u72B6\u6001\u4E0E\u56DE\u5230\u4ECA\u5929 -->
    <div class="flex items-center space-x-2">
      <span class="text-xs px-2.5 py-1 rounded-full font-bold ${s?"bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300":"bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300"}">
        ${s?"\u{1F7E2} \u4ECA\u65E5\u8FDB\u884C\u4E2D":"\u{1F4C1} \u5386\u53F2\u8BA1\u5212\u6863\u6848\u590D\u76D8"}
      </span>

      ${s?"":`
        <button id="back-today-btn" class="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all">
          \u56DE\u5230\u4ECA\u5929
        </button>
      `}
    </div>
  `,t.querySelector("#prev-day-btn")?.addEventListener("click",()=>{let o=d(-1);n.setSelectedDate(o),x(440,.1)}),t.querySelector("#next-day-btn")?.addEventListener("click",()=>{let o=d(1);n.setSelectedDate(o),x(493.88,.1)}),t.querySelector("#back-today-btn")?.addEventListener("click",()=>{n.setSelectedDate(L()),x(523.25,.12)}),t.querySelector("#date-picker-input")?.addEventListener("change",o=>{let c=o.target.value;c&&(n.setSelectedDate(c),x(523.25,.12))}),t}function ae(){let t=document.createElement("div");t.className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200";function e(){let s=n.getQuickPresets();t.innerHTML=`
      <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
              <span>\u2699\uFE0F</span>
              <span>\u9AD8\u9891\u5E38\u7528\u4EFB\u52A1\u6A21\u677F\u5E93\u7BA1\u7406</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">\u914D\u7F6E\u60A8\u4E13\u5C5E\u7684\u7ECF\u5E38\u6027\u79D1\u7814\u5B9E\u9A8C\u3001\u8FD0\u52A8\u7FBD\u6BDB\u7403\u4E0E\u81EA\u5F8B\u4E60\u60EF</p>
          </div>
          <button id="close-modal-x" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">\u2715</button>
        </div>

        <!-- \u73B0\u6709\u6A21\u677F\u5217\u8868 -->
        <div class="space-y-2 max-h-56 overflow-y-auto pr-1">
          ${s.map(a=>`
            <div class="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs">
              <div class="flex items-center space-x-2 truncate mr-2">
                <span class="font-bold text-slate-800 dark:text-slate-200 truncate">${a.title}</span>
                <span class="text-[10px] font-mono text-slate-400">(${a.time})</span>
              </div>
              <button data-del-preset="${a.id}" title="\u5220\u9664\u8BE5\u6A21\u677F" class="text-slate-400 hover:text-rose-500 p-1 rounded">
                \u{1F5D1}\uFE0F
              </button>
            </div>
          `).join("")}
        </div>

        <!-- \u6DFB\u52A0\u65B0\u6A21\u677F\u8868\u5355 -->
        <div class="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
          <span class="text-xs font-bold text-emerald-900 dark:text-emerald-300 block">\u2795 \u521B\u5EFA\u65B0\u7684\u5E38\u7528\u4EFB\u52A1\u6A21\u677F</span>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">\u6240\u5C5E\u5206\u7C7B</label>
              <select id="new-preset-cat" class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none">
                <option value="research">\u{1F52C} \u79D1\u7814\u5B9E\u9A8C</option>
                <option value="sport">\u{1F3F8} \u5065\u8EAB\u7403\u7C7B</option>
                <option value="diet">\u{1F957} \u996E\u98DF\u52A0\u9910</option>
                <option value="growth">\u{1F680} \u4E2A\u4EBA\u63D0\u5347</option>
                <option value="habit">\u{1F4A7} \u751F\u6D3B\u4E60\u60EF</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">\u5EFA\u8BAE\u65F6\u6BB5</label>
              <input type="text" id="new-preset-time" placeholder="\u5982 19:00~20:30" class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none" />
            </div>
          </div>

          <div>
            <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">\u6A21\u677F\u6807\u9898 (\u5982\uFF1A\u7FBD\u6BDB\u7403\u5355\u6253\u5BF9\u51B390\u5206\u949F)</label>
            <input type="text" id="new-preset-title" placeholder="\u8F93\u5165\u5E38\u7528\u4EFB\u52A1\u540D\u79F0..." class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none" />
          </div>

          <button id="add-preset-btn" class="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all">
            \u4FDD\u5B58\u5230\u6211\u7684\u5E38\u7528\u5E93
          </button>
        </div>

        <div class="pt-2 flex justify-end">
          <button id="close-modal-btn" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-slate-700 text-white font-bold text-xs">
            \u5B8C\u6210\u5E76\u8FD4\u56DE
          </button>
        </div>
      </div>
    `,t.querySelectorAll("[data-del-preset]").forEach(a=>{a.addEventListener("click",()=>{let l=a.getAttribute("data-del-preset");n.deleteQuickPreset(l),x(329.63,.1),e()})}),t.querySelector("#add-preset-btn")?.addEventListener("click",()=>{let a=t.querySelector("#new-preset-cat")?.value,l=t.querySelector("#new-preset-time")?.value?.trim()||"\u5168\u5929\u968F\u65F6",d=t.querySelector("#new-preset-title")?.value?.trim();if(!d){alert("\u8BF7\u586B\u5199\u6A21\u677F\u6807\u9898\uFF01");return}n.addQuickPreset({category:a,time:l,title:d,badge:"\u5E38\u7528"}),x(587.33,.15),e()});let r=()=>t.remove();t.querySelector("#close-modal-x")?.addEventListener("click",r),t.querySelector("#close-modal-btn")?.addEventListener("click",r)}return e(),t}function se(){let t=document.createElement("div");t.className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-2.5";let e=n.getQuickPresets();return t.innerHTML=`
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <span class="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white"></span>
        <h4 class="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
          \u9AD8\u9891\u5DE5\u4F4D\u9884\u8BBE\uFF08\u4E00\u952E\u6DFB\u52A0\u81F3\u4ECA\u65E5\uFF09
        </h4>
      </div>
      <button id="manage-presets-btn" class="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors">
        \u7BA1\u7406\u9884\u8BBE\u5E93
      </button>
    </div>

    <!-- \u5E38\u7528\u80F6\u56CA\u6A2A\u5411\u6ED1\u52A8\u6761 -->
    <div class="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
      ${e.map(s=>`
        <button
          data-preset-id="${s.id}"
          title="\u70B9\u51FB\u5C06\u3010${s.title}\u3011\u5FEB\u6377\u52A0\u5165\u4ECA\u65E5\u65E5\u7A0B"
          class="quick-preset-chip flex-shrink-0 flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-750/70 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium transition-all"
        >
          <span class="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
            ${s.badge||"\u5FEB\u6377"}
          </span>
          <span class="font-medium truncate max-w-[170px]">${s.title}</span>
          <span class="text-[10px] text-slate-400 font-mono">${s.time}</span>
          <span class="text-[11px] text-slate-400 font-bold">+</span>
        </button>
      `).join("")}
    </div>
  `,t.querySelectorAll(".quick-preset-chip").forEach(s=>{s.addEventListener("click",()=>{let r=s.getAttribute("data-preset-id"),a=e.find(l=>l.id===r);a&&(n.addTask({title:a.title,time:a.time,category:a.category,badge:a.badge||"\u5FEB\u6377\u8FFD\u52A0",details:a.details||"\u4ECE\u9AD8\u9891\u5E38\u7528\u6A21\u677F\u5FEB\u6377\u6CE8\u5165"}),x(587.33,.15))})}),t.querySelector("#manage-presets-btn")?.addEventListener("click",()=>{let s=ae();document.body.appendChild(s)}),t}function j(t=null,e,s){let r=!!t,a=document.createElement("div");a.className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200";let l=[{id:"research",label:"\u79D1\u7814\u5B9E\u9A8C\u653B\u575A",icon:"\u{1F52C}"},{id:"diet",label:"\u996E\u98DF\u4E0E\u52A0\u9910",icon:"\u{1F957}"},{id:"sport",label:"\u5065\u8EAB\u8DD1\u6B65\u7403\u7C7B",icon:"\u{1F3F8}"},{id:"growth",label:"\u4E2A\u4EBA\u63D0\u5347\u6210\u957F",icon:"\u{1F680}"},{id:"habit",label:"\u751F\u6D3B\u4F5C\u606F\u4E60\u60EF",icon:"\u{1F4A7}"}],d=t?.category||"research";a.innerHTML=`
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>${r?"\u270F\uFE0F \u7F16\u8F91\u4EFB\u52A1":"\u2795 \u6DFB\u52A0\u4ECA\u65E5\u4E13\u5C5E\u5F85\u529E"}</span>
        </h3>
        <button id="modal-close-x" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold transition-colors">\u2715</button>
      </div>

      <!-- \u5206\u7C7B\u9009\u62E9 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">\u6240\u5C5E\u6A21\u5757</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="category-selector">
          ${l.map(c=>`
              <button
                type="button"
                data-cat="${c.id}"
                class="cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${c.id===d?"bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/30":"bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}"
              >
                <span>${c.icon}</span>
                <span class="truncate">${c.label}</span>
              </button>
            `).join("")}
        </div>
      </div>

      <!-- \u65F6\u95F4\u6BB5 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">\u6267\u884C\u65F6\u6BB5 (\u5982 14:30~16:00)</label>
        <input
          type="text"
          id="task-time-input"
          value="${t?.time||""}"
          placeholder="\u4F8B\u5982\uFF1A14:30~16:00 \u6216 \u5168\u5929\u968F\u65F6"
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <!-- \u4EFB\u52A1\u6807\u9898 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">\u4EFB\u52A1\u540D\u79F0 / \u76EE\u6807</label>
        <input
          type="text"
          id="task-title-input"
          value="${t?.title||""}"
          placeholder="\u4F8B\u5982\uFF1A\u4FEE\u6539\u8BBA\u6587\u7B2C\u4E09\u7AE0\u56FE\u8868\u3001\u6D4B\u8BD5\u5149\u8C31\u4EEA..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <!-- \u8BE6\u7EC6\u8BF4\u660E -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">\u6267\u884C\u8BF4\u660E / \u81EA\u5F8B\u7EC6\u8282 (\u9009\u586B)</label>
        <textarea
          id="task-details-input"
          rows="2"
          placeholder="\u5907\u6CE8\u5B9E\u9A8C\u53C2\u6570\u3001\u6CE8\u610F\u8981\u70B9\u6216\u51C6\u5907\u8D44\u6599..."
          class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
        >${t?.details||""}</textarea>
      </div>

      <!-- \u5E95\u90E8\u63A7\u5236 -->
      <div class="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button id="modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700">\u53D6\u6D88</button>
        <button id="modal-submit-btn" class="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30">
          ${r?"\u4FDD\u5B58\u4FEE\u6539":"\u786E\u8BA4\u6DFB\u52A0"}
        </button>
      </div>
    </div>
  `;let i=d;a.querySelectorAll(".cat-option-btn").forEach(c=>{c.addEventListener("click",()=>{i=c.getAttribute("data-cat"),a.querySelectorAll(".cat-option-btn").forEach(g=>{g.className="cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}),c.className="cat-option-btn p-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-400/30"})});let o=()=>{a.remove(),s?.()};return a.querySelector("#modal-close-x")?.addEventListener("click",o),a.querySelector("#modal-cancel-btn")?.addEventListener("click",o),a.querySelector("#modal-submit-btn")?.addEventListener("click",()=>{let c=a.querySelector("#task-time-input")?.value?.trim()||"\u5168\u5929\u968F\u65F6",g=a.querySelector("#task-title-input")?.value?.trim(),k=a.querySelector("#task-details-input")?.value?.trim()||"";if(!g){alert("\u8BF7\u586B\u5199\u4EFB\u52A1\u540D\u79F0\uFF01");return}e({category:i,time:c,title:g,details:k}),o()}),a}function re(){let t=document.createElement("div");t.className="space-y-6";let e=n.getTasksForToday(),s=[{id:"diet",name:"\u8425\u517B\u996E\u98DF\u7BA1\u7406",badge:"\u63A7\u7CD6\u9971\u8179",desc:"\u56DB\u9910\u5B9A\u91CF\u6807\u914D\u3001\u81EA\u5E26\u5373\u98DF\u9AD8\u86CB\u767D\u4E0E\u98DF\u5802\u907F\u6CB9"},{id:"sport",name:"\u4F53\u80FD\u5065\u8EAB\u4E0E\u7FBD\u7403",badge:"3+2\u8BAD\u7EC3",desc:"\u529B\u91CF\u6297\u963B\u62A4\u80A9\u3001\u64CD\u573A4\u516C\u91CC\u6162\u8DD1\u6216\u7FBD\u7403\u5B9E\u6218"},{id:"research",name:"\u5B9E\u9A8C\u5BA4\u79D1\u7814\u653B\u575A",badge:"\u5B66\u672F\u4E3B\u7EBF",desc:"\u6A21\u578B\u4EE3\u7801\u8C03\u8BD5\u3001\u5B9E\u9A8C\u6570\u636E\u6E05\u6D17\u4E0E\u8BBA\u6587\u653B\u575A"},{id:"growth",name:"\u6280\u80FD\u63D0\u5347\u8FDB\u9636",badge:"\u957F\u8FDC\u590D\u5229",desc:"\u5B66\u672F\u82F1\u6587\u53E5\u5F0F\u79EF\u7D2F\u3001\u5DE5\u7A0B\u6280\u672F\u6C89\u6DC0\u4E0E\u590D\u76D8"},{id:"habit",name:"\u5DE5\u4F4D\u5065\u5EB7\u4F5C\u606F",badge:"\u7CBE\u529B\u57FA\u5E95",desc:"45\u5206\u949F\u5DE5\u4F4D\u5FAE\u4F38\u5C55\u30012000ml\u8865\u6C34\u4E0E90\u5206\u949F\u7761\u7720\u8282\u5F8B"}];return t.innerHTML=`
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      ${s.map(r=>{let a=e.filter(o=>o.category===r.id),l=a.filter(o=>o.completed).length,d=a.length,i=d>0?Math.round(l/d*100):0;return`
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col justify-between overflow-hidden">
              <!-- \u6A21\u5757\u9876\u680F -->
              <div class="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-750/30 flex items-center justify-between">
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="text-xs font-bold text-slate-900 dark:text-white">${r.name}</h4>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-medium bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-600">${r.badge}</span>
                  </div>
                  <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">${r.desc}</p>
                </div>

                <div class="text-right shrink-0">
                  <span class="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">${l}/${d}</span>
                  <div class="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-1 overflow-hidden">
                    <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${i}%"></div>
                  </div>
                </div>
              </div>

              <!-- \u4EFB\u52A1\u6761\u76EE\u5217\u8868 -->
              <div class="p-3 space-y-1.5 flex-grow">
                ${a.length===0?`
                  <div class="py-6 text-center text-xs text-slate-400">
                    \u6682\u65E0\u4E8B\u9879\uFF0C\u70B9\u51FB\u4E0B\u65B9\u6DFB\u52A0
                  </div>
                `:a.map(o=>`
                    <div
                      data-task="${o.id}"
                      class="task-row flex items-start justify-between p-2.5 rounded-xl border transition-all ${o.completed?"bg-slate-50/60 dark:bg-slate-750/20 border-slate-200/50 dark:border-slate-700/40 opacity-60":"bg-white dark:bg-slate-750/70 border-slate-200/80 dark:border-slate-700 hover:border-slate-300"}"
                    >
                      <div class="flex items-start space-x-2.5 mr-2">
                        <!-- \u590D\u9009\u6846 -->
                        <button
                          data-action="toggle"
                          class="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all ${o.completed?"bg-emerald-600 text-white border-emerald-600 text-[10px]":"border-slate-300 dark:border-slate-600 hover:border-emerald-500"}"
                        >
                          ${o.completed?"\u2713":""}
                        </button>

                        <div>
                          <div class="flex items-center space-x-1.5">
                            <span class="text-[10px] font-mono font-medium text-slate-400">${o.time}</span>
                            ${o.isFixed?'<span class="text-[9px] px-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">\u57FA\u51C6</span>':'<span class="text-[9px] px-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">\u81EA\u5EFA</span>'}
                          </div>
                          <div class="text-xs font-medium text-slate-800 dark:text-slate-100 leading-snug mt-0.5 ${o.completed?"line-through text-slate-400 dark:text-slate-500":""}">
                            ${o.title}
                          </div>
                          ${o.brief?`<div class="text-[10px] text-slate-400 leading-tight mt-0.5">${o.brief}</div>`:""}
                        </div>
                      </div>

                      <!-- \u64CD\u4F5C\u6309\u94AE -->
                      <div class="flex items-center space-x-0.5 flex-shrink-0">
                        <button data-action="edit" title="\u7F16\u8F91\u4EFB\u52A1" class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button data-action="delete" title="\u5220\u9664\u4EFB\u52A1" class="p-1 rounded text-slate-400 hover:text-rose-500">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  `).join("")}
              </div>

              <!-- \u5E95\u90E8\u6DFB\u52A0\u6309\u94AE -->
              <div class="p-2.5 bg-slate-50/60 dark:bg-slate-750/30 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  data-add-cat="${r.id}"
                  class="add-mod-task-btn w-full py-1.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-500 dark:text-slate-400 hover:text-slate-700 text-xs font-medium transition-all flex items-center justify-center space-x-1"
                >
                  <span>+ \u6DFB\u52A0\u4E00\u6761${r.name.slice(0,4)}\u4EFB\u52A1</span>
                </button>
              </div>
            </div>
          `}).join("")}
    </div>
  `,t.querySelectorAll(".task-row").forEach(r=>{let a=r.getAttribute("data-task");r.querySelector('[data-action="toggle"]')?.addEventListener("click",()=>{n.toggleTask(a),x(523.25,.12)}),r.querySelector('[data-action="edit"]')?.addEventListener("click",()=>{let l=n.getTasksForToday().find(i=>i.id===a);if(!l)return;let d=j(l,i=>{n.updateTask(a,i)});document.body.appendChild(d)}),r.querySelector('[data-action="delete"]')?.addEventListener("click",()=>{confirm("\u786E\u5B9A\u5220\u9664\u8BE5\u9879\u4EFB\u52A1\u5417\uFF1F")&&(n.deleteTask(a),x(329.63,.1))})}),t.querySelectorAll(".add-mod-task-btn").forEach(r=>{r.addEventListener("click",()=>{let a=r.getAttribute("data-add-cat"),l=j({category:a},d=>{n.addTask(d),x(587.33,.15)});document.body.appendChild(l)})}),t}function le(){let t=document.createElement("div");t.className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4";let e=n.getTasksForToday(),s=new Date,r=s.getHours()*60+s.getMinutes();function a(d){if(!d||!d.includes("~"))return!1;let[i,o]=d.split("~"),[c,g]=i.split(":").map(Number),[k,p]=o.split(":").map(Number),$=c*60+g,b=k*60+p;return b<$&&(b+=1440),r>=$&&r<b}function l(d){switch(d){case"diet":return"bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300";case"sport":return"bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300";case"research":return"bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300";case"growth":return"bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300";case"habit":return"bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300";default:return"bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"}}return t.innerHTML=`
    <div class="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
      ${e.map(d=>{let i=a(d.time);return`
          <div class="relative pl-10" data-task="${d.id}">
            <!-- \u8282\u70B9\u5706\u70B9 -->
            <div class="absolute left-2.5 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${i?"bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse":d.completed?"bg-emerald-600":"bg-slate-300 dark:bg-slate-600"}"></div>

            <!-- \u5361\u7247 -->
            <div class="p-3.5 rounded-2xl border transition-all flex items-start justify-between ${d.completed?"bg-slate-50 dark:bg-slate-750/30 border-slate-200/60 dark:border-slate-700/60 opacity-60":i?"bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/30 shadow-md":"bg-white dark:bg-slate-750/70 border-slate-200 dark:border-slate-700 hover:border-slate-300"}">
              <div class="flex items-start space-x-3 mr-2">
                <button
                  data-action="toggle"
                  class="mt-0.5 w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border transition-all ${d.completed?"bg-emerald-600 text-white border-emerald-600 font-bold text-xs":"border-slate-300 dark:border-slate-600 hover:border-emerald-500"}"
                >
                  ${d.completed?"\u2713":""}
                </button>

                <div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs font-mono font-bold text-slate-500">${d.time}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded font-extrabold ${l(d.category)}">${d.badge||"\u4EFB\u52A1"}</span>
                    ${d.isFixed?"":'<span class="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">\u4E34\u65F6</span>'}
                    ${i?'<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-extrabold animate-pulse">\u6B64\u65F6\u6B64\u523B</span>':""}
                  </div>
                  <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5 ${d.completed?"line-through text-slate-400 dark:text-slate-500":""}">
                    ${d.title}
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    ${d.details}
                  </div>
                </div>
              </div>

              <!-- \u53F3\u4FA7\u5FEB\u6377\u64CD\u4F5C -->
              <div class="flex items-center space-x-1 flex-shrink-0">
                <button data-action="edit" title="\u7F16\u8F91" class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs">\u270F\uFE0F</button>
                <button data-action="delete" title="\u5220\u9664" class="p-1 rounded text-slate-400 hover:text-rose-500 text-xs">\u{1F5D1}\uFE0F</button>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
  `,t.querySelectorAll("[data-task]").forEach(d=>{let i=d.getAttribute("data-task");d.querySelector('[data-action="toggle"]')?.addEventListener("click",()=>{n.toggleTask(i),x(523.25,.12)}),d.querySelector('[data-action="edit"]')?.addEventListener("click",()=>{let o=n.getTasksForToday().find(g=>g.id===i);if(!o)return;let c=j(o,g=>{n.updateTask(i,g)});document.body.appendChild(c)}),d.querySelector('[data-action="delete"]')?.addEventListener("click",()=>{confirm("\u786E\u5B9A\u5220\u9664\u8BE5\u9879\u4EFB\u52A1\u5417\uFF1F")&&(n.deleteTask(i),x(329.63,.1))})}),t}function de(){let t=document.createElement("div");t.className="space-y-4";let e="modules";function s(){let r=n.isViewingToday(),a=n.calculateProgress();t.innerHTML=`
      <!-- 1. \u5386\u53F2\u65E5\u671F\u5BFC\u822A\u4E0E\u56DE\u6EAF\u6761 -->
      <div id="date-nav-mount"></div>

      <!-- 2. \u5E38\u7528\u4EFB\u52A1\u95EA\u7535\u76F4\u8FBE\u6A2A\u6761 (\u652F\u6301\u81EA\u5DF1\u65B0\u589E\u6A21\u677F) -->
      <div id="presets-mount"></div>

      <!-- 3. \u5DE5\u4F5C\u53F0\u6838\u5FC3\u64CD\u4F5C\u4E0E\u5B8C\u6210\u7387\u9762\u677F -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2 text-xs text-indigo-300 font-semibold mb-1">
              <span>\u{1F52C} \u5B9E\u9A8C\u5BA4\u5DE5\u4F4D\u81EA\u5F8B\u6A21\u5F0F</span>
              <span>\u2022</span>
              <span class="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[10px]">
                ${r?"\u4ECA\u65E5\u5B9E\u65F6\u6267\u884C":"\u5386\u53F2\u5C65\u5386\u590D\u76D8"}
              </span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black">\u5168\u5929\u5065\u5EB7\u4E0E\u79D1\u7814\u884C\u52A8\u5DE5\u4F5C\u53F0</h2>
            <p class="text-xs text-slate-300 mt-0.5">
              \u996E\u98DF\u8425\u517B\u3001\u4F53\u80FD\u7403\u7C7B\u3001\u79D1\u7814\u653B\u575A\u72EC\u7ACB\u5206\u8F68\uFF0C\u57FA\u51C6\u4E60\u60EF\u81EA\u52A8\u6CE8\u5165\uFF0C\u5E38\u7528\u4EFB\u52A1\u4E00\u79D2\u76F4\u8FBE\u3002
            </p>
          </div>

          <!-- \u53F3\u4FA7\u64CD\u4F5C\u6309\u94AE\u7EC4 -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              id="add-custom-task-btn"
              class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-500/30 transition-all flex items-center space-x-1.5"
            >
              <span>\u2795</span>
              <span>\u6DFB\u52A0\u4E34\u65F6\u5F85\u529E</span>
            </button>
            <button
              id="reset-baseline-btn"
              title="\u91CD\u65B0\u52A0\u8F7D\u5F53\u5929\u7684\u5065\u5EB7\u4E0E\u8FD0\u52A8\u57FA\u51C6\u56FA\u5B9A\u4EFB\u52A1"
              class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold text-xs border border-white/10 transition-all"
            >
              \u{1F504} \u6062\u590D\u57FA\u51C6
            </button>
          </div>
        </div>

        <!-- \u8FDB\u5EA6\u6761\u4E0E\u89C6\u89D2\u5207\u6362 -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div class="flex items-center space-x-3">
            <div class="text-xs font-bold text-slate-300">
              \u95ED\u73AF\u8FBE\u6210\uFF1A<span class="text-emerald-400 font-mono text-sm">${a.done}</span> / ${a.total}
            </div>
            <div class="w-28 sm:w-44 bg-white/10 rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300" style="width: ${a.percent}%"></div>
            </div>
            <span class="text-xs font-bold text-emerald-300 font-mono">${a.percent}%</span>
          </div>

          <!-- \u53CC\u6A21\u89C6\u56FE\u5207\u6362 -->
          <div class="flex items-center bg-black/20 p-1 rounded-xl border border-white/10 text-xs">
            <button
              id="switch-modules-view"
              class="px-3 py-1.5 rounded-lg font-bold transition-all ${e==="modules"?"bg-white text-slate-900 shadow-sm":"text-slate-400 hover:text-white"}"
            >
              \u{1F371} \u5206\u6A21\u5757\u591A\u8F68\u770B\u677F
            </button>
            <button
              id="switch-timeline-view"
              class="px-3 py-1.5 rounded-lg font-bold transition-all ${e==="timeline"?"bg-white text-slate-900 shadow-sm":"text-slate-400 hover:text-white"}"
            >
              \u23F1\uFE0F \u5168\u5929\u65F6\u5E8F\u6D41\u6C34\u7EBF
            </button>
          </div>
        </div>
      </div>

      <!-- 4. \u4E3B\u89C6\u56FE\u6E32\u67D3\u6302\u8F7D\u533A -->
      <div id="daily-view-mount"></div>
    `,t.querySelector("#date-nav-mount")?.appendChild(te()),t.querySelector("#presets-mount")?.appendChild(se());let l=t.querySelector("#daily-view-mount");l&&(e==="modules"?l.appendChild(re()):l.appendChild(le())),t.querySelector("#add-custom-task-btn")?.addEventListener("click",()=>{let d=j(null,i=>{n.addTask(i),x(587.33,.15)});document.body.appendChild(d)}),t.querySelector("#reset-baseline-btn")?.addEventListener("click",()=>{confirm("\u786E\u5B9A\u8981\u5C06\u5F53\u524D\u65E5\u671F\u7684\u65E5\u7A0B\u91CD\u7F6E\u4E3A\u6807\u51C6\u57FA\u51C6\u4EFB\u52A1\u5417\uFF1F")&&(n.resetDateToBaseline(),x(440,.1))}),t.querySelector("#switch-modules-view")?.addEventListener("click",()=>{e!=="modules"&&(e="modules",s())}),t.querySelector("#switch-timeline-view")?.addEventListener("click",()=>{e!=="timeline"&&(e="timeline",s())})}return s(),n.subscribe("tasksChanged",()=>s()),n.subscribe("dateChanged",()=>s()),n.subscribe("presetsChanged",()=>s()),t}function oe(t){let e=document.createElement("div");e.className="space-y-4";let s=new Date().getDay(),a=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][s],l=new Date,d=l.getHours()*60+l.getMinutes(),i=a,o="all",c=[{id:"all",label:"\u5168\u90E8",icon:"\u{1F310}"},{id:"meal",label:"\u996E\u98DF",icon:"\u{1F957}"},{id:"sport",label:"\u8FD0\u52A8\u7FBD\u7403",icon:"\u{1F3F8}"},{id:"research",label:"\u79D1\u7814",icon:"\u{1F52C}"},{id:"water",label:"\u8865\u6C34",icon:"\u{1F4A7}"},{id:"sleep",label:"\u7761\u7720",icon:"\u{1F319}"}];function g(b){let[m,u]=b.split("~");if(!m||!u)return!1;let[f,h]=m.split(":").map(Number),[v,w]=u.split(":").map(Number),E=f*60+h,H=v*60+w;return H<E&&(H+=1440),d>=E&&d<H}function k(b){switch(b){case"meal":return"bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 hover:border-emerald-400";case"sport":return"bg-amber-50/90 dark:bg-amber-950/40 border-amber-300/80 dark:border-amber-800/60 text-amber-950 dark:text-amber-200 hover:border-amber-400";case"research":return"bg-sky-50/80 dark:bg-sky-950/30 border-sky-200/80 dark:border-sky-800/50 text-sky-900 dark:text-sky-200 hover:border-sky-400";case"water":return"bg-cyan-50/90 dark:bg-cyan-950/40 border-cyan-300/80 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-200 hover:border-cyan-400";case"sleep":return"bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-300/80 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 hover:border-indigo-400";default:return"bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"}}function p(){return`
      <!-- \u63A7\u5236\u680F\uFF1A\u6807\u9898\u4E0E\u7B5B\u9009 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-lg sm:text-xl">\u{1F4C5}</span>
              <h2 class="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">\u7814\u7A76\u751F\u6BCF\u5468\u5065\u5EB7\u5927\u8BFE\u8868</h2>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300">
                \u4ECA\u65E5\uFF1A${a}
              </span>
            </div>
          </div>

          <!-- \u6807\u7B7E\u7C7B\u578B\u7B5B\u9009 -->
          <div class="flex items-center space-x-1 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
            ${c.map(b=>`
                <button
                  data-filter="${b.id}"
                  class="filter-tab-btn flex-shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${o===b.id?"bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold":"bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"}"
                >
                  <span>${b.icon}</span>
                  <span>${b.label}</span>
                </button>
              `).join("")}
          </div>
        </div>

        <!-- \u624B\u673A\u7AEF\u4E13\u5C5E\uFF1A\u661F\u671F\u51E0\u5355\u65E5/\u5168\u5468\u5207\u6362\u5668 (\u4EC5\u5728sm\u4EE5\u4E0B\u5C4F\u5E55\u5C55\u793A) -->
        <div class="sm:hidden pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          <span class="text-[10px] font-bold text-slate-400 flex-shrink-0 mr-1">\u9009\u62E9\u661F\u671F\uFF1A</span>
          <button
            data-mobile-day="all_table"
            class="mobile-day-btn flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${i==="all_table"?"bg-emerald-600 text-white":"bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}"
          >
            \u5168\u5468\u5927\u8868
          </button>
          ${M.map(b=>`
            <button
              data-mobile-day="${b}"
              class="mobile-day-btn flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${i===b?"bg-emerald-600 text-white":b===a?"bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300":"bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}"
            >
              ${b}${b===a?" (\u4ECA)":""}
            </button>
          `).join("")}
        </div>
      </div>

      <!-- \u624B\u673A\u7AEF\u5355\u65E5\u8BFE\u8868\u5361\u7247\u6D41 (\u4EC5\u5728\u79FB\u52A8\u7AEF\u4E14\u975E\u5168\u5468\u5927\u8868\u6A21\u5F0F\u65F6\u5448\u73B0) -->
      <div class="sm:hidden ${i==="all_table"?"hidden":"space-y-2"}">
        ${T.map(b=>{let m=S(i,b.id),u=g(b.time)&&i===a,f=o!=="all"&&m.type!==o;return`
            <div
              data-day="${i}"
              data-slot="${b.id}"
              class="timetable-cell-box p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between ${k(m.type)} ${f?"opacity-25":""} ${u?"ring-2 ring-emerald-500 shadow-md":""}"
            >
              <div>
                <div class="flex items-center space-x-2 mb-1">
                  <span class="text-xs font-mono font-bold text-slate-500">${b.time}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded font-extrabold bg-white/70 dark:bg-black/30">${m.badge}</span>
                  ${u?'<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-black animate-pulse">\u6B64\u65F6\u6B64\u523B</span>':""}
                </div>
                <div class="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  ${m.title}
                </div>
                <div class="text-[11px] opacity-75 mt-0.5 leading-tight">
                  ${m.brief}
                </div>
              </div>
              <span class="text-slate-400 text-xs font-bold flex-shrink-0 ml-2">\u2192</span>
            </div>
          `}).join("")}
      </div>

      <!-- \u684C\u9762\u7AEF\u4E0E\u79FB\u52A8\u5168\u666F\u5927\u8868\u683C (\u684C\u9762\u5E38\u9A7B\uFF0C\u624B\u673A\u5728all_table\u65F6\u51FA\u73B0) -->
      <div class="${i!=="all_table"?"hidden sm:block":"block"} overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
        <table class="w-full text-left border-collapse min-w-[880px]">
          <thead>
            <tr class="bg-slate-100/90 dark:bg-slate-750/70 border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200">
              <th class="p-2.5 w-24 text-center sticky left-0 bg-slate-100 dark:bg-slate-800 z-20 border-r border-slate-200 dark:border-slate-700">\u65F6\u6BB5</th>
              ${M.map(b=>`
                <th class="p-2.5 text-center border-r border-slate-200/70 dark:border-slate-700/70 last:border-r-0 ${b===a?"bg-amber-100/60 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300":""}">
                  ${b}${b===a?' <span class="text-[10px] px-1 rounded bg-amber-400 text-amber-950 font-black">\u4ECA\u65E5</span>':""}
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
            ${T.map(b=>{let m=g(b.time);return`
                <tr class="${m?"bg-amber-50/30 dark:bg-amber-950/20":""}">
                  <td class="p-2 text-center sticky left-0 bg-slate-50 dark:bg-slate-800 z-10 border-r border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                    <div class="text-[11px] font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-1">
                      <span>${b.label}</span>
                      ${m?'<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>':""}
                    </div>
                    <div class="text-[9px] text-slate-400 font-mono mt-0.5">${b.time}</div>
                  </td>
                  ${M.map(u=>{let f=S(u,b.id),h=u===a,v=o!=="all"&&f.type!==o;return`
                      <td class="p-1 border-r border-slate-200/60 dark:border-slate-700/60 last:border-r-0 align-top ${h?"bg-amber-50/20 dark:bg-amber-950/10":""}">
                        <div
                          data-day="${u}"
                          data-slot="${b.id}"
                          class="timetable-cell-box p-1.5 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between min-h-[72px] ${k(f.type)} ${v?"opacity-25":"hover:scale-[1.02]"}"
                        >
                          <div>
                            <span class="text-[8px] px-1 py-0.2 rounded font-extrabold bg-white/70 dark:bg-black/30 line-clamp-1">${f.badge}</span>
                            <div class="text-[10px] font-bold leading-snug line-clamp-2 mt-0.5">${f.title}</div>
                          </div>
                          <div class="text-[9px] opacity-75 leading-tight line-clamp-1 mt-1 font-medium">${f.brief}</div>
                        </div>
                      </td>
                    `}).join("")}
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `}e.innerHTML=p();function $(){e.querySelectorAll(".timetable-cell-box").forEach(b=>{b.addEventListener("click",()=>{let m=b.getAttribute("data-day"),u=b.getAttribute("data-slot"),f=T.find(v=>v.id===u),h=S(m,u);x(523.25,.1),t({day:m,slot:f,cell:h})})}),e.querySelectorAll(".filter-tab-btn").forEach(b=>{b.addEventListener("click",()=>{o=b.getAttribute("data-filter"),e.innerHTML=p(),$()})}),e.querySelectorAll(".mobile-day-btn").forEach(b=>{b.addEventListener("click",()=>{i=b.getAttribute("data-mobile-day"),e.innerHTML=p(),$()})})}return $(),e}function ie(t){let e=document.createElement("div");e.className="bg-white dark:bg-slate-800 rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";let s=new Date().getDay(),a=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][s],l=C(),d=new Date,i=d.getHours()*60+d.getMinutes();return e.innerHTML=`
    <!-- \u5934\u90E8\u4ECA\u65E5\u5B9A\u4F4D -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <div class="flex items-center space-x-2">
          <span class="text-xl">\u23F1\uFE0F</span>
          <h3 class="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">\u4ECA\u65E5\u4E13\u6CE8\u79D1\u7814\u4E0E\u5065\u5EB7\u6267\u884C\u6D41\u6C34</h3>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${l} \u2022 \u5F53\u524D\u6B63\u5728\u6267\u884C\u7684\u4E8B\u9879\u76EE\u524D\u5DF2\u9AD8\u4EAE</p>
      </div>
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">
        ${a}\u4E13\u5C5E\u65F6\u523B\u8868
      </span>
    </div>

    <!-- \u5782\u76F4\u65F6\u5E8F\u6D41 -->
    <div class="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
      ${T.map(o=>{let c=S(a,o.id),[g,k]=o.time.split("~"),[p,$]=g.split(":").map(Number),[b,m]=k.split(":").map(Number),u=p*60+$,f=b*60+m;f<u&&(f+=1440);let h=i>=u&&i<f,v=i>=f;return`
          <div class="relative pl-10">
            <!-- \u8282\u70B9\u5706\u70B9 -->
            <div class="absolute left-2.5 top-3 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${h?"bg-emerald-500 ring-4 ring-emerald-500/30 animate-pulse":v?"bg-slate-400":"bg-slate-300 dark:bg-slate-600"}"></div>

            <!-- \u5361\u7247 -->
            <div
              data-slot="${o.id}"
              class="today-slot-card p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${h?"bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-600 ring-2 ring-emerald-400/30 shadow-md":"bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700 hover:border-slate-300"}"
            >
              <div class="flex flex-wrap items-center justify-between gap-1 mb-1">
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-mono font-bold ${h?"text-emerald-700 dark:text-emerald-300":"text-slate-500"}">${o.time}</span>
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-100">${o.label}</span>
                </div>
                <div class="flex items-center space-x-1.5">
                  <span class="text-[10px] px-2 py-0.5 rounded-md font-bold bg-white dark:bg-black/30 text-slate-700 dark:text-slate-300 shadow-sm">${c.badge}</span>
                  ${h?'<span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white font-extrabold">\u6B64\u65F6\u6B64\u523B</span>':""}
                </div>
              </div>

              <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">${c.title}</div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">${c.details}</p>

              <div class="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-2">
                <span>\u{1F4A1} ${c.brief}</span>
                <span class="text-emerald-600 dark:text-emerald-400 font-semibold">\u70B9\u51FB\u67E5\u770B\u7EC6\u5219 \u2192</span>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
  `,e.querySelectorAll(".today-slot-card").forEach(o=>{o.addEventListener("click",()=>{let c=o.getAttribute("data-slot"),g=T.find(p=>p.id===c),k=S(a,c);x(523.25,.1),t({day:a,slot:g,cell:k})})}),e}function ne(t,e){let{day:s,slot:r,cell:a}=t,l=document.createElement("div");l.className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200",l.innerHTML=`
    <div class="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 max-h-[90vh] overflow-y-auto">
      <!-- \u5934\u90E8 -->
      <div class="flex items-start justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
        <div>
          <div class="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <span>\u{1F4C5} ${s}</span>
            <span>\u2022</span>
            <span>\u23F0 ${r.time}</span>
            <span class="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">${r.label}</span>
          </div>
          <h3 class="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">${a.title}</h3>
        </div>
        <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-slate-500 font-bold transition-colors">
          \u2715
        </button>
      </div>

      <!-- \u6838\u5FC3\u89C4\u8303 -->
      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
        <span class="text-xs font-bold text-slate-400 uppercase">\u{1F4CB} \u6267\u884C\u89C4\u7A0B\u4E0E\u6807\u914D\uFF1A</span>
        <p class="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">${a.details}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${a.brief}</p>
      </div>

      <!-- 1:1\u66FF\u6362\u5E93\uFF08\u5982\u679C\u6709\uFF09 -->
      ${a.sub?`
        <div class="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs">
          <span class="font-bold text-amber-900 dark:text-amber-300 block mb-1">\u{1F504} 1:1\u5E73\u66FF\u4E0E\u81EA\u7531\u8F6E\u6362\uFF1A</span>
          <p class="text-amber-800 dark:text-amber-200 leading-relaxed">${a.sub}</p>
        </div>
      `:""}

      <!-- \u907F\u5751\u63D0\u9192 -->
      ${a.tips?`
        <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-300">
          <span class="font-bold block mb-1">\u26A0\uFE0F \u5B9E\u64CD\u907F\u5751\u7EC6\u8282\uFF1A</span>
          <p class="leading-relaxed">${a.tips}</p>
        </div>
      `:""}

      <!-- \u5E95\u90E8\u5173\u95ED\u6309\u94AE -->
      <div class="pt-2 flex justify-end">
        <button id="modal-confirm-btn" class="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
          \u77E5\u9053\u4E86\uFF0C\u6309\u8868\u6267\u884C
        </button>
      </div>
    </div>
  `;let d=()=>{l.remove(),e?.()};return l.querySelector("#modal-close-btn")?.addEventListener("click",d),l.querySelector("#modal-confirm-btn")?.addEventListener("click",d),l.addEventListener("click",i=>{i.target===l&&d()}),l}function ce(){let t=document.createElement("div");t.className="space-y-6";let e="weekly";function s(){t.innerHTML=`
      <!-- \u6A21\u5F0F\u5207\u6362\u63A7\u5236\u5668 -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-3xl text-white shadow-lg">
        <div class="flex items-center space-x-3">
          <span class="text-2xl">\u{1F393}</span>
          <div>
            <h2 class="text-base sm:text-lg font-bold">\u9AD8\u6821\u7814\u7A76\u751F\u751F\u6D3B\u5065\u5EB7\u5927\u8BFE\u8868</h2>
            <p class="text-xs text-slate-300">\u628A\u79D1\u7814\u3001\u4E09\u9910\u3001\u8DD1\u6B65\u7FBD\u6BDB\u7403\u4E0E\u7761\u7720\u50CF\u8BFE\u8868\u4E00\u6837\u6392\u5E03\uFF0C\u968F\u65F6\u968F\u5730\u77E5\u9053\u4F55\u65F6\u8BE5\u5E72\u5565</p>
          </div>
        </div>

        <div class="flex items-center bg-slate-800 p-1 rounded-2xl border border-slate-700">
          <button
            id="switch-weekly-view"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${e==="weekly"?"bg-emerald-600 text-white shadow-md shadow-emerald-600/30":"text-slate-400 hover:text-white"}"
          >
            \u{1F4C5} \u6BCF\u5468\u603B\u89C8\u5168\u8868 (\u5168\u666F)
          </button>
          <button
            id="switch-today-view"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${e==="today"?"bg-emerald-600 text-white shadow-md shadow-emerald-600/30":"text-slate-400 hover:text-white"}"
          >
            \u23F1\uFE0F \u4ECA\u65E5\u4E13\u6CE8\u65F6\u5E8F\u6D41
          </button>
        </div>
      </div>

      <!-- \u5B50\u89C6\u56FE\u6302\u8F7D\u533A -->
      <div id="timetable-view-mount"></div>
    `;let r=t.querySelector("#timetable-view-mount");if(!r)return;let a=l=>{let d=ne(l,()=>{});document.body.appendChild(d)};e==="weekly"?r.appendChild(oe(a)):r.appendChild(ie(a)),t.querySelector("#switch-weekly-view")?.addEventListener("click",()=>{e!=="weekly"&&(e="weekly",s())}),t.querySelector("#switch-today-view")?.addEventListener("click",()=>{e!=="today"&&(e="today",s())})}return s(),t}var N=[{id:"research_plan",category:"research",title:"\u7814\u7A76\u751F\u5B66\u672F\u653B\u575A\u4E0E\u5DE5\u4F4D\u8282\u594F\u89C4\u7A0B",icon:"\u{1F9EA}",badge:"\u5B66\u4E1A\u6838\u5FC3",summary:"\u5DE5\u4F4D\u5750\u73ED\u7C7B\u5DE5\u4F5C\u5236\u8282\u594F\u3001\u6587\u732E\u7CBE\u8BFB\u3001\u5B9E\u9A8C\u63A8\u8FDB\u4E0E\u7EC4\u4F1A\u6C47\u62A5\u5168\u5468\u671F\u89C4\u5212\u3002"},{id:"diet_plan",category:"nutrition",title:"\u63A7\u7CD6\u51CF\u8102\u996E\u98DF\u603B\u65B9\u6848",icon:"\u{1F957}",badge:"\u5065\u5EB7\u57FA\u77F3",summary:"\u56DB\u9910\u5B9A\u65F6\u5B9A\u91CF\u30011:1\u81EA\u7531\u66FF\u6362\u4E0E\u9AD8\u6821\u98DF\u5802\u751F\u5B58\u907F\u5751\u5168\u624B\u518C\u3002"},{id:"supplement_plan",category:"nutrition",title:"\u7814\u7A76\u751F\u5FAE\u91CF\u8425\u517B\u4E0E\u8865\u5242\u65B9\u6848",icon:"\u{1F48A}",badge:"\u5BF9\u75C7\u6297\u8870",summary:"\u9488\u5BF9\u5BA4\u5185\u4E0D\u89C1\u9633\u5149\u3001\u957F\u65F6\u7528\u8111\u7528\u773C\u7684\u7EF4\u751F\u7D20D3/\u9C7C\u6CB9/\u9541\u8865\u5145\u6307\u5F15\u3002"},{id:"fitness_plan",category:"body",title:"\u6781\u7B803+2\u6BCF\u5468\u4F53\u80FD\u8BFE\u8868",icon:"\u{1F3C3}\u200D\u2642\uFE0F",badge:"\u7CBE\u529B\u5145\u6C9B",summary:"\u9002\u5408\u79D1\u7814\u8282\u594F\u76843\u6B21\u6297\u963B\u529B\u91CF+2\u6B21\u64CD\u573A\u6709\u6C27\uFF0C\u4E0D\u529B\u7AED\u91CD\u5728\u6062\u590D\u3002"},{id:"posture_plan",category:"body",title:"\u5DE5\u4F4D\u4E45\u5750\u4E0E\u810A\u67F1\u6297\u8870\u89C4\u5212",icon:"\u{1FA91}",badge:"\u4F53\u6001\u91CD\u5851",summary:"\u5BF9\u6297\u4E0A\u4EA4\u53C9\u7EFC\u5408\u5F81\uFF08\u5706\u80A9\u9A7C\u80CC\u9888\u524D\u4F38\uFF09\uFF0C\u5DE5\u4F4D4\u5927\u5FAE\u62C9\u4F38\u4E0E\u4EBA\u673A\u5DE5\u5B66\u3002"},{id:"circadian_plan",category:"sleep",title:"\u79D1\u7814\u4F5C\u606F\u4E0E90\u5206\u949F\u7761\u7720\u8282\u5F8B",icon:"\u{1F319}",badge:"\u6DF1\u5EA6\u4FEE\u590D",summary:"\u951A\u5B9A\u6668\u5149\u663C\u591C\u8282\u5F8B\u3001\u5BBF\u820D\u964D\u566A\u906E\u5149\u4E0E7.5\u5C0F\u65F6\u5B8C\u6574\u5468\u671F\u7761\u7720\u3002"},{id:"mental_plan",category:"mind",title:"\u79D1\u7814\u5FC3\u667A\u97E7\u6027\u4E0E\u6297\u538B\u9884\u6848",icon:"\u{1F9E0}",badge:"\u60C5\u7EEA\u7A33\u6001",summary:"\u5BFC\u5E08\u4E25\u5389\u6279\u8BC4\u8131\u654F\u3001\u62D2\u7A3F\u5B9E\u9A8C\u5F52\u96F6\u6025\u6551\u5305\u4E0EBurnout\u5026\u6020\u963B\u65AD\u3002"}],I=[{id:"tracker_tool",title:"\u4ECA\u65E5\u5065\u5EB7\u7EFC\u5408\u6253\u5361\u770B\u677F",icon:"\u{1F4CA}",badge:"\u6BCF\u65E5\u5FC5\u7528",summary:"\u4E00\u89C8\u4ECA\u65E5\u996E\u98DF\u3001\u62C9\u4F38\u3001\u8FD0\u52A8\u5B8C\u6210\u5EA6\u4E0E\u8FDE\u7EED\u6253\u5361\u6D3B\u529B\u603B\u5206\u3002"},{id:"water_tool",title:"\u5DE5\u4F4D\u996E\u6C34\u4E0E\u8865\u5242\u8BB0\u5F55\u5668",icon:"\u{1F4A7}",badge:"\u8282\u5F8B\u6253\u5361",summary:"2000ml\u5206\u6BB5\u65F6\u5E8F\u6253\u5361\uFF0C\u914D\u5408\u5E38\u7528\u8111\u529B\u8865\u5242\u670D\u7528\u8FFD\u8E2A\u3002"},{id:"substitute_tool",title:"\u98DF\u72691:1\u81EA\u7531\u66FF\u6362\u8BA1\u7B97\u5668",icon:"\u{1F504}",badge:"\u7075\u6D3B\u914D\u9910",summary:"\u70B9\u9009\u6807\u914D\u98DF\u6750\uFF0C\u4E00\u952E\u6362\u7B97\u7B49\u91CF\u5E73\u66FF\u7269\u4E0E\u5B8F\u91CF\u8425\u517B\u7D20\u5DEE\u5F02\u3002"},{id:"breathing_tool",title:"4-7-8\u8FF7\u8D70\u795E\u7ECF\u547C\u5438\u8BAD\u7EC3\u4EEA",icon:"\u23F1\uFE0F",badge:"\u5373\u65F6\u51CF\u538B",summary:"\u4EA4\u4E92\u5F0F\u547C\u5438\u5149\u6655\u52A8\u6548\u4E0E\u97F3\u9891\u5F15\u5BFC\uFF0C\u7761\u524D\u5DE5\u4F4D\u901F\u6548\u9547\u9759\u3002"},{id:"desk_timer_tool",title:"45\u5206\u949F\u5DE5\u4F4D\u4E45\u5750\u9632\u762B\u756A\u8304\u949F",icon:"\u23F3",badge:"\u5DE5\u4F4D\u4F34\u4FA3",summary:"\u79D1\u7814\u5012\u8BA1\u65F6\u63D0\u9192\uFF0C\u5230\u70B9\u5F3A\u5236\u89E6\u53D1\u5DE5\u4F4D\u9888\u690E\u4E0E\u80F8\u80CC\u62C9\u4F38\u3002"},{id:"backup_tool",title:"\u5065\u5EB7\u6570\u636E\u5F52\u6863\u4E0E\u5907\u4EFD\u4E2D\u5FC3",icon:"\u{1F4BE}",badge:"\u672C\u5730\u9690\u79C1",summary:"\u652F\u6301\u6253\u5361\u6570\u636E\u5BFC\u51FAJSON\u5FEB\u7167\u53CA\u8DE8\u8BBE\u5907\u6062\u590D\uFF0C100%\u672C\u5730\u4FDD\u5B58\u3002"}];var B=[{id:"breakfast",title:"\u65E9\u9910",time:"7:30~8:30",standard:[{name:"\u5168\u9ED1\u9EA6\u9762\u5305",amount:"2\u7247",tag:"\u4F18\u8D28\u590D\u5408\u78B3\u6C34"},{name:"\u7EAF\u725B\u5976",amount:"250ml",tag:"\u4F18\u8D28\u86CB\u767D\u4E0E\u9499"},{name:"\u6C34\u716E\u86CB\uFF08\u5168\u86CB\uFF09",amount:"2\u4E2A",tag:"\u5B8C\u5168\u86CB\u767D\u4E0E\u5375\u78F7\u8102"}],replacements:[{target:"\u7EAF\u725B\u5976 250ml",options:[{name:"\u65E0\u7CD6\u8C46\u6D46",amount:"300ml",note:"\u5927\u8C46\u5F02\u9EC4\u916E\uFF0C\u690D\u7269\u86CB\u767D"},{name:"\u65E0\u7CD6\u5E0C\u814A\u9178\u5976",amount:"150g",note:"\u9AD8\u86CB\u767D\u4F4E\u4E73\u7CD6\uFF0C\u76CA\u751F\u83CC"}]},{target:"\u5168\u9ED1\u9EA6\u9762\u5305 2\u7247",options:[{name:"\u5FEB\u719F\u539F\u5473\u71D5\u9EA6\u7247",amount:"35g\uFF08\u5F00\u6C34\u51B2\u6CE1\uFF09",note:"\u03B2-\u8461\u805A\u7CD6\uFF0C\u957F\u6548\u9971\u8179"}]}],pitfalls:["\u86CB\u9EC4\u5FC5\u987B\u5403\uFF08\u5BCC\u542B\u80C6\u78B1\uFF0C\u6709\u52A9\u4E8E\u7EF4\u6301\u79D1\u7814\u9AD8\u8D1F\u8377\u8111\u529B\u795E\u7ECF\u9012\u8D28\u8FD0\u8F6C\uFF09\u3002","\u9ED1\u9EA6\u9762\u5305\u52A1\u5FC5\u68C0\u67E5\u914D\u6599\u8868\uFF0C\u6392\u5728\u7B2C\u4E00\u4F4D\u5FC5\u987B\u662F\u9ED1\u9EA6\u7C89\u6216\u5168\u9EA6\u7C89\uFF0C\u62D2\u7EDD\u5C0F\u9EA6\u7C89\u5192\u5145\u3002"],gradTips:"\u5BBF\u820D\u82E5\u65E0\u70F9\u996A\u6761\u4EF6\uFF0C\u53EF\u5907\u4E00\u4E2A\u6570\u5341\u5143\u7684\u5C0F\u84B8\u86CB\u5668\uFF0C\u65E9\u4E0A\u6D17\u6F31\u65F65\u5206\u949F\u81EA\u52A8\u716E\u597D\u9E21\u86CB\u3002"},{id:"morning_snack",title:"\u4E0A\u5348\u52A0\u9910",time:"10:00~10:30",standard:[{name:"\u539F\u5473\u6DF7\u5408\u575A\u679C",amount:"10~15g",tag:"\u5FC5\u9700\u4E0D\u9971\u548C\u8102\u80AA\u9178"}],replacements:[{target:"\u6DF7\u5408\u575A\u679C 10~15g",options:[{name:"\u539F\u5473\u5DF4\u65E6\u6728",amount:"8\u7C92",note:"\u5BCC\u542B\u7EF4\u751F\u7D20E\u4E0E\u6297\u6C27\u5316\u6210\u5206"},{name:"\u539F\u5473\u6838\u6843\u4EC1",amount:"2\u4E2A\uFF084\u74E3\uFF09",note:"\u03B1-\u4E9A\u9EBB\u9178\uFF0C\u62A4\u8111\u76CA\u667A"}]}],pitfalls:["\u8865\u5145\u5FC5\u9700\u8102\u80AA\u9178\u4E0E\u5FAE\u91CF\u5143\u7D20\uFF0C\u70ED\u91CF\u5BC6\u5EA6\u6781\u9AD8\uFF0C\u4E25\u7981\u6293\u7740\u5403\uFF0C\u4E25\u683C\u63A7\u5236\u5355\u6B21\u5206\u91CF\u3002","\u575A\u51B3\u62D2\u7EDD\u76D0\u7117\u3001\u70AD\u70E7\u3001\u8702\u871C\u88F9\u7CD6\u7B49\u52A0\u5DE5\u98CE\u5473\u575A\u679C\u3002"],gradTips:"\u5DE5\u4F4D\u62BD\u5C49\u5E38\u5907\u72EC\u7ACB\u5C0F\u5305\u88C5\uFF08\u6BCF\u65E5\u575A\u679C\uFF09\uFF0C\u907F\u514D\u5927\u7F50\u88C5\u5728\u770B\u8BBA\u6587\u65F6\u65E0\u610F\u8BC6\u8FC7\u91CF\u6444\u5165\u3002"},{id:"lunch",title:"\u5348\u9910",time:"11:30~12:30",standard:[{name:"\u98DF\u5802\u7C73\u996D",amount:"1\u62F3\u5934\uFF08\u7EA6\u534A\u7897\uFF0C\u7EA6120g\u719F\u91CD\uFF09",tag:"\u57FA\u7840\u80FD\u91CF"},{name:"\u98DF\u5802\u7EFF\u53F6/\u6D45\u8272\u852C\u83DC",amount:"2\u4EFD\uFF08\u5C11\u6CB9\u6216\u8FC7\u6C34\uFF09",tag:"\u7EF4\u751F\u7D20\u4E0E\u81B3\u98DF\u7EA4\u7EF4"},{name:"\u4F18\u8D28\u86CB\u767D\u6E90",amount:"1\u4EFD",tag:"\u808C\u8089\u7EF4\u6301\u4E0E\u9AD8\u9971\u8179"}],replacements:[{target:"\u81EA\u5E26\u86CB\u767D 1\u4EFD",options:[{name:"\u5373\u98DF\u9E21\u80F8\u8089",amount:"100g",note:"\u9AD8\u86CB\u767D\u6781\u4F4E\u8102\uFF0C\u968F\u62C6\u968F\u5403"},{name:"\u6C34\u6D78\u91D1\u67AA\u9C7C\u7F50\u5934",amount:"1\u7F50\uFF08\u7EA690g\u56FA\u5F62\u7269\uFF09",note:"\u4F18\u8D28\u6D77\u6D0B\u86CB\u767D\u4E0EDHA"},{name:"\u5E38\u6E29\u539F\u5473\u9171\u725B\u8089",amount:"70g",note:"\u9AD8\u751F\u7269\u4EF7\u94C1\u4E0E\u950C\uFF0C\u8010\u9965\u997F"},{name:"\u53BB\u76AE\u5364\u9E21\u817F",amount:"1\u4E2A\uFF08\u98DF\u5802/\u4FBF\u5229\u5E97\uFF09",note:"\u5265\u53BB\u5916\u76AE\u5373\u53EF\u5927\u5E45\u53BB\u6CB9"}]}],pitfalls:["\u98DF\u5802\u852C\u83DC\u4E25\u5389\u907F\u5F00\u5730\u4E09\u9C9C\u3001\u5E72\u7178\u8C46\u89D2\u3001\u7EA2\u70E7\u8304\u5B50\u7B49\u5438\u6CB9\u5927\u6237\uFF0C\u4F18\u5148\u6311\u6E05\u7092\u767D\u83DC/\u897F\u84DD\u82B1\u3002","\u7C73\u996D\u4E25\u683C\u63A7\u5236\u5728\u5355\u62F3\u5934\u5927\u5C0F\uFF0C\u675C\u7EDD\u996D\u540E\u8840\u7CD6\u9AA4\u5347\u5BFC\u81F4\u4E0B\u5348\u4E24\u70B9\u5DE5\u4F4D\u660F\u7761\u56F0\u5026\u3002"],gradTips:"\u98DF\u5802\u6253\u9910\u53E3\u8BC0\uFF1A1\u8364\uFF08\u6216\u81EA\u5E26\uFF09+2\u7D20\uFF08\u7EFF\u53F6\u4F18\u5148\uFF09+\u534A\u7897\u996D\u3002\u5E38\u5907\u4E00\u7897\u70ED\u6C64\u6216\u5F00\u6C34\u6DAE\u6CB9\u3002"},{id:"dinner",title:"\u665A\u9910",time:"17:30~18:30",standard:[{name:"\u84B8\u7EA2\u85AF",amount:"\u62F3\u5934\u5927\uFF08\u7EA6150g\uFF09",tag:"\u4F4EGI\u7F13\u91CA\u78B3\u6C34"},{name:"\u5373\u98DF\u9E21\u80F8\u8089",amount:"100g",tag:"\u7EAF\u86CB\u767D\u4F9B\u7ED9"},{name:"\u6C34\u679C\u9EC4\u74DC",amount:"1~2\u6839",tag:"\u9AD8\u6C34\u5206\u9971\u8179"}],replacements:[{target:"\u84B8\u7EA2\u85AF 150g",options:[{name:"\u771F\u7A7A\u751C\u7389\u7C73/\u7CEF\u7389\u7C73",amount:"1\u6839",note:"\u81B3\u98DF\u7EA4\u7EF4\u4E30\u5BCC\uFF0C\u5E38\u6E29\u6613\u5B58\u653E"}]},{target:"\u6C34\u679C\u9EC4\u74DC 1~2\u6839",options:[{name:"\u5723\u5973\u679C\uFF08\u5343\u79A7\u5C0F\u756A\u8304\uFF09",amount:"15~20\u9897",note:"\u756A\u8304\u7EA2\u7D20\u4E0E\u7EF4\u751F\u7D20C"}]}],pitfalls:["\u665A\u95F4\u70ED\u91CF\u6D88\u8017\u964D\u4F4E\uFF0C\u4E3B\u98DF\u5206\u91CF\u7EDD\u4E0D\u80FD\u7FFB\u500D\uFF0C\u7ED9\u80C3\u80A0\u5145\u8DB3\u6392\u7A7A\u65F6\u95F4\u3002","\u7761\u524D3\u5C0F\u65F6\u4E25\u683C\u7981\u98DF\uFF08\u82E523:30\u5C31\u5BDD\uFF0C20:30\u540E\u53EA\u559D\u6E05\u6C34\uFF0C\u7981\u6B62\u591C\u5BB5\u5916\u5356\uFF09\u3002"],gradTips:"\u5BBF\u820D\u56E4\u7BB1\u88C5\u771F\u7A7A\u7389\u7C73\u6216\u5C0F\u7EA2\u85AF\uFF0C\u5FAE\u6CE2\u7089\u6216\u5C0F\u7535\u84B8\u9505\u52A0\u70ED\u5373\u98DF\uFF0C\u514D\u53BB\u665A\u95F4\u6392\u961F\u6392\u9063\u70E6\u8E81\u3002"},{id:"sunday_special",title:"\u5468\u65E5\u7279\u8C03\uFF08\u5FC3\u7406\u5145\u7535\u4E0E\u4EE3\u8C22\u91CD\u7F6E\uFF09",time:"\u5468\u65E5\u5168\u5929\u5B89\u6392",standard:[{name:"\u5468\u65E5\u5348\u9910\uFF1A\u8BA1\u5212\u5185\u653E\u7EB5\u9910\uFF08Cheat Meal\uFF09",amount:"1\u9910\uFF088\u5206\u9971\uFF09",tag:"\u591A\u5DF4\u80FA\u5956\u52B1"},{name:"\u5468\u65E5\u665A\u9910\uFF1A\u8F7B\u65AD\u98DF\u6392\u6C34\u80BF",amount:"\u4F4E\u78B3\u539F\u5473",tag:"\u80A0\u80C3\u51C0\u5316"}],replacements:[{target:"\u653E\u7EB5\u9910\u9009\u62E9\u6307\u5357",options:[{name:"\u4F18\u8D28\u6F6E\u6C55\u725B\u8089\u706B\u9505/\u70E4\u8089",amount:"\u63A7\u5236\u8638\u6599\u9EBB\u9171\uFF0C\u591A\u7626\u8089\u7D20\u83DC",note:"\u9AD8\u86CB\u767D\u805A\u9910"},{name:"\u6E05\u6DE1\u5BB6\u5E38\u7092\u83DC\uFF08\u805A\u9910\uFF09",amount:"\u7C73\u996D\u534A\u7897\uFF0C\u63A7\u542B\u7CD6\u996E\u6599",note:"\u5FC3\u7406\u6EE1\u8DB3"}]},{target:"\u5468\u65E5\u665A\u8F7B\u98DF\u642D\u914D",options:[{name:"\u9EC4\u74DC1\u6839 + \u6C34\u6D78\u91D1\u67AA\u9C7C1\u7F50",amount:"\u591A\u559D\u6E29\u6C34",note:"\u52A0\u901F\u94A0\u79BB\u5B50\u6392\u51FA"}]}],pitfalls:["\u653E\u7EB5\u9910\u662F\u8BA1\u5212\u5185\u5FC3\u7406\u8C03\u8282\uFF0C\u7EDD\u975E\u66B4\u996E\u66B4\u98DF\u5403\u5230\u6491\uFF0C\u5207\u8BB0\u907F\u5F00\u9AD8\u7CD6\u5976\u8336\u4E0E\u6CB9\u70B8\u9AD8\u8102\u642D\u914D\u3002","\u5468\u65E5\u665A\u95F4\u591A\u996E\u6C34\uFF0C\u4FC3\u8FDB\u591A\u4F59\u76D0\u5206\u4EE3\u8C22\uFF0C\u8BA9\u5468\u4E00\u5168\u8EAB\u6E05\u723D\u65E0\u6C34\u80BF\u8FDB\u5B9E\u9A8C\u5BA4\u3002"],gradTips:"\u7528\u5468\u65E5\u5348\u9910\u4F5C\u4E3A\u4E00\u5468\u79D1\u7814\u63A8\u8FDB\u987A\u5229\u7684\u786E\u5B9A\u6027\u5956\u52B1\uFF0C\u589E\u5F3A\u81EA\u6211\u6548\u80FD\u611F\u3002"}];var D=[{id:"vit_d3",name:"\u7EF4\u751F\u7D20D3\uFF08Vitamin D3\uFF09",necessity:"\u2605\u2605\u2605\u2605\u2605 \u5BA4\u5185\u5E38\u9A7B\u7814\u7A76\u751F\u5FC5\u9009\u9879",dosage:"\u63A8\u83501000~2000 IU/\u5929\uFF08\u968F\u65E9/\u5348\u9910\u9AD8\u8102\u98DF\u7269\u4E00\u540C\u670D\u7528\uFF09",reason:"\u9AD8\u6821\u7814\u7A76\u751F\u6BCF\u5929\u5728\u5C01\u95ED\u5B9E\u9A8C\u5BA4/\u5DE5\u4F4D\u5EA6\u8FC710~14\u5C0F\u65F6\uFF0C\u51E0\u4E4E\u65E0\u6709\u6548\u4E2D\u6CE2\u7D2B\u5916\u7EBF\uFF08UVB\uFF09\u7167\u5C04\u76AE\u80A4\u5408\u6210\u5185\u6E90\u6027\u7EF4\u751F\u7D20D\u3002\u957F\u671F\u7F3A\u4E4F\u4F1A\u5BFC\u81F4\u60C5\u7EEA\u4F4E\u843D\u3001\u514D\u75AB\u4F4E\u4E0B\u9891\u7E41\u611F\u5192\u3001\u9AA8\u5BC6\u5EA6\u4E0B\u964D\u53CA\u75B2\u52B3\u7EFC\u5408\u5F81\u3002",tips:"\u8102\u6EB6\u6027\u7EF4\u751F\u7D20\uFF0C\u5FC5\u987B\u968F\u542B\u8102\u80AA\u9910\u6B21\uFF08\u5982\u65E9\u9910\u6709\u86CB\u9EC4/\u725B\u5976\u65F6\uFF09\u5438\u6536\u6700\u4F73\uFF1B\u6027\u4EF7\u6BD4\u6781\u9AD8\uFF0C\u4E00\u74F6\u6570\u5341\u5143\u53EF\u670D\u5927\u534A\u5E74\u3002"},{id:"omega3",name:"\u9AD8\u7EAF\u5EA6Omega-3\u9AD8\u7EAF\u6DF1\u6D77\u9C7C\u6CB9",necessity:"\u2605\u2605\u2605\u2605\u2606 \u9AD8\u5F3A\u5EA6\u8111\u529B\u4E0E\u773C\u529B\u4FEE\u590D",dosage:"EPA+DHA\u6709\u6548\u603B\u542B\u91CF\u6BCF\u65E5\u8FBE\u52301000mg\u4EE5\u4E0A\uFF0C\u968F\u5348\u9910\u6216\u665A\u9910\u670D\u7528",reason:"\u5927\u8111\u76AE\u5C42\u5E72\u91CD\u768430%\u4EE5\u4E0A\u7531DHA\u6784\u6210\u3002\u957F\u65F6\u95F4\u9762\u5BF9\u53CC\u663E\u793A\u5C4F\u6587\u732E\u4E0E\u4EE3\u7801\uFF0C\u773C\u775B\u5E72\u6DA9\u4E14\u89C6\u795E\u7ECF\u6613\u75B2\u52B3\uFF1BOmega-3\u5177\u5907\u5F3A\u6548\u7CFB\u7EDF\u6027\u6297\u708E\u80FD\u529B\uFF0C\u7F13\u89E3\u4E45\u5750\u5173\u8282\u5FAE\u708E\u75C7\u4E0E\u5927\u8111\u795E\u7ECF\u6027\u75B2\u5026\u3002",tips:"\u8BA4\u51C6\u5305\u88C5\u8BF4\u660E\u4E2D\u7684\u6709\u6548EPA+DHA\u5360\u6BD4\uFF08\u5EFA\u8BAE\u7EAF\u5EA6>=80%\uFF09\uFF0C\u800C\u975E\u770B\u9C7C\u6CB9\u80F6\u56CA\u603B\u6BDB\u91CD\uFF1B\u968F\u9910\u541E\u670D\u907F\u514D\u9C7C\u8165\u53CD\u80C3\u3002"},{id:"magnesium",name:"\u7518\u6C28\u9178\u9541 / \u82F9\u679C\u9178\u9541",necessity:"\u2605\u2605\u2605\u2605\u2606 \u795E\u7ECF\u89E3\u538B\u4E0E\u6DF1\u7761\u7720\u50AC\u5316\u5242",dosage:"\u5143\u7D20\u9541200~300mg/\u5929\uFF0C\u7761\u524D30~60\u5206\u949F\u6E29\u6C34\u9001\u670D",reason:"\u9AD8\u76AE\u8D28\u9187\uFF08\u79D1\u7814\u7126\u8651\uFF09\u4F1A\u6025\u5267\u52A0\u901F\u4F53\u5185\u9541\u7684\u5C3F\u6DB2\u6392\u6CC4\u3002\u9541\u79BB\u5B50\u662FGABA\uFF08\u4E2D\u67A2\u6291\u5236\u6027\u795E\u7ECF\u9012\u8D28\uFF09\u53D7\u4F53\u7684\u534F\u540C\u6FC0\u52A8\u5242\uFF0C\u80FD\u663E\u8457\u653E\u677E\u50F5\u786C\u7684\u80A9\u9888\u5E73\u6ED1\u808C\u3001\u964D\u4F4E\u4EA4\u611F\u795E\u7ECF\u5174\u594B\u5EA6\uFF0C\u5927\u5E45\u7F29\u77ED\u5165\u7761\u6F5C\u4F0F\u671F\u3002",tips:"\u9009\u7518\u6C28\u9178\u9541\uFF08\u5BF9\u795E\u7ECF\u7761\u7720\u53CB\u597D\u4E14\u4E0D\u523A\u6FC0\u80A0\u80C3\uFF09\u6216\u82F9\u679C\u9178\u9541\uFF1B\u575A\u51B3\u907F\u5F00\u6C27\u5316\u9541\uFF08\u5438\u6536\u7387\u4EC54%\uFF0C\u591A\u4F5C\u8F7B\u6CFB\u836F\u7528\uFF09\u3002"},{id:"vitamin_b",name:"\u6D3B\u6027\u590D\u5408\u7EF4\u751F\u7D20B\u65CF\uFF08B-Complex\uFF09",necessity:"\u2605\u2605\u2605\u2606\u2606 \u80FD\u91CF\u4EE3\u8C22\u4E0E\u6297\u75B2\u60EB\u8F85\u9176",dosage:"\u6BCF\u65E51\u7247\uFF08\u5EFA\u8BAE\u542BB1\u3001B2\u3001B6\u3001B12\u3001\u70DF\u9170\u80FA\u3001\u6CDB\u9178\u3001\u53F6\u9178\uFF09\uFF0C\u65E9\u9910\u540E\u670D\u7528",reason:"B\u65CF\u7EF4\u751F\u7D20\u662F\u4E09\u5927\u5B8F\u91CF\u8425\u517B\u7D20\u53C2\u4E0E\u7EBF\u7C92\u4F53\u4E09\u7FA7\u9178\u5FAA\u73AF\uFF08TCA\uFF09\u4E0D\u53EF\u6216\u7F3A\u7684\u8F85\u9176\u3002\u71AC\u591C\u8D76\u8BBA\u6587\u3001\u7528\u8111\u8FC7\u8F7D\u65F6\u6D88\u8017\u500D\u589E\uFF0C\u7F3A\u4E4F\u4F1A\u5BFC\u81F4\u53E3\u8154\u6E83\u75A1\u3001\u773C\u7751\u8DF3\u52A8\u3001\u6613\u6012\u4E0E\u6301\u7EED\u6027\u56F0\u5026\u65E0\u529B\u3002",tips:"\u6C34\u6EB6\u6027\u7EF4\u751F\u7D20\uFF0C\u670D\u7528\u540E\u82E5\u5C3F\u6DB2\u5448\u73B0\u9C9C\u4EAE\u8367\u5149\u9EC4\u8272\u5C5E\u4E8E\u6B63\u5E38\u6838\u9EC4\u7D20\uFF08\u7EF4\u751F\u7D20B2\uFF09\u4EE3\u8C22\u73B0\u8C61\uFF0C\u65E0\u9700\u60CA\u614C\u3002"},{id:"lutein",name:"\u53F6\u9EC4\u7D20\u4E0E\u7389\u7C73\u9EC4\u8D28\uFF08\u89C6\u529B\u4FDD\u536B\uFF09",necessity:"\u2605\u2605\u2605\u2606\u2606 \u5C4F\u5E55\u9605\u8BFB\u773C\u5E95\u4FDD\u62A4",dosage:"\u53F6\u9EC4\u7D2010mg+\u7389\u7C73\u9EC4\u8D282mg/\u5929\uFF08\u9EC4\u91D15:1\u914D\u6BD4\uFF09",reason:"\u8FDE\u7EED8\u5C0F\u65F6\u6CE8\u89C6\u53D1\u5149\u5C4F\u5E55\uFF0C\u9AD8\u80FD\u77ED\u6CE2\u84DD\u5149\u4F1A\u7A7F\u900F\u6676\u72B6\u4F53\u76F4\u8FBE\u89C6\u7F51\u819C\u9EC4\u6591\u533A\u5F15\u53D1\u5149\u6C27\u5316\u635F\u4F24\u3002\u53F6\u9EC4\u7D20\u80FD\u79EF\u805A\u4E8E\u9EC4\u6591\u8272\u7D20\u5C42\u4F5C\u4E3A\u5929\u7136\u84DD\u5149\u6EE4\u955C\uFF0C\u6709\u6548\u7F13\u89E3\u5E72\u773C\u4E0E\u5149\u6655\u75B2\u52B3\u3002",tips:"\u5E73\u65F6\u4E5F\u53EF\u591A\u5403\u6DF1\u7EFF\u53F6\u852C\u83DC\uFF08\u5982\u7FBD\u8863\u7518\u84DD\u3001\u83E0\u83DC\u3001\u897F\u84DD\u82B1\uFF09\u81EA\u7136\u83B7\u53D6\u3002"}];var R=[{id:"chin_tuck",name:"\u9888\u690E\u4E0B\u988C\u5FAE\u56DE\u7F29\uFF08Chin Tuck\uFF09",target:"\u6DF1\u5C42\u9888\u5C48\u808C\u6FC0\u6D3B\uFF0C\u5BF9\u6297\u5934\u524D\u503E\u4E0E\u540E\u9888\u6795\u4E0B\u808C\u52B3\u635F",duration:"\u6BCF\u6B21\u575A\u63015\u79D2\uFF0C\u91CD\u590D10\u6B21",steps:"\u8EAB\u4F53\u5750\u76F4\uFF0C\u53CC\u773C\u5E73\u89C6\u524D\u65B9\uFF0C\u98DF\u6307\u8F7B\u89E6\u4E0B\u5DF4\uFF0C\u5C06\u4E0B\u5DF4\u6C34\u5E73\u5411\u540E\u63A8\u505A\u5FAE\u7F29\u52A8\u4F5C\uFF08\u6324\u51FA\u53CC\u4E0B\u5DF4\u611F\uFF09\uFF0C\u611F\u53D7\u9888\u540E\u4FA7\u62C9\u4F38\u4E0E\u524D\u4FA7\u6DF1\u5C42\u53D1\u529B\uFF0C\u5207\u5FCC\u4F4E\u5934\u3002",scenario:"\u770B\u8BBA\u6587\u6216\u6572\u4EE3\u7801\u6BCF\u6EE145\u5206\u949F\uFF0C\u5728\u6905\u5B50\u4E0A\u7ACB\u5373\u5B8C\u6210\u3002"},{id:"door_stretch",name:"\u80F8\u5927\u808C\u95E8\u6846/\u6905\u80CC\u62C9\u4F38",target:"\u7F13\u89E3\u542B\u80F8\u9A7C\u80CC\uFF0C\u91CA\u653E\u7FBD\u6BDB\u7403\u6740\u7403\u80A9\u5173\u8282\u5185\u65CB\u538B\u529B",duration:"\u6BCF\u4FA7\u4FDD\u630120~30\u79D2\uFF0C\u505A2\u7EC4",steps:"\u7AD9\u7ACB\u4E8E\u95E8\u6846\u6216\u5B9E\u9A8C\u5BA4\u8FC7\u9053\uFF0C\u624B\u81C2\u5C48\u809890\u5EA6\u642D\u5728\u95E8\u6846\u4E0A\uFF0C\u8EAF\u5E72\u91CD\u5FC3\u7F13\u6162\u524D\u79FB\uFF0C\u76F4\u81F3\u80F8\u524D\u5927\u808C\u7FA4\u4EA7\u751F\u660E\u663E\u7275\u62C9\u611F\uFF0C\u6DF1\u547C\u5438\u4FDD\u6301\u3002",scenario:"\u53BB\u536B\u751F\u95F4\u63A5\u6C34\u6216\u6253\u5370\u6587\u732E\u9014\u4E2D\u8FDB\u884C\u3002"},{id:"wall_angels",name:"\u8D34\u5899W-Y\u4F38\u5C55\uFF08Wall Angels\uFF09",target:"\u6FC0\u6D3B\u4E2D\u4E0B\u659C\u65B9\u808C\u4E0E\u83F1\u5F62\u808C\uFF0C\u590D\u4F4D\u80A9\u80DB\u9AA8",duration:"\u7F13\u6162\u4E0A\u4E0B\u6ED1\u52A812~15\u6B21\uFF0C\u505A2\u7EC4",steps:"\u540E\u8111\u52FA\u3001\u4E0A\u80CC\u90E8\u3001\u81C0\u90E8\u7D27\u8D34\u5899\u9762\uFF0C\u53CC\u81C2\u5448W\u5B57\u7D27\u8D34\u5899\u58C1\uFF0C\u4FDD\u6301\u8D34\u5408\u7F13\u6162\u5411\u4E0A\u63A8\u81F3Y\u5B57\uFF0C\u9876\u70B9\u7A0D\u4F5C\u505C\u987F\uFF0C\u5168\u7A0B\u8170\u90E8\u4E0D\u4EE3\u507F\u8FC7\u5EA6\u53CD\u5F13\u3002",scenario:"\u5348\u4F11\u9192\u540E\u6216\u508D\u665A\u5B9E\u9A8C\u95F4\u9699\uFF0C\u5524\u9192\u80CC\u90E8\u808C\u7FA4\u3002"},{id:"hip_flexor",name:"\u9AA8\u76C6\u4E0E\u9AC2\u8170\u808C\u5F13\u6B65\u4F38\u5C55",target:"\u6D88\u89E3\u957F\u65F6\u95F4\u6DF1\u5750\u5F15\u8D77\u7684\u9AA8\u76C6\u524D\u503E\u4E0E\u8DD1\u6B65/\u8DE8\u6B65\u4E0B\u80CC\u90E8\u9178\u80C0",duration:"\u6BCF\u4FA7\u5355\u817F\u8DEA\u59FF\u4FDD\u630130\u79D2\uFF0C\u54042\u7EC4",steps:"\u5355\u819D\u8DEA\u5730\u5448\u5927\u5F13\u6B65\uFF0C\u6536\u7D27\u540E\u817F\u81C0\u5927\u808C\uFF0C\u91CD\u5FC3\u5411\u524D\u4E0B\u65B9\u5E73\u79FB\uFF0C\u611F\u53D7\u8179\u80A1\u6C9F\u5927\u817F\u524D\u4E0A\u65B9\u6709\u6DF1\u5C42\u7275\u62C9\u611F\uFF0C\u7EF4\u6301\u810A\u67F1\u4E2D\u7ACB\u4E0D\u6B6A\u659C\u3002",scenario:"\u665A\u4E0A\u56DE\u5BBF\u820D\u6D17\u6F31\u540E\uFF0C\u5728\u745C\u4F3D\u57AB\u6216\u5E8A\u8FB9\u8FDB\u884C\u3002"}],be=[{day:"\u5468\u4E00",badge:"\u6297\u963B\u529B\u91CF",theme:"\u529B\u91CF\u5065\u8EABA\uFF08\u4E0A\u80A2\u63A8\u62C9 + \u9762\u62C9\u62A4\u80A9\u8896 + \u6838\u5FC3\u6297\u65CB\u8F6C\uFF09",type:"\u529B\u91CF\u5065\u8EAB",content:"\u54D1\u94C3/\u80CC\u5305\u4FEF\u5367\u649115\u6B21\xD74\u7EC4 + \u5750\u59FF\u5F39\u529B\u5E26\u5212\u823915\u6B21\xD74\u7EC4 + \u9762\u62C9\uFF08Face Pull\uFF0C\u5F3A\u6548\u4FDD\u62A4\u80A9\u8896\u5C0F\u5706\u808C\uFF0915\u6B21\xD74\u7EC4 + \u6B7B\u866B\u5F0F\u6838\u5FC320\u6B21\xD73\u7EC4\u3002\u4E3A\u5468\u672B\u7FBD\u6BDB\u7403\u5927\u529B\u6263\u6740\u6253\u7262\u80A9\u80DB\u57FA\u5E95\u3002",duration:"35~40\u5206\u949F",tips:"\u91CD\u70B9\u7EC3\u80CC\u4E0E\u80A9\u8896\u5916\u65CB\u808C\u7FA4\uFF0C\u5E73\u8861\u65E5\u5E38\u542B\u80F8\u4E0E\u6253\u7403\u5355\u4FA7\u7528\u529B\u4E0D\u5E73\u8861\u3002"},{day:"\u5468\u4E8C",badge:"\u4F4E\u5FC3\u7387\u6709\u6C27",theme:"\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD14\u516C\u91CC\uFF08Zone 2\u5FC3\u80BA\uFF09",type:"\u8DD1\u6B65\u5FC3\u80BA",content:"\u508D\u665A\u6216\u5B9E\u9A8C\u7ED3\u675F\u540E\uFF0C\u64CD\u573A\u6162\u8DD14\u516C\u91CC\uFF08\u914D\u901F\u8F7B\u677E\uFF0C\u5FC3\u7387\u7EF4\u6301\u5728130~145\u6B21/\u5206\uFF0C\u5FAE\u5598\u4F46\u80FD\u8FDE\u7EED\u8BF4\u5B8C\u6574\u53E5\u5B50\uFF09\u3002\u4FC3\u8FDB\u8840\u6DB2\u643A\u6C27\uFF0C\u6392\u51FA\u4EE3\u8C22\u5E9F\u7269\uFF0C\u4E0D\u7ED9\u4E2D\u67A2\u795E\u7ECF\u7CFB\u7EDF\u65BD\u52A0\u538B\u529B\u3002",duration:"25~30\u5206\u949F",tips:"\u6B65\u9891\u4FDD\u6301\u5728175~180\u6B65/\u5206\uFF0C\u5168\u811A\u638C\u5E73\u7A33\u6EDA\u52A8\u7740\u5730\uFF0C\u51CF\u8F7B\u819D\u8E1D\u51B2\u51FB\u3002"},{day:"\u5468\u4E09",badge:"\u4E0B\u80A2\u7A33\u5B9A\u6027",theme:"\u529B\u91CF\u5065\u8EABB\uFF08\u4E0B\u80A2\u5355\u4FA7\u529B\u91CF + \u8E1D\u8DDF\u8171\u5F39\u6027 + \u6838\u5FC3\uFF09",type:"\u529B\u91CF\u5065\u8EAB",content:"\u4FDD\u52A0\u5229\u4E9A\u5206\u817F\u8E72\u6BCF\u4FA712\u6B21\xD73\u7EC4 + \u5355\u817F\u7F57\u9A6C\u5C3C\u4E9A\u786C\u62C9\uFF08RDL\uFF0912\u6B21\xD73\u7EC4 + \u5F92\u624B\u63D0\u8E35\uFF08\u5F3A\u5316\u8E1D\u5173\u8282\u4E0E\u8DDF\u8171\u5F39\u6027\u521A\u6027\uFF0920\u6B21\xD74\u7EC4 + \u5E73\u677F\u652F\u649160\u79D2\xD73\u7EC4\u3002\u5F3A\u5316\u7FBD\u6BDB\u7403\u5F13\u6B65\u4E0A\u7F51\u5239\u8F66\u4E0E\u542F\u52A8\u7206\u53D1\u529B\u3002",duration:"30~35\u5206\u949F",tips:"\u5355\u4FA7\u4E0B\u80A2\u8BAD\u7EC3\u80FD\u6709\u6548\u7EA0\u6B63\u7FBD\u6BDB\u7403\u8E6C\u8DE8\u6B65\u5E26\u6765\u7684\u5DE6\u53F3\u817F\u808C\u529B\u5931\u8861\u3002"},{day:"\u5468\u56DB",badge:"\u6062\u590D\u6027\u6709\u6C27",theme:"\u64CD\u573A\u4F4E\u5FC3\u7387\u6162\u8DD14\u516C\u91CC\uFF08Zone 2\u5FC3\u80BA\uFF09",type:"\u8DD1\u6B65\u5FC3\u80BA",content:"\u64CD\u573A\u5E73\u7A33\u6162\u8DD14\u516C\u91CC\uFF0C\u7EF4\u6301\u6B65\u9891180\uFF0C\u5168\u811A\u638C\u6EDA\u52A8\u7740\u5730\u3002\u5FAE\u5598\u80FD\u4EA4\u8C08\uFF0C\u8DD1\u540E\u5C0F\u53E3\u8865\u5145\u6E29\u5F00\u6C34\u3002",duration:"25~30\u5206\u949F",tips:"\u91CD\u5FC3\u5FAE\u5FAE\u524D\u503E\uFF0C\u624B\u81C2\u81EA\u7136\u524D\u540E\u6446\u52A8\uFF0C\u4E0D\u8981\u5DE6\u53F3\u6643\u52A8\uFF0C\u8DD1\u5B8C\u505A\u5C0F\u817F\u62C9\u4F38\u3002"},{day:"\u5468\u4E94",badge:"\u7EFC\u5408\u529F\u80FD\u6027",theme:"\u529B\u91CF\u5065\u8EABC\uFF08\u5168\u8EAB\u7EFC\u5408\u529F\u80FD\u6027\u6297\u963B + \u6838\u5FC3\u6297\u65CB\u8F6C\uFF09",type:"\u529B\u91CF\u5065\u8EAB",content:"\u4FEF\u5367\u6491\u8FDB\u9636\xD74\u7EC4 + \u5F39\u529B\u5E26\u9762\u62C9\xD74\u7EC4 + \u4FC4\u7F57\u65AF\u8F6C\u4F53/\u6B7B\u866B\u5F0F\xD73\u7EC4\u3002\u5DE9\u56FA\u4E0A\u80A2\u80A9\u80CC\u4E0E\u6838\u5FC3\u7A33\u5B9A\u6027\uFF0C\u5145\u6C9B\u4F53\u80FD\u8FCE\u63A5\u5468\u672B\u7FBD\u6BDB\u7403\u5BF9\u5C40\u3002",duration:"30~35\u5206\u949F",tips:"\u5168\u7A0B\u6536\u7D27\u8179\u6A2A\u808C\uFF0C\u4FDD\u62A4\u8170\u690E\u4E2D\u7ACB\u3002"},{day:"\u5468\u516D",badge:"\u70ED\u7231\u91CA\u653E",theme:"\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u7403\u5B9E\u6218\u5BF9\u629790\u5206\u949F\uFF08\u591A\u5DF4\u80FA\u72C2\u98D9\uFF09",type:"\u7FBD\u6BDB\u7403\u7231\u597D",content:"\u9AD8\u6821\u7403\u9986\u7FBD\u6BDB\u7403\u5355\u6253/\u53CC\u6253\u5BF9\u6218\u3002\u5305\u542B7\u5206\u949F\u52A8\u6001\u70ED\u8EAB\u62C9\u4F38\u300115\u5206\u949F\u524D\u540E\u573A\u591A\u7403\u8FDE\u8D2F\u70ED\u8EAB\u300160\u591A\u5206\u949F\u6218\u672F\u6BD4\u8D5B\u5BF9\u5C40\u3002\u9AD8\u591A\u5DF4\u80FA\u91CA\u653E\uFF0C\u5F7B\u5E95\u51B2\u5237\u5168\u5468\u5B66\u672F\u538B\u529B\u3002",duration:"90\u5206\u949F",tips:"\u5FC5\u987B\u7A7F\u4E13\u4E1A\u751F\u80F6\u5E95\u7FBD\u6BDB\u7403\u978B\uFF01\u4E25\u7981\u7A7F\u6162\u8DD1\u978B\uFF08\u6781\u6613\u5D34\u811A\uFF09\u3002\u6253\u5B8C\u540E\u53CA\u65F6\u6362\u5E72\u8863\u670D\u9632\u611F\u5192\u3002"},{day:"\u5468\u65E5",badge:"\u8EAB\u5FC3\u91CD\u542F",theme:"\u5468\u672B\u7FBD\u7403\u5207\u78CB \u6216 \u6237\u5916\u9633\u5149\u6F2B\u6E38\u6392\u9178\uFF08\u4E8C\u9009\u4E00\uFF09",type:"\u7403\u7C7B/\u6237\u5916",content:"\u65B9\u6848A\uFF1A\u7EA6\u7403\u53CB\u6253\u7FBD\u7403\u53CC\u6253\u8DA3\u5473\u5C4060~90\u5206\u949F\uFF1B\u65B9\u6848B\uFF1A\u53BB\u6821\u56ED\u6797\u9053\u6216\u9644\u8FD1\u516C\u56ED\u6162\u8DD13\u516C\u91CC/\u9A91\u884C40\u5206\u949F\uFF0C\u6C90\u6D74\u9633\u5149\u5408\u6210\u7EF4\u751F\u7D20D\u3002\u4E2D\u5348\u4EAB\u53D7\u8BA1\u5212\u5185\u653E\u7EB5\u9910\uFF0C\u8EAB\u5FC3\u5F7B\u5E95\u5F52\u96F6\u3002",duration:"45~60\u5206\u949F",tips:"\u4EAB\u53D7\u8FD0\u52A8\u672C\u8EAB\u5E26\u6765\u7684\u7EAF\u7CB9\u6109\u60A6\uFF0C\u653E\u4E0B\u6587\u732E\u4E0E\u4EE3\u7801\u3002"}],q={title:"\u7814\u7A76\u751F\u7FBD\u6BDB\u7403\u5B9E\u64CD\u907F\u5751\u4E0E\u9632\u4F24\u62A4\u822A\u5B88\u5219",warmup:[{step:"\u8E1D\u8155\u73AF\u8F6C\u4E0E\u63D0\u8E35",time:"2\u5206\u949F",desc:"\u53CC\u811A\u4EA4\u66FF\u8E1D\u5173\u8282\u753B\u5708\uFF0C\u5355\u811A\u5FAE\u63D0\u8E35\uFF0C\u6FC0\u6D3B\u8DDF\u8171\u97E7\u5E26\u5F39\u6027\u3002"},{step:"\u4FA7\u6ED1\u6B65\u4E0E\u4EA4\u53C9\u8DE8\u6B65",time:"3\u5206\u949F",desc:"\u5728\u7FBD\u6BDB\u7403\u534A\u573A\u505A\u5DE6\u53F3\u4FA7\u6ED1\u6B65\u4E0E\u5E95\u7EBF\u540E\u9000\u6B65\uFF0C\u9884\u70ED\u8179\u80A1\u6C9F\u4E0E\u819D\u5173\u8282\u6ED1\u6DB2\u3002"},{step:"\u7A7A\u62CD\u80A9\u8896\u6325\u81C2\u7ED5\u73AF",time:"2\u5206\u949F",desc:"\u6301\u62CD\u5C0F\u5E45\u5EA6\u6B63\u53CD\u624B\u7ED5\u73AF\uFF0C\u505A\u7531\u6162\u5230\u5FEB\u7684\u8F7B\u91CF\u5F15\u62CD\u52A8\u4F5C\uFF0C\u5207\u5FCC\u4E0A\u6765\u5C31\u5168\u529B\u5927\u529B\u6263\u6740\u3002"}],gearRules:["\u978B\u5B50\u94C1\u5F8B\uFF1A\u7EDD\u5BF9\u7981\u6B62\u7A7F\u8DD1\u6B65\u978B\u4E0A\u7FBD\u6BDB\u7403\u6728\u5730\u677F\u6216\u5851\u80F6\u573A\uFF01\u8DD1\u6B65\u978B\u5E95\u539A\u4E14\u8FB9\u7F18\u65E0\u4FA7\u5411\u9632\u4FA7\u7FFB\u89D2\uFF0C\u6025\u505C\u53D8\u5411\u5D34\u811A\u7387\u9AD8\u8FBE80%\uFF1B\u5FC5\u987B\u914D\u5907\u4E13\u7528\u7FBD\u6BDB\u7403\u978B\u3002","\u889C\u5B50\u9009\u62E9\uFF1A\u7A7F\u52A0\u539A\u6BDB\u5DFE\u5E95\u4E13\u4E1A\u8FD0\u52A8\u889C\uFF0C\u7D27\u9501\u8DB3\u5E95\u9632\u6ED1\uFF0C\u6781\u5927\u51CF\u5C11\u811A\u8DBE\u9876\u978B\u53D1\u9ED1\u4E0E\u8DB3\u5E95\u8D77\u6C34\u6CE1\u3002","\u62A4\u5177\u51C6\u5907\uFF1A\u82E5\u6253\u9AD8\u5F3A\u5EA6\u5BF9\u6297\uFF0C\u5907\u597D\u62A4\u819D\uFF08\u9ACC\u9AA8\u5E26\uFF09\u4E0E\u624B\u8155\u62A4\u8155\uFF0C\u63D0\u4F9B\u5173\u8282\u77AC\u65F6\u6324\u538B\u652F\u6491\u3002"],cooldown:"\u6253\u7403\u7ED3\u675F\u540E\u7EDD\u4E0D\u80FD\u7ACB\u5373\u5750\u4E0B\u5439\u7A7A\u8C03\uFF01\u5FC5\u987B\u6162\u8D703\u5206\u949F\uFF0C\u9488\u5BF9\u6301\u62CD\u4FA7\u5C0F\u81C2\u3001\u5927\u817F\u524D\u4FA7\uFF08\u80A1\u56DB\u5934\u808C\uFF09\u8FDB\u884C30\u79D2\u9759\u6001\u7275\u62C9\uFF0C\u5E76\u53CA\u65F6\u6362\u6389\u6E7F\u900F\u7684T\u6064\u3002"},J={title:"\u7814\u7A76\u751F\u64CD\u573A\u4F4E\u5FC3\u7387\uFF08Zone 2\uFF09\u957F\u6548\u8DD1\u6B65\u6CD5",principles:["\u5FC3\u7387\u9776\u533A\u63A7\u5236\uFF1A\u5FC3\u7387\u4FDD\u6301\u5728 (220 - \u5E74\u9F84) \xD7 65%~75% \u4E4B\u95F4\uFF08\u7EA6130~145\u6B21/\u5206\uFF09\uFF0C\u4EE5\u6709\u6C27\u6C27\u5316\u4E3A\u4E3B\uFF0C\u4E0D\u5806\u79EF\u4E73\u9178\uFF0C\u8DD1\u5B8C\u795E\u6E05\u6C14\u723D\u4E0D\u5F71\u54CD\u6539\u8BBA\u6587\u3002","\u9AD8\u6B65\u9891\u4F4E\u5782\u76F4\u632F\u5E45\uFF1A\u4FDD\u6301175~180\u6B65/\u5206\u7684\u5C0F\u6B65\u5FEB\u9891\u8DD1\u6CD5\uFF0C\u843D\u5730\u70B9\u5728\u8EAB\u4F53\u91CD\u5FC3\u6B63\u4E0B\u65B9\uFF0C\u819D\u76D6\u5FAE\u5C48\u7F13\u51B2\uFF0C\u5F7B\u5E95\u6D88\u9664\u811A\u540E\u8DDF\u731B\u7838\u5730\u9762\u5BF9\u534A\u6708\u677F\u7684\u51B2\u51FB\u3002","\u573A\u5730\u9009\u62E9\uFF1A\u4F18\u5148\u9009\u62E9\u9AD8\u6821\u6807\u51C6400\u7C73\u5851\u80F6\u8DD1\u9053\uFF0C\u6BCF\u8DD11~2\u516C\u91CC\u9002\u5EA6\u8C03\u6362\u65B9\u5411\uFF0C\u5E73\u8861\u5185\u5708\u4FA7\u811A\u8E1D\u503E\u89D2\u3002"]};var xe=[{time:"7:00~7:30",stage:"\u65E9\u8D77\u5524\u9192\u4E0E\u6668\u5149\u951A\u5B9A",actions:"\u8D77\u5E8A\u540E\u7ACB\u5373\u62C9\u5F00\u7A97\u5E18\uFF0C\u63A5\u89E6\u6668\u95F4\u81EA\u7136\u51495~10\u5206\u949F\u4EE5\u6821\u51C6\u89C6\u4EA4\u53C9\u4E0A\u6838\u663C\u591C\u8282\u5F8B\uFF1B\u996E\u7528\u6E29\u5F00\u6C34300ml\u5524\u9192\u80C3\u80A0\u9053\u8815\u52A8\u3002",tag:"\u8282\u5F8B\u951A\u5B9A"},{time:"7:30~8:30",stage:"\u8425\u517B\u9AD8\u86CB\u767D\u65E9\u9910",actions:"\u6267\u884C\u6807\u914D\u9AD8\u86CB\u767D\u63A7\u7CD6\u65E9\u9910\uFF08\u9ED1\u9EA6\u9762\u5305+\u725B\u5976/\u8C46\u6D46+2\u6C34\u716E\u86CB\uFF09\uFF0C\u5E73\u7A33\u8840\u7CD6\u4E0D\u72AF\u56F0\uFF0C\u7CBE\u795E\u5145\u6C9B\u8FC8\u5411\u5B9E\u9A8C\u5BA4/\u5DE5\u4F4D\u3002",tag:"\u8425\u517B\u542F\u52A8"},{time:"8:30~11:30",stage:"\u4E0A\u5348\u9AD8\u4EF7\u503C\u79D1\u7814\u6DF1\u5EA6\u5DE5\u4F5C\u533A",actions:"\u76AE\u8D28\u9187\u4E0E\u8B66\u89C9\u5EA6\u5904\u4E8E\u5168\u5929\u5CF0\u503C\uFF0C\u7528\u4E8E\u64B0\u5199\u8BBA\u6587\u96BE\u70B9\u7AE0\u8282\u3001\u63A8\u5BFC\u6570\u5B66\u6A21\u578B\u3001\u6784\u601D\u5B9E\u9A8C\u65B9\u6848\u7B49\u9AD8\u8BA4\u77E5\u5F00\u9500\u4EFB\u52A1\uFF1B\u4E2D\u95F410:00\u6267\u884C\u575A\u679C\u52A0\u9910+\u9888\u690E\u4E0B\u988C\u5FAE\u56DE\u7F29\u3002",tag:"\u6DF1\u5EA6\u4E13\u6CE8"},{time:"11:30~12:30",stage:"\u7A33\u6001\u63A7\u6CB9\u5348\u9910",actions:"\u63091\u62F3\u7C73\u996D+2\u4EFD\u4F4E\u6CB9\u852C\u83DC+\u81EA\u5E26\u9AD8\u86CB\u767D\u7528\u9910\uFF0C\u996D\u540E\u6162\u6B65\u8D70500\u7C73\uFF0C\u4E25\u7981\u7ACB\u5373\u4F0F\u6848\u5348\u7761\u3002",tag:"\u6297\u708E\u63A7\u7CD6"},{time:"12:45~13:15",stage:"\u9EC4\u91D1\u5FAE\u5348\u4F11\uFF08Power Nap\uFF09",actions:"\u4F69\u6234\u906E\u5149\u773C\u7F69\u9759\u536720~25\u5206\u949F\uFF0C\u7EDD\u5BF9\u4E0D\u8981\u8D85\u8FC730\u5206\u949F\uFF08\u9632\u6B62\u8FDB\u5165\u6DF1\u7761\u7720\u671F\u5BFC\u81F4\u9192\u540E\u7761\u7720\u60EF\u6027\u5934\u6655\u6C89\u91CD\uFF09\u3002",tag:"\u795E\u7ECF\u5145\u80FD"},{time:"13:30~17:30",stage:"\u4E0B\u5348\u4EE3\u7801\u4E0E\u5B9E\u9A8C\u5B9E\u64CD\u533A",actions:"\u9002\u5408\u6267\u884C\u7F16\u7A0B\u8C03\u8BD5\u3001\u6570\u636E\u6E05\u6D17\u3001\u4EEA\u5668\u6D4B\u8BD5\u7B49\u8FDE\u7EED\u6027\u64CD\u4F5C\uFF1B\u6BCF45\u5206\u949F\u8D77\u8EAB\u63A5\u6C34\u4E00\u6B21\uFF0C\u6267\u884C\u4E00\u6B21\u80F8\u80CC\u62C9\u4F38\u3002",tag:"\u6301\u7EED\u4EA7\u51FA"},{time:"17:30~18:30",stage:"\u665A\u9910\u4E0E\u5FC3\u7406\u8FC7\u6E21",actions:"\u7EA2\u85AF/\u7389\u7C73+\u9E21\u80F8\u8089+\u9EC4\u74DC\uFF0C\u6E05\u6DE1\u5C11\u6CB9\uFF0C\u8BA9\u75B2\u52B3\u7684\u4EA4\u611F\u795E\u7ECF\u5411\u526F\u4EA4\u611F\u795E\u7ECF\u6E10\u8FDB\u5E73\u7A33\u5207\u6362\u3002",tag:"\u4EE3\u8C22\u7EF4\u7A33"},{time:"19:00~20:00",stage:"\u665A\u95F4\u6297\u963B\u953B\u70BC\u6216\u6162\u8DD1",actions:"\u6267\u884C\u4ECA\u65E5\u4F53\u80FD\u8BAD\u7EC3\u8BA1\u5212\uFF0830~40\u5206\u949F\uFF09\uFF0C\u51FA\u6C57\u6392\u89E3\u5168\u5929\u5B66\u672F\u632B\u6298\u611F\uFF0C\u6FC0\u6D3B\u5185\u5561\u80BD\u3002",tag:"\u4F53\u80FD\u91CD\u5851"},{time:"20:30~22:30",stage:"\u6587\u732E\u7CBE\u8BFB\u6216\u81EA\u7531\u6574\u7406",actions:"\u68B3\u7406\u660E\u65E5\u5F85\u529E\u4EFB\u52A1\u6E05\u5355\uFF08To-do list\uFF09\uFF0C\u907F\u514D\u7761\u524D\u5728\u8111\u4E2D\u76D8\u65CB\u672A\u7ADF\u5B9E\u9A8C\u5BFC\u81F4\u7126\u8651\u5931\u7720\uFF1B21:00\u540E\u505C\u6B62\u6444\u5165\u56FA\u4F53\u98DF\u7269\u3002",tag:"\u95ED\u73AF\u6574\u7406"},{time:"22:30~23:15",stage:"\u7761\u524D\u6570\u5B57\u6392\u6BD2\u4E0E\u964D\u6E29\u7A0B\u5E8F",actions:"\u79BB\u5F00\u5B9E\u9A8C\u5BA4\u56DE\u5BBF\u820D\uFF0C\u624B\u673A\u5207\u6362\u52FF\u6270\u6A21\u5F0F\u5E76\u8FDC\u79BB\u5E8A\u5934\uFF1B\u6E29\u6C34\u6DCB\u6D74\u4FC3\u4F7F\u5916\u5468\u8840\u7BA1\u8212\u5F20\u3001\u6838\u5FC3\u4F53\u6E29\u968F\u540E\u81EA\u7136\u4E0B\u964D\u8BF1\u53D1\u7761\u610F\u3002",tag:"\u7761\u7720\u51C6\u5907"},{time:"23:30",stage:"\u7184\u706F\u5165\u7720\uFF08\u4FDD\u8BC17~7.5\u5C0F\u65F6\u7761\u7720\uFF09",actions:"\u630990\u5206\u949F\u7761\u7720\u5468\u671F\u8BA1\u7B97\uFF087.5\u5C0F\u65F6\u6B63\u597D\u662F5\u4E2A\u5B8C\u6574\u5468\u671F\uFF09\uFF0C\u4F69\u6234\u9694\u97F3\u8033\u585E\u4E0E\u5168\u906E\u5149\u773C\u7F69\uFF0C\u51C6\u65F6\u5165\u7720\u3002",tag:"\u6DF1\u5EA6\u4FEE\u590D"}],pe=[{time:"07:15",title:"\u6668\u8D77\u6E29\u6C34",amount:300,desc:"\u8865\u5145\u591C\u95F4\u547C\u5438\u6C34\u5206\u635F\u8017\uFF0C\u6FC0\u6D3B\u80BE\u810F\u4E0E\u80C3\u80A0\u4EE3\u8C22\u3002"},{time:"09:30",title:"\u4E0A\u5348\u4E13\u6CE8\u6C34",amount:350,desc:"\u5DE5\u4F4D\u7B2C1\u676F\uFF0C\u63D0\u632F\u8111\u90E8\u4F9B\u6C27\uFF0C\u7EF4\u6301\u8BA4\u77E5\u654F\u9510\u3002"},{time:"11:00",title:"\u5348\u9910\u524D\u63A7\u80C3\u6C34",amount:250,desc:"\u9910\u524D20\u5206\u949F\u5FAE\u91CF\u996E\u6C34\uFF0C\u589E\u5F3A\u9971\u8179\u611F\uFF0C\u6DA6\u6ED1\u6D88\u5316\u9053\u3002"},{time:"14:15",title:"\u4E0B\u5348\u5524\u9192\u6C34",amount:350,desc:"\u5348\u4F11\u9192\u540E\u4EE3\u8C22\u63D0\u795E\uFF0C\u51B2\u8D70\u5026\u610F\u3002"},{time:"16:30",title:"\u508D\u665A\u6392\u9178\u6C34",amount:350,desc:"\u9A71\u6563\u4E0B\u5348\u5B9E\u9A8C\u75B2\u60EB\uFF0C\u4FC3\u8FDB\u5C3F\u9178\u4E0E\u808C\u9150\u6392\u51FA\u3002"},{time:"19:30",title:"\u8FD0\u52A8\u8865\u7ED9\u6C34",amount:400,desc:"\u8FD0\u52A8\u524D\u4E2D\u540E\u5C0F\u53E3\u591A\u6B21\u6162\u996E\uFF0C\u8865\u5145\u6C57\u6DB2\u6D41\u5931\u7535\u89E3\u8D28\u3002"},{time:"21:30",title:"\u7761\u524D\u6DA6\u5589\u6C34",amount:150,desc:"\u7761\u524D1\u5C0F\u65F6\u5FAE\u91CF\u6DA6\u53E3\uFF0C\u4E25\u7981\u8FC7\u91CF\u4EE5\u9632\u591C\u5C3F\u9891\u7E41\u6253\u65AD\u6DF1\u7761\u7720\u3002"}],me=[{rule:"\u951A\u5B9A\u6668\u8D77\u8D77\u5E8A\u65F6\u95F4",detail:"\u65E0\u8BBA\u524D\u4E00\u665A\u51E0\u70B9\u7761\uFF0C\u65E9\u8D77\u65F6\u95F4\u6CE2\u52A8\u4E0D\u5B9C\u8D85\u8FC745\u5206\u949F\uFF0C\u8282\u5F8B\u4E3B\u8981\u9760\u8D77\u5E8A\u5149\u7167\u6821\u51C6\u800C\u975E\u5165\u7761\u65F6\u95F4\u3002"},{rule:"\u7269\u7406\u9694\u7EDD\u6697\u9ED1\u51B7\u9759\u73AF\u5883",detail:"\u5BBF\u820D\u5149\u7EBF\u4E0E\u5BA4\u53CB\u58F0\u54CD\u96BE\u4EE5\u63A7\u5236\uFF0C\u6807\u914D3M\u6162\u56DE\u5F39\u8033\u585E\u4E0E3D\u51F9\u69FD\u771F\u4E1D\u773C\u7F69\uFF0C\u8425\u9020\u79C1\u4EBA\u7761\u7720\u5FAE\u80F6\u56CA\u3002"},{rule:"\u5EFA\u7ACB\u5E8A\u4E0E\u7761\u7720\u7684\u5F3A\u6761\u4EF6\u53CD\u5C04",detail:"\u5E8A\u53EA\u7528\u4E8E\u7761\u89C9\uFF0C\u4E25\u7981\u9760\u5728\u5E8A\u4E0A\u5199\u8BBA\u6587\u3001\u6539PPT\u6216\u5237\u77ED\u89C6\u9891\u3002\u82E5\u8EBA\u4E0B25\u5206\u949F\u6BEB\u65E0\u56F0\u610F\uFF0C\u5FC5\u987B\u8D77\u8EAB\u5728\u6697\u5149\u4E0B\u770B\u5E72\u762A\u4E66\u7C4D\u76F4\u81F3\u54C8\u6B20\u8FDE\u5929\u518D\u56DE\u5E8A\u3002"},{rule:"\u5496\u5561\u56E0\u534A\u8870\u671F\u7EA2\u7EBF",detail:"\u5496\u5561\u56E0\u534A\u8870\u671F\u957F\u8FBE5~7\u5C0F\u65F6\uFF0C\u6BCF\u65E5\u6700\u540E\u4E00\u676F\u5496\u5561\u6216\u6D53\u8336\u5FC5\u987B\u622A\u65AD\u572814:00\u4E4B\u524D\u3002"}];var ue=[{id:"mentor_communication",title:"\u5BFC\u5E08\u53CD\u9988\u60C5\u7EEA\u8131\u654F\uFF08\u4E8B\u5B9E\u4E0E\u60C5\u7EEA\u89E3\u8026\uFF09",scenario:"\u6536\u5230\u5BFC\u5E08\u4E25\u5389\u6279\u8BC4\u3001\u6279\u6CE8\u6EE1\u5C4F\u901A\u7EA2\u6216\u5FAE\u4FE1\u50AC\u8FDB\u5EA6\u65F6\u5FC3\u8DF3\u52A0\u901F\u3001\u624B\u5FC3\u5192\u6C57",protocol:["\u751F\u7406\u5239\u8F66\uFF1A\u4E0D\u8981\u7ACB\u5373\u56DE\u590D\uFF01\u7ACB\u523B\u63A8\u5F00\u952E\u76D8\uFF0C\u8FDB\u884C3\u6B21\u6DF1\u957F\u7684\u751F\u7406\u6027\u53F9\u606F\u547C\u5438\uFF08\u53CC\u5438\u5355\u547C\uFF09\uFF0C\u5E73\u606F\u674F\u4EC1\u6838\u52AB\u6301\u3002","\u4FE1\u606F\u63D0\u53D6\u8F6C\u6362\uFF1A\u62FF\u4E00\u5F20\u767D\u7EB8\uFF0C\u5DE6\u8FB9\u5217'\u5BA2\u89C2\u5B66\u672F\u4E8B\u5B9E\u4E0E\u4FEE\u6539\u70B9'\uFF0C\u53F3\u8FB9\u5217'\u60C5\u7EEA\u5316\u8BED\u6C14\u8BCD'\u3002\u5C06\u53F3\u4FA7\u4E00\u7B14\u5212\u53BB\uFF0C\u4EC5\u5C06\u5DE6\u4FA7\u8F6C\u5316\u4E3A\u53EF\u6267\u884C\u7684\u4FEE\u6539Action List\u3002","\u8FB9\u754C\u611F\u5EFA\u7ACB\uFF1A\u5BFC\u5E08\u8BC4\u4EF7\u7684\u662F\u5F53\u524D\u8FD9\u7BC7\u6587\u672C\u6216\u5B9E\u9A8C\u4EE3\u7801\uFF0C\u7EDD\u975E\u5426\u5B9A\u4F60\u7684\u4EBA\u683C\u4EF7\u503C\u3002\u5B66\u672F\u8BBA\u6587\u4FEE\u6539\u51E0\u5341\u7248\u662F\u5168\u884C\u4E1A\u901A\u4F8B\u3002"],mantra:"\u60C5\u7EEA\u662F\u8FC7\u5BA2\uFF0C\u884C\u52A8\u662F\u89E3\u836F\uFF1B\u6279\u8BC4\u6307\u5411\u7684\u662F\u6587\u672C\u672C\u8EAB\uFF0C\u800C\u975E\u6211\u4E2A\u4EBA\u7684\u5B58\u5728\u4EF7\u503C\u3002"},{id:"rejection_first_aid",title:"\u8BBA\u6587\u62D2\u7A3F/\u5B9E\u9A8C\u5F52\u96F6\u6025\u6551\u5305",scenario:"\u6536\u5230\u62D2\u7A3F\u90AE\u4EF6\uFF08Reject\uFF09\u3001\u590D\u73B0\u5B9E\u9A8C\u8FDE\u7EED\u4E00\u5468\u4E0D\u51FA\u9884\u671F\u7ED3\u679C\u6216\u6570\u636E\u5F02\u5E38",protocol:["\u5141\u8BB824\u5C0F\u65F6\u60C5\u7EEA\u5783\u573E\u65F6\u95F4\uFF1A\u5F53\u5929\u505C\u6B62\u4E00\u5207\u5F3A\u8FEB\u6027\u52A0\u73ED\u6539\u7A3F\uFF0C\u53BB\u64CD\u573A\u6162\u8DD140\u5206\u949F\u6216\u6D17\u4E2A\u70ED\u6C34\u6FA1\uFF0C\u7761\u8DB38\u5C0F\u65F6\uFF0C\u4E0D\u4F5C\u4EFB\u4F55\u91CD\u5927\u51B3\u7B56\u3002","\u51B7\u542F\u52A8\u590D\u76D8\uFF1A\u7B2C2\u5929\u4EE5\u7B2C\u4E09\u65B9\u5BA1\u7A3F\u4EBA\u89C6\u89D2\u9010\u884C\u5BA1\u89C6Reviewers\u7684\u610F\u89C1\uFF0C\u901A\u5E3880%\u7684\u62D2\u7A3F\u7406\u7531\u90FD\u80FD\u76F4\u63A5\u8F6C\u5316\u4E3A\u4E0B\u4E00\u6B21\u51B2\u9876\u66F4\u5F3A\u8BBA\u636E\u7684\u5207\u5165\u70B9\u3002","\u79D1\u7814\u6982\u7387\u8BA4\u77E5\uFF1A\u9876\u7EA7\u9876\u4F1A/\u671F\u520A\u5F55\u53D6\u7387\u4EC515%~20%\uFF0C\u62D2\u7A3F\u662F\u79D1\u7814\u7684\u5E38\u6001\u7EDF\u8BA1\u5B66\u5206\u5E03\uFF0C\u6BCF\u4E00\u6B21\u4FEE\u6539\u90FD\u5728\u65E0\u9650\u903C\u8FD1\u5F55\u7528\u9608\u503C\u3002"],mantra:"\u53EA\u8981\u6CA1\u6709\u64A4\u56DE\u6295\u7A3F\uFF0C\u672A\u88AB\u63A5\u53D7\u7684\u8349\u7A3F\u5C31\u662F\u4E0B\u4E00\u7BC7\u66F4\u597D\u6587\u7AE0\u7684\u53D7\u7CBE\u5375\u3002"},{id:"burnout_prevention",title:"\u5B66\u672F\u8017\u7AED\uFF08Burnout\uFF09\u9884\u8B66\u4E0E\u91CD\u7F6E",scenario:"\u8FDE\u7EED\u591A\u65E5\u5BF9\u770B\u6587\u732E\u4EA7\u751F\u6076\u5FC3\u538C\u6076\u3001\u6CE8\u610F\u529B\u6DA3\u6563\u65E0\u6CD5\u9605\u8BFB\u8D85\u8FC71\u9875\u3001\u6668\u8D77\u611F\u5230\u65E0\u529B",protocol:["\u5FAE\u65AD\u8054\u7A97\u53E3\uFF1A\u8BBE\u7ACB\u6BCF\u5468\u65E5\u508D\u665A\u6216\u5468\u516D\u4E0B\u5348\u4E3A'\u7EDD\u5BF9\u65E0\u5B66\u672F\u65F6\u533A'\uFF0C\u4E0D\u770B\u5FAE\u4FE1\u5DE5\u4F5C\u7FA4\u3001\u4E0D\u78B0\u7535\u8111\u3002","\u4E94\u611F\u63A5\u5730\u7EC3\u4E60\uFF085-4-3-2-1 Grounding\uFF09\uFF1A\u5F53\u601D\u7EEA\u4E71\u98DE\u65F6\uFF0C\u770B\u5468\u56F45\u4EF6\u4E1C\u897F\u3001\u64784\u6837\u8D28\u611F\u7269\u4F53\u3001\u542C3\u79CD\u73AF\u5883\u58F0\u97F3\u3001\u95FB2\u79CD\u6C14\u5473\u3001\u5C1D1\u53E3\u6E05\u6C34\uFF0C\u628A\u610F\u8BC6\u62C9\u56DE\u8089\u4F53\u5F53\u4E0B\u3002","\u5FAE\u6B65\u9AA4\u542F\u52A8\uFF08Micro-stepping\uFF09\uFF1A\u9762\u5BF9\u5E9E\u5927\u8BBA\u6587\u5199\u4E0D\u4E0B\u53BB\u65F6\uFF0C\u53EA\u7ED9\u81EA\u5DF1\u5B9A\u4E00\u4E2A'\u4ECA\u5929\u53EA\u519950\u4E2A\u5B57\u6216\u53EA\u753B1\u4E2A\u6D41\u7A0B\u56FE'\u7684\u6781\u4F4E\u76EE\u6807\uFF0C\u6253\u7834\u542F\u52A8\u963B\u529B\u3002"],mantra:"\u75B2\u60EB\u65F6\u8BF7\u5B66\u4F1A\u4F11\u606F\uFF0C\u800C\u4E0D\u662F\u9009\u62E9\u653E\u5F03\u3002"}],A={name:"4-7-8 \u7ECF\u5178\u526F\u4EA4\u611F\u795E\u7ECF\u5524\u9192\u547C\u5438\u6CD5",desc:"\u901A\u8FC7\u5EF6\u957F\u547C\u6C14\u65F6\u95F4\u5E76\u914D\u5408\u5C4F\u606F\uFF0C\u76F4\u63A5\u523A\u6FC0\u8FF7\u8D70\u795E\u7ECF\uFF0C\u8FC5\u901F\u538B\u4F4E\u5FC3\u7387\u4E0E\u76AE\u8D28\u9187\u6D53\u5EA6\uFF0C\u662F\u7761\u524D\u4E0E\u7126\u8651\u65F6\u523B\u7684\u901F\u6548\u9547\u9759\u5242\u3002",phases:[{label:"\u9F3B\u8154\u7F13\u6162\u6DF1\u5438\u6C14",duration:4,tip:"\u820C\u5C16\u8F7B\u62B5\u4E0A\u95E8\u7259\u540E\u65B9\uFF0C\u5E73\u7A33\u6DF1\u5438\uFF0C\u8179\u90E8\u9686\u8D77"},{label:"\u5C4F\u6C14\u51DD\u795E\u611F\u53D7\u9759\u6B62",duration:7,tip:"\u4FDD\u6301\u80F8\u8179\u5E73\u7A33\uFF0C\u8BA9\u6C27\u6C14\u5728\u80BA\u6CE1\u5145\u5206\u4EA4\u6362"},{label:"\u53E3\u8154\u547C\u5578\u6162\u5410\u6C14",duration:8,tip:"\u53CC\u5507\u5FAE\u5F20\u53D1\u51FA\u8F7B\u5FAE\u547C\u6C14\u58F0\uFF0C\u7F13\u6162\u6392\u5C3D\u80BA\u90E8\u6B8B\u6C14"}],recommendedCycles:4};function ge(){let t=new Date().getDay(),s=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"][t];return`
    <div class="space-y-6">
      <!-- \u5934\u90E8\u8BFE\u8868\u603B\u89C8 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div class="flex items-center space-x-2">
            <span class="text-xl">\u{1F3C6}</span>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                \u7814\u7A76\u751F\u201C\u5065\u8EAB + \u8DD1\u6B65 + \u7FBD\u6BDB\u7403\u201D\u6BCF\u5468\u9EC4\u91D1\u7EDF\u7B79\u8BFE\u8868
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                2\u6B21\u6297\u963B\u5065\u8EAB\uFF08\u62A4\u80A9\u56FA\u819D\uFF09+ 2\u6B21\u4F4E\u5FC3\u7387\u8DD1\uFF08\u5237\u8102\u84C4\u80FD\uFF09+ 1~2\u6B21\u7FBD\u6BDB\u7403\uFF08\u91CA\u653E\u70ED\u7231\uFF09\u3002
              </p>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
            \u9AD8\u4EAE\u6807\u8BB0\u4E3A\u4ECA\u65E5\u63A8\u8350
          </span>
        </div>

        <!-- 7\u5929\u5468\u671F\u6A2A\u5411/\u6805\u683C\u5206\u5E03 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          ${be.map(r=>{let a=r.day===s;return`
              <div class="p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${a?"bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400/40 shadow-sm":"bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700"}">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-xs sm:text-sm font-black ${a?"text-amber-900 dark:text-amber-300":"text-slate-800 dark:text-slate-100"}">${r.day}</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-extrabold ${a?"bg-amber-400 text-amber-950":"bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}">${r.badge}</span>
                  </div>
                  <div class="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">${r.type}</div>
                  <div class="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 leading-snug">${r.theme.split("\uFF08")[0]}</div>
                  <p class="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2">${r.content}</p>
                </div>
                <div>
                  <div class="text-[10px] text-amber-800 dark:text-amber-300/90 bg-amber-100/50 dark:bg-amber-900/20 p-1.5 rounded-lg mb-2">
                    \u{1F4A1} ${r.tips}
                  </div>
                  <div class="text-[10px] text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 pt-1.5 flex justify-between">
                    <span>\u65F6\u957F\uFF1A</span>
                    <span class="font-bold text-slate-700 dark:text-slate-300">${r.duration}</span>
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>

      <!-- \u7FBD\u6BDB\u7403\u7231\u597D\u8005\u4E13\u5C5E\u62A4\u822A\u6307\u5357 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl">\u{1F3F8}</span>
          <h4 class="text-base font-bold text-slate-800 dark:text-slate-100">${q.title}</h4>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- \u70ED\u8EAB\u6D41\u7A0B -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
              <span>\u{1F525} \u8FDB\u573A\u5FC5\u505A7\u5206\u949F\u52A8\u6001\u70ED\u8EAB\uFF08\u7EDD\u4E0D\u51B7\u542F\u52A8\u6263\u6740\uFF09</span>
            </span>
            <div class="space-y-2">
              ${q.warmup.map(r=>`
                <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-xs">
                  <div class="flex justify-between font-bold text-slate-800 dark:text-slate-100 mb-0.5">
                    <span>${r.step}</span>
                    <span class="text-indigo-600 dark:text-indigo-400">${r.time}</span>
                  </div>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400">${r.desc}</p>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- \u88C5\u5907\u4E0E\u51B7\u8EAB\u7EC6\u8282 -->
          <div class="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 flex flex-col justify-between space-y-3">
            <div>
              <span class="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1 mb-2">
                <span>\u{1F45F} \u88C5\u5907\u4E0E\u5B9E\u64CD\u907F\u5751\u94C1\u5F8B</span>
              </span>
              <ul class="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                ${q.gearRules.map(r=>`<li>${r}</li>`).join("")}
              </ul>
            </div>
            <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 text-[11px] text-slate-600 dark:text-slate-300">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">\u6253\u540E\u51B7\u8EAB\uFF1A</span>
              ${q.cooldown}
            </div>
          </div>
        </div>
      </div>

      <!-- \u79D1\u5B66\u8DD1\u6B65\u5FC3\u6CD5 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center space-x-2">
          <span>\u{1F3C3}</span>
          <span>${J.title}</span>
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          ${J.principles.map((r,a)=>`
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/30 border border-slate-200/60 dark:border-slate-700">
              <div class="font-bold text-slate-800 dark:text-slate-100 mb-1">\u539F\u5219 ${a+1}</div>
              <p class="leading-relaxed">${r}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `}function ke(t="diet_plan",e){let s=document.createElement("div");s.className="space-y-6";let r=N.find(a=>a.id===t)||N[0];return s.innerHTML=`
    <!-- \u5934\u90E8\uFF1A\u8BA1\u5212\u4F53\u7CFB\u603B\u89C8\u5361\u7247 -->
    <div class="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/20">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
          \u{1F4CB} \u6838\u5FC3\u5065\u5EB7\u8BA1\u5212\u5E93\uFF08\u77E5\u8BC6\u4E0E\u884C\u52A8\u89C4\u8303\uFF09
        </span>
        <span class="text-xs text-emerald-100">\u4E13\u4E3A\u5728\u8BFB\u7814\u7A76\u751F\u9AD8\u538B\u957F\u4E45\u5750\u73AF\u5883\u5B9A\u5236</span>
      </div>
      <h2 class="text-xl sm:text-2xl font-black tracking-tight mt-1">\u7CFB\u7EDF\u5316\u5065\u5EB7\u65B9\u6848\u4E0E\u6267\u884C\u89C4\u7A0B</h2>
      <p class="text-xs sm:text-sm text-emerald-100 mt-1.5 max-w-2xl leading-relaxed">
        \u5065\u5EB7\u4E0D\u662F\u96F6\u788E\u7684\u5E94\u4ED8\uFF0C\u800C\u662F\u4E25\u5BC6\u7684\u79D1\u7814\u5DE5\u7A0B\u3002\u672C\u677F\u5757\u6C47\u96C6\u60A8\u751F\u6D3B\u5404\u7EF4\u5EA6\u7684\u786E\u5B9A\u6027\u65B9\u6848\u30011:1\u66FF\u6362\u5E93\u4E0E\u907F\u5751\u7EA2\u7EBF\uFF0C\u4EE5\u89C4\u5212\u4E3A\u7EB2\uFF0C\u7167\u7AE0\u6267\u884C\u3002
      </p>

      <!-- \u8BA1\u5212\u6A2A\u5411\u5207\u6362\u6807\u7B7E\u680F -->
      <div class="mt-6 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        ${N.map(a=>{let l=a.id===r.id;return`
            <button
              data-plan="${a.id}"
              class="plan-tab-btn flex-shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${l?"bg-white text-emerald-800 shadow-md scale-105":"bg-black/20 text-white hover:bg-black/30"}"
            >
              <span>${a.icon}</span>
              <span>${a.title}</span>
            </button>
          `}).join("")}
      </div>
    </div>

    <!-- \u65B9\u6848\u6B63\u6587\u533A -->
    <div id="plan-detail-body" class="space-y-6">
      ${Ee(r.id)}
    </div>
  `,s.querySelectorAll(".plan-tab-btn").forEach(a=>{a.addEventListener("click",()=>{let l=a.getAttribute("data-plan");e(l)})}),s}function Ee(t){switch(t){case"research_plan":return fe();case"diet_plan":return Ce();case"supplement_plan":return _e();case"fitness_plan":return ge();case"posture_plan":return Le();case"circadian_plan":return je();case"mental_plan":return De();default:return fe()}}function fe(){return`
    <div class="space-y-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <span class="w-3 h-3 rounded-full bg-indigo-500"></span>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">\u5B9E\u9A8C\u5BA4\u5DE5\u4F4D\u5750\u73ED\u4F5C\u606F\u6CD5\u5219\uFF08\u7C7B\u4E0A\u73ED\u5DE5\u4F5C\u5236\uFF09</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">\u23F0 \u4E0A\u5348\u653B\u575A\u9EC4\u91D1\u671F (9:00~11:30)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              \u5230\u5DE5\u4F4D\u540E\u4E25\u7981\u5237\u624B\u673A\u6216\u5904\u7406\u6742\u52A1\uFF0C\u76F4\u5954\u5F53\u65E5\u6700\u786C\u6838\u4EFB\u52A1\uFF1A\u7B97\u6CD5\u63A8\u5BFC\u3001\u6838\u5FC3\u4EE3\u7801\u653B\u575A\u6216\u4E3B\u529B\u5B9E\u9A8C\u6267\u884C\u3002
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">\u{1F4CA} \u4E0B\u5348\u7410\u788E\u4E0E\u6587\u732E\u671F (14:00~17:30)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              \u5348\u4F11\u5524\u9192\u540E\uFF0C\u5F00\u5C55\u4F4E\u5FC3\u667A\u8D1F\u8377\u4EFB\u52A1\uFF1A\u5B9E\u9A8C\u6570\u636E\u6E05\u6D17\u5236\u56FE\u3001\u6587\u732E\u7CBE\u8BFB\u7B14\u8BB0\u3001\u62A5\u8D26\u6216\u7EC4\u4F1A\u6750\u6599\u8D77\u8349\u3002
            </p>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
            <span class="font-bold text-indigo-600 dark:text-indigo-400 block">\u{1F319} \u665A\u95F4\u590D\u76D8\u4E0E\u8FDB\u9636\u671F (19:30~22:00)</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              \u8FD0\u52A8\u5F52\u6765\u540E\uFF0C\u8FDB\u884C\u5F53\u65E5\u5B9E\u9A8C\u65E5\u5FD7\u5F52\u6863\u3001\u4EE3\u7801\u7248\u672C\u63D0\u4EA4\uFF08Git Commit\uFF09\u4E0E\u660E\u65E5\u9AD8\u4F18\u5148\u7EA7\u4EFB\u52A1\u6392\u671F\u3002
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div class="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-700 pb-3">
          <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">\u7EC4\u4F1A\u6C47\u62A5\u4E0E\u5BFC\u5E08\u534F\u540C\u89C4\u7A0B</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
            <span class="font-bold text-emerald-800 dark:text-emerald-300">\u2705 \u6C47\u62A5\u94C1\u5F8B\uFF1A\u7ED3\u8BBA\u5148\u884C + \u5907\u9009\u65B9\u6848</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              \u5148\u8BF4\u8FDB\u5EA6\u7ED3\u8BBA\u4E0E\u9047\u5230\u5361\u70B9\uFF0C\u4E25\u7981\u957F\u7BC7\u6D41\u6C34\u8D26\uFF1B\u9047\u5230\u96BE\u9898\u65F6\u5FC5\u987B\u643A\u5E262\u4E2A\u9884\u6848\u4F9B\u5BFC\u5E08\u51B3\u7B56\uFF0C\u800C\u975E\u629B\u51FA\u771F\u7A7A\u95EE\u9898\u3002
            </p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
            <span class="font-bold text-emerald-800 dark:text-emerald-300">\u2705 \u60C5\u7EEA\u9694\u79BB\uFF1A\u4E8B\u5B9E\u5BF9\u4E8B\uFF0C\u7EDD\u4E0D\u5BF9\u4EBA</span>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
              \u5BFC\u5E08\u60C5\u7EEA\u5316\u6279\u8BC4\u65F6\uFF0C\u542F\u52A8\u201C\u5BA2\u89C2\u4E8B\u5B9E\u8FC7\u6EE4\u7F51\u201D\uFF0C\u4EC5\u63D0\u53D6\u5B66\u672F\u5EFA\u8BAE\u4E0E\u4FEE\u6539\u8981\u6C42\uFF0C\u4E25\u7981\u5185\u8017\u548C\u5F53\u573A\u8FA9\u89E3\u3002
            </p>
          </div>
        </div>
      </div>
    </div>
  `}function Ce(){return`
    <div class="space-y-4">
      ${B.map(t=>`
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-4">
            <div class="flex items-center space-x-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500"></span>
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">${t.title}</h3>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
              \u65F6\u6BB5\uFF1A${t.time}
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="space-y-2">
              <h4 class="text-xs font-bold text-slate-400">\u{1F4CB} \u6807\u914D\u65B9\u6848\uFF1A</h4>
              ${t.standard.map(e=>`
                <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/70 dark:border-slate-700/60 text-xs">
                  <span class="font-semibold text-slate-700 dark:text-slate-200">${e.name}</span>
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-emerald-600 dark:text-emerald-400">${e.amount}</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${e.tag}</span>
                  </div>
                </div>
              `).join("")}
              ${t.gradTips?`<div class="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">\u{1F4A1} \u7814\u9014\u5B9E\u64CD\u6280\u5DE7\uFF1A${t.gradTips}</div>`:""}
            </div>

            <div class="space-y-2.5">
              <h4 class="text-xs font-bold text-slate-400">\u{1F504} \u81EA\u7531\u8F6E\u6362\u5907\u9009\u5E93\uFF081:1\u7B49\u91CF\u66FF\u6362\uFF09\uFF1A</h4>
              ${t.replacements.map(e=>`
                <div class="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs">
                  <div class="font-bold text-amber-900 dark:text-amber-300 mb-1">\u5E73\u66FF\u76EE\u6807\uFF1A${e.target}</div>
                  ${e.options.map(s=>`
                    <div class="flex justify-between pl-2 border-l-2 border-amber-400 py-0.5">
                      <span class="text-slate-700 dark:text-slate-300 font-medium">${s.name} <span class="font-bold text-amber-700 dark:text-amber-400">(${s.amount})</span></span>
                      <span class="text-[10px] text-slate-400">${s.note}</span>
                    </div>
                  `).join("")}
                </div>
              `).join("")}

              <div class="p-2.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/30 text-xs text-rose-900 dark:text-rose-300">
                <span class="font-bold">\u26A0\uFE0F \u5B9E\u64CD\u907F\u5751\uFF1A</span>
                <ul class="list-disc list-inside mt-1 space-y-0.5 text-[11px] sm:text-xs">
                  ${t.pitfalls.map(e=>`<li>${e}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      `).join("")}

      <!-- \u98DF\u5802\u7EA2\u9ED1\u699C -->
      <div class="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">\u{1F3EB} \u9AD8\u6821\u98DF\u5802\u70B9\u9910\u907F\u5751\u7EA2\u9ED1\u699C</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
            <span class="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">\u2705 \u7EFF\u699C\uFF08\u653E\u5FC3\u6253\u83DC\uFF09\uFF1A</span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed">\u6E05\u7092\u897F\u84DD\u82B1\u3001\u6C34\u716E\u5927\u767D\u83DC\u3001\u6E05\u84B8\u9C7C\u3001\u53BB\u76AE\u5364\u9E21\u817F\u3001\u6E05\u6C64\u51AC\u74DC\u3002\u5907\u4E00\u5C0F\u7897\u5F00\u6C34\u6DAE\u6CB9\u53EF\u51CF\u5C1150%\u6D6E\u6CB9\u3002</p>
          </div>
          <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
            <span class="font-bold text-rose-800 dark:text-rose-300 block mb-1">\u274C \u9ED1\u699C\uFF08\u9690\u5F62\u70ED\u91CF\u70B8\u5F39\uFF09\uFF1A</span>
            <p class="text-slate-700 dark:text-slate-300 leading-relaxed">\u5730\u4E09\u9C9C\u3001\u5E72\u7178\u8C46\u89D2\u3001\u7EA2\u70E7\u8304\u5B50\uFF08\u5438\u6CB9\u738740%\uFF09\uFF1B\u70B8\u9E21\u6392\u3001\u6C34\u716E\u8089\u7247\u3001\u6D53\u82A1\u9178\u8FA3\u571F\u8C46\u4E1D\u3002</p>
          </div>
        </div>
      </div>
    </div>
  `}function _e(){return`
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${D.map(t=>`
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">${t.name}</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-bold">\u79D1\u5B66\u8865\u5242</span>
            </div>
            <div class="text-xs font-bold text-teal-600 dark:text-teal-400 mb-2">${t.necessity}</div>
            <div class="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">\u7528\u6CD5\u7528\u91CF\uFF1A${t.dosage}</div>
            <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">${t.reason}</p>
          </div>
          <div class="text-[11px] p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-amber-800 dark:text-amber-300">
            \u{1F4A1} \u5B9E\u64CD\u7EC6\u8282\uFF1A${t.tips}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Le(){return`
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${R.map(t=>`
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">${t.name}</h4>
              <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">\u{1F3AF} \u9776\u5411\uFF1A${t.target}</div>
              <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">${t.steps}</p>
            </div>
            <div class="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700">
              <span>\u23F1\uFE0F ${t.duration}</span>
              <span>\u{1F4CC} ${t.scenario}</span>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function je(){return`
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100">\u{1F319} \u7814\u7A76\u751F 24\u5C0F\u65F6\u79D1\u7814\u7CBE\u529B\u8282\u594F\u8F74</h4>
      <div class="space-y-2.5">
        ${xe.map(t=>`
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/30 border border-slate-200/60 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center space-x-3">
              <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 w-24 flex-shrink-0">${t.time}</span>
              <div>
                <span class="text-xs font-bold text-slate-800 dark:text-slate-100 mr-2">${t.stage}</span>
                <span class="text-xs text-slate-600 dark:text-slate-300">${t.actions}</span>
              </div>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold self-start sm:self-center">${t.tag}</span>
          </div>
        `).join("")}
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
        <h5 class="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">\u{1F634} \u5BBF\u820D\u7761\u7720\u536B\u751F\u5B88\u5219\uFF1A</h5>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          ${me.map(t=>`
            <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-700">
              <span class="font-bold text-slate-800 dark:text-slate-100">\u25AA ${t.rule}\uFF1A</span>
              <span>${t.detail}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `}function De(){return`
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${ue.map(t=>`
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2">${t.title}</h4>
            <div class="text-[11px] text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2 rounded-lg border border-rose-200/50 dark:border-rose-900/30 mb-3">
              \u26A1 \u89E6\u53D1\u60C5\u5883\uFF1A${t.scenario}
            </div>
            <div class="space-y-1.5 mb-4">
              <span class="text-[11px] font-bold text-slate-400">\u6267\u884C\u963B\u65AD\u534F\u8BAE\uFF1A</span>
              <ul class="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1">
                ${t.protocol.map(e=>`<li>${e}</li>`).join("")}
              </ul>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-750/50 border border-slate-200/60 dark:border-slate-700 text-xs italic text-slate-700 dark:text-slate-300 text-center font-medium">
            \u201C${t.mantra}\u201D
          </div>
        </div>
      `).join("")}
    </div>
  `}function V(){let t=n.getTodayData(),e=n.calculateTodayScore(),s=n.calculateStreak(),r=C(),a=document.createElement("div");a.className="space-y-6";let l=[{id:"breakfast",label:"\u65E9\u9910 (7:30~8:30)",icon:"\u{1F373}"},{id:"morning_snack",label:"\u52A0\u9910 (10:00~10:30)",icon:"\u{1F95C}"},{id:"lunch",label:"\u5348\u9910 (11:30~12:30)",icon:"\u{1F371}"},{id:"dinner",label:"\u665A\u9910 (17:30~18:30)",icon:"\u{1F360}"}],d=Math.min(100,Math.round((t.waterDrunk||0)/2e3*100));return a.innerHTML=`
    <!-- \u4ECA\u65E5\u603B\u89C8\u6307\u6807 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-950/20 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-emerald-100 text-xs sm:text-sm mb-2">
            <span>\u{1F4C5} ${r}</span>
            <span class="bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-semibold">\u81EA\u5F8B\u72B6\u6001\u76D1\u6D4B</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold mt-1">\u4ECA\u65E5\u5065\u5EB7\u8EAB\u5FC3\u6D3B\u529B\u6307\u6570</h2>
          <p class="text-emerald-100 text-xs sm:text-sm mt-1">\u5747\u8861\u6444\u5165\u3001\u65F6\u5E8F\u996E\u6C34\u4E0E\u788E\u7247\u5316\u62C9\u4F38\uFF0C\u662F\u7EF4\u6301\u9AD8\u4EA7\u51FA\u79D1\u7814\u7684\u751F\u7406\u5E95\u5C42\u652F\u6491\u3002</p>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-6">
          <div class="flex items-baseline space-x-1">
            <span class="text-4xl sm:text-5xl font-extrabold tracking-tight">${e}</span>
            <span class="text-emerald-200 text-sm font-semibold">/ 100\u5206</span>
          </div>
          <div class="flex items-center space-x-2 bg-black/15 px-3 py-1.5 rounded-xl text-xs sm:text-sm">
            <span>\u{1F525} \u8FDE\u7EED\u6253\u5361</span>
            <span class="font-bold text-amber-300">${s}\u5929</span>
          </div>
          <div class="text-xs text-emerald-200">
            ${e>=80?"\u2728 \u72B6\u6001\u6781\u4F73\uFF01\u8EAB\u4F53\u9632\u5FA1\u529B\u6EE1\u683C":e>=50?"\u{1F331} \u63A8\u8FDB\u5E73\u7A33\uFF0C\u6CE8\u610F\u4FDD\u6301\u6C34\u5206\u4E0E\u6D3B\u52A8":"\u26A0\uFE0F \u57FA\u7840\u751F\u6D3B\u7A0D\u6709\u6B20\u7F3A\uFF0C\u7ED9\u8EAB\u4F53\u5145\u5145\u7535"}
          </div>
        </div>
      </div>

      <!-- \u996E\u6C34\u901F\u8BB0\u5361\u7247 -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <span class="text-xl">\u{1F4A7}</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">\u4ECA\u65E5\u996E\u6C34\u901F\u8BB0</h3>
          </div>
          <span class="text-xs font-semibold text-sky-600 dark:text-sky-400">${t.waterDrunk||0} / 2000ml</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden my-2">
          <div class="bg-sky-500 h-full rounded-full transition-all duration-300" style="width: ${d}%"></div>
        </div>
        <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span>\u8FDB\u5EA6: ${d}%</span>
          <span>\u76EE\u6807: 2000ml</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button id="add-water-250-btn" class="py-2 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300 font-semibold text-xs rounded-xl transition-all text-center">
            + 250ml (1\u676F)
          </button>
          <button id="add-water-500-btn" class="py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all text-center">
            + 500ml (\u4FDD\u6E29\u676F)
          </button>
        </div>
      </div>
    </div>

    <!-- \u6253\u5361\u77E9\u9635 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- \u996E\u98DF\u6253\u5361 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-2">
            <span class="text-xl">\u{1F957}</span>
            <h3 class="font-bold text-slate-800 dark:text-slate-100">\u4ECA\u65E5\u5065\u5EB7\u996E\u98DF\u6253\u5361</h3>
          </div>
          <span class="text-xs text-slate-400">\u70B9\u51FB\u5373\u6807\u8BB0</span>
        </div>
        <div class="space-y-2.5">
          ${l.map(i=>{let o=!!t.meals[i.id];return`
                <div data-meal="${i.id}" class="tracker-meal-item flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${o?"bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/60":"bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300"}">
                  <div class="flex items-center space-x-3">
                    <span class="text-lg">${i.icon}</span>
                    <span class="text-xs sm:text-sm font-medium ${o?"text-emerald-900 dark:text-emerald-200 line-through opacity-80":"text-slate-700 dark:text-slate-200"}">${i.label}</span>
                  </div>
                  <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${o?"bg-emerald-600 text-white border-emerald-600":"border-slate-300 dark:border-slate-600 text-transparent"}">\u2713</div>
                </div>
              `}).join("")}
        </div>
      </div>

      <!-- \u4E45\u5750\u5FAE\u62C9\u4F38\u4E0E\u8FD0\u52A8 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="text-xl">\u{1FA91}</span>
              <h3 class="font-bold text-slate-800 dark:text-slate-100">\u5DE5\u4F4D\u6297\u4E45\u5750\u5FAE\u62C9\u4F38</h3>
            </div>
            <span class="text-xs text-slate-400">\u6BCF45\u5206\u949F\u4E00\u6B21</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${R.map(i=>{let o=!!t.deskStretches[i.id];return`
                <div data-stretch="${i.id}" class="tracker-stretch-item p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${o?"bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200":"bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"}">
                  <span class="text-xs font-semibold truncate mr-2">${i.name}</span>
                  <div class="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center border text-xs font-bold ${o?"bg-indigo-600 text-white border-indigo-600":"border-slate-300 dark:border-slate-600 text-transparent"}">\u2713</div>
                </div>
              `}).join("")}
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <div class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${t.fitnessDone?"bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800/60":"bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"}" id="tracker-fitness-card">
            <div class="flex items-center space-x-3">
              <span class="text-xl">\u{1F3C3}</span>
              <div>
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">\u4ECA\u65E5\u6709\u6C27/\u6297\u963B\u953B\u70BC (30\u5206\u949F)</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400">\u6162\u8DD1\u3001\u4FEF\u5367\u6491\u6DF1\u8E72\u6216\u5FEB\u8D70\u6563\u6B65</p>
              </div>
            </div>
            <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${t.fitnessDone?"bg-amber-500 text-white border-amber-500":"border-slate-300 dark:border-slate-600 text-transparent"}">\u2713</div>
          </div>
        </div>
      </div>
    </div>

    <!-- \u8865\u5242\u5FAE\u91CF\u6253\u5361 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl">\u{1F48A}</span>
          <h3 class="font-bold text-slate-800 dark:text-slate-100">\u7814\u7A76\u751F\u57FA\u7840\u8865\u5242\u6253\u5361</h3>
        </div>
        <span class="text-xs text-slate-400">\u6297\u708E\u3001\u62A4\u773C\u4E0E\u6DF1\u7761\u7720</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
        ${D.map(i=>{let o=!!t.supplements[i.id];return`
            <button data-supp="${i.id}" class="tracker-supp-btn p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${o?"bg-teal-50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800/60 text-teal-800 dark:text-teal-200":"bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300"}">
              <span class="text-base mb-1">${o?"\u2705":"\u26AA"}</span>
              <span class="text-xs font-semibold line-clamp-1">${i.name.split("\uFF08")[0]}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `,a.querySelector("#add-water-250-btn")?.addEventListener("click",()=>{n.addWater(250),x(523.25,.15)}),a.querySelector("#add-water-500-btn")?.addEventListener("click",()=>{n.addWater(500),x(659.25,.2)}),a.querySelectorAll(".tracker-meal-item").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-meal");n.toggleMeal(o),x(440,.1)})}),a.querySelectorAll(".tracker-stretch-item").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-stretch");n.toggleDeskStretch(o),x(493.88,.1)})}),a.querySelector("#tracker-fitness-card")?.addEventListener("click",()=>{n.toggleFitness(),x(587.33,.2)}),a.querySelectorAll(".tracker-supp-btn").forEach(i=>{i.addEventListener("click",()=>{let o=i.getAttribute("data-supp");n.toggleSupplement(o),x(523.25,.1)})}),a}function he(){let t=document.createElement("div");t.className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";let e=[];B.forEach(l=>{l.replacements.forEach(d=>{e.push({mealTitle:l.title,target:d.target,options:d.options,pitfalls:l.pitfalls})})});let s=0;function r(){let l=e[s];return`
      <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <span>\u{1F504}</span>
            <span>\u98DF\u72691:1\u7B49\u91CF\u5E73\u66FF\u8BA1\u7B97\u5668</span>
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">\u5BBF\u820D\u98DF\u6750\u7528\u5C3D\u6216\u98DF\u5802\u7F3A\u8D27\u65F6\uFF0C\u4E00\u952E\u6362\u7B97\u7B49\u80FD\u91CF\u4E0E\u7B49\u86CB\u767D\u8D28\u7684\u79D1\u5B66\u5E73\u66FF\u7269\u3002</p>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
          \u5171\u6536\u5F55${e.length}\u7EC4\u6838\u5FC3\u98DF\u6750
        </span>
      </div>

      <!-- \u9009\u62E9\u5F85\u66FF\u6362\u7684\u76EE\u6807\u98DF\u6750 -->
      <div>
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">\u7B2C1\u6B65\uFF1A\u9009\u62E9\u60A8\u624B\u5934\u9700\u8981\u66FF\u6362\u7684\u6807\u914D\u98DF\u6750</label>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          ${e.map((d,i)=>`
              <button
                data-idx="${i}"
                class="sub-target-btn p-3 rounded-xl border text-left transition-all ${i===s?"bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 text-amber-900 dark:text-amber-200 ring-2 ring-amber-400/30":"bg-slate-50 dark:bg-slate-750/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"}"
              >
                <div class="text-[10px] text-slate-400 mb-0.5">${d.mealTitle}</div>
                <div class="text-xs font-bold">${d.target}</div>
              </button>
            `).join("")}
        </div>
      </div>

      <!-- \u6362\u7B97\u51FA\u7684\u5019\u9009\u5E73\u66FF\u6E05\u5355 -->
      <div class="p-5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
            \u7B2C2\u6B65\uFF1A\u53EF\u76F4\u63A51:1\u7B49\u6548\u5E73\u66FF\u65B9\u6848\uFF08\u4EFB\u9009\u5176\u4E00\uFF09
          </span>
          <span class="text-[11px] text-amber-700 dark:text-amber-400 font-medium">\u65E0\u7F1D\u66FF\u6362\uFF0C\u4E0D\u5F71\u54CD\u603B\u70ED\u91CF\u5E73\u8861</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${l.options.map(d=>`
              <div class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/60 shadow-sm flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-sm font-bold text-slate-800 dark:text-slate-100">${d.name}</span>
                    <span class="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300">${d.amount}</span>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${d.note}</p>
                </div>
                <div class="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                  <span>\u2713 \u63A8\u8350\u7406\u7531\uFF1A\u6EE1\u8DB3\u540C\u7B49\u5B8F\u91CF\u8425\u517B\u7D20\u4F9B\u7ED9</span>
                </div>
              </div>
            `).join("")}
        </div>

        <div class="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-200/80 dark:border-amber-900/60 text-xs text-slate-600 dark:text-slate-300">
          <span class="font-bold text-rose-600 dark:text-rose-400">\u26A0\uFE0F \u907F\u5751\u63D0\u9192\uFF1A</span>
          ${l.pitfalls[0]}
        </div>
      </div>
    `}t.innerHTML=r();function a(){t.querySelectorAll(".sub-target-btn").forEach(l=>{l.addEventListener("click",()=>{s=parseInt(l.getAttribute("data-idx"),10),t.innerHTML=r(),a()})})}return a(),t}function ve(){let t=document.createElement("div");t.className="space-y-6";let e=n.getTodayData(),s=e.waterDrunk||0,r=2e3,a=Math.min(100,Math.round(s/r*100));return t.innerHTML=`
    <!-- \u996E\u6C34\u603B\u4F53\u8FDB\u5EA6\u9762\u677F -->
    <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-sky-900/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">\u5DE5\u4F4D\u6C34\u5408\u5E73\u8861</span>
        <h3 class="text-xl sm:text-2xl font-black mt-2">\u4ECA\u65E5\u996E\u6C34\u91CF\uFF1A${s} / ${r}ml</h3>
        <p class="text-xs text-sky-100 mt-1">\u5145\u8DB3\u7684\u6C34\u5206\u53EF\u63D0\u5347\u8111\u810A\u6DB2\u5FAA\u73AF\u4E0E\u4EE3\u8C22\u5E9F\u7269\u6392\u6CC4\uFF0C\u663E\u8457\u964D\u4F4E\u4E45\u5750\u504F\u5934\u75DB\u6982\u7387\u3002</p>
      </div>

      <div class="flex items-center space-x-3">
        <button id="quick-add-150" class="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all">+150ml (\u7EB8\u676F)</button>
        <button id="quick-add-250" class="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold transition-all">+250ml (\u6C34\u676F)</button>
        <button id="quick-add-500" class="px-4 py-2 rounded-xl bg-white text-blue-600 hover:bg-blue-50 font-black text-xs shadow-md transition-all">+500ml (\u4FDD\u6E29\u676F)</button>
      </div>
    </div>

    <!-- \u996E\u6C34\u65F6\u5E8F\u5206\u6BB5\u6253\u5361 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>\u{1F4A7}</span>
          <span>\u5DE5\u4F4D7\u5927\u9EC4\u91D1\u996E\u6C34\u65F6\u523B\uFF08\u70B9\u51FB\u5373\u6253\u5361\uFF09</span>
        </h4>
        <span class="text-xs text-slate-400">\u8FBE\u6210\u7387\uFF1A${a}%</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        ${pe.map(l=>{let d=!!e.waterNodes?.[l.time];return`
            <div data-time="${l.time}" class="water-card p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${d?"bg-sky-50 dark:bg-sky-950/30 border-sky-400 dark:border-sky-700 text-sky-900 dark:text-sky-200":"bg-slate-50 dark:bg-slate-750/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"}">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-bold">${l.time}</span>
                  <span class="text-[10px] font-bold ${d?"text-sky-600":"text-slate-400"}">${d?"\u2713":"+"}</span>
                </div>
                <div class="text-xs font-semibold mb-1">${l.title}</div>
                <div class="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">${l.desc}</div>
              </div>
              <div class="mt-2 text-right">
                <span class="text-[11px] font-bold text-sky-600 dark:text-sky-400">${l.amount}ml</span>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>

    <!-- \u8865\u5242\u670D\u7528\u6253\u5361\u8054\u52A8 -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>\u{1F48A}</span>
          <span>\u4ECA\u65E5\u5FAE\u91CF\u8865\u5242\u6253\u5361\u8FFD\u8E2A</span>
        </h4>
        <span class="text-xs text-slate-400">\u70B9\u51FB\u5361\u7247\u6807\u8BB0\u4ECA\u65E5\u5DF2\u670D</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        ${D.map(l=>{let d=!!e.supplements[l.id];return`
            <div data-supp="${l.id}" class="supp-toggle-card p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${d?"bg-teal-50 dark:bg-teal-950/30 border-teal-300 dark:border-teal-700":"bg-slate-50 dark:bg-slate-750/30 border-slate-200 dark:border-slate-700 hover:border-slate-300"}">
              <div>
                <div class="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">${l.name}</div>
                <div class="text-[11px] text-teal-600 dark:text-teal-400 mt-0.5">${l.dosage.split("\uFF0C")[0]}</div>
              </div>
              <div class="w-6 h-6 rounded-lg flex items-center justify-center border text-xs font-bold ${d?"bg-teal-600 text-white border-teal-600":"border-slate-300 text-transparent"}">\u2713</div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,t.querySelector("#quick-add-150")?.addEventListener("click",()=>{n.addWater(150),x(493.88,.15)}),t.querySelector("#quick-add-250")?.addEventListener("click",()=>{n.addWater(250),x(523.25,.15)}),t.querySelector("#quick-add-500")?.addEventListener("click",()=>{n.addWater(500),x(659.25,.2)}),t.querySelectorAll(".water-card").forEach(l=>{l.addEventListener("click",()=>{let d=l.getAttribute("data-time");n.toggleWaterNode(d),x(523.25,.15)})}),t.querySelectorAll(".supp-toggle-card").forEach(l=>{l.addEventListener("click",()=>{let d=l.getAttribute("data-supp");n.toggleSupplement(d),x(587.33,.15)})}),t}function ye(){let t=document.createElement("div");t.className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6";let e=45,s=e*60,r=null,a=!1;t.innerHTML=`
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>\u23F3</span>
          <span>\u5DE5\u4F4D\u4E45\u5750\u5FAE\u5E72\u9884\u756A\u8304\u949F</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">\u8FDE\u7EED\u5750\u7ACB\u8D85\u8FC745\u5206\u949F\uFF0C\u810A\u67F1\u53D7\u538B\u4E0E\u4E0B\u80A2\u9759\u8109\u66F2\u5F20\u98CE\u9669\u500D\u589E\u3002\u5230\u70B9\u4E3B\u52A8\u63D0\u9192\u5FAE\u62C9\u4F38\u3002</p>
      </div>
      <div class="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
        <button data-mins="25" class="timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">25\u5206</button>
        <button data-mins="45" class="timer-mode-btn px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm">45\u5206</button>
        <button data-mins="60" class="timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">60\u5206</button>
      </div>
    </div>

    <!-- \u5012\u8BA1\u65F6\u5927\u8868\u76D8 -->
    <div class="flex flex-col items-center justify-center py-6">
      <div class="text-5xl sm:text-6xl font-black font-mono text-slate-800 dark:text-slate-100 tracking-wider mb-4" id="timer-display">
        45:00
      </div>

      <div class="flex items-center space-x-3">
        <button id="toggle-timer-btn" class="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all">
          \u5F00\u59CB\u4E13\u6CE8
        </button>
        <button id="reset-timer-btn" class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-sm font-semibold transition-all">
          \u91CD\u7F6E
        </button>
      </div>
    </div>

    <!-- \u5230\u70B9\u63A8\u8350\u7684\u5FAE\u52A8\u4F5C\u63A8\u8350 -->
    <div class="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
      <div class="text-xs font-bold text-indigo-900 dark:text-indigo-300 mb-2 flex items-center space-x-1.5">
        <span>\u{1F9D8} \u5230\u70B9\u5FC5\u7EC3\uFF08\u8017\u65F660\u79D2\uFF09\uFF1A</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950">
          <span class="font-bold text-indigo-700 dark:text-indigo-400">1. \u4E0B\u988C\u56DE\u7F2910\u6B21</span>\uFF1A\u6324\u51FA\u53CC\u4E0B\u5DF4\uFF0C\u653E\u677E\u540E\u9888\u6795\u4E0B\u808C\u7FA4\u3002
        </div>
        <div class="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950">
          <span class="font-bold text-indigo-700 dark:text-indigo-400">2. \u95E8\u6846/\u6905\u80CC\u62C9\u4F3830\u79D2</span>\uFF1A\u6269\u5F20\u80F8\u690E\uFF0C\u628A\u80A9\u80DB\u9AA8\u62C9\u56DE\u4E2D\u7ACB\u4F4D\u3002
        </div>
      </div>
    </div>
  `;let l=t.querySelector("#timer-display"),d=t.querySelector("#toggle-timer-btn"),i=t.querySelector("#reset-timer-btn");function o(){let k=Math.floor(s/60),p=s%60;l.textContent=`${String(k).padStart(2,"0")}:${String(p).padStart(2,"0")}`}function c(){a=!0,d.textContent="\u6682\u505C",d.className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all",r=setInterval(()=>{s>0?(s--,o()):(g(),x(880,.6),alert("\u23F0 \u5DE5\u4F4D\u4E45\u5750\u65F6\u9650\u5DF2\u5230\uFF01\u8BF7\u7ACB\u5373\u63A8\u5F00\u952E\u76D8\uFF0C\u7AD9\u8D77\u8EAB\u505A1\u7EC4\u9888\u690E\u4E0B\u988C\u56DE\u7F29\u4E0E\u80F8\u808C\u62C9\u4F38\uFF01"))},1e3)}function g(){a=!1,clearInterval(r),d.textContent="\u5F00\u59CB\u4E13\u6CE8",d.className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all"}return d.addEventListener("click",()=>{a?g():c()}),i.addEventListener("click",()=>{g(),s=e*60,o()}),t.querySelectorAll(".timer-mode-btn").forEach(k=>{k.addEventListener("click",()=>{g(),e=parseInt(k.getAttribute("data-mins"),10),s=e*60,o(),t.querySelectorAll(".timer-mode-btn").forEach(p=>{p.className="timer-mode-btn px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300"}),k.className="timer-mode-btn px-2.5 py-1 text-xs font-bold rounded-lg bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm"})}),t}function we(){let t=document.createElement("div");t.className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col items-center justify-center text-center",t.innerHTML=`
    <div class="absolute inset-0 bg-emerald-500/5 backdrop-blur-3xl pointer-events-none"></div>

    <div class="relative z-10 max-w-md w-full flex flex-col items-center">
      <span class="text-xs tracking-widest uppercase font-semibold text-emerald-400 mb-1">\u5DE5\u4F4D\u4E0E\u7761\u524D\u901F\u6548\u51CF\u538B\u4EEA</span>
      <h3 class="text-lg sm:text-xl font-bold mb-1">${A.name}</h3>
      <p class="text-xs text-slate-400 mb-6">${A.desc}</p>

      <!-- \u547C\u5438\u52A8\u6001\u5149\u6655\u5706\u73AF -->
      <div class="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
        <div id="breath-circle" class="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30 transition-all ease-linear text-white font-bold select-none">
          <span id="breath-status-text" class="text-sm font-semibold">\u51C6\u5907\u5F00\u59CB</span>
          <span id="breath-countdown" class="text-3xl font-extrabold mt-0.5">-</span>
        </div>
      </div>

      <div id="breath-hint" class="text-xs text-emerald-300 font-medium mb-5 h-5">
        \u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\uFF0C\u8DDF\u968F\u89C6\u89C9\u4E0E\u8282\u62CD\u8FDB\u884C4\u8F6E\u6DF1\u5EA6\u4EA4\u611F\u795E\u7ECF\u963B\u65AD
      </div>

      <div class="flex items-center space-x-3">
        <button id="start-breath-btn" class="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/30 transition-all">
          \u5F00\u59CB\u547C\u5438\u8BAD\u7EC3
        </button>
        <button id="stop-breath-btn" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-medium text-sm border border-slate-700 transition-all hidden">
          \u7ED3\u675F\u8BAD\u7EC3
        </button>
      </div>
    </div>
  `;let e=!1,s=null,r=0,a=t.querySelector("#breath-circle"),l=t.querySelector("#breath-status-text"),d=t.querySelector("#breath-countdown"),i=t.querySelector("#breath-hint"),o=t.querySelector("#start-breath-btn"),c=t.querySelector("#stop-breath-btn"),g=A.phases;function k(b){if(!e)return;let m=g[b],u=m.duration;l.textContent=m.label.split(" ")[0],d.textContent=u,i.textContent=m.tip,b===0?(x(329.63,.2),a.style.transitionDuration=`${m.duration}s`,a.style.transform="scale(1.7)",a.style.background="linear-gradient(135deg, #10b981, #06b6d4)"):b===1?(x(440,.15),a.style.transitionDuration="0.3s",a.style.transform="scale(1.7)",a.style.background="linear-gradient(135deg, #f59e0b, #d97706)"):b===2&&(x(261.63,.25),a.style.transitionDuration=`${m.duration}s`,a.style.transform="scale(1.0)",a.style.background="linear-gradient(135deg, #3b82f6, #6366f1)"),s=setInterval(()=>{if(!e){clearInterval(s);return}if(u--,u>0)d.textContent=u;else{clearInterval(s);let f=(b+1)%g.length;if(f===0&&(r++,r>=A.recommendedCycles)){$(!0);return}k(f)}},1e3)}function p(){e=!0,r=0,o.classList.add("hidden"),c.classList.remove("hidden"),k(0)}function $(b=!1){e=!1,s&&clearInterval(s),o.classList.remove("hidden"),c.classList.add("hidden"),a.style.transitionDuration="0.5s",a.style.transform="scale(1.0)",a.style.background="linear-gradient(135deg, #10b981, #14b8a6)",l.textContent=b?"\u8BAD\u7EC3\u5B8C\u6210":"\u51C6\u5907\u5F00\u59CB",d.textContent=b?"\u2713":"-",i.textContent=b?"\u5DF2\u5B8C\u62104\u8F6E\u547C\u5438\uFF0C\u8FF7\u8D70\u795E\u7ECF\u6DF1\u5EA6\u6FC0\u6D3B\u3002":"\u5DF2\u505C\u6B62\uFF0C\u968F\u65F6\u53EF\u91CD\u65B0\u5F00\u59CB\u3002"}return o.addEventListener("click",p),c.addEventListener("click",()=>$(!1)),t}function $e(){let t=document.createElement("div");t.className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6",t.innerHTML=`
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-4">
      <div>
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
          <span>\u{1F4BE}</span>
          <span>\u5065\u5EB7\u6570\u636E\u5F52\u6863\u4E0E\u8DE8\u7AEF\u540C\u6B65</span>
        </h3>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">\u6240\u6709\u6253\u5361\u4E0E\u751F\u6D3B\u6570\u636E100%\u4FDD\u5B58\u5728\u60A8\u7684\u6D4F\u89C8\u5668\u672C\u5730\uFF0C\u65E0\u9690\u79C1\u5916\u6CC4\u98CE\u9669\u3002</p>
      </div>
      <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
        \u65E0\u670D\u52A1\u5668\u4F9D\u8D56
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- \u5BFC\u51FA\u5361\u7247 -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">\u5BFC\u51FA\u6570\u636E\u5FEB\u7167 (JSON)</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">\u5C06\u5386\u53F2\u8FDE\u7EED\u6253\u5361\u3001\u996E\u98DF\u5C65\u5386\u4E0E\u996E\u6C34\u8BB0\u5F55\u6253\u5305\u4E0B\u8F7D\u4E3A\u672C\u5730JSON\u6587\u4EF6\uFF0C\u7528\u4E8E\u957F\u671F\u5B58\u6863\u6216\u6362\u7535\u8111\u8FC1\u79FB\u3002</p>
        </div>
        <button id="download-json-btn" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all text-center">
          \u7ACB\u5373\u5BFC\u51FA\u5907\u4EFD\u6587\u4EF6
        </button>
      </div>

      <!-- \u5BFC\u5165\u5361\u7247 -->
      <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
        <div>
          <h4 class="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">\u6062\u590D\u5386\u53F2\u5907\u4EFD\u6587\u4EF6</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">\u4ECE\u6B64\u524D\u5BFC\u51FA\u7684JSON\u6587\u4EF6\u4E2D\u6062\u590D\u6253\u5361\u8BB0\u5F55\u4E0E\u5929\u6570\u7D2F\u79EF\uFF0C\u5B9E\u73B0\u8DE8\u6D4F\u89C8\u5668\u6570\u636E\u540C\u6B65\u3002</p>
        </div>
        <input type="file" id="upload-json-file" class="hidden" accept=".json" />
        <button id="trigger-upload-btn" class="w-full py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-xs shadow-sm transition-all text-center">
          \u9009\u62E9JSON\u6587\u4EF6\u6062\u590D
        </button>
      </div>
    </div>
  `,t.querySelector("#download-json-btn")?.addEventListener("click",()=>{let s=n.exportDataJson(),r=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(r),l=document.createElement("a");l.href=a,l.download=`\u7814\u9014\u5065\u5EB7\u6570\u636E\u5907\u4EFD_${C().split(" ")[0]}.json`,l.click(),URL.revokeObjectURL(a)});let e=t.querySelector("#upload-json-file");return t.querySelector("#trigger-upload-btn")?.addEventListener("click",()=>{e?.click()}),e?.addEventListener("change",s=>{let r=s.target.files?.[0];if(!r)return;let a=new FileReader;a.onload=l=>{let d=l.target?.result;typeof d=="string"&&(n.importDataJson(d)?alert("\u6253\u5361\u6570\u636E\u6062\u590D\u6210\u529F\uFF01"):alert("\u6062\u590D\u5931\u8D25\uFF1A\u6587\u4EF6\u5E76\u975E\u6709\u6548\u7684\u5065\u5EB7\u6570\u636EJSON\u683C\u5F0F\u3002"))},a.readAsText(r,"utf-8")}),t}function Te(t="tracker_tool",e){let s=document.createElement("div");s.className="space-y-6";let r=I.find(l=>l.id===t)||I[0];s.innerHTML=`
    <!-- \u5934\u90E8\u5DE5\u5177\u7BB1\u5BFC\u822A\u6761 -->
    <div class="bg-gradient-to-r from-sky-600 via-indigo-700 to-slate-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg shadow-sky-950/20">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm">
          \u{1F9F0} \u8F85\u52A9\u6267\u884C\u5DE5\u5177\u7BB1\uFF08\u4EA4\u4E92\u4E0E\u843D\u5730\u8F85\u52A9\uFF09
        </span>
        <span class="text-xs text-sky-100">\u4E3A\u8BA1\u5212\u9AD8\u6548\u843D\u5730\u8D4B\u80FD</span>
      </div>
      <h2 class="text-xl sm:text-2xl font-black tracking-tight mt-1">\u65E5\u5E38\u751F\u6D3B\u8F85\u52A9\u5DE5\u5177\u4E0E\u6253\u5361\u77E9\u9635</h2>
      <p class="text-xs sm:text-sm text-sky-100 mt-1.5 max-w-2xl leading-relaxed">
        \u5DE5\u5177\u670D\u52A1\u4E8E\u8BA1\u5212\u3002\u5728\u8FD9\u91CC\u8BB0\u5F55\u6BCF\u65E5\u996E\u6C34\u3001\u6267\u884C\u5FAE\u62C9\u4F38\u756A\u8304\u949F\u3001\u6362\u7B971:1\u98DF\u6750\u6216\u8FDB\u884C4-7-8\u547C\u5438\u653E\u677E\uFF0C\u8BA9\u81EA\u5F8B\u53D8\u5F97\u8F7B\u677E\u53EF\u89C6\u5316\u3002
      </p>

      <!-- \u5DE5\u5177\u5207\u6362\u6807\u7B7E\u680F -->
      <div class="mt-6 flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
        ${I.map(l=>{let d=l.id===r.id;return`
            <button
              data-tool="${l.id}"
              class="tool-tab-btn flex-shrink-0 flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${d?"bg-white text-slate-900 shadow-md scale-105":"bg-black/20 text-white hover:bg-black/30"}"
            >
              <span>${l.icon}</span>
              <span>${l.title}</span>
            </button>
          `}).join("")}
      </div>
    </div>

    <!-- \u5177\u4F53\u5DE5\u5177\u6E32\u67D3\u533A -->
    <div id="tool-render-body"></div>
  `;let a=s.querySelector("#tool-render-body");if(a)switch(r.id){case"tracker_tool":a.appendChild(V());break;case"substitute_tool":a.appendChild(he());break;case"water_tool":a.appendChild(ve());break;case"desk_timer_tool":a.appendChild(ye());break;case"breathing_tool":a.appendChild(we());break;case"backup_tool":a.appendChild($e());break;default:a.appendChild(V())}return s.querySelectorAll(".tool-tab-btn").forEach(l=>{l.addEventListener("click",()=>{let d=l.getAttribute("data-tool");e(d)})}),s}var O=class{constructor(){this.activeMode="overview",this.activePlanId="diet_plan",this.activeToolId="tracker_tool",this.appRoot=document.getElementById("app"),this.initTheme(),this.checkUrlSync(),this.render(),n.subscribe("stateChanged",()=>{this.renderMainContent()})}async checkUrlSync(){try{let e=window.location.hash;if(e&&e.startsWith("#sync=")){let s=decodeURIComponent(e.substring(6)),r=JSON.parse(atob(s));r.token&&r.gistId&&(y.saveConfig({token:r.token,gistId:r.gistId}),history.replaceState(null,"",window.location.pathname+window.location.search),await y.pullFromCloud(),this.render(),x(659.25,.2))}}catch(e){console.warn("URL sync config parse error:",e)}}initTheme(){let e=localStorage.getItem("theme"),s=window.matchMedia("(prefers-color-scheme: dark)").matches;e==="dark"||!e&&s?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}navigate(e,s){this.activeMode=e,e==="plans"&&s?this.activePlanId=s:e==="tools"&&s&&(this.activeToolId=s),window.scrollTo({top:0,behavior:"smooth"}),this.render()}renderMainContent(){let e=document.getElementById("main-content-area");if(e)switch(e.innerHTML="",this.activeMode){case"overview":e.appendChild(Y((s,r)=>this.navigate(s,r)));break;case"daily":e.appendChild(de());break;case"timetable":e.appendChild(ce());break;case"plans":e.appendChild(ke(this.activePlanId,s=>{this.activePlanId=s,this.renderMainContent()}));break;case"tools":e.appendChild(Te(this.activeToolId,s=>{this.activeToolId=s,this.renderMainContent()}));break;default:e.appendChild(Y((s,r)=>this.navigate(s,r)))}}render(){if(!this.appRoot)return;this.appRoot.innerHTML="";let e=this.activeMode==="plans"?this.activePlanId:this.activeToolId,s=ee(this.activeMode,e,(a,l)=>{this.navigate(a,l)});this.appRoot.appendChild(s);let r=document.createElement("main");r.className="max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-20",r.id="main-content-area",this.appRoot.appendChild(r),this.renderMainContent()}};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>new O):new O;
