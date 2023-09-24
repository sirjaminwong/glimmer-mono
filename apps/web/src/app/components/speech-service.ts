// 创建一个异步朗读函数
export function speakAsync(text: string, lang = "en-US") {
  return new Promise((resolve, reject) => {
    // 检查浏览器是否支持 speechSynthesis
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      const initVoice = voices[0];


      // 检查是否有可用的语音
      if (!initVoice) {
        // 如果没有可用的语音，等待 voiceschanged 事件
        synth.addEventListener("voiceschanged", () => {
          const firstVices = synth.getVoices()[0];
          if (!firstVices) {
            reject(new Error("No available voices"));
          } else {
            // 使用第一个可用的语音朗读文本
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = firstVices;
            utterance.lang = lang;
            synth.speak(utterance);
            resolve(undefined);
          }
        });
      } else {
        // 使用第一个可用的语音朗读文本
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = initVoice;
        utterance.lang = lang;
        synth.speak(utterance);
        resolve(undefined);
      }
    } else {
      reject(new Error("Speech synthesis is not supported in this browser"));
    }
  });
}


// 创建一个异步朗读函数
export function speak(text: string, lang = "en-US") {
    // 检查浏览器是否支持 speechSynthesis
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      const initVoice = voices[0];

      console.log(initVoice ? 'initVoice ready' : 'no initVoice');

      // 检查是否有可用的语音
      if (!initVoice) {
        // 如果没有可用的语音，等待 voiceschanged 事件
        synth.addEventListener("voiceschanged", () => {
          const firstVices = synth.getVoices()[0];
          if (!firstVices) {
            console.error(new Error("No available voices"));
          } else {
            // 使用第一个可用的语音朗读文本
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = firstVices;
            utterance.lang = lang;
            synth.speak(utterance);
            console.log(undefined);
          }
        });
      } else {
        // 使用第一个可用的语音朗读文本
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = initVoice;
        utterance.lang = lang;
        synth.speak(utterance);
        console.log(undefined);
      }
    } else {
      console.error(new Error("Speech synthesis is not supported in this browser"));
    }
}


