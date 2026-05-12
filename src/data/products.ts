export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  lineLabel?: string;
  accentColor: string;
  image?: string;
};

export const products: Product[] = [
  {
    id: "hue-lang",
    lineLabel: "Dòng Hương lang",
    name: "Tĩnh · Hương làng",
    tagline: "Trầm ấm của gỗ và lá khô sau mưa",
    description:
      "Pha trộn trầm nhẹ với cam thảo và lá trầu — hơi ấm bám nhẹ trên vải lanh, gợi không khí hiên nhà im lìm chiều muộn.",
    story:
      "Câu chuyện bắt đầu từ một buổi chiều đứng sau hiên, nghe lá rơi. Chúng mình muốn gói cả khoảnh khắc ấy vào một túi nhỏ để mang đi bất cứ đâu.",
    accentColor: "#8a9a8f",
  },
  {
    id: "hue-doi",
    lineLabel: "Dòng Đồi núi",
    name: "Tĩnh · Hương đồi",
    tagline: "Bạc hà, cỏ roi ngựa và làn gió cao",
    description:
      "Tông trong trẻo, thoáng chút cay nhẹ của thảo mộc vùng cao — gợi sự tỉnh táo dịu, không gắt, thích hợp không gian làm việc và đọc sách.",
    story:
      "Mỗi lần mở túi là một lần nhớ về con đường mòn quanh đồi — mùi cỏ hòa với sương. Đó là lời nhắc nhở: thở chậm lại, đủ để nghe chính mình.",
    accentColor: "#9aab9e",
  },
  {
    id: "hue-lo",
    lineLabel: "Dòng Vườn lộ",
    name: "Tĩnh · Hương lộ",
    tagline: "Nhài, ngọc lan và một chút mật ong",
    description:
      "Ngọt thanh, nữ tính — như cửa sổ mở ra khu vườn sau nhà. Giữ hương lâu nhưng không nồng, phù hợp phòng ngủ và không gian thiền nhẹ.",
    story:
      "Những bông hoa nhài được hái lúc tinh mơ, để khô tự nhiên. Chúng mình kể rằng giấc ngủ cũng có thể có mùi — dịu, mềm, và tin cậy.",
    accentColor: "#b8a99a",
  },
  {
    id: "hue-co",
    lineLabel: "Dòng Cổ điển",
    name: "Tĩnh · Hương cổ",
    tagline: "Quế, đinh hương và hoàng đàn",
    description:
      "Ấm sâu, mang chất trầm của phòng trà — dành cho ai yêu sự trang nhã kiểu cũ, như một cuốn sổ tay đã vàng mép.",
    story:
      "Từ chiếc hộp gỗ của bà, đến chiếc túi vải của chúng mình hôm nay: truyền thống không nặng nề — chỉ là một nhịp thở chậm giữa ngày vội.",
    accentColor: "#a89b8c",
  },
];
