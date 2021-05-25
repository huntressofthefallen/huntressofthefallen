const Discord = require('discord.js');
const response = require('./embedcode.js');
const config = require('../SOS-BOT-JS/config.json');

module.exports.english = async (Message) => {
    Message.channel.send(`Remember that Discord limited the message up to 2k Characters... This counted for all the content inside the page including the links... Please count before sending the content in here\n\n**Embed limits**\nThere are a few limits to be aware of while planning your embeds due to the API's limitations. Here is a quick reference you can come back to:\nEmbed titles are limited to 256 character\nEmbed descriptions are limited to 2048 characters\nThere can be up to 25 fields\nA field's name is limited to 256 characters and its value to 1024 characters\nThe footer text is limited to 2048 character\nThe author name is limited to 256 characters\nThe sum of all characters in an embed structure must not exceed 6000 characters\nA bot can have one embed per message\nA webhook can have ten embeds per message`).then(() => {
        Message.channel.send('-\nSend me the prefix').then(() => {
            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 300000, errors: ['time'] })
                .then(collected => {
                    Message.channel.send(`**${collected.first().content}** will be the prefix\n\nIn which page is this content will be in? (Number only) example: 1,2,3,4`); // Prefix
                    const embed_prefix = `${collected.first().content}`;
                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                        .then(collected => {
                            Message.channel.send(`This content will be in **Page ${collected.first().content}**\n\nWhat language is this page? (en/ru/es/de/)`); // Page Number
                            const embed_page = `${collected.first().content}`;
                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                .then(collected => {
                                    Message.channel.send(`This page language code is **${collected.first().content}**\n\nWhat is the title of this embed?`) // Language
                                    const embed_lang = `${collected.first().content.toLowerCase()}`;
                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                        .then(collected => {
                                            Message.channel.send(`This page title is **${collected.first().content}**\n\nNow what is this page description?`) // Page Title
                                            const embed_title = `${collected.first().content}`;
                                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                .then(collected => {
                                                    Message.channel.send(`This page description is: \n${collected.first().content}\n\nIs this page has image embed? (yes/no)`) // Page Description
                                                    const embed_desc = `${collected.first().content}`;
                                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                        .then(collected => {
                                                            const coll = collected.first().content.toLowerCase();
                                                            if (coll === 'yes') {
                                                                Message.channel.send(`You responded with ${collected.first().content}\n\nNow please give me the image url...`)
                                                                const img = `${coll}`;
                                                                Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                    .then(collected => {
                                                                        Message.channel.send(`Your image url is ${collected.first().content}\n\nHow many Fields that this page has? (Please response with number between 0-2)`)
                                                                        const embed_img = `${collected.first().content}`;
                                                                        Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                            .then(collected => {
                                                                                const fieldnum = `${collected.first().content}`;
                                                                                if (fieldnum > 0) {
                                                                                    Message.channel.send(`This page will have ${fieldnum} fields\n\nWhat is the name of 1st Field?`)
                                                                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                        .then(collected => {
                                                                                            const embed_field1t = `${collected.first().content}`;
                                                                                            Message.channel.send(`1st Field Title will be ${embed_field1t}\n\nWhat is the content of the 1st embed?`)
                                                                                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                .then(collected => {
                                                                                                    const embed_field1c = `${collected.first().content}`;
                                                                                                    if (fieldnum > 1) {
                                                                                                        Message.channel.send(`1st Field Content will be ${embed_field1c}\n\nWhat is the 2nd Field Title?`)
                                                                                                        Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                            .then(collected => {
                                                                                                                const embed_field2t = `${collected.first().content}`;
                                                                                                                Message.channel.send(`2nd Field Title will be ${embed_field2t}\n\nWhat is the content of the 2nd embed?`)
                                                                                                                Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                                    .then(collected => {
                                                                                                                        const embed_field2c = `${collected.first().content}`;
                                                                                                                        Message.channel.send(`2nd Field Content will be ${embed_field2c}\n\nYour embed message will look like this:`)
                                                                                                                        const embed = new Discord.MessageEmbed()
                                                                                                                            .setTitle(`${embed_title}`)
                                                                                                                            .setDescription(`${embed_desc}`)
                                                                                                                            .setImage(`${embed_img}`)
                                                                                                                            .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                                                            .addField(`${embed_field1t}`, `${embed_field1c}`, false)
                                                                                                                            .addField(`${embed_field2t}`, `${embed_field2c}`, false)
                                                                                                                            .setColor('RANDOM')
                                                                                                                            .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                                                            .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                                                            .setTimestamp();
                                                                                                                        Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                                                                        Message.channel.send(embed);
                                                                                                                        Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                                                                        Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                                            .then(collected => {
                                                                                                                                const coll2 = collected.first().content.toLowerCase();
                                                                                                                                if (coll2 === 'yes') {
                                                                                                                                    Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                                                                    Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setImage('${embed_img}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.addField('${embed_field1t}','${embed_field1c}',false)\n.addField('${embed_field2t}','${embed_field2c}',false)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                                                                    return
                                                                                                                                }
                                                                                                                                else
                                                                                                                                    Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                                                                return
                                                                                                                            })
                                                                                                                    })
                                                                                                            })
                                                                                                        return
                                                                                                    }
                                                                                                    else
                                                                                                        Message.channel.send(`1st Field Content will be ${embed_field1c}\n\nYour embed message will look like this:`)
                                                                                                    const embed = new Discord.MessageEmbed()
                                                                                                        .setTitle(`${embed_title}`)
                                                                                                        .setDescription(`${embed_desc}`)
                                                                                                        .setImage(`${embed_img}`)
                                                                                                        .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                                        .addField(`${embed_field1t}`, `${embed_field1c}`, false)
                                                                                                        .setColor('RANDOM')
                                                                                                        .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                                        .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                                        .setTimestamp();
                                                                                                    Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                                                    Message.channel.send(embed);
                                                                                                    Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                        .then(collected => {
                                                                                                            const coll2 = collected.first().content.toLowerCase();
                                                                                                            if (coll2 === 'yes') {
                                                                                                                Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                                                Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setImage('${embed_img}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.addField('${embed_field1t}','${embed_field1c}',false)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                                                return
                                                                                                            }
                                                                                                            else
                                                                                                                Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                                            return
                                                                                                        })
                                                                                                })
                                                                                        })
                                                                                }
                                                                                if (fieldnum === '0') {
                                                                                    const embed = new Discord.MessageEmbed()
                                                                                        .setTitle(`${embed_title}`)
                                                                                        .setDescription(`${embed_desc}`)
                                                                                        .setImage(`${embed_img}`)
                                                                                        .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                        .setColor('RANDOM')
                                                                                        .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                        .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                        .setTimestamp();
                                                                                    Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                                    Message.channel.send(embed);
                                                                                    Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                        .then(collected => {
                                                                                            const coll2 = collected.first().content.toLowerCase();
                                                                                            if (coll2 === 'yes') {
                                                                                                Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                                Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setImage('${embed_img}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                                return
                                                                                            }
                                                                                            else
                                                                                                Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                            return
                                                                                        })
                                                                                }
                                                                            })
                                                                    })
                                                            }
                                                            if (coll === 'no') {
                                                                Message.channel.send(`You responded  with ${collected.first().content}\n\nHow many Fields that this page has? (Please response with number between 0-2)`);
                                                                const img = `${coll}`;
                                                                Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                    .then(collected => {
                                                                        const fieldnum = `${collected.first().content}`;
                                                                        if (fieldnum > 0) {
                                                                            Message.channel.send(`This page will have ${fieldnum} fields\n\nWhat is the name of 1st Field?`)
                                                                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                .then(collected => {
                                                                                    const embed_field1t = `${collected.first().content}`;
                                                                                    Message.channel.send(`1st Field Title will be ${embed_field1t}\n\nWhat is the content of the 1st embed?`)
                                                                                    Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                        .then(collected => {
                                                                                            const embed_field1c = `${collected.first().content}`;
                                                                                            if (fieldnum > 1) {
                                                                                                Message.channel.send(`1st Field Content will be ${embed_field1c}\n\nWhat is the 2nd Field Title?`)
                                                                                                Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                    .then(collected => {
                                                                                                        const embed_field2t = `${collected.first().content}`;
                                                                                                        Message.channel.send(`2nd Field Title will be ${embed_field2t}\n\nWhat is the content of the 2nd embed?`)
                                                                                                        Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                            .then(collected => {
                                                                                                                const embed_field2c = `${collected.first().content}`;
                                                                                                                Message.channel.send(`2nd Field Content will be ${embed_field2c}\n\nYour embed message will look like this:`)
                                                                                                                const embed = new Discord.MessageEmbed()
                                                                                                                    .setTitle(`${embed_title}`)
                                                                                                                    .setDescription(`${embed_desc}`)
                                                                                                                    .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                                                    .addField(`${embed_field1t}`, `${embed_field1c}`, false)
                                                                                                                    .addField(`${embed_field2t}`, `${embed_field2c}`, false)
                                                                                                                    .setColor('RANDOM')
                                                                                                                    .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                                                    .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                                                    .setTimestamp();
                                                                                                                Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                                                                Message.channel.send(embed);
                                                                                                                Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                                                                Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                                    .then(collected => {
                                                                                                                        const coll2 = collected.first().content.toLowerCase();
                                                                                                                        if (coll2 === 'yes') {
                                                                                                                            Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                                                            Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.addField('${embed_field1t}','${embed_field1c}',false)\n.addField('${embed_field2t}','${embed_field2c}',false)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                                                            return
                                                                                                                        }
                                                                                                                        else
                                                                                                                            Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                                                        return
                                                                                                                    })
                                                                                                            })
                                                                                                    })
                                                                                                return
                                                                                            }
                                                                                            else
                                                                                                Message.channel.send(`1st Field Content will be ${embed_field1c}\n\nYour embed message will look like this:`)
                                                                                            const embed = new Discord.MessageEmbed()
                                                                                                .setTitle(`${embed_title}`)
                                                                                                .setDescription(`${embed_desc}`)
                                                                                                .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                                .addField(`${embed_field1t}`, `${embed_field1c}`, false)
                                                                                                .setColor('RANDOM')
                                                                                                .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                                .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                                .setTimestamp();
                                                                                            Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                                            Message.channel.send(embed);
                                                                                            Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                                .then(collected => {
                                                                                                    const coll2 = collected.first().content.toLowerCase();
                                                                                                    if (coll2 === 'yes') {
                                                                                                        Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                                        Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.addField('${embed_field1t}','${embed_field1c}',false)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                                        return
                                                                                                    }
                                                                                                    else
                                                                                                        Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                                    return
                                                                                                })
                                                                                        })
                                                                                })
                                                                        }
                                                                        if (fieldnum === '0') {
                                                                            const embed = new Discord.MessageEmbed()
                                                                                .setTitle(`${embed_title}`)
                                                                                .setDescription(`${embed_desc}`)
                                                                                .setFooter(`Page ${embed_page} ${embed_lang}`,)
                                                                                .setColor('RANDOM')
                                                                                .setAuthor('State of Survival Guide', `${config.auth}`, 'https://discord.gg/StateOfSurvival')
                                                                                .setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')
                                                                                .setTimestamp();
                                                                            Message.channel.send(`This embed message prefix is: **${embed_prefix}**`)
                                                                            Message.channel.send(embed);
                                                                            Message.channel.send(`**Is this one already okay? (yes/no)**`)
                                                                            Message.channel.awaitMessages(m => m.author.id == Message.author.id, { max: 1, time: 30000, errors: ['time'] })
                                                                                .then(collected => {
                                                                                    const coll2 = collected.first().content.toLowerCase();
                                                                                    if (coll2 === 'yes') {
                                                                                        Message.channel.send(`Here I give you your JS code for this embed message:\nPrefix: **${embed_prefix}**, Language: **${embed_lang}**, Page: ${embed_page}`)
                                                                                        Message.channel.send(`const page${embed_page}${embed_lang} = new Discord.MessageEmbed()\n.setTitle('${embed_title}')\n.setDescription('${embed_desc}')\n.setFooter('Page ${embed_page} ${embed_lang}',)\n.setColor('RANDOM')\n.setAuthor('State of Survival Guide', ${config.auth}, 'https://discord.gg/StateOfSurvival')\n.setThumbnail('https://vignette.wikia.nocookie.net/state-of-survival/images/8/89/Wiki-wordmark.png/revision/latest?cb=20200930034743')\n.setTimestamp();`).then((Message) => Message.pin())
                                                                                        return
                                                                                    }
                                                                                    else
                                                                                        Message.channel.send(`Please try again with a new sos embedcode command...`)
                                                                                    return
                                                                                })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
    })

}