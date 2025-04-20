const createTicket = require('../utils/createTicket');

module.exports = client => {
  client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (command) await command.execute(interaction);
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'ticket_select') {
        await createTicket(interaction);
      }
    }
  });
};
