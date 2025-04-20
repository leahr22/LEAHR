const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const { panelChannelId } = require('../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('panel')
    .setDescription('Destek panelini gönderir.'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎟️ Destek Sistemi')
      .setDescription('Aşağıdaki menüden bir kategori seçerek ticket oluşturabilirsiniz.')
      .setColor('Red');

    const select = new StringSelectMenuBuilder()
      .setCustomId('ticket_select')
      .setPlaceholder('Ticket Açmak İçin Kategori Seçiniz.')
      .addOptions([
        {
          label: 'Genel Destek',
          value: 'genel'
        },
        {
          label: 'Satın Alma',
          value: 'satin_alma'
        },
        {
          label: 'Teknik Sorun',
          value: 'teknik'
        }
      ]);

    const row = new ActionRowBuilder().addComponents(select);

    await interaction.client.channels.cache.get(panelChannelId).send({ embeds: [embed], components: [row] });
    await interaction.reply({ content: 'Panel gönderildi!', ephemeral: true });
  }
};
