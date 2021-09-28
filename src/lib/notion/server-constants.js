// use commonjs so it can be required without transpiling
const path = require('path')

const normalizeId = (id) => {
  if (!id) return id
  if (id.length === 36) return id
  if (id.length !== 32) {
    throw new Error(
      `Invalid blog-index-id: ${id} should be 32 characters long. Info here https://github.com/ijjk/notion-blog#getting-blog-index-and-token`
    )
  }
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`
}

const NOTION_TOKEN = String('375a665e6a299fc862a353fa52d88c15ce4df7cfbcd980a1954d5a1158271d032b6cf64f310bc2b0e4f37e0f703a6d221fe57f687d07a900b06e36ad5506576543b802f07cdf738fc6ad8af65fc4')
// const NOTION_TOKEN = process.env.NOTION_TOKEN
// const BLOG_INDEX_ID = normalizeId(process.env.BLOG_INDEX_ID)
const BLOG_INDEX_ID = normalizeId('354d8b0a54cc473eb846cfa1a896c762')
const API_ENDPOINT = 'https://www.notion.so/api/v3'
const BLOG_INDEX_CACHE = path.resolve('.blog_index_data')

module.exports = {
  NOTION_TOKEN,
  BLOG_INDEX_ID,
  API_ENDPOINT,
  BLOG_INDEX_CACHE,
  normalizeId,
}
