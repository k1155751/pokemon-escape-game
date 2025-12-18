import React from 'react';
import {
  Heart,
  Lock,
  Check,
  Key
} from 'lucide-react';

// 🎮 게임 느낌 UI 개선 버전 (맵 화면 중심)
// 기존 PokemonEscapeGame에서 map 화면 부분만 교체해서 사용하세요

const MapScreen = ({ stages, stageProgress, enterStage, score }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e1b4b,_#020617)] p-8">
      <div className="max-w-6xl mx-auto">

        {/* 타이틀 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
            🕵️ 포켓몬 방탈출
          </h1>
          <p className="mt-3 text-xl text-purple-300">도덕 0점의 저주</p>
          <div className="mt-6 inline-flex items-center gap-3 bg-black/40 px-6 py-3 rounded-full text-white">
            <Heart className="w-6 h-6 text-pink-400" />
            <span className="font-bold text-lg">총 점수 {score} / 40</span>
          </div>
        </div>

        {/* 스테이지 맵 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stages.map((stage, index) => {
            const locked = index > 0 && !stageProgress[index - 1];
            const cleared = stageProgress[index];

            return (
              <div
                key={index}
                onClick={() => !locked && enterStage(index)}
                className={`relative group cursor-pointer transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border-4 ${
                  locked
                    ? 'border-gray-700 bg-gray-900/60 cursor-not-allowed'
                    : cleared
                    ? 'border-green-400 bg-gradient-to-br from-green-500 to-emerald-600'
                    : `border-white/30 bg-gradient-to-br ${stage.color}`
                } hover:scale-105`}
              >
                {/* 잠금 표시 */}
                {locked && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                    <Lock className="w-16 h-16 text-white" />
                  </div>
                )}

                {/* 클리어 표시 */}
                {cleared && !locked && (
                  <div className="absolute top-3 right-3 bg-green-600 rounded-full p-2 z-10">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* 카드 내용 */}
                <div className="p-6 text-center text-white">
                  <img
                    src={stage.pokemonImg}
                    alt={stage.pokemonName}
                    className="w-32 h-32 mx-auto drop-shadow-xl mb-4 group-hover:animate-bounce"
                    style={{ imageRendering: 'pixelated' }}
                  />

                  <h2 className="text-2xl font-extrabold mb-1">
                    {stage.emoji} {stage.name}
                  </h2>
                  <p className="text-sm opacity-90 mb-2">{stage.theme}</p>

                  <div className="text-xs bg-black/30 rounded-full px-3 py-1 inline-block">
                    보스: {stage.pokemonName}
                  </div>

                  {cleared && (
                    <div className="mt-4 flex items-center justify-center gap-2 bg-black/40 py-2 rounded-xl">
                      <Key className="w-4 h-4 text-yellow-400" />
                      <span className="font-bold">암호 {stage.password}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 안내 */}
        <div className="mt-12 text-center text-purple-200 text-sm">
          ▶ 클리어한 스테이지 순서대로 진행하세요
        </div>
      </div>
    </div>
  );
};

export default MapScreen;