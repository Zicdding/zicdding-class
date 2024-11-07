import { Button } from "@zicdding-web/ui/Button";
import { Typography } from "@zicdding-web/ui/Typography";

const MOCK = [
    {
        label: '모집 구분',
        value: '스터디'
    },
    {
        label: '모집 인원',
        value: '0명'
    },
    {
        label: '모집 마감',
        value: '2024.07.13'
    },
    {
        label: '모집 상태',
        value: 'ing'
    },
    {
        label: '시작 예정',
        value: '2024.07.20'
    },
    {
        label: '진행 방식',
        value: '온라인'
    },
    {
        label: '예상 기간',
        value: '3개월'
    },
    {
        label: '연락 방법',
        value: '카카오톡'
    },
    {
        label: '기술 스택',
        value: 'void'
    },
]

export default function ClassDetailPage() {
    return (
        <div className="px-6">
            <div>
                <div className="flex justify-between">
                    <Typography variant='h1'>모각코</Typography>
                    <Button variant='destructive' size='sm'>신고하기</Button>
                </div>
                <div className="mt-8">
                    <Typography variant='caption1' className="text-gray-400">등록일 | 2024.07.09</Typography>
                </div>

                <hr className="my-8" />

                <div className="flex flex-wrap gap-y-6">
                    {MOCK.map(({ label, value }) => (
                        <div key={label} className="flex w-1/2">
                            <div>
                                <Typography className="text-gray-400">{label}</Typography>
                            </div>
                            <div className="ml-4">
                                <Typography>{value}</Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-8" />

            <div>
                소개 내용
            </div>

            <hr className="my-8" />

            <div>
                <Typography variant='h4'>댓글 3</Typography>
                <div className="flex flex-col gap-[1px]">
                    <div className="flex px-4 py-2">
                        <div className="flex justify-center items-center w-[80px] mr-4">user-1</div>
                        <div className="border-l" />
                        <div className="ml-4">안녕하세요.</div>
                    </div>
                    <div className="flex px-4 py-2">
                        <div className="flex justify-center items-center w-[80px] mr-4">user-2</div>
                        <div className="border-l" />
                        <div className="ml-4">안녕하세요. 반갑습니다.</div>
                    </div>
                    <div className="flex px-4 py-2">
                        <div className="flex justify-center items-center w-[80px] mr-4">user-1</div>
                        <div className="border-l" />
                        <div className="ml-4">안녕히가세요.</div>
                    </div>

                    <div className="flex px-4 py-2">
                        <div className="w-[80px]  mr-4" />
                        <div className="" />
                        <textarea className="w-full h-20 border rounded-sm p-2 ml-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}