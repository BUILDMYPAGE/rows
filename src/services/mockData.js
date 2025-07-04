// Fallback mock data for when SWAPI is unavailable
export const mockCharacters = {
  count: 10,
  next: null,
  previous: null,
  results: [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/1/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/6/"
      ],
      species: [],
      vehicles: [
        "https://swapi.info/api/vehicles/14/",
        "https://swapi.info/api/vehicles/30/"
      ],
      starships: [
        "https://swapi.info/api/starships/12/",
        "https://swapi.info/api/starships/22/"
      ],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.info/api/people/1/"
    },
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      skin_color: "white",
      eye_color: "yellow",
      birth_year: "41.9BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/1/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/6/"
      ],
      species: [],
      vehicles: [],
      starships: ["https://swapi.info/api/starships/13/"],
      created: "2014-12-10T15:18:20.704000Z",
      edited: "2014-12-20T21:17:50.313000Z",
      url: "https://swapi.info/api/people/4/"
    },
    {
      name: "Leia Organa",
      height: "150",
      mass: "49",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "19BBY",
      gender: "female",
      homeworld: "https://swapi.info/api/planets/2/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/6/"
      ],
      species: [],
      vehicles: ["https://swapi.info/api/vehicles/30/"],
      starships: [],
      created: "2014-12-10T15:20:09.791000Z",
      edited: "2014-12-20T21:17:50.315000Z",
      url: "https://swapi.info/api/people/5/"
    },
    {
      name: "Obi-Wan Kenobi",
      height: "182",
      mass: "77",
      hair_color: "auburn, white",
      skin_color: "fair",
      eye_color: "blue-gray",
      birth_year: "57BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/20/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/4/",
        "https://swapi.info/api/films/5/",
        "https://swapi.info/api/films/6/"
      ],
      species: [],
      vehicles: ["https://swapi.info/api/vehicles/38/"],
      starships: [
        "https://swapi.info/api/starships/48/",
        "https://swapi.info/api/starships/59/",
        "https://swapi.info/api/starships/64/",
        "https://swapi.info/api/starships/65/",
        "https://swapi.info/api/starships/74/"
      ],
      created: "2014-12-10T16:16:29.192000Z",
      edited: "2014-12-20T21:17:50.325000Z",
      url: "https://swapi.info/api/people/10/"
    },
    {
      name: "C-3PO",
      height: "167",
      mass: "75",
      hair_color: "n/a",
      skin_color: "gold",
      eye_color: "yellow",
      birth_year: "112BBY",
      gender: "n/a",
      homeworld: "https://swapi.info/api/planets/1/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/4/",
        "https://swapi.info/api/films/5/",
        "https://swapi.info/api/films/6/"
      ],
      species: ["https://swapi.info/api/species/2/"],
      vehicles: [],
      starships: [],
      created: "2014-12-10T15:10:51.357000Z",
      edited: "2014-12-20T21:17:50.309000Z",
      url: "https://swapi.info/api/people/2/"
    },
    {
      name: "R2-D2",
      height: "96",
      mass: "32",
      hair_color: "n/a",
      skin_color: "white, blue",
      eye_color: "red",
      birth_year: "33BBY",
      gender: "n/a",
      homeworld: "https://swapi.info/api/planets/8/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/4/",
        "https://swapi.info/api/films/5/",
        "https://swapi.info/api/films/6/"
      ],
      species: ["https://swapi.info/api/species/2/"],
      vehicles: [],
      starships: [],
      created: "2014-12-10T15:11:50.376000Z",
      edited: "2014-12-20T21:17:50.311000Z",
      url: "https://swapi.info/api/people/3/"
    },
    {
      name: "Han Solo",
      height: "180",
      mass: "80",
      hair_color: "brown",
      skin_color: "fair",
      eye_color: "brown",
      birth_year: "29BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/22/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/"
      ],
      species: [],
      vehicles: [],
      starships: [
        "https://swapi.info/api/starships/10/",
        "https://swapi.info/api/starships/22/"
      ],
      created: "2014-12-10T16:49:14.582000Z",
      edited: "2014-12-20T21:17:50.334000Z",
      url: "https://swapi.info/api/people/14/"
    },
    {
      name: "Chewbacca",
      height: "228",
      mass: "112",
      hair_color: "brown",
      skin_color: "unknown",
      eye_color: "blue",
      birth_year: "200BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/14/",
      films: [
        "https://swapi.info/api/films/1/",
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/6/"
      ],
      species: ["https://swapi.info/api/species/3/"],
      vehicles: ["https://swapi.info/api/vehicles/19/"],
      starships: [
        "https://swapi.info/api/starships/10/",
        "https://swapi.info/api/starships/22/"
      ],
      created: "2014-12-10T16:42:45.066000Z",
      edited: "2014-12-20T21:17:50.332000Z",
      url: "https://swapi.info/api/people/13/"
    },
    {
      name: "Yoda",
      height: "66",
      mass: "17",
      hair_color: "white",
      skin_color: "green",
      eye_color: "brown",
      birth_year: "896BBY",
      gender: "male",
      homeworld: "https://swapi.info/api/planets/28/",
      films: [
        "https://swapi.info/api/films/2/",
        "https://swapi.info/api/films/3/",
        "https://swapi.info/api/films/4/",
        "https://swapi.info/api/films/5/",
        "https://swapi.info/api/films/6/"
      ],
      species: ["https://swapi.info/api/species/6/"],
      vehicles: [],
      starships: [],
      created: "2014-12-15T12:26:01.042000Z",
      edited: "2014-12-20T21:17:50.345000Z",
      url: "https://swapi.info/api/people/20/"
    },
    {
      name: "Padmé Amidala",
      height: "185",
      mass: "45",
      hair_color: "brown",
      skin_color: "light",
      eye_color: "brown",
      birth_year: "46BBY",
      gender: "female",
      homeworld: "https://swapi.info/api/planets/8/",
      films: [
        "https://swapi.info/api/films/4/",
        "https://swapi.info/api/films/5/",
        "https://swapi.info/api/films/6/"
      ],
      species: [],
      vehicles: [],
      starships: [
        "https://swapi.info/api/starships/39/",
        "https://swapi.info/api/starships/49/",
        "https://swapi.info/api/starships/64/"
      ],
      created: "2014-12-19T17:28:26.926000Z",
      edited: "2014-12-20T21:17:50.401000Z",
      url: "https://swapi.info/api/people/35/"
    }
  ]
};

export const mockCharacterDetails = {
  1: {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.info/api/planets/1/",
    films: [
      "https://swapi.info/api/films/1/",
      "https://swapi.info/api/films/2/",
      "https://swapi.info/api/films/3/",
      "https://swapi.info/api/films/6/"
    ],
    species: [],
    vehicles: [
      "https://swapi.info/api/vehicles/14/",
      "https://swapi.info/api/vehicles/30/"
    ],
    starships: [
      "https://swapi.info/api/starships/12/",
      "https://swapi.info/api/starships/22/"
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.info/api/people/1/"
  }
};

export default { mockCharacters, mockCharacterDetails };
