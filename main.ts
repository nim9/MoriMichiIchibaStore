import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const areaPageUrl = "https://morimichiichiba.jp/area/";

const categoryKeywords: { [key: string]: string[] } = {
  alcohol: [
    "アルコール",
    "酒",
    "ビール",
    "ワイン",
    "焼酎",
    "ウイスキー",
    "リキュール",
    "カクテル",
    "スピリッツ",
    "サワー",
    "チューハイ",
    "シャンパン",
    "ハイボール",
  ],
  drink: [
    "コーヒー",
    "珈琲",
    "カフェラテ",
    "ジュース",
    "ソーダ",
    "ミルク",
    "スムージー",
    "炭酸飲料",
    "茶",
    "チャイ",
    "スポーツドリンク",
    "エナジードリンク",
    "アイスコーヒー",
    "フラペチーノ",
    "ミルクシェイク",
    "ティー",
  ],
  meal: [
    "おつまみ",
    "スナック",
    "フルーツ",
    "サラダ",
    "肉",
    "魚",
    "野菜",
    "乳製品",
    "パン",
    "飯",
    "麺類",
    "寿司",
    "鍋",
    "チキン",
    "ピザ",
    "パスタ",
    "カレー",
    "カリー",
    "ビリヤニ",
    "タンドリーチキン",
    "スパゲッティ",
    "スープ",
    "サンドイッチ",
    "ハンバーガー",
    "タコス",
    "フライドポテト",
    "グラタン",
    "オムライス",
    "餃子",
    "焼き鳥",
    "天ぷら",
    "刺身",
    "うどん",
    "そば",
    "ラーメン",
    "焼肉",
    "しゃぶしゃぶ",
    "すき焼き",
    "丼",
    "チャーハン",
    "お好み焼き",
    "たこ焼き",
    "もんじゃ焼き",
    "リゾット",
    "キッシュ",
    "シチュー",
    "弁当",
    "おむすび",
    "おにぎり",
    "ソーセージ",
    "ベーグル",
    "パエリア",
    "ケバブ",
  ],
  sweets: [
    "ケーキ",
    "チョコレート",
    "アイスクリーム",
    "クッキー",
    "プリン",
    "菓子",
    "ゼリー",
    "パフェ",
    "タルト",
    "マカロン",
    "ドーナツ",
    "パンケーキ",
    "ワッフル",
    "クレープ",
    "ムース",
    "フルーツ",
    "チーズケーキ",
    "シュークリーム",
    "バウムクーヘン",
    "ティラミス",
    "モンブラン",
    "エクレア",
    "フロランタン",
    "カヌレ",
    "マフィン",
    "ジャム",
  ],
  accessory: [
    "手ぬぐい",
    "カバン",
    "鞄",
    "アクセサリー",
    "財布",
    "ポーチ",
    "バッグ",
    "ベルト",
    "靴",
    "靴下",
    "帽子",
    "時計",
    "キーケース",
    "ハンカチ",
    "ブレスレット",
    "ネックレス",
    "ピアス",
    "イヤリング",
    "リング",
    "ブローチ",
    "ヘアアクセサリー",
    "バッジ",
    "ストラップ",
    "キーホルダー",
    "マグネット",
    "ポストカード",
    "ステッカー",
    "ノート",
    "手帳",
    "カレンダー",
    "メモ帳",
    "付箋",
    "装飾品",
    "ジュエリー",
    "編み",
    "刺繍",
  ],
  activity: [
    "体験",
    "ワークショップ",
    "ツアー",
    "イベント",
    "キャンプ",
    "登山",
    "ヨガ",
    "スポーツ",
    "釣り",
    "陶芸",
    "料理教室",
    "アート",
    "音楽",
    "ダンス",
    "演劇",
    "映画",
    "写真",
    "旅行",
    "観光",
    "似顔絵",
    "ガチャ",
  ],
  goods: [
    "インテリア",
    "文房具",
    "食器",
    "家具",
    "本",
    "雑誌",
    "CD",
    "雑貨",
    "ギター",
    "楽器",
    "花",
    "キャンドル",
    "アロマ",
    "タオル",
    "傘",
    "収納",
    "用品",
    "ハーブボール",
    "芸術品",
    "アンティーク",
    "生活",
    "アウトドア",
    "ギア",
    "DIY",
    "器",
    "置物",
    "木工",
    "グッズ",
    "人形",
    "オブジェ",
    "ブック",
    "クリアファイル",
    "名刺入れ",
  ],
  clothing: [
    "シャツ",
    "ズボン",
    "スカート",
    "ドレス",
    "靴",
    "靴下",
    "ジャケット",
    "コート",
    "帽子",
    "スカーフ",
    "手袋",
    "ベルト",
    "ネクタイ",
    "カーディガン",
    "パーカー",
    "スウェット",
    "ジャージ",
    "水着",
    "下着",
    "パジャマ",
    "ルームウェア",
    "古着",
    "衣類",
    "服",
  ],
};

