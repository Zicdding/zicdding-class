
import { Typography } from "@zicdding-web/ui/Typography";
import OrderByTabs from "./_components/OrderByTabs";
import ClassCard from "./_components/ClassCard";
const dummy = [
  {
    id: 1,
    title: "Example Class Title",
    endDate: "2024-07-01",
    positions: ["프론트엔드", "백엔드"],
    nickname: "직띵",
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [{ name: 'react', imgUrl: '/next.svg' }, { name: 'js', imgUrl: '/vercel.svg' }],
    myLike: false,
  },
  {
    id: 2,
    title: "Example Class Title",
    endDate: "2024-07-01",
    positions: ["프론트엔드", "백엔드"],
    nickname: "직띵",
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [{ name: 'react', imgUrl: '/next.svg' }, { name: 'js', imgUrl: '/vercel.svg' }],
    myLike: false,
  },
  {
    id: 3,
    title: "Example Class Title",
    endDate: "2024-07-01",
    positions: ["프론트엔드", "백엔드"],
    nickname: "직띵",
    likeCnt: 10,
    viewCnt: 20,
    commentCnt: 5,
    technology: [{ name: 'react', imgUrl: '/next.svg' }, { name: 'js', imgUrl: '/vercel.svg' }],
    myLike: false,
  }
]

export default function Home() {
  return (
    <div className="px-6 ">
      <div className="mb-20">
        <div className="flex justify-between border-b-[1px] border-gray-200 pb-4">
          <Typography variant="h2">클래스</Typography>

          <div className="flex items-center gap-4">
            <OrderByTabs />
            <Typography variant="body">더보기</Typography>
          </div>
        </div>

        <div className="flex gap-4 pt-6 overflow-x-auto">
          {dummy.map((item) => <ClassCard key={item.id} {...item} />)}
        </div>
      </div>

      <div>
        <div className="flex justify-between border-b-[1px] border-gray-200 pb-4">
          <Typography variant="h2">ITNews</Typography>
        </div>

        <div className="flex gap-4 pt-6 overflow-x-auto">
          {dummy.map((item) => <ClassCard key={item.id} {...item} />)}
        </div>
      </div>
    </div>
  );
}
