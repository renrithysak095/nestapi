import { Injectable } from '@nestjs/common';
import { Command, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class AppService {

  private bot: Telegraf;
  private defaultCommand;

  constructor() {
    this.bot = new Telegraf('6372749520:AAGv8HVh2GCyvlGAv17Hh58ayQA-3xbuhsI');
    // this.setupBotCommands();
    this.startBot();
    this.userReply();
    // this.firebaseSetup();
  }

  // Initialize DB with FireBase
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

  // Default Bot Commmand
  private setupBotCommands() {

     this.defaultCommand = [
      { command: 'sak'},
      { command: 'vita'},
      { command: 'run'},
      { command: 'sokhen'},
      { command: 'soreach'},
      { command: 'hav'},
      { command: 'seyha'},
      { command: 'phak'},
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

  // Getting start with BOT.
  private async startCommand(ctx: Context) {
    await ctx.reply('🔔 Connected with RSSScanderBOT Successfully.');
  }

  private async userReply(){
    this.bot.on('text', (ctx: Context) => {
      var chatId = ctx.message.chat.id.toString();
      var messages = ctx?.text.split('@')[0].toLocaleLowerCase();
      // B2B Talking
      if(chatId == '-1001883283529'){
        if(messages == '/sak'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FSak.jpg?alt=media&token=f7a6705b-37f2-47db-b6a4-d238674238f9')
        }else if(messages == '/boolin'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20BooLin.jpg?alt=media&token=ff5bd688-b93f-4ca8-819c-0c118c35d9be')
        }else if(messages == '/both'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Both.jpg?alt=media&token=b0a4b658-7ab8-40ef-aa42-b8a36a92be7b')
        }else if(messages == '/chivorn'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Chiron.jpg?alt=media&token=6b34ad53-4972-463c-9d09-1d6c994fd9fc')
        }else if(messages == '/khaw'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Khaw.jpg?alt=media&token=569b5c90-bfad-47c7-bd74-b773da5a7498')
        }else if(messages == '/vimean'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Mean.jpg?alt=media&token=2ddb9820-32aa-42f4-9fde-82055e64654c')
        }else if(messages == '/bratha'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Ratha.jpg?alt=media&token=7ade5901-79d9-4332-9edc-62e484017dba')
        }else if(messages == '/vanda'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20Vanda.jpg?alt=media&token=4a77c30c-02fb-44d5-be0d-4da2783f74d7')
        }else if(messages == '/yuth'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FB%20yuth.jpg?alt=media&token=35c4b10c-3dec-4459-9a9f-b0a4ab621c59')
        }else if(messages == '/sokhen'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FSokhen.jpg?alt=media&token=a13afe27-a70b-4a3c-b3c0-db35c3af6ed3')
        }else if(messages == '/vita'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/b2b%2FVita.png?alt=media&token=50eb0adc-353d-49d7-85f0-97499c277d5c')
        }
      } // HRD Passed
      else if(chatId == '-1001833768106'){
        if(messages == '/sak'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_15-09-26.jpg?alt=media&token=0dfa422e-14c6-4c3c-926a-832ad0876bab');
        }else if(messages == '/vita'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/qrvv.png?alt=media&token=bce134be-3c9d-494c-bf46-12dfcbd2e5ee');
        }else if(messages == '/sokhen'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-02-29_14-21-44.jpg?alt=media&token=34128624-7fe5-4471-85e7-028489a436b8');
        }else if(messages == '/hav'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_18-28-03.jpg?alt=media&token=b42ab2c8-8c33-4527-9dd3-6972d4e8eaaf');
        }else if(messages == '/seyha'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_18-29-14.jpg?alt=media&token=e1497c23-d17f-4401-824f-3d5af5f3874d');
        }else if(messages == '/phak'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-02-24_23-43-11.jpg?alt=media&token=88b29c92-e369-42f1-93ef-981cc58d1c68');
        }else if(messages == '/rgsex'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_19-08-20.jpg?alt=media&token=55fbf9f3-c67f-4387-943f-c72f006d2dd1')
        }else if(messages == '/lovealone'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_19-08-35.jpg?alt=media&token=8412b306-f797-4c50-bfdd-59fe82b9716a')
        }else if(messages == '/gay'){
          ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/gay.jpg?alt=media&token=cde09f73-5133-4d69-912f-a33730dd7e56')
        }
        // else if(messages == '/hacker'){
        //   ctx.sendPhoto('https://firebasestorage.googleapis.com/v0/b/nestapi-1188a.appspot.com/o/photo_2024-03-04_18-20-48.jpg?alt=media&token=5fbed5de-602e-4b31-9deb-b090a3b79cff');
        //  }
      }

    });
  }

}