class DtoStore {
  name: string;
  url: string;
  keywords: string[];
  area: string;
  faqs: Faq[];
  category: string[];
  constructor() {
    this.name = "";
    this.url = "";
    this.keywords = [];
    this.area = "";
    this.faqs = [];
    this.category = [];
  }
}

class Faq {
  question: string;
  answer: string;
  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }
}

class Area {
  name: string;
  url: string;
  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}

let allStores: DtoStore[] = importJson("output/allstore");
if (allStores.length == 0) {
  const areas: Area[] = await getAreas();
  if (areas.length === 0) {
    console.error("No areas found. Please check the area page URL.");
    Deno.exit(-1);
  }
  const areaStores = await getAreaStores(areas);
  allStores = Object.values(areaStores).flat();
  exportJson("output/allstore", allStores);
}

const allQuestions: string[] = createAllQuestions(allStores);

try {
  for (const [key, keywords] of Object.entries(categoryKeywords)) {
    let stores: DtoStore[] = [];

    // store.categoryを更新したいのでforEachを使う
    for (let i = 0; i < allStores.length; i++) {
      if (!allStores[i].name) continue;

      const hasKeywords: string[] = checkKeyword(keywords, allStores[i]);
      if (hasKeywords.length == 0) continue;

      let bufStore: DtoStore = structuredClone(allStores[i]);
      bufStore.keywords = Array.from(hasKeywords);
      bufStore.category = [key];
      stores.push(bufStore);
      allStores[i].category.push(key);
    }
    await Promise.all([
      exportJson("output/" + key, stores),
      exportTsv("output/" + key, stores, allQuestions),
    ]);
  }

  let nonCategoryStores: DtoStore[] = allStores.filter(
    (store) => store.category.length === 0
  );
  if (nonCategoryStores.length > 0) {
    await Promise.all([
      exportJson("output/nonCategory", nonCategoryStores),
      exportTsv("output/nonCategory", nonCategoryStores, allQuestions),
    ]);
  }
} catch (error) {
  console.error("Error processing category keywords:", error);
  Deno.exit(-1);
}
Deno.exit(0);

function checkKeyword(keywords: string[], dtoStore: DtoStore): string[] {
  let hasKeywords: string[] = [];
  for (const keyword of keywords) {
    for (const faq of dtoStore.faqs) {
      if (!faq.answer.includes(keyword)) continue;
      const validQuestions = ["自己紹介", "メニュー", "メッセージ"];
      if (!validQuestions.some((q) => faq.question.includes(q))) continue;

      hasKeywords.push(keyword);
      break; // 一つでもキーワードが見つかればループを抜ける
    }
  }
  return hasKeywords;
}

async function exportJson(fileName: string, storeInfos: DtoStore[]) {
  await Deno.mkdir("output", { recursive: true });
  Deno.writeTextFileSync(
    fileName + ".json",
    JSON.stringify(storeInfos, null, 2)
  );
}

function importJson(fileName: string): DtoStore[] {
  try {
    const data = Deno.readTextFileSync(fileName + ".json");
    return JSON.parse(data) as DtoStore[];
  } catch (error) {
    console.error(`Error reading JSON file ${fileName}.json:`, error);
    return [];
  }
}

