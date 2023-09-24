import { useEffect, useState } from "react";

export const useUtterance = () => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance| null>(null);
  useEffect(() => {
    // 在组件加载时设置语音合成引擎的语音
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const firstVoice = voices[0];
      // 选择你需要的语音，这里选择第一个语音作为示例
      if (firstVoice) {
       const curUtterance = new SpeechSynthesisUtterance();
      curUtterance.voice = firstVoice;
      setUtterance(curUtterance);
      }
    };

    // 监听语音加载事件
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // 初始化语音
    loadVoices();

    // 清理事件监听器
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return utterance;
}