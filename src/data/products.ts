
import imgTinhYen from "../../assets/tinh-yen.png";
import imgTinhTram from "../../assets/tinh-tram.png";
import imgTinhNhien from "../../assets/tinh-nhien.png";
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
    id: "tinh-yen",
    lineLabel: "Bộ sưu tập Tĩnh",
    name: "Tĩnh · Yên",
    tagline: "Oải hương, hoa cúc và tinh dầu nhài dịu nhẹ",
    description:
      "Mùi hương thư giãn, tối ưu cho những khoảnh khắc trước khi chìm vào giấc ngủ. Thành phần gồm oải hương khô, hoa cúc, vỏ cam trần bì và tinh dầu hoa nhài.",
    story:
      "Như một thước phim tua chậm vào cuối ngày, khi vạn vật đã chìm vào tĩnh lặng. Tĩnh Yên là lời chúc ngủ ngon dịu dàng nhất, gói gọn những hương thơm êm ái để đưa tâm trí vào một giấc ngủ sâu.",
    accentColor: "#948b96", 
    image: imgTinhYen, 
  },
  {
    id: "tinh-tram",
    lineLabel: "Bộ sưu tập Tĩnh",
    name: "Tĩnh · Trầm",
    tagline: "Hương vị ấm áp của quế, đinh hương và hoa hồi",
    description:
      "Mang mùi hương ấm áp, giúp xoa dịu tinh thần và mang lại cảm giác an yên khi đối mặt với căng thẳng. Công thức phối trộn từ quế vụn, đinh hương, trần bì và hoa hồi.",
    story:
      "Nhắc nhớ về những buổi chiều cũ thoang thoảng hương quế nồng đượm. Tĩnh Trầm như một nốt lặng xoa dịu tâm trí giữa những bộn bề, như một cái ôm an ủi giữ lại chút vững chãi cho tâm hồn.",
    accentColor: "#a8897a",
    image: imgTinhTram,
  },
  {
    id: "tinh-nhien",
    lineLabel: "Bộ sưu tập Tĩnh",
    name: "Tĩnh · Nhiên",
    tagline: "Sự thanh mát từ trần bì, ngải cứu và cúc chi",
    description:
      "Tạo cảm giác tươi mát, sảng khoái tức thì, hỗ trợ xoa dịu những cơn đau đầu. Sự kết hợp độc đáo giữa trần bì xay vỡ hạt lựu, ngải cứu và hoa cúc chi.",
    story:
      "Trong trẻo như một sớm ban mai đầy nắng rọi qua khung cửa kính. Tĩnh Nhiên mang theo làn gió thảo mộc mát lành, đánh thức sự tươi mới và thanh lọc nhẹ nhàng mọi luồng không khí xung quanh.",
    accentColor: "#899a8c", 
    image: imgTinhNhien,
  },
];