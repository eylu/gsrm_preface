export const categories = [
  {
    id: 1,
    name: "American Lobster",
    image: "categories/lobster",
    attr_name: "sizes",
    attr_values: [
      {id: 1, label: "1.00 ~ 1.25 lb", value: "1.00 ~ 1.25 lb", last_price: 12.50, max_price: 22.66, min_price: 11.20 },
      {id: 2, label: "1.25 ~ 1.50 lb", value: "1.25 ~ 1.50 lb", last_price: 13.88, max_price: 22.17, min_price: 11.64 },
      {id: 3, label: "1.50 ~ 1.75 lb", value: "1.50 ~ 1.75 lb", last_price: 12.23, max_price: 26.50, min_price: 10.30 },
      {id: 4, label: "1.75 ~ 2.00 lb", value: "1.75 ~ 2.00 lb", last_price: 10.50, max_price: 23.94, min_price: 10.12 },
      {id: 5, label: "2.00 ~ 2.50 lb", value: "2.00 ~ 2.50 lb", last_price: 18.89, max_price: 28.55, min_price: 16.28 },
      {id: 6, label: "2.50 ~ 3.00 lb", value: "2.50 ~ 3.00 lb", last_price: 20.50, max_price: 21.36, min_price: 13.45 },
      {id: 7, label: "3.00 ~ 4.00 lb", value: "3.00 ~ 4.00 lb", last_price: 18.30, max_price: 22.76, min_price: 17.23 },
      {id: 8, label: "4.00 ~ 6.00 lb", value: "4.00 ~ 6.00 lb", last_price: 18.40, max_price: 25.25, min_price: 9.50 },
      {id: 9, label: "6.00+ lb", value: "6.00+ lb", last_price: 25.55, max_price: 28.85, min_price: 24.50 }
    ],
  },
  {
    id: 2,
    name: "Blacklip Abalone Quota",
    image: "categories/abalone",
    attr_name: "zones",
    attr_values: [
      {id: 10, label: "EAST", value: "east", last_price: 23.50, max_price: 29.78, min_price: 21.20 },
      {id: 11, label: "WEST", value: "west", last_price: 28.48, max_price: 39.78, min_price: 23.66 },
      {id: 12, label: "NORTH", value: "north", last_price: 28.48, max_price: 39.78, min_price: 23.66 },
      {id: 13, label: "BASS", value: "bass", last_price: 28.48, max_price: 39.78, min_price: 23.66 },
      {id: 14, label: "GREEN", value: "green", last_price: 28.48, max_price: 39.78, min_price: 23.66 },
    ]
  },
  {id: 3, name: "American Crab", image: "", attr_name: "...", attr_values: []},
  {id: 4, name: "American Other", image: "", attr_name: "...", attr_values: []},
];

export const sizes = [
  {id: 1, label: "1.00 ~ 1.25 lb", value: "1.00 ~ 1.25 lb", last_price: 12.50, max_price: 22.66, min_price: 11.20 },
  {id: 2, label: "1.25 ~ 1.50 lb", value: "1.25 ~ 1.50 lb", last_price: 13.88, max_price: 22.17, min_price: 11.64 },
  {id: 3, label: "1.50 ~ 1.75 lb", value: "1.50 ~ 1.75 lb", last_price: 12.23, max_price: 26.50, min_price: 10.30 },
  {id: 4, label: "1.75 ~ 2.00 lb", value: "1.75 ~ 2.00 lb", last_price: 10.50, max_price: 23.94, min_price: 10.12 },
  {id: 5, label: "2.00 ~ 2.50 lb", value: "2.00 ~ 2.50 lb", last_price: 18.89, max_price: 28.55, min_price: 16.28 },
  {id: 6, label: "2.50 ~ 3.00 lb", value: "2.50 ~ 3.00 lb", last_price: 20.50, max_price: 21.36, min_price: 13.45 },
  {id: 7, label: "3.00 ~ 4.00 lb", value: "3.00 ~ 4.00 lb", last_price: 18.30, max_price: 22.76, min_price: 17.23 },
  {id: 8, label: "4.00 ~ 6.00 lb", value: "4.00 ~ 6.00 lb", last_price: 18.40, max_price: 25.25, min_price: 9.50 },
  {id: 9, label: "6.00+ lb", value: "6.00+ lb", last_price: 25.55, max_price: 28.85, min_price: 24.50 }
];

export const quoteType = {
  sell: "sell",
  buy: "buy",
};