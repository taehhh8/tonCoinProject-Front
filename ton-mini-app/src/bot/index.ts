import { Telegraf, Context } from "telegraf";
import { Message } from "telegraf/types";
import { config } from "./config";

const { BOT_TOKEN, WEBAPP_URL } = config;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(BOT_TOKEN);

// 인터페이스 정의
interface WebAppInfo {
  url: string;
}

interface InlineKeyboardButton {
  text: string;
  web_app: WebAppInfo;
}

interface ReplyMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface ReplyOptions {
  reply_markup: ReplyMarkup;
}

// Context 타입 정의
interface BotContext extends Context {
  reply: (text: string, extra?: ReplyOptions) => Promise<Message.TextMessage>;
}

// Basic commands
bot.command("start", (ctx: BotContext) => {
  ctx.reply("Welcome to TaskVaultBot! 🚀\nUse /help to see available commands.");
});

bot.command("help", (ctx: BotContext) => {
  ctx.reply(
    "Available commands:\n" +
      "/start - Start the bot\n" +
      "/help - Show this help message\n" +
      "/webapp - Open the Mini App"
  );
});

bot.command("webapp", (ctx: BotContext) => {
  ctx.reply("Open Web App", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open App",
            web_app: {
              url: WEBAPP_URL || "",
            },
          },
        ],
      ],
    },
  });
});

bot.launch().then(() => {
  console.log("Bot is running...");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
