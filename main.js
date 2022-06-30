const { Quiz } = require('enquirer')
const data = require('./data.js')

class VoiceActorQuiz {
  async start () {
    for (let i = 0; i < data.length; i++) {
      await this.giveQuiz(data[i])
    }
    console.log('お疲れ様でした。')
  }

  async giveQuiz (question) {
    const prompt = new Quiz(question)
    const answer = await prompt.run()
    if (answer.correct) {
      console.log(`正解！ 担当声優は${prompt.actor}さんです。\n`)
    } else {
      console.log(`不正解！ 正解は「${answer.correctAnswer}」です。担当声優は${prompt.actor}さんです。\n`)
    }
  }
}

new VoiceActorQuiz().start()
