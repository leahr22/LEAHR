module.exports = client => {
  client.once('ready', () => {
    console.log(`Bot hazır: ${client.user.tag}`);
  });
};
