const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { ticketCategoryId, rolesToMention } = require('../config.json');

module.exports = async interaction => {
  const value = interaction.values[0];
  const user = interaction.user;

  const channel = await interaction.guild.channels.create({
    name: `ticket-${user.username}`,
    parent: ticketCategoryId,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel]
      },
      {
        id: user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
      },
      ...rolesToMention.map(roleId => ({
        id: roleId,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
      }))
    ]
  });

  const embed = new EmbedBuilder()
    .setTitle('🎫 Ticket Açıldı')
    .setDescription(`${user} adlı kullanıcı "${value}" kategorisinden ticket açtı.`)
    .setColor('Green');

  await channel.send({ content: rolesToMention.map(id => `<@&${id}>`).join(' '), embeds: [embed] });
  await interaction.reply({ content: `Ticket oluşturuldu: ${channel}`, ephemeral: true });
};
