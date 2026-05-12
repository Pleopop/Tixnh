export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Lê Thị Hà",
    role: "Đồng sáng lập & hương liệu",
    bio: "Phụ trách công thức phối hương và chọn nguyên liệu thảo mộc địa phương.",
  },
  {
    id: "2",
    name: "Nguyễn Khánh Huyền",
    role: "Thiết kế trải nghiệm & thương hiệu",
    bio: "Định hình cảm xúc thị giác và câu chuyện quanh từng dòng sản phẩm.",
  },
  {
    id: "3",
    name: "Vũ Quỳnh Hương",
    role: "Vận hành & phát triển bền vững",
    bio: "Đảm bảo nguồn gốc nguyên liệu và đóng gói thân thiện với môi trường.",
  },
  {
    id: "4",
    name: "Nguyễn Đức Hùng",
    role: "Truyền thông & cộng đồng",
    bio: "Kết nối những người yêu thích không gian tĩnh và chia sẻ cách dùng túi thơm.",
  },
  {
    id: "5",
    name: "Nguyễn Thị Mai Hương",
    role: "Hậu cần & chăm sóc khách hàng",
    bio: "Đảm bảo trải nghiệm mua sắm suôn sẻ và hỗ trợ khách hàng tận tâm.",
  },
  {
    id: "6",
    name: "Nguyễn Lê Hưng",
    role: "Hậu cần",
    bio: "Hỗ trợ vận chuyển và quản lý kho hàng, đảm bảo sản phẩm đến tay khách hàng nhanh chóng và an toàn.",
  },
];
