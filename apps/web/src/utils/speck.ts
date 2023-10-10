class SpeechSynthesisSingleton {
  private static instance: SpeechSynthesisSingleton | null = null;
  private synthesis: SpeechSynthesis;
  private cancelCurrent: boolean;

  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.cancelCurrent = false;

    // 监听朗读结束事件，以便处理队列中的下一个文本
    this.synthesis.addEventListener('end', () => {
      if (!this.cancelCurrent) {
        this.readNext();
      } else {
        this.cancelCurrent = false;
      }
    });
  }

  public static getInstance(): SpeechSynthesisSingleton {
    if (!SpeechSynthesisSingleton.instance) {
      SpeechSynthesisSingleton.instance = new SpeechSynthesisSingleton();
    }
    return SpeechSynthesisSingleton.instance;
  }

  public speak(text: string, replaceCurrent = true, queue = false): void {
    // 如果 replaceCurrent 为 true，则取消当前的朗读
    if (replaceCurrent) {
      this.cancelCurrent = true;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = this.synthesis.getVoices();
    const firstVoice = voices[0];

    // 检查 voices 是否已准备好
    if (!firstVoice) {
      this.synthesis.addEventListener('voiceschanged', () => {
        this.synthesis.speak(utterance);
        if (!queue) {
          this.cancelCurrent = true;
        }
      });
    } else {
      this.synthesis.speak(utterance);
      if (!queue) {
        this.cancelCurrent = true;
      }
    }
  }

  public cancel(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
  }
  // TODO: 实现排队策略
  private readNext(): void {
    // 在队列中取出下一个文本并朗读
    // 这里可以实现排队策略
    // 例如，将待朗读的文本存储在队列中，然后从队列中取出下一个文本并调用 this.speak()
  }
}

const speechSynthesisSingleton = SpeechSynthesisSingleton.getInstance();


export default speechSynthesisSingleton