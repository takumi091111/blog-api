const SPACE_ID = process.env.SPACE_ID
const TOKEN = process.env.TOKEN
const ALLOW_HOSTS = process.env.ALLOW_HOSTS.split(',')

module.exports = {
  SPACE_ID,
  TOKEN,
  ALLOW_HOSTS
}
