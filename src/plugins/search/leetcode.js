const puppeteer = require("puppeteer");
const request = require("request");
const {
  MessageActionRow,
  MessageMenu,
  MessageMenuOption,
} = require("discord-buttons");

async function handle(message, args, client) {
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

  await message.reply("\`The command does take a bit of time to gather the best questions for you.\`", { components: [Row1] });

  client.on("clickMenu", async (menu) => {
    menu.reply.defer();
    const menuValue = menu.values[0];
    const apiKey = process.env.LEETCODE_API;

    let data;

    async function loadPage() {
      try {
        const browser = await puppeteer.launch();
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

    let option = optionArray[0];

    if (optionArray.length > 1) {
        for (let i = 1; i < optionArray.length; i++) {
            option += " " + optionArray[i];
        }
    }

    
    menu.message.edit("**Because you waited...**", {components: null});

    return message.reply({
        embed: {
            description: `A special LeetCode question on **${option}**, just for you.\n`,
            url: "https://www.leetcode.com",
            color: "#d6bebe",
            author: {
              name: "LeetCode",
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

// function handle(message, args) {
//   const apikey = process.env.LEETCODE_API;
//   const apiUrl = `${apikey}${encodeURIComponent(args)}`;

//   const loadPage = (async function main() {
//     try {
//       const browser = await puppeteer.launch();
//       const [page] = await browser.pages();

//       await page.goto("https://www.leetcode.com/tag/array/", {
//         waitUntil: "networkidle0",
//       });
//       const data = await page.evaluate(
//         () => {
//           const x = document.querySelectorAll("a");
//           let array = [];
//           for (let i = 0; i < x.length; i++) {
//             const nametext = x[i].textContent;
//             const cleantext = nametext.replace(/\s+/g, " ").trim();
//             const cleanlink = x[i].href;
//             if (cleanlink.includes("problems")) {
//               array.push([cleantext, cleanlink]);
//             }
//           }
//           return array;
//         }
//       );

//       console.log(data);

//       await browser.close();
//     } catch (err) {
//       console.error(err);
//     }
//   })();

// //   const requestBody = {
// //     uri: apiUrl,
// //     gzip: true
// //   }

//   request.get(apiUrl, (error, response, body) => {
//     if (error) {
//       return logger.error(`Stackoverflow gave an error: ${error}!`);
//     }
//     const results = JSON.parse(body).items;
//     if (!results)
//       return message.reply("No results were found for your query.");
//     if (results.length < 1) {
//       return message.reply("No results were found for your query.");
//     } else {
//       let fields = [];
//       for (const result of results) {
//         let tags = "";
//         for (const tag of result.tags) {
//           tags += `\`${tag}\` `;
//         }
//         tags = tags.trim();
//         fields.push({
//           name: result.title,
//           value: `${result.link}\n __**Tags**__: ${tags}`,
//           inline: true
//         })
//       }
//       return message.reply({
//         embed: {
//           description: `Here are your search results for **"${args}"**!\n`,
//           url: "https://www.stackoverflow.com",
//           color: "#d6bebe",
//           author: {
//             name: "StackOverflow",
//             url: "https://www.stackoverflow.com",
//             icon_url:
//               "https://cdn.discordapp.com/attachments/861239068401860660/861896249636945961/768px-Stack_Overflow_icon.svg.png"
//           },
//           fields: fields
//         }
//       })
//     }
//   });
// }

const options = {
  name: "leetcode",
};

module.exports = {
  handle,
  options,
};
