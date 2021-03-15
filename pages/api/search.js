
const axios = require('axios');
export default async (req, res) => {
  let { criteria } = req.query
  const result = await axios.post(process.env.ES_URL,
    {
      "query": {
        "match": {
          "content": criteria
        }
      },
      "highlight": {
        "fields": {
          "content": {}
        }
      }
    }
  )
  res.status = 200
  res.json(result.data)
}
