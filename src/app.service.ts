import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
const { GoogleGenerativeAI } = require("@google/generative-ai");

@Injectable()
export class AppService {
  private bot: Telegraf;
  private defaultCommand;

  constructor() {
    this.bot = new Telegraf('6372749520:AAGv8HVh2GCyvlGAv17Hh58ayQA-3xbuhsI');
    // this.setupBotCommands();
    this.startBot();
    // this.firebaseSetup();
    this.setUpMongoDB();
  }

  // Connect With Mongo DB
  private async setUpMongoDB() {
    const { MongoClient } = require('mongodb');
    const url =
      'mongodb+srv://renrithysak095:xQZYJSWqYySsg0eg@cluster0.mqshatw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const client = new MongoClient(url);
    client.connect();
    const db = client.db('bank_images');
    const col = db.collection('bank_images');
    this.userReply(col);
  }

  // Initialize DB with FireBase
  private firebaseSetup() {
    const { initializeApp } = require('firebase-admin/app');
    const { getFirestore } = require('firebase-admin/firestore');
    const admin = require('firebase-admin');

    const serviceAccount = JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS,
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.GOOGLE_CLOUD_PROJECT, // Use environment variable here
    });

    const db = getFirestore();
    var test = db.collection('sak-aba').doc('zRCB4078GlcZ1hxWzt1n');
    test.get().then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data());
      } else {
        console.log('No such document!');
      }
    });
  }

  // Default Bot Commmand
  private setupBotCommands() {
    this.defaultCommand = [
      { command: 'sak' },
      { command: 'vita' },
      { command: 'run' },
      { command: 'sokhen' },
      { command: 'soreach' },
      { command: 'hav' },
      { command: 'seyha' },
      { command: 'phak' },
    ];

    this.bot.telegram
      .setMyCommands(this.defaultCommand)
      .then(() => {
        console.log('Default bot commands set up successfully');
      })
      .catch((error) => {
        console.error('Error setting up default bot commands:', error);
      });
  }

  private startBot() {
    this.bot.start((ctx: Context) => {
      this.startCommand(ctx);
    });
    this.bot.launch().then(() => {
      console.log('Telegram bot started!');
    });
  }

  // Getting start with BOT.
  private async startCommand(ctx: Context) {
    await ctx.reply('🔔 Connected with RSSScanderBOT Successfully.');
  }

  private async userReply(result: any) {
    this.bot.on('text', async (ctx: Context) => {
      try {
        var chatId = ctx.message.chat.id.toString();
        var messages = ctx?.text.split('@')[0].toLocaleLowerCase();
        const filter = { command: messages };
        var show = await result.findOne(filter);
        if (show) {
          // B2B Talking
          if (chatId == '-1001883283529') {
            if (
              (
                show?.command == '/sak' ||
                show?.command == '/vita' ||
                show?.command == '/bongratha' ||
                show?.command == '/both' ||
                show?.command == '/boolin' ||
                show?.command == '/yuth' ||
                show?.command == '/chivorn' ||
                show?.command == '/vimean' ||
                show?.command == '/sokhen'
              )
            ) {
              ctx.sendPhoto(show?.image);
            }else if(messages.startsWith('~')){
              ctx.sendMessage(await getInput(messages));
            }
          } // HRD Passed
          else if (chatId == '-1001833768106') {
            if(messages.startsWith('~')){
              ctx.sendMessage(await getInput(messages));
            }else{
              ctx.sendPhoto(show?.image);
            }
          }
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    });
  }
}


// User input Prompt
 async function getInput(prompt){
  const genAI = new GoogleGenerativeAI('AIzaSyD7WWk5s6ja_mRXGmwm5YUJgl-VaqYPe2E');
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}