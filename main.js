#!/usr/bin/env node

const { Select } = require('enquirer')
const { Quiz } = require('enquirer')
const data = require('./data.js')

class VoiceActorQuiz {
  constructor () {
    this.point = 0
  }

  async start () {
    const firstMessage = `声優クイズを始めます！
出題されるキャラクターの担当声優さんが、他に演じているキャラクターを3択の中から選んでください。
※「オタク向け」は10問以上用意してるので、是非、何回も遊んでみてね！
`
    console.log(firstMessage)
    const quizzes = await this.#quizzesShuffle()

    for (let i = 0; i < 10; i++) {
      await this.#giveQuiz(quizzes[i])
    }
    this.showLastmessage()
  }

  async #quizzesShuffle () {
    const quizzes = await this.#getQuizzes()
    return await this.#arrayShuffle(quizzes)
  }

  async #getQuizzes () {
    this.level = await this.#selectLevel()

    if (this.level === '一般向け') {
      return data.beginner
    } else {
      return data.advenced
    }
  }

  async #selectLevel () {
    const prompt = new Select({
      name: 'level',
      message: '難易度を選んでね。',
      choices: ['一般向け', 'オタク向け']
    })
    return await prompt.run()
  }

  #arrayShuffle (array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      [array[i], array[r]] = [array[r], array[i]]
    }
    return array
  }

  async #giveQuiz (question) {
    const prompt = new Quiz(question)
    const answer = await prompt.run()
    if (answer.correct) {
      console.log(`正解！ 担当声優は${prompt.actor}さんです。\n`)
      this.point += 10
    } else {
      console.log(`不正解！ 正解は「${answer.correctAnswer}」です。担当声優は${prompt.actor}さんです。\n`)
    }
  }

  showLastmessage () {
    console.log(`結果は${this.point}点でした。`)
    if (this.level === '一般向け') {
      if (this.point >= 80) {
        console.log('合格です！あなたはオタクの才能があります。是非、オタク向けにも挑戦してみてね！')
      } else {
        console.log('残念！不合格です〜。是非、また挑戦してみてね！')
      }
    } else {
      if (this.point >= 80) {
        console.log('合格です！かなり熱心にアニメを見ていますね！素晴らしい！是非、また遊んでみてね！')
      } else if (this.point >= 50) {
        console.log('惜しい！不合格です〜。しかし、なかなかに詳しいですね。是非、また挑戦してみてね！')
      } else {
        console.log('残念！不合格です〜。是非、また挑戦してみてね！')
      }
    }
    console.log('お疲れ様でした。')
  }
}

new VoiceActorQuiz().start()
