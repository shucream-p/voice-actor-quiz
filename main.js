const { Quiz } = require('enquirer')
const data = require('./data.js')

class VoiceActorQuiz {
  constructor () {
    this.point = 0
  }

  async start () {
    const quizzes = this.quizzesShuffle(data)
    for (let i = 0; i < quizzes.length; i++) {
      await this.giveQuiz(quizzes[i])
    }
    console.log(`結果は${this.point}点でした。`)
    console.log('お疲れ様でした。')
  }

  async giveQuiz (question) {
    const prompt = new Quiz(question)
    const answer = await prompt.run()
    if (answer.correct) {
      console.log(`正解！ 担当声優は${prompt.actor}さんです。\n`)
      this.point += 10
    } else {
      console.log(`不正解！ 正解は「${answer.correctAnswer}」です。担当声優は${prompt.actor}さんです。\n`)
    }
  }

  quizzesShuffle (data) {
    for (let i = data.length - 1; i >= 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [data[i], data[r]] = [data[r], data[i]]
    }
    return data
  }
}

new VoiceActorQuiz().start()
