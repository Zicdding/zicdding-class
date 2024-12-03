import { Button } from '@zicdding-web/ui/Button';
import { Typography } from '@zicdding-web/ui/Typography';

import { Fragment } from 'react';
import { CLASS_MOCK_LIST } from '../data';

export default function ClassDetailPage({params}: {params: {id: string}}) {
  const { id, title, start_date, deadline, type, how, eta, contact, lang, accommodate, dead_yn, create_date } = CLASS_MOCK_LIST[Number(params.id)];

  return (
    <div className="px-6">
      <div>
        <div className="flex justify-between">
          <Typography variant="h1">{title}</Typography>
          <Button variant="destructive" size="sm">
            신고하기
          </Button>
        </div>
        <div className="mt-8">
          <Typography variant="caption1" className="text-gray-400">
            등록일 | {create_date}
          </Typography>
        </div>

        <hr className="my-8" />

        <div className="flex flex-wrap gap-y-6">
          {
            <Fragment key={id}>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 구분</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{type}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 인원</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{accommodate}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 마감</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{deadline}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 상태</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{dead_yn}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">시작 예정</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{start_date}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">진행 방식</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{how}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">예상 기간</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{eta}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">연락 방법</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{contact}</Typography>
                </div>
              </div>
              <div className="flex w-1/2">
                <div>
                  <Typography className="text-gray-400">기술 스택</Typography>
                </div>
                <div className="ml-4">
                  <Typography>{lang}</Typography>
                </div>
              </div>
            </Fragment>
          }
        </div>
      </div>

      <hr className="my-8" />

      <div>소개 내용</div>

      <hr className="my-8" />

      <div>
        <Typography variant="h4">댓글 3</Typography>
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
  );
}
