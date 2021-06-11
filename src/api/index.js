import trae from "trae";

const pokemonList = (api, offset = 0) => {
  return trae.get(api, { params: { limit: 20, offset }, bodyType: "json" });
};

export { pokemonList };