async function exportTsv(
  fileName: string,
  stores: DtoStore[],
  questions: string[] = []
) {
  await Deno.mkdir("output", { recursive: true });
  const bodyString = stores
    .map((store) => {
      const answers: string[] = questions.map((question) => {
        const faq = store.faqs.find((f) => f.question === question);
        return faq ? faq.answer.replace(/\n/g, " ") : "";
      });
      const row = `${store.name}\t${store.url}\t${store.keywords.join(",")}\t${
        store.area
      }\t${answers.join("\t")}`;
      return row;
    })
    .join("\n");
  Deno.writeTextFileSync(
    fileName + ".tsv",
    ["店舗名", "URL", "キーワード", "エリア"].join("\t") + "\t" + 
      allQuestions.join("\t") +
      "\n" +
      bodyString
  );
}

async function getDom(url: string): Promise<XMLDocument | null> {
  try {
    const resp: Response = await fetch(url);
    if (!resp.ok) {
      console.error(`Failed to fetch ${url}: ${resp.statusText}`);
      return null;
    }
    const source: string = await resp.text();
    const dom = new DOMParser().parseFromString(source, "text/html");
    return dom;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

async function getAreas(): Promise<Area[]> {
  let ret: Area[] = [];
  try {
    const dom = await getDom(areaPageUrl);
    if (!dom) {
      console.error("Failed to parse area page.");
      return ret;
    }
    for (const element of dom.querySelectorAll(".column>.change_link")) {
      const url: string = element.getAttribute("href")?.trim() ?? "";
      if (!url) continue;
      if (!url.startsWith("https://morimichiichiba.jp/area/")) {
        console.warn(`Invalid area URL: ${url}`);
        continue;
      }
      const name: string =
        element.querySelector(".c_title")?.textContent?.trim() || "";
      if (!name) continue;
      ret.push(new Area(name, url));
    }
  } catch (error) {
    console.error("Error fetching area page:", error);
    return [];
  }
  return ret;
}

async function getAreaStores(
  areas: Area[]
): Promise<{ [name: string]: DtoStore[] }> {
  let ret: { [name: string]: DtoStore[] } = {};
  try {
    for (let area of areas) {
      const dom = await getDom(area.url);
      if (!dom) {
        console.error(`Failed to parse area page: ${area.name}`);
        continue;
      }
      ret[area.name] = (
        await Promise.all(
          Array.from(dom.querySelectorAll(".column>a")).map(async (element) => {
            const url: string = element.getAttribute("href")?.trim() || "";
            if (!url) return new DtoStore();
            const store: DtoStore = await getStore(url);
            store.area = area.name;
            return store;
          })
        )
      ).filter((store) => store.name);
    }
  } catch (error) {
    console.error("Error fetching area stores:", error);
    return {};
  }
  return ret;
}

async function getStore(url: string): Promise<DtoStore> {
  const dom = await getDom(url);
  if (!dom) {
    console.error(`Failed to parse store page: ${url}`);
    return new DtoStore();
  }
  const dtoStore = new DtoStore();
  dtoStore.name = dom.querySelector("header>.title")?.textContent?.trim() || "";
  if (!dtoStore.name) {
    console.warn(`Store name not found for URL: ${url}`);
    return new DtoStore();
  }
  dtoStore.url = url;
  dtoStore.keywords = [];
  dtoStore.faqs = [];
  for (const element of Array.from(dom.querySelectorAll(".entry>.textarea"))) {
    const question: string =
      element.querySelector(".sub_title02")?.textContent?.trim() || "";
    if (!question) continue;
    const answer: string =
      element.querySelector(".ans > p")?.textContent?.trim() || "";
    dtoStore.faqs.push(new Faq(question, answer));
  }
  return dtoStore;
}

function createAllQuestions(allStores: DtoStore[]): string[] {
  const questions = allStores
    .filter((store) => store.name)
    .flatMap((store) => store.faqs.map((faq) => faq.question));
  return Array.from(new Set(questions));
}
