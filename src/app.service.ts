import { Injectable } from '@nestjs/common';
import { Command, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class AppService {

  private bot: Telegraf;
  private defaultCommand;

  constructor() {
    this.bot = new Telegraf('6372749520:AAGv8HVh2GCyvlGAv17Hh58ayQA-3xbuhsI');
    this.setupBotCommands();
    this.startBot();
    this.userReply();
    // this.firebaseSetup();
  }

  // Initialize DB
  private firebaseSetup(){

    const { initializeApp } = require('firebase-admin/app');
    const { getFirestore } = require('firebase-admin/firestore');
    const admin = require('firebase-admin');

    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.GOOGLE_CLOUD_PROJECT // Use environment variable here
    });
    
    const db = getFirestore();
    var test = db.collection('sak-aba').doc('zRCB4078GlcZ1hxWzt1n');
    test.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    });
  }

  private setupBotCommands() {

     this.defaultCommand = [
      { command: 'sak', description: 'REN RITHYSAK -> 002 475 750' },
      { command: 'vita', description: 'REN RITHYSAK -> 002 475 750' },
      { command: 'run', description: 'REN RITHYSAK -> 002 475 750' },
      { command: 'sokhen', description: 'REN RITHYSAK -> 002 475 750' },
      { command: 'soreach', description: 'REN RITHYSAK -> 002 475 750' },
    ];

    this.bot.telegram.setMyCommands(this.defaultCommand).then(() => {
      console.log('Default bot commands set up successfully');
    }).catch((error) => {
      console.error('Error setting up default bot commands:', error);
    });
  }

  private startBot() {
    this.bot.start((ctx: Context) => {
      this.startCommand(ctx)
    });
    this.bot.launch().then(() => {
      console.log('Telegram bot started!');
    });
  }

  private async startCommand(ctx: Context) {
    await ctx.reply('🔔 Connected with RSSScanderBOT Successfully.');
  }

  private async userReply(){
    this.bot.on('text', (ctx: Context) => {
      var messages = ctx?.text;
      console.log("msg: ", messages)
    });
  }

}