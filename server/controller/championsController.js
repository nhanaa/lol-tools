// get all champions general info
const getAllChampions = async (req, res) => {
  // make a request to dragon api to get champion.json
  const response = await fetch("http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json", {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.API_KEY
    }
  });

  // convert to json
  const json = await response.json();

  // check if response is valid
  if (!response.ok) {
    return res.status(400).json({error: "Failed request"});
  }

  return res.status(200).json(json);

}


// get a specific champion info
const getSingleChampion = async (req, res) => {
  // make a request to dragon api to get champion.json
  const {id} = req.params;
  console.log(id);
  const response = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${id}.json`, {
    method: "GET",
    headers: {
      "X-Riot-Token": process.env.API_KEY,
    }
  });

  // convert to json
  const json = await response.json();

  // check if response is valid
  if (!response.ok) {
    return res.status(400).json({error: "Failed request"});
  }

  return res.status(200).json(json);

}

module.exports = {
  getAllChampions,
  getSingleChampion
}
