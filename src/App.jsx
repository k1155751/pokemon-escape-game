import React, { useState } from 'react';
import {
  Sparkles, Heart, Zap, BookOpen, Award,
  Lock, ChevronRight, Check, Key, AlertCircle
} from 'lucide-react';

import MapScreen from './MapScreen';

const PokemonEscapeGame = () => {
  const [currentView, setCurrentView] = useState('map');
  const [activeStage, setActiveStage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stageProgress, setStageProgress] = useState([false, false, false, false]);
  const [stageScores, setStageScores] = useState([0, 0, 0, 0]);
  const [passwords, setPasswords] = useState(['', '', '', '']);
  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showStageComplete, setShowStageComplete] = useState(false);
  const [stageFailed, setStageFailed] = useState(false);

  const stages = [
    {
      name: "관동지방",
      theme: "인권과 존중의 기초",
      emoji: "🟢",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      pokemonImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      pokemonName: "피카츄",
      situation: "가장 먼저 도착한 관동지방. 평화롭던 태초의 마을이 불길에 휩싸였습니다.\n흑화한 꼬부기가 친구들에게 오물을 뿌리고,\n흑화한 피카츄는 눈이 빨개진 채 닥치는 대로 전기를 쏘아댑니다.\n길목에는 흑화한 잠만보가 누워 '나만 편하면 돼!'라며 길을 막고 있습니다.",
      mission: "기초 도덕심을 회복하여 포켓몬들을 진정시켜라!",
      successMsg: "피카츄의 눈에서 붉은 기가 사라지고 꼬부기가 맑은 물을 뿜습니다.\n피카츄: '피카... 피? (어라라...? 내가 뭘...)'\n잠만보: '쿠쿨... (고마워! 덕분에 살았어! 이제 길을 비켜줄게.)'",
      failMsg: "흑화한 포켓몬들이 더욱 난폭해집니다!\n피카츄: '피카피!! (아직 부족해!)'\n잠만보: '쿠오오오... (더 강한 도덕심이 필요해!)'\n\n다시 도전하여 모든 문제를 맞춰야 합니다!",
      password: "6",
      questions: [
          { q: "다음 중 학생의 인권을 존중하는 태도로 가장 적절한 것은?", options: ["모든 학생의 의견을 동등하게 존중한다", "성적이 낮은 학생의 의견을 무시한다", "다수의 의견이면 소수의 생각을 배제한다", "교사의 지시라면 이유를 묻지 않는다"], answer: 0 },
          { q: "친구의 외모를 놀리는 행동이 문제가 되는 이유로 가장 적절한 것은?", options: ["학교 규칙을 어기기 때문에", "상대의 인권과 존엄성을 침해하기 때문에", "갈등이 생길 수 있기 때문에", "교사가 싫어하기 때문에"], answer: 1 },
          { q: "다음 중 평등의 의미를 가장 잘 나타낸 것은?", options: ["모두에게 똑같은 결과를 주는 것", "상황과 필요를 고려하지 않는 것", "개인의 차이를 존중하며 대하는 것", "다수에게 유리하게 대하는 것"], answer: 2 },
          { q: "체육 활동에서 특정 학생만 계속 제외하는 것은 어떤 문제와 가장 관련 깊은가?", options: ["책임", "배려", "경쟁", "차별"], answer: 3 },
          { q: "장애가 있는 학생을 배려하기 위한 학교의 조치로 가장 적절한 것은?", options: ["활동에서 제외한다", "참여를 제한해 사고를 막는다", "필요한 지원을 제공한다", "같은 기준을 그대로 적용한다"], answer: 2 },
          { q: "다음 중 편견에 해당하는 생각은?", options: ["노력하면 발전할 수 있다", "한 번 실수한 학생은 항상 실수한다", "사람마다 능력은 다르다", "서로 다른 점을 인정해야 한다"], answer: 1 },
          { q: "다문화 가정 학생을 놀리는 행동이 부당한 이유는?", options: ["개인의 배경을 이유로 차별하기 때문에", "학교 분위기를 흐리기 때문에", "규칙 위반이기 때문에", "교사가 금지했기 때문에"], answer: 0 },
          { q: "학교에서 인권이 중요한 이유로 가장 적절한 것은?", options: ["규칙을 잘 지키게 하기 위해", "성적을 높이기 위해", "모두가 존중받는 환경을 만들기 위해", "처벌을 줄이기 위해"], answer: 2 },
          { q: "다음 중 차별에 해당하지 않는 것은?", options: ["이유 없이 특정 학생을 배제한다", "성별을 이유로 역할을 제한한다", "필요에 따라 추가 지원을 제공한다", "배경을 이유로 기회를 제한한다"], answer: 2 },
          { q: "학생 자치 활동에서 바람직한 태도는?", options: ["말 잘하는 학생만 발언한다", "교사의 생각만 따른다", "다양한 의견을 존중한다", "소수 의견은 무시한다"], answer: 2 }
      ]
    },
    {
      name: "성도지방",
      theme: "평등과 배려의 마음",
      emoji: "🔵",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      pokemonImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png",
      pokemonName: "스이쿤",
      situation: "성도지방은 짙은 안개 속에 갇혔습니다.\n흑화한 다꼬리가 '너는 우리랑 다르게 생겼어!'라며 다른 포켓몬을 따돌리고 있습니다.\n흑화한 마자용은 '싫어! 반사! 무조건 반사!'라며 대화를 거부하고 벽을 칩니다.\n호수의 수호신 흑화한 스이쿤조차 오염된 물 위를 달리고 있습니다.",
      mission: "차별 없는 마음으로 안개를 걷어내라!",
      successMsg: "스이쿤이 울부짖자 안개가 걷히고 맑은 물이 흐릅니다.\n마자용: '마자! (후... 머리가 맑아졌어.)'\n다꼬리: '다꼬! (내가 이렇게 더러워졌었다니... 미안해 친구들아!)'",
      failMsg: "안개가 더욱 짙어지고 포켓몬들이 더 혼란스러워합니다!\n스이쿤: '쿠오오... (아직 마음이 충분히 깨끗하지 않아...)'\n다꼬리: '다꼬!! (더 많은 배려심이 필요해!)'",
      password: "11",
      questions: [
          { q: "친구가 성적이 낮다는 이유로 무시당할 때 가장 바람직한 행동은?", options: ["상황을 지켜본다", "함께 무시한다", "문제임을 알리고 중단을 요구한다", "관련이 없다고 생각한다"], answer: 2 },
          { q: "다음 중 학교에서의 인권 침해 사례로 볼 수 있는 것은?", options: ["의견을 말할 기회를 제한한다", "규칙에 따라 생활한다", "역할을 공정하게 나눈다", "서로 배려하며 행동한다"], answer: 0 },
          { q: "평등한 학급 분위기를 만들기 위한 행동으로 가장 적절한 것은?", options: ["친한 친구 위주로 활동한다", "능력이 뛰어난 학생만 인정한다", "서로의 차이를 존중한다", "경쟁을 강화한다"], answer: 2 },
          { q: "편견이 학교생활에 미치는 부정적 영향으로 가장 적절한 것은?", options: ["갈등과 소외를 만든다", "규칙을 잘 지키게 한다", "학습 효과를 높인다", "질서를 유지한다"], answer: 0 },
          { q: "다음 중 차별을 해결하는 방법으로 가장 바람직한 것은?", options: ["문제를 덮어 둔다", "차별받는 사람에게 참으라고 한다", "차별이 왜 문제인지 함께 논의한다", "다수의 의견을 따른다"], answer: 2 },
          { q: "학생의 인권과 가장 거리가 먼 행동은?", options: ["의견을 자유롭게 표현한다", "이유 없이 체벌한다", "존중받을 권리를 인정한다", "안전하게 보호한다"], answer: 1 },
          { q: "학교 규칙이 인권을 침해하지 않으려면 어떻게 해야 하는가?", options: ["엄격할수록 좋다", "학생의 권리를 고려해 만든다", "교사의 판단만 따른다", "처벌 중심으로 운영한다"], answer: 1 },
          { q: "다음 중 평등과 공정에 대한 설명으로 옳은 것은?", options: ["공정은 상황을 고려한 대우이다", "평등은 항상 똑같은 결과물만 나누는 것이다", "공정은 차별을 의미한다", "평등은 개인 차이를 무시한다"], answer: 0 },
          { q: "성별을 이유로 역할을 제한하는 것이 부당한 이유는?", options: ["효율이 떨어지기 때문에", "개인의 가능성을 제한하기 때문에", "규칙에 어긋나기 때문에", "불편하기 때문에"], answer: 1 },
          { q: "학교에서 인권 감수성이 높은 학생의 모습은?", options: ["친구의 어려움을 무시한다", "타인의 입장을 생각한다", "부당함을 느끼지 못한다", "다수의 의견만 따른다"], answer: 1 }
      ]
    },
    {
        name: "하나지방",
        theme: "편견 타파와 진실",
        emoji: "🔴",
        color: "from-red-400 to-orange-500",
        bgColor: "bg-red-50",
        pokemonImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png",
        pokemonName: "조로아크",
        situation: "하나지방은 서로를 속이고 미워하는 기운으로 가득합니다.\n흑화한 조로아크가 환영을 만들어 '넌 할 수 없어, 넌 실패자야'라는 편견을 심어줍니다.\n승리의 포켓몬 흑화한 비크티니는 '수단과 방법을 가리지 말고 이겨!'라며 과도한 경쟁을 부추깁니다.\n흑화한 대짱이가 진흙탕을 만들며 다가오는 사람들을 밀어내고 있습니다.",
        mission: "편견을 깨고 진실된 관계를 회복하라!",
        successMsg: "조로아크의 환영이 걷히고 진실한 모습이 드러납니다.\n비크티니: '티니! (드디어...! 이기는 것보다 중요한 게 뭔지 알았어.)'\n대짱이: '짱이! (진흙 속에 갇혀 답답했어. 꺼내줘서 고마워!)'",
        failMsg: "환영이 더욱 강해지고 편견이 세상을 뒤덮습니다!\n조로아크: '조오오... (너의 마음에 아직 편견이 남아있어...)'\n비크티니: '티니!! (진실된 마음이 더 필요해!)'",
        password: "4",
        questions: [
            { q: "다음 중 편견을 줄이는 데 도움이 되는 태도는?", options: ["소문을 그대로 믿는다", "한 번의 모습으로 판단한다", "차이를 문제로 본다", "다양한 경험과 대화를 나눈다"], answer: 3 },
            { q: "친구의 종교나 신념을 존중하는 행동은?", options: ["다수의 생각을 강요한다", "놀림의 대상으로 삼는다", "다름을 인정하고 존중한다", "침묵을 강요한다"], answer: 2 },
            { q: "학교에서 차별이 발생했을 때 가장 바람직한 대응은?", options: ["문제를 개인 문제로 본다", "공동체가 함께 해결하려 한다", "당사자에게 참으라고 한다", "모른 척한다"], answer: 1 },
            { q: "인권을 존중하는 학급의 특징으로 가장 적절한 것은?", options: ["경쟁이 매우 강하다", "소수 의견이 배제된다", "서로를 존중한다", "성적이 가장 중요하다"], answer: 2 },
            { q: "다음 중 평등한 기회를 보장하는 사례는?", options: ["능력에 상관없이 참여를 막는다", "조건에 따라 참여 기회를 제공한다", "특정 학생만 기회를 얻는다", "배경에 따라 기회를 제한한다"], answer: 1 },
            { q: "외국인 학생에게 한국어 사용을 이유로 불이익을 주는 것은 무엇에 해당하는가?", options: ["배려", "협력", "차별", "공정"], answer: 2 },
            { q: "학교 폭력 중 언어폭력이 인권 침해인 이유는?", options: ["규칙을 어겨서", "상대의 존엄성을 훼손해서", "갈등이 생겨서", "분위기가 나빠져서"], answer: 1 },
            { q: "다음 중 인권 친화적인 학교 문화를 만드는 방법은?", options: ["서로의 권리를 존중한다", "소수의 목소리를 무시한다", "문제를 숨긴다", "경쟁을 강화한다"], answer: 0 },
            { q: "편견에 근거한 판단의 문제점으로 가장 적절한 것은?", options: ["판단이 빨라진다", "공정한 대우가 어렵다", "규칙이 명확해진다", "질서가 유지된다"], answer: 1 },
            { q: "학급에서 차별적 발언을 들었을 때 바람직한 행동은?", options: ["웃고 넘긴다", "동조한다", "문제임을 지적한다", "자리를 피한다"], answer: 2 }
        ]
    },
    {
        name: "알로라 & 왜곡된 세계",
        theme: "정의와 책임, 그리고 평화",
        emoji: "🟣",
        color: "from-purple-400 to-pink-500",
        bgColor: "bg-purple-50",
        pokemonImg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png",
        pokemonName: "디아루가",
        situation: "마지막 관문입니다. 시공간이 뒤틀린 울트라홀에서 전설의 포켓몬들이 폭주합니다!\n흑화한 갸라도스가 학교 전체를 부수려 난동을 부립니다.\n흑화한 다크라이가 모두를 악몽(차별과 혐오) 속에 가두려 합니다.\n그리고 시간과 공간의 신, 흑화한 디아루가, 펄기아, 기라티나가 나타나 '도덕이 사라진 세계는 존재할 가치가 없다!'며 세계를 리셋하려 합니다.",
        mission: "정의로운 시민의식을 증명하여 세계를 구하라!",
        successMsg: "당신의 올바른 답안이 빛이 되어 전설의 포켓몬들을 감쌉니다.\n기라티나: '크으... (어둠이 걷혔다. 너의 양심이 우리를 구했군.)'\n다크라이: '후... (악몽은 끝났어. 이제 모두가 존중받는 꿈을 꿀 시간이야.)'",
        failMsg: "시공간이 더욱 뒤틀리고 세계가 붕괴 직전입니다!\n디아루가: '가아아... (시간이 멈추고 있어... 더 강한 정의감이 필요해!)'\n기라티나: '크크크... (세계를 구하려면 완벽한 책임감을 보여줘!)'",
        password: "4",
        questions: [
            { q: "다음 중 학생의 인권에 포함되지 않는 것은?", options: ["존중받을 권리", "의견을 표현할 권리", "체벌받을 의무", "안전하게 보호받을 권리"], answer: 2 },
            { q: "평등한 관계를 해치는 행동은?", options: ["서로의 의견을 듣는다", "차이를 인정한다", "우월감을 드러낸다", "협력한다"], answer: 2 },
            { q: "차별을 정당화하는 주장으로 가장 부적절한 것은?", options: ["전통이기 때문이다", "모두에게 불리하다", "특정 집단을 배제한다", "개인의 권리를 침해한다"], answer: 3 },
            { q: "학교에서 인권 교육이 필요한 이유는?", options: ["규칙 암기를 위해", "처벌을 줄이기 위해", "서로 존중하는 문화를 만들기 위해", "성적을 올리기 위해"], answer: 2 },
            { q: "다음 중 공정한 학급 운영에 가까운 것은?", options: ["교사의 판단만 따른다", "일부 학생에게 특혜를 준다", "합리적인 기준을 적용한다", "힘센 학생이 결정한다"], answer: 2 },
            { q: "인권 침해 상황을 목격했을 때 바람직한 태도는?", options: ["방관한다", "재미로 본다", "문제 해결을 돕는다", "촬영해 공유한다"], answer: 2 },
            { q: "학교에서 평등이 실현되었다고 보기 어려운 경우는?", options: ["배경을 이유로 배제한다", "개인 차이를 고려한다", "필요에 따라 지원을 제공한다", "참여 기회를 보장한다"], answer: 0 },
            { q: "다음 중 차별적 행동이 아닌 것은?", options: ["성별로 활동을 제한한다", "장애를 이유로 배제한다", "학습에 필요한 도움을 제공한다", "외모를 이유로 놀린다"], answer: 2 },
            { q: "인권과 책임의 관계에 대한 설명으로 옳은 것은?", options: ["인권만 있고 책임은 없다", "책임은 인권보다 중요하다", "인권을 존중하려면 책임도 필요하다", "책임은 교사만의 몫이다"], answer: 2 },
            { q: "학교에서 인권·평등·차별 문제를 다루는 궁극적인 목적은?", options: ["위대하신 도덕 선생님을 위해", "규칙을 강화하기 위해", "처벌을 늘리기 위해", "모두가 존중받는 공동체를 만들기 위해"], answer: 3 }
        ]
    }
  ];

  const enterStage = (index) => {
    if (index === 0 || stageProgress[index - 1]) {
      setActiveStage(index);
      setCurrentView('stage');
      setCurrentQuestion(0);
      setShowStageComplete(false);
      setStageFailed(false);
      
      const newScores = [...stageScores];
      newScores[index] = 0;
      setStageScores(newScores);
      
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    }
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const correct = index === stages[activeStage].questions[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      const newScores = [...stageScores];
      newScores[activeStage]++;
      setStageScores(newScores);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < stages[activeStage].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowResult(false);
    } else {
      if (stageScores[activeStage] === 10) {
        const newProgress = [...stageProgress];
        newProgress[activeStage] = true;
        setStageProgress(newProgress);
        
        const newPasswords = [...passwords];
        newPasswords[activeStage] = stages[activeStage].password;
        setPasswords(newPasswords);
        setStageFailed(false);
      } else {
        setStageFailed(true);
      }
      setShowStageComplete(true);
    }
  };

  const handleStageCompleteClose = () => {
    const totalScore = stageScores.reduce((acc, curr) => acc + curr, 0);
    setScore(totalScore);
    
    setShowStageComplete(false);
    setStageFailed(false);
    setCurrentView('map');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = passwords.join('');
    if (passwordInput === correctPassword) {
      setCurrentView('ending');
      setPasswordError('');
    } else {
      setPasswordError('비밀번호가 틀렸습니다! 다시 시도해보세요.');
    }
  };

  if (showStageComplete && activeStage !== null) {
    const currentStage = stages[activeStage];
    const isSuccess = stageScores[activeStage] === 10;
    
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            {isSuccess ? (
              <>
                <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl font-bold text-green-600 mb-4">✨ 정화 성공! ✨</h2>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-4xl font-bold text-red-600 mb-4">❌ 정화 실패...</h2>
                <p className="text-xl text-gray-700 mb-4">
                  {stageScores[activeStage]}/10 문제를 맞혔습니다
                </p>
              </>
            )}
          </div>
          <div className="mb-6">
            <img src={currentStage.pokemonImg} alt={currentStage.pokemonName} className="w-48 h-48 mx-auto mb-4" style={{ imageRendering: 'pixelated' }} />
          </div>
          <div className={`${isSuccess ? 'bg-green-50' : 'bg-red-50'} p-6 rounded-xl mb-6`}>
            <p className="text-lg text-gray-800 whitespace-pre-line leading-relaxed">
              {isSuccess ? currentStage.successMsg : currentStage.failMsg}
            </p>
          </div>
          {isSuccess ? (
            <>
              <div className="bg-purple-50 p-6 rounded-xl mb-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Key className="w-6 h-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-purple-900">암호 획득!</h3>
                </div>
                <p className="text-center text-4xl font-bold text-purple-600">{currentStage.password}</p>
              </div>
              <button onClick={handleStageCompleteClose} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all">맵으로 돌아가기</button>
            </>
          ) : (
            <>
              <div className="bg-orange-50 p-6 rounded-xl mb-6 border-l-4 border-orange-500">
                <p className="text-orange-900 font-semibold">모든 문제를 맞춰야 암호를 획득할 수 있습니다!<br/>다시 도전해보세요!</p>
              </div>
              <button onClick={handleStageCompleteClose} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all">다시 도전하기</button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (currentView === 'map') {
    return <MapScreen stages={stages} stageProgress={stageProgress} enterStage={enterStage} score={score} onEnterPassword={() => setCurrentView('password')} />;
  }

  if (currentView === 'password') {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 flex items-center justify-center">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🔐</div>
              <h2 className="text-3xl font-bold text-purple-900 mb-2">최종 관문</h2>
              <p className="text-gray-600">4개의 암호를 순서대로 입력하세요</p>
            </div>
            <div className="mb-6">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {passwords.map((pwd, i) => (
                  <div key={i} className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-500 mb-1">{i + 1}번</div>
                    <div className="text-sm font-bold text-purple-700">{pwd || '?'}</div>
                  </div>
                ))}
              </div>
            </div>
            <input type="text" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="비밀번호 입력" className="w-full p-4 border-2 border-purple-300 rounded-xl mb-4 text-lg text-center font-bold focus:border-purple-500 focus:outline-none" />
            {passwordError && <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">{passwordError}</div>}
            <button onClick={handlePasswordSubmit} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all">탈출하기!</button>
            <button onClick={() => setCurrentView('map')} className="w-full mt-3 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all">돌아가기</button>
          </div>
        </div>
      );
  }

  if (currentView === 'ending') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-4xl font-bold text-purple-900 mb-4">탈출 성공!</h1>
          <div className="text-8xl font-bold text-yellow-500 mb-4">100점</div>
          <p className="text-xl text-gray-700 mb-6">최종 점수: <span className="font-bold text-purple-600">{score}/40</span></p>
          <div className="bg-purple-50 p-6 rounded-xl mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">단순히 문제를 맞혀서가 아닙니다. 당신이 보여준 배려와 존중의 마음 때문입니다.</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-purple-700 font-bold text-xl"><Award className="w-8 h-8" /><span>진정한 도덕 마스터</span><Sparkles className="w-8 h-8" /></div>
        </div>
      </div>
    );
  }

  const currentStage = stages[activeStage];
  const question = currentStage.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentStage.questions.length) * 100;
  const labels = ['①', '②', '③', '④'];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${currentStage.color} p-4 flex flex-col`}>
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={currentStage.pokemonImg} alt={currentStage.pokemonName} className="w-16 h-16" style={{ imageRendering: 'pixelated' }} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{currentStage.name}</h2>
                <p className="text-sm text-gray-600">{currentStage.theme}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-purple-600 font-bold"><Heart className="w-5 h-5" /><span>{score}/40</span></div>
              <div className="text-sm text-gray-500">이번 스테이지: {stageScores[activeStage]}/10</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">{currentStage.situation}</p>
          <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
            <p className="text-orange-800 font-bold">미션: {currentStage.mission}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-start gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
            <h3 className="text-xl font-semibold text-gray-800">{question.q}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                  showResult
                    ? selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : 'bg-red-100 border-2 border-red-500 text-red-800'
                      : 'bg-gray-100 text-gray-400'
                    : selectedAnswer === index
                    ? 'bg-purple-100 border-2 border-purple-500 text-purple-800'
                    : 'bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{labels[index]}</span>
                  <span className="text-base">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`mt-6 p-6 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrect ? (
                  <span className="text-2xl font-bold text-green-700">정답입니다! ✨</span>
                ) : (
                  <span className="text-xl font-bold text-red-700">틀렸습니다! 다시 한번 생각해보세요.</span>
                )}
              </div>
              <button onClick={handleNext} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                {currentQuestion < currentStage.questions.length - 1 ? '다음 문제' : '결과 확인'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center">
            <button onClick={() => setCurrentView('map')} className="px-6 py-3 bg-white/90 text-purple-700 font-bold rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all">← 맵으로 돌아가기</button>
        </div>
      </div>
    </div>
  );
};

export default PokemonEscapeGame;