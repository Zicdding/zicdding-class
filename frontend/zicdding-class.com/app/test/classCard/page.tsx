import ClassCard from "@/app/components/ClassCard";

export default function TestPage() {
    return (
        <ClassCard
            id={1}
            title="Example Class Title"
            endDate="2024-07-01"
            positions={[
                "프론트엔드",
                "백엔드"
            ]}
            nickname="직띵"
            likeCnt={10}
            viewCnt={20}
            commentCnt={5}
            technology={[
                { name: 'react', imgUrl: '/next.svg' },
                { name: 'js', imgUrl: '/vercel.svg' }
            ]}
            myLike={false}
        />
    );
}
