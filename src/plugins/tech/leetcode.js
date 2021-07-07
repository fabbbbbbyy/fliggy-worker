const puppeteer = require("puppeteer");
const {
  MessageActionRow,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");
const usageError = require("../../errors/_correctusage");

async function handle(message, args, client) {
  if (args) {
    return message.reply(usageError.errorMessage("leetcode"));
  }

  const Option1 = new MessageMenuOption()
    .setLabel("Arrays")
    .setDescription("Hurray for arrays!")
    .setEmoji("🤹")
    .setValue("array");

  const Option2 = new MessageMenuOption()
    .setLabel("Linked Lists")
    .setDescription("Linked-lists?")
    .setEmoji("➡️")
    .setValue("linked-list");

  const Option3 = new MessageMenuOption()
    .setLabel("Strings")
    .setDescription("Ugh... cobwebs.")
    .setEmoji("🕸")
    .setValue("string");

  const Option4 = new MessageMenuOption()
    .setLabel("Hash Tables")
    .setDescription("Everyone's favourite structure!")
    .setEmoji("🪑")
    .setValue("hash-table");

  const Option5 = new MessageMenuOption()
    .setLabel("Dynamic Programmings")
    .setDescription("Fancy name for recursion.")
    .setEmoji("👥")
    .setValue("dynamic-programming");

  const Option6 = new MessageMenuOption()
    .setLabel("Maths")
    .setDescription("Extremely rare 'algorithm' questions.")
    .setEmoji("💯")
    .setValue("math");

  const Option7 = new MessageMenuOption()
    .setLabel("Sorting")
    .setDescription("Sorting is easier online..?")
    .setEmoji("🧺")
    .setValue("sorting");

  const Option8 = new MessageMenuOption()
    .setLabel("Trees")
    .setDescription("Greens, I wish.")
    .setEmoji("🌳")
    .setValue("tree");

  const Option9 = new MessageMenuOption()
    .setLabel("Depth-First Search")
    .setDescription("DEEP DIVE!")
    .setEmoji("🏄🏿‍♂️")
    .setValue("depth-first-search");

  const Option10 = new MessageMenuOption()
    .setLabel("Breadth-First Search")
    .setDescription("Skimming the surfaces till we get something.")
    .setEmoji("👨🏿‍🦯")
    .setValue("breadth-first-search");

  const Option11 = new MessageMenuOption()
    .setLabel("Greedy")
    .setDescription("Sadly, a topic - not one of the 7 sins.")
    .setEmoji("👨🏼‍🌾")
    .setValue("greedy");

  const Option12 = new MessageMenuOption()
    .setLabel("Matrices")
    .setDescription("Blue pill, anyone?")
    .setEmoji("💊")
    .setValue("matrix");

  const Option13 = new MessageMenuOption()
    .setLabel("Stacks")
    .setDescription("Let'su go, it'su me, Mario!")
    .setEmoji("👷🏻‍♂️")
    .setValue("stack");

  const Option14 = new MessageMenuOption()
    .setLabel("Heaps")
    .setDescription("Another word for Priority Queue.")
    .setEmoji("🚵‍♂️")
    .setValue("heap-priority-queue");

  const Option15 = new MessageMenuOption()
    .setLabel("Graphs")
    .setDescription("Different from the ones you see in Math.")
    .setEmoji("💹")
    .setValue("graph");

  const Option16 = new MessageMenuOption()
    .setLabel("Recursion")
    .setDescription("Recursion.. Recursion.. Recur-")
    .setEmoji("🔄")
    .setValue("recursion");

  const Option17 = new MessageMenuOption()
    .setLabel("Divide and Conquer")
    .setDescription("Divide || Conquer")
    .setEmoji("👐")
    .setValue("divide-and-conquer");

  const Option18 = new MessageMenuOption()
    .setLabel("Queues")
    .setDescription("Aren't I supposed to be first?")
    .setEmoji("🚶‍♂️")
    .setValue("queue");

  const Menu = new MessageMenu()
    .setID("LeetCode Menu")
    .setPlaceholder("Bring me up, drop me down.")
    .addOption(Option1)
    .addOption(Option2)
    .addOption(Option3)
    .addOption(Option4)
    .addOption(Option5)
    .addOption(Option6)
    .addOption(Option7)
    .addOption(Option8)
    .addOption(Option9)
    .addOption(Option10)
    .addOption(Option11)
    .addOption(Option12)
    .addOption(Option13)
    .addOption(Option14)
    .addOption(Option15)
    .addOption(Option16)
    .addOption(Option17)
    .addOption(Option18)
    .setMaxValues(1)
    .setMinValues(1);

  const Row1 = new MessageActionRow().addComponent(Menu);

  await message.reply("\`Please give the command some time after selecting an option.\`", { components: [Row1] });

  client.on("clickMenu", async (menu) => {
    menu.reply.defer();
    const menuValue = menu.values[0];
    const apiKey = process.env.LEETCODE_API;

    let data;

    async function loadPage() {
      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox','--disable-setuid-sandbox']
        })
        const [page] = await browser.pages();

        await page.goto(`${apiKey}${menuValue}/`, {
          waitUntil: "networkidle0",
        });
        data = await page.evaluate(() => {
          const x = document.querySelectorAll("a");
          let array = [];
          for (let i = 0; i < x.length; i++) {
            const nametext = x[i].textContent;
            const cleantext = nametext.replace(/\s+/g, " ").trim();
            const cleanlink = x[i].href;
            if (cleanlink.includes("problems/")) {
              array.push([cleantext, cleanlink]);
            }
          }
          return array;
        });

        await browser.close();
      } catch (err) {
        console.error(err);
      }
    }

    await loadPage();

    const randomElement = data[Math.floor(Math.random() * data.length)];

    const optionArray = menuValue.split("-");

    let option = optionArray[0].charAt(0).toUpperCase() + optionArray[0].slice(1);

    if (optionArray.length > 1) {
        for (let i = 1; i < optionArray.length; i++) {
            option += " " + optionArray[i].charAt(0).toUpperCase() + optionArray[i].slice(1);
        }
    }
    
    menu.message.edit("**Because you waited...**", {components: null});

    return message.reply({
        embed: {
            description: `A special LeetCode question, just for you.\n`,
            url: "https://www.leetcode.com",
            color: 9160786,
            author: {
              name: `LeetCode Topic - ${option}`,
              url: "https://www.leetcode.com",
              icon_url:
                "https://cdn.discordapp.com/attachments/861239068401860660/861983011078406194/LeetCode_logo_black.png"
            },
            fields: [
                {
                    name: randomElement[0],
                    value: `${randomElement[1]}\n`
                }
            ]
          }
    });
  });
}

const options = {
  name: "leetcode",
};

module.exports = {
  handle,
  options,
};
