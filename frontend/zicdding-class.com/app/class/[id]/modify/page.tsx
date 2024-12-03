'use client';

import { Button } from '@zicdding-web/ui/Button';
import { Typography } from '@zicdding-web/ui/Typography';
import { Fragment, useState } from 'react';
import { Calendar, Input } from '@zicdding-web/ui';
import { CLASS_MOCK_LIST } from '../../data';
import { Tabs } from '@zicdding-web/ui/Tabs';

export default function ClassDetailModifyPage({params}: {params: {id: string}}) {
  const [inputs, setInputs] = useState(CLASS_MOCK_LIST[Number(params.id)]);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTab = (value: string) => {
    setInputs((prev) => {
      return {
        ...prev,
        dead_yn: value === 'true',
      };
    });
  };

  const handleClickCreate = () => {
    new Promise((resolve) => resolve);
  };

  return (
    <div className="px-6">
      <div>
        <div className="flex justify-between">
          <input value={inputs.title} className="text-6xl" placeholder="타이틀을 입력하세요" />
          <Button variant="default" size="sm" onClick={handleClickCreate}>
            등록하기
          </Button>
        </div>

        <hr className="my-8" />

        <div className="flex flex-wrap gap-y-6">
          {
            <Fragment>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 구분</Typography>
                </div>
                <div className="ml-4">
                  <Input name="type" value={inputs.type} onChange={handleChangeInput} />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 인원</Typography>
                </div>
                <div className="ml-4">
                  <Input name="accommodate" value={inputs.accommodate} onChange={handleChangeInput} />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 기간</Typography>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <div className="relative group">
                      <Input name="deadline" value={inputs.deadline[0]} type="calendar" />

                      <div className="absolute top-full left-0 hidden bg-white z-[1] border rounded-md group-hover:block">
                        <Calendar
                          mode="range"
                          onDayClick={(day) =>
                            setInputs((prev) => {
                              const nextDeadline = [...prev.deadline];
                              nextDeadline[0] = day.toISOString().split('T')[0].replaceAll('-', '.');
                              return { ...prev, deadline: nextDeadline };
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="mx-4">~</div>
                    <div className="relative group">
                      <Input name="deadline" value={inputs.deadline[1]} type="calendar" />

                      <div className="absolute top-full left-0 hidden bg-white z-[1] border rounded-md group-hover:block">
                        <Calendar
                          mode="range"
                          onDayClick={(day) =>
                            setInputs((prev) => {
                              const nextDeadline = [...prev.deadline];
                              nextDeadline[1] = day.toISOString().split('T')[0].replaceAll('-', '.');
                              return { ...prev, deadline: nextDeadline };
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">모집 상태</Typography>
                </div>
                <div className="ml-4">
                  <Tabs
                    items={[
                      { title: '모집중', value: 'true' },
                      { title: '모집완료', value: 'false' },
                    ]}
                    value={JSON.stringify(inputs.dead_yn)}
                    onChange={handleChangeTab}
                  />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">시작 예정</Typography>
                </div>
                <div className="ml-4">
                  <div className="relative group">
                    <Input name="deadline" value={inputs.start_date} type="calendar" />

                    <div className="absolute top-full left-0 hidden bg-white z-[1] border rounded-md group-hover:block">
                      <Calendar
                        mode="range"
                        onDayClick={(day) =>
                          setInputs((prev) => {
                            return { ...prev, start_date: day.toISOString().split('T')[0].replaceAll('-', '.') };
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">진행 방식</Typography>
                </div>
                <div className="ml-4">
                  <Input name="how" value={inputs.how} onChange={handleChangeInput} />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">예상 기간</Typography>
                </div>
                <div className="ml-4">
                  <Input name="eta" value={inputs.eta} onChange={handleChangeInput} />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">연락 방법</Typography>
                </div>
                <div className="ml-4">
                  <Input name="contact" value={inputs.contact} onChange={handleChangeInput} />
                </div>
              </div>
              <div className="flex items-center w-1/2">
                <div>
                  <Typography className="text-gray-400">기술 스택</Typography>
                </div>
                <div className="ml-4">
                  <Input name="lang" value={inputs.lang} onChange={handleChangeInput} />
                </div>
              </div>
            </Fragment>
          }
        </div>
      </div>

      <hr className="my-8" />

      <div>소개 내용</div>

      <hr className="my-8" />
    </div>
  );
}